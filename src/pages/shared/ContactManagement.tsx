import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "../../components/crm/PageHeader";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { AddContactModal } from "../../components/modals/AddContactModal";
import { EditContactModal } from "../../components/modals/EditContactModal";
import { DeleteConfirmationModal } from "../../components/modals/DeleteConfirmationModal";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchContacts, createContact, updateContact, deleteContact } from "../../redux/slices/contactSlice";


interface ContactManagementProps {
  onNavigate?: Dispatch<SetStateAction<string>>;
}



export function ContactManagement({ onNavigate }: ContactManagementProps) {
const dispatch = useAppDispatch();
const { list: contacts, loading } = useAppSelector((state) => state.contact);

useEffect(() => {
dispatch(fetchContacts());
}, [dispatch]);

const [isAddModalOpen, setAddModalOpen] = useState(false);
const [isEditModalOpen, setEditModalOpen] = useState(false);
const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedContact, setSelectedContact] = useState<any>(null);

const handleAddContact = async (data: any) => {
try {
await dispatch(createContact(data)).unwrap();
dispatch(fetchContacts());
toast.success(`Contact "${data.first_name}" created successfully!`);
setAddModalOpen(false);
} catch (err: any) {
toast.error(err.message || "Failed to create contact");
}
};

const handleEditContact = async (data: any) => {
  if (!selectedContact) return;
  try {
    // Only send editable fields
    const {
      id,
      full_name,
      created_at,
      company,
      assigned_to,
      ...contactFields
    } = data;

    // If assigned_to_id exists as an object, convert to just ID
    if (contactFields.assigned_to_id?.id) {
      contactFields.assigned_to_id = contactFields.assigned_to_id.id;
    }

    // Send clean payload
    await dispatch(
      updateContact({ id: selectedContact.id, contact: contactFields })
    ).unwrap();

    dispatch(fetchContacts());
    toast.success(`Contact "${contactFields.first_name}" updated successfully!`);
    setEditModalOpen(false);
    setSelectedContact(null);
  } catch (err: any) {
    toast.error(err.message || "Failed to update contact");
  }
};



const handleDeleteContact = async () => {
if (!selectedContact) return;
try {
await dispatch(deleteContact(selectedContact.id)).unwrap();
dispatch(fetchContacts());
toast.success(`Contact "${selectedContact.first_name}" deleted successfully!`);
setDeleteModalOpen(false);
setSelectedContact(null);
} catch (err: any) {
toast.error(err.message || "Failed to delete contact");
}
};

const openEditModal = (contact: any) => {
setSelectedContact(contact);
setEditModalOpen(true);
};

const openDeleteModal = (contact: any) => {
setSelectedContact(contact);
setDeleteModalOpen(true);
};

const brandAccessMap: Record<string, string> = {
  probiz: "BS",
  repro: "RE",
  both: "BS + RE",
};

return ( <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
<PageHeader
title="Contact Management"
description="Manage contacts for your portals"
actions={
<Button onClick={() => setAddModalOpen(true)}> <Plus className="w-4 h-4 mr-2" />
Add Contact </Button>
}
/>


  <Card>
    <CardContent className="p-6">
      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-500 text-sm">Loading contacts...</div>
        ) : contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow gap-4"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>
                    {contact.first_name
                      ? contact.first_name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : "NA"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm mb-1">{contact.first_name} {contact.last_name}</div>
                  <div className="text-xs text-gray-600">{contact.email}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Brand Access */}
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Brand Access</div>
                  <Badge className="bg-blue-100 text-blue-700">{brandAccessMap[contact.brand_access]}</Badge>
                </div>

                {/* Status */}
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Status</div>
                  <Badge
                    className={
                      contact.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {contact.status}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditModal(contact)}
                    title="Edit Contact"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => openDeleteModal(contact)}
                    title="Delete Contact"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">No contacts found.</div>
        )}
      </div>
    </CardContent>
  </Card>

  {/* Modals */}
  <AddContactModal
    isOpen={isAddModalOpen}
    onClose={() => setAddModalOpen(false)}
    onSubmit={handleAddContact}
  />

  <EditContactModal
    isOpen={isEditModalOpen}
    onClose={() => {
      setEditModalOpen(false);
      setSelectedContact(null);
    }}
    onSubmit={handleEditContact}
    contact={selectedContact}
  />

  <DeleteConfirmationModal
    isOpen={isDeleteModalOpen}
    onClose={() => {
      setDeleteModalOpen(false);
      setSelectedContact(null);
    }}
    onConfirm={handleDeleteContact}
    title="Delete Contact"
    description="Are you sure you want to delete this contact? This action cannot be undone."
    itemName={selectedContact?.first_name}
  />
</div>


);
}
