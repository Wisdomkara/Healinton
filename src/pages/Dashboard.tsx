
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import HealthMetricCard from '@/components/HealthMetricCard';
import HealthMetricsForm from '@/components/HealthMetricsForm';
import SymptomLogger from '@/components/SymptomLogger';
import HospitalBooking from '@/components/HospitalBooking';
import ReminderForm from '@/components/ReminderForm';
import ShoppingList from '@/components/ShoppingList';
import AIChat from '@/components/AIChat';
import PremiumBanner from '@/components/PremiumBanner';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Calendar, Bell, Clock, Settings, TrendingUp, Activity, Apple, Utensils } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const heroRef = useScrollAnimation();
  const metricsRef = useStaggerAnimation();
  const mealsRef = useStaggerAnimation();
  
  const [userProfile, setUserProfile] = useState<any>(null);
  const [healthMetrics, setHealthMetrics] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState('overview');

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
  const userName = userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : "User";

  const getMealPlanForIllness = (illnessType: string) => {
    const mealPlans = {
      hypertension: {
        morning: {
          low: 'Oatmeal with banana (₦200)',
          high: 'Quinoa bowl with berries and nuts (₦800)'
        },
        afternoon: {
          low: 'Grilled fish with vegetables (₦500)',
          high: 'Salmon with steamed broccoli and brown rice (₦1200)'
        },
        night: {
          low: 'Vegetable soup with whole grain bread (₦300)',
          high: 'Lean chicken breast with sweet potato (₦900)'
        }
      },
      diabetes: {
        morning: {
          low: 'Boiled eggs with whole wheat toast (₦250)',
          high: 'Greek yogurt with mixed nuts and seeds (₦700)'
        },
        afternoon: {
          low: 'Grilled chicken with leafy greens (₦600)',
          high: 'Turkey and avocado salad (₦1000)'
        },
        night: {
          low: 'Lentil soup with vegetables (₦350)',
          high: 'Baked cod with quinoa and asparagus (₦1100)'
        }
      },
      heart_disease: {
        morning: {
          low: 'Whole grain cereal with milk (₦200)',
          high: 'Smoothie bowl with fresh fruits and granola (₦750)'
        },
        afternoon: {
          low: 'Tuna salad with mixed vegetables (₦400)',
          high: 'Grilled mackerel with Mediterranean vegetables (₦1300)'
        },
        night: {
          low: 'Bean stew with brown rice (₦300)',
          high: 'Herb-crusted chicken with roasted vegetables (₦950)'
        }
      },
      obesity: {
        morning: {
          low: 'Green tea with whole grain toast (₦150)',
          high: 'Protein smoothie with spinach and berries (₦600)'
        },
        afternoon: {
          low: 'Grilled vegetables with lean protein (₦450)',
          high: 'Quinoa salad with grilled chicken and avocado (₦850)'
        },
        night: {
          low: 'Vegetable broth with steamed vegetables (₦200)',
          high: 'Baked fish with roasted Brussels sprouts (₦700)'
        }
      },
      high_cholesterol: {
        morning: {
          low: 'Oats with cinnamon and apple (₦180)',
          high: 'Chia seed pudding with fresh berries (₦650)'
        },
        afternoon: {
          low: 'Grilled chicken salad (₦500)',
          high: 'Wild rice bowl with salmon and vegetables (₦1100)'
        },
        night: {
          low: 'Steamed vegetables with tofu (₦300)',
          high: 'Herb-baked white fish with quinoa (₦800)'
        }
      }
    };

    return mealPlans[illnessType as keyof typeof mealPlans] || mealPlans.hypertension;
  };

  const todaysMealPlan = userProfile?.illness_type 
    ? getMealPlanForIllness(userProfile.illness_type)
    : getMealPlanForIllness('hypertension');

  const healthTipsForIllness = (illnessType: string) => {
    const tips = {
      hypertension: [
        'Limit sodium intake to less than 2,300mg per day for better blood pressure control.',
        'Engage in 30 minutes of moderate exercise daily to help lower blood pressure naturally.',
        'Practice stress-reduction techniques like deep breathing or meditation regularly.'
      ],
      diabetes: [
        'Monitor your blood glucose levels regularly as recommended by your healthcare provider.',
        'Choose complex carbohydrates over simple sugars to maintain stable blood sugar.',
        'Stay hydrated by drinking plenty of water throughout the day.'
      ],
      heart_disease: [
        'Include omega-3 rich foods like fish in your diet at least twice a week.',
        'Avoid trans fats and limit saturated fats to protect your heart health.',
        'Take prescribed medications consistently and never skip doses.'
      ],
      obesity: [
        'Focus on portion control and eat slowly to recognize fullness cues.',
        'Incorporate more fiber-rich foods to help you feel satisfied longer.',
        'Aim for at least 150 minutes of moderate exercise per week.'
      ],
      high_cholesterol: [
        'Include soluble fiber foods like oats and beans to help lower cholesterol.',
        'Choose lean proteins and limit red meat consumption.',
        'Regular check-ups are important to monitor your cholesterol levels.'
      ]
    };

    return tips[illnessType as keyof typeof tips] || tips.hypertension;
  };

  const currentHealthTips = userProfile?.illness_type 
    ? healthTipsForIllness(userProfile.illness_type)
    : healthTipsForIllness('hypertension');

  const displayedHealthMetrics = [
    {
      title: 'Blood Pressure',
      value: latestMetrics?.blood_pressure_systolic || '120',
      unit: `/${latestMetrics?.blood_pressure_diastolic || '80'} mmHg`,
      trend: 'stable' as const,
      icon: <Heart className="h-5 w-5 text-primary-600" />
    },
    {
      title: 'Weight',
      value: latestMetrics?.weight?.toString() || '72.5',
      unit: 'kg',
      trend: 'stable' as const,
      icon: <Activity className="h-5 w-5 text-primary-600" />
    },
    {
      title: 'Blood Sugar',
      value: latestMetrics?.blood_sugar?.toString() || '95',
      unit: 'mg/dL',
      trend: 'stable' as const,
      icon: <TrendingUp className="h-5 w-5 text-primary-600" />
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'health-metrics':
        return <HealthMetricsForm onUpdate={fetchHealthMetrics} />;
      case 'symptoms':
        return <SymptomLogger />;
      case 'appointments':
        return <HospitalBooking />;
      case 'reminders':
        return <ReminderForm />;
      case 'shopping':
        return <ShoppingList />;
      case 'chat':
        return <AIChat />;
      default:
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div ref={metricsRef} className="grid md:grid-cols-3 gap-6">
              {displayedHealthMetrics.map((metric, index) => (
                <HealthMetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Premium Banner */}
            <PremiumBanner />

            {/* Today's Meal Plan */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Utensils className="h-6 w-6 mr-2 text-primary-600" />
                  Today's Meal Plan ({userProfile?.illness_type?.replace('_', ' ').toUpperCase() || 'HYPERTENSION'})
                </h2>
              </div>
              <div ref={mealsRef} className="grid md:grid-cols-3 gap-6">
                <Card className="healthcare-card">
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Morning</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <p className="text-sm font-medium">Low Budget</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{todaysMealPlan.morning.low}</p>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="text-sm font-medium">High Budget</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{todaysMealPlan.morning.high}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="healthcare-card">
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Afternoon</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <p className="text-sm font-medium">Low Budget</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{todaysMealPlan.afternoon.low}</p>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="text-sm font-medium">High Budget</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{todaysMealPlan.afternoon.high}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="healthcare-card">
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Night</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <p className="text-sm font-medium">Low Budget</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{todaysMealPlan.night.low}</p>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="text-sm font-medium">High Budget</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{todaysMealPlan.night.high}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Health Tips */}
            <Card className="healthcare-card">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-primary-600" />
                  Health Tips for {userProfile?.illness_type?.replace('_', ' ').toUpperCase() || 'HYPERTENSION'}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {currentHealthTips.map((tip, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* AI Chat Integration */}
            <div className="grid md:grid-cols-2 gap-6">
              <AIChat />
              <Card className="healthcare-card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex-col space-y-2"
                      onClick={() => setActiveSection('symptoms')}
                    >
                      <Clock className="h-5 w-5 text-primary-600" />
                      <span className="text-sm font-medium">Log Symptoms</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex-col space-y-2"
                      onClick={() => setActiveSection('health-metrics')}
                    >
                      <Heart className="h-5 w-5 text-primary-600" />
                      <span className="text-sm font-medium">Track Vitals</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex-col space-y-2"
                      onClick={() => setActiveSection('reminders')}
                    >
                      <Bell className="h-5 w-5 text-primary-600" />
                      <span className="text-sm font-medium">Set Reminder</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-auto p-4 flex-col space-y-2"
                      onClick={() => setActiveSection('appointments')}
                    >
                      <Calendar className="h-5 w-5 text-primary-600" />
                      <span className="text-sm font-medium">Book Checkup</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Welcome Section */}
        <div ref={heroRef} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Good morning, {userName}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your health overview for today
          </p>
        </div>

        {renderActiveSection()}
      </div>
    </div>
  );
};

export default Dashboard;
