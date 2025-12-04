import { useState } from 'react';
import { X, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface AddDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddDealModal({ isOpen, onClose, onSubmit }: AddDealModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    property: '',
    value: '',
    stage: 'Lead',
    probability: '25',
    expectedClose: '',
    assignedTo: 'Sarah Johnson',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      client: '',
      property: '',
      value: '',
      stage: 'Lead',
      probability: '25',
      expectedClose: '',
      assignedTo: 'Sarah Johnson',
      notes: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


    const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState('');
  const [assignedDropdownOpen, setAssignedDropdownOpen] = useState(false);
  const [assignedSearch, setAssignedSearch] = useState('')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <Briefcase className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <DialogTitle className="text-xl">Add New Deal</DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                Create a new deal opportunity in the pipeline
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Deal Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Deal Title *</Label>
            <Input
              id="title"
              required
              placeholder="e.g., Villa Sale - Dubai Hills Estate"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="rounded-xl border-gray-300 h-11"
            />
          </div>

          {/* Client & Property */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client" className="text-sm font-semibold text-gray-700">Client Name *</Label>
              <Input
                id="client"
                required
                placeholder="Client name"
                value={formData.client}
                onChange={(e) => handleChange('client', e.target.value)}
                className="rounded-xl border-gray-300 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property" className="text-sm font-semibold text-gray-700">Property *</Label>
              <Input
                id="property"
                required
                placeholder="Property name/ID"
                value={formData.property}
                onChange={(e) => handleChange('property', e.target.value)}
                className="rounded-xl border-gray-300 h-11"
              />
            </div>
          </div>

          {/* Value & Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value" className="text-sm font-semibold text-gray-700">Deal Value (AED) *</Label>
              <Input
                id="value"
                type="number"
                required
                placeholder="e.g., 4500000"
                value={formData.value}
                onChange={(e) => handleChange('value', e.target.value)}
                className="rounded-xl border-gray-300 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage" className="text-sm font-semibold text-gray-700">Pipeline Stage *</Label>
              <Select value={formData.stage} onValueChange={(value: string) => handleChange('stage', value)}>
                <SelectTrigger className="rounded-xl border-gray-300 h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Viewing Scheduled">Viewing Scheduled</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Closing">Closing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Probability & Expected Close */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="probability" className="text-sm font-semibold text-gray-700">Win Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                placeholder="e.g., 75"
                value={formData.probability}
                onChange={(e) => handleChange('probability', e.target.value)}
                className="rounded-xl border-gray-300 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedClose" className="text-sm font-semibold text-gray-700">Expected Close Date *</Label>
              <Input
                id="expectedClose"
                type="date"
                required
                value={formData.expectedClose}
                onChange={(e) => handleChange('expectedClose', e.target.value)}
                className="rounded-xl border-gray-300 h-11"
              />
            </div>
          </div>

          {/* Assigned To */}
          <div className="space-y-2">
            <Label htmlFor="assignedTo" className="text-sm font-semibold text-gray-700">Assigned To *</Label>
            <Select value={formData.assignedTo} onValueChange={(value: string) => handleChange('assignedTo', value)}>
              <SelectTrigger className="rounded-xl border-gray-300 h-11">
                <SelectValue />
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

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about the deal..."
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="rounded-xl border-gray-300 min-h-[100px]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl h-11"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl h-11 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              <Briefcase className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Add Deal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
