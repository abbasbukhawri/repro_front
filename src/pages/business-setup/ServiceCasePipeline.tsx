import { User, Building2, FileText, UserPlus, ListTodo, RefreshCw } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { useState } from 'react';
import { AssignPROModal } from '../../components/modals/AssignPROModal';
import { AddTaskModal } from '../../components/modals/AddTaskModal';
import { UpdateCaseStatusModal } from '../../components/modals/UpdateCaseStatusModal';
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

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <PageHeader
        title="Completed Business Setups - Service Pipeline"
        description="Automatically populated with clients who have completed their business setup"
        actions={
          <>
            <Button variant="outline">
              Filter
            </Button>
          </>
        }
      />

      {/* Pipeline Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Cases</div>
            <div className="text-2xl mt-1">103</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Active Cases</div>
            <div className="text-2xl mt-1">91</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Avg. Processing Time</div>
            <div className="text-2xl mt-1">18 days</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Success Rate</div>
            <div className="text-2xl mt-1">96%</div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-6">
        <div className="flex gap-4 h-full" style={{ minWidth: 'max-content' }}>
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="flex flex-col w-80 flex-shrink-0">
              <div className={`p-4 rounded-t-lg border-2 ${stage.color}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm">{stage.title}</h3>
                  <Badge variant="secondary">{stage.count}</Badge>
                </div>
              </div>
              
              <div className="flex-1 bg-gray-50 rounded-b-lg p-2 space-y-2 overflow-y-auto border-2 border-t-0 border-gray-200">
                {stage.cases.map((caseItem) => (
                  <Card key={caseItem.id} className="cursor-pointer hover:shadow-md transition-shadow group">
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <div className="text-sm mb-1">{caseItem.client}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                          <Building2 className="w-3 h-3" />
                          {caseItem.service}
                        </div>
                        <div className="text-xs text-gray-500">{caseItem.jurisdiction}</div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-3">
                        <Badge variant={getStatusBadge(caseItem.status).variant} className="text-xs">
                          {getStatusBadge(caseItem.status).label}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${caseItem.officer}`} />
                            <AvatarFallback>{caseItem.officer[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-3 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAssignPRO(caseItem);
                          }}
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Assign
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddTask(caseItem);
                          }}
                        >
                          <ListTodo className="w-3 h-3 mr-1" />
                          Task
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateCaseStatus(caseItem);
                          }}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Status
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
    </div>
  );
}