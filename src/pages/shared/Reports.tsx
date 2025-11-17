import { BarChart3, Download, TrendingUp } from 'lucide-react';
import type { BrandType } from '../../App';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface ReportsProps {
  brand: BrandType;
  onNavigate: (page: string) => void;
}

const monthlyData = [
  { month: 'Jan', value: 45 },
  { month: 'Feb', value: 52 },
  { month: 'Mar', value: 48 },
  { month: 'Apr', value: 61 },
  { month: 'May', value: 58 },
  { month: 'Jun', value: 70 },
];

const sourceData = [
  { name: 'Website', value: 45, color: '#3b82f6' },
  { name: 'Referrals', value: 30, color: '#10b981' },
  { name: 'Social Media', value: 15, color: '#f59e0b' },
  { name: 'Walk-in', value: 10, color: '#8b5cf6' },
];

export function Reports({ brand, onNavigate }: ReportsProps) {
  const brandColor = brand === 'real-estate' ? 'blue' : 'green';

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Reports & Analytics"
        description={`Comprehensive ${brand === 'real-estate' ? 'real estate' : 'business setup'} insights and metrics`}
        actions={
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
            <div className="text-2xl mb-1">18.5%</div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +2.3% vs last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Avg Response Time</div>
            <div className="text-2xl mb-1">2.5h</div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              -0.5h improvement
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Deals Closed</div>
            <div className="text-2xl mb-1">23</div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +15% vs last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Revenue</div>
            <div className="text-2xl mb-1">{brand === 'real-estate' ? 'AED 10.2M' : 'AED 450K'}</div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% growth
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{brand === 'real-estate' ? 'Leads' : 'Cases'} by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={brandColor === 'blue' ? '#3b82f6' : '#10b981'} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {sourceData.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                      <span className="text-sm text-gray-700">{source.name}</span>
                    </div>
                    <span className="text-sm">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Agent</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Leads</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Converted</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Conversion Rate</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Sarah Johnson', leads: 45, converted: 12, rate: '26.7%', revenue: brand === 'real-estate' ? 'AED 3.2M' : 'AED 125K' },
                  { name: 'Michael Chen', leads: 38, converted: 10, rate: '26.3%', revenue: brand === 'real-estate' ? 'AED 2.8M' : 'AED 110K' },
                  { name: 'Emma Williams', leads: 42, converted: 9, rate: '21.4%', revenue: brand === 'real-estate' ? 'AED 2.5M' : 'AED 98K' },
                  { name: 'James Brown', leads: 35, converted: 8, rate: '22.9%', revenue: brand === 'real-estate' ? 'AED 2.1M' : 'AED 85K' },
                ].map((agent, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm">{agent.name}</td>
                    <td className="py-3 px-4 text-sm">{agent.leads}</td>
                    <td className="py-3 px-4 text-sm">{agent.converted}</td>
                    <td className="py-3 px-4 text-sm">{agent.rate}</td>
                    <td className="py-3 px-4 text-sm">{agent.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
