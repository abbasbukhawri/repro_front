import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Lead, updateLead } from '../../redux/slices/leadSlice';
import { MultiSelectDropdown } from '../ui/MultiSelectDropdown';

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadData?: Lead;
  onsubmit?: (data: any) => void;
  brand: 'real-estate' | 'business-setup';
}

export function EditLeadModal({ isOpen, onClose, leadData, brand }: EditLeadModalProps) {
  const dispatch = useAppDispatch();

  // Redux store data
  const { list: contacts } = useAppSelector(state => state.contact);
  const { list: users } = useAppSelector(state => state.user);
  const { list: properties } = useAppSelector(state => state.property);
  const { list: locations } = useAppSelector(state => state.location);

  // Form data state
  const [formData, setFormData] = useState<Partial<Lead>>({});

  useEffect(() => {
    if (leadData && isOpen) {
      setFormData({
        ...leadData,
        preferred_location_ids: leadData.preferred_location_ids || [],
        property_ids: leadData.property_ids || [],
      });
    }
  }, [leadData, isOpen]);

  const handleChange = (field: keyof Lead, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!leadData) return;

    const payload: Partial<Lead> = {};

    Object.keys(formData).forEach(key => {
      const k = key as keyof Lead;
      const value = formData[k];

      if (value !== leadData[k]) {
        if (k === 'notes_attributes' && typeof value === 'string') {
          payload.notes_attributes = [{ body: value }];
        } else {
          (payload[k] as Lead[typeof k]) = value as Lead[typeof k];
        }
      }
    });

    if (Object.keys(payload).length === 0) {
      onClose();
      return;
    }

    dispatch(updateLead({ id: leadData.id, data: { lead: payload } }));
    toast.success('Lead details updated successfully!');
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
      // Extract just the first part of the label
      const locationLabel = property.location.label.split(',')[0];
      parts.push(`- ${locationLabel}`);
    }
    
    if (property.property_type) {
      parts.push(`[${property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}]`);
    }
    
    return parts.join(' ');
  };

  // Helper function to format location display name
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Lead Details</DialogTitle>
          <DialogDescription>
            Update lead information. Only changed fields will be saved.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Contact */}
            <div className="space-y-2">
              <Label>Contact *</Label>
              <Select
                value={formData.contact_id?.toString() || ''}
                onValueChange={(value: string) => handleChange('contact_id', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {contacts.map(c => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.full_name} ({c.phone || c.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Source */}
            <div className="space-y-2">
              <Label>Source *</Label>
              <Select
                value={formData.source || ''}
                onValueChange={(value: string) => handleChange('source', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {['website', 'referral', 'social', 'walkin', 'email', 'phone'].map(source => (
                    <SelectItem key={source} value={source}>
                      {source.charAt(0).toUpperCase() + source.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label>Budget Min</Label>
              <Input
                type="number"
                value={formData.budget_min || ''}
                onChange={e => handleChange('budget_min', e.target.value === '' ? undefined : Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Budget Max</Label>
              <Input
                type="number"
                value={formData.budget_max || ''}
                onChange={e => handleChange('budget_max', e.target.value === '' ? undefined : Number(e.target.value))}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status *</Label>
              <Select
                value={formData.status || ''}
                onValueChange={(value: string) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new_lead">New Lead</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="viewing_scheduled">Viewing Scheduled</SelectItem>
                  <SelectItem value="offer_made">Offer Made</SelectItem>
                  <SelectItem value="won">Closed Won</SelectItem>
                  <SelectItem value="lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assigned To */}
            <div className="space-y-2">
              <Label>Assigned To *</Label>
              <Select
                value={formData.assigned_to_id?.toString() || ''}
                onValueChange={(value: string) => handleChange('assigned_to_id', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Assign agent" />
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

            {/* Beds & Baths */}
            <div className="space-y-2">
              <Label>Beds</Label>
              <Input
                type="number"
                value={formData.bed || ''}
                onChange={e => handleChange('bed', e.target.value === '' ? undefined : Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Baths</Label>
              <Input
                type="number"
                value={formData.bath || ''}
                onChange={e => handleChange('bath', e.target.value === '' ? undefined : Number(e.target.value))}
              />
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select
                value={formData.property_type || ''}
                onValueChange={(value: string) => handleChange('property_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {['villa', 'apartment', 'townhouse', 'penthouse', 'studio', 'house', 'plot', 'commercial'].map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Lead Type */}
            <div className="space-y-2">
              <Label>Lead Type</Label>
              <Select
                value={formData.lead_type || ''}
                onValueChange={(value: string) => handleChange('lead_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preferred Locations - Full Width */}
            <div className="space-y-2 md:col-span-2">
              <MultiSelectDropdown
                label="Preferred Locations"
                options={locations.map(l => ({ 
                  id: l.id, 
                  name: formatLocationName(l)
                }))}
                selectedIds={formData.preferred_location_ids || []}
                onChange={ids => handleChange('preferred_location_ids', ids)}
                placeholder="Select locations..."
              />
            </div>

            {/* Properties - Full Width */}
            <div className="space-y-2 md:col-span-2">
              <MultiSelectDropdown
                label="Properties"
                options={properties.map(p => ({
                  id: p.id,
                  name: formatPropertyName(p)
                }))}
                selectedIds={formData.property_ids || []}
                onChange={ids => handleChange('property_ids', ids)}
                placeholder="Select properties..."
              />
            </div>

            {/* Notes - Full Width */}
            <div className="space-y-2 md:col-span-2">
              <Label>Notes</Label>
              <Input
                type="text"
                value={formData.notes_attributes?.[0]?.body || ''}
                onChange={e => handleChange('notes_attributes', [{ body: e.target.value }])}
                placeholder="Add notes..."
              />
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}