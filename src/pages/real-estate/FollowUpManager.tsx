import { Clock, AlertCircle, CheckCircle, Phone, Mail } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

interface FollowUpManagerProps {
  onNavigate: (page: string) => void;
}

const overdueFollowups = [
  { id: 1, lead: 'Mohammed Al-Rashid', task: 'Follow up after viewing', dueDate: '2025-11-14', overdueDays: 2, agent: 'Sarah Johnson', priority: 'High' },
  { id: 2, lead: 'Ahmed Abdullah', task: 'Send property brochures', dueDate: '2025-11-15', overdueDays: 1, agent: 'Emma Williams', priority: 'Medium' },
];

const todayFollowups = [
  { id: 3, lead: 'Fatima Hassan', task: 'Confirmation call for viewing', dueTime: '2:00 PM', agent: 'Michael Chen', priority: 'High' },
  { id: 4, lead: 'Omar Khalid', task: 'Discuss financing options', dueTime: '4:30 PM', agent: 'Lisa Anderson', priority: 'Medium' },
  { id: 5, lead: 'Layla Ibrahim', task: 'Send updated property list', dueTime: '5:00 PM', agent: 'James Brown', priority: 'Low' },
];

const untouchedLeads = [
  { id: 6, lead: 'Hassan Ahmed', source: 'Website', createdDate: '2025-11-14', hoursSinceCreation: 48, phone: '+971 50 123 4567' },
  { id: 7, lead: 'Noor Mohammed', source: 'Referral', createdDate: '2025-11-15', hoursSinceCreation: 36, phone: '+971 55 234 5678' },
  { id: 8, lead: 'Sara Al-Mansoori', source: 'Social Media', createdDate: '2025-11-15', hoursSinceCreation: 28, phone: '+971 50 345 6789' },
];

export function FollowUpManager({ onNavigate }: FollowUpManagerProps) {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Follow-up Manager"
        description="Manage overdue tasks and untouched leads"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Overdue Tasks</div>
                <div className="text-2xl">23</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Today's Follow-ups</div>
                <div className="text-2xl">12</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Untouched Leads (&gt;24h)</div>
                <div className="text-2xl">8</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overdue" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overdue">Overdue ({overdueFollowups.length})</TabsTrigger>
          <TabsTrigger value="today">Today ({todayFollowups.length})</TabsTrigger>
          <TabsTrigger value="untouched">Untouched Leads ({untouchedLeads.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overdue">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                Overdue Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overdueFollowups.map((item) => (
                  <div key={item.id} className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm mb-1">{item.lead}</div>
                        <div className="text-sm text-gray-700">{item.task}</div>
                      </div>
                      <Badge variant="destructive">
                        {item.overdueDays} days overdue
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        Due: {item.dueDate} • Assigned to: {item.agent}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Clock className="w-5 h-5" />
                Today's Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayFollowups.map((item) => (
                  <div key={item.id} className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm mb-1">{item.lead}</div>
                        <div className="text-sm text-gray-700">{item.task}</div>
                      </div>
                      <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'}>
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600">
                        Due: {item.dueTime} • {item.agent}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Snooze
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Done
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="untouched">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertCircle className="w-5 h-5" />
                Untouched Leads (Not Contacted)
              </CardTitle>
              <Button variant="outline" size="sm">
                Auto-assign
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {untouchedLeads.map((item) => (
                  <div key={item.id} className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.lead}`} />
                          <AvatarFallback>{item.lead[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm mb-1">{item.lead}</div>
                          <div className="text-xs text-gray-600">
                            Source: {item.source} • Created: {item.createdDate}
                          </div>
                        </div>
                      </div>
                      <Badge variant="destructive">
                        {item.hoursSinceCreation}h
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600">{item.phone}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Assign to Me
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}