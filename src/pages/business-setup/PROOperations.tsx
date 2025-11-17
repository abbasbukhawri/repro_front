import { UserCog, CheckCircle, Clock, AlertCircle, UserPlus, ListTodo, RefreshCw } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';
import { useState } from 'react';
import { AssignPROModal } from '../../components/modals/AssignPROModal';
import { AddTaskModal } from '../../components/modals/AddTaskModal';
import { UpdateCaseStatusModal } from '../../components/modals/UpdateCaseStatusModal';
import { toast } from 'sonner';

interface PROOperationsProps {
  onNavigate: (page: string) => void;
}

const proOfficers = [
  { id: 1, name: 'Hassan Ali', activeCases: 12, pendingTasks: 5, completedToday: 3, workload: 60 },
  { id: 2, name: 'Mariam Ahmed', activeCases: 10, pendingTasks: 3, completedToday: 4, workload: 50 },
  { id: 3, name: 'Khalid Ibrahim', activeCases: 8, pendingTasks: 2, completedToday: 2, workload: 40 },
  { id: 4, name: 'Layla Hassan', activeCases: 15, pendingTasks: 7, completedToday: 5, workload: 75 },
];

const activeTasks = [
  { id: 1, task: 'Submit license application', client: 'John Smith', officer: 'Hassan Ali', dueDate: '2025-11-18', priority: 'High', status: 'In Progress' },
  { id: 2, task: 'Collect passport copies', client: 'Maria Garcia', officer: 'Mariam Ahmed', dueDate: '2025-11-19', priority: 'Medium', status: 'Pending' },
  { id: 3, task: 'Visa stamping appointment', client: 'David Chen', officer: 'Khalid Ibrahim', dueDate: '2025-11-17', priority: 'High', status: 'Scheduled' },
  { id: 4, task: 'Document attestation', client: 'Sophie Laurent', officer: 'Layla Hassan', dueDate: '2025-11-20', priority: 'Low', status: 'In Progress' },
];

export function PROOperations({ onNavigate }: PROOperationsProps) {
  const [isAssignPROModalOpen, setAssignPROModalOpen] = useState(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isUpdateCaseStatusModalOpen, setUpdateCaseStatusModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleAssignNewTask = () => {
    setAddTaskModalOpen(true);
  };

  const handleAssignPRO = () => {
    setAssignPROModalOpen(true);
  };

  const handleUpdateStatus = (task: any) => {
    setSelectedTask(task);
    setUpdateCaseStatusModalOpen(true);
  };

  const handleTaskAssigned = () => {
    toast.success('Task assigned successfully!');
    setAddTaskModalOpen(false);
  };

  const handlePROAssigned = () => {
    toast.success('PRO officer assigned successfully!');
    setAssignPROModalOpen(false);
  };

  const handleStatusUpdated = () => {
    toast.success('Task status updated successfully!');
    setUpdateCaseStatusModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="PRO Operations Dashboard"
        description="Manage PRO officer workload and government tasks"
        actions={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto" onClick={handleAssignNewTask}>
              <ListTodo className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Assign New Task</span>
              <span className="sm:hidden">New Task</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={handleAssignPRO}>
              <UserPlus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Assign PRO Officer</span>
              <span className="sm:hidden">Assign PRO</span>
            </Button>
          </div>
        }
      />

      {/* PRO Officers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {proOfficers.map((officer) => (
          <Card key={officer.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${officer.name}`} />
                  <AvatarFallback>{officer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm">{officer.name}</div>
                  <div className="text-xs text-gray-500">PRO Officer</div>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Active Cases</span>
                  <span>{officer.activeCases}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Pending Tasks</span>
                  <span className="text-orange-600">{officer.pendingTasks}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Completed Today</span>
                  <span className="text-green-600">{officer.completedToday}</span>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Workload</span>
                  <span>{officer.workload}%</span>
                </div>
                <Progress value={officer.workload} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Tasks */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Active PRO Tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {activeTasks.map((task) => (
              <div key={task.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="text-sm mb-1">{task.task}</div>
                    <div className="text-xs text-gray-600">Client: {task.client}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'secondary'} className="text-xs">
                      {task.priority}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">{task.status}</Badge>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-600">
                    <span className="block sm:inline">Assigned to: {task.officer}</span>
                    <span className="hidden sm:inline"> • </span>
                    <span className="block sm:inline">Due: {task.dueDate}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleUpdateStatus(task)}
                    className="w-full sm:w-auto"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Update Status
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Government Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '9:00 AM', task: 'DMCC License Submission', officer: 'Hassan Ali', location: 'DMCC Office' },
                { time: '11:30 AM', task: 'Immigration Office - Visa Stamping', officer: 'Mariam Ahmed', location: 'Immigration' },
                { time: '2:00 PM', task: 'Chamber of Commerce - Attestation', officer: 'Khalid Ibrahim', location: 'DCC' },
              ].map((appointment, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm mb-1">{appointment.task}</div>
                    <div className="text-xs text-gray-600">
                      {appointment.time} • {appointment.officer} • {appointment.location}
                    </div>
                  </div>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: 'License approved', client: 'Emma Wilson', officer: 'Layla Hassan', time: '10:30 AM' },
                { task: 'Documents collected', client: 'Ahmed Hassan', officer: 'Hassan Ali', time: '12:00 PM' },
                { task: 'Visa application submitted', client: 'Raj Patel', officer: 'Mariam Ahmed', time: '1:15 PM' },
              ].map((completed, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm mb-1">{completed.task}</div>
                    <div className="text-xs text-gray-600">
                      {completed.client} • {completed.officer} • {completed.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AssignPROModal
        isOpen={isAssignPROModalOpen}
        onClose={() => setAssignPROModalOpen(false)}
        onAssign={handlePROAssigned}
        currentCase={null}
      />
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setAddTaskModalOpen(false)}
        onAddTask={handleTaskAssigned}
      />
      <UpdateCaseStatusModal
        isOpen={isUpdateCaseStatusModalOpen}
        onClose={() => setUpdateCaseStatusModalOpen(false)}
        onUpdate={handleStatusUpdated}
        currentCase={selectedTask ? { client: selectedTask.client, service: selectedTask.task, currentStatus: selectedTask.status } : null}
      />
    </div>
  );
}