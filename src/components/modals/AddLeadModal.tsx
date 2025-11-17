import { X, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import type { BrandType } from '../../App';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  brand: BrandType;
}

export function AddLeadModal({ isOpen, onClose, onSubmit, brand }: AddLeadModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {brand === 'real-estate' ? 'Add New Lead' : 'Add New Inquiry'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {brand === 'real-estate' ? 'Create a new property lead' : 'Create a new business inquiry'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="Enter client name" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  placeholder="+971 50 123 4567" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="client@email.com" 
                  className="mt-1.5" 
                />
              </div>

              {brand === 'business-setup' && (
                <div className="col-span-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input 
                    id="nationality" 
                    name="nationality"
                    placeholder="e.g., British, Indian, etc." 
                    className="mt-1.5" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {brand === 'real-estate' ? 'Property Requirements' : 'Service Requirements'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {brand === 'real-estate' ? (
                <>
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input 
                      id="budget" 
                      name="budget"
                      placeholder="AED 2M - 3M" 
                      className="mt-1.5" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select name="propertyType">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="location">Preferred Location</Label>
                    <Input 
                      id="location" 
                      name="location"
                      placeholder="Dubai Hills, Marina, Downtown..." 
                      className="mt-1.5" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select name="bedrooms">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4 Bedrooms</SelectItem>
                        <SelectItem value="5+">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Purpose</Label>
                    <Select name="purpose" defaultValue="buy">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buy">Buy</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-2">
                    <Label htmlFor="service">Service Type *</Label>
                    <Select name="service" required>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company-formation">Company Formation</SelectItem>
                        <SelectItem value="visa-services">Visa Services</SelectItem>
                        <SelectItem value="license-renewal">License Renewal</SelectItem>
                        <SelectItem value="pro-services">PRO Services</SelectItem>
                        <SelectItem value="bank-account">Bank Account Opening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="jurisdiction">Jurisdiction</Label>
                    <Select name="jurisdiction">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mainland">Mainland</SelectItem>
                        <SelectItem value="freezone">Free Zone</SelectItem>
                        <SelectItem value="offshore">Offshore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="visas">Number of Visas</Label>
                    <Input 
                      id="visas" 
                      name="visas"
                      type="number" 
                      placeholder="2" 
                      className="mt-1.5" 
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="activity">Business Activity</Label>
                    <Input 
                      id="activity" 
                      name="activity"
                      placeholder="Trading, Consulting, IT Services, etc." 
                      className="mt-1.5" 
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Lead Details */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Lead Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source">Lead Source *</Label>
                <Select name="source" required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="walkin">Walk-in</SelectItem>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="phone">Phone Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Initial Status</Label>
                <Select name="status" defaultValue="new">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="assignee">Assign To</Label>
                <Select name="assignee">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="emma">Emma Williams</SelectItem>
                    <SelectItem value="james">James Brown</SelectItem>
                    <SelectItem value="lisa">Lisa Anderson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  placeholder="Add any additional information about the lead..."
                  className="mt-1.5 min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Create Lead
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
