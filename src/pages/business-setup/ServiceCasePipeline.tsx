import { User, Building2, FileText, UserPlus, ListTodo, RefreshCw, Filter, X } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { useState } from 'react';
import { AssignPROModal } from '../../components/modals/AssignPROModal';
import { AddTaskModal } from '../../components/modals/AddTaskModal';
import { UpdateCaseStatusModal } from '../../components/modals/UpdateCaseStatusModal';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';

interface ServiceCasePipelineProps {
  onNavigate: (page: string) => void;
}

const pipelineStages = [
  {
    id: 'inquiry',
    title: 'Inquiry',
    count: 18,
    color: 'bg-gray-100 border-gray-300',
    cases: [
      { id: 1, client: 'John Smith', service: 'Company Formation', jurisdiction: 'Free Zone', officer: 'Hassan Ali', status: 'new' },
      { id: 2, client: 'Maria Garcia', service: 'Visa Services', jurisdiction: 'Mainland', officer: 'Mariam Ahmed', status: 'contacted' },
    ]
  },
  {
    id: 'consultation',
    title: 'Consultation',
    count: 12,
    color: 'bg-blue-50 border-blue-300',
    cases: [
      { id: 3, client: 'David Chen', service: 'Company Formation', jurisdiction: 'Offshore', officer: 'Khalid Ibrahim', status: 'scheduled' },
      { id: 4, client: 'Sophie Laurent', service: 'License Amendment', jurisdiction: 'Free Zone', officer: 'Layla Hassan', status: 'completed' },
    ]
  },
  {
    id: 'documentation',
    title: 'Documentation',
    count: 23,
    color: 'bg-yellow-50 border-yellow-300',
    cases: [
      { id: 5, client: 'Raj Patel', service: 'Company Formation', jurisdiction: 'Mainland', officer: 'Hassan Ali', status: 'pending' },
      { id: 6, client: 'Emma Wilson', service: 'Visa Services', jurisdiction: 'Free Zone', officer: 'Mariam Ahmed', status: 'review' },
    ]
  },
  {
    id: 'application',
    title: 'Application Processing',
    count: 15,
    color: 'bg-purple-50 border-purple-300',
    cases: [
      { id: 7, client: 'Ahmed Hassan', service: 'Company Formation', jurisdiction: 'Free Zone', officer: 'Khalid Ibrahim', status: 'submitted' },
    ]
  },
  {
    id: 'government',
    title: 'Government Submission',
    count: 8,
    color: 'bg-indigo-50 border-indigo-300',
    cases: [
      { id: 8, client: 'Fatima Al-Said', service: 'Trade License', jurisdiction: 'Mainland', officer: 'Layla Hassan', status: 'pending' },
    ]
  },
  {
    id: 'approval',
    title: 'Approval',
    count: 6,
    color: 'bg-orange-50 border-orange-300',
    cases: [
      { id: 9, client: 'Omar Abdullah', service: 'Company Formation', jurisdiction: 'Free Zone', officer: 'Hassan Ali', status: 'approved' },
    ]
  },
  {
    id: 'issued',
    title: 'License Issued',
    count: 12,
    color: 'bg-green-50 border-green-300',
    cases: [
      { id: 10, client: 'Layla Mohammed', service: 'Company Formation', jurisdiction: 'Mainland', officer: 'Mariam Ahmed', status: 'completed' },
    ]
  },
  {
    id: 'post-setup',
    title: 'Post-setup / Visa',
    count: 9,
    color: 'bg-teal-50 border-teal-300',
    cases: [
      { id: 11, client: 'Hassan Rashid', service: 'Visa Processing', jurisdiction: 'Free Zone', officer: 'Khalid Ibrahim', status: 'in-progress' },
    ]
  },
];

