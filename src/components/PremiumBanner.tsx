
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { Pill, BarChart, Hospital, Key } from "lucide-react";

const PremiumBanner = () => {
  const { user } = useAuth();
  const { isPremium, loading } = usePremium();
  
  // Don't show banner if user is premium or still loading
  if (loading || isPremium) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-primary-800/80"></div>
      <div className="relative p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Crown className="h-6 w-6 text-gray-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Get Premium - FREE until November 30th!</h3>
            <p className="text-primary-100 text-sm">Unlock advanced health features and AI insights with Healinton</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col items-center text-center">
            <Pill className="mb-2 text-primary-100" size={30} strokeWidth={1.5} />
            <p className="text-xs text-primary-100">Medication Reminders</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <BarChart size={30} className="text-primary-100 mb-2" strokeWidth={1.5} />
            <p className="text-xs text-primary-100">Advanced Analytics</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Hospital size={30} className="text-primary-100 mb-2" strokeWidth={1.5} />
            <p className="text-xs text-primary-100">Hospital Integration</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Key size={30} className="text-primary-100 mb-2" strokeWidth={1.5} />
            <p className="text-xs text-primary-100">Telehealth Access</p>
          </div>
        </div>

        <Link to="/premium">
          <Button 
            className="w-full bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 transition-all duration-300"
          >
            Get Premium - FREE until November 30th
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default PremiumBanner;
