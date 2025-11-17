import { Users, FileCheck, Send, Award, RefreshCw, AlertCircle, TrendingUp, Clock, Briefcase, CheckCircle, Calendar, ArrowUpRight } from 'lucide-react';
import { StatCard } from '../../components/crm/StatCard';
import { PageHeader } from '../../components/crm/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface BusinessSetupDashboardProps {
  onNavigate: (page: string) => void;
}

const monthlyData = [
  { month: 'Jan', cases: 18, revenue: 245 },
  { month: 'Feb', cases: 24, revenue: 328 },
  { month: 'Mar', cases: 21, revenue: 287 },
  { month: 'Apr', cases: 29, revenue: 396 },
  { month: 'May', cases: 26, revenue: 355 },
  { month: 'Jun', cases: 35, revenue: 478 },
];

const jurisdictionData = [
  { name: 'Mainland', count: 45, color: '#047857' },
  { name: 'Free Zone', count: 78, color: '#10B981' },
  { name: 'Offshore', count: 33, color: '#34D399' },
];

const upcomingRenewals = [
  { company: 'Tech Solutions LLC', type: 'Trade License', date: '2025-11-20', daysLeft: 4, status: 'urgent' },
  { company: 'Global Traders FZ', type: 'Trade License', date: '2025-11-25', daysLeft: 9, status: 'warning' },
  { company: 'Digital Marketing Co', type: 'Visa Renewal', date: '2025-12-01', daysLeft: 15, status: 'normal' },
  { company: 'Consulting Partners', type: 'Ejari Renewal', date: '2025-12-10', daysLeft: 24, status: 'normal' },
];

const documentExpiryAlerts = [
  { client: 'Ahmed Mohammed', document: 'Passport', expiryDate: '2025-11-18', status: 'critical' },
  { client: 'Fatima Al-Said', document: 'Emirates ID', expiryDate: '2025-11-28', status: 'warning' },
  { client: 'Omar Khalil', document: 'Tenancy Contract', expiryDate: '2025-12-05', status: 'warning' },
];

const proOfficerWorkload = [
  { name: 'Hassan Ali', active: 12, pending: 5, completed: 89, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hassan' },
  { name: 'Mariam Ahmed', active: 10, pending: 3, completed: 95, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariam' },
  { name: 'Khalid Ibrahim', active: 8, pending: 2, completed: 78, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=khalid' },
  { name: 'Layla Hassan', active: 15, pending: 7, completed: 102, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=layla' },
];

export function BusinessSetupDashboard({ onNavigate }: BusinessSetupDashboardProps) {
  return (
    <div className="p-8 max-w-[1800px] mx-auto">
      <PageHeader
        title="Business Setup Dashboard"
        description="Probiz Corporate - Comprehensive company formation and PRO services management"
        actions={
          <>
            <Button variant="outline" className="rounded-xl border-gray-300 hover:border-gray-400 hover:bg-gray-50">
              <Clock className="w-4 h-4 mr-2" strokeWidth={1.5} />
              This Month
            </Button>
            <Button 
              onClick={() => onNavigate('bs-leads')}
              className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-lg shadow-emerald-500/30"
            >
              <Users className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Add Inquiry
            </Button>
          </>
        }
      />

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <button 
          onClick={() => onNavigate('bs-leads')}
          className="group relative bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/30">
                <Users className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <Badge className="bg-green-50 text-green-700 border-green-200 font-semibold">
                +18%
              </Badge>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">Total Inquiries</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">156</div>
            <div className="text-xs text-gray-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" strokeWidth={2} />
              from last month
            </div>
          </div>
        </button>

        <div className="group relative bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                <FileCheck className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-semibold">
                12 today
              </Badge>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">Consultations Done</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">89</div>
            <div className="text-xs text-gray-500">Scheduled this month</div>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('bs-pipeline')}
          className="group relative bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/30">
                <Send className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <Badge className="bg-orange-50 text-orange-700 border-orange-200 font-semibold">
                8 pending
              </Badge>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">Applications Submitted</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">45</div>
            <div className="text-xs text-gray-500">Awaiting approval</div>
          </div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg shadow-amber-500/30">
                <Award className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <Badge className="bg-green-50 text-green-700 border-green-200 font-semibold">
                +15%
              </Badge>
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">Licenses Issued (MTD)</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">23</div>
            <div className="text-xs text-gray-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" strokeWidth={2} />
              from last month
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Cases Trend */}
        <Card className="lg:col-span-2 rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Cases & Revenue Trend</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Monthly performance overview</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg">
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#047857" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  cursor={{ fill: '#f3f4f6' }}
                />
                <Bar dataKey="cases" fill="url(#colorCases)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Jurisdiction Distribution */}
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Jurisdiction Types</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Distribution breakdown</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jurisdictionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {jurisdictionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 mt-4">
              {jurisdictionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Renewals & PRO Officers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Renewals */}
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Upcoming Renewals</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Urgent actions required</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-lg"
                onClick={() => onNavigate('bs-renewals')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingRenewals.map((renewal, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900 mb-1">{renewal.company}</div>
                      <div className="text-xs text-gray-600">{renewal.type}</div>
                    </div>
                    <Badge className={
                      renewal.status === 'urgent' ? 'bg-red-50 text-red-700 border-red-200' :
                      renewal.status === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }>
                      {renewal.daysLeft} days
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" strokeWidth={2} />
                      {renewal.date}
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg">
                      Take Action
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PRO Officer Workload */}
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">PRO Officer Workload</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Current assignments</p>
              </div>
              <Briefcase className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proOfficerWorkload.map((officer) => (
                <div key={officer.name} className="p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                      <AvatarImage src={officer.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                        {officer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900">{officer.name}</div>
                      <div className="text-xs text-gray-500">{officer.completed} completed cases</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Active: <span className="font-semibold text-gray-900">{officer.active}</span></span>
                      <span className="text-gray-600">Pending: <span className="font-semibold text-orange-600">{officer.pending}</span></span>
                    </div>
                    <Progress 
                      value={(officer.active / (officer.active + officer.pending)) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}