import { useState, useEffect } from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, X, Save, Play, Pause, Download, FileText, MapPin, Building2, User, MessageSquare, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';

interface CallDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (callId: number, data: any) => void;
  callData: any;
  availableProperties?: any[];
}

export function CallDetailModal({ 
  isOpen, 
  onClose, 
  onUpdate, 
  callData,
  availableProperties = []
}: CallDetailModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    clientRequest: '',
    propertyInterest: '',
    location: '',
    budget: '',
    notes: '',
    nextAction: '',
    tags: [] as string[],
  });

  useEffect(() => {
    if (callData) {
      setFormData({
        clientRequest: callData.clientRequest || '',
        propertyInterest: callData.propertyInterest || '',
        location: callData.location || '',
        budget: callData.budget || '',
        notes: callData.notes || '',
        nextAction: callData.nextAction || '',
        tags: callData.tags || [],
      });
      setIsEditing(false);
    }
  }, [callData, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Only submit changed fields
    const changedFields: any = {};
    Object.keys(formData).forEach(key => {
      if (JSON.stringify(formData[key as keyof typeof formData]) !== JSON.stringify(callData?.[key])) {
        changedFields[key] = formData[key as keyof typeof formData];
      }
    });

    if (Object.keys(changedFields).length > 0) {
      onUpdate(callData.id, changedFields);
      toast.success('Call details updated successfully!');
    }
    setIsEditing(false);
  };

  const getCallTypeIcon = () => {
    switch (callData?.type?.toLowerCase()) {
      case 'outbound':
      case 'outgoing':
        return <PhoneOutgoing className="w-5 h-5 text-blue-600" />;
      case 'inbound':
      case 'incoming':
        return <PhoneIncoming className="w-5 h-5 text-green-600" />;
      case 'missed':
        return <PhoneMissed className="w-5 h-5 text-red-600" />;
      default:
        return <Phone className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCallTypeBadgeColor = () => {
    switch (callData?.type?.toLowerCase()) {
      case 'outbound':
      case 'outgoing':
        return 'bg-blue-100 text-blue-700';
      case 'inbound':
      case 'incoming':
        return 'bg-green-100 text-green-700';
      case 'missed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Mock Twilio audio URL (in real app, this would come from Twilio)
  const recordingUrl = callData?.recordingUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  
  // Mock transcript (in real app, this would come from Twilio transcription service)
  const transcript = callData?.transcript || `Agent: Hello, this is ${callData?.agent || 'Agent'} from ${callData?.brand === 'real-estate' ? 'ReproLeaders' : 'Probiz Corporate'}. How may I help you today?

Client: Hi, I'm interested in looking at properties in Dubai Marina area.

Agent: Excellent! What type of property are you looking for?

Client: I'm looking for a 2-bedroom apartment, preferably with sea view.

Agent: Perfect! What's your budget range?

Client: Around 2.5 to 3 million AED.

Agent: Great! I have several options that match your criteria. Would you like to schedule a viewing?

Client: Yes, that would be great. I'm available this weekend.

Agent: Wonderful! Let me schedule that for you. I'll send you the details via email.`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                callData?.type?.toLowerCase() === 'outbound' || callData?.type?.toLowerCase() === 'outgoing' ? 'bg-blue-50' :
                callData?.type?.toLowerCase() === 'inbound' || callData?.type?.toLowerCase() === 'incoming' ? 'bg-green-50' :
                'bg-red-50'
              }`}>
                {getCallTypeIcon()}
              </div>
              <div>
                <DialogTitle>Call Details</DialogTitle>
                <DialogDescription>
                  {callData?.lead || 'Unknown Caller'} • {callData?.date}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getCallTypeBadgeColor()}>
                {callData?.type || 'Unknown'}
              </Badge>
              <Badge variant="secondary">
                {callData?.outcome || 'Completed'}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="recording" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recording">Recording & Transcript</TabsTrigger>
            <TabsTrigger value="details">Call Details</TabsTrigger>
            <TabsTrigger value="info">Call Info</TabsTrigger>
          </TabsList>

          {/* Recording & Transcript Tab */}
          <TabsContent value="recording" className="space-y-4 mt-4">
            {/* Audio Player */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Play className="w-4 h-4" />
                  Call Recording
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <audio 
                    controls 
                    className="w-full"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={recordingUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Duration: {callData?.duration || '0:00'}
                      </span>
                      <span>Quality: HD</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast.success('Recording download started');
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <strong>Note:</strong> This is a mock Twilio recording. In production, the actual call recording from Twilio will be displayed here.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="w-4 h-4" />
                  Call Transcript
                  <Badge variant="secondary" className="ml-auto">Auto-generated by Twilio</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap font-sans">{transcript}</pre>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(transcript);
                      toast.success('Transcript copied to clipboard');
                    }}
                  >
                    Copy Transcript
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.success('Transcript exported')}
                  >
                    Export as PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Call Details Tab */}
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Additional Call Information</h3>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Details
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setIsEditing(false);
                    // Reset form
                    setFormData({
                      clientRequest: callData.clientRequest || '',
                      propertyInterest: callData.propertyInterest || '',
                      location: callData.location || '',
                      budget: callData.budget || '',
                      notes: callData.notes || '',
                      nextAction: callData.nextAction || '',
                      tags: callData.tags || [],
                    });
                  }}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-request" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  What Client Asked For
                </Label>
                {isEditing ? (
                  <Textarea
                    id="client-request"
                    value={formData.clientRequest}
                    onChange={(e) => handleChange('clientRequest', e.target.value)}
                    placeholder="e.g., Looking for 2-bedroom apartment with sea view"
                    rows={3}
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-sm min-h-[76px]">
                    {formData.clientRequest || 'No information provided'}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="property-interest" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Property Interest
                </Label>
                {isEditing ? (
                  availableProperties.length > 0 ? (
                    <Select 
                      value={formData.propertyInterest} 
                      onValueChange={(value: any) => handleChange('propertyInterest', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProperties.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.title || property.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="property-interest"
                      value={formData.propertyInterest}
                      onChange={(e) => handleChange('propertyInterest', e.target.value)}
                      placeholder="e.g., Villa 123 Dubai Hills"
                    />
                  )
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    {formData.propertyInterest || 'No property specified'}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Preferred Location
                </Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g., Dubai Marina, Downtown"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    {formData.location || 'Not specified'}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Budget Range
                </Label>
                {isEditing ? (
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    placeholder="e.g., 2.5M - 3M AED"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    {formData.budget || 'Not specified'}
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Additional Notes</Label>
                {isEditing ? (
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Add any additional notes about the call..."
                    rows={4}
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-sm min-h-[100px]">
                    {formData.notes || 'No additional notes'}
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="next-action">Next Action / Follow-up</Label>
                {isEditing ? (
                  <Input
                    id="next-action"
                    value={formData.nextAction}
                    onChange={(e) => handleChange('nextAction', e.target.value)}
                    placeholder="e.g., Schedule viewing for this weekend"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    {formData.nextAction || 'No follow-up action specified'}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Call Info Tab */}
          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Call Type</span>
                      <Badge className={getCallTypeBadgeColor()}>
                        {callData?.type || 'Unknown'}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Duration</span>
                      <span className="text-sm">{callData?.duration || '0:00'}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Outcome</span>
                      <Badge variant="secondary">{callData?.outcome || 'Unknown'}</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Date & Time</span>
                      <span className="text-sm">{callData?.date || 'Unknown'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Lead Name</span>
                      <span className="text-sm">{callData?.lead || 'Unknown'}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Agent</span>
                      <span className="text-sm">{callData?.agent || 'Unknown'}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Phone Number</span>
                      <span className="text-sm">{callData?.phone || '+971 XX XXX XXXX'}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Recording ID</span>
                      <span className="text-xs font-mono text-gray-500">{callData?.recordingId || 'RE123456789'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Twilio Call Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Call SID:</span>
                      <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                        {callData?.callSid || 'CA1234567890abcdef1234567890abcdef'}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">From Number:</span>
                      <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                        {callData?.fromNumber || '+971501234567'}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">To Number:</span>
                      <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                        {callData?.toNumber || '+971507654321'}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Call Status:</span>
                      <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                        {callData?.callStatus || 'completed'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
