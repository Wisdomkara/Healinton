
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, LayoutDashboard, Users, Settings } from 'lucide-react';

const MobileNavigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Heart, label: 'Home', path: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="grid grid-cols-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-1 transition-colors ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-primary-600'
              }`}
            >
              <item.icon className={`h-5 w-5 mb-1 ${isActive ? 'text-primary-600' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
