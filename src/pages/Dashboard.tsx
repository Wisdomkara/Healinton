
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
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { getMealPlanForIllness, getHealthTipsForIllness } from '@/utils/mealPlans';
import { Heart, Calendar, Bell, Clock, TrendingUp, Activity, Utensils } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
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
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Health Metrics</h2>
            <HealthMetricsForm onUpdate={fetchHealthMetrics} />
          </div>
        );
      case 'symptoms':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Symptom Logger</h2>
            <SymptomLogger />
          </div>
        );
      case 'appointments':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hospital Appointments</h2>
            <HospitalBooking />
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notification Center</h2>
            <NotificationCenter />
          </div>
        );
      case 'reminders':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Set Reminders</h2>
            <ReminderForm />
          </div>
        );
      case 'shopping':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shopping List</h2>
            <ShoppingList />
          </div>
        );
      case 'chat':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">AI Health Assistant</h2>
            <AIChat />
          </div>
        );
      case 'blog':
        return <HealthBlog />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedHealthMetrics.map((metric, index) => (
                <div key={index} className="transform hover:scale-105 transition-transform">
                  <HealthMetricCard {...metric} />
                </div>
              ))}
            </div>

            {/* Premium Banner */}
            <PremiumBanner />

            {/* Today's Meal Plan */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Utensils className="h-6 w-6 mr-2 text-green-600" />
                  Today's Meal Plan ({userProfile?.illness_type?.replace('_', ' ').toUpperCase() || 'HYPERTENSION'})
                </h2>
              </div>
              <div ref={mealsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['morning', 'afternoon', 'night'].map((time) => (
                  <Card key={time} className="healthcare-card hover:shadow-lg transition-all transform hover:scale-105">
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-3 capitalize text-green-700 dark:text-green-300">{time}</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                          <p className="text-sm font-medium text-green-800 dark:text-green-300">Low Budget</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {todaysMealPlan[time as keyof typeof todaysMealPlan].low}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">High Budget</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
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
            <Card className="healthcare-card hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-green-600" />
                  Health Tips for {userProfile?.illness_type?.replace('_', ' ').toUpperCase() || 'HYPERTENSION'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentHealthTips.map((tip, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions and AI Chat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="healthcare-card hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex-col space-y-2 hover:bg-green-50 hover:border-green-300 transition-all transform hover:scale-105"
                      onClick={() => setActiveSection('symptoms')}
                    >
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">Log Symptoms</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-all transform hover:scale-105"
                      onClick={() => setActiveSection('health-metrics')}
                    >
                      <Heart className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">Track Vitals</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex-col space-y-2 hover:bg-purple-50 hover:border-purple-300 transition-all transform hover:scale-105"
                      onClick={() => setActiveSection('reminders')}
                    >
                      <Bell className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium">Set Reminder</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex-col space-y-2 hover:bg-orange-50 hover:border-orange-300 transition-all transform hover:scale-105"
                      onClick={() => setActiveSection('appointments')}
                    >
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium">Book Checkup</span>
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
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <DashboardHeader 
        onMenuClick={() => setSidebarOpen(true)}
        userName={userName}
      />

      <div className="flex">
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
        <div className="flex-1 p-4 md:p-6">
          {/* Desktop Welcome Section */}
          <div ref={heroRef} className="mb-8 hidden md:block">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Good day, {userName}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Here's your health overview for today
            </p>
          </div>

          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
