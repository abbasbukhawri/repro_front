import { useState, useEffect } from 'react';
import { Search, X, User, Building2, CheckSquare, FileText, Command } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useSettings } from '../../contexts/SettingsContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function GlobalSearchModal({ isOpen, onClose, onNavigate }: GlobalSearchModalProps) {
  const { formatCurrency } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any>({
    leads: [],
    properties: [],
    tasks: [],
    documents: [],
  });

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
      ),
      properties: searchData.properties.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.location.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      ),
      tasks: searchData.tasks.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query)
      ),
      documents: searchData.documents.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      ),
    });
  }, [searchQuery]);

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
    onClose();
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
        {/* Visually Hidden Title and Description for Accessibility */}
        <DialogTitle className="sr-only">Global Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search across leads, properties, tasks, and documents in your CRM
        </DialogDescription>
        
        {/* Search Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, properties, tasks, documents..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-0"
            autoFocus
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex px-2 py-1 text-xs font-semibold bg-gray-100 border border-gray-200 rounded-md text-gray-600">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <ScrollArea className="max-h-[500px]">
          <div className="p-6">
            {searchQuery === '' && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm">Start typing to search across your CRM</p>
                <p className="text-gray-400 text-xs mt-1">Leads • Properties • Tasks • Documents</p>
              </div>
            )}

            {searchQuery !== '' && totalResults === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-gray-500 text-sm">No results found for "{searchQuery}"</p>
                <p className="text-gray-400 text-xs mt-1">Try different keywords or check spelling</p>
              </div>
            )}

            {/* Leads Results */}
            {results.leads.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm text-gray-700">Leads ({results.leads.length})</h3>
                </div>
                <div className="space-y-2">
                  {results.leads.map((lead: any) => (
                    <button
                      key={lead.id}
                      onClick={() => handleResultClick('lead', lead.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.phone} • {lead.type}</p>
                        </div>
                      </div>
                      <Badge variant={lead.status === 'Hot' ? 'destructive' : lead.status === 'Warm' ? 'default' : 'secondary'}>
                        {lead.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Properties Results */}
            {results.properties.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm text-gray-700">Properties ({results.properties.length})</h3>
                </div>
                <div className="space-y-2">
                  {results.properties.map((property: any) => (
                    <button
                      key={property.id}
                      onClick={() => handleResultClick('property', property.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-green-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{property.title}</p>
                          <p className="text-sm text-gray-500">{property.location} • {property.type}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">{formatCurrency(property.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Results */}
            {results.tasks.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckSquare className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm text-gray-700">Tasks ({results.tasks.length})</h3>
                </div>
                <div className="space-y-2">
                  {results.tasks.map((task: any) => (
                    <button
                      key={task.id}
                      onClick={() => handleResultClick('task', task.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${task.priority === 'High' ? 'bg-red-100' : 'bg-yellow-100'} flex items-center justify-center`}>
                          <CheckSquare className={`w-5 h-5 ${task.priority === 'High' ? 'text-red-600' : 'text-yellow-600'}`} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{task.title}</p>
                          <p className="text-sm text-gray-500">{task.brand}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={task.priority === 'High' ? 'destructive' : 'default'} className="mb-1">
                          {task.priority}
                        </Badge>
                        <p className="text-xs text-gray-500">{task.dueDate}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Results */}
            {results.documents.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm text-gray-700">Documents ({results.documents.length})</h3>
                </div>
                <div className="space-y-2">
                  {results.documents.map((doc: any) => (
                    <button
                      key={doc.id}
                      onClick={() => handleResultClick('document', doc.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type}</p>
                        </div>
                      </div>
                      <Badge variant={doc.status === 'Approved' ? 'default' : doc.status === 'Pending' ? 'secondary' : 'outline'}>
                        {doc.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        {totalResults > 0 && (
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}