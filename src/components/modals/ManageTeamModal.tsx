import { useState, useEffect } from 'react';
import { Users, Trash2, UserMinus } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';

interface ManageTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (teamId: number, data: any) => void;
  onDelete: (teamId: number) => void;
  teamData: any;
  availableUsers: any[];
}

export function ManageTeamModal({ 
  isOpen, 
  onClose, 
  onUpdate, 
  onDelete,
  teamData, 
  availableUsers 
}: ManageTeamModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Real Estate',
    leadId: '',
    memberIds: [] as number[],
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (teamData) {
      setFormData({
        name: teamData.name || '',
        brand: teamData.brand || 'Real Estate',
        leadId: teamData.leadId?.toString() || '',
        memberIds: teamData.memberIds || [],
      });
    }
  }, [teamData, isOpen]);

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
    
    // Only submit changed fields
    const changedFields: any = {};
    Object.keys(formData).forEach(key => {
      const currentValue = formData[key as keyof typeof formData];
      const originalValue = key === 'leadId' ? teamData?.[key]?.toString() : teamData?.[key];
      
      if (JSON.stringify(currentValue) !== JSON.stringify(originalValue)) {
        changedFields[key] = currentValue;
      }
    });

    if (Object.keys(changedFields).length === 0) {
      onClose();
      return;
    }

    onUpdate(teamData.id, changedFields);
    toast.success('Team updated successfully!');
  };

  const handleDelete = () => {
    onDelete(teamData.id);
    toast.success('Team deleted successfully!');
    setShowDeleteConfirm(false);
    onClose();
  };

  // Filter users based on selected brand
  const filteredUsers = availableUsers.filter(user => 
    user.brandAccess.includes(formData.brand)
  );

  const currentMembers = filteredUsers.filter(user => 
    formData.memberIds.includes(user.id)
  );

  const selectedLead = filteredUsers.find(user => user.id.toString() === formData.leadId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle>Manage Team</DialogTitle>
                <DialogDescription>Update team details and members</DialogDescription>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-600 hover:bg-red-50"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Team
            </Button>
          </div>
        </DialogHeader>

        {showDeleteConfirm ? (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                <h3 className="font-medium text-red-600">Delete Team</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Are you sure you want to delete "{teamData?.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Team Details</TabsTrigger>
              <TabsTrigger value="members">Members ({currentMembers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name-edit">Team Name *</Label>
                  <Input
                    id="team-name-edit"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter team name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand-edit">Brand/Department *</Label>
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
                  <Label htmlFor="team-lead-edit">Team Lead *</Label>
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
                  {selectedLead && (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg mt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedLead.avatar} />
                        <AvatarFallback>{selectedLead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm">{selectedLead.name}</div>
                        <div className="text-xs text-gray-500">{selectedLead.email}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Team Members {formData.memberIds.length > 0 && `(${formData.memberIds.length} selected)`}</Label>
                  <ScrollArea className="h-[200px] border rounded-lg p-4">
                    <div className="space-y-3">
                      {filteredUsers.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No users available for this brand
                        </p>
                      ) : (
                        filteredUsers.map((user) => (
                          <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <Checkbox
                              id={`member-edit-${user.id}`}
                              checked={formData.memberIds.includes(user.id)}
                              onCheckedChange={() => handleMemberToggle(user.id)}
                            />
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <label
                              htmlFor={`member-edit-${user.id}`}
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

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!formData.name || !formData.leadId}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="members" className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {currentMembers.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">No members in this team</p>
                      <p className="text-xs text-gray-400 mt-1">Add members in the Team Details tab</p>
                    </div>
                  ) : (
                    currentMembers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm flex items-center gap-2">
                              {user.name}
                              {user.id.toString() === formData.leadId && (
                                <Badge className="text-xs">Team Lead</Badge>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{user.role}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMemberToggle(user.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <UserMinus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}