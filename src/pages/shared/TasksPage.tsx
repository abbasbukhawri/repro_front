import { useState } from 'react';
import { Plus, CheckSquare, Calendar, User, Trash2, Edit } from 'lucide-react';
import type { BrandType } from '../../App';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { AddTaskModal } from '../../components/modals/AddTaskModal';
import { useCRM } from '../../contexts/CRMContext';
import { toast } from 'sonner';
import { Checkbox } from '../../components/ui/checkbox';

interface TasksPageProps {
  brand: BrandType;
  onNavigate: (page: string) => void;
}

export function TasksPage({ brand, onNavigate }: TasksPageProps) {
  const { tasks, addTask, updateTask, deleteTask } = useCRM();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const brandColor = brand === 'real-estate' 
    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600' 
    : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600';

 const handleAddTask = (data: any) => {
  addTask({
    title: data.task, // <-- REQUIRED
    task: data.task,
    dueDate: data.dueDate,
    dueTime: data.dueTime,
    priority: data.priority,
    assignedTo: data.assignedTo,
    description: data.description,
    status: "Pending",
    entityType: brand === "real-estate" ? "lead" : "inquiry",
    entityId: data.entityName || "General",
    createdAt: new Date(),
    completedAt: null,
  });

  setIsAddTaskModalOpen(false);

  toast.success("Task created successfully!", {
    description: `${data.task} has been added to your tasks.`,
  });
};


  const handleToggleTask = (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
    updateTask(taskId, { 
      status: newStatus,
      completedAt: newStatus === 'Completed' ? new Date().toISOString() : null
    });
    toast.success(newStatus === 'Completed' ? 'Task completed!' : 'Task marked as pending');
  };

  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    deleteTask(taskId);
    toast.success('Task deleted!', {
      description: `"${taskTitle}" has been removed.`
    });
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Filter tasks
  const pendingTasks = tasks.filter(t => t.status === 'Pending');
  const todayTasks = tasks.filter(t => t.status === 'Pending' && t.dueDate === today);
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  const getPriorityVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Tasks & Follow-ups"
        description="Manage all your tasks and reminders"
        actions={
          <Button 
            className={`${brandColor} rounded-xl`}
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Create Task</span>
            <span className="sm:hidden">Create</span>
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6">
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Pending Tasks</div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <CheckSquare className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl text-orange-600">{pendingTasks.length}</div>
            <div className="text-xs text-gray-500 mt-1">Active tasks</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Due Today</div>
              <div className="p-2 bg-red-50 rounded-lg">
                <Calendar className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl text-red-600">{todayTasks.length}</div>
            <div className="text-xs text-gray-500 mt-1">Needs attention</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Completed</div>
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckSquare className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl text-green-600">{completedTasks.length}</div>
            <div className="text-xs text-gray-500 mt-1">Tasks done</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
          <TabsTrigger value="today">Due Today ({todayTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card className="rounded-2xl border-gray-200/60 shadow-sm">
            <CardContent className="p-4 md:p-6">
              {pendingTasks.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <CheckSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg font-medium mb-1">No pending tasks</p>
                  <p className="text-sm">Create a new task to get started</p>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {pendingTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
                    >
                      <Checkbox 
                        checked={false}
                        onCheckedChange={() => handleToggleTask(task.id, task.status)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium mb-2">{task.task}</div>
                        {task.description && (
                          <div className="text-sm text-gray-600 mb-2">{task.description}</div>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">For:</span> {task.entityId}
                          </span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {task.dueDate} {task.dueTime && `at ${task.dueTime}`}
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {task.assignedTo}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityVariant(task.priority)} className="shrink-0">
                          {task.priority}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteTask(task.id, task.task ?? 'Untitled task')}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today">
          <Card className="rounded-2xl border-gray-200/60 shadow-sm">
            <CardContent className="p-4 md:p-6">
              {todayTasks.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg font-medium mb-1">No tasks due today</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {todayTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-start gap-3 p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-xl"
                    >
                      <Checkbox 
                        checked={false}
                        onCheckedChange={() => handleToggleTask(task.id, task.status)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium mb-1">{task.task}</div>
                        {task.description && (
                          <div className="text-sm text-gray-600 mb-2">{task.description}</div>
                        )}
                        <div className="text-xs text-gray-600">
                          {task.entityId} • {task.assignedTo} {task.dueTime && `• ${task.dueTime}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityVariant(task.priority)} className="shrink-0">
                          {task.priority}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteTask(task.id, task.task)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card className="rounded-2xl border-gray-200/60 shadow-sm">
            <CardContent className="p-4 md:p-6">
              {completedTasks.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <CheckSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg font-medium mb-1">No completed tasks</p>
                  <p className="text-sm">Completed tasks will appear here</p>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {completedTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-start gap-3 p-4 bg-green-50 rounded-xl opacity-75 hover:opacity-100 transition-opacity"
                    >
                      <Checkbox 
                        checked={true}
                        onCheckedChange={() => handleToggleTask(task.id, task.status)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium mb-1 line-through text-gray-600">{task.task}</div>
                        {task.description && (
                          <div className="text-sm text-gray-500 mb-2 line-through">{task.description}</div>
                        )}
                        <div className="text-xs text-gray-500">
                          {task.entityId} • Completed {task.completedAt && new Date(task.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTask(task.id, task.task)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSubmit={handleAddTask}
        entityName="General"
      />
    </div>
  );
}