import { useState } from 'react';
import { Users, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  availableUsers: any[];
}

export function CreateTeamModal({ isOpen, onClose, onSubmit, availableUsers }: CreateTeamModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Real Estate',
    leadId: '',
    memberIds: [] as number[],
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMemberToggle = (userId: number) => {
    setFormData(prev => ({
      ...prev,
      memberIds: prev.memberIds.includes(userId)
        ? prev.memberIds.filter(id => id !== userId)
        : [...prev.memberIds, userId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: '',
      brand: 'Real Estate',
      leadId: '',
      memberIds: [],
    });
  };

  // Filter users based on selected brand
  const filteredUsers = availableUsers.filter(user => 
    user.brandAccess.includes(formData.brand)
  );

  const selectedLead = filteredUsers.find(user => user.id.toString() === formData.leadId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>Set up a new team with members and a team lead</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name *</Label>
              <Input
                id="team-name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter team name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand/Department *</Label>
              <Select value={formData.brand} onValueChange={(value) => {
                handleChange('brand', value);
                // Reset lead and members when brand changes
                setFormData(prev => ({ ...prev, brand: value, leadId: '', memberIds: [] }));
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Real Estate">Real Estate (ReproLeaders)</SelectItem>
                  <SelectItem value="Business Setup">Business Setup (Probiz Corporate)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team-lead">Team Lead *</Label>
              <Select 
                value={formData.leadId} 
                onValueChange={(value) => handleChange('leadId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team lead" />
                </SelectTrigger>
                <SelectContent>
                  {filteredUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      <div className="flex items-center gap-2">
                        <span>{user.name}</span>
                        <span className="text-xs text-gray-500">({user.role})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Team Members {formData.memberIds.length > 0 && `(${formData.memberIds.length} selected)`}</Label>
              <ScrollArea className="h-[250px] border rounded-lg p-4">
                <div className="space-y-3">
                  {filteredUsers.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No users available for this brand
                    </p>
                  ) : (
                    filteredUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <Checkbox
                          id={`member-${user.id}`}
                          checked={formData.memberIds.includes(user.id)}
                          onCheckedChange={() => handleMemberToggle(user.id)}
                        />
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <label
                          htmlFor={`member-${user.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="text-sm">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.role} • {user.email}</div>
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!formData.name || !formData.leadId}
            >
              Create Team
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
