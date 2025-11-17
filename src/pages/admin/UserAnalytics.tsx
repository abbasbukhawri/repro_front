import { useState } from 'react';
import { Users, Target, DollarSign, TrendingUp, Award, CheckCircle, XCircle, Clock, Filter, Download, Eye } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface UserAnalyticsProps {
  onNavigate: (page: string) => void;
}

const userKPIData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    role: 'Senior Agent',
    department: 'Real Estate',
    leadsGenerated: 45,
    leadsQualified: 32,
    dealsWon: 12,
    dealsLost: 5,
    revenue: 15200000,
    conversionRate: 71,
    avgDealSize: 1266667,
    responseTime: '2.5 hrs',
    targetAchievement: 95,
    viewingsScheduled: 28,
    viewingsCompleted: 24,
    followUps: 56,
    status: 'Excellent'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    role: 'Senior Agent',
    department: 'Real Estate',
    leadsGenerated: 38,
    leadsQualified: 26,
    dealsWon: 10,
    dealsLost: 4,
    revenue: 12800000,
    conversionRate: 68,
    avgDealSize: 1280000,
    responseTime: '3.1 hrs',
    targetAchievement: 85,
    viewingsScheduled: 22,
    viewingsCompleted: 19,
    followUps: 48,
    status: 'Excellent'
  },
  {
    id: 3,
    name: 'Emma Williams',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    role: 'Agent',
    department: 'Real Estate',
    leadsGenerated: 42,
    leadsQualified: 28,
    dealsWon: 9,
    dealsLost: 6,
    revenue: 11500000,
    conversionRate: 67,
    avgDealSize: 1277778,
    responseTime: '2.8 hrs',
    targetAchievement: 78,
    viewingsScheduled: 25,
    viewingsCompleted: 21,
    followUps: 52,
    status: 'Good'
  },
  {
    id: 4,
    name: 'James Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    role: 'Agent',
    department: 'Real Estate',
    leadsGenerated: 35,
    leadsQualified: 22,
    dealsWon: 8,
    dealsLost: 5,
    revenue: 10200000,
    conversionRate: 62,
    avgDealSize: 1275000,
    responseTime: '3.5 hrs',
    targetAchievement: 72,
    viewingsScheduled: 18,
    viewingsCompleted: 15,
    followUps: 41,
    status: 'Good'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    role: 'Junior Agent',
    department: 'Real Estate',
    leadsGenerated: 28,
    leadsQualified: 18,
    dealsWon: 7,
    dealsLost: 4,
    revenue: 9100000,
    conversionRate: 64,
    avgDealSize: 1300000,
    responseTime: '4.2 hrs',
    targetAchievement: 65,
    viewingsScheduled: 15,
    viewingsCompleted: 13,
    followUps: 35,
    status: 'Average'
  },
  {
    id: 6,
    name: 'Ahmed Hassan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed',
    role: 'Business Consultant',
    department: 'Business Setup',
    leadsGenerated: 52,
    leadsQualified: 38,
    dealsWon: 15,
    dealsLost: 3,
    revenue: 8500000,
    conversionRate: 73,
    avgDealSize: 566667,
    responseTime: '2.2 hrs',
    targetAchievement: 92,
    viewingsScheduled: 0,
    viewingsCompleted: 0,
    followUps: 68,
    status: 'Excellent'
  },
];

