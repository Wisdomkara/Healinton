
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { Heart, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-all transform hover:scale-105">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-xl shadow-md">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Carevital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
              Dashboard
            </Link>
            <Link to="/community" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
              Community
            </Link>
            <Link to="/premium" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium hover:scale-105 transform">
              Premium
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform hover:bg-gray-100 dark:hover:bg-gray-800">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/auth">
              <Button className="bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all shadow-md hover:shadow-lg">
                Get Started
              </Button>
            </Link>
            
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white dark:bg-gray-900 py-4 animate-slide-up">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/dashboard" 
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/community" 
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                to="/premium" 
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Premium
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
