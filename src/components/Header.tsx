
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Heart, User, Menu } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Healinton
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/blog" 
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Health Blog
            </Link>
            <Link 
              to="/premium" 
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Premium
            </Link>
            <Link 
              to="/faq" 
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              FAQ
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button variant="ghost" className="text-gray-600 dark:text-gray-300">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
