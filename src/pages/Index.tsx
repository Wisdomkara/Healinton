
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HealthMetricCard from '@/components/HealthMetricCard';
import MealPlanCard from '@/components/MealPlanCard';
import PremiumBanner from '@/components/PremiumBanner';
import { Heart, User, Calendar, Stethoscope, Clock, Settings, Shield, Users, TrendingUp, Smartphone, CheckCircle } from 'lucide-react';

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

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      title: 'Health Monitoring',
      description: 'Track your vital signs, medications, and symptoms in one comprehensive dashboard.'
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: 'Smart Scheduling',
      description: 'Never miss appointments or medication doses with intelligent reminders and notifications.'
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-purple-600" />,
      title: 'Expert Guidance',
      description: 'Get personalized meal plans and health tips tailored to your specific conditions.'
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: 'Community Support',
      description: 'Connect with others managing similar conditions and share experiences.'
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected with enterprise-grade security.'
    },
    {
      icon: <Smartphone className="h-8 w-8 text-indigo-600" />,
      title: 'Mobile Friendly',
      description: 'Access your health dashboard anywhere, anytime with our responsive design.'
    }
  ];

  const benefits = [
    'Reduce hospital visits by 40%',
    'Improve medication adherence',
    'Get personalized health insights',
    'Connect with healthcare providers',
    'Track progress over time'
  ];

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-green-950 dark:via-background dark:to-green-900"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24 w-full">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/50 px-4 py-2 rounded-full mb-6 hover:scale-105 transition-transform">
              <Heart className="h-4 w-4 text-green-600 animate-pulse" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Trusted by 10,000+ people managing chronic conditions
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your Health Journey,{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Carevital helps you manage chronic conditions like diabetes, hypertension, and heart disease 
              with personalized meal plans, medication reminders, and health tracking tools.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link to="/auth">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Start Your Health Journey
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-green-600 text-green-600 hover:bg-green-50 transform hover:scale-105 transition-all duration-200">
                Learn More
              </Button>
            </div>

            {/* App Preview Mockup */}
            <div className="relative max-w-4xl mx-auto animate-slide-up">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border">
                <div className="grid md:grid-cols-3 gap-6">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="animate-stagger">
                      <HealthMetricCard {...metric} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 w-full">
        <div className="container mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Manage Your Health
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for chronic condition management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 bg-white dark:bg-gray-800">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl w-fit mx-auto mb-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 w-full">
        <div className="container mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Join Thousands Who've Transformed Their Health Management
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our users report significant improvements in their health outcomes and quality of life.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">40%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Fewer ER Visits</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">85%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Medication Adherence</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow">
                    <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow">
                    <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Data Security</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 w-full">
        <div className="container mx-auto px-4 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Personalized Health Dashboard
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get a complete overview of your health metrics, meal plans, and upcoming activities.
            </p>
          </div>

          <PremiumBanner />

          <div className="mb-8 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Personalized Meal Plans
              </h3>
              <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 transition-all">
                View All →
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {mealPlans.map((meal, index) => (
                <div key={index} className="animate-stagger">
                  <MealPlanCard {...meal} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-green-50 hover:border-green-300 transition-all transform hover:scale-105">
              <Clock className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">Log Symptoms</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-all transform hover:scale-105">
              <Heart className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">Track Vitals</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-purple-50 hover:border-purple-300 transition-all transform hover:scale-105">
              <Calendar className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">Schedule</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2 hover:bg-orange-50 hover:border-orange-300 transition-all transform hover:scale-105">
              <Settings className="h-6 w-6 text-orange-600" />
              <span className="text-sm font-medium">Settings</span>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 w-full">
        <div className="container mx-auto px-4 text-center w-full">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Take Control of Your Health Today
            </h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              Join thousands of people who are successfully managing their chronic conditions with Carevital.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
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
