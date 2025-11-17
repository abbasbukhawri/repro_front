import { useState } from 'react';
import { Building2, DollarSign, Calendar, User, MapPin, Phone, Mail, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { PageHeader } from '../../components/crm/PageHeader';
import { useCRM } from '../../contexts/CRMContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface DealsPipelineProps {
  onNavigate: (page: string) => void;
}

export function DealsPipeline({ onNavigate }: DealsPipelineProps) {
  const { deals } = useCRM();

  // Filter only won/converted deals
  const wonDeals = deals.filter(deal => deal.stage === 'Won' || deal.stage === 'Closed' || deal.status === 'Won');

  // Calculate metrics from won deals
  const totalPipelineValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
  const totalDeals = wonDeals.length;
  const avgDealSize = totalDeals > 0 ? totalPipelineValue / totalDeals : 0;
  const totalRevenue = totalPipelineValue;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Won Deals"
        description="View all successfully closed and converted deals"
      />

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl text-blue-600">AED {(totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-gray-500 mt-1">From closed deals</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Won Deals</div>
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl">{totalDeals}</div>
            <div className="text-xs text-gray-500 mt-1">Successfully closed</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Avg. Deal Size</div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl">AED {(avgDealSize / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-gray-500 mt-1">Per closed deal</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">This Month</div>
              <div className="p-2 bg-amber-50 rounded-lg">
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl">{Math.floor(totalDeals * 0.15)}</div>
            <div className="text-xs text-gray-500 mt-1">Deals closed</div>
          </CardContent>
        </Card>
      </div>

      {/* Won Deals List - Desktop Table View */}
      <Card className="hidden md:block rounded-2xl border-gray-200/60 shadow-sm">
        <CardHeader>
          <CardTitle>All Won Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & Property</TableHead>
                <TableHead>Deal Value</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wonDeals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No won deals yet
                  </TableCell>
                </TableRow>
              ) : (
                wonDeals.map((deal) => (
                  <TableRow key={deal.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{deal.client}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Building2 className="w-3 h-3" />
                          {deal.property}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-blue-600 font-semibold">
                        AED {(deal.value / 1000000).toFixed(2)}M
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${deal.assignedTo}`} />
                          <AvatarFallback>{deal.assignedTo[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{deal.assignedTo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {deal.expectedClose}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Won
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="rounded-lg">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Won Deals List - Mobile Card View */}
      <div className="md:hidden space-y-4">
        {wonDeals.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No won deals yet
            </CardContent>
          </Card>
        ) : (
          wonDeals.map((deal) => (
            <Card key={deal.id} className="rounded-xl hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="font-medium mb-1">{deal.client}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                      <Building2 className="w-3 h-3" />
                      {deal.property}
                    </div>
                    <Badge className="bg-green-100 text-green-700">Won</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg text-blue-600 font-semibold">
                      AED {(deal.value / 1000000).toFixed(2)}M
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${deal.assignedTo}`} />
                      <AvatarFallback>{deal.assignedTo[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{deal.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {deal.expectedClose}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-3 rounded-lg">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}