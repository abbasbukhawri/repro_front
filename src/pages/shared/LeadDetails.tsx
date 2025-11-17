import { useState } from 'react';
import { ArrowLeft, Phone, Mail, MessageSquare, Edit, Calendar, CheckSquare, FileText, Upload, Clock, MapPin, DollarSign, User, Building, AlertCircle, Eye } from 'lucide-react';
import type { BrandType } from '../../App';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { EditLeadModal } from '../../components/modals/EditLeadModal';
import { LogCallModal } from '../../components/modals/LogCallModal';
import { CallDetailModal } from '../../components/modals/CallDetailModal';
import { AddNoteModal } from '../../components/modals/AddNoteModal';
import { AddTaskModal } from '../../components/modals/AddTaskModal';
import { AddFollowUpModal } from '../../components/modals/AddFollowUpModal';
import { AddViewingModal } from '../../components/modals/AddViewingModal';
import { useCRM } from '../../contexts/CRMContext';
import { toast } from 'sonner';

interface LeadDetailsProps {
  brand: BrandType;
  leadId: string | null;
  onNavigate: (page: string) => void;
}

const initialCallLogsData = [
  { 
    id: 1, 
    type: 'Outbound', 
    duration: '8:32', 
    date: '2025-11-16 10:30 AM', 
    agent: 'Sarah Johnson', 
    outcome: 'Connected', 
    notes: 'Discussed property requirements and budget. Client interested in viewing options this weekend.',
    phone: '+971 50 123 4567',
    recordingUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    recordingId: 'REC001',
    callSid: 'CA1234567890abcdef1234567890abcdef',
    fromNumber: '+971501234567',
    toNumber: '+971507654321',
    callStatus: 'completed',
    clientRequest: 'Looking for 2-bedroom apartment with sea view in Dubai Marina',
    propertyInterest: 'Villa 123 Dubai Hills',
    location: 'Dubai Marina',
    budget: '2.5M - 3M AED',
    nextAction: 'Schedule viewing for this weekend',
    lead: 'Mohammed Al-Rashid',
  },
  { 
    id: 2, 
    type: 'Inbound', 
    duration: '5:12', 
    date: '2025-11-15 2:45 PM', 
    agent: 'Sarah Johnson', 
    outcome: 'Connected', 
    notes: 'Client called to ask about financing options and payment plans.',
    phone: '+971 50 123 4567',
    recordingUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    recordingId: 'REC002',
    callSid: 'CA0987654321fedcba0987654321fedcba',
    fromNumber: '+971501234567',
    toNumber: '+971507654321',
    callStatus: 'completed',
    clientRequest: 'Wants information about mortgage and payment plans',
    propertyInterest: '',
    location: '',
    budget: '',
    nextAction: 'Send financing options document',
    lead: 'Mohammed Al-Rashid',
  },
  { 
    id: 3, 
    type: 'Outbound', 
    duration: '0:00', 
    date: '2025-11-14 4:20 PM', 
    agent: 'Sarah Johnson', 
    outcome: 'No Answer', 
    notes: 'Left voicemail requesting callback.',
    phone: '+971 50 123 4567',
    recordingUrl: '',
    recordingId: 'REC003',
    callSid: '',
    fromNumber: '+971501234567',
    toNumber: '+971507654321',
    callStatus: 'no-answer',
    clientRequest: '',
    propertyInterest: '',
    location: '',
    budget: '',
    nextAction: 'Follow up tomorrow',
    lead: 'Mohammed Al-Rashid',
  },
];

const activityLogData = [
  { id: 1, action: 'Status Changed', description: 'Lead status changed from "Contacted" to "Qualified"', user: 'Sarah Johnson', timestamp: '2 hours ago', type: 'status' },
  { id: 2, action: 'Email Sent', description: 'Sent property brochures for Dubai Hills villas', user: 'System', timestamp: '5 hours ago', type: 'email' },
  { id: 3, action: 'Note Added', description: 'Added note: Client prefers properties with pool and garden', user: 'Sarah Johnson', timestamp: '1 day ago', type: 'note' },
  { id: 4, action: 'Viewing Scheduled', description: 'Property viewing scheduled for Villa 123, Dubai Hills', user: 'Sarah Johnson', timestamp: '1 day ago', type: 'viewing' },
  { id: 5, action: 'Lead Created', description: 'New lead created from Website Form', user: 'System', timestamp: '6 days ago', type: 'created' },
];

