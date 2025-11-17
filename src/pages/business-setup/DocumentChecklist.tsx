import { FileCheck, Upload, Download, Check, X, Clock } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface DocumentChecklistProps {
  onNavigate: (page: string) => void;
}

const cases = [
  {
    id: 1,
    client: 'John Smith',
    service: 'Company Formation',
    jurisdiction: 'Free Zone',
    totalDocs: 8,
    uploaded: 6,
    approved: 4,
    pending: 2,
    completion: 75,
  },
  {
    id: 2,
    client: 'Maria Garcia',
    service: 'License Renewal',
    jurisdiction: 'Mainland',
    totalDocs: 5,
    uploaded: 5,
    approved: 5,
    pending: 0,
    completion: 100,
  },
  {
    id: 3,
    client: 'David Chen',
    service: 'Company Formation',
    jurisdiction: 'Offshore',
    totalDocs: 10,
    uploaded: 3,
    approved: 1,
    pending: 2,
    completion: 30,
  },
];

const documentTypes = [
  { name: 'Passport Copy', status: 'approved', uploadedBy: 'John Smith', date: '2025-11-10' },
  { name: 'Photo (Passport Size)', status: 'approved', uploadedBy: 'John Smith', date: '2025-11-10' },
  { name: 'Residency Proof', status: 'pending', uploadedBy: 'John Smith', date: '2025-11-14' },
  { name: 'Business Plan', status: 'pending', uploadedBy: 'John Smith', date: '2025-11-14' },
  { name: 'NOC Letter', status: 'approved', uploadedBy: 'John Smith', date: '2025-11-11' },
  { name: 'Educational Certificates', status: 'approved', uploadedBy: 'John Smith', date: '2025-11-11' },
  { name: 'Visa Sponsor Letter', status: 'not-uploaded', uploadedBy: '-', date: '-' },
  { name: 'Bank Reference Letter', status: 'not-uploaded', uploadedBy: '-', date: '-' },
];

export function DocumentChecklist({ onNavigate }: DocumentChecklistProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700"><Check className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />Pending Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700"><X className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">Not Uploaded</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Document Checklist Manager"
        description="Track document collection and approval status"
        actions={
          <Button className="bg-green-600 hover:bg-green-700">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Cases</div>
                <div className="text-2xl">67</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Pending Review</div>
                <div className="text-2xl">23</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Approved</div>
                <div className="text-2xl">189</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Rejected</div>
                <div className="text-2xl">12</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cases Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cases Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm mb-1">{caseItem.client}</div>
                    <div className="text-xs text-gray-500">
                      {caseItem.service} • {caseItem.jurisdiction}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{caseItem.completion}% Complete</div>
                    <div className="text-xs text-gray-500">
                      {caseItem.uploaded}/{caseItem.totalDocs} uploaded
                    </div>
                  </div>
                </div>
                <Progress value={caseItem.completion} className="h-2 mb-3" />
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-3 h-3" />
                    {caseItem.approved} Approved
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Clock className="w-3 h-3" />
                    {caseItem.pending} Pending
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <FileCheck className="w-3 h-3" />
                    {caseItem.totalDocs - caseItem.uploaded} Not Uploaded
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>John Smith - Company Formation Documents</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documentTypes.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-sm">{doc.name}</div>
                    <div className="text-xs text-gray-500">
                      {doc.status !== 'not-uploaded' && `Uploaded by ${doc.uploadedBy} on ${doc.date}`}
                      {doc.status === 'not-uploaded' && 'Not uploaded yet'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(doc.status)}
                  {doc.status !== 'not-uploaded' && (
                    <Button size="sm" variant="outline">View</Button>
                  )}
                  {doc.status === 'not-uploaded' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Upload className="w-3 h-3 mr-1" />
                      Upload
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
