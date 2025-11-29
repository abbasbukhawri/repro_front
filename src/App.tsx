import { useState } from 'react';
import { CRMProvider } from './contexts/CRMContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Toaster } from './components/ui/sonner';
import { Sidebar } from './components/layout/Sidebar';
import { MobileSidebar } from './components/layout/MobileSidebar';
import { TopBar } from './components/layout/TopBar';
import { RealEstateDashboard } from './pages/real-estate/Dashboard';
import { BusinessSetupDashboard } from './pages/business-setup/Dashboard';
import { LeadsList } from './pages/shared/LeadsList';
import { LeadDetails } from './pages/shared/LeadDetails';
import { DealsPipeline } from './pages/real-estate/DealsPipeline';
import { ServiceCasePipeline } from './pages/business-setup/ServiceCasePipeline';
import { PropertiesList } from './pages/real-estate/PropertiesList';
import { PropertyDetails } from './pages/real-estate/PropertyDetails';
import { ViewingsPage } from './pages/real-estate/ViewingsPage';
import { FollowUpManager } from './pages/real-estate/FollowUpManager';
import { PledgesPage } from './pages/real-estate/PledgesPage';
import { DocumentChecklist } from './pages/business-setup/DocumentChecklist';
import { RenewalManager } from './pages/business-setup/RenewalManager';
import { PROOperations } from './pages/business-setup/PROOperations';
import { TasksPage } from './pages/shared/TasksPage';
import { NotificationsCenter } from './pages/shared/NotificationsCenter';
import { CallLogs } from './pages/shared/CallLogs';
import { EmailLogs } from './pages/shared/EmailLogs';
import { UserManagement } from './pages/admin/UserManagement';
import { UserAnalytics } from './pages/admin/UserAnalytics';
import { TeamManagement } from './pages/admin/TeamManagement';
import { Settings } from './pages/admin/Settings';
import { ActivityLog } from './pages/shared/ActivityLog';
import { Reports } from './pages/shared/Reports';
import { ProfilePage } from './pages/shared/ProfilePage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ContactManagement } from './pages/shared/ContactManagement';

export type BrandType = 'real-estate' | 'business-setup';

const NotFound = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-6xl mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page not found</p>
      <button 
        onClick={() => onNavigate('re-dashboard')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('re-dashboard');
  const [selectedBrand, setSelectedBrand] = useState<BrandType>('real-estate');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      // Real Estate Pages
      case 're-dashboard':
        return <RealEstateDashboard onNavigate={setCurrentPage} />;
      case 're-leads':
        return <LeadsList brand="real-estate" onNavigate={setCurrentPage} onSelectLead={setSelectedLeadId} />;
      case 're-lead-details':
        return <LeadDetails brand="real-estate" leadId={selectedLeadId} onNavigate={setCurrentPage} />;
      case 're-pipeline':
        return <DealsPipeline onNavigate={setCurrentPage} />;
      case 're-properties':
        return <PropertiesList onNavigate={setCurrentPage} onSelectProperty={setSelectedPropertyId} />;
      case 're-property-details':
        return <PropertyDetails propertyId={selectedPropertyId} onNavigate={setCurrentPage} />;
      case 're-viewings':
        return <ViewingsPage onNavigate={setCurrentPage} />;
      case 're-followups':
        return <FollowUpManager onNavigate={setCurrentPage} />;
      case 're-pledges':
        return <PledgesPage onNavigate={setCurrentPage} />;
      case 're-reports':
        return <Reports brand="real-estate" onNavigate={setCurrentPage} />;

      // Business Setup Pages
      case 'bs-dashboard':
        return <BusinessSetupDashboard onNavigate={setCurrentPage} />;
      case 'bs-leads':
        return <LeadsList brand="business-setup" onNavigate={setCurrentPage} onSelectLead={setSelectedLeadId} />;
      case 'bs-lead-details':
        return <LeadDetails brand="business-setup" leadId={selectedLeadId} onNavigate={setCurrentPage} />;
      case 'bs-pipeline':
        return <ServiceCasePipeline onNavigate={setCurrentPage} />;
      case 'bs-documents':
        return <DocumentChecklist onNavigate={setCurrentPage} />;
      case 'bs-renewals':
        return <RenewalManager onNavigate={setCurrentPage} />;
      case 'bs-pro-ops':
        return <PROOperations onNavigate={setCurrentPage} />;
      case 'bs-reports':
        return <Reports brand="business-setup" onNavigate={setCurrentPage} />;

      // Shared Pages
      case 'tasks':
        return <TasksPage brand={selectedBrand} onNavigate={setCurrentPage} />;
      case 'notifications':
        return <NotificationsCenter onNavigate={setCurrentPage} />;
      case 'calls':
        return <CallLogs brand={selectedBrand} onNavigate={setCurrentPage} />;
      case 'emails':
        return <EmailLogs brand={selectedBrand} onNavigate={setCurrentPage} />;
      case 'activity':
        return <ActivityLog brand={selectedBrand} onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentPage} />;
        case 'contacts':
        return <ContactManagement onNavigate={setCurrentPage}  />;

      // Admin Pages
      case 'users':
        return <UserManagement onNavigate={setCurrentPage} />;
      case 'user-analytics':
        return <UserAnalytics onNavigate={setCurrentPage} />;
      case 'teams':
        return <TeamManagement onNavigate={setCurrentPage} />;
      case 'settings':
        return <Settings onNavigate={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode} />;

      default:
        return <NotFound onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Provider  store={store}  >
    <CRMProvider>
      <BrandingProvider>
        <SettingsProvider>
          <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {/* Desktop Sidebar */}
            <Sidebar 
              currentPage={currentPage} 
              onNavigate={setCurrentPage}
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
            />

            {/* Mobile Sidebar */}
            <MobileSidebar
              isOpen={isMobileSidebarOpen}
              onClose={() => setIsMobileSidebarOpen(false)}
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
            />

            <div className="lg:ml-64">
              <TopBar 
                onNavigate={setCurrentPage}
                onMenuClick={() => setIsMobileSidebarOpen(true)}
              />
              <main className="pt-16">
                {renderPage()}
              </main>
            </div>

            {/* Toast Notifications - Top Right */}
          
          </div>
        </SettingsProvider>
      </BrandingProvider>
    </CRMProvider>
    </Provider>
  );
}