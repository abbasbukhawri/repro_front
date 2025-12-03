// src/pages/shared/LeadsList.tsx
import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, MoreVertical, Upload, Download, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/dialog';
import { PageHeader } from '../../components/crm/PageHeader';
import { AddLeadModal } from '../../components/modals/AddLeadModal';
import { LogCallModal } from '../../components/modals/LogCallModal';
import { AddNoteModal } from '../../components/modals/AddNoteModal';
import { AdvancedFiltersModal } from '../../components/modals/AdvancedFiltersModal';
import { toast } from 'sonner';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchLeads, createLead, updateLead, deleteLead, Lead as LeadType } from '../../redux/slices/leadSlice';

interface LeadsListProps {
  brand: 'real-estate' | 'business-setup';
  onNavigate: (page: string) => void;
  onSelectLead: (id: string | number) => void;
}

export function LeadsList({ brand, onNavigate, onSelectLead }: LeadsListProps) {
  const dispatch = useAppDispatch();
  const { list: rawLeads, loading } = useAppSelector(state => state.lead);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isLogCallModalOpen, setIsLogCallModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [selectedLeadForAction, setSelectedLeadForAction] = useState<LeadType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLeadForDelete, setSelectedLeadForDelete] = useState<LeadType | null>(null);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const brandTitle = brand === 'real-estate' ? 'Real Estate Leads' : 'Business Setup Inquiries';
  const brandBg = brand === 'real-estate'
    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30'
    : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-500/30';

  const displayLeads = rawLeads.map((lead: any) => ({
    id: lead.id,
    status: lead.status,
    source: lead.source,
    updated_at: lead.updated_at,
    name: lead.contact?.full_name || `${lead.contact?.first_name || ''} ${lead.contact?.last_name || ''}`.trim(),
    email: lead.contact?.email || '',
    phone: lead.contact?.phone || '',
    assigned_to: lead.assignee || null,
    assigned_to_name: lead.assignee ? `${lead.assignee.first_name} ${lead.assignee.last_name}` : 'Unassigned',
  }));

  const filteredLeads = displayLeads.filter(lead => {
    const matchesSearch =
      !searchQuery ||
      (lead.name && lead.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.phone && lead.phone.includes(searchQuery)) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || (lead.status?.toLowerCase() === statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = (data: any) => {
    dispatch(createLead({
      name: data.name,
      email: data.email || '',
      phone: data.phone,
      source: data.source,
      status: data.status || 'New',
      priority: data.priority || 'Medium',
      value: data.budget || data.value || 'N/A',
      assigned_to_id: data.assignee_id || null,
      notes_attributes: data.notes ? [{ body: data.notes }] : [],
      brand,
    }));
    setIsAddLeadModalOpen(false);
    toast.success('Lead added successfully!', { description: `${data.name} has been added.` });
  };

  const handleEditLead = (id: number, data: any) => {
    dispatch(updateLead({ id, data }));
    toast.success('Lead updated successfully!');
  };

  const handleDeleteLead = () => {
    if (!selectedLeadForDelete) return;
    dispatch(deleteLead(selectedLeadForDelete.id));
    setIsDeleteDialogOpen(false);
    toast.success('Lead deleted!', { description: `${selectedLeadForDelete.name} removed.` });
    setSelectedLeadForDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'qualified':
      case 'consultation': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'viewing scheduled':
      case 'document collection': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'negotiation':
      case 'processing': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'new':
      case 'inquiry': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'contacted':
      case 'follow-up': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'closed won':
      case 'license issued': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1800px] mx-auto">
      {/* Page Header */}
      <PageHeader
        title={brandTitle}
        description={`Manage and track your ${brand === 'real-estate' ? 'property' : 'business setup'} leads effectively`}
        actions={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="rounded-xl w-full sm:w-auto" onClick={() => toast.info('Import Leads (coming soon)')}>
              <Upload className="w-4 h-4 mr-2" /> Import
            </Button>
            <Button variant="outline" className="rounded-xl w-full sm:w-auto" onClick={() => toast.success('Leads Exported!')}>
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button className={`rounded-xl ${brandBg} w-full sm:w-auto`} onClick={() => setIsAddLeadModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Lead
            </Button>
          </div>
        }
      />

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border p-3 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl h-11 text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] rounded-xl h-11">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-xl h-11 w-full md:w-auto" onClick={() => setIsAdvancedFiltersOpen(true)}>
            <Filter className="w-4 h-4 mr-2" /> More Filters
          </Button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-2xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b">
              <TableHead>Lead Info</TableHead>
              <TableHead>Contact</TableHead>
              {brand === 'real-estate' ? <TableHead>Requirements</TableHead> : <TableHead>Service Details</TableHead>}
              <TableHead>Agent/Officer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">Loading leads...</TableCell>
              </TableRow>
            ) : filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">No leads found.</TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead: any) => (
                <TableRow
                  key={lead.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    onSelectLead(lead.id);
                    onNavigate(brand === 'real-estate' ? 're-lead-details' : 'bs-lead-details');
                  }}
                >
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.phone}<br />{lead.email}</TableCell>
                  <TableCell>{brand === 'real-estate' ? lead.value || 'N/A' : lead.service || 'N/A'}</TableCell>
                  <TableCell>{lead.assigned_to_name}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(lead.status || '')} text-xs px-2 py-1 rounded-lg`}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.updated_at || '-'}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e: { stopPropagation: () => void; }) => {
                            e.stopPropagation();
                            onSelectLead(lead.id);
                            onNavigate(brand === 'real-estate' ? 're-lead-details' : 'bs-lead-details');
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e: { stopPropagation: () => void; }) => {
                            e.stopPropagation();
                            setSelectedLeadForAction(lead);
                            setIsAddLeadModalOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e: { stopPropagation: () => void; }) => {
                            e.stopPropagation();
                            setSelectedLeadForDelete(lead);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden flex flex-col gap-4">
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading leads...</p>
        ) : filteredLeads.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No leads found.</p>
        ) : (
          filteredLeads.map((lead: any) => (
            <div
              key={lead.id}
              className="border rounded-2xl p-4 shadow-sm bg-white cursor-pointer hover:bg-gray-50"
              onClick={() => {
                onSelectLead(lead.id);
                onNavigate(brand === 'real-estate' ? 're-lead-details' : 'bs-lead-details');
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{lead.name}</h3>
                <Badge className={`${getStatusColor(lead.status || '')} text-xs px-2 py-1 rounded-lg`}>{lead.status}</Badge>
              </div>
              <p className="text-sm text-gray-500">{lead.phone} | {lead.email}</p>
              <p className="text-sm mt-1">{brand === 'real-estate' ? `Value: ${lead.value || 'N/A'}` : `Service: ${lead.service || 'N/A'}`}</p>
              <p className="text-sm mt-1">Agent: {lead.assigned_to_name}</p>
              <div className="flex justify-end mt-2 space-x-2">
                <Button size="sm" variant="outline" onClick={(e: { stopPropagation: () => void; }) => { e.stopPropagation(); onSelectLead(lead.id); onNavigate(brand === 'real-estate' ? 're-lead-details' : 'bs-lead-details'); }}>View</Button>
                <Button size="sm" variant="outline" onClick={(e: { stopPropagation: () => void; }) => { e.stopPropagation(); setSelectedLeadForAction(lead); setIsAddLeadModalOpen(true); }}>Edit</Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onSubmit={(data) => {
          if (selectedLeadForAction) {
            handleEditLead(selectedLeadForAction.id, data);
            setSelectedLeadForAction(null);
          } else {
            handleAddLead(data);
          }
        }}
        brand={brand}
      />
      <LogCallModal isOpen={isLogCallModalOpen} onClose={() => setIsLogCallModalOpen(false)} onSubmit={() => toast.success('Call logged')} leadName={selectedLeadForAction?.name} />
      <AddNoteModal isOpen={isAddNoteModalOpen} onClose={() => setIsAddNoteModalOpen(false)} onSubmit={() => toast.success('Note added')} entityName={selectedLeadForAction?.name} />
      <AdvancedFiltersModal isOpen={isAdvancedFiltersOpen} onClose={() => setIsAdvancedFiltersOpen(false)} onApply={(filters) => toast.success('Filters applied')} brand={brand} />

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600"><AlertTriangle className="w-5 h-5" /> Delete Lead</DialogTitle>
            <DialogDescription>Are you sure you want to delete this lead? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          {selectedLeadForDelete && (
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex justify-between text-sm"><span>Name:</span> <span className="font-semibold">{selectedLeadForDelete.name}</span></div>
              <div className="flex justify-between text-sm"><span>Email:</span> <span className="font-semibold">{selectedLeadForDelete.email}</span></div>
              <div className="flex justify-between text-sm"><span>Phone:</span> <span className="font-semibold">{selectedLeadForDelete.phone}</span></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteLead}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
