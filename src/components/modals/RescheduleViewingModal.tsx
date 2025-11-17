import { X, Calendar, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';

interface RescheduleViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  viewing: {
    id: number;
    lead: string;
    property: string;
    agent: string;
    date: string;
    time: string;
    status: string;
  } | null;
}

export function RescheduleViewingModal({ isOpen, onClose, onSubmit, viewing }: RescheduleViewingModalProps) {
  if (!isOpen || !viewing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit({ ...data, viewingId: viewing.id });
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
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Reschedule Viewing</h2>
              <p className="text-sm text-gray-500 mt-1">Change date and time for this viewing</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Current Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="text-sm font-medium text-gray-900">Current Appointment</div>
            <div className="text-sm text-gray-600">
              <div><strong>Client:</strong> {viewing.lead}</div>
              <div><strong>Property:</strong> {viewing.property}</div>
              <div><strong>Agent:</strong> {viewing.agent}</div>
              <div><strong>Date & Time:</strong> {viewing.date} at {viewing.time}</div>
            </div>
          </div>

          {/* New Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="newDate">New Date *</Label>
              <Input 
                id="newDate" 
                name="newDate"
                type="date" 
                className="mt-1.5" 
                defaultValue={viewing.date}
                required 
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="newTime">New Time *</Label>
              <Input 
                id="newTime" 
                name="newTime"
                type="time" 
                className="mt-1.5" 
                defaultValue={viewing.time}
                required 
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="duration">Duration *</Label>
              <Select name="duration" defaultValue="30">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="reason">Reason for Rescheduling</Label>
              <Textarea 
                id="reason" 
                name="reason"
                placeholder="Optional - Enter reason for rescheduling..."
                className="mt-1.5 min-h-[80px]"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="notifyClient">Notify Client</Label>
              <Select name="notifyClient" defaultValue="yes">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes - Send notification</SelectItem>
                  <SelectItem value="no">No - Don't notify</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              className="rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
            >
              Reschedule Viewing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
