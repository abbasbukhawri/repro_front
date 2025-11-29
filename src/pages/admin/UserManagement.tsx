import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Shield } from "lucide-react";
import { PageHeader } from "../../components/crm/PageHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { AddUserModal } from "../../components/modals/AddUserModal";
import { EditUserModal } from "../../components/modals/EditUserModal";
import { DeleteConfirmationModal } from "../../components/modals/DeleteConfirmationModal";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../redux/slices/userSlice";

interface UserManagementProps {
onNavigate: (page: string) => void;
}

export function UserManagement({ onNavigate }: UserManagementProps) {
const dispatch = useAppDispatch();
const { list: users, loading } = useAppSelector((state) => state.user);

useEffect(() => {
dispatch(fetchUsers());
}, [dispatch]);

const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState<any>(null);

const handleAddUser = async (data: any) => {
  try {
    await dispatch(createUser(data)).unwrap();
    dispatch(fetchUsers());
    toast.success(`User "${data.first_name}" created successfully!`);
    setAddUserModalOpen(false);
  } catch (err: any) {
    toast.error(err.message || "Failed to create user");
  }
};


const handleEditUser = async (userId: number, data: any) => {
  try {
    await dispatch(updateUser({ id: userId, ...data })).unwrap();

    dispatch(fetchUsers());
    toast.success("User updated successfully!");
    setEditUserModalOpen(false);
    setSelectedUser(null);
  } catch (err: any) {
    toast.error(err.message || "Failed to update user");
  }
};


const handleDeleteUser = async () => {
  if (!selectedUser) return;
  try {
    await dispatch(deleteUser(selectedUser.id)).unwrap();
    dispatch(fetchUsers());

    toast.success(`User "${selectedUser.first_name}" deleted successfully!`);
    setSelectedUser(null);
    setDeleteModalOpen(false);
  } catch (err: any) {
    toast.error(err.message || "Failed to delete user");
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

// Map string from API to number for easier badge handling
const brandAccessMap: Record<string, number> = {
probiz: 0,
repro: 1,
both: 2,
};

return (
   <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
<PageHeader
title="User Management"
description="Manage user accounts and permissions"
actions={
<Button onClick={() => setAddUserModalOpen(true)}> <Plus className="w-4 h-4 mr-2" />Add User </Button>
}
/>


  {/* Users List */}
  <Card>
    <CardContent className="p-6">
      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-500 text-sm">Loading users...</div>
        ) : Array.isArray(users) && users.length > 0 ? (
          users.map((user) => {
            const brandAccess = brandAccessMap[user.brand_access] ?? 0; // default to 0
            const isActive = user.status === "active"; 

            return (
              <div
                key={user.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow gap-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.first_name
                        ? user.first_name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        : "NA"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm mb-1">{user.first_name} {user.last_name}</div>
                    <div className="text-xs text-gray-600">{user.email}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {/* Role */}
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Role</div>
                    <Badge variant="secondary">{user.role?.name || "N/A"}</Badge>
                  </div>

                  {/* Brand Access */}
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Brand Access</div>
                    <div className="flex gap-1">
                      {brandAccess === 0 && (
                        <Badge className="bg-green-100 text-green-700">BS</Badge>
                      )}
                      {brandAccess === 1 && (
                        <Badge className="bg-blue-100 text-blue-700">RE</Badge>
                      )}
                      {brandAccess === 2 && (
                        <>
                          <Badge className="bg-blue-100 text-blue-700">RE</Badge>
                          <Badge className="bg-green-100 text-green-700">BS</Badge>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Status</div>
                    <Badge
                      className={
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {isActive ? "active" : "inactive"}
                    </Badge>
                  </div>

                  {/* Actions */}
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
                      onClick={() => onNavigate("roles")}
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
            );
          })
        ) : (
          <div className="text-gray-500 text-sm">No users found.</div>
        )}
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
    itemName={selectedUser?.first_name}
  />
</div>


);
}
