import { X, Calendar, Clock, User, Building2, MapPin, Phone, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';

interface ViewingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (viewingId: number, status: string, feedback?: string) => void;
  viewing: {
    id: number;
    lead: string;
    property: string;
    agent: string;
    date: string;
    time: string;
    status: string;
    feedback?: string;
  } | null;
}

export function ViewingDetailsModal({ isOpen, onClose, onUpdateStatus, viewing }: ViewingDetailsModalProps) {
  const [feedback, setFeedback] = useState('');
  const [newStatus, setNewStatus] = useState('');

  if (!isOpen || !viewing) return null;

  const handleUpdateStatus = (status: string) => {
    onUpdateStatus(viewing.id, status, feedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Viewing Details</h2>
              <p className="text-sm text-gray-500 mt-1">Complete viewing information</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700">Current Status</div>
            <Badge className={`${
              viewing.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
              viewing.status === 'Done' ? 'bg-green-100 text-green-700' :
              viewing.status === 'No-show' ? 'bg-red-100 text-red-700' :
              viewing.status === 'Cancelled' ? 'bg-gray-100 text-gray-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {viewing.status}
            </Badge>
          </div>

          {/* Client Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="text-sm font-medium text-gray-900 mb-3">Client Information</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">Client Name</div>
                  <div className="font-medium text-gray-900">{viewing.lead}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="font-medium text-gray-900">+971 50 123 4567</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-1 sm:col-span-2">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="font-medium text-gray-900">client@example.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Property & Schedule Information */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <div className="text-sm font-medium text-gray-900 mb-3">Viewing Details</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-sm col-span-1 sm:col-span-2">
                <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-xs text-blue-700">Property</div>
                  <div className="font-medium text-gray-900">{viewing.property}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="text-xs text-blue-700">Date</div>
                  <div className="font-medium text-gray-900">{viewing.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="text-xs text-blue-700">Time</div>
                  <div className="font-medium text-gray-900">{viewing.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-1 sm:col-span-2">
                <User className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="text-xs text-blue-700">Assigned Agent</div>
                  <div className="font-medium text-gray-900">{viewing.agent}</div>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm col-span-1 sm:col-span-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-blue-700">Meeting Point</div>
                  <div className="font-medium text-gray-900">Property Entrance - Main Gate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Existing Feedback (if any) */}
          {viewing.feedback && (
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-900 mb-2">Previous Feedback</div>
              <div className="text-sm text-gray-700">{viewing.feedback}</div>
            </div>
          )}

          {/* Update Status Section */}
          {viewing.status === 'Pending' && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="text-sm font-medium text-gray-900">Update Viewing Status</div>
              
              <div>
                <Label htmlFor="feedback">Viewing Feedback</Label>
                <Textarea 
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter feedback about the viewing..."
                  className="mt-1.5 min-h-[100px]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={() => handleUpdateStatus('Done')}
                  className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Completed
                </Button>
                <Button 
                  onClick={() => handleUpdateStatus('No-show')}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-700 hover:bg-red-50 rounded-xl"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Mark as No-Show
                </Button>
              </div>
            </div>
          )}

          {/* Additional Notes */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-900 mb-2">Notes</div>
            <div className="text-sm text-gray-600">
              • Client requested viewing during evening hours<br />
              • Interested in similar properties in the area<br />
              • Budget range: AED 2M - 2.5M
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="rounded-xl"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
