
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { Heart, User, Menu, X, LogOut, Bell } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 shadow-sm">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-all transform hover:scale-105 flex-shrink-0">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-xl shadow-md">
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Healinton
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {user ? (
              <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
                Dashboard
              </Link>
            ) : (
              <Link to="/auth" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
                Dashboard
              </Link>
            )}
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
              About
            </Link>
            <Link to="/health-insurance" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
              Health Insurance
            </Link>
            <Link to="/community" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
              Community
            </Link>
            <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
              Blog
            </Link>
            <Link to="/premium" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
              Premium
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <ThemeToggle />
            
            {user ? (
              <>
                {/* Notifications for authenticated users */}
                <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Bell className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 md:h-3 md:w-3 bg-red-500 rounded-full"></span>
                </Button>
                
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  size="sm"
                  className="hidden md:flex hover:scale-105 transition-transform text-xs px-2"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Link to="/auth">
                  <Button className="bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all shadow-md hover:shadow-lg text-xs px-3 py-1 h-8">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:scale-110 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu with smooth animations */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t bg-white dark:bg-gray-900 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg mx-2 transform hover:scale-[1.02]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  to="/auth" 
                  className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg mx-2 transform hover:scale-[1.02]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link 
                to="/about" 
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg mx-2 transform hover:scale-[1.02]"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/health-insurance" 
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg mx-2 transform hover:scale-[1.02]"
                onClick={() => setIsMenuOpen(false)}
              >
                Health Insurance
              </Link>
              <Link 
                to="/community" 
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg mx-2 transform hover:scale-[1.02]"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                to="/blog" 
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg mx-2 transform hover:scale-[1.02]"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/premium" 
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg mx-2 transform hover:scale-[1.02]"
                onClick={() => setIsMenuOpen(false)}
              >
                Premium
              </Link>
              
              {user && (
                <Button 
                  onClick={handleSignOut}
                  variant="ghost"
                  className="mx-4 mt-2 justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
