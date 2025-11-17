import { useState } from 'react';
import { RefreshCw, Calendar, Building2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface CreateRenewalTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateRenewalTaskModal({ isOpen, onClose }: CreateRenewalTaskModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    renewalType: '',
    expiryDate: '',
    client: '',
    fee: '',
    assignedTo: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company || !formData.renewalType || !formData.expiryDate || !formData.client) {
      toast.error('Missing Required Fields', {
        description: 'Please fill in all required fields'
      });
      return;
    }

    // Here you would typically save to your state/backend
    toast.success('Renewal Task Created', {
      description: `${formData.renewalType} renewal task for ${formData.company} has been created`
    });

    // Reset form
    setFormData({
      company: '',
      renewalType: '',
      expiryDate: '',
      client: '',
      fee: '',
      assignedTo: '',
      notes: '',
    });

    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <RefreshCw className="w-5 h-5 text-green-600" strokeWidth={1.5} />
            </div>
            Create Renewal Task
          </DialogTitle>
          <DialogDescription>
            Set up a new renewal task for license, visa, or contract renewals
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="e.g., Tech Solutions LLC"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Renewal Type */}
          <div className="space-y-2">
            <Label htmlFor="renewalType">
              Renewal Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.renewalType}
              onValueChange={(value) => handleChange('renewalType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select renewal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Trade License">Trade License</SelectItem>
                <SelectItem value="Visa Renewal">Visa Renewal</SelectItem>
                <SelectItem value="Ejari Renewal">Ejari Renewal</SelectItem>
                <SelectItem value="Contract Renewal">Contract Renewal</SelectItem>
                <SelectItem value="Insurance Renewal">Insurance Renewal</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div className="space-y-2">
              <Label htmlFor="expiryDate">
                Expiry Date <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange('expiryDate', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="client">
                Client Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => handleChange('client', e.target.value)}
                placeholder="e.g., John Smith"
                required
              />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fee */}
            <div className="space-y-2">
              <Label htmlFor="fee">Renewal Fee</Label>
              <Input
                id="fee"
                value={formData.fee}
                onChange={(e) => handleChange('fee', e.target.value)}
                placeholder="e.g., AED 15,000"
              />
            </div>

            {/* Assigned To */}
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assign To</Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) => handleChange('assignedTo', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Michael Chen</SelectItem>
                  <SelectItem value="emma">Emma Williams</SelectItem>
                  <SelectItem value="james">James Brown</SelectItem>
                  <SelectItem value="raj">Raj Patel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Add any additional notes or instructions..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
