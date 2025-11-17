import { useState } from 'react';
import { Mail, Send, User, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface LogEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogEmailModal({ isOpen, onClose }: LogEmailModalProps) {
  const [formData, setFormData] = useState({
    lead: '',
    subject: '',
    recipient: '',
    sender: '',
    body: '',
    status: 'Sent',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.lead || !formData.subject || !formData.recipient) {
      toast.error('Missing Required Fields', {
        description: 'Please fill in all required fields'
      });
      return;
    }

    // Here you would typically save to your state/backend
    toast.success('Email Logged Successfully', {
      description: `Email to ${formData.recipient} has been logged`
    });

    // Reset form
    setFormData({
      lead: '',
      subject: '',
      recipient: '',
      sender: '',
      body: '',
      status: 'Sent',
    });

    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
            </div>
            Log Email Communication
          </DialogTitle>
          <DialogDescription>
            Record email communications with leads and clients
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Lead Selection */}
          <div className="space-y-2">
            <Label htmlFor="lead">
              Lead/Client <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.lead}
              onValueChange={(value) => handleChange('lead', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select lead or client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mohammed">Mohammed Al-Rashid</SelectItem>
                <SelectItem value="fatima">Fatima Hassan</SelectItem>
                <SelectItem value="ahmed">Ahmed Abdullah</SelectItem>
                <SelectItem value="layla">Layla Ibrahim</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="john">John Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Email Subject <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="e.g., Property Brochures - Dubai Marina"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recipient */}
            <div className="space-y-2">
              <Label htmlFor="recipient">
                Recipient Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="recipient"
                type="email"
                value={formData.recipient}
                onChange={(e) => handleChange('recipient', e.target.value)}
                placeholder="recipient@example.com"
                required
              />
            </div>

            {/* Sender */}
            <div className="space-y-2">
              <Label htmlFor="sender">Sent By</Label>
              <Select
                value={formData.sender}
                onValueChange={(value) => handleChange('sender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Michael Chen</SelectItem>
                  <SelectItem value="emma">Emma Williams</SelectItem>
                  <SelectItem value="james">James Brown</SelectItem>
                  <SelectItem value="raj">Raj Patel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Email Body */}
          <div className="space-y-2">
            <Label htmlFor="body">Email Content</Label>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) => handleChange('body', e.target.value)}
              placeholder="Enter the email message content..."
              rows={8}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Email Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Opened">Opened</SelectItem>
                <SelectItem value="Replied">Replied</SelectItem>
                <SelectItem value="Bounced">Bounced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">
                  Email Tracking Tip
                </p>
                <p className="text-xs text-blue-700">
                  This log helps track all email communications. For automated email sending and tracking, 
                  connect your email provider in Settings.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Log Email
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
