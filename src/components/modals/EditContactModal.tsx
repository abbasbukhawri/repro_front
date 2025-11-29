import { useState, useEffect } from 'react';
import { X, Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers } from '../../redux/slices/userSlice';

interface EditContactModalProps {
isOpen: boolean;
onClose: () => void;
onSubmit: (data: any) => void;
contact: any; // The contact object to edit
}

export function EditContactModal({ isOpen, onClose, onSubmit, contact }: EditContactModalProps) {
const dispatch = useAppDispatch();
const users = useAppSelector((state) => state.user.list);

const [searchTerm, setSearchTerm] = useState('');
const [filteredUsers, setFilteredUsers] = useState(users);

const [formData, setFormData] = useState({ ...contact });

const kindOptions = ['customer', 'lead', 'inquiry', 'vendor', 'partner'];
const statusOptions = ['active', 'inactive', 'converted'];
const sourceOptions = ['website', 'whatsapp', 'call'];
const brandAccessOptions = [
{ label: 'Business Setup (Probiz Corporate)', value: 0 },
{ label: 'Real Estate (ReproLeaders)', value: 1 },
{ label: 'Both (BS + RE)', value: 2 },
];

useEffect(() => {
dispatch(fetchUsers());
}, [dispatch]);

useEffect(() => {
setFilteredUsers(
users.filter(u =>
`${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
)
);
}, [searchTerm, users]);

useEffect(() => {
// Whenever contact changes, update formData
setFormData({ ...contact });
}, [contact]);

const handleChange = (field: string, value: any) => {
setFormData((prev: any) => ({ ...prev, [field]: value }));
};

const handleBrandSelection = (value: number) => {
setFormData((prev: any) => ({ ...prev, brand_access: value }));
};

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
onSubmit(formData);
onClose();
};

return ( <Dialog open={isOpen} onOpenChange={onClose}> <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto"> <DialogHeader> <div className="flex items-center gap-3"> <div className="p-2 bg-yellow-50 rounded-lg"> <Edit2 className="w-5 h-5 text-yellow-600" /> </div> <div> <DialogTitle>Edit Contact</DialogTitle> <DialogDescription>Update contact details</DialogDescription> </div> </div> </DialogHeader>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name *</Label>
          <Input
            id="first_name"
            value={formData.first_name || ''}
            onChange={(e) => handleChange('first_name', e.target.value)}
            placeholder="Enter first name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name *</Label>
          <Input
            id="last_name"
            value={formData.last_name || ''}
            onChange={(e) => handleChange('last_name', e.target.value)}
            placeholder="Enter last name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="email@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+971 50 123 4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kind">Kind *</Label>
          <Select value={formData.kind || 'lead'} onValueChange={(value: any) => handleChange('kind', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select kind" />
            </SelectTrigger>
            <SelectContent>
              {kindOptions.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={formData.status || 'active'} onValueChange={(value: any) => handleChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">Source *</Label>
          <Select value={formData.source || 'website'} onValueChange={(value: any) => handleChange('source', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              {sourceOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

         <div className="space-y-2 md:col-span-2">
  <Label htmlFor="assigned_to">Assign To</Label>
  <Select
    value={formData.assigned_to_id ? formData.assigned_to_id.toString() : ''}
    onValueChange={(value: string) => handleChange('assigned_to_id', parseInt(value))}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select user" />
    </SelectTrigger>
    <SelectContent className="max-h-60 overflow-y-auto">
      <div className="p-2">
        <Input
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
      </div>
      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <SelectItem key={user.id} value={user.id.toString()}>
            {user.first_name} {user.last_name} ({user.email})
          </SelectItem>
        ))
      ) : (
        <div className="px-3 py-2 text-gray-500 text-sm">No users found</div>
      )}
    </SelectContent>
  </Select>
</div>

        <div className="space-y-2 md:col-span-2">
          <Label>Brand Access *</Label>
          {brandAccessOptions.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                checked={formData.brand_access === option.value}
                onCheckedChange={() => handleBrandSelection(option.value)}
              />
              <label className="text-sm cursor-pointer">{option.label}</label>
            </div>
          ))}
          {formData.brand_access === null && (
            <p className="text-xs text-red-500 mt-1">Please select at least one brand access</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700" disabled={formData.brand_access === null}>Update Contact</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>

);
}
