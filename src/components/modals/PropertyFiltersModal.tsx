import { X, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

interface PropertyFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export function PropertyFiltersModal({ isOpen, onClose, onApplyFilters }: PropertyFiltersModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const filters = Object.fromEntries(formData);
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    onApplyFilters({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle>Advanced Filters</DialogTitle>
              <DialogDescription>
                Filter properties by multiple criteria
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Type & Status */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Property Type & Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Property Type</Label>
                <Select name="type">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Price Range (AED)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priceMin">Min Price</Label>
                <Input 
                  id="priceMin" 
                  name="priceMin"
                  type="number" 
                  placeholder="500,000" 
                  className="mt-1.5" 
                />
              </div>

              <div>
                <Label htmlFor="priceMax">Max Price</Label>
                <Input 
                  id="priceMax" 
                  name="priceMax"
                  type="number" 
                  placeholder="5,000,000" 
                  className="mt-1.5" 
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Property Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select name="bedrooms">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select name="bathrooms">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="furnished">Furnishing</Label>
                <Select name="furnished">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Area Range */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Area (sqft)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="areaMin">Min Area</Label>
                <Input 
                  id="areaMin" 
                  name="areaMin"
                  type="number" 
                  placeholder="1,000" 
                  className="mt-1.5" 
                />
              </div>

              <div>
                <Label htmlFor="areaMax">Max Area</Label>
                <Input 
                  id="areaMax" 
                  name="areaMax"
                  type="number" 
                  placeholder="10,000" 
                  className="mt-1.5" 
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Area/Community</Label>
                <Input 
                  id="location" 
                  name="location"
                  placeholder="Dubai Hills, Marina..." 
                  className="mt-1.5" 
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Select name="city">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="All cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                    <SelectItem value="ajman">Ajman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Assigned Agent */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Agent</h3>
            <div>
              <Label htmlFor="agent">Assigned Agent</Label>
              <Select name="agent">
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="All agents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Michael Chen</SelectItem>
                  <SelectItem value="emma">Emma Williams</SelectItem>
                  <SelectItem value="james">James Brown</SelectItem>
                  <SelectItem value="lisa">Lisa Anderson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              className="rounded-xl"
            >
              Reset Filters
            </Button>
            <Button 
              type="submit"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Apply Filters
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}