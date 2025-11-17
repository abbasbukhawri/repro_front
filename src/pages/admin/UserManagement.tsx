import { useState } from 'react';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { AddUserModal } from '../../components/modals/AddUserModal';
import { EditUserModal } from '../../components/modals/EditUserModal';
import { DeleteConfirmationModal } from '../../components/modals/DeleteConfirmationModal';
import { toast } from 'sonner';

interface UserManagementProps {
  onNavigate: (page: string) => void;
}

const initialUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@repro.ae', phone: '+971 50 123 4567', role: 'Agent', brandAccess: ['Real Estate'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
  { id: 2, name: 'Michael Chen', email: 'michael@repro.ae', phone: '+971 50 234 5678', role: 'Agent', brandAccess: ['Real Estate'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
  { id: 3, name: 'Hassan Ali', email: 'hassan@probiz.ae', phone: '+971 50 345 6789', role: 'PRO Officer', brandAccess: ['Business Setup'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hassan' },
  { id: 4, name: 'Admin User', email: 'admin@dualcrm.com', phone: '+971 50 456 7890', role: 'Super Admin', brandAccess: ['Real Estate', 'Business Setup'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' },
  { id: 5, name: 'Emma Williams', email: 'emma@repro.ae', phone: '+971 50 567 8901', role: 'Manager', brandAccess: ['Real Estate'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
];

export function UserManagement({ onNavigate }: UserManagementProps) {
  const [users, setUsers] = useState(initialUsers);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleAddUser = (data: any) => {
    const newUser = {
      id: users.length + 1,
      ...data,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name.toLowerCase().replace(' ', '')}`
    };
    setUsers([...users, newUser]);
    toast.success(`User "${data.name}" created successfully!`);
    setAddUserModalOpen(false);
  };

  const handleEditUser = (userId: number, data: any) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...data } : user
    ));
    toast.success(`User updated successfully!`);
    setEditUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      toast.success(`User "${selectedUser.name}" deleted successfully!`);
      setSelectedUser(null);
    }
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setEditUserModalOpen(true);
  };

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const reAgents = users.filter(u => u.brandAccess.includes('Real Estate') && (u.role === 'Agent' || u.role === 'Manager')).length;
  const proOfficers = users.filter(u => u.brandAccess.includes('Business Setup') && u.role === 'PRO Officer').length;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="User Management"
        description="Manage user accounts and permissions"
        actions={
          <Button onClick={() => setAddUserModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Total Users</div>
            <div className="text-2xl">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Active Users</div>
            <div className="text-2xl">{activeUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">RE Agents</div>
            <div className="text-2xl">{reAgents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">PRO Officers</div>
            <div className="text-2xl">{proOfficers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm mb-1">{user.name}</div>
                    <div className="text-xs text-gray-600">{user.email}</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Role</div>
                    <Badge variant="secondary">{user.role}</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Brand Access</div>
                    <div className="flex gap-1">
                      {user.brandAccess.map((brand, i) => (
                        <Badge key={i} className={brand === 'Real Estate' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
                          {brand === 'Real Estate' ? 'RE' : 'BS'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Status</div>
                    <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openEditModal(user)}
                      title="Edit User"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onNavigate('roles')}
                      title="View Permissions"
                    >
                      <Shield className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => openDeleteModal(user)}
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => {
          setEditUserModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleEditUser}
        userData={selectedUser}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        itemName={selectedUser?.name}
      />
    </div>
  );
}