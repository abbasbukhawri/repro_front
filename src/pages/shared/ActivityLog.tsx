import { Activity, Filter } from 'lucide-react';
import type { BrandType } from '../../App';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';

interface ActivityLogProps {
  brand: BrandType;
  onNavigate: (page: string) => void;
}

const allActivities = [
  { id: 1, action: 'Lead created', user: 'Sarah Johnson', details: 'Mohammed Al-Rashid added to CRM', timestamp: '2025-11-16 2:30 PM', type: 'create' },
  { id: 2, action: 'Status changed', user: 'Michael Chen', details: 'Lead status changed from "New" to "Qualified"', timestamp: '2025-11-16 11:00 AM', type: 'update' },
  { id: 3, action: 'Viewing scheduled', user: 'Emma Williams', details: 'Property viewing scheduled for Ahmed Abdullah', timestamp: '2025-11-15 4:45 PM', type: 'schedule' },
  { id: 4, action: 'Document uploaded', user: 'James Brown', details: 'Passport copy uploaded for Layla Ibrahim', timestamp: '2025-11-15 10:30 AM', type: 'upload' },
  { id: 5, action: 'Call logged', user: 'Sarah Johnson', details: '8-minute call with Mohammed Al-Rashid', timestamp: '2025-11-14 3:15 PM', type: 'call' },
  { id: 6, action: 'Email sent', user: 'Michael Chen', details: 'Property brochures sent to Fatima Hassan', timestamp: '2025-11-14 1:20 PM', type: 'email' },
  { id: 7, action: 'Deal moved', user: 'Emma Williams', details: 'Deal moved to "Negotiation" stage', timestamp: '2025-11-13 5:00 PM', type: 'update' },
  { id: 8, action: 'Task created', user: 'James Brown', details: 'Follow-up task created for David Chen', timestamp: '2025-11-13 2:45 PM', type: 'create' },
];

export function ActivityLog({ brand, onNavigate }: ActivityLogProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['create', 'update', 'schedule', 'upload', 'call', 'email']);
  
  const activityTypes = [
    { value: 'create', label: 'Create' },
    { value: 'update', label: 'Update' },
    { value: 'schedule', label: 'Schedule' },
    { value: 'upload', label: 'Upload' },
    { value: 'call', label: 'Call' },
    { value: 'email', label: 'Email' },
  ];

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredActivities = allActivities.filter(activity =>
    selectedTypes.includes(activity.type)
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1200px] mx-auto">
      <PageHeader
        title="Activity Log"
        description="Audit trail of all system activities"
        actions={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                {selectedTypes.length < activityTypes.length && (
                  <Badge variant="secondary" className="ml-2">{selectedTypes.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Activity Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {activityTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type.value}
                  checked={selectedTypes.includes(type.value)}
                  onCheckedChange={() => toggleType(type.value)}
                >
                  {type.label}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedTypes.length === activityTypes.length}
                onCheckedChange={() => {
                  if (selectedTypes.length === activityTypes.length) {
                    setSelectedTypes([]);
                  } else {
                    setSelectedTypes(activityTypes.map(t => t.value));
                  }
                }}
              >
                <span className="font-semibold">Select All</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      {filteredActivities.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No activities match your filter</p>
            <p className="text-gray-400 text-xs mt-1">Try selecting different activity types</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredActivities.map((activity) => (
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
      )}
    </div>
  );
}