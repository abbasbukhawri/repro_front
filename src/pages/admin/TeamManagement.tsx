import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { PageHeader } from '../../components/crm/PageHeader';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { CreateTeamModal } from '../../components/modals/CreateTeamModal';
import { ManageTeamModal } from '../../components/modals/ManageTeamModal';
import { toast } from 'sonner';

interface TeamManagementProps {
  onNavigate: (page: string) => void;
}

// Mock users data - in a real app, this would come from a database or context
const availableUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@repro.ae', phone: '+971 50 123 4567', role: 'Agent', brandAccess: ['Real Estate'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
  { id: 2, name: 'Michael Chen', email: 'michael@repro.ae', phone: '+971 50 234 5678', role: 'Agent', brandAccess: ['Real Estate'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael' },
  { id: 3, name: 'Hassan Ali', email: 'hassan@probiz.ae', phone: '+971 50 345 6789', role: 'PRO Officer', brandAccess: ['Business Setup'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hassan' },
  { id: 4, name: 'Admin User', email: 'admin@dualcrm.com', phone: '+971 50 456 7890', role: 'Super Admin', brandAccess: ['Real Estate', 'Business Setup'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' },
  { id: 5, name: 'Emma Williams', email: 'emma@repro.ae', phone: '+971 50 567 8901', role: 'Manager', brandAccess: ['Real Estate'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' },
  { id: 6, name: 'Mariam Ahmed', email: 'mariam@probiz.ae', phone: '+971 50 678 9012', role: 'PRO Officer', brandAccess: ['Business Setup'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariam' },
  { id: 7, name: 'John Smith', email: 'john@repro.ae', phone: '+971 50 789 0123', role: 'Agent', brandAccess: ['Real Estate'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john' },
  { id: 8, name: 'Fatima Al Ali', email: 'fatima@probiz.ae', phone: '+971 50 890 1234', role: 'Manager', brandAccess: ['Business Setup'], status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatima' },
];

const initialTeams = [
  { 
    id: 1, 
    name: 'Real Estate Sales Team', 
    brand: 'Real Estate', 
    leadId: 1,
    lead: 'Sarah Johnson', 
    memberIds: [1, 2, 5, 7],
    members: 4, 
    performance: '94%' 
  },
  { 
    id: 2, 
    name: 'Business Setup Team', 
    brand: 'Business Setup', 
    leadId: 3,
    lead: 'Hassan Ali', 
    memberIds: [3, 6, 8],
    members: 3, 
    performance: '92%' 
  },
  { 
    id: 3, 
    name: 'PRO Services', 
    brand: 'Business Setup', 
    leadId: 6,
    lead: 'Mariam Ahmed', 
    memberIds: [6, 3],
    members: 2, 
    performance: '96%' 
  },
];

export function TeamManagement({ onNavigate }: TeamManagementProps) {
  const [teams, setTeams] = useState(initialTeams);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isManageModalOpen, setManageModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const handleCreateTeam = (data: any) => {
    const leadUser = availableUsers.find(u => u.id.toString() === data.leadId);
    const newTeam = {
      id: teams.length + 1,
      name: data.name,
      brand: data.brand,
      leadId: parseInt(data.leadId),
      lead: leadUser?.name || 'Unknown',
      memberIds: data.memberIds,
      members: data.memberIds.length,
      performance: '90%', // Default performance for new teams
    };
    setTeams([...teams, newTeam]);
    toast.success(`Team "${data.name}" created successfully!`);
    setCreateModalOpen(false);
  };

  const handleUpdateTeam = (teamId: number, data: any) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        const updatedTeam: any = { ...team };
        
        if (data.name) updatedTeam.name = data.name;
        if (data.brand) updatedTeam.brand = data.brand;
        if (data.leadId) {
          updatedTeam.leadId = parseInt(data.leadId);
          const leadUser = availableUsers.find(u => u.id === parseInt(data.leadId));
          updatedTeam.lead = leadUser?.name || 'Unknown';
        }
        if (data.memberIds !== undefined) {
          updatedTeam.memberIds = data.memberIds;
          updatedTeam.members = data.memberIds.length;
        }
        
        return updatedTeam;
      }
      return team;
    }));
    toast.success(`Team updated successfully!`);
    setManageModalOpen(false);
    setSelectedTeam(null);
  };

  const handleDeleteTeam = (teamId: number) => {
    const teamToDelete = teams.find(t => t.id === teamId);
    setTeams(teams.filter(team => team.id !== teamId));
    toast.success(`Team "${teamToDelete?.name}" deleted successfully!`);
    setSelectedTeam(null);
  };

  const openManageModal = (team: any) => {
    setSelectedTeam(team);
    setManageModalOpen(true);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Team Management"
        description="Organize users into teams"
        actions={
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {team.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={team.brand === 'Real Estate' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'} variant="secondary">
                {team.brand}
              </Badge>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Members</span>
                  <span>{team.members}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Team Lead</span>
                  <span>{team.lead}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Performance</span>
                  <span className="text-green-600">{team.performance}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => openManageModal(team)}
              >
                Manage Team
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateTeam}
        availableUsers={availableUsers}
      />

      <ManageTeamModal
        isOpen={isManageModalOpen}
        onClose={() => {
          setManageModalOpen(false);
          setSelectedTeam(null);
        }}
        onUpdate={handleUpdateTeam}
        onDelete={handleDeleteTeam}
        teamData={selectedTeam}
        availableUsers={availableUsers}
      />
    </div>
  );
}