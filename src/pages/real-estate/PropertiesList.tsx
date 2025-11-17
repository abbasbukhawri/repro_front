import { useState } from 'react';
import { Plus, Search, Filter, Grid3x3, List, Building2, MapPin, DollarSign, Bed } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { AddPropertyModal } from '../../components/modals/AddPropertyModal';
import { PropertyFiltersModal } from '../../components/modals/PropertyFiltersModal';
import { useCRM } from '../../contexts/CRMContext';
import { toast } from 'sonner@2.0.3';

interface PropertiesListProps {
  onNavigate: (page: string) => void;
  onSelectProperty: (id: string) => void;
}

export function PropertiesList({ onNavigate, onSelectProperty }: PropertiesListProps) {
  const { properties, addProperty } = useCRM();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({});

  const handleAddProperty = (data: any) => {
    addProperty({
      title: data.title,
      type: data.type,
      price: parseFloat(data.price),
      location: data.location,
      bedrooms: parseInt(data.bedrooms),
      bathrooms: parseInt(data.bathrooms),
      area: parseFloat(data.area),
      status: data.status,
      image: data.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
      developer: data.developer,
      features: data.features?.split(',').map((f: string) => f.trim()) || [],
      description: data.description
    });
    setIsAddModalOpen(false);
    toast.success('Property added successfully!', {
      description: `${data.title} has been added to your property listings.`
    });
  };

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters);
    toast.success('Filters applied successfully!');
  };

  const filteredProperties = properties.filter(property => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Advanced filters
    const matchesType = !activeFilters.type || activeFilters.type === 'all' || property.type.toLowerCase() === activeFilters.type;
    const matchesStatus = !activeFilters.status || activeFilters.status === 'all' || property.status.toLowerCase() === activeFilters.status;
    const matchesPriceMin = !activeFilters.priceMin || property.price >= parseFloat(activeFilters.priceMin);
    const matchesPriceMax = !activeFilters.priceMax || property.price <= parseFloat(activeFilters.priceMax);
    const matchesBedrooms = !activeFilters.bedrooms || activeFilters.bedrooms === 'all' || property.bedrooms >= parseInt(activeFilters.bedrooms);
    const matchesBathrooms = !activeFilters.bathrooms || activeFilters.bathrooms === 'all' || property.bathrooms >= parseInt(activeFilters.bathrooms);
    const matchesAreaMin = !activeFilters.areaMin || property.area >= parseFloat(activeFilters.areaMin);
    const matchesAreaMax = !activeFilters.areaMax || property.area <= parseFloat(activeFilters.areaMax);
    const matchesLocation = !activeFilters.location || property.location.toLowerCase().includes(activeFilters.location.toLowerCase());

    return matchesSearch && matchesType && matchesStatus && matchesPriceMin && matchesPriceMax && 
           matchesBedrooms && matchesBathrooms && matchesAreaMin && matchesAreaMax && matchesLocation;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader
        title="Properties"
        description="Manage your property listings"
        actions={
          <>
            <Button variant="outline" className="hidden sm:flex rounded-xl border-gray-300" onClick={() => setIsFiltersModalOpen(true)}>
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Property</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </>
        }
      />

      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="hidden md:flex"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                onSelectProperty(property.id);
                onNavigate('re-property-details');
              }}
            >
              <div className="relative h-48 bg-gray-200">
                <ImageWithFallback
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-blue-600">
                  {property.status}
                </Badge>
                <Badge className="absolute top-3 right-3 bg-white text-gray-900">
                  {property.type}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="text-xl text-blue-600">AED {property.price.toLocaleString()}</div>
                <h3 className="text-lg mb-2">{property.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  {property.location}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    {property.bedrooms} Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {property.area} sqft
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                onSelectProperty(property.id);
                onNavigate('re-property-details');
              }}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg mb-1">{property.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {property.location}
                        </div>
                      </div>
                      <div className="text-xl text-blue-600">{property.price.toLocaleString('en-US', { style: 'currency', currency: 'AED' })}</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
                      <Badge variant="secondary">{property.status}</Badge>
                      <Badge variant="secondary">{property.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {property.bedrooms} Beds
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {property.area} sqft
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProperty}
      />
      <PropertyFiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}