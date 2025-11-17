import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from 'lucide-react';

interface AssignPROModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (data: { officer: string; priority?: string }) => void;
  currentCase?: { client: string; service: string } | null;
}

const proOfficers = [
  { id: '1', name: 'Hassan Ali', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hassan', cases: 12 },
  { id: '2', name: 'Mariam Ahmed', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariam', cases: 8 },
  { id: '3', name: 'Khalid Ibrahim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=khalid', cases: 15 },
  { id: '4', name: 'Layla Hassan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=layla', cases: 10 },
  { id: '5', name: 'Ahmed Mansoor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed', cases: 6 },
];

export function AssignPROModal({ isOpen, onClose, onAssign, currentCase }: AssignPROModalProps) {
  const [selectedOfficer, setSelectedOfficer] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfficer) return;
    
    onAssign({
      officer: selectedOfficer,
      priority,
    });
    
    // Reset form
    setSelectedOfficer('');
    setPriority('medium');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign PRO Officer</DialogTitle>
          <DialogDescription>
            {currentCase ? `Assign a PRO officer to ${currentCase.client}'s ${currentCase.service} case` : 'Assign a PRO officer to this case'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* PRO Officer Selection */}
          <div className="space-y-2">
            <Label htmlFor="officer">PRO Officer *</Label>
            <Select value={selectedOfficer} onValueChange={setSelectedOfficer}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select PRO officer" />
              </SelectTrigger>
              <SelectContent>
                {proOfficers.map((officer) => (
                  <SelectItem key={officer.id} value={officer.name}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={officer.avatar} />
                        <AvatarFallback>{officer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2">
                        <span>{officer.name}</span>
                        <span className="text-xs text-gray-500">({officer.cases} cases)</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="rounded-xl">
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

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700"
              disabled={!selectedOfficer}
            >
              <User className="w-4 h-4 mr-2" />
              Assign Officer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
