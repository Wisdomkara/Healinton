
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Clock, Stethoscope } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-xl shadow-md">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-white">
                Healinton
              </span>
            </div>
            <p className="text-green-100 leading-relaxed">
              Your trusted partner in managing chronic conditions with personalized care and support.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/dashboard" className="block text-green-100 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/community" className="block text-green-100 hover:text-white transition-colors">
                Community
              </Link>
              <Link to="/blog" className="block text-green-100 hover:text-white transition-colors">
                Health Blog
              </Link>
              <Link to="/premium" className="block text-green-100 hover:text-white transition-colors">
                Premium Plans
              </Link>
            </div>
          </div>

          {/* Medical Professional Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Stethoscope className="h-5 w-5 mr-2" />
              Medical Support
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+1-800-HEALINTON" 
                className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+1-800-HEALINTON</span>
              </a>
              <a 
                href="mailto:medical@healinton.com" 
                className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>medical@healinton.com</span>
              </a>
              <div className="flex items-center space-x-2 text-green-100">
                <Clock className="h-4 w-4" />
                <span>24/7 Emergency Support</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 text-green-100">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>123 Healthcare Ave, Medical District, NY 10001</span>
              </div>
              <a 
                href="tel:+1-555-0123" 
                className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+1-555-0123</span>
              </a>
              <a 
                href="mailto:support@healinton.com" 
                className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>support@healinton.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-100 text-sm">
            © 2024 Healinton. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-green-100 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-green-100 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="text-green-100 hover:text-white text-sm transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
