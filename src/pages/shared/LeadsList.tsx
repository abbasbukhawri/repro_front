import { useState } from 'react';
import { Plus, Search, Filter, Phone, Mail, Eye, Edit, Trash2, MoreVertical, Upload, Download } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { PageHeader } from '../../components/crm/PageHeader';
import { AddLeadModal } from '../../components/modals/AddLeadModal';
import { LogCallModal } from '../../components/modals/LogCallModal';
import { AddNoteModal } from '../../components/modals/AddNoteModal';
import { AdvancedFiltersModal } from '../../components/modals/AdvancedFiltersModal';
import { useCRM } from '../../contexts/CRMContext';
import { toast } from 'sonner@2.0.3';

type BrandType = 'real-estate' | 'business-setup';

interface LeadsListProps {
  brand: BrandType;
  onNavigate: (page: string) => void;
  onSelectLead: (id: string) => void;
}

const realEstateLeads = [
  {
    id: '1',
    name: 'Mohammed Al-Rashid',
    phone: '+971 50 123 4567',
    email: 'mohammed@email.com',
    budget: 'AED 2.5M - 3M',
    propertyType: 'Villa',
    location: 'Dubai Hills',
    lastContact: '2 hours ago',
    status: 'Qualified',
    agent: 'Sarah Johnson',
    agentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  },
  {
    id: '2',
    name: 'Fatima Hassan',
    phone: '+971 55 234 5678',
    email: 'fatima@email.com',
    budget: 'AED 1.8M - 2.2M',
    propertyType: 'Apartment',
    location: 'Dubai Marina',
    lastContact: '5 hours ago',
    status: 'Viewing Scheduled',
    agent: 'Michael Chen',
    agentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
  },
  {
    id: '3',
    name: 'Ahmed Abdullah',
    phone: '+971 50 345 6789',
    email: 'ahmed@email.com',
    budget: 'AED 3M - 4M',
    propertyType: 'Penthouse',
    location: 'Palm Jumeirah',
    lastContact: '1 day ago',
    status: 'New',
    agent: 'Emma Williams',
    agentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
  },
  {
    id: '4',
    name: 'Layla Ibrahim',
    phone: '+971 56 456 7890',
    email: 'layla@email.com',
    budget: 'AED 1.5M - 2M',
    propertyType: 'Townhouse',
    location: 'Arabian Ranches',
    lastContact: '3 hours ago',
    status: 'Negotiation',
    agent: 'James Brown',
    agentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
  },
  {
    id: '5',
    name: 'Omar Khalid',
    phone: '+971 50 567 8901',
    email: 'omar@email.com',
    budget: 'AED 2M - 2.5M',
    propertyType: 'Apartment',
    location: 'Downtown Dubai',
    lastContact: '2 days ago',
    status: 'Contacted',
    agent: 'Lisa Anderson',
    agentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
  },
];

const businessSetupLeads = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+971 50 123 4567',
    email: 'john@email.com',
    nationality: 'British',
    service: 'Company Formation',
    jurisdiction: 'Free Zone',
    visas: '3',
    activity: 'Trading',
    lastContact: '1 hour ago',
    status: 'Consultation',
    officer: 'Hassan Ali',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    phone: '+971 55 234 5678',
    email: 'maria@email.com',
    nationality: 'Spanish',
    service: 'License Renewal',
    jurisdiction: 'Mainland',
    visas: '2',
    activity: 'Consulting',
    lastContact: '4 hours ago',
    status: 'Documentation',
    officer: 'Mariam Ahmed',
  },
  {
    id: '3',
    name: 'David Chen',
    phone: '+971 50 345 6789',
    email: 'david@email.com',
    nationality: 'Chinese',
    service: 'Company Formation',
    jurisdiction: 'Offshore',
    visas: '5',
    activity: 'Import/Export',
    lastContact: '2 days ago',
    status: 'New Inquiry',
    officer: 'Khalid Ibrahim',
  },
  {
    id: '4',
    name: 'Sophie Laurent',
    phone: '+971 56 456 7890',
    email: 'sophie@email.com',
    nationality: 'French',
    service: 'Visa Services',
    jurisdiction: 'Free Zone',
    visas: '1',
    activity: 'Marketing',
    lastContact: '3 hours ago',
    status: 'Application Processing',
    officer: 'Layla Hassan',
  },
  {
    id: '5',
    name: 'Raj Patel',
    phone: '+971 50 567 8901',
    email: 'raj@email.com',
    nationality: 'Indian',
    service: 'Company Formation',
    jurisdiction: 'Mainland',
    visas: '4',
    activity: 'IT Services',
    lastContact: '1 day ago',
    status: 'Documentation',
    officer: 'Hassan Ali',
  },
];

