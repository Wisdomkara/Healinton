
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HealthMetricCard from '@/components/HealthMetricCard';
import MealPlanCard from '@/components/MealPlanCard';
import PremiumBanner from '@/components/PremiumBanner';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { Heart, Calendar, Bell, Clock, Settings, TrendingUp, Activity, Apple } from 'lucide-react';

const Dashboard = () => {
  const heroRef = useScrollAnimation();
  const metricsRef = useStaggerAnimation();
  const mealsRef = useStaggerAnimation();

  // Mock user data - in a real app, this would come from authentication
  const userName = "Sarah Johnson";

  const healthMetrics = [
    {
      title: 'Blood Pressure',
      value: '120',
      unit: '/80 mmHg',
      trend: 'stable' as const,
      icon: <Heart className="h-5 w-5 text-primary-600" />
    },
    {
      title: 'Weight',
      value: '72.5',
      unit: 'kg',
      trend: 'down' as const,
      icon: <Activity className="h-5 w-5 text-primary-600" />
    },
    {
      title: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      trend: 'stable' as const,
      icon: <TrendingUp className="h-5 w-5 text-primary-600" />
    }
  ];

  const todaysMeals = [
    {
      title: 'Mediterranean Breakfast Bowl',
      description: 'Quinoa bowl with Greek yogurt, fresh berries, and nuts. Perfect for managing blood sugar levels.',
      calories: 320,
      prepTime: '10 min',
      difficulty: 'Easy' as const,
      healthScore: 9
    },
    {
      title: 'Grilled Salmon Lunch',
      description: 'Heart-healthy salmon with steamed vegetables and brown rice. Rich in omega-3 fatty acids.',
      calories: 450,
      prepTime: '25 min',
      difficulty: 'Medium' as const,
      healthScore: 10
    }
  ];

  const healthTips = [
    'Take your blood pressure medication at the same time daily for best results.',
    'Stay hydrated - aim for 8 glasses of water today.',
    'A 10-minute walk after meals can help regulate blood sugar.',
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div ref={heroRef} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Good morning, {userName}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your health overview for today
          </p>
        </div>

        {/* Quick Stats */}
        <div ref={metricsRef} className="grid md:grid-cols-3 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <HealthMetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Premium Banner */}
        <div className="mb-8">
          <PremiumBanner />
        </div>

        {/* Today's Meal Plan */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Apple className="h-6 w-6 mr-2 text-primary-600" />
              Today's Meal Plan
            </h2>
            <Button variant="ghost" className="text-primary-600 hover:text-primary-700">
              View Full Week →
            </Button>
          </div>
          <div ref={mealsRef} className="grid md:grid-cols-2 gap-6">
            {todaysMeals.map((meal, index) => (
              <MealPlanCard key={index} {...meal} />
            ))}
          </div>
        </div>

        {/* Health Tips & Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Health Tips */}
          <Card className="healthcare-card">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-primary-600" />
                Today's Health Tips
              </h3>
              <div className="space-y-3">
                {healthTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="healthcare-card">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Log Symptoms</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Heart className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Track Vitals</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Bell className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Set Reminder</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Book Checkup</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Activities */}
        <Card className="healthcare-card mb-8">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary-600" />
              Upcoming Activities
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Take Blood Pressure Medication</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Today at 8:00 AM</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-primary-600">
                  Mark Done
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Doctor Appointment</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Tomorrow at 2:30 PM</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-gray-600">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
