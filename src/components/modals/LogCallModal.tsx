import { X, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface LogCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  leadName?: string;
}

export function LogCallModal({ isOpen, onClose, onSubmit, leadName }: LogCallModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    onClose();
  };

  const currentDate = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 fade-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Log Call</h2>
              {leadName && <p className="text-sm text-gray-500 mt-0.5">{leadName}</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="callType">Call Type *</Label>
            <Select name="callType" defaultValue="outgoing">
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outgoing">Outgoing Call</SelectItem>
                <SelectItem value="incoming">Incoming Call</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input 
                id="date" 
                name="date"
                type="date" 
                defaultValue={currentDate}
                className="mt-1.5" 
                required 
              />
            </div>

            <div>
              <Label htmlFor="time">Time *</Label>
              <Input 
                id="time" 
                name="time"
                type="time" 
                defaultValue={currentTime}
                className="mt-1.5" 
                required 
              />
            </div>
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input 
              id="duration" 
              name="duration"
              type="number" 
              placeholder="15" 
              className="mt-1.5"
              min="1"
            />
          </div>

          <div>
            <Label htmlFor="outcome">Call Outcome *</Label>
            <Select name="outcome" required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interested">Interested - Follow up needed</SelectItem>
                <SelectItem value="not-interested">Not Interested</SelectItem>
                <SelectItem value="callback">Requested Callback</SelectItem>
                <SelectItem value="meeting">Meeting Scheduled</SelectItem>
                <SelectItem value="viewing">Viewing Scheduled</SelectItem>
                <SelectItem value="no-answer">No Answer</SelectItem>
                <SelectItem value="voicemail">Left Voicemail</SelectItem>
                <SelectItem value="busy">Line Busy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Call Notes *</Label>
            <Textarea 
              id="notes" 
              name="notes"
              placeholder="Discussed property requirements, budget concerns, availability for viewing..."
              className="mt-1.5 min-h-[100px]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Save Call Log
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
