import { useState } from 'react';
import { Plus, Search, Filter, DollarSign, CheckCircle, Clock, XCircle, Building2, Eye, Edit, Trash2, MoreVertical, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { PageHeader } from '../../components/crm/PageHeader';
import { AddPledgeModal } from '../../components/modals/AddPledgeModal';
import { useCRM } from '../../contexts/CRMContext';
import { useSettings } from '../../contexts/SettingsContext';
import { toast } from 'sonner@2.0.3';

interface PledgesPageProps {
  onNavigate: (page: string) => void;
}

export function PledgesPage({ onNavigate }: PledgesPageProps) {
  const { pledges, addPledge, deletePledge } = useCRM();
  const { formatCurrency } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddPledgeModalOpen, setIsAddPledgeModalOpen] = useState(false);
  const [selectedPledge, setSelectedPledge] = useState<any>(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');

  const handleAddPledge = (data: any) => {
    addPledge({
      clientName: data.clientName,
      property: data.property,
      amount: `AED ${parseFloat(data.amount).toLocaleString()}`,
      pledgeDate: data.pledgeDate,
      expectedClosing: data.expectedClosing,
      status: data.status,
      paidAmount: `AED ${parseFloat(data.paidAmount || '0').toLocaleString()}`,
      pendingAmount: `AED ${(parseFloat(data.amount) - parseFloat(data.paidAmount || '0')).toLocaleString()}`,
      agent: data.agent,
      agentAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.agent}`,
    });
    setIsAddPledgeModalOpen(false);
    toast.success('Pledge added successfully!', {
      description: `Pledge for ${data.clientName} has been created.`
    });
  };

  const handleViewDetails = (pledge: any) => {
    setSelectedPledge(pledge);
    setIsViewDetailsOpen(true);
  };

  const handleEditPledge = (pledge: any) => {
    toast.info('Edit Pledge', {
      description: 'Edit functionality will open the pledge editor.'
    });
  };

  const handleRecordPayment = (pledge: any) => {
    setSelectedPledge(pledge);
    setPaymentAmount('');
    setPaymentNotes('');
    setIsPaymentModalOpen(true);
  };

  const handleSubmitPayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      toast.error('Invalid Payment', {
        description: 'Please enter a valid payment amount.'
      });
      return;
    }

    toast.success('Payment Recorded!', {
      description: `Payment of AED ${parseFloat(paymentAmount).toLocaleString()} recorded for ${selectedPledge?.clientName}.`
    });
    
    setIsPaymentModalOpen(false);
    setPaymentAmount('');
    setPaymentNotes('');
  };

  const handleDeletePledge = (pledge: any) => {
    setSelectedPledge(pledge);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPledge) {
      deletePledge(selectedPledge.id);
      toast.success('Pledge Deleted', {
        description: `Pledge for ${selectedPledge.clientName} has been deleted.`
      });
      setIsDeleteDialogOpen(false);
      setSelectedPledge(null);
    }
  };

  const filteredPledges = pledges.filter(pledge => {
    const matchesSearch = searchQuery === '' || 
      (pledge.clientName && pledge.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pledge.property && pledge.property.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pledge.id && pledge.id.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || 
      pledge.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending documents':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Clock className="w-3.5 h-3.5 mr-1" strokeWidth={2} />;
      case 'pending documents':
        return <Clock className="w-3.5 h-3.5 mr-1" strokeWidth={2} />;
      case 'completed':
        return <CheckCircle className="w-3.5 h-3.5 mr-1" strokeWidth={2} />;
      case 'cancelled':
        return <XCircle className="w-3.5 h-3.5 mr-1" strokeWidth={2} />;
      default:
        return null;
    }
  };

  // Calculate summary stats
  const totalPledges = pledges.length;
  const activePledges = pledges.filter(p => p.status === 'Active').length;
  const completedPledges = pledges.filter(p => p.status === 'Completed').length;
  const totalValue = pledges.reduce((sum, p) => sum + parseFloat(p.amount.replace(/[^0-9.]/g, '')), 0);
  const totalPaid = pledges.reduce((sum, p) => sum + parseFloat(p.paidAmount.replace(/[^0-9.]/g, '')), 0);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1800px] mx-auto">
      <PageHeader
        title="Property Pledges"
        description="Track and manage property sale pledges and commitments"
        actions={
          <>
            <Button variant="outline" className="hidden sm:flex rounded-xl border-gray-300 hover:border-gray-400 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" strokeWidth={1.5} />
              <span className="hidden md:inline">Export Report</span>
              <span className="md:hidden">Export</span>
            </Button>
            <Button 
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30"
              onClick={() => setIsAddPledgeModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
              <span className="hidden sm:inline">Add Pledge</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <DollarSign className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Pledge Value</p>
          <p className="text-2xl font-bold text-gray-900">AED {(totalValue / 1000000).toFixed(1)}M</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl">
              <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-gray-900">AED {(totalPaid / 1000000).toFixed(1)}M</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-purple-50 rounded-xl">
              <Clock className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Active Pledges</p>
          <p className="text-2xl font-bold text-gray-900">{activePledges}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-amber-50 rounded-xl">
              <Building2 className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-2xl font-bold text-gray-900">{completedPledges}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" strokeWidth={1.5} />
            <Input
              placeholder="Search by client name, property, or pledge ID..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending documents">Pending Documents</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pledges Table */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <Table className="premium-table">
          <TableHeader>
            <TableRow className="bg-gray-50/80 border-b border-gray-200">
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Pledge ID</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Client</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Property</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Amount</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Payment Status</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Closing Date</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Agent</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPledges.map((pledge) => (
              <TableRow 
                key={pledge.id} 
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group"
              >
                <TableCell className="py-4">
                  <div className="font-semibold text-sm text-blue-600">{pledge.id}</div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-2 ring-gray-200">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${pledge.clientName || 'default'}`} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold">
                        {pledge.clientName ? pledge.clientName.split(' ').map(n => n[0]).join('') : 'NA'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium text-sm text-gray-900">{pledge.clientName || 'N/A'}</div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="max-w-[250px]">
                    <div className="text-sm text-gray-900 truncate">{pledge.property}</div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="font-semibold text-sm text-gray-900">{pledge.amount}</div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">Paid: {pledge.paidAmount}</div>
                    <div className="text-xs text-gray-600">Pending: {pledge.pendingAmount}</div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                    {new Date(pledge.expectedClosing).toLocaleDateString('en-GB')}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7 ring-2 ring-gray-200">
                      <AvatarImage src={pledge.agentAvatar} />
                      <AvatarFallback className="text-xs">{pledge.agent.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700">{pledge.agent}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge className={`${getStatusColor(pledge.status)} font-medium text-xs px-3 py-1 rounded-lg flex items-center w-fit`}>
                    {getStatusIcon(pledge.status)}
                    {pledge.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" strokeWidth={1.5} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewDetails(pledge)}>
                        <Eye className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditPledge(pledge)}>
                        <Edit className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        Edit Pledge
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleRecordPayment(pledge)}>
                        <DollarSign className="mr-2 h-4 w-4" strokeWidth={1.5} />
                        Record Payment
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => handleDeletePledge(pledge)}>
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
      <AddPledgeModal
        isOpen={isAddPledgeModalOpen}
        onClose={() => setIsAddPledgeModalOpen(false)}
        onSubmit={handleAddPledge}
      />

      {/* View Details Modal */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              Pledge Details
            </DialogTitle>
            <DialogDescription>
              Complete information for pledge {selectedPledge?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPledge && (
            <div className="grid gap-6">
              {/* Client Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-600">Client Name</Label>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedPledge.clientName}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Pledge ID</Label>
                  <p className="text-sm font-semibold text-blue-600 mt-1">{selectedPledge.id}</p>
                </div>
              </div>

              {/* Property Details */}
              <div>
                <Label className="text-xs text-gray-600">Property</Label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{selectedPledge.property}</p>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <Label className="text-xs text-gray-600">Total Amount</Label>
                  <p className="text-lg font-bold text-gray-900 mt-1">{selectedPledge.amount}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Paid Amount</Label>
                  <p className="text-lg font-bold text-emerald-600 mt-1">{selectedPledge.paidAmount}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Pending</Label>
                  <p className="text-lg font-bold text-amber-600 mt-1">{selectedPledge.pendingAmount}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-600">Pledge Date</Label>
                  <p className="text-sm font-semibold text-gray-900 mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(selectedPledge.pledgeDate).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Expected Closing</Label>
                  <p className="text-sm font-semibold text-gray-900 mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(selectedPledge.expectedClosing).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </div>

              {/* Agent & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-600">Assigned Agent</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-8 w-8 ring-2 ring-gray-200">
                      <AvatarImage src={selectedPledge.agentAvatar} />
                      <AvatarFallback className="text-xs">{selectedPledge.agent.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold text-gray-900">{selectedPledge.agent}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Status</Label>
                  <div className="mt-1">
                    <Badge className={`${getStatusColor(selectedPledge.status)} font-medium text-xs px-3 py-1 rounded-lg flex items-center w-fit`}>
                      {getStatusIcon(selectedPledge.status)}
                      {selectedPledge.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDetailsOpen(false);
              handleRecordPayment(selectedPledge);
            }}>
              <DollarSign className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Record Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Record Payment
            </DialogTitle>
            <DialogDescription>
              Record a new payment for {selectedPledge?.clientName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Summary */}
            {selectedPledge && (
              <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold text-gray-900">{selectedPledge.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Already Paid:</span>
                  <span className="font-semibold text-emerald-600">{selectedPledge.paidAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-semibold text-amber-600">{selectedPledge.pendingAmount}</span>
                </div>
              </div>
            )}

            {/* Payment Amount */}
            <div className="space-y-2">
              <Label htmlFor="payment-amount">Payment Amount (AED) *</Label>
              <Input
                id="payment-amount"
                type="number"
                placeholder="Enter payment amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="payment-notes">Payment Notes (Optional)</Label>
              <Textarea
                id="payment-notes"
                placeholder="Add any notes about this payment..."
                value={paymentNotes}
                onChange={(e) => setPaymentNotes(e.target.value)}
                className="rounded-xl min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitPayment} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Delete Pledge
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this pledge? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPledge && (
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-semibold text-gray-900">{selectedPledge.clientName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-semibold text-gray-900">{selectedPledge.property}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-gray-900">{selectedPledge.amount}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Pledge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}