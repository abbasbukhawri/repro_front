import { X, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface AddFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddFollowUpModal({ isOpen, onClose, onSubmit }: AddFollowUpModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 fade-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Schedule Follow-up</h2>
              <p className="text-sm text-gray-500 mt-1">Create a follow-up task</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="lead">Lead/Client *</Label>
            <Select name="lead" required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Mohammed Al-Rashid</SelectItem>
                <SelectItem value="2">Fatima Hassan</SelectItem>
                <SelectItem value="3">Ahmed Abdullah</SelectItem>
                <SelectItem value="4">Layla Ibrahim</SelectItem>
                <SelectItem value="5">Omar Khalid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Follow-up Type *</Label>
            <Select name="type" required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Phone Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="viewing">Property Viewing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Follow-up Date *</Label>
              <Input 
                id="date" 
                name="date"
                type="date" 
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
                className="mt-1.5" 
                required 
              />
            </div>
          </div>

          <div>
            <Label htmlFor="priority">Priority *</Label>
            <Select name="priority" defaultValue="medium">
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="assignee">Assign To *</Label>
            <Select name="assignee" required>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="michael">Michael Chen</SelectItem>
                <SelectItem value="emma">Emma Williams</SelectItem>
                <SelectItem value="james">James Brown</SelectItem>
                <SelectItem value="lisa">Lisa Anderson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input 
              id="subject" 
              name="subject"
              placeholder="Discuss property pricing and viewing availability" 
              className="mt-1.5" 
              required 
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              name="notes"
              placeholder="Client showed strong interest in 3BR properties. Follow up to discuss financing options and schedule viewing..."
              className="mt-1.5 min-h-[100px]"
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
              Schedule Follow-up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
