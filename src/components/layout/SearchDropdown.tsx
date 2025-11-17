import { useState, useEffect, useRef } from 'react';
import { Search, X, User, Building2, CheckSquare, FileText } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useSettings } from '../../contexts/SettingsContext';

interface SearchDropdownProps {
  onNavigate: (page: string, id?: string) => void;
}

// Mock data - in a real app, this would come from your database/context
const searchData = {
  leads: [
    { id: '1', name: 'Mohammed Al-Rashid', type: 'Real Estate', status: 'Hot', phone: '+971 50 123 4567' },
    { id: '2', name: 'Sarah Johnson', type: 'Real Estate', status: 'Warm', phone: '+971 50 234 5678' },
    { id: '3', name: 'John Smith', type: 'Business Setup', status: 'Hot', phone: '+971 50 345 6789' },
    { id: '4', name: 'Fatima Al Ali', type: 'Business Setup', status: 'Cold', phone: '+971 50 456 7890' },
  ],
  properties: [
    { id: '1', title: 'Luxury Villa - Palm Jumeirah', location: 'Dubai', price: 12500000, type: 'Villa' },
    { id: '2', title: 'Modern Apartment - Downtown', location: 'Dubai', price: 2800000, type: 'Apartment' },
    { id: '3', title: 'Penthouse - Marina', location: 'Dubai', price: 8900000, type: 'Penthouse' },
  ],
  tasks: [
    { id: '1', title: 'Follow up with Mohammed Al-Rashid', brand: 'Real Estate', priority: 'High', dueDate: 'Today' },
    { id: '2', title: 'Prepare license renewal documents', brand: 'Business Setup', priority: 'Medium', dueDate: 'Tomorrow' },
    { id: '3', title: 'Schedule property viewing', brand: 'Real Estate', priority: 'High', dueDate: 'Today' },
  ],
  documents: [
    { id: '1', name: 'Trade License Application', type: 'Business Setup', status: 'Pending' },
    { id: '2', name: 'Emirates ID Copy', type: 'Business Setup', status: 'Approved' },
    { id: '3', name: 'Sale Agreement - Villa', type: 'Real Estate', status: 'Draft' },
  ],
};

export function SearchDropdown({ onNavigate }: SearchDropdownProps) {
  const { formatCurrency } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any>({
    leads: [],
    properties: [],
    tasks: [],
    documents: [],
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults({ leads: [], properties: [], tasks: [], documents: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    
    setResults({
      leads: searchData.leads.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.phone.includes(query) ||
        item.type.toLowerCase().includes(query)
      ).slice(0, 3),
      properties: searchData.properties.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.location.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      ).slice(0, 3),
      tasks: searchData.tasks.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query)
      ).slice(0, 3),
      documents: searchData.documents.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      ).slice(0, 3),
    });
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalResults = results.leads.length + results.properties.length + results.tasks.length + results.documents.length;

  const handleResultClick = (type: string, id: string) => {
    if (type === 'lead') {
      onNavigate('re-lead-details', id);
    } else if (type === 'property') {
      onNavigate('re-property-details', id);
    } else if (type === 'task') {
      onNavigate('tasks');
    } else if (type === 'document') {
      onNavigate('bs-documents');
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative flex-1 max-w-2xl" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" strokeWidth={1.5} />
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search leads, properties, tasks..."
          className="w-full pl-10 pr-10 bg-gray-50/80 border-gray-200/60 hover:bg-gray-100/80 hover:border-gray-300 transition-all duration-200"
        />
        {searchQuery && (
          <button 
            onClick={() => {
              setSearchQuery('');
              setIsOpen(false);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {searchQuery === '' ? (
            <div className="p-8 text-center">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-sm text-gray-500">Start typing to search</p>
              <p className="text-xs text-gray-400 mt-1">Leads • Properties • Tasks • Documents</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="p-8 text-center">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <ScrollArea className="max-h-[400px]">
              <div className="p-3">
                {/* Leads Results */}
                {results.leads.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <User className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
                      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Leads</h3>
                    </div>
                    <div className="space-y-1">
                      {results.leads.map((lead: any) => (
                        <button
                          key={lead.id}
                          onClick={() => handleResultClick('lead', lead.id)}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{lead.name}</p>
                              <p className="text-xs text-gray-500">{lead.phone}</p>
                            </div>
                          </div>
                          <Badge variant={lead.status === 'Hot' ? 'destructive' : lead.status === 'Warm' ? 'default' : 'secondary'} className="text-xs">
                            {lead.status}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Properties Results */}
                {results.properties.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
                      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Properties</h3>
                    </div>
                    <div className="space-y-1">
                      {results.properties.map((property: any) => (
                        <button
                          key={property.id}
                          onClick={() => handleResultClick('property', property.id)}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-green-600" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">{property.title}</p>
                              <p className="text-xs text-gray-500">{property.location}</p>
                            </div>
                          </div>
                          <p className="text-xs font-semibold text-gray-900 ml-2">{formatCurrency(property.price)}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tasks Results */}
                {results.tasks.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
                      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Tasks</h3>
                    </div>
                    <div className="space-y-1">
                      {results.tasks.map((task: any) => (
                        <button
                          key={task.id}
                          onClick={() => handleResultClick('task', task.id)}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg ${task.priority === 'High' ? 'bg-red-100' : 'bg-yellow-100'} flex items-center justify-center`}>
                              <CheckSquare className={`w-4 h-4 ${task.priority === 'High' ? 'text-red-600' : 'text-yellow-600'}`} strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">{task.title}</p>
                              <p className="text-xs text-gray-500">{task.brand}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents Results */}
                {results.documents.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <FileText className="w-3.5 h-3.5 text-gray-500" strokeWidth={1.5} />
                      <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Documents</h3>
                    </div>
                    <div className="space-y-1">
                      {results.documents.map((doc: any) => (
                        <button
                          key={doc.id}
                          onClick={() => handleResultClick('document', doc.id)}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-purple-600" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.type}</p>
                            </div>
                          </div>
                          <Badge variant={doc.status === 'Approved' ? 'default' : doc.status === 'Pending' ? 'secondary' : 'outline'} className="text-xs">
                            {doc.status}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      )}
    </div>
  );
}