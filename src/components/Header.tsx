
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Made clickable */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="bg-green-600 p-2 rounded-lg">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Healington
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
            About
          </Link>
          <Link to="/blog" className="text-sm font-medium hover:text-green-600 transition-colors">
            Blog
          </Link>
          <Link to="/premium" className="text-sm font-medium hover:text-green-600 transition-colors">
            Premium
          </Link>
          <Link to="/community" className="text-sm font-medium hover:text-green-600 transition-colors">
            Community
          </Link>
          <Link to="/health-insurance" className="text-sm font-medium hover:text-green-600 transition-colors">
            Insurance
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={handleSignOut} variant="ghost" size="sm">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-sm font-medium hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block text-sm font-medium hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className="block text-sm font-medium hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/premium" 
              className="block text-sm font-medium hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Premium
            </Link>
            <Link 
              to="/community" 
              className="block text-sm font-medium hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/health-insurance" 
              className="block text-sm font-medium hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Insurance
            </Link>
            
            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>
              
              {user ? (
                <div className="space-y-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  </Button>
                  <Button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }} 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
