import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { fetchRoles } from "../../redux/slices/roleSlice";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface AddUserModalProps {
isOpen: boolean;
onClose: () => void;
onSubmit: (data: any) => void;
}

export function AddUserModal({ isOpen, onClose, onSubmit }: AddUserModalProps) {


   const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.role.list);

const [formData, setFormData] = useState({
first_name: '',
last_name: '',
email: '',
password: '',
password_confirmation: '',
phone: '',
role_id: null as number | null,
brand_access: null as number | null, // 0, 1, or 2
status: 0, // default Active
});

const handleChange = (field: string, value: any) => {
setFormData(prev => ({
...prev,
[field]: value
}));
};

const handleBrandIdSelection = (value: number) => {
setFormData(prev => ({
...prev,
brand_access: value
}));
};

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
onSubmit(formData);
// Reset form
setFormData({
first_name: '',
last_name: '',
email: '',
password: '',
password_confirmation: '',
phone: '',
role_id: null,
brand_access: null,
status: 0, // always default Active
});
};

return (
  
  <Dialog open={isOpen} onOpenChange={onClose}> <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"> <DialogHeader> <div className="flex items-center gap-3"> <div className="p-2 bg-blue-50 rounded-lg"> <UserPlus className="w-5 h-5 text-blue-600" /> </div> <div> <DialogTitle>Add New User</DialogTitle> <DialogDescription>Create a new user account with role and permissions</DialogDescription> </div> </div> </DialogHeader>


    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name *</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name *</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
            placeholder="Enter last name"
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
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password_confirmation">Confirm Password *</Label>
          <Input
            id="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={(e) => handleChange('password_confirmation', e.target.value)}
            placeholder="Confirm password"
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
        <Select
  value={formData.role_id !== null ? String(formData.role_id) : undefined}
  onValueChange={(value: string) => handleChange('role_id', parseInt(value, 10))}
>
  <SelectTrigger>
    <SelectValue placeholder="Select role" />
  </SelectTrigger>
  <SelectContent>
    {roles.map((role) => (
      <SelectItem key={role.id} value={String(role.id)}>
        {role.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Brand Access *</Label>

          {/* Business Setup (0) */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bs-access"
              checked={formData.brand_access === 0}
              onCheckedChange={() => handleBrandIdSelection(0)}
            />
            <label htmlFor="bs-access" className="text-sm cursor-pointer">
              Business Setup (Probiz Corporate)
            </label>
          </div>

          {/* Real Estate (1) */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="re-access"
              checked={formData.brand_access === 1}
              onCheckedChange={() => handleBrandIdSelection(1)}
            />
            <label htmlFor="re-access" className="text-sm cursor-pointer">
              Real Estate (ReproLeaders)
            </label>
          </div>

          {/* Both (2) */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="both-access"
              checked={formData.brand_access === 2}
              onCheckedChange={() => handleBrandIdSelection(2)}
            />
            <label htmlFor="both-access" className="text-sm cursor-pointer">
              Both (BS + RE)
            </label>
          </div>

          {formData.brand_access === null && (
            <p className="text-xs text-red-500 mt-1">
              Please select at least one brand access
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={formData.brand_access === null}
        >
          Create User
        </Button>
      </div>
    </form>
  </DialogContent>
</Dialog>

);
}
