
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HealthMetricCard from '@/components/HealthMetricCard';
import MealPlanCard from '@/components/MealPlanCard';
import PremiumBanner from '@/components/PremiumBanner';
import { Heart, User, Calendar, Bell, Clock, Settings } from 'lucide-react';

const Index = () => {
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
      icon: <User className="h-5 w-5 text-primary-600" />
    },
    {
      title: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      trend: 'stable' as const,
      icon: <Calendar className="h-5 w-5 text-primary-600" />
    }
  ];

  const mealPlans = [
    {
      title: 'Mediterranean Quinoa Bowl',
      description: 'Heart-healthy bowl with quinoa, fresh vegetables, and olive oil dressing. Perfect for managing cholesterol levels.',
      calories: 420,
      prepTime: '15 min',
      difficulty: 'Easy' as const,
      healthScore: 9
    },
    {
      title: 'Grilled Salmon with Steamed Broccoli',
      description: 'Omega-3 rich salmon paired with fiber-rich broccoli, ideal for heart health and blood pressure management.',
      calories: 380,
      prepTime: '20 min',
      difficulty: 'Medium' as const,
      healthScore: 10
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-primary-950 dark:via-background dark:to-primary-900"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/50 px-4 py-2 rounded-full mb-6">
              <Heart className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Trusted by 10,000+ people managing chronic conditions
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your Health Journey,{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Carevital helps you manage chronic conditions like diabetes, hypertension, and heart disease 
              with personalized meal plans, medication reminders, and health tracking tools.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/auth">
                <Button size="lg" className="healthcare-button px-8 py-4 text-lg">
                  Start Your Health Journey
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-slide-up">
            <Card className="healthcare-card text-center">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg w-fit mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Meal Plans</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Weekly meal plans tailored to your specific health conditions and dietary needs.
              </p>
            </Card>

            <Card className="healthcare-card text-center">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg w-fit mx-auto mb-4">
                <Bell className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Reminders</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Never miss medications or appointments with intelligent notifications.
              </p>
            </Card>

            <Card className="healthcare-card text-center">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg w-fit mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Health Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Monitor vital signs and track your progress with visual analytics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Health Dashboard
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get a complete overview of your health metrics, meal plans, and upcoming activities.
            </p>
          </div>

          {/* Health Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {healthMetrics.map((metric, index) => (
              <HealthMetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Premium Banner */}
          <div className="mb-8">
            <PremiumBanner />
          </div>

          {/* Meal Plans */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                This Week's Meal Plan
              </h3>
              <Button variant="ghost" className="text-primary-600 hover:text-primary-700">
                View All →
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {mealPlans.map((meal, index) => (
                <MealPlanCard key={index} {...meal} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <Clock className="h-6 w-6 text-primary-600" />
              <span className="text-sm font-medium">Log Symptoms</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <Heart className="h-6 w-6 text-primary-600" />
              <span className="text-sm font-medium">Track Vitals</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <Bell className="h-6 w-6 text-primary-600" />
              <span className="text-sm font-medium">Set Reminder</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <Settings className="h-6 w-6 text-primary-600" />
              <span className="text-sm font-medium">Settings</span>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Take Control of Your Health Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of people who are successfully managing their chronic conditions with Carevital.
            </p>
            <Link to="/auth">
              <Button size="lg" className="healthcare-button px-8 py-4 text-lg">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
