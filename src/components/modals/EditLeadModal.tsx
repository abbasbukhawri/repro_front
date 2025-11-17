import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  brand: 'real-estate' | 'business-setup';
  leadData?: any;
}

export function EditLeadModal({ isOpen, onClose, onSubmit, brand, leadData }: EditLeadModalProps) {
  const [formData, setFormData] = useState<any>({});

  // Initialize form data when modal opens or leadData changes
  useEffect(() => {
    if (leadData) {
      setFormData(leadData);
    }
  }, [leadData, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Only submit fields that have changed
    const changedFields: any = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] !== leadData?.[key]) {
        changedFields[key] = formData[key];
      }
    });
    
    // If no fields changed, just close modal
    if (Object.keys(changedFields).length === 0) {
      onClose();
      return;
    }
    
    onSubmit(changedFields);
    toast.success('Lead details updated successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Lead Details</DialogTitle>
          <DialogDescription>Update the lead information below. Only changed fields will be saved.</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+971 50 123 4567"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select 
                value={formData.status || 'new'} 
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed-won">Closed Won</SelectItem>
                  <SelectItem value="closed-lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority || 'medium'} 
                onValueChange={(value) => handleChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select 
                value={formData.source || 'website'} 
                onValueChange={(value) => handleChange('source', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="direct">Direct</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {brand === 'real-estate' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    name="budget"
                    value={formData.budget || ''}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    placeholder="e.g., AED 2.5M - 3M"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select 
                    value={formData.propertyType || ''} 
                    onValueChange={(value) => handleChange('propertyType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location || ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g., Dubai Hills, Dubai Marina"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality || ''}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                    placeholder="e.g., British, Indian"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Required</Label>
                  <Select 
                    value={formData.service || ''} 
                    onValueChange={(value) => handleChange('service', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company-formation">Company Formation</SelectItem>
                      <SelectItem value="license-renewal">License Renewal</SelectItem>
                      <SelectItem value="visa-services">Visa Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Select 
                    value={formData.jurisdiction || ''} 
                    onValueChange={(value) => handleChange('jurisdiction', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free-zone">Free Zone</SelectItem>
                      <SelectItem value="mainland">Mainland</SelectItem>
                      <SelectItem value="offshore">Offshore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visas">Number of Visas</Label>
                  <Input
                    id="visas"
                    name="visas"
                    type="number"
                    value={formData.visas || ''}
                    onChange={(e) => handleChange('visas', e.target.value)}
                    placeholder="e.g., 3"
                  />
                </div>
              </>
            )}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="assignee">Assigned To</Label>
              <Select 
                value={formData.assignedTo || 'Sarah Johnson'} 
                onValueChange={(value) => handleChange('assignedTo', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                  <SelectItem value="Emma Williams">Emma Williams</SelectItem>
                  <SelectItem value="James Brown">James Brown</SelectItem>
                  <SelectItem value="Lisa Anderson">Lisa Anderson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Add any additional notes..."
                rows={4}
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