export function LeadsList({ brand, onNavigate, onSelectLead }: LeadsListProps) {
  const { leads: crmLeads, addLead } = useCRM();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isLogCallModalOpen, setIsLogCallModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [selectedLeadForAction, setSelectedLeadForAction] = useState<{ id: string; name: string } | null>(null);
  
  // Use CRM context leads or fall back to mock data for display purposes
  const staticLeads = brand === 'real-estate' ? realEstateLeads : businessSetupLeads;
  const displayLeads = crmLeads.length > 0 ? crmLeads : staticLeads;
  const brandTitle = brand === 'real-estate' ? 'Real Estate Leads' : 'Business Setup Inquiries';
  const brandBg = brand === 'real-estate' 
    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30' 
    : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-500/30';

  // Filter leads based on search and status
  const filteredLeads = displayLeads.filter(lead => {
    const matchesSearch = searchQuery === '' || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      lead.status.toLowerCase().includes(statusFilter.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = (data: any) => {
    addLead({
      name: data.name,
      email: data.email || '',
      phone: data.phone,
      source: data.source,
      status: data.status || 'New',
      priority: data.priority || 'Medium',
      value: data.budget || data.value || 'N/A',
      assignedTo: data.assignee || 'Unassigned',
      description: data.notes || ''
    });
    setIsAddLeadModalOpen(false);
    toast.success('Lead added successfully!', {
      description: `${data.name} has been added to your leads.`
    });
  };

  const handleLogCall = (data: any) => {
    console.log('Call log:', data);
    // Save call log
    toast.success('Call logged successfully!');
  };

  const handleAddNote = (data: any) => {
    console.log('Note:', data);
    // Save note
    toast.success('Note added successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'qualified':
      case 'consultation':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'viewing scheduled':
      case 'document collection':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'negotiation':
      case 'processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'new':
      case 'inquiry':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'contacted':
      case 'follow-up':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'closed won':
      case 'license issued':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 max-w-[1800px] mx-auto">
      <PageHeader
        title={brandTitle}
        description={`Manage and track your ${brand === 'real-estate' ? 'property' : 'business setup'} leads effectively`}
        actions={
          <>
            <Button variant="outline" className="rounded-xl border-gray-300 hover:border-gray-400 hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Import
            </Button>
            <Button variant="outline" className="rounded-xl border-gray-300 hover:border-gray-400 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Export
            </Button>
            <Button className={`rounded-xl ${brandBg}`} onClick={() => setIsAddLeadModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Add Lead
            </Button>
          </>
        }
      />

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" strokeWidth={1.5} />
            <Input
              placeholder="Search leads by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl border-gray-300 h-11 text-sm focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] rounded-xl border-gray-300 h-11">
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
          <Button variant="outline" className="rounded-xl border-gray-300 hover:border-gray-400 hover:bg-gray-50 h-11" onClick={() => setIsAdvancedFiltersOpen(true)}>
            <Filter className="w-4 h-4 mr-2" strokeWidth={1.5} />
            More Filters
          </Button>
        </div>
      </div>

      {/* Premium Table */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <Table className="premium-table">
          <TableHeader>
            <TableRow className="bg-gray-50/80 border-b border-gray-200">
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Lead Info</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Contact</TableHead>
              {brand === 'real-estate' ? (
                <>
                  <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Requirements</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Agent</TableHead>
                </>
              ) : (
                <>
                  <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Service Details</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">PRO Officer</TableHead>
                </>
              )}
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Last Contact</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow 
                key={lead.id} 
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer group"
                onClick={() => {
                  onSelectLead(lead.id);
                  onNavigate(brand === 'real-estate' ? 're-lead-details' : 'bs-lead-details');
                }}
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-semibold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-500">ID: {lead.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                      {lead.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                      {lead.email}
                    </div>
                  </div>
                </TableCell>
                {brand === 'real-estate' ? (
                  <>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{lead.budget || lead.value || 'N/A'}</div>
                        <div className="text-xs text-gray-600">{lead.propertyType || ''} {lead.location ? `in ${lead.location}` : ''}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 ring-2 ring-gray-200">
                          <AvatarImage src={lead.agentAvatar} />
                          <AvatarFallback className="text-xs">
                            {lead.agent ? lead.agent.split(' ').map(n => n[0]).join('') : lead.assignedTo ? lead.assignedTo.split(' ').map(n => n[0]).join('') : 'NA'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700">{lead.agent || lead.assignedTo || 'Unassigned'}</span>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{lead.service || 'N/A'}</div>
                        <div className="text-xs text-gray-600">{lead.jurisdiction || ''} {lead.visas ? `- ${lead.visas} visas` : ''}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm text-gray-700">{lead.officer || lead.assignedTo || 'Unassigned'}</div>
                    </TableCell>
                  </>
                )}
                <TableCell className="py-4">
                  <Badge className={`${getStatusColor(lead.status)} font-medium text-xs px-3 py-1 rounded-lg`}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="text-sm text-gray-600">{lead.lastContact}</div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" strokeWidth={1.5} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLead(lead.id);
                          onNavigate(brand === 'real-estate' ? 're-lead-details' : 'bs-lead-details');
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit lead functionality
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        Edit Lead
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLeadForAction({ id: lead.id, name: lead.name });
                          setIsLogCallModalOpen(true);
                        }}
                      >
                        <Phone className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        Call Lead
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLeadForAction({ id: lead.id, name: lead.name });
                          setIsAddNoteModalOpen(true);
                        }}
                      >
                        <Mail className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Delete functionality
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onSubmit={handleAddLead}
        brand={brand}
      />
      <LogCallModal
        isOpen={isLogCallModalOpen}
        onClose={() => setIsLogCallModalOpen(false)}
        onSubmit={handleLogCall}
        leadName={selectedLeadForAction?.name}
      />
      <AddNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        onSubmit={handleAddNote}
        entityName={selectedLeadForAction?.name}
      />
      <AdvancedFiltersModal
        isOpen={isAdvancedFiltersOpen}
        onClose={() => setIsAdvancedFiltersOpen(false)}
        onApply={(filters) => {
          console.log('Advanced filters applied:', filters);
          toast.success('Filters applied successfully!');
        }}
        brand={brand}
      />
    </div>
  );
}