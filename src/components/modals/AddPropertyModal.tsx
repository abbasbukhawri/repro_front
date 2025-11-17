import { X, Building2, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddPropertyModal({ isOpen, onClose, onSubmit }: AddPropertyModalProps) {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    // Add the image preview URL to the data
    if (previewImage) {
      data.image = previewImage;
    }
    
    onSubmit(data);
    onClose();
    // Reset image state
    setPreviewImage('');
    setImageFile(null);
  };
  
  const handleClose = () => {
    setPreviewImage('');
    setImageFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Property</h2>
              <p className="text-sm text-gray-500 mt-1">List a new property in the system</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Property Image Upload */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Property Images</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image">Upload Property Image</Label>
                <div className="mt-2">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    {previewImage ? (
                      <div className="relative w-full h-full">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                          <p className="text-white text-sm">Click to change image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <ImageIcon className="w-4 h-4 inline mr-1" />
                Upload high-quality images to showcase your property
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="Luxurious 4BR Villa in Dubai Hills Estate" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="type">Property Type *</Label>
                <Select name="type" required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Label htmlFor="status">Status *</Label>
                <Select name="status" defaultValue="available">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Price (AED) *</Label>
                <Input 
                  id="price" 
                  name="price"
                  type="number" 
                  placeholder="2500000" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="purpose">Purpose *</Label>
                <Select name="purpose" defaultValue="sale">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Area/Community *</Label>
                <Input 
                  id="location" 
                  name="location"
                  placeholder="Dubai Hills Estate" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Select name="city" defaultValue="dubai">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                    <SelectItem value="ajman">Ajman</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="address">Full Address</Label>
                <Input 
                  id="address" 
                  name="address"
                  placeholder="Street name, building number" 
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
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Input 
                  id="bedrooms" 
                  name="bedrooms"
                  type="number" 
                  placeholder="4" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Input 
                  id="bathrooms" 
                  name="bathrooms"
                  type="number" 
                  placeholder="5" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="area">Area (sqft) *</Label>
                <Input 
                  id="area" 
                  name="area"
                  type="number" 
                  placeholder="3500" 
                  className="mt-1.5" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="parking">Parking Spaces</Label>
                <Input 
                  id="parking" 
                  name="parking"
                  type="number" 
                  placeholder="2" 
                  className="mt-1.5" 
                />
              </div>

              <div>
                <Label htmlFor="floor">Floor Number</Label>
                <Input 
                  id="floor" 
                  name="floor"
                  type="number" 
                  placeholder="15" 
                  className="mt-1.5" 
                />
              </div>

              <div>
                <Label htmlFor="furnished">Furnishing</Label>
                <Select name="furnished" defaultValue="unfurnished">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Agent Assignment */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Agent Assignment</h3>
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
                <Label htmlFor="refNumber">Reference Number</Label>
                <Input 
                  id="refNumber" 
                  name="refNumber"
                  placeholder="RE-2025-001" 
                  className="mt-1.5" 
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Property Description</Label>
            <Textarea 
              id="description" 
              name="description"
              placeholder="Describe the property features, amenities, nearby facilities..."
              className="mt-1.5 min-h-[100px]"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Add Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}