const followUpsData = [
  { id: 1, task: 'Follow up call after viewing', dueDate: '2025-11-18', dueTime: '2:00 PM', priority: 'High', status: 'Pending', assignedTo: 'Sarah Johnson' },
  { id: 2, task: 'Send additional property options', dueDate: '2025-11-17', dueTime: '10:00 AM', priority: 'Medium', status: 'Pending', assignedTo: 'Sarah Johnson' },
  { id: 3, task: 'Prepare negotiation strategy', dueDate: '2025-11-20', dueTime: '3:00 PM', priority: 'Medium', status: 'Pending', assignedTo: 'Sarah Johnson' },
  { id: 4, task: 'Initial contact call', dueDate: '2025-11-11', dueTime: '11:00 AM', priority: 'High', status: 'Completed', assignedTo: 'Sarah Johnson' },
];

const documentsData = [
  { id: 1, name: 'Passport Copy.pdf', size: '2.3 MB', uploadedBy: 'Mohammed Al-Rashid', date: '2025-11-15' },
  { id: 2, name: 'Emirates ID.pdf', size: '1.1 MB', uploadedBy: 'Mohammed Al-Rashid', date: '2025-11-15' },
  { id: 3, name: 'Salary Certificate.pdf', size: '856 KB', uploadedBy: 'Mohammed Al-Rashid', date: '2025-11-14' },
];

