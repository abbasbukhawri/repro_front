import { X, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

interface AddPledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddPledgeModal({ isOpen, onClose, onSubmit }: AddPledgeModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    onClose();
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create New Pledge</h2>
              <p className="text-sm text-gray-500 mt-1">Record a property sale pledge</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client & Property Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Client & Property Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="client">Client/Lead *</Label>
                <Select name="client" required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Mohammed Al-Rashid</SelectItem>
                    <SelectItem value="2">Fatima Hassan</SelectItem>
                    <SelectItem value="3">Ahmed Abdullah</SelectItem>
                    <SelectItem value="4">Layla Ibrahim</SelectItem>
                    <SelectItem value="5">Omar Khalid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="property">Property *</Label>
                <Select name="property" required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Luxurious 4BR Villa - Dubai Hills Estate</SelectItem>
                    <SelectItem value="2">Modern 2BR Apartment - Dubai Marina</SelectItem>
                    <SelectItem value="3">Spacious 3BR Townhouse - Arabian Ranches</SelectItem>
                    <SelectItem value="4">Premium Penthouse - Downtown Dubai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Financial Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="totalAmount">Total Pledge Amount (AED) *</Label>
                <Input 
                  id="totalAmount" 
                  name="totalAmount"
                  type="number" 
                  placeholder="2500000" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="initialDeposit">Initial Deposit (AED) *</Label>
                <Input 
                  id="initialDeposit" 
                  name="initialDeposit"
                  type="number" 
                  placeholder="250000" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="depositPercentage">Deposit Percentage</Label>
                <Input 
                  id="depositPercentage" 
                  name="depositPercentage"
                  type="number" 
                  placeholder="10" 
                  className="mt-1.5"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <Select name="paymentMethod" required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="paymentPlan">Payment Plan</Label>
                <Select name="paymentPlan">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-payment">Full Payment</SelectItem>
                    <SelectItem value="installments">Installments</SelectItem>
                    <SelectItem value="mortgage">Mortgage Financing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pledgeDate">Pledge Date *</Label>
                <Input 
                  id="pledgeDate" 
                  name="pledgeDate"
                  type="date" 
                  defaultValue={currentDate}
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="expectedClosing">Expected Closing Date *</Label>
                <Input 
                  id="expectedClosing" 
                  name="expectedClosing"
                  type="date" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="milestones">Payment Milestones</Label>
                <Input 
                  id="milestones" 
                  name="milestones"
                  placeholder="e.g., 10% on signing, 40% on construction, 50% on handover" 
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Assignment</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="agent">Assigned Agent *</Label>
                <Select name="agent" required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select agent" />
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

              <div>
                <Label htmlFor="status">Initial Status</Label>
                <Select name="status" defaultValue="active">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending-documents">Pending Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="referenceNumber">Reference Number</Label>
                <Input 
                  id="referenceNumber" 
                  name="referenceNumber"
                  placeholder="PLG-2025-001" 
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="notes">Notes & Terms</Label>
            <Textarea 
              id="notes" 
              name="notes"
              placeholder="Add any special terms, conditions, or notes regarding this pledge..."
              className="mt-1.5 min-h-[100px]"
            />
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
              Create Pledge
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