export function ServiceCasePipeline({ onNavigate }: ServiceCasePipelineProps) {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
      'new': { label: 'New', variant: 'secondary' },
      'contacted': { label: 'Contacted', variant: 'default' },
      'scheduled': { label: 'Scheduled', variant: 'default' },
      'completed': { label: 'Completed', variant: 'default' },
      'pending': { label: 'Pending', variant: 'secondary' },
      'review': { label: 'Review', variant: 'default' },
      'submitted': { label: 'Submitted', variant: 'default' },
      'approved': { label: 'Approved', variant: 'default' },
    };
    return statusMap[status] || { label: status, variant: 'secondary' };
  };

  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isAssignPROModalOpen, setIsAssignPROModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isUpdateCaseStatusModalOpen, setIsUpdateCaseStatusModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Filter states
  const [filterService, setFilterService] = useState('all');
  const [filterJurisdiction, setFilterJurisdiction] = useState('all');
  const [filterOfficer, setFilterOfficer] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAssignPRO = (caseItem: any) => {
    setSelectedCase(caseItem);
    setIsAssignPROModalOpen(true);
  };

  const handleAddTask = (caseItem: any) => {
    setSelectedCase(caseItem);
    setIsAddTaskModalOpen(true);
  };

  const handleUpdateCaseStatus = (caseItem: any) => {
    setSelectedCase(caseItem);
    setIsUpdateCaseStatusModalOpen(true);
  };

  const handleAssignPROModalClose = () => {
    setIsAssignPROModalOpen(false);
    setSelectedCase(null);
  };

  const handleAddTaskModalClose = () => {
    setIsAddTaskModalOpen(false);
    setSelectedCase(null);
  };

  const handleUpdateCaseStatusModalClose = () => {
    setIsUpdateCaseStatusModalOpen(false);
    setSelectedCase(null);
  };

  const handleAssignPROModalSubmit = (data: any) => {
    toast.success('PRO Officer Assigned!', {
      description: `${data.officer} has been assigned to ${selectedCase?.client}'s case`,
    });
    handleAssignPROModalClose();
  };

  const handleAddTaskModalSubmit = (data: any) => {
    toast.success('Task Created!', {
      description: `New task added for ${selectedCase?.client}`,
    });
    handleAddTaskModalClose();
  };

  const handleUpdateCaseStatusModalSubmit = (data: any) => {
    toast.success('Status Updated!', {
      description: `Case status updated to ${data.status}`,
    });
    handleUpdateCaseStatusModalClose();
  };

  const handleApplyFilters = () => {
    setIsFilterModalOpen(false);
    
    // Count active filters
    const activeFilters = [filterService, filterJurisdiction, filterOfficer, filterStatus].filter(f => f !== 'all').length;
    
    if (activeFilters > 0) {
      toast.success('Filters Applied!', {
        description: `${activeFilters} filter${activeFilters > 1 ? 's' : ''} applied to pipeline`
      });
    } else {
      toast.info('All Filters Cleared', {
        description: 'Showing all cases'
      });
    }
  };

  const handleClearFilters = () => {
    setFilterService('all');
    setFilterJurisdiction('all');
    setFilterOfficer('all');
    setFilterStatus('all');
    toast.info('Filters Cleared', {
      description: 'All filters have been reset'
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filterService !== 'all' || filterJurisdiction !== 'all' || filterOfficer !== 'all' || filterStatus !== 'all';

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1800px] mx-auto">
      <PageHeader
        title="Completed Business Setups - Service Pipeline"
        description="Automatically populated with clients who have completed their business setup"
        actions={
          <>
            <Button 
              variant="outline" 
              onClick={() => setIsFilterModalOpen(true)}
              className={`rounded-xl ${hasActiveFilters ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : ''}`}
            >
              <Filter className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Filter</span>
              {hasActiveFilters && (
                <Badge className="ml-2 bg-emerald-600 text-white">
                  {[filterService, filterJurisdiction, filterOfficer, filterStatus].filter(f => f !== 'all').length}
                </Badge>
              )}
            </Button>
          </>
        }
      />

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <Card className="rounded-xl md:rounded-2xl">
          <CardContent className="p-3 md:p-4">
            <div className="text-xs md:text-sm text-gray-600">Total Cases</div>
            <div className="text-xl md:text-2xl font-bold mt-1">103</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl md:rounded-2xl">
          <CardContent className="p-3 md:p-4">
            <div className="text-xs md:text-sm text-gray-600">Active Cases</div>
            <div className="text-xl md:text-2xl font-bold mt-1">91</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl md:rounded-2xl">
          <CardContent className="p-3 md:p-4">
            <div className="text-xs md:text-sm text-gray-600">Avg. Processing</div>
            <div className="text-xl md:text-2xl font-bold mt-1">18<span className="text-sm font-normal ml-1">days</span></div>
          </CardContent>
        </Card>
        <Card className="rounded-xl md:rounded-2xl">
          <CardContent className="p-3 md:p-4">
            <div className="text-xs md:text-sm text-gray-600">Success Rate</div>
            <div className="text-xl md:text-2xl font-bold mt-1">96%</div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="relative">
        {/* Mobile Scroll Hint */}
        <div className="md:hidden mb-2 flex items-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
          <span>Swipe to see all stages</span>
        </div>
        
        <div className="flex-1 overflow-x-auto pb-4 md:pb-6 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-3 md:gap-4 h-full" style={{ minWidth: 'max-content' }}>
            {pipelineStages.map((stage) => (
              <div key={stage.id} className="flex flex-col w-64 md:w-80 flex-shrink-0">
                <div className={`p-3 md:p-4 rounded-t-lg border-2 ${stage.color}`}>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs md:text-sm font-semibold">{stage.title}</h3>
                    <Badge variant="secondary" className="text-xs">{stage.count}</Badge>
                  </div>
                </div>
                
                <div className="flex-1 bg-gray-50 rounded-b-lg p-2 space-y-2 overflow-y-auto border-2 border-t-0 border-gray-200 min-h-[400px]">
                  {stage.cases.map((caseItem) => (
                    <Card key={caseItem.id} className="cursor-pointer hover:shadow-md transition-shadow group">
                      <CardContent className="p-3 md:p-4">
                        <div className="mb-2 md:mb-3">
                          <div className="text-sm font-semibold mb-1">{caseItem.client}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                            <Building2 className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{caseItem.service}</span>
                          </div>
                          <div className="text-xs text-gray-500">{caseItem.jurisdiction}</div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-100 mb-2 md:mb-3">
                          <Badge variant={getStatusBadge(caseItem.status).variant} className="text-xs">
                            {getStatusBadge(caseItem.status).label}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${caseItem.officer}`} />
                              <AvatarFallback className="text-xs">{caseItem.officer[0]}</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-3 gap-1 md:gap-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-[10px] md:text-xs rounded-lg px-1 md:px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignPRO(caseItem);
                            }}
                          >
                            <UserPlus className="w-3 h-3 md:mr-1" />
                            <span className="hidden md:inline">Assign</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-[10px] md:text-xs rounded-lg px-1 md:px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddTask(caseItem);
                            }}
                          >
                            <ListTodo className="w-3 h-3 md:mr-1" />
                            <span className="hidden md:inline">Task</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-[10px] md:text-xs rounded-lg px-1 md:px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateCaseStatus(caseItem);
                            }}
                          >
                            <RefreshCw className="w-3 h-3 md:mr-1" />
                            <span className="hidden md:inline">Status</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AssignPROModal
        isOpen={isAssignPROModalOpen}
        onClose={handleAssignPROModalClose}
        onAssign={handleAssignPROModalSubmit}
        currentCase={selectedCase}
      />
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={handleAddTaskModalClose}
        onAddTask={handleAddTaskModalSubmit}
      />
      <UpdateCaseStatusModal
        isOpen={isUpdateCaseStatusModalOpen}
        onClose={handleUpdateCaseStatusModalClose}
        onUpdate={handleUpdateCaseStatusModalSubmit}
        currentCase={selectedCase ? { ...selectedCase, currentStatus: selectedCase.status } : null}
      />

      {/* Filter Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-600" />
              Filter Service Pipeline
            </DialogTitle>
            <DialogDescription>
              Filter cases by service type, jurisdiction, officer, and status
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Service Type Filter */}
            <div className="space-y-2">
              <Label htmlFor="filter-service">Service Type</Label>
              <Select value={filterService} onValueChange={setFilterService}>
                <SelectTrigger id="filter-service" className="rounded-xl">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="company-formation">Company Formation</SelectItem>
                  <SelectItem value="visa-services">Visa Services</SelectItem>
                  <SelectItem value="trade-license">Trade License</SelectItem>
                  <SelectItem value="license-amendment">License Amendment</SelectItem>
                  <SelectItem value="visa-processing">Visa Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jurisdiction Filter */}
            <div className="space-y-2">
              <Label htmlFor="filter-jurisdiction">Jurisdiction</Label>
              <Select value={filterJurisdiction} onValueChange={setFilterJurisdiction}>
                <SelectTrigger id="filter-jurisdiction" className="rounded-xl">
                  <SelectValue placeholder="All Jurisdictions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jurisdictions</SelectItem>
                  <SelectItem value="free-zone">Free Zone</SelectItem>
                  <SelectItem value="mainland">Mainland</SelectItem>
                  <SelectItem value="offshore">Offshore</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* PRO Officer Filter */}
            <div className="space-y-2">
              <Label htmlFor="filter-officer">PRO Officer</Label>
              <Select value={filterOfficer} onValueChange={setFilterOfficer}>
                <SelectTrigger id="filter-officer" className="rounded-xl">
                  <SelectValue placeholder="All Officers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Officers</SelectItem>
                  <SelectItem value="hassan-ali">Hassan Ali</SelectItem>
                  <SelectItem value="mariam-ahmed">Mariam Ahmed</SelectItem>
                  <SelectItem value="khalid-ibrahim">Khalid Ibrahim</SelectItem>
                  <SelectItem value="layla-hassan">Layla Hassan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="filter-status">Case Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="filter-status" className="rounded-xl">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-emerald-900">Active Filters</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClearFilters}
                  className="h-7 text-xs text-emerald-700 hover:text-emerald-900"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filterService !== 'all' && (
                  <Badge className="bg-emerald-600 text-white">
                    Service: {filterService}
                  </Badge>
                )}
                {filterJurisdiction !== 'all' && (
                  <Badge className="bg-emerald-600 text-white">
                    Jurisdiction: {filterJurisdiction}
                  </Badge>
                )}
                {filterOfficer !== 'all' && (
                  <Badge className="bg-emerald-600 text-white">
                    Officer: {filterOfficer}
                  </Badge>
                )}
                {filterStatus !== 'all' && (
                  <Badge className="bg-emerald-600 text-white">
                    Status: {filterStatus}
                  </Badge>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsFilterModalOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                onClick={handleClearFilters}
                className="rounded-xl"
              >
                Clear Filters
              </Button>
            )}
            <Button 
              onClick={handleApplyFilters}
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}