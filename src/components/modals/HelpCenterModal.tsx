import { useState } from 'react';
import { X, HelpCircle, MessageCircle, BookOpen, Video, Mail, Phone, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      { q: 'How do I add a new lead?', a: 'Click the "Add Lead" button on the Leads page, fill in the required information, and click Save.' },
      { q: 'How do I assign a lead to a team member?', a: 'Open the lead details, click "Edit", select the team member from the dropdown, and save changes.' },
      { q: 'How do I create a new property listing?', a: 'Navigate to Properties page, click "Add Property", enter property details including images, and save.' },
    ]
  },
  {
    category: 'Lead Management',
    questions: [
      { q: 'How do I change a lead status?', a: 'Open the lead details page and click the status badge to change between Hot, Warm, and Cold.' },
      { q: 'How do I log a call with a lead?', a: 'In the lead details, click "Log Call" button, enter call details, and save the record.' },
      { q: 'How do I schedule a follow-up?', a: 'Click "Add Follow-up" in the lead details, set the date and time, and add notes.' },
    ]
  },
  {
    category: 'Pipeline & Deals',
    questions: [
      { q: 'How do I move a deal to the next stage?', a: 'Drag and drop the deal card to the desired column in the pipeline view.' },
      { q: 'How do I mark a deal as won?', a: 'Drag the deal to the "Won" column or edit the deal and change status to Won.' },
      { q: 'How do I filter deals by value?', a: 'Use the filter button at the top of the pipeline and set your value range.' },
    ]
  },
  {
    category: 'Business Setup',
    questions: [
      { q: 'How do I assign a PRO officer to a case?', a: 'Open the case in PRO Operations and click "Assign PRO Officer" to select from available officers.' },
      { q: 'How do I update case status?', a: 'Click "Update Status" on the case card and select the new status from the dropdown.' },
      { q: 'How do I track document checklist?', a: 'Navigate to Documents page to see all required documents and their status.' },
    ]
  },
];

const resources = [
  { title: 'Getting Started Guide', type: 'Video', duration: '12 min', icon: Video },
  { title: 'Lead Management Best Practices', type: 'Article', duration: '5 min read', icon: BookOpen },
  { title: 'Pipeline Management Tutorial', type: 'Video', duration: '8 min', icon: Video },
  { title: 'User Management Guide', type: 'Article', duration: '3 min read', icon: BookOpen },
  { title: 'Reports & Analytics Walkthrough', type: 'Video', duration: '10 min', icon: Video },
  { title: 'Mobile App Setup', type: 'Article', duration: '4 min read', icon: BookOpen },
];

export function HelpCenterModal({ isOpen, onClose }: HelpCenterModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      searchQuery === '' ||
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
              </div>
              <div>
                <DialogTitle className="text-xl">Help Center</DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Get help and learn how to use the CRM</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="faq" className="flex-1">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
            </TabsList>

            {/* Search Bar */}
            <div className="relative mb-4">
              <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="pl-10"
              />
            </div>
          </div>

          <ScrollArea className="h-[500px]">
            {/* FAQs Tab */}
            <TabsContent value="faq" className="px-6 pb-6 mt-0">
              {searchQuery && filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-gray-500 text-sm">No FAQs found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredFAQs.map((category) => (
                    <div key={category.category}>
                      <h3 className="font-semibold text-gray-900 mb-3">{category.category}</h3>
                      <div className="space-y-2">
                        {category.questions.map((faq, index) => {
                          const key = `${category.category}-${index}`;
                          const isExpanded = expandedFAQ === key;
                          return (
                            <div
                              key={key}
                              className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                              <button
                                onClick={() => setExpandedFAQ(isExpanded ? null : key)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                              >
                                <span className="font-medium text-gray-900">{faq.q}</span>
                                <HelpCircle className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                              </button>
                              {isExpanded && (
                                <div className="px-4 pb-4 pt-0 text-gray-600 text-sm border-t border-gray-100 bg-gray-50">
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="px-6 pb-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${resource.type === 'Video' ? 'bg-purple-100' : 'bg-green-100'} flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${resource.type === 'Video' ? 'text-purple-600' : 'text-green-600'}`} strokeWidth={1.5} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-sm">{resource.title}</CardTitle>
                            <CardDescription className="text-xs mt-1">{resource.duration}</CardDescription>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>

              <Card className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <BookOpen className="w-5 h-5" strokeWidth={1.5} />
                    Full Documentation
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Access our complete documentation for in-depth guides and tutorials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Visit Documentation
                    <ExternalLink className="w-4 h-4 ml-2" strokeWidth={1.5} />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Support Tab */}
            <TabsContent value="contact" className="px-6 pb-6 mt-0">
              <div className="space-y-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-blue-200">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">Live Chat</CardTitle>
                        <CardDescription>Chat with our support team in real-time</CardDescription>
                        <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">Online Now</Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-blue-200">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">Email Support</CardTitle>
                        <CardDescription>support@dualcrm.com</CardDescription>
                        <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-blue-200">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">Phone Support</CardTitle>
                        <CardDescription>+971 4 123 4567</CardDescription>
                        <p className="text-xs text-gray-500 mt-2">Available 9 AM - 6 PM GST</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-base">Business Hours</CardTitle>
                    <CardDescription>
                      <div className="space-y-1 mt-2 text-sm">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
