import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  entityName?: string;
}

export function AddNoteModal({ isOpen, onClose, onSubmit, entityName }: AddNoteModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-in zoom-in-95 fade-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Note</h2>
              {entityName && <p className="text-sm text-gray-500 mt-0.5">{entityName}</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="note">Note Content *</Label>
            <Textarea 
              id="note" 
              name="note"
              placeholder="Client mentioned interest in 3-bedroom properties near schools. Prefers villas over apartments. Budget flexible if right property found..."
              className="mt-1.5 min-h-[150px]"
              required
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Save Note
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
