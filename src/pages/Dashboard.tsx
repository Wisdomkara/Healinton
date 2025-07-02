import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import HealthMetricCard from '@/components/HealthMetricCard';
import HealthMetricsForm from '@/components/HealthMetricsForm';
import SymptomLogger from '@/components/SymptomLogger';
import HospitalBooking from '@/components/HospitalBooking';
import ReminderForm from '@/components/ReminderForm';
import ShoppingList from '@/components/ShoppingList';
import AIChat from '@/components/AIChat';
import HealthBlog from '@/components/HealthBlog';
import Settings from '@/components/Settings';
import NotificationCenter from '@/components/NotificationCenter';
import PremiumBanner from '@/components/PremiumBanner';
import RateUs from '@/components/RateUs';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { supabase } from '@/integrations/supabase/client';
import { getMealPlanForIllness, getHealthTipsForIllness } from '@/utils/mealPlans';
import { Heart, Calendar, Bell, Clock, TrendingUp, Activity, Utensils } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const heroRef = useScrollAnimation();
  const metricsRef = useStaggerAnimation();
  const mealsRef = useStaggerAnimation();
  
  const [userProfile, setUserProfile] = useState<any>(null);
  const [healthMetrics, setHealthMetrics] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      fetchHealthMetrics();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    setUserProfile(data);
  };

  const fetchHealthMetrics = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('health_metrics')
      .select('*')
      .eq('user_id', user.id)
      .order('recorded_at', { ascending: false })
      .limit(1);
    setHealthMetrics(data || []);
  };

  const latestMetrics = healthMetrics[0];
  const userName = userProfile ? `${userProfile.first_name}` : "User";

  const todaysMealPlan = userProfile?.illness_type 
    ? getMealPlanForIllness(userProfile.illness_type)
    : getMealPlanForIllness('hypertension');

  const currentHealthTips = userProfile?.illness_type 
    ? getHealthTipsForIllness(userProfile.illness_type)
    : getHealthTipsForIllness('hypertension');

  const displayedHealthMetrics = [
    {
      title: 'Blood Pressure',
      value: latestMetrics?.blood_pressure_systolic || '120',
      unit: `/${latestMetrics?.blood_pressure_diastolic || '80'} mmHg`,
      trend: 'stable' as const,
      icon: <Heart className="h-5 w-5 text-green-600" />
    },
    {
      title: 'Weight',
      value: latestMetrics?.weight?.toString() || '72.5',
      unit: 'kg',
      trend: 'stable' as const,
      icon: <Activity className="h-5 w-5 text-green-600" />
    },
    {
      title: 'Blood Sugar',
      value: latestMetrics?.blood_sugar?.toString() || '95',
      unit: 'mg/dL',
      trend: 'stable' as const,
      icon: <TrendingUp className="h-5 w-5 text-green-600" />
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'health-metrics':
        return (
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Health Metrics</h2>
            <HealthMetricsForm onUpdate={fetchHealthMetrics} />
          </div>
        );
      case 'symptoms':
        return (
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Symptom Logger</h2>
            <SymptomLogger />
          </div>
        );
      case 'appointments':
        return (
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Hospital Appointments</h2>
            <HospitalBooking />
          </div>
        );
      case 'notifications':
        return (
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Notification Center</h2>
            <NotificationCenter />
          </div>
        );
      case 'reminders':
        return (
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Set Reminders</h2>
            <ReminderForm />
          </div>
        );
      case 'shopping':
        return (
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Shopping List</h2>
            <ShoppingList />
          </div>
        );
      case 'chat':
        return (
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">AI Health Assistant</h2>
            <AIChat />
          </div>
        );
      case 'blog':
        return <HealthBlog />;
      case 'rate-us':
        return (
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Rate Your Experience</h2>
            <RateUs />
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="space-y-6 md:space-y-8 w-full">
            {/* Quick Stats */}
            <div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {displayedHealthMetrics.map((metric, index) => (
                <div key={index} className="transform hover:scale-105 transition-transform">
                  <HealthMetricCard {...metric} />
                </div>
              ))}
            </div>

            {/* Premium Banner - only show if not premium */}
            <PremiumBanner />

            {/* Today's Meal Plan */}
            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 space-y-2 sm:space-y-0">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Utensils className="h-5 w-5 md:h-6 md:w-6 mr-2 text-green-600" />
                  <span className="break-words">Today's Meal Plan ({userProfile?.illness_type?.replace('_', ' ').toUpperCase() || 'HYPERTENSION'})</span>
                </h2>
              </div>
              <div ref={mealsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {['morning', 'afternoon', 'night'].map((time) => (
                  <Card key={time} className="healthcare-card hover:shadow-lg transition-all transform hover:scale-105">
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-base md:text-lg mb-3 capitalize text-green-700 dark:text-green-300">{time}</h3>
                      <div className="space-y-2">
                        <div className="p-2 md:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                          <p className="text-xs md:text-sm font-medium text-green-800 dark:text-green-300">Low Budget</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 break-words">
                            {todaysMealPlan[time as keyof typeof todaysMealPlan].low}
                          </p>
                        </div>
                        <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                          <p className="text-xs md:text-sm font-medium text-blue-800 dark:text-blue-300">High Budget</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 break-words">
                            {todaysMealPlan[time as keyof typeof todaysMealPlan].high}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Health Tips */}
            <Card className="healthcare-card hover:shadow-lg transition-shadow w-full">
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
                  <Heart className="h-4 w-4 md:h-5 md:w-5 mr-2 text-green-600" />
                  <span className="break-words">Health Tips for {userProfile?.illness_type?.replace('_', ' ').toUpperCase() || 'HYPERTENSION'}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {currentHealthTips.map((tip, index) => (
                    <div key={index} className="p-3 md:p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-2 md:space-x-3">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mt-1 md:mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm leading-relaxed break-words">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions and AI Chat */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Card className="healthcare-card hover:shadow-lg transition-shadow">
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <Button 
                      variant="outline" 
                      className="h-auto p-3 md:p-4 flex-col space-y-1 md:space-y-2 hover:bg-green-50 hover:border-green-300 transition-all transform hover:scale-105"
                      onClick={() => setActiveSection('symptoms')}
                    >
                      <Clock className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                      <span className="text-xs md:text-sm font-medium text-center">Log Symptoms</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-3 md:p-4 flex-col space-y-1 md:space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-all transform hover:scale-105"
                      onClick={() => setActiveSection('health-metrics')}
                    >
                      <Heart className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                      <span className="text-xs md:text-sm font-medium text-center">Track Vitals</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-3 md:p-4 flex-col space-y-1 md:space-y-2 hover:bg-purple-50 hover:border-purple-300 transition-all transform hover:scale-105"
                      onClick={() => setActiveSection('reminders')}
                    >
                      <Bell className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                      <span className="text-xs md:text-sm font-medium text-center">Set Reminder</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-3 md:p-4 flex-col space-y-1 md:space-y-2 hover:bg-orange-50 hover:border-orange-300 transition-all transform hover:scale-105"
                      onClick={() => setActiveSection('appointments')}
                    >
                      <Calendar className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                      <span className="text-xs md:text-sm font-medium text-center">Book Checkup</span>
                    </Button>
                  </div>
                </div>
              </Card>
              <div className="transform hover:scale-105 transition-transform">
                <AIChat />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      {/* Mobile Header */}
      <DashboardHeader 
        onMenuClick={() => setSidebarOpen(true)}
        userName={userName}
      />

      <div className="flex w-full min-h-screen">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSectionChange={setActiveSection}
          activeSection={activeSection}
        />

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 w-full max-w-full min-w-0 p-3 md:p-4 lg:p-6">
          {/* Desktop Welcome Section */}
          <div ref={heroRef} className="mb-6 md:mb-8 hidden md:block">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Good day, {userName}! 👋
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Here's your health overview for today
            </p>
          </div>

          <div className="w-full max-w-full">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
