import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName?: string;
}

export function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title,
  description,
  itemName 
}: DeleteConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <DialogTitle className="text-red-600">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-left">
            {description}
            {itemName && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-900">{itemName}</span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="button" 
            className="bg-red-600 hover:bg-red-700"
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
