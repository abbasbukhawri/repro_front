import { Search, Bell, Settings, User, Menu, HelpCircle, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface TopBarProps {
  onNavigate: (page: string) => void;
  onMenuClick: () => void;
}

export function TopBar({ onNavigate, onMenuClick }: TopBarProps) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b border-gray-200/60 z-30 backdrop-blur-sm bg-white/80">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
        >
          <Menu className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
        </button>

        {/* Logo on Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
            <span className="text-white text-xs font-bold">DC</span>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-2xl">
          <button
            onClick={() => onNavigate('search')}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-50/80 border border-gray-200/60 rounded-xl hover:bg-gray-100/80 hover:border-gray-300 transition-all duration-200 group"
          >
            <Search className="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
            <span className="text-sm text-gray-500 font-normal hidden lg:inline">Search leads, properties, tasks...</span>
            <span className="text-sm text-gray-500 font-normal lg:hidden">Search...</span>
            <div className="ml-auto hidden lg:flex items-center gap-1">
              <kbd className="px-2 py-1 text-[11px] font-semibold bg-white border border-gray-200 rounded-md text-gray-500 shadow-sm">
                ⌘
              </kbd>
              <kbd className="px-2 py-1 text-[11px] font-semibold bg-white border border-gray-200 rounded-md text-gray-500 shadow-sm">
                K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 lg:gap-2">
          {/* Search Icon (Mobile) */}
          <button
            onClick={() => onNavigate('search')}
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            <Search className="w-[18px] h-[18px] text-gray-600" strokeWidth={1.5} />
          </button>

          {/* Help */}
          <button 
            className="hidden lg:block p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
            title="Help & Support"
          >
            <HelpCircle className="w-[18px] h-[18px] text-gray-600 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} />
          </button>

          {/* Notifications */}
          <button
            onClick={() => onNavigate('notifications')}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
            title="Notifications"
          >
            <Bell className="w-[18px] h-[18px] text-gray-600 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Divider */}
          <div className="hidden lg:block h-8 w-px bg-gray-200 mx-2"></div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 lg:gap-3 p-1.5 lg:pr-4 rounded-xl hover:bg-gray-100 transition-all duration-200 group">
                <Avatar className="h-8 w-8 lg:h-9 lg:w-9 ring-2 ring-gray-200 ring-offset-2">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-semibold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden lg:block">
                  <div className="text-sm font-semibold text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500 font-medium">Super Admin</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuLabel className="text-xs text-gray-500 uppercase tracking-wider font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('profile')} className="rounded-lg cursor-pointer">
                <User className="mr-3 h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('settings')} className="rounded-lg cursor-pointer">
                <Settings className="mr-3 h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 rounded-lg cursor-pointer">
                <LogOut className="mr-3 h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm font-medium">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
