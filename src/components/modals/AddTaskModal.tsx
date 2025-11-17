import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  entityName?: string;
}

export function AddTaskModal({ isOpen, onClose, onSubmit, entityName }: AddTaskModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      task: formData.get('task'),
      dueDate: formData.get('dueDate'),
      dueTime: formData.get('dueTime'),
      priority: formData.get('priority'),
      assignedTo: formData.get('assignedTo'),
      description: formData.get('description'),
      entityName: entityName,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Task / Follow-up</DialogTitle>
          <DialogDescription>
            Add a new task or follow-up for {entityName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {entityName && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <span className="font-medium">For:</span> {entityName}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="task">Task Title *</Label>
            <Input
              id="task"
              name="task"
              placeholder="e.g., Follow up call after viewing"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add any additional details..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueTime">Due Time *</Label>
              <Input
                id="dueTime"
                name="dueTime"
                type="time"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority *</Label>
            <Select name="priority" defaultValue="medium" required>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assign To *</Label>
            <Select name="assignedTo" defaultValue="Sarah Johnson" required>
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                <SelectItem value="Emma Williams">Emma Williams</SelectItem>
                <SelectItem value="James Brown">James Brown</SelectItem>
                <SelectItem value="Lisa Anderson">Lisa Anderson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}