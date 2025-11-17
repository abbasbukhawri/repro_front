import { ArrowLeft, Edit, Share2, Heart, MapPin, Bed, Bath, Ruler, Car, Calendar, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { EditPropertyModal } from '../../components/modals/EditPropertyModal';
import { useState } from 'react';
import { toast } from 'sonner';

interface PropertyDetailsProps {
  propertyId: string | null;
  onNavigate: (page: string) => void;
}

export function PropertyDetails({ propertyId, onNavigate }: PropertyDetailsProps) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  const handleEditProperty = (data: any) => {
    console.log('Update property:', data);
    toast.success('Property updated successfully!');
    setEditModalOpen(false);
  };

  const handleContactAgent = () => {
    setActiveTab('contact');
    toast.success('Switched to Agent Contact tab');
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        breadcrumbs={[
          { label: 'Properties', onClick: () => onNavigate('re-properties') },
          { label: 'Property Details' },
        ]}
        title="Luxury Villa with Pool"
        description={`Property ID: ${propertyId || 'PROP-2024-001'}`}
        actions={
          <>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditModalOpen(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Property
            </Button>
          </>
        }
      />

      {/* Image Gallery */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-3 h-96 bg-gray-200 rounded-lg overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop"
            alt="Main property image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <div className="h-[184px] bg-gray-200 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop"
              alt="Property image 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[184px] bg-gray-200 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop"
              alt="Property image 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl text-blue-600 mb-2">AED 3.2M</div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    Dubai Hills Estate, Dubai
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-blue-100 text-blue-700">For Sale</Badge>
                  <Badge className="bg-green-100 text-green-700">Villa</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Bed className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                    <div className="text-lg">5</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bath className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                    <div className="text-lg">6</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ruler className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Area</div>
                    <div className="text-lg">4,500 sqft</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Parking</div>
                    <div className="text-lg">2 Spaces</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Stunning luxury villa located in the prestigious Dubai Hills Estate. This magnificent property features modern architecture, high-end finishes, and a private pool with landscaped garden. The villa offers spacious living areas with floor-to-ceiling windows, a gourmet kitchen, and luxurious bedrooms with en-suite bathrooms. Perfect for families seeking an upscale lifestyle in one of Dubai's most sought-after communities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="linked-leads">Linked Leads</TabsTrigger>
              <TabsTrigger value="viewings">Viewing Log</TabsTrigger>
              <TabsTrigger value="contact">Agent Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="mb-3">Amenities</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Private Swimming Pool</li>
                        <li>• Landscaped Garden</li>
                        <li>• Maid's Room</li>
                        <li>• Built-in Wardrobes</li>
                        <li>• Central A/C & Heating</li>
                        <li>• Private Gym</li>
                        <li>• Study Room</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3">Community Features</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Golf Course View</li>
                        <li>• Parks & Recreation</li>
                        <li>• Shopping Mall Nearby</li>
                        <li>• Schools in Community</li>
                        <li>• 24/7 Security</li>
                        <li>• Kids Play Area</li>
                        <li>• Jogging Tracks</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="linked-leads">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Mohammed Al-Rashid', status: 'Interested', date: '2 days ago' },
                      { name: 'Fatima Hassan', status: 'Viewing Scheduled', date: '5 days ago' },
                      { name: 'Ahmed Abdullah', status: 'Negotiation', date: '1 week ago' },
                    ].map((lead, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                            <AvatarFallback>{lead.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm">{lead.name}</div>
                            <div className="text-xs text-gray-500">{lead.date}</div>
                          </div>
                        </div>
                        <Badge variant="secondary">{lead.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="viewings">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {[
                      { lead: 'Mohammed Al-Rashid', agent: 'Sarah Johnson', date: '2025-11-18', time: '2:00 PM', status: 'Scheduled' },
                      { lead: 'Fatima Hassan', agent: 'Michael Chen', date: '2025-11-15', time: '3:30 PM', status: 'Completed' },
                      { lead: 'Ahmed Abdullah', agent: 'Emma Williams', date: '2025-11-12', time: '11:00 AM', status: 'No-show' },
                    ].map((viewing, i) => (
                      <div key={i} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm">{viewing.lead}</div>
                          <Badge variant={
                            viewing.status === 'Scheduled' ? 'default' :
                            viewing.status === 'Completed' ? 'secondary' :
                            'destructive'
                          }>
                            {viewing.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {viewing.date} at {viewing.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {viewing.agent}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg">Sarah Johnson</h3>
                      <p className="text-sm text-gray-500">Senior Real Estate Agent</p>
                      <Badge className="mt-2 bg-blue-100 text-blue-700">Verified Agent</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm mb-3">Contact Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Phone className="w-5 h-5 text-blue-600" />
                          <div className="flex-1">
                            <div className="text-xs text-gray-500">Phone</div>
                            <div className="text-sm">+971 50 123 4567</div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => toast.success('Calling agent...')}>
                            Call
                          </Button>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div className="flex-1">
                            <div className="text-xs text-gray-500">Email</div>
                            <div className="text-sm">sarah.johnson@reproaleaders.com</div>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => toast.success('Opening email client...')}>
                            Email
                          </Button>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                          <div className="flex-1">
                            <div className="text-xs text-gray-500">WhatsApp</div>
                            <div className="text-sm">+971 50 123 4567</div>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => toast.success('Opening WhatsApp...')}>
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm mb-3">Agent Statistics</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg text-center">
                          <div className="text-2xl text-blue-600">47</div>
                          <div className="text-xs text-gray-600">Properties Sold</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-center">
                          <div className="text-2xl text-green-600">12</div>
                          <div className="text-xs text-gray-600">Active Listings</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg text-center">
                          <div className="text-2xl text-purple-600">5+</div>
                          <div className="text-xs text-gray-600">Years Experience</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm mb-3">About</h4>
                      <p className="text-sm text-gray-600">
                        Sarah Johnson is a senior real estate agent specializing in luxury properties in Dubai. With over 5 years of experience, she has helped numerous clients find their dream homes in premium locations across the emirate.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm">Sarah Johnson</div>
                  <div className="text-xs text-gray-500">Senior Agent</div>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleContactAgent}>Contact Agent</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Listed Date</span>
                <span>Nov 1, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property Type</span>
                <span>Villa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion</span>
                <span>Ready</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Furnishing</span>
                <span>Unfurnished</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference</span>
                <span className="text-blue-600">PROP-001</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Property Modal */}
      <EditPropertyModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditProperty}
      />
    </div>
  );
}