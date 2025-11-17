import { Plus, Calendar as CalendarIcon, User, Building2, Clock } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Calendar } from '../../components/ui/calendar';
import { RescheduleViewingModal } from '../../components/modals/RescheduleViewingModal';
import { ViewingDetailsModal } from '../../components/modals/ViewingDetailsModal';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';

interface ViewingsPageProps {
  onNavigate: (page: string) => void;
}

const upcomingViewings = [
  { id: 1, lead: 'Mohammed Al-Rashid', property: 'Villa - Dubai Hills', agent: 'Sarah Johnson', date: '2025-11-18', time: '2:00 PM', status: 'Pending' },
  { id: 2, lead: 'Fatima Hassan', property: 'Apartment - Dubai Marina', agent: 'Michael Chen', date: '2025-11-18', time: '4:00 PM', status: 'Pending' },
  { id: 3, lead: 'Ahmed Abdullah', property: 'Penthouse - Palm Jumeirah', agent: 'Emma Williams', date: '2025-11-19', time: '11:00 AM', status: 'Pending' },
  { id: 4, lead: 'Layla Ibrahim', property: 'Townhouse - Arabian Ranches', agent: 'James Brown', date: '2025-11-19', time: '3:00 PM', status: 'Pending' },
];

const completedViewings = [
  { id: 5, lead: 'Omar Khalid', property: 'Apartment - Downtown', agent: 'Lisa Anderson', date: '2025-11-15', time: '2:30 PM', status: 'Done', feedback: 'Client interested, requested follow-up' },
  { id: 6, lead: 'Hassan Ahmed', property: 'Villa - Emirates Hills', agent: 'Sarah Johnson', date: '2025-11-14', time: '10:00 AM', status: 'Done', feedback: 'Client not interested in this property' },
  { id: 7, lead: 'Noor Mohammed', property: 'Apartment - Business Bay', agent: 'Michael Chen', date: '2025-11-13', time: '5:00 PM', status: 'No-show', feedback: 'Client did not show up' },
];

export function ViewingsPage({ onNavigate }: ViewingsPageProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedViewing, setSelectedViewing] = useState<any>(null);

  const handleReschedule = (viewing: any) => {
    setSelectedViewing(viewing);
    setRescheduleModalOpen(true);
  };

  const handleDetails = (viewing: any) => {
    setSelectedViewing(viewing);
    setDetailsModalOpen(true);
  };

  const handleRescheduleSubmit = (data: any) => {
    toast.success('Viewing Rescheduled! 📅', {
      description: `Successfully rescheduled to ${data.newDate} at ${data.newTime}`
    });
    setRescheduleModalOpen(false);
  };

  const handleUpdateStatus = (viewingId: number, status: string, feedback?: string) => {
    if (status === 'Done') {
      toast.success('Viewing Completed! ✓', {
        description: feedback ? 'Viewing marked as done with feedback' : 'Viewing marked as completed'
      });
    } else if (status === 'No-show') {
      toast.warning('No-Show Recorded', {
        description: 'Client did not attend the viewing'
      });
    }
    setDetailsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Property Viewings"
        description="Schedule and manage property viewings"
        actions={
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              toast.success('Schedule Viewing Modal', {
                description: 'Opening schedule viewing form...'
              });
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Viewing
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-900 mb-1">Today's Viewings</div>
              <div className="text-2xl text-blue-600">4</div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Viewings */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Viewings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingViewings.map((viewing) => (
                  <div key={viewing.id} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    {/* Mobile-Optimized Layout */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-start justify-between sm:block">
                          <div className="text-sm mb-1">{viewing.lead}</div>
                          <Badge className="bg-blue-100 text-blue-700 sm:hidden">{viewing.status}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Building2 className="w-3 h-3 shrink-0" />
                          <span className="line-clamp-1">{viewing.property}</span>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 hidden sm:block shrink-0">{viewing.status}</Badge>
                    </div>
                    
                    {/* Date/Time/Agent - Stack on Mobile */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3 shrink-0" />
                          <span>{viewing.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>{viewing.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 shrink-0" />
                          <span className="truncate">{viewing.agent}</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons - Full Width on Mobile */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-initial text-xs h-8" onClick={() => handleReschedule(viewing)}>
                          Reschedule
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-initial text-xs h-8" onClick={() => handleDetails(viewing)}>
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Viewings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Viewings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedViewings.map((viewing) => (
                  <div key={viewing.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm mb-1">{viewing.lead}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Building2 className="w-3 h-3" />
                          {viewing.property}
                        </div>
                      </div>
                      <Badge variant={viewing.status === 'Done' ? 'secondary' : 'destructive'}>
                        {viewing.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {viewing.date} at {viewing.time} • {viewing.agent}
                    </div>
                    <div className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                      {viewing.feedback}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reschedule Viewing Modal */}
      <RescheduleViewingModal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        viewing={selectedViewing}
        onSubmit={handleRescheduleSubmit}
      />

      {/* Viewing Details Modal */}
      <ViewingDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        viewing={selectedViewing}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}