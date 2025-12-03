import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Lead, updateLead } from '../../redux/slices/leadSlice';

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadData?: Lead;
  brand: 'real-estate' | 'business-setup';
}

export function EditLeadModal({ isOpen, onClose, leadData, brand }: EditLeadModalProps) {
  const dispatch = useAppDispatch();
  const { list: contacts } = useAppSelector((state) => state.contact);
  const { list: users } = useAppSelector((state) => state.user);

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

  // ✅ Wrap payload under "lead"
  dispatch(updateLead({ id: leadData.id, data: { lead: payload } }));
  toast.success('Lead details updated successfully!');
  onClose();
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
                value={formData.contact_id || ''}
                onValueChange={(value: any) => handleChange('contact_id', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map(c => (
                    <SelectItem key={c.id} value={c.id}>
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
                onValueChange={(value: any) => handleChange('source', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="walkin">Walk-in</SelectItem>
                  <SelectItem value="email">Email Campaign</SelectItem>
                  <SelectItem value="phone">Phone Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label>Budget Min</Label>
              <Input
                type="number"
                value={formData.budget_min || ''}
                onChange={e => handleChange('budget_min', Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Budget Max</Label>
              <Input
                type="number"
                value={formData.budget_max || ''}
                onChange={e => handleChange('budget_max', Number(e.target.value))}
              />
            </div>

            {/* Preferred Locations */}
            <div className="space-y-2 md:col-span-2">
              <Label>Preferred Locations</Label>
              <Input
                placeholder="1,2,3"
                value={formData.preferred_location_ids?.join(',') || ''}
                onChange={e =>
                  handleChange(
                    'preferred_location_ids',
                    e.target.value.split(',').map(Number)
                  )
                }
              />
            </div>

            {/* Properties */}
            <div className="space-y-2 md:col-span-2">
              <Label>Property IDs</Label>
              <Input
                placeholder="1,2,3"
                value={formData.property_ids?.join(',') || ''}
                onChange={e =>
                  handleChange(
                    'property_ids',
                    e.target.value.split(',').map(Number)
                  )
                }
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status *</Label>
              <Select
                value={formData.status || ''}
                onValueChange={(value: any) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new_lead">New</SelectItem>
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
                value={formData.assigned_to_id || ''}
                onValueChange={(value: any) => handleChange('assigned_to_id', Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Assign agent" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(u => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.full_name} ({u.role?.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Beds */}
            <div className="space-y-2">
              <Label>Beds</Label>
              <Input
                type="number"
                value={formData.bed || ''}
                onChange={e => handleChange('bed', Number(e.target.value))}
              />
            </div>

            {/* Baths */}
            <div className="space-y-2">
              <Label>Baths</Label>
              <Input
                type="number"
                value={formData.bath || ''}
                onChange={e => handleChange('bath', Number(e.target.value))}
              />
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select
                value={formData.property_type || ''}
                onValueChange={(value: any) => handleChange('property_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lead Type */}
            <div className="space-y-2">
              <Label>Lead Type</Label>
              <Select
                value={formData.lead_type || ''}
                onValueChange={(value: any) => handleChange('lead_type', value)}
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
