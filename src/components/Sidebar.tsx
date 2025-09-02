
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { 
  Home, 
  Heart, 
  Calendar, 
  Bell, 
  ShoppingCart, 
  MessageSquare, 
  FileText, 
  Settings,
  Stethoscope,
  X,
  Crown,
  Shield,
  Info,
  Star,
  ArrowLeft,
  Utensils,
  Pill,
  Building2,
  Activity,
  LogOut,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSectionChange?: (section: string) => void;
  activeSection?: string;
}

const Sidebar = ({ isOpen = true, onClose, onSectionChange, activeSection = 'overview' }: SidebarProps) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isPremium } = usePremium();

  const navItems = [
    { icon: Home, label: 'Dashboard', section: 'overview', isPremium: false },
    { icon: Heart, label: 'Health Metrics', section: 'health-metrics', isPremium: false },
    { icon: Stethoscope, label: 'Symptoms', section: 'symptoms', isPremium: false },
    { icon: Calendar, label: 'Appointments', section: 'appointments', isPremium: true },
    { icon: Bell, label: 'Notifications', section: 'notifications', badge: 3, isPremium: false },
    { icon: Bell, label: 'Reminders', section: 'reminders', isPremium: false },
    { icon: Utensils, label: 'Meal Tracker', section: 'meal-tracker', isPremium: false },
    { icon: ShoppingCart, label: 'Shopping List', section: 'shopping', isPremium: false },
    { icon: Pill, label: 'Drug Store', section: 'drugs', isPremium: false },
    { icon: Building2, label: 'My Hospitals', section: 'hospital-info', isPremium: true },
    { icon: MessageSquare, label: 'AI Chat', section: 'chat', isPremium: false },
    { icon: FileText, label: 'Health Blog', section: 'blog', isPremium: false },
    { icon: Shield, label: 'Health Insurance', section: 'health-insurance', isPremium: false },
    { icon: Star, label: 'Rate Us', section: 'rate-us', isPremium: false },
    { icon: Info, label: 'About', section: 'about', isPremium: false },
    { icon: Settings, label: 'Settings', section: 'settings', isPremium: false }
  ];

  const handleNavClick = (section: string, itemIsPremium: boolean) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-white shadow-lg border-r border-green-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-green-200 bg-gradient-to-r from-green-100 to-green-50">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold text-green-800">
            Healinton Hub
          </h2>
          {isPremium && <Crown className="h-5 w-5 text-yellow-500 animate-pulse" />}
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden hover:bg-green-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Premium Upgrade Banner - Only for Basic Users */}
      {!isPremium && (
        <div className="p-4 border-b border-green-200">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg text-center">
            <Sparkles className="h-5 w-5 mx-auto mb-2 animate-pulse" />
            <p className="text-sm font-semibold mb-2">Upgrade to Premium!</p>
            <Link to="/premium">
              <Button size="sm" className="bg-white text-green-600 hover:bg-gray-100 text-xs">
                Get Premium - FREE until Nov 30th
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Premium Status Display - Only for Premium Users */}
      {isPremium && (
        <div className="p-4 border-b border-green-200">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-3 rounded-lg text-center">
            <Crown className="h-5 w-5 mx-auto mb-2 animate-pulse" />
            <p className="text-sm font-semibold">Premium Active</p>
            <p className="text-xs text-yellow-100">All features unlocked</p>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="p-4 border-b border-green-200">
        <Link to="/">
          <Button
            variant="outline"
            className="w-full justify-start text-green-700 hover:bg-green-50 hover:text-green-800 border-green-200 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-3" />
            <span className="flex-1 text-left">Back to Home</span>
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;
            const showPremiumBadge = item.isPremium && !isPremium;
            
            return (
              <Button
                key={item.section}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-10 transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-md transform scale-105' 
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700 hover:scale-105'
                }`}
                onClick={() => handleNavClick(item.section, item.isPremium)}
              >
                <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="flex-1 text-left truncate">{item.label}</span>
                {showPremiumBadge && (
                  <Crown className="h-3 w-3 text-yellow-500 ml-1 flex-shrink-0 animate-pulse" />
                )}
                {item.badge && (
                  <Badge variant="destructive" className="text-xs ml-1 flex-shrink-0 animate-pulse">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* User info and sign out */}
      <div className="p-4 border-t border-green-200 bg-green-50">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.user_metadata?.first_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate flex items-center">
              {user?.email}
              {isPremium && <Crown className="h-3 w-3 text-yellow-500 ml-1 animate-pulse" />}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-green-100 transition-all duration-200"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
