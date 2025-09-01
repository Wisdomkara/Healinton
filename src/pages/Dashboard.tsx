
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardOverview from '@/components/DashboardOverview';
import PremiumDashboard from '@/components/PremiumDashboard';
import PremiumBanner from '@/components/PremiumBanner';
import IllnessSettings from '@/components/IllnessSettings';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { isPremium, loading: premiumLoading } = usePremium();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (premiumLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleMenuClick = () => {
    // This can be used for mobile sidebar toggle if needed
    console.log('Menu clicked');
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <DashboardHeader 
          onMenuClick={handleMenuClick}
          userName={userName}
        />
        
        <div className="grid gap-6">
          {!isPremium && <PremiumBanner />}
          
          <div className="grid md:grid-cols-2 gap-6">
            <IllnessSettings />
            {isPremium && <SubscriptionStatus />}
          </div>
          
          {isPremium ? <PremiumDashboard /> : <DashboardOverview />}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