const userPledgeData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    role: 'Senior Agent',
    department: 'Real Estate',
    pledgeTarget: 18000000,
    pledgesCreated: 15,
    pledgesActive: 8,
    pledgesCompleted: 5,
    pledgesCancelled: 2,
    totalPledgeValue: 17200000,
    totalCollected: 15200000,
    totalPending: 2000000,
    achievementRate: 96,
    avgPledgeSize: 1146667,
    largestPledge: 3200000,
    collectionRate: 88,
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    role: 'Senior Agent',
    department: 'Real Estate',
    pledgeTarget: 15000000,
    pledgesCreated: 12,
    pledgesActive: 6,
    pledgesCompleted: 4,
    pledgesCancelled: 2,
    totalPledgeValue: 14100000,
    totalCollected: 12800000,
    totalPending: 1300000,
    achievementRate: 94,
    avgPledgeSize: 1175000,
    largestPledge: 2800000,
    collectionRate: 91,
  },
  {
    id: 3,
    name: 'Emma Williams',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    role: 'Agent',
    department: 'Real Estate',
    pledgeTarget: 12000000,
    pledgesCreated: 11,
    pledgesActive: 5,
    pledgesCompleted: 4,
    pledgesCancelled: 2,
    totalPledgeValue: 12500000,
    totalCollected: 11500000,
    totalPending: 1000000,
    achievementRate: 104,
    avgDealSize: 1136364,
    largestPledge: 2500000,
    collectionRate: 92,
  },
  {
    id: 4,
    name: 'James Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    role: 'Agent',
    department: 'Real Estate',
    pledgeTarget: 12000000,
    pledgesCreated: 10,
    pledgesActive: 4,
    pledgesCompleted: 4,
    pledgesCancelled: 2,
    totalPledgeValue: 11200000,
    totalCollected: 10200000,
    totalPending: 1000000,
    achievementRate: 93,
    avgPledgeSize: 1120000,
    largestPledge: 2200000,
    collectionRate: 91,
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    role: 'Junior Agent',
    department: 'Real Estate',
    pledgeTarget: 10000000,
    pledgesCreated: 9,
    pledgesActive: 3,
    pledgesCompleted: 3,
    pledgesCancelled: 3,
    totalPledgeValue: 9800000,
    totalCollected: 9100000,
    totalPending: 700000,
    achievementRate: 98,
    avgPledgeSize: 1088889,
    largestPledge: 2100000,
    collectionRate: 93,
  },
  {
    id: 6,
    name: 'Ahmed Hassan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed',
    role: 'Business Consultant',
    department: 'Business Setup',
    pledgeTarget: 10000000,
    pledgesCreated: 18,
    pledgesActive: 8,
    pledgesCompleted: 8,
    pledgesCancelled: 2,
    totalPledgeValue: 9500000,
    totalCollected: 8500000,
    totalPending: 1000000,
    achievementRate: 95,
    avgPledgeSize: 527778,
    largestPledge: 850000,
    collectionRate: 89,
  },
];

const monthlyTrendData = [
  { month: 'Jan', revenue: 8500, pledges: 7200 },
  { month: 'Feb', revenue: 11200, pledges: 9800 },
  { month: 'Mar', revenue: 9800, pledges: 8500 },
  { month: 'Apr', revenue: 13500, pledges: 11900 },
  { month: 'May', revenue: 12100, pledges: 10800 },
  { month: 'Jun', revenue: 15200, pledges: 13500 },
];

