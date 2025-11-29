import { Home, Users, Building2, FileText, Calendar, CheckSquare, Bell, Phone, Mail, BarChart3, Settings, User, Activity, Clock, AlertCircle, Briefcase, FileCheck, RefreshCw, UserCog, DollarSign, Contact } from 'lucide-react';
import type { BrandType } from '../../App';
import { useBranding } from '../../contexts/BrandingContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  selectedBrand: BrandType;
  onBrandChange: (brand: BrandType) => void;
}

// Helper function to adjust color lightness
const adjustColor = (color: string, percent: number) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
};

export function Sidebar({ currentPage, onNavigate, selectedBrand, onBrandChange }: SidebarProps) {
  const { brandColors } = useBranding();
  
  // Get the appropriate brand color
  const primaryColor = selectedBrand === 'real-estate' ? brandColors.realEstate : brandColors.businessSetup;
  const lightColor = adjustColor(primaryColor, 90); // Lighter version for backgrounds
  const darkColor = adjustColor(primaryColor, -10); // Darker version for hover states
  
  const NavItem = ({ icon: Icon, label, page, count }: { icon: any; label: string; page: string; count?: number }) => {
    const isActive = currentPage === page;
    const isRealEstate = selectedBrand === 'real-estate';
    
    return (
      <button
        onClick={() => onNavigate(page)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
          isActive
            ? isRealEstate
              ? 'text-white shadow-sm'
              : 'bg-gray-700 text-white shadow-sm'
            : isRealEstate
              ? 'text-gray-700 hover:bg-gray-100'
              : 'text-gray-300 hover:bg-gray-700/50'
        }`}
        style={isActive && isRealEstate ? { backgroundColor: primaryColor } : {}}
      >
        <Icon className={`w-[18px] h-[18px] transition-transform group-hover:scale-110`} strokeWidth={1.5} />
        <span className="flex-1 text-left text-[13px] font-medium">{label}</span>
        {count !== undefined && (
          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
            isActive 
              ? isRealEstate ? 'bg-white/20 text-white' : 'bg-gray-600 text-white'
              : isRealEstate ? 'bg-gray-200 text-gray-600' : 'bg-gray-700 text-gray-300'
          }`}>
            {count}
          </span>
        )}
      </button>
    );
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    const isRealEstate = selectedBrand === 'real-estate';
    return (
      <div className={`px-3 mt-8 mb-3 text-[11px] uppercase tracking-wider font-semibold ${
        isRealEstate ? 'text-gray-500' : 'text-gray-400'
      }`}>
        {children}
      </div>
    );
  };

  const sidebarBg = selectedBrand === 'real-estate' 
    ? 'bg-white border-r border-gray-200' 
    : 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800';

  return (
    <aside className={`hidden lg:block fixed left-0 top-0 h-screen w-64 ${sidebarBg} shadow-2xl overflow-y-auto`}>
      {/* Logo & Brand Switcher */}
      <div className={`p-6 border-b ${selectedBrand === 'real-estate' ? 'border-gray-200' : 'border-white/10'}`}>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
              style={{ 
                background: selectedBrand === 'real-estate' 
                  ? `linear-gradient(to bottom right, ${primaryColor}, ${adjustColor(primaryColor, -10)})`
                  : `linear-gradient(to bottom right, ${primaryColor}, ${adjustColor(primaryColor, -10)})`
              }}
            >
              <Building2 className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <h1 className={`text-xl font-semibold tracking-tight ${
              selectedBrand === 'real-estate' ? 'text-gray-900' : 'text-white'
            }`}>
              DualCRM
            </h1>
          </div>
          <p className={`text-xs ml-10 font-medium ${
            selectedBrand === 'real-estate' ? 'text-gray-500' : 'text-gray-400'
          }`}>Enterprise Suite</p>
        </div>

        {/* Brand Switcher */}
        <div className={`flex gap-2 p-1.5 rounded-xl border ${
          selectedBrand === 'real-estate' 
            ? 'bg-gray-100 border-gray-200' 
            : 'bg-black/20 backdrop-blur-sm border-white/10'
        }`}>
          <button
            onClick={() => {
              onBrandChange('real-estate');
              onNavigate('re-dashboard');
            }}
            className={`flex-1 px-3 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
              selectedBrand === 'real-estate'
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            style={selectedBrand === 'real-estate' ? { 
              background: `linear-gradient(to right, ${brandColors.realEstate}, ${adjustColor(brandColors.realEstate, -5)})`,
              boxShadow: `0 10px 15px -3px ${brandColors.realEstate}30`
            } : {}}
          >
            REAL ESTATE
          </button>
          <button
            onClick={() => {
              onBrandChange('business-setup');
              onNavigate('bs-dashboard');
            }}
            className={`flex-1 px-3 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
              selectedBrand === 'business-setup'
                ? 'text-white shadow-lg'
                : selectedBrand === 'real-estate'
                  ? 'text-gray-600 hover:bg-gray-200'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
            style={selectedBrand === 'business-setup' ? { 
              background: `linear-gradient(to right, ${brandColors.businessSetup}, ${adjustColor(brandColors.businessSetup, -5)})`,
              boxShadow: `0 10px 15px -3px ${brandColors.businessSetup}30`
            } : {}}
          >
            BUSINESS
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {selectedBrand === 'real-estate' ? (
          <>
            <SectionTitle>Real Estate</SectionTitle>
            <div className="space-y-1">
              <NavItem icon={Home} label="Dashboard" page="re-dashboard" />
              <NavItem icon={Users} label="Leads" page="re-leads" count={234} />
              <NavItem icon={Building2} label="Properties" page="re-properties" count={89} />
              <NavItem icon={BarChart3} label="Won Deals" page="re-pipeline" />
              <NavItem icon={DollarSign} label="Pledges" page="re-pledges" count={18} />
              <NavItem icon={Calendar} label="Viewings" page="re-viewings" count={12} />
              <NavItem icon={Clock} label="Follow-ups" page="re-followups" count={45} />
              <NavItem icon={BarChart3} label="Reports" page="re-reports" />
            </div>
          </>
        ) : (
          <>
            <SectionTitle>Business Setup</SectionTitle>
            <div className="space-y-1">
              <NavItem icon={Home} label="Dashboard" page="bs-dashboard" />
              <NavItem icon={Users} label="Inquiries" page="bs-leads" count={156} />
              <NavItem icon={Briefcase} label="Service Pipeline" page="bs-pipeline" />
              <NavItem icon={FileCheck} label="Documents" page="bs-documents" count={23} />
              <NavItem icon={RefreshCw} label="Renewals" page="bs-renewals" count={8} />
              <NavItem icon={UserCog} label="PRO Operations" page="bs-pro-ops" />
              <NavItem icon={BarChart3} label="Reports" page="bs-reports" />
            </div>
          </>
        )}

        <SectionTitle>Shared Tools</SectionTitle>
        <div className="space-y-1">
          <NavItem icon={CheckSquare} label="Tasks" page="tasks" count={18} />
          <NavItem icon={Phone} label="Call Logs" page="calls" />
          <NavItem icon={Mail} label="Email Logs" page="emails" />
          <NavItem icon={Bell} label="Notifications" page="notifications" count={5} />
          <NavItem icon={Activity} label="Activity Log" page="activity" />
          <NavItem icon={Contact} label="Contacts" page="contacts" count={3} />
        </div>

        <SectionTitle>Administration</SectionTitle>
        <div className="space-y-1">
          <NavItem icon={BarChart3} label="User Analytics" page="user-analytics" />
          <NavItem icon={User} label="Users" page="users" />
          <NavItem icon={Users} label="Teams" page="teams" />
          <NavItem icon={Settings} label="Settings" page="settings" />
        </div>
      </nav>
    </aside>
  );
}