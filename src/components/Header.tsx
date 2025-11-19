
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import { Plus, User, Menu, ShoppingCart } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();
  const cartItemCount = getTotalItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Plus className="h-8 w-8 text-green-600" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Healinton
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/blog" 
              className={`transition-colors ${
                isActive('/blog')
                  ? 'text-green-600 dark:text-green-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              Health Blog
            </Link>
            <Link 
              to="/premium" 
              className={`transition-colors ${
                isActive('/premium')
                  ? 'text-green-600 dark:text-green-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              Premium
            </Link>
            <Link 
              to="/faq" 
              className={`transition-colors ${
                isActive('/faq')
                  ? 'text-green-600 dark:text-green-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              FAQ
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${
                isActive('/about')
                  ? 'text-green-600 dark:text-green-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              About
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {user && (
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-600 text-white text-xs"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}
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
