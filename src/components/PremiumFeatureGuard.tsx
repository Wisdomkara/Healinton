import React from 'react';
import { usePremium } from '@/hooks/usePremium';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PremiumFeatureGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  featureName?: string;
}

const PremiumFeatureGuard = ({ 
  children, 
  fallback, 
  featureName = "feature" 
}: PremiumFeatureGuardProps) => {
  const { isPremium, loading } = usePremium();

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </Card>
    );
  }

  // If user is premium, show the feature
  if (isPremium) {
    return <>{children}</>;
  }

  // If fallback is provided, show it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default premium upgrade prompt
  return (
    <Card className="p-6 border-2 border-dashed border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <Lock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Premium Feature
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Unlock {featureName} and all premium features with our monthly subscription.
          </p>
          <Link to="/premium">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PremiumFeatureGuard;