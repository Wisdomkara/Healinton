import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HealthMetricCard from '@/components/HealthMetricCard';
import MealPlanCard from '@/components/MealPlanCard';
import PremiumBanner from '@/components/PremiumBanner';
import TestimonialsSection from '@/components/TestimonialsSection';
import DrugStorePreview from '@/components/DrugStorePreview';
import Loader from '@/components/Loader';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Calendar, Stethoscope, Clock, Shield, Users, TrendingUp, Smartphone, CheckCircle, Activity, Brain, Phone, Mail, MapPin, Pill, Plus } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const healthMetrics = [
    {
      title: 'Blood Pressure',
      value: '120',
      unit: '/80 mmHg',
      trend: 'stable' as const,
      icon: <Heart className="h-5 w-5 text-green-600" />,
      calories: 0
    },
    {
      title: 'Weight',
      value: '72.5',
      unit: 'kg',
      trend: 'down' as const,
      icon: <Activity className="h-5 w-5 text-blue-600" />,
      calories: 0
    },
    {
      title: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      trend: 'stable' as const,
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
      calories: 0
    }
  ];

  const mealPlans = [
    {
      title: 'Mediterranean Quinoa Bowl',
      description: 'Heart-healthy bowl with quinoa, fresh vegetables, and olive oil dressing. Perfect for managing cholesterol levels.',
      calories: 450,
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
      icon: <Heart className="h-12 w-12 text-green-600" />,
      title: 'Health Monitoring',
      description: 'Track your vital signs, medications, and symptoms in one comprehensive dashboard.'
    },
    {
      icon: <Calendar className="h-12 w-12 text-blue-600" />,
      title: 'Smart Scheduling',
      description: 'Never miss appointments or medication doses with intelligent reminders and notifications.'
    },
    {
      icon: <Brain className="h-12 w-12 text-purple-600" />,
      title: 'AI Health Insights',
      description: 'Get personalized meal plans and health tips tailored to your specific conditions with AI analysis.'
    },
    {
      icon: <Users className="h-12 w-12 text-orange-600" />,
      title: 'Community Support',
      description: 'Connect with others managing similar conditions and share experiences.'
    },
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected with enterprise-grade security.'
    },
    {
      icon: <Smartphone className="h-12 w-12 text-indigo-600" />,
      title: 'Mobile Optimized',
      description: 'Access your health dashboard anywhere, anytime with our fully responsive design.'
    }
  ];

  const benefits = [
    'Reduce hospital visits by 40%',
    'Improve medication adherence',
    'Get personalized health insights',
    'Connect with healthcare providers',
    'Track progress over time'
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced Decorative background blobs - much more visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large primary blobs - increased opacity and size */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-400/70 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-32 right-10 w-80 h-80 bg-blue-400/60 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/3 -left-16 w-72 h-72 bg-purple-400/65 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-88 h-88 bg-green-500/75 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-blue-500/70 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 -right-10 w-76 h-76 bg-purple-500/65 rounded-full blur-3xl animate-bounce"></div>
        
        {/* Medium accent blobs - enhanced visibility */}
        <div className="absolute top-20 left-1/3 w-48 h-48 bg-green-300/80 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-56 h-56 bg-blue-300/75 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-1/3 left-10 w-40 h-40 bg-purple-300/70 rounded-full blur-lg animate-pulse"></div>
        
        {/* Small decorative blobs - more prominent */}
        <div className="absolute top-10 right-1/3 w-32 h-32 bg-green-200/85 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute top-1/4 left-1/2 w-28 h-28 bg-blue-200/80 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-purple-200/75 rounded-full blur-lg animate-bounce"></div>
        
        {/* Additional floating organic shapes - enhanced */}
        <div className="absolute top-1/2 left-1/5 w-24 h-44 bg-green-400/65 rounded-full blur-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/5 w-52 h-28 bg-blue-400/70 rounded-full blur-xl rotate-12 animate-bounce"></div>
        <div className="absolute top-1/6 right-1/2 w-36 h-60 bg-purple-400/60 rounded-full blur-lg -rotate-12 animate-pulse"></div>
      </div>

      {/* Very light overlay for readability - minimal opacity */}
      <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/10"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative">
          {/* Hero background image - more prominent */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full text-green-800 dark:text-green-200 text-sm font-medium mb-6 backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Trusted by 10,000+ people managing chronic conditions
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Your Health Journey,{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Healinton helps you manage chronic conditions like diabetes, hypertension, and heart disease 
                with personalized meal plans, medication reminders, and health tracking tools.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                <Link to={user ? "/dashboard" : "/auth"}>
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg">
                    {user ? "Go to Dashboard" : "Start Your Health Journey"}
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-green-50 dark:hover:bg-green-900/20 transform hover:scale-105 transition-all duration-200">
                    Contact Sales
                  </Button>
                </Link>
              </div>
              
              {/* App Preview Mockup - mobile responsive */}
              <div className="relative mx-auto max-w-4xl">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 md:p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {healthMetrics.map((metric, index) => (
                      <div key={index} className="transform hover:scale-105 transition-transform">
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
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Everything You Need for Better Health
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive health management tools designed specifically for chronic condition management
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Drug Store Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
                <Pill className="h-10 w-10 mr-4 text-blue-600" />
                Order Your Medications
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Access basic, unique, and hard-to-find medications with doorstep delivery
              </p>
            </div>
            
            <DrugStorePreview />
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Join Thousands Who've Transformed Their Health</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <CheckCircle className="h-6 w-6 text-green-300 flex-shrink-0" />
                    <span className="text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to={user ? "/dashboard" : "/auth"}>
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200">
                  {user ? "Access Dashboard" : "Get Started Today"}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50/50 dark:bg-green-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Your Personal Health Command Center
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                Everything you need to manage your health conditions effectively, all in one beautiful dashboard
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {mealPlans.map((meal, index) => (
                <div key={index} className="transform hover:scale-105 transition-transform">
                  <MealPlanCard {...meal} />
                </div>
              ))}
            </div>
            
            <PremiumBanner />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of people who are successfully managing their chronic conditions with Healinton
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to={user ? "/dashboard" : "/auth"}>
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200">
                  {user ? "Go to Dashboard" : "Start Free Trial"}
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-green-50 dark:hover:bg-green-900/20 transform hover:scale-105 transition-all duration-200">
                  Learn More
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              No credit card required • Free till July 31st, 2025
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
