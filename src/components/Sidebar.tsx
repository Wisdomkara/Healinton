
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  TrendingUp
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Heart, label: 'Health Metrics', path: '/dashboard/health' },
    { icon: Stethoscope, label: 'Symptoms', path: '/dashboard/symptoms' },
    { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
    { icon: Bell, label: 'Reminders', path: '/dashboard/reminders' },
    { icon: ShoppingCart, label: 'Shopping List', path: '/dashboard/shopping' },
    { icon: MessageSquare, label: 'AI Chat', path: '/dashboard/chat' },
    { icon: FileText, label: 'Health Blog', path: '/dashboard/blog' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Health Hub
        </h2>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
