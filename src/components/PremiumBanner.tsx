import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

const PremiumBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-primary-800/80"></div>
      <div className="relative p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Upgrade to Premium</h3>
            <p className="text-primary-100 text-sm">Unlock advanced health tracking features</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl mb-1">💊</div>
            <p className="text-xs text-primary-100">Medication Reminders</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">📊</div>
            <p className="text-xs text-primary-100">Advanced Analytics</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🏥</div>
            <p className="text-xs text-primary-100">Hospital Integration</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">👨‍⚕️</div>
            <p className="text-xs text-primary-100">Telehealth Access</p>
          </div>
        </div>

        <Button 
          className="w-full bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 transition-all duration-300"
        >
          Start Premium Trial - $9.99/month
        </Button>
      </div>
    </Card>
  );
};

export default PremiumBanner;
