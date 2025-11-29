
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRoles } from '../../redux/slices/roleSlice';
import { UserCog } from 'lucide-react';
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
  onSubmit?: (userId: number, data: any) => void;
  userData?: any;
}

export function EditUserModal({ isOpen, onClose, userData, onSubmit }: EditUserModalProps) {
  const dispatch = useAppDispatch();
  const roles = useAppSelector(state => state.role.list);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role_id: null as number | null,
    brand_access: 0, // 0 = probiz, 1 = repro, 2 = both
    status: 0,       // 0 = active, 1 = inactive
  });

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchRoles());
      if (userData) {
        setFormData({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          password: '',
          password_confirmation: '',
          role_id: userData.role?.id || null,
          brand_access: userData.brand_access ?? 0,
          status: userData.status === 'inactive' ? 1 : 0,
        });
      }
    }
  }, [isOpen, userData, dispatch]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBrandSelection = (value: number) => {
    setFormData(prev => ({ ...prev, brand_access: value }));
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!userData?.id) return;

  // Start with original user data
  const payload: any = {
    first_name: formData.first_name || userData.first_name,
    last_name: formData.last_name || userData.last_name,
    email: formData.email || userData.email,
    phone: formData.phone || userData.phone,
    brand_access: formData.brand_access ?? userData.brand_access,
    status: formData.status ?? (userData.status === 'inactive' ? 1 : 0),
    role_id: formData.role_id ?? userData.role?.id,
  };

  // Include password only if changed
  if (formData.password) payload.password = formData.password;
  if (formData.password_confirmation) payload.password_confirmation = formData.password_confirmation;

  onSubmit?.(userData.id, payload); // id stays outside

  onClose();
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
              <DialogDescription>Update user information, role, brand access, and status.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input id="first_name" value={formData.first_name} onChange={e => handleChange('first_name', e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input id="last_name" value={formData.last_name} onChange={e => handleChange('last_name', e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={formData.password} onChange={e => handleChange('password', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input id="password_confirmation" type="password" value={formData.password_confirmation} onChange={e => handleChange('password_confirmation', e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Role *</Label>
              <Select value={formData.role_id !== null ? String(formData.role_id) : undefined} onValueChange={(v: string) => handleChange('role_id', parseInt(v, 10))}>
                <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Brand Access *</Label>
              {[{ label: 'Probiz (Business Setup)', value: 0 }, { label: 'Repro (Real Estate)', value: 1 }, { label: 'Both', value: 2 }].map(brand => (
                <div className="flex items-center space-x-2" key={brand.value}>
                  <Checkbox
                    id={`brand-${brand.value}`}
                    checked={formData.brand_access === brand.value}
                    onCheckedChange={() => handleBrandSelection(brand.value)}
                  />
                  <label htmlFor={`brand-${brand.value}`} className="text-sm cursor-pointer">{brand.label}</label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={String(formData.status)} onValueChange={(v: string) => handleChange('status', parseInt(v, 10))}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Active</SelectItem>
                  <SelectItem value="1">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
