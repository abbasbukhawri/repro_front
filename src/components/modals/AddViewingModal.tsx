import { X, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface AddViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  entityName?: string;
}

export function AddViewingModal({ isOpen, onClose, onSubmit, entityName }: AddViewingModalProps) {
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
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-in zoom-in-95 fade-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Schedule Property Viewing</h2>
              <p className="text-sm text-gray-500 mt-1">Book a viewing appointment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="property">Property *</Label>
              <Select name="property" required>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Luxurious 4BR Villa - Dubai Hills Estate</SelectItem>
                  <SelectItem value="2">Modern 2BR Apartment - Dubai Marina</SelectItem>
                  <SelectItem value="3">Spacious 3BR Townhouse - Arabian Ranches</SelectItem>
                  <SelectItem value="4">Premium Penthouse - Downtown Dubai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="lead">Client/Lead *</Label>
              <Select name="lead" required>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select client" />
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
              <Label htmlFor="date">Viewing Date *</Label>
              <Input 
                id="date" 
                name="date"
                type="date" 
                className="mt-1.5" 
                required 
              />
            </div>

            <div>
              <Label htmlFor="time">Viewing Time *</Label>
              <Input 
                id="time" 
                name="time"
                type="time" 
                className="mt-1.5" 
                required 
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration (minutes) *</Label>
              <Select name="duration" defaultValue="30">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="agent">Assigned Agent *</Label>
              <Select name="agent" required>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select agent" />
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

            <div className="col-span-2">
              <Label htmlFor="meetingPoint">Meeting Point</Label>
              <Input 
                id="meetingPoint" 
                name="meetingPoint"
                placeholder="Property entrance, office, etc." 
                className="mt-1.5" 
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                name="notes"
                placeholder="Special requirements, client preferences, access instructions..."
                className="mt-1.5 min-h-[80px]"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="reminder">Send Reminder</Label>
              <Select name="reminder" defaultValue="1hour">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No reminder</SelectItem>
                  <SelectItem value="15min">15 minutes before</SelectItem>
                  <SelectItem value="30min">30 minutes before</SelectItem>
                  <SelectItem value="1hour">1 hour before</SelectItem>
                  <SelectItem value="1day">1 day before</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              Schedule Viewing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}