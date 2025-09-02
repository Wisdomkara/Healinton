import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { supabase } from '@/integrations/supabase/client';
import DashboardHeader from '@/components/DashboardHeader';
import PremiumDashboard from '@/components/PremiumDashboard';
import HealthStatsWidget from '@/components/HealthStatsWidget';
import DietInfoPanel from '@/components/DietInfoPanel';
import MotivationalQuote from '@/components/MotivationalQuote';
import AIAssistantWidget from '@/components/AIAssistantWidget';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import AppointmentSummary from '@/components/AppointmentSummary';
import DrugOrderSummary from '@/components/DrugOrderSummary';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Calendar, Pill, TrendingUp, Users, Bell, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { isPremium, loading: premiumLoading } = usePremium();
  const [profile, setProfile] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getUserName = () => {
    if (profile?.first_name) {
      return profile.first_name;
    }
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    return 'Friend';
  };

  if (authLoading || premiumLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPremium) {
    return <PremiumDashboard />;
  }

  const quickActions = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: 'Book Appointment',
      description: 'Schedule with healthcare providers',
      action: '/premium',
      color: 'bg-blue-500',
      premium: true
    },
    {
      icon: <Pill className="h-5 w-5" />,
      title: 'Drug Store',
      description: 'Order medications online',
      action: '/drugs',
      color: 'bg-green-500',
      premium: false
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Health Analytics',
      description: 'Track your progress',
      action: '/premium',
      color: 'bg-purple-500',
      premium: true
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: 'Health Blog',
      description: 'Read health articles',
      action: '/blog',
      color: 'bg-orange-500',
      premium: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DashboardHeader 
        onMenuClick={handleMenuClick}
        userName={getUserName()}
      />
      
      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* Welcome Section with Premium Upgrade */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Welcome back, {getUserName()}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Take control of your health journey with personalized insights and recommendations
          </p>
          
          {/* Premium Upgrade Banner for Basic Users */}
          {!isPremium && (
            <Card className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Crown className="h-6 w-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold text-green-800 dark:text-green-200">Upgrade to Premium</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Unlock advanced features, AI insights, and priority support</p>
                  </div>
                </div>
                <Link to="/premium">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to={isPremium ? "/appointments" : "/premium"} className="block">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 w-full hover:shadow-md transition-all relative"
              >
                {!isPremium && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                    <Crown className="h-3 w-3" />
                  </Badge>
                )}
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">Book Appointment</p>
                  <p className="text-xs text-gray-500">Schedule with healthcare providers</p>
                </div>
              </Button>
            </Link>

            <Link to="/drugs" className="block">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 w-full hover:shadow-md transition-all"
              >
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <Pill className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">Drug Store</p>
                  <p className="text-xs text-gray-500">Order medications online</p>
                </div>
              </Button>
            </Link>

            <Link to={isPremium ? "/analytics" : "/premium"} className="block">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 w-full hover:shadow-md transition-all relative"
              >
                {!isPremium && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                    <Crown className="h-3 w-3" />
                  </Badge>
                )}
                <div className="p-2 rounded-lg bg-purple-500 text-white">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">Health Analytics</p>
                  <p className="text-xs text-gray-500">Track your progress</p>
                </div>
              </Button>
            </Link>

            <Link to="/blog" className="block">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 w-full hover:shadow-md transition-all"
              >
                <div className="p-2 rounded-lg bg-orange-500 text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">Health Blog</p>
                  <p className="text-xs text-gray-500">Read health articles</p>
                </div>
              </Button>
            </Link>
          </div>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Health Stats */}
            <HealthStatsWidget />
            
            {/* Diet Information - Available for ALL users */}
            <DietInfoPanel />
            
            {/* Motivational Quote */}
            <MotivationalQuote />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* AI Assistant */}
            <AIAssistantWidget />
            
            {/* Subscription Status */}
            <SubscriptionStatus />
            
            {/* Recent Activity */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Bell className="h-5 w-5 text-blue-600 mr-2" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Welcome to Healinton!</p>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Profile created successfully</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              Appointment Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Book and manage appointments with healthcare providers seamlessly.
            </p>
            {isPremium ? (
              <Link to="/appointments">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Book Appointment
                </Button>
              </Link>
            ) : (
              <Link to="/premium">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade for Access
                </Button>
              </Link>
            )}
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Pill className="h-5 w-5 text-blue-600 mr-2" />
              Medication Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Order medications, set reminders, and track your prescriptions.
            </p>
            <Link to="/drugs">
              <Button size="sm" variant="outline">
                Browse Medications
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
