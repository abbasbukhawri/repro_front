import { X, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchContacts } from '../../redux/slices/contactSlice';
import { fetchUsers } from '../../redux/slices/userSlice';
import { createLead, Lead } from '../../redux/slices/leadSlice';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { MultiSelectDropdown } from '../ui/MultiSelectDropdown';
import { fetchLocations } from '../../redux/slices/locationSlice';
import { fetchProperties } from '../../redux/slices/propertySlice';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  brand: 'real-estate' | 'business-setup';
}

export function AddLeadModal({ isOpen, onClose, brand }: AddLeadModalProps) {
  if (!isOpen) return null;

  const dispatch = useAppDispatch();
  const { list: contacts } = useAppSelector(state => state.contact);
  const { list: users } = useAppSelector(state => state.user);
  const { list: locations } = useAppSelector(state => state.location);
  const { list: properties } = useAppSelector(state => state.property);

  const [form, setForm] = useState({
    contact_id: 0,
    assigned_to_id: 0,
    budget_min: '' as number | '',
    budget_max: '' as number | '',
    bed: '' as number | '',
    bath: '' as number | '',
    property_type: '',
    lead_type: 'rent',
    preferred_location_ids: [] as number[],
    property_ids: [] as number[],
    source: 'website',
    status: 'new',
    notes: '',
  });

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchUsers());
    dispatch(fetchLocations());
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.contact_id) {
      alert('Please select a contact');
      return;
    }

    const statusMap: Record<string, Lead['status']> = {
      new: 'new_lead',
      contacted: 'contacted',
      qualified: 'viewing_scheduled',
    };

    const payload: Partial<Lead> = {
      contact_id: form.contact_id,
      assigned_to_id: form.assigned_to_id || undefined,
      budget_min: form.budget_min !== '' ? form.budget_min : undefined,
      budget_max: form.budget_max !== '' ? form.budget_max : undefined,
      bed: form.bed !== '' ? form.bed : undefined,
      bath: form.bath !== '' ? form.bath : undefined,
      property_type: form.property_type || undefined,
      lead_type: form.lead_type || undefined,
      preferred_location_ids: form.preferred_location_ids,
      property_ids: form.property_ids,
      source: form.source || undefined,
      status: statusMap[form.status] || 'new_lead',
      notes_attributes: form.notes ? [{ body: form.notes }] : undefined,
      brand,
    };

    dispatch(createLead(payload));
    onClose();
  };

  // Helper function to format property display name
  const formatPropertyName = (property: any) => {
    const parts = [];
    
    if (property.title) {
      parts.push(property.title);
    }
    
    if (property.reference) {
      parts.push(`(${property.reference})`);
    }
    
    if (property.location?.label) {
      // Extract just the first part of the label (e.g., "Phase 5, DHA Lahore" or "Jumeirah Beach Residence")
      const locationLabel = property.location.label.split(',')[0];
      parts.push(`- ${locationLabel}`);
    }
    
    if (property.property_type) {
      parts.push(`[${property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}]`);
    }
    
    return parts.join(' ');
  };

  // Helper function to format location display name (shorter version)
  const formatLocationName = (location: any) => {
    if (!location.label) return `Location #${location.id}`;
    
    // Get the first two parts for a cleaner display
    const parts = location.label.split(',');
    if (parts.length >= 2) {
      return `${parts[0].trim()}, ${parts[1].trim()}`;
    }
    return parts[0].trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {brand === 'real-estate' ? 'Add New Lead' : 'Add New Inquiry'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {brand === 'real-estate'
                  ? 'Select a contact and fill property lead details'
                  : 'Select a contact and fill inquiry details'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contact */}
          <div>
            <Label>Select Contact *</Label>
            <Select
              value={form.contact_id.toString()}
              onValueChange={(v: string) => handleChange('contact_id', Number(v))}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Choose a contact" />
              </SelectTrigger>
              <SelectContent>
                {contacts.map(c => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.full_name} ({c.phone || c.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assigned To */}
          <div>
            <Label>Assign To</Label>
            <Select
              value={form.assigned_to_id ? form.assigned_to_id.toString() : ''}
              onValueChange={(v: string) => handleChange('assigned_to_id', Number(v))}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Assign team member" />
              </SelectTrigger>
              <SelectContent>
                {users.map(u => (
                  <SelectItem key={u.id} value={u.id.toString()}>
                    {u.full_name} ({u.role?.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Min Budget</Label>
              <Input
                type="number"
                placeholder="1000"
                value={form.budget_min}
                onChange={e => handleChange('budget_min', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Max Budget</Label>
              <Input
                type="number"
                placeholder="5000"
                value={form.budget_max}
                onChange={e => handleChange('budget_max', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>

          {brand === 'real-estate' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Property Type</Label>
                  <Select
                    value={form.property_type}
                    onValueChange={(v: string) => handleChange('property_type', v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {['villa', 'apartment', 'townhouse', 'penthouse', 'studio'].map(type => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Bedrooms</Label>
                  <Input
                    type="number"
                    placeholder="2"
                    value={form.bed}
                    onChange={e => handleChange('bed', e.target.value === '' ? '' : Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Bathrooms</Label>
                  <Input
                    type="number"
                    placeholder="3"
                    value={form.bath}
                    onChange={e => handleChange('bath', e.target.value === '' ? '' : Number(e.target.value))}
                  />
                </div>
              </div>

              {/* MultiSelectDropdowns - CORRECTED WITH ACTUAL DATA STRUCTURE */}
              <div>
                <MultiSelectDropdown
                  label="Preferred Locations"
                  options={locations.map(l => ({ 
                    id: l.id, 
                    name: formatLocationName(l) // Now uses the shorter formatted name
                  }))}
                  selectedIds={form.preferred_location_ids}
                  onChange={ids => handleChange('preferred_location_ids', ids)}
                  placeholder="Select locations..."
                />
              </div>

              <div>
                <MultiSelectDropdown
                  label="Properties"
                  options={properties.map(p => ({
                    id: p.id,
                    name: formatPropertyName(p) // Now properly formats with all info
                  }))}
                  selectedIds={form.property_ids}
                  onChange={ids => handleChange('property_ids', ids)}
                  placeholder="Select properties..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Lead Type</Label>
                  <Select
                    value={form.lead_type}
                    onValueChange={(v: string) => handleChange('lead_type', v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {['rent', 'sale'].map(t => (
                        <SelectItem key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Lead Source</Label>
                  <Select
                    value={form.source}
                    onValueChange={(v: string) => handleChange('source', v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {['website', 'referral', 'social', 'walkin', 'email', 'phone'].map(s => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v: string) => handleChange('status', v)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {['new', 'contacted', 'qualified'].map(s => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="col-span-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Additional info..."
                  value={form.notes}
                  onChange={e => handleChange('notes', e.target.value)}
                  className="mt-1.5 min-h-[80px]"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Lead
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}