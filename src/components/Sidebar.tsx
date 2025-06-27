
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSectionChange?: (section: string) => void;
  activeSection?: string;
}

const Sidebar = ({ isOpen = true, onClose, onSectionChange, activeSection = 'overview' }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', section: 'overview' },
    { icon: Heart, label: 'Health Metrics', section: 'health-metrics' },
    { icon: Stethoscope, label: 'Symptoms', section: 'symptoms' },
    { icon: Calendar, label: 'Appointments', section: 'appointments' },
    { icon: Bell, label: 'Notifications', section: 'notifications', badge: 3 },
    { icon: Bell, label: 'Reminders', section: 'reminders' },
    { icon: ShoppingCart, label: 'Shopping List', section: 'shopping' },
    { icon: MessageSquare, label: 'AI Chat', section: 'chat' },
    { icon: FileText, label: 'Health Blog', section: 'blog' },
    { icon: Settings, label: 'Settings', section: 'settings' }
  ];

  const handleNavClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`
      fixed md:relative z-50 bg-white dark:bg-gray-800 shadow-lg h-full transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      w-64 md:w-64
    `}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Health Hub
          </h2>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="md:hidden hover:scale-110 transition-transform"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;
            return (
              <Button
                key={item.section}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start transition-all transform hover:scale-105 ${
                  isActive 
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-md' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600'
                }`}
                onClick={() => handleNavClick(item.section)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="text-xs ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
