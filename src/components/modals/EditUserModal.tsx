import { useState, useEffect } from 'react';
import { X, UserCog } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userId: number, data: any) => void;
  userData: any;
}

export function EditUserModal({ isOpen, onClose, onSubmit, userData }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Agent',
    brandAccess: [] as string[],
    status: 'Active',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        role: userData.role || 'Agent',
        brandAccess: userData.brandAccess || [],
        status: userData.status || 'Active',
      });
    }
  }, [userData, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBrandAccessToggle = (brand: string) => {
    setFormData(prev => ({
      ...prev,
      brandAccess: prev.brandAccess.includes(brand)
        ? prev.brandAccess.filter(b => b !== brand)
        : [...prev.brandAccess, brand]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only submit changed fields
    const changedFields: any = {};
    Object.keys(formData).forEach(key => {
      if (JSON.stringify(formData[key as keyof typeof formData]) !== JSON.stringify(userData?.[key])) {
        changedFields[key] = formData[key as keyof typeof formData];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      onClose();
      return;
    }

    onSubmit(userData.id, changedFields);
    toast.success('User updated successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <UserCog className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information and permissions. Only changed fields will be saved.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+971 50 123 4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="PRO Officer">PRO Officer</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Brand Access *</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="re-access-edit"
                    checked={formData.brandAccess.includes('Real Estate')}
                    onCheckedChange={() => handleBrandAccessToggle('Real Estate')}
                  />
                  <label
                    htmlFor="re-access-edit"
                    className="text-sm cursor-pointer"
                  >
                    Real Estate (ReproLeaders)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bs-access-edit"
                    checked={formData.brandAccess.includes('Business Setup')}
                    onCheckedChange={() => handleBrandAccessToggle('Business Setup')}
                  />
                  <label
                    htmlFor="bs-access-edit"
                    className="text-sm cursor-pointer"
                  >
                    Business Setup (Probiz Corporate)
                  </label>
                </div>
              </div>
              {formData.brandAccess.length === 0 && (
                <p className="text-xs text-red-500 mt-1">Please select at least one brand access</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={formData.brandAccess.length === 0}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}