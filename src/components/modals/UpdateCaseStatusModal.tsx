import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

interface UpdateCaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: { status: string; stage: string; notes?: string }) => void;
  currentCase?: { client: string; service: string; currentStatus: string } | null;
}

const statusOptions = [
  { value: 'new', label: 'New', stage: 'inquiry' },
  { value: 'contacted', label: 'Contacted', stage: 'inquiry' },
  { value: 'scheduled', label: 'Scheduled', stage: 'consultation' },
  { value: 'consultation-completed', label: 'Consultation Completed', stage: 'consultation' },
  { value: 'pending', label: 'Documents Pending', stage: 'documentation' },
  { value: 'review', label: 'Under Review', stage: 'documentation' },
  { value: 'documents-approved', label: 'Documents Approved', stage: 'documentation' },
  { value: 'submitted', label: 'Application Submitted', stage: 'application' },
  { value: 'processing', label: 'Processing', stage: 'application' },
  { value: 'government-pending', label: 'Government Pending', stage: 'government' },
  { value: 'government-submitted', label: 'Government Submitted', stage: 'government' },
  { value: 'approved', label: 'Approved', stage: 'approval' },
  { value: 'completed', label: 'License Issued', stage: 'issued' },
  { value: 'visa-processing', label: 'Visa Processing', stage: 'post-setup' },
  { value: 'renewal-pending', label: 'Renewal Pending', stage: 'post-setup' },
];

export function UpdateCaseStatusModal({ isOpen, onClose, onUpdate, currentCase }: UpdateCaseStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) return;
    
    const selectedOption = statusOptions.find(opt => opt.value === selectedStatus);
    
    onUpdate({
      status: selectedStatus,
      stage: selectedOption?.stage || 'inquiry',
      notes,
    });
    
    // Reset form
    setSelectedStatus('');
    setNotes('');
  };

  const getStatusColor = (stage: string) => {
    const colors: Record<string, string> = {
      'inquiry': 'bg-gray-100 text-gray-700',
      'consultation': 'bg-blue-100 text-blue-700',
      'documentation': 'bg-yellow-100 text-yellow-700',
      'application': 'bg-purple-100 text-purple-700',
      'government': 'bg-indigo-100 text-indigo-700',
      'approval': 'bg-orange-100 text-orange-700',
      'issued': 'bg-green-100 text-green-700',
      'post-setup': 'bg-teal-100 text-teal-700',
    };
    return colors[stage] || 'bg-gray-100 text-gray-700';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Case Status</DialogTitle>
          <DialogDescription>
            {currentCase ? `Update the status for ${currentCase.client}'s ${currentCase.service} case` : 'Update case status and stage'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Current Status */}
          {currentCase && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">Current Status</div>
              <Badge variant="secondary" className="text-xs">{currentCase.currentStatus}</Badge>
            </div>
          )}

          {/* New Status Selection */}
          <div className="space-y-2">
            <Label htmlFor="status">New Status *</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getStatusColor(option.stage)}`}>
                        {option.label}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stage Info */}
          {selectedStatus && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xs text-blue-600 mb-1">Pipeline Stage</div>
              <div className="text-sm font-medium text-blue-900">
                {statusOptions.find(opt => opt.value === selectedStatus)?.stage.toUpperCase()}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Status Update Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes about this status change..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-xl min-h-[80px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700"
              disabled={!selectedStatus}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Update Status
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
