import { Plus, Mail, Send } from 'lucide-react';
import type { BrandType } from '../../App';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useState } from 'react';
import { LogEmailModal } from '../../components/modals/LogEmailModal';

interface EmailLogsProps {
  brand: BrandType;
  onNavigate: (page: string) => void;
}

const emails = [
  { id: 1, subject: 'Property Brochures - Dubai Hills', lead: 'Mohammed Al-Rashid', agent: 'Sarah Johnson', date: '2025-11-16 3:00 PM', status: 'Sent' },
  { id: 2, subject: 'Viewing Confirmation', lead: 'Fatima Hassan', agent: 'Michael Chen', date: '2025-11-16 10:30 AM', status: 'Sent' },
  { id: 3, subject: 'Follow-up: Property Options', lead: 'Ahmed Abdullah', agent: 'Emma Williams', date: '2025-11-15 2:15 PM', status: 'Opened' },
  { id: 4, subject: 'Contract Documents', lead: 'Layla Ibrahim', agent: 'James Brown', date: '2025-11-15 9:00 AM', status: 'Sent' },
];

export function EmailLogs({ brand, onNavigate }: EmailLogsProps) {
  const brandColor = brand === 'real-estate' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Email Logs"
        description="Track all email communications"
        actions={
          <Button className={brandColor} onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Log Email
          </Button>
        }
      />

      <div className="space-y-3">
        {emails.map((email) => (
          <Card key={email.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-sm mb-1">{email.subject}</div>
                      <div className="text-xs text-gray-600">
                        To: {email.lead} • From: {email.agent}
                      </div>
                    </div>
                    <Badge variant={email.status === 'Opened' ? 'default' : 'secondary'}>
                      {email.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">{email.date}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <LogEmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}