export function LeadDetails({ brand, leadId, onNavigate }: LeadDetailsProps) {
  const brandColor = brand === 'real-estate' ? 'blue' : 'green';
  const brandBg = brand === 'real-estate' ? 'bg-slate-700 hover:bg-slate-800' : 'bg-emerald-700 hover:bg-emerald-800';

  const [isEditLeadModalOpen, setEditLeadModalOpen] = useState(false);
  const [isLogCallModalOpen, setLogCallModalOpen] = useState(false);
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isAddFollowUpModalOpen, setAddFollowUpModalOpen] = useState(false);
  const [isAddViewingModalOpen, setAddViewingModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);

  const leadName = brand === 'real-estate' ? 'Mohammed Al-Rashid' : 'John Smith';

  const handleEditLead = (data: any) => {
    console.log('Edit lead:', data);
    toast.success('Lead updated successfully!');
    setEditLeadModalOpen(false);
  };

  const handleLogCall = (data: any) => {
    console.log('Call logged:', data);
    toast.success('Call logged successfully!');
    setLogCallModalOpen(false);
  };

  const handleAddNote = (data: any) => {
    console.log('Note added:', data);
    toast.success('Note added successfully!');
    setAddNoteModalOpen(false);
  };

  const handleAddTask = (data: any) => {
    console.log('Task added:', data);
    toast.success('Task added successfully!');
    setAddTaskModalOpen(false);
  };

  const handleAddFollowUp = (data: any) => {
    console.log('Follow-up added:', data);
    toast.success('Follow-up added successfully!');
    setAddFollowUpModalOpen(false);
  };

  const handleAddViewing = (data: any) => {
    console.log('Viewing added:', data);
    toast.success('Viewing added successfully!');
    setAddViewingModalOpen(false);
  };

  const handleCallDetail = (call: any) => {
    setSelectedCall(call);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        breadcrumbs={[
          { label: brand === 'real-estate' ? 'Real Estate Leads' : 'Business Setup Inquiries', onClick: () => onNavigate(brand === 'real-estate' ? 're-leads' : 'bs-leads') },
          { label: 'Lead Details' },
        ]}
        title={brand === 'real-estate' ? 'Mohammed Al-Rashid' : 'John Smith'}
        description={`Lead ID: ${leadId || 'LD-2024-001'}`}
        actions={
          <>
            <Button variant="outline" onClick={() => setEditLeadModalOpen(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" onClick={() => setLogCallModalOpen(true)}>
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button className={brandBg}>
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brand === 'real-estate' ? (
                  <>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Budget</div>
                        <div className="text-sm">AED 2.5M - 3M</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Property Type</div>
                        <div className="text-sm">Villa</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Preferred Location</div>
                        <div className="text-sm">Dubai Hills, Arabian Ranches</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Assigned Agent</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">Sarah Johnson</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Nationality</div>
                        <div className="text-sm">British</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Service Required</div>
                        <div className="text-sm">Company Formation</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Jurisdiction</div>
                        <div className="text-sm">Free Zone (DMCC)</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Number of Visas</div>
                        <div className="text-sm">3 visas</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Related to PRO</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=hassan" />
                            <AvatarFallback>HA</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">Hassan Ali</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className={`grid w-full ${brand === 'real-estate' ? 'grid-cols-7' : 'grid-cols-6'}`}>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              {brand === 'real-estate' && <TabsTrigger value="viewings">Viewings</TabsTrigger>}
              <TabsTrigger value="calls">Calls</TabsTrigger>
              <TabsTrigger value="followups">Follow-ups</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityLogData.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          item.type === 'status' ? 'bg-slate-100' : 
                          item.type === 'email' ? 'bg-indigo-50' : 
                          item.type === 'note' ? 'bg-emerald-50' : 
                          item.type === 'viewing' ? 'bg-violet-50' : 'bg-amber-50'
                        }`}>
                          {item.type === 'status' && <Clock className="w-5 h-5 text-slate-600" />}
                          {item.type === 'email' && <Mail className="w-5 h-5 text-indigo-600" />}
                          {item.type === 'note' && <FileText className="w-5 h-5 text-emerald-600" />}
                          {item.type === 'viewing' && <Calendar className="w-5 h-5 text-violet-600" />}
                          {item.type === 'created' && <AlertCircle className="w-5 h-5 text-amber-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <div className="text-sm">{item.action}</div>
                            <div className="text-xs text-gray-500 whitespace-nowrap">{item.timestamp}</div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <Badge variant="secondary" className="text-xs">
                            {item.user}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="viewings">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Property Viewings</CardTitle>
                  <Button size="sm" className={brandBg} onClick={() => setAddViewingModalOpen(true)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Sample viewings data */}
                    <div className="p-4 border border-gray-200 rounded-lg bg-blue-50/50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <Building className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium mb-1">Luxurious 4BR Villa - Dubai Hills Estate</div>
                            <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                2025-11-20
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                2:00 PM
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                Dubai Hills
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                                <AvatarFallback>SJ</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600">Agent: Sarah Johnson</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Scheduled</Badge>
                      </div>
                      <div className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                        Meeting Point: Property main entrance
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                            <Building className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium mb-1">Modern 2BR Apartment - Dubai Marina</div>
                            <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                2025-11-15
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                10:00 AM
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                Dubai Marina
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                                <AvatarFallback>SJ</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600">Agent: Sarah Johnson</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-gray-100 text-gray-700">Completed</Badge>
                      </div>
                      <div className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                        Notes: Client liked the view but budget concerns
                      </div>
                    </div>

                    <div className="text-center py-8 text-gray-400">
                      <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No more viewings scheduled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calls">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Call Logs</CardTitle>
                  <Button size="sm" className={brandBg} onClick={() => setLogCallModalOpen(true)}>
                    <Phone className="w-4 h-4 mr-2" />
                    Log Call
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {initialCallLogsData.map((call) => (
                      <div key={call.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                              call.type === 'Outbound' ? 'bg-blue-50' : 'bg-green-50'
                            }`}>
                              <Phone className={`w-5 h-5 ${
                                call.type === 'Outbound' ? 'text-blue-600' : 'text-green-600'
                              }`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {call.type}
                                </Badge>
                                <Badge variant={call.outcome === 'Connected' ? 'default' : 'secondary'} className="text-xs bg-slate-100 text-slate-700">
                                  {call.outcome}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600">Duration: {call.duration}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            {call.date}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{call.notes}</p>
                        <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                          Agent: {call.agent}
                        </div>
                        <Button size="sm" className="mt-2" onClick={() => handleCallDetail(call)}>
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="followups">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Follow-ups & Reminders</CardTitle>
                  <Button size="sm" className={brandBg} onClick={() => setAddFollowUpModalOpen(true)}>
                    <Clock className="w-4 h-4 mr-2" />
                    Add Follow-up
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {followUpsData.map((followup) => (
                      <div key={followup.id} className={`p-4 border rounded-lg ${
                        followup.status === 'Completed' ? 'border-gray-200 bg-gray-50' : 'border-gray-200'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3 flex-1">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 mt-0.5" 
                              checked={followup.status === 'Completed'}
                              readOnly
                            />
                            <div className="flex-1">
                              <div className={`text-sm mb-1 ${
                                followup.status === 'Completed' ? 'line-through text-gray-500' : ''
                              }`}>
                                {followup.task}
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <div className="text-xs text-gray-500">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {followup.dueDate} at {followup.dueTime}
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {followup.assignedTo}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              followup.priority === 'High' ? 'destructive' : 
                              followup.priority === 'Medium' ? 'default' : 
                              'secondary'
                            } className={
                              followup.priority === 'Medium' ? 'bg-slate-100 text-slate-700' : ''
                            }>
                              {followup.priority}
                            </Badge>
                            {followup.status === 'Completed' && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                {followup.status}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Internal Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-sm">Client prefers ground floor units with garden</div>
                        <div className="text-xs text-gray-500">1 day ago</div>
                      </div>
                      <div className="text-xs text-gray-600">By Sarah Johnson</div>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-sm">Budget can be stretched to AED 3.5M for the right property</div>
                        <div className="text-xs text-gray-500">2 days ago</div>
                      </div>
                      <div className="text-xs text-gray-600">By Sarah Johnson</div>
                    </div>
                  </div>
                  <div>
                    <Textarea placeholder="Add internal note (only visible to team)..." className="mb-3" />
                    <Button className={brandBg} onClick={() => setAddNoteModalOpen(true)}>Add Note</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Tasks & Follow-ups</CardTitle>
                  <Button size="sm" className={brandBg} onClick={() => setAddTaskModalOpen(true)}>
                    <CheckSquare className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {followUpsData.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <input type="checkbox" className="w-4 h-4" />
                        <div className="flex-1">
                          <div className="text-sm">{task.task}</div>
                          <div className="text-xs text-gray-500">Due: {task.dueDate} {task.dueTime}</div>
                        </div>
                        <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Documents</CardTitle>
                  <Button size="sm" className={brandBg}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documentsData.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div className="flex-1">
                          <div className="text-sm">{doc.name}</div>
                          <div className="text-xs text-gray-500">
                            {doc.size} • Uploaded by {doc.uploadedBy} on {doc.date}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-gray-600">Phone</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">+971 50 123 4567</span>
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-600">Email</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{brand === 'real-estate' ? 'mohammed@email.com' : 'john@email.com'}</span>
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-600">Source</Label>
                <div className="text-sm mt-1">Website Form</div>
              </div>
              <div>
                <Label className="text-xs text-gray-600">Created</Label>
                <div className="text-sm mt-1">Nov 10, 2025</div>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-gray-600">Current Status</Label>
                <Badge className="mt-2 bg-green-100 text-green-700">
                  {brand === 'real-estate' ? 'Qualified' : 'Consultation'}
                </Badge>
              </div>
              <div>
                <Label className="text-xs text-gray-600 mb-2 block">Change Status</Label>
                <select className="w-full p-2 border border-gray-200 rounded-lg text-sm">
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Viewing Scheduled</option>
                  <option>Negotiation</option>
                  <option>Closed Won</option>
                  <option>Closed Lost</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setAddViewingModalOpen(true)}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule {brand === 'real-estate' ? 'Viewing' : 'Consultation'}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckSquare className="w-4 h-4 mr-2" />
                Create Task
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <EditLeadModal 
        isOpen={isEditLeadModalOpen} 
        onClose={() => setEditLeadModalOpen(false)} 
        onSubmit={handleEditLead}
        brand={brand}
      />
      <LogCallModal 
        isOpen={isLogCallModalOpen} 
        onClose={() => setLogCallModalOpen(false)} 
        onSubmit={handleLogCall}
        leadName={leadName}
      />
      <CallDetailModal 
        isOpen={selectedCall !== null} 
        onClose={() => setSelectedCall(null)} 
        onUpdate={(callId, data) => {
          toast.success('Call details updated!');
        }}
        callData={selectedCall}
      />
      <AddNoteModal 
        isOpen={isAddNoteModalOpen} 
        onClose={() => setAddNoteModalOpen(false)} 
        onSubmit={handleAddNote}
        entityName={leadName}
      />
      <AddTaskModal 
        isOpen={isAddTaskModalOpen} 
        onClose={() => setAddTaskModalOpen(false)} 
        onSubmit={handleAddTask}
        entityName={leadName}
      />
      <AddFollowUpModal 
        isOpen={isAddFollowUpModalOpen} 
        onClose={() => setAddFollowUpModalOpen(false)} 
        onSubmit={handleAddFollowUp}
        entityName={leadName}
      />
      <AddViewingModal 
        isOpen={isAddViewingModalOpen} 
        onClose={() => setAddViewingModalOpen(false)} 
        onSubmit={handleAddViewing}
        entityName={leadName}
      />
    </div>
  );
}