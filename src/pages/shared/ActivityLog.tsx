import { Activity, Filter } from 'lucide-react';
import type { BrandType } from '../../App';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface ActivityLogProps {
  brand: BrandType;
  onNavigate: (page: string) => void;
}

const activities = [
  { id: 1, action: 'Lead created', user: 'Sarah Johnson', details: 'Mohammed Al-Rashid added to CRM', timestamp: '2025-11-16 2:30 PM', type: 'create' },
  { id: 2, action: 'Status changed', user: 'Michael Chen', details: 'Lead status changed from "New" to "Qualified"', timestamp: '2025-11-16 11:00 AM', type: 'update' },
  { id: 3, action: 'Viewing scheduled', user: 'Emma Williams', details: 'Property viewing scheduled for Ahmed Abdullah', timestamp: '2025-11-15 4:45 PM', type: 'schedule' },
  { id: 4, action: 'Document uploaded', user: 'James Brown', details: 'Passport copy uploaded for Layla Ibrahim', timestamp: '2025-11-15 10:30 AM', type: 'upload' },
  { id: 5, action: 'Call logged', user: 'Sarah Johnson', details: '8-minute call with Mohammed Al-Rashid', timestamp: '2025-11-14 3:15 PM', type: 'call' },
];

export function ActivityLog({ brand, onNavigate }: ActivityLogProps) {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader
        title="Activity Log"
        description="Audit trail of all system activities"
        actions={
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        }
      />

      <div className="space-y-3">
        {activities.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Activity className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-sm">{activity.action}</div>
                    <Badge variant="secondary">{activity.type}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{activity.details}</div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>By {activity.user}</span>
                    <span>•</span>
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
