
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
  LogOut
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
    { icon: Calendar, label: 'Appointments', section: 'appointments', isPremium: false },
    { icon: Bell, label: 'Notifications', section: 'notifications', badge: 3, isPremium: false },
    { icon: Bell, label: 'Reminders', section: 'reminders', isPremium: false },
    { icon: Utensils, label: 'Meal Tracker', section: 'meal-tracker', isPremium: false },
    { icon: Calendar, label: 'Weekly Calendar', section: 'weekly-calendar', isPremium: false },
    { icon: Crown, label: 'Admin Premium', section: 'admin-premium', isPremium: false },
    { icon: ShoppingCart, label: 'Shopping List', section: 'shopping', isPremium: false },
    { icon: Pill, label: 'Drug Store', section: 'drugs', isPremium: false },
    { icon: Activity, label: 'Drug Orders', section: 'drug-orders', isPremium: false },
    { icon: Building2, label: 'My Hospitals', section: 'hospital-info', isPremium: false },
    { icon: MessageSquare, label: 'AI Chat', section: 'chat', isPremium: false },
    { icon: FileText, label: 'Health Blog', section: 'blog', isPremium: false },
    { icon: Shield, label: 'Health Insurance', section: 'health-insurance', isPremium: false },
    { icon: Star, label: 'Rate Us', section: 'rate-us', isPremium: false },
    { icon: Info, label: 'About', section: 'about', isPremium: false },
    { icon: Settings, label: 'Profile', section: 'profile', isPremium: false }
  ];

  const handleNavClick = (section: string, itemIsPremium: boolean) => {
    // All features are free until November 30, 2025, so no premium checks needed
    
    if (section === 'health-insurance') {
      window.location.href = '/health-insurance';
      return;
    }

    if (section === 'about') {
      window.location.href = '/about';
      return;
    }

    if (section === 'profile') {
      window.location.href = '/profile';
      return;
    }

    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Healinton Hub
        </h2>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Back to Home Button */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 border-blue-200 dark:border-blue-800"
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
            return (
              <Button
                key={item.section}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-10 ${
                  isActive 
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400'
                }`}
                onClick={() => handleNavClick(item.section, item.isPremium)}
              >
                <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="flex-1 text-left truncate">{item.label}</span>
                {/* Remove premium crown since everything is free until Nov 30, 2025 */}
                {item.badge && (
                  <Badge variant="destructive" className="text-xs ml-1 flex-shrink-0">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* User info and sign out - Desktop only */}
      <div className="hidden lg:block p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.user_metadata?.first_name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.user_metadata?.first_name || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
