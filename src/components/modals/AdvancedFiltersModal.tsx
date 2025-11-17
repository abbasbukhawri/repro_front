import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AdvancedFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  brand: 'real-estate' | 'business-setup';
}

export function AdvancedFiltersModal({ isOpen, onClose, onApply, brand }: AdvancedFiltersModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filters = Object.fromEntries(formData.entries());
    onApply(filters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
          <DialogDescription>Refine your search with these advanced filters.</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Source */}
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Select name="source">
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="direct">Direct</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select name="dateRange">
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {brand === 'real-estate' ? (
              <>
                {/* Budget Range */}
                <div className="space-y-2">
                  <Label htmlFor="minBudget">Min Budget (AED)</Label>
                  <Input
                    id="minBudget"
                    name="minBudget"
                    type="number"
                    placeholder="e.g., 1000000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxBudget">Max Budget (AED)</Label>
                  <Input
                    id="maxBudget"
                    name="maxBudget"
                    type="number"
                    placeholder="e.g., 5000000"
                  />
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select name="propertyType">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select name="location">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="dubai-hills">Dubai Hills</SelectItem>
                      <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                      <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                      <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                {/* Service Type */}
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select name="serviceType">
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="company-formation">Company Formation</SelectItem>
                      <SelectItem value="license-renewal">License Renewal</SelectItem>
                      <SelectItem value="visa-services">Visa Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Jurisdiction */}
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Select name="jurisdiction">
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="free-zone">Free Zone</SelectItem>
                      <SelectItem value="mainland">Mainland</SelectItem>
                      <SelectItem value="offshore">Offshore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Assigned To */}
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Select name="assignedTo">
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="michael">Michael Chen</SelectItem>
                  <SelectItem value="emma">Emma Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Apply Filters
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}