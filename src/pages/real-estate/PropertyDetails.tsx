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
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        breadcrumbs={[
          { label: 'Properties', onClick: () => onNavigate('re-properties') },
          { label: 'Property Details' },
        ]}
        title="Luxury Villa with Pool"
        description={`Property ID: ${propertyId || 'PROP-2024-001'}`}
        actions={
          <>
            <Button variant="outline" className="rounded-xl">
              <Share2 className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Share</span>
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Heart className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Save</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl" onClick={() => setEditModalOpen(true)}>
              <Edit className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Edit Property</span>
            </Button>
          </>
        }
      />

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="md:col-span-3 h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop"
            alt="Main property image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
          <div className="h-32 md:h-[184px] bg-gray-200 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop"
              alt="Property image 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-32 md:h-[184px] bg-gray-200 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop"
              alt="Property image 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Overview */}
          <Card className="rounded-xl md:rounded-2xl">
            <CardHeader className="pb-3 md:pb-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">AED 3.2M</div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span>Dubai Hills Estate, Dubai</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-blue-100 text-blue-700">For Sale</Badge>
                  <Badge className="bg-green-100 text-green-700">Villa</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <Bed className="w-6 h-6 md:w-8 md:h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs md:text-sm text-gray-600">Bedrooms</div>
                    <div className="text-base md:text-lg font-semibold">5</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Bath className="w-6 h-6 md:w-8 md:h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs md:text-sm text-gray-600">Bathrooms</div>
                    <div className="text-base md:text-lg font-semibold">6</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Ruler className="w-6 h-6 md:w-8 md:h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs md:text-sm text-gray-600">Area</div>
                    <div className="text-base md:text-lg font-semibold">4,500 sqft</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Car className="w-6 h-6 md:w-8 md:h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs md:text-sm text-gray-600">Parking</div>
                    <div className="text-base md:text-lg font-semibold">2 Spaces</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Description</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Stunning luxury villa located in the prestigious Dubai Hills Estate. This magnificent property features modern architecture, high-end finishes, and a private pool with landscaped garden. The villa offers spacious living areas with floor-to-ceiling windows, a gourmet kitchen, and luxurious bedrooms with en-suite bathrooms. Perfect for families seeking an upscale lifestyle in one of Dubai's most sought-after communities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="features" className="text-xs md:text-sm">Features</TabsTrigger>
              <TabsTrigger value="linked-leads" className="text-xs md:text-sm">Linked Leads</TabsTrigger>
              <TabsTrigger value="viewings" className="text-xs md:text-sm">Viewing Log</TabsTrigger>
              <TabsTrigger value="contact" className="text-xs md:text-sm">Agent Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="features">
              <Card className="rounded-xl md:rounded-2xl">
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <h4 className="text-sm md:text-base font-semibold mb-2 md:mb-3">Amenities</h4>
                      <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
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
                      <h4 className="text-sm md:text-base font-semibold mb-2 md:mb-3">Community Features</h4>
                      <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
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
              <Card className="rounded-xl md:rounded-2xl">
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3 md:space-y-4">
                    {[
                      { name: 'Mohammed Al-Rashid', status: 'Interested', date: '2 days ago' },
                      { name: 'Fatima Hassan', status: 'Viewing Scheduled', date: '5 days ago' },
                      { name: 'Ahmed Abdullah', status: 'Negotiation', date: '1 week ago' },
                    ].map((lead, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                          <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                            <AvatarFallback className="text-xs">{lead.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="text-xs md:text-sm font-medium truncate">{lead.name}</div>
                            <div className="text-xs text-gray-500">{lead.date}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">{lead.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="viewings">
              <Card className="rounded-xl md:rounded-2xl">
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-2 md:space-y-3">
                    {[
                      { lead: 'Mohammed Al-Rashid', agent: 'Sarah Johnson', date: '2025-11-18', time: '2:00 PM', status: 'Scheduled' },
                      { lead: 'Fatima Hassan', agent: 'Michael Chen', date: '2025-11-15', time: '3:30 PM', status: 'Completed' },
                      { lead: 'Ahmed Abdullah', agent: 'Emma Williams', date: '2025-11-12', time: '11:00 AM', status: 'No-show' },
                    ].map((viewing, i) => (
                      <div key={i} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs md:text-sm font-medium truncate flex-1 mr-2">{viewing.lead}</div>
                          <Badge variant={
                            viewing.status === 'Scheduled' ? 'default' :
                            viewing.status === 'Completed' ? 'secondary' :
                            'destructive'
                          } className="text-xs flex-shrink-0">
                            {viewing.status}
                          </Badge>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span>{viewing.date} at {viewing.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{viewing.agent}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card className="rounded-xl md:rounded-2xl">
                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className="text-base md:text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <Avatar className="h-12 w-12 md:h-16 md:w-16 flex-shrink-0">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-semibold truncate">Sarah Johnson</h3>
                      <p className="text-xs md:text-sm text-gray-500">Senior Real Estate Agent</p>
                      <Badge className="mt-1 md:mt-2 bg-blue-100 text-blue-700 text-xs">Verified Agent</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold mb-2 md:mb-3">Contact Details</h4>
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 bg-gray-50 rounded-lg">
                          <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500">Phone</div>
                            <div className="text-xs md:text-sm truncate">+971 50 123 4567</div>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs rounded-lg flex-shrink-0" onClick={() => toast.success('Calling agent...')}>
                            Call
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 bg-gray-50 rounded-lg">
                          <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500">Email</div>
                            <div className="text-xs md:text-sm truncate">sarah.johnson@reproaleaders.com</div>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs rounded-lg flex-shrink-0" onClick={() => toast.success('Opening email client...')}>
                            Email
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 bg-gray-50 rounded-lg">
                          <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500">WhatsApp</div>
                            <div className="text-xs md:text-sm truncate">+971 50 123 4567</div>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs rounded-lg flex-shrink-0" onClick={() => toast.success('Opening WhatsApp...')}>
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs md:text-sm font-semibold mb-2 md:mb-3">Agent Statistics</h4>
                      <div className="grid grid-cols-3 gap-2 md:gap-3">
                        <div className="p-2.5 md:p-3 bg-blue-50 rounded-lg text-center">
                          <div className="text-xl md:text-2xl font-bold text-blue-600">47</div>
                          <div className="text-[10px] md:text-xs text-gray-600">Properties Sold</div>
                        </div>
                        <div className="p-2.5 md:p-3 bg-green-50 rounded-lg text-center">
                          <div className="text-xl md:text-2xl font-bold text-green-600">12</div>
                          <div className="text-[10px] md:text-xs text-gray-600">Active Listings</div>
                        </div>
                        <div className="p-2.5 md:p-3 bg-purple-50 rounded-lg text-center">
                          <div className="text-xl md:text-2xl font-bold text-purple-600">5+</div>
                          <div className="text-[10px] md:text-xs text-gray-600">Years Experience</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs md:text-sm font-semibold mb-2 md:mb-3">About</h4>
                      <p className="text-xs md:text-sm text-gray-600">
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
        <div className="space-y-4 md:space-y-6">
          <Card className="rounded-xl md:rounded-2xl">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Assigned Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">Sarah Johnson</div>
                  <div className="text-xs text-gray-500">Senior Agent</div>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl text-sm" onClick={handleContactAgent}>Contact Agent</Button>
            </CardContent>
          </Card>

          <Card className="rounded-xl md:rounded-2xl">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-base md:text-lg">Property Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Listed Date</span>
                <span className="font-medium">Nov 1, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property Type</span>
                <span className="font-medium">Villa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion</span>
                <span className="font-medium">Ready</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Furnishing</span>
                <span className="font-medium">Unfurnished</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Reference</span>
                <span className="text-blue-600 font-medium">PROP-001</span>
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