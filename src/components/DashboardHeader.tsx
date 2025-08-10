
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userName: string;
}

const DashboardHeader = ({ onMenuClick, userName }: DashboardHeaderProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to auth page after successful sign out
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Hello, {userName}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome to your dashboard
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