export function UserAnalytics({ onNavigate }: UserAnalyticsProps) {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const filteredKPIData = selectedDepartment === 'all' 
    ? userKPIData 
    : userKPIData.filter(user => user.department.toLowerCase().includes(selectedDepartment));

  const filteredPledgeData = selectedDepartment === 'all'
    ? userPledgeData
    : userPledgeData.filter(user => user.department.toLowerCase().includes(selectedDepartment));

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'average':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getAchievementColor = (rate: number) => {
    if (rate >= 90) return 'text-emerald-600';
    if (rate >= 75) return 'text-blue-600';
    if (rate >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  // Calculate totals
  const totalRevenue = userKPIData.reduce((sum, user) => sum + user.revenue, 0);
  const totalDeals = userKPIData.reduce((sum, user) => sum + user.dealsWon, 0);
  const totalPledgeValue = userPledgeData.reduce((sum, user) => sum + user.totalPledgeValue, 0);
  const totalCollected = userPledgeData.reduce((sum, user) => sum + user.totalCollected, 0);
  const avgAchievement = Math.round(userKPIData.reduce((sum, user) => sum + user.targetAchievement, 0) / userKPIData.length);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1800px] mx-auto">
      <PageHeader
        title="User Performance Analytics"
        description="Track individual KPIs, pledges, and achievements across all team members"
        actions={
          <>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[140px] md:w-[180px] rounded-xl border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="hidden sm:flex rounded-xl border-gray-300 hover:border-gray-400 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
              <span className="hidden md:inline">Export Report</span>
              <span className="md:hidden">Export</span>
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <Users className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{userKPIData.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl">
              <DollarSign className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">AED {(totalRevenue / 1000000).toFixed(1)}M</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-purple-50 rounded-xl">
              <CheckCircle className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Deals</p>
          <p className="text-2xl font-bold text-gray-900">{totalDeals}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-amber-50 rounded-xl">
              <Target className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Avg. Target Achievement</p>
          <p className="text-2xl font-bold text-gray-900">{avgAchievement}%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-rose-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-rose-600" strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Pledges Collected</p>
          <p className="text-2xl font-bold text-gray-900">AED {(totalCollected / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Department Filter */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Filter by Department</h3>
            <p className="text-sm text-gray-500">View performance metrics by team</p>
          </div>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-[240px] rounded-xl border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="business-setup">Business Setup</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs for KPI vs Pledges */}
      <Tabs defaultValue="kpi" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1 rounded-xl">
          <TabsTrigger value="kpi" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white px-6">
            <Target className="w-4 h-4 mr-2" strokeWidth={1.5} />
            User KPIs
          </TabsTrigger>
          <TabsTrigger value="pledges" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 data-[state=active]:text-white px-6">
            <DollarSign className="w-4 h-4 mr-2" strokeWidth={1.5} />
            User Pledges
          </TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-500 data-[state=active]:text-white px-6">
            <TrendingUp className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Performance Trends
          </TabsTrigger>
        </TabsList>

        {/* KPI Tab */}
        <TabsContent value="kpi" className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">User</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Department</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-center">Leads Generated</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-center">Qualified</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-center">Deals Won</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-center">Conversion Rate</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Revenue</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-center">Target Achievement</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Response Time</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKPIData.map((user) => (
                    <TableRow key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-300 text-gray-700">
                          {user.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-gray-900">{user.leadsGenerated}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-gray-900">{user.leadsQualified}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-semibold text-emerald-600">{user.dealsWon}</span>
                          <span className="text-gray-400">/</span>
                          <span className="text-sm text-rose-600">{user.dealsLost}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-semibold text-gray-900">{user.conversionRate}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full" 
                              style={{ width: `${user.conversionRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-gray-900">
                          AED {(user.revenue / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-gray-500">
                          Avg: {(user.avgDealSize / 1000).toFixed(0)}K
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`font-bold ${getAchievementColor(user.targetAchievement)}`}>
                            {user.targetAchievement}%
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                user.targetAchievement >= 90 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                                user.targetAchievement >= 75 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                'bg-gradient-to-r from-amber-500 to-amber-600'
                              }`}
                              style={{ width: `${Math.min(user.targetAchievement, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                          <span className="text-sm text-gray-700">{user.responseTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(user.status)} font-medium text-xs px-3 py-1 rounded-lg`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Eye className="w-4 h-4 mr-1" strokeWidth={1.5} />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Pledges Tab */}
        <TabsContent value="pledges" className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">User</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Department</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Target</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-center">Pledges Created</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-center">Status Breakdown</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Total Value</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Collected</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Pending</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-center">Achievement</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-center">Collection Rate</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs uppercase tracking-wider text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPledgeData.map((user) => (
                    <TableRow key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-300 text-gray-700">
                          {user.department}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-gray-900">
                          AED {(user.pledgeTarget / 1000000).toFixed(1)}M
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-gray-900">{user.pledgesCreated}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 justify-center">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs text-gray-600">{user.pledgesCompleted}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-gray-600">{user.pledgesActive}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                            <span className="text-xs text-gray-600">{user.pledgesCancelled}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-gray-900">
                          AED {(user.totalPledgeValue / 1000000).toFixed(2)}M
                        </div>
                        <div className="text-xs text-gray-500">
                          Avg: {(user.avgPledgeSize / 1000).toFixed(0)}K
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-emerald-600">
                          AED {(user.totalCollected / 1000000).toFixed(2)}M
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-amber-600">
                          AED {(user.totalPending / 1000000).toFixed(2)}M
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`font-bold ${getAchievementColor(user.achievementRate)}`}>
                            {user.achievementRate}%
                          </span>
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                user.achievementRate >= 90 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                                user.achievementRate >= 75 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                'bg-gradient-to-r from-amber-500 to-amber-600'
                              }`}
                              style={{ width: `${Math.min(user.achievementRate, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-semibold text-gray-900">{user.collectionRate}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1.5 rounded-full" 
                              style={{ width: `${user.collectionRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Eye className="w-4 h-4 mr-1" strokeWidth={1.5} />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue Trend */}
            <Card className="rounded-2xl border-gray-200/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Monthly Revenue Trend</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Actual revenue vs pledges collected</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrendData}>
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
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 5 }} name="Revenue (K)" />
                    <Line type="monotone" dataKey="pledges" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} name="Pledges (K)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="rounded-2xl border-gray-200/60 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Top Performers This Month</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Based on target achievement</p>
                  </div>
                  <Award className="w-5 h-5 text-amber-500" strokeWidth={1.5} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userKPIData
                    .sort((a, b) => b.targetAchievement - a.targetAchievement)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border border-gray-100">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white' :
                          index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                          index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <Avatar className="h-12 w-12 ring-2 ring-gray-200">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.department}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${getAchievementColor(user.targetAchievement)}`}>
                            {user.targetAchievement}%
                          </div>
                          <div className="text-xs text-gray-500">{user.dealsWon} deals</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}