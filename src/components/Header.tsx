
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { Heart, User, Settings, Bell } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="healthcare-gradient p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Carevital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-muted-foreground hover:text-primary-600 transition-colors font-medium">
              Dashboard
            </Link>
            <Link to="/community" className="text-muted-foreground hover:text-primary-600 transition-colors font-medium">
              Community
            </Link>
            <Link to="/premium" className="text-muted-foreground hover:text-primary-600 transition-colors font-medium">
              Premium
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/auth">
              <Button className="healthcare-button">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
