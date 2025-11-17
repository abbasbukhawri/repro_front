import { Bell, Check, X } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useState } from 'react';

interface NotificationsCenterProps {
  onNavigate: (page: string) => void;
}

const initialNotifications = [
  { id: 1, type: 'task', title: 'Task overdue', message: 'Follow up with Mohammed Al-Rashid is overdue', time: '5 min ago', read: false },
  { id: 2, type: 'lead', title: 'New lead assigned', message: 'You have been assigned a new lead: Fatima Hassan', time: '1 hour ago', read: false },
  { id: 3, type: 'viewing', title: 'Viewing reminder', message: 'Property viewing scheduled for 2:00 PM today', time: '2 hours ago', read: false },
  { id: 4, type: 'deal', title: 'Deal closed', message: 'Congratulations! Deal with Ahmed Abdullah closed', time: '1 day ago', read: true },
  { id: 5, type: 'document', title: 'Document uploaded', message: 'New document uploaded by client', time: '2 days ago', read: true },
];

export function NotificationsCenter({ onNavigate }: NotificationsCenterProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1000px] mx-auto">
      <PageHeader
        title="Notifications"
        description="Stay updated with your latest activities"
        actions={
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        }
      />

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className={notification.read ? 'opacity-60' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-sm">{notification.title}</div>
                    {!notification.read && <Badge className="bg-blue-600">New</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <div className="text-xs text-gray-500">{notification.time}</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeNotification(notification.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}