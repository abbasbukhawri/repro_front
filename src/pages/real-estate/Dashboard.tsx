import { Users, CheckCircle, Calendar, TrendingUp, XCircle, Clock, Award, Building2, ArrowUpRight, DollarSign, Home, Target, Percent } from 'lucide-react';
import { StatCard } from '../../components/crm/StatCard';
import { PageHeader } from '../../components/crm/PageHeader';
import { KPICard } from '../../components/crm/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { useSettings } from '../../contexts/SettingsContext';

interface RealEstateDashboardProps {
  onNavigate: (page: string) => void;
}

const dealsData = [
  { month: 'Jan', deals: 12, revenue: 15.2 },
  { month: 'Feb', deals: 19, revenue: 24.5 },
  { month: 'Mar', deals: 15, revenue: 19.8 },
  { month: 'Apr', deals: 25, revenue: 32.1 },
  { month: 'May', deals: 22, revenue: 28.7 },
  { month: 'Jun', deals: 30, revenue: 38.9 },
];

const sourceData = [
  { name: 'Website', value: 45, color: '#1E40AF' },
  { name: 'Referrals', value: 30, color: '#3B82F6' },
  { name: 'Social Media', value: 15, color: '#60A5FA' },
  { name: 'Walk-in', value: 10, color: '#93C5FD' },
];

const agentPerformance = [
  { name: 'Sarah Johnson', deals: 12, value: 15200000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', change: '+15%' },
  { name: 'Michael Chen', deals: 10, value: 12800000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael', change: '+12%' },
  { name: 'Emma Williams', deals: 9, value: 11500000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', change: '+8%' },
  { name: 'James Brown', deals: 8, value: 10200000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james', change: '+5%' },
  { name: 'Lisa Anderson', deals: 7, value: 9100000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa', change: '+3%' },
];

const recentActivities = [
  { id: 1, agent: 'Sarah Johnson', action: 'Closed deal', lead: 'Mohammed Al-Rashid', time: '5 min ago', type: 'success', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
  { id: 2, agent: 'Michael Chen', action: 'Scheduled viewing', lead: 'Fatima Hassan', time: '12 min ago', type: 'info', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
  { id: 3, agent: 'Emma Williams', action: 'Added new lead', lead: 'Ahmed Abdullah', time: '25 min ago', type: 'info', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
  { id: 4, agent: 'James Brown', action: 'Viewing completed', lead: 'Layla Ibrahim', time: '1 hour ago', type: 'info', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james' },
  { id: 5, agent: 'Lisa Anderson', action: 'Follow-up call', lead: 'Omar Khalid', time: '2 hours ago', type: 'warning', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa' },
];

export function RealEstateDashboard({ onNavigate }: RealEstateDashboardProps) {
  const { formatCurrency } = useSettings();

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1800px] mx-auto">
      <PageHeader
        title="Real Estate Dashboard"
        description="ReproLeaders CRM - Comprehensive property deals and performance analytics"
        actions={
          <>
            <Button variant="outline" className="hidden sm:flex rounded-xl border-gray-300 hover:border-gray-400 hover:bg-gray-50">
              <Calendar className="w-4 h-4 mr-2" strokeWidth={1.5} />
              This Month
            </Button>
            <Button 
              onClick={() => onNavigate('re-leads')}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30"
            >
              <Users className="w-4 h-4 mr-2" strokeWidth={1.5} />
              <span className="hidden sm:inline">Add Lead</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </>
        }
      />

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Leads"
          value={234}
          change="+12%"
          changeType="up"
          icon={Users}
          color="blue"
          onClick={() => onNavigate('re-leads')}
        />
        <KPICard
          title="Qualified Leads"
          value={89}
          change="+8%"
          changeType="up"
          icon={CheckCircle}
          color="emerald"
          onClick={() => onNavigate('re-leads')}
        />
        <KPICard
          title="Viewings Scheduled"
          value={12}
          change="3 today"
          icon={Calendar}
          color="purple"
          onClick={() => onNavigate('re-viewings')}
        />
        <KPICard
          title="Deals in Pipeline"
          value={45}
          change={`${formatCurrency(58500000)}`}
          icon={TrendingUp}
          color="amber"
          onClick={() => onNavigate('re-pipeline')}
        />
      </div>

      {/* Additional KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue MTD</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(38900000)}</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" strokeWidth={2} />
            +18% vs last month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Target className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Target Achievement</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">78%</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1.5 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Building2 className="w-4 h-4 text-purple-600" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Properties Listed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">89</p>
          <p className="text-xs text-gray-600 mt-1">12 added this week</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Percent className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Conversion Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">38%</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" strokeWidth={2} />
            +5% improvement
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-rose-50 rounded-lg">
              <Clock className="w-4 h-4 text-rose-600" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Avg. Close Time</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">14 days</p>
          <p className="text-xs text-gray-600 mt-1">3 days faster</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Deals Trend */}
        <Card className="lg:col-span-2 rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Deals & Revenue Trend</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Monthly performance overview</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg">
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dealsData}>
                <defs>
                  <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E40AF" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.6}/>
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
                <Bar dataKey="deals" fill="url(#colorDeals)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">Lead Sources</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Distribution breakdown</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
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
            <div className="grid grid-cols-2 gap-3 mt-4">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                  <div>
                    <div className="text-xs text-gray-600">{source.name}</div>
                    <div className="text-sm font-semibold text-gray-900">{source.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Agents */}
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Top Performing Agents</CardTitle>
                <p className="text-sm text-gray-500 mt-1">This month's leaders</p>
              </div>
              <Award className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentPerformance.map((agent, index) => (
                <div key={agent.name} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900">{agent.name}</div>
                    <div className="text-xs text-gray-500">{agent.deals} deals closed</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-gray-900">{formatCurrency(agent.value)}</div>
                    <Badge className="bg-green-50 text-green-700 border-green-200 text-xs mt-1">
                      {agent.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Latest team updates</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-lg"
                onClick={() => onNavigate('activity')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                  <Avatar className="h-9 w-9 ring-2 ring-gray-200">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs">
                      {activity.agent.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900">{activity.agent}</span>
                      {' '}
                      <span className="text-gray-600">{activity.action}</span>
                      {' '}
                      <span className="text-gray-500">for</span>
                      {' '}
                      <span className="font-medium text-gray-900">{activity.lead}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" strokeWidth={2} />
                      {activity.time}
                    </div>
                  </div>
                  <Badge variant={
                    activity.type === 'success' ? 'default' : 
                    activity.type === 'warning' ? 'secondary' : 
                    'outline'
                  } className={
                    activity.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' :
                    activity.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-blue-50 text-blue-700 border-blue-200'
                  }>
                    {activity.action.split(' ')[0]}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}