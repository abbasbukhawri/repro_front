import { useState } from 'react';
import { Plus, Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';
import type { BrandType } from '../../App';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { CallDetailModal } from '../../components/modals/CallDetailModal';
import { LogCallModal } from '../../components/modals/LogCallModal';
import { toast } from 'sonner';

interface CallLogsProps {
  brand: BrandType;
  onNavigate: (page: string) => void;
}

const initialCalls = [
  { 
    id: 1, 
    type: 'outgoing', 
    lead: 'Mohammed Al-Rashid', 
    agent: 'Sarah Johnson', 
    duration: '8:32', 
    date: '2025-11-16 2:30 PM', 
    outcome: 'Connected',
    notes: 'Discussed property options',
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
  },
  { 
    id: 2, 
    type: 'incoming', 
    lead: 'Fatima Hassan', 
    agent: 'Michael Chen', 
    duration: '5:15', 
    date: '2025-11-16 11:00 AM', 
    outcome: 'Connected',
    notes: 'Client inquiry about viewing',
    phone: '+971 50 234 5678',
    recordingUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    recordingId: 'REC002',
    callSid: 'CA0987654321fedcba0987654321fedcba',
    fromNumber: '+971502345678',
    toNumber: '+971501234567',
    callStatus: 'completed',
    clientRequest: 'Wants to view 3-bedroom villa in Arabian Ranches',
    propertyInterest: '',
    location: 'Arabian Ranches',
    budget: '4M - 5M AED',
    nextAction: 'Send property brochures',
  },
  { 
    id: 3, 
    type: 'missed', 
    lead: 'Ahmed Abdullah', 
    agent: 'Emma Williams', 
    duration: '-', 
    date: '2025-11-15 4:45 PM', 
    outcome: 'No Answer',
    notes: 'Call back required',
    phone: '+971 50 345 6789',
    recordingUrl: '',
    recordingId: 'REC003',
    callSid: '',
    fromNumber: '+971503456789',
    toNumber: '+971501234567',
    callStatus: 'no-answer',
    clientRequest: '',
    propertyInterest: '',
    location: '',
    budget: '',
    nextAction: 'Follow up tomorrow morning',
  },
  { 
    id: 4, 
    type: 'outgoing', 
    lead: 'Layla Ibrahim', 
    agent: 'James Brown', 
    duration: '12:05', 
    date: '2025-11-15 10:30 AM', 
    outcome: 'Connected',
    notes: 'Follow-up after viewing',
    phone: '+971 50 456 7890',
    recordingUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    recordingId: 'REC004',
    callSid: 'CA5555555555aaaaa5555555555aaaaa',
    fromNumber: '+971504567890',
    toNumber: '+971501234567',
    callStatus: 'completed',
    clientRequest: 'Wants to negotiate price for viewed property',
    propertyInterest: 'Penthouse Downtown',
    location: 'Downtown Dubai',
    budget: '6M - 7M AED',
    nextAction: 'Prepare offer and send to client',
  },
];

export function CallLogs({ brand, onNavigate }: CallLogsProps) {
  const brandColor = brand === 'real-estate' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700';
  
  const [calls, setCalls] = useState(initialCalls);
  const [isCallDetailModalOpen, setCallDetailModalOpen] = useState(false);
  const [isLogCallModalOpen, setLogCallModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);

  const handleCallClick = (call: any) => {
    setSelectedCall(call);
    setCallDetailModalOpen(true);
  };

  const handleUpdateCall = (callId: number, data: any) => {
    setCalls(calls.map(call => 
      call.id === callId ? { ...call, ...data } : call
    ));
  };

  const handleLogCall = (data: any) => {
    const newCall = {
      id: calls.length + 1,
      type: data.type || 'outgoing',
      lead: data.leadName || 'Unknown',
      agent: data.agent || 'Current User',
      duration: data.duration || '0:00',
      date: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      outcome: data.outcome || 'Connected',
      notes: data.notes || '',
      phone: data.phone || '',
      recordingUrl: '',
      recordingId: `REC${calls.length + 1}`.padStart(6, '0'),
      callSid: '',
      fromNumber: '',
      toNumber: '',
      callStatus: 'completed',
      clientRequest: '',
      propertyInterest: '',
      location: '',
      budget: '',
      nextAction: '',
    };
    setCalls([newCall, ...calls]);
    toast.success('Call logged successfully!');
    setLogCallModalOpen(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Call Logs"
        description="View call history with recordings and transcripts"
        actions={
          <Button className={brandColor} onClick={() => setLogCallModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Log Call
          </Button>
        }
      />

      <div className="space-y-3">
        {calls.map((call) => (
          <Card 
            key={call.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCallClick(call)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  call.type === 'outgoing' ? 'bg-blue-50' :
                  call.type === 'incoming' ? 'bg-green-50' :
                  'bg-red-50'
                }`}>
                  {call.type === 'outgoing' && <PhoneOutgoing className="w-5 h-5 text-blue-600" />}
                  {call.type === 'incoming' && <PhoneIncoming className="w-5 h-5 text-green-600" />}
                  {call.type === 'missed' && <PhoneMissed className="w-5 h-5 text-red-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                    <div>
                      <div className="text-sm mb-1">{call.lead}</div>
                      <div className="text-xs text-gray-600">Agent: {call.agent}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="capitalize">{call.type}</Badge>
                      {call.recordingUrl && (
                        <Badge className="bg-purple-100 text-purple-700">Has Recording</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">{call.notes}</div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span>{call.date}</span>
                    {call.duration !== '-' && <span>Duration: {call.duration}</span>}
                    <span>Outcome: {call.outcome}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <CallDetailModal
        isOpen={isCallDetailModalOpen}
        onClose={() => {
          setCallDetailModalOpen(false);
          setSelectedCall(null);
        }}
        onUpdate={handleUpdateCall}
        callData={selectedCall}
      />

      <LogCallModal
        isOpen={isLogCallModalOpen}
        onClose={() => setLogCallModalOpen(false)}
        onSubmit={handleLogCall}
      />
    </div>
  );
}