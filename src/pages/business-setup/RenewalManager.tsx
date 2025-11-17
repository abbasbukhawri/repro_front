import { RefreshCw, AlertCircle, Calendar, Building2 } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface RenewalManagerProps {
  onNavigate: (page: string) => void;
}

const urgentRenewals = [
  { id: 1, company: 'Tech Solutions LLC', type: 'Trade License', expiryDate: '2025-11-20', daysLeft: 4, status: 'Not Started', client: 'John Smith', fee: 'AED 15,000' },
  { id: 2, company: 'Global Traders FZ', type: 'Trade License', expiryDate: '2025-11-25', daysLeft: 9, status: 'In Progress', client: 'Maria Garcia', fee: 'AED 12,000' },
];

const upcomingRenewals = [
  { id: 3, company: 'Digital Marketing Co', type: 'Visa Renewal', expiryDate: '2025-12-01', daysLeft: 15, status: 'Not Started', client: 'David Chen', fee: 'AED 3,000' },
  { id: 4, company: 'Consulting Partners', type: 'Ejari Renewal', expiryDate: '2025-12-10', daysLeft: 24, status: 'Not Started', client: 'Sophie Laurent', fee: 'AED 2,000' },
  { id: 5, company: 'IT Services Hub', type: 'Trade License', expiryDate: '2025-12-15', daysLeft: 29, status: 'Awaiting Documents', client: 'Raj Patel', fee: 'AED 18,000' },
];

const completedRenewals = [
  { id: 6, company: 'Marketing Agency LLC', type: 'Trade License', completedDate: '2025-11-10', client: 'Emma Wilson', fee: 'AED 14,000' },
  { id: 7, company: 'Trading Co FZ', type: 'Visa Renewal', completedDate: '2025-11-08', client: 'Ahmed Hassan', fee: 'AED 4,500' },
];

export function RenewalManager({ onNavigate }: RenewalManagerProps) {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Renewal Manager"
        description="Track and manage license, visa, and contract renewals"
        actions={
          <Button className="bg-green-600 hover:bg-green-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Create Renewal Task
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Urgent (&lt;7 days)</div>
                <div className="text-2xl">4</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">This Month</div>
                <div className="text-2xl">12</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">In Progress</div>
                <div className="text-2xl">8</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Completed MTD</div>
                <div className="text-2xl">15</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="urgent" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="urgent">Urgent ({urgentRenewals.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingRenewals.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedRenewals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="urgent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                Urgent Renewals (Expiring Soon)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentRenewals.map((renewal) => (
                  <div key={renewal.id} className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm mb-1">{renewal.company}</div>
                        <div className="text-xs text-gray-600">{renewal.type}</div>
                        <div className="text-xs text-gray-600 mt-1">Client: {renewal.client}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive" className="mb-2">
                          {renewal.daysLeft} days left
                        </Badge>
                        <div className="text-sm">{renewal.fee}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-red-200">
                      <div className="text-xs text-gray-600">
                        Expires: {renewal.expiryDate}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{renewal.status}</Badge>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Start Renewal
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Renewals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingRenewals.map((renewal) => (
                  <div key={renewal.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm mb-1">{renewal.company}</div>
                        <div className="text-xs text-gray-600">{renewal.type}</div>
                        <div className="text-xs text-gray-600 mt-1">Client: {renewal.client}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          {renewal.daysLeft} days left
                        </Badge>
                        <div className="text-sm">{renewal.fee}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-600">
                        Expires: {renewal.expiryDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{renewal.status}</Badge>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                Completed Renewals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedRenewals.map((renewal) => (
                  <div key={renewal.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm mb-1">{renewal.company}</div>
                        <div className="text-xs text-gray-600">{renewal.type}</div>
                        <div className="text-xs text-gray-600 mt-1">Client: {renewal.client}</div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-700 mb-2">Completed</Badge>
                        <div className="text-sm">{renewal.fee}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 pt-2 border-t border-gray-100">
                      Completed on: {renewal.completedDate}
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