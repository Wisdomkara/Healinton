
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
        {/* Large primary blobs - significantly increased opacity and size */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-green-400/90 to-green-500/80 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-32 right-10 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/80 to-blue-500/70 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/3 -left-16 w-[350px] h-[350px] bg-gradient-to-br from-purple-400/85 to-purple-500/75 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] bg-gradient-to-br from-green-500/90 to-green-600/80 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-[320px] h-[320px] bg-gradient-to-br from-blue-500/85 to-blue-600/75 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 -right-10 w-[380px] h-[380px] bg-gradient-to-br from-purple-500/80 to-purple-600/70 rounded-full blur-3xl animate-bounce"></div>
        
        {/* Medium accent blobs - enhanced visibility */}
        <div className="absolute top-20 left-1/3 w-[240px] h-[240px] bg-gradient-to-br from-green-300/90 to-green-400/80 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-[280px] h-[280px] bg-gradient-to-br from-blue-300/85 to-blue-400/75 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-1/3 left-10 w-[200px] h-[200px] bg-gradient-to-br from-purple-300/80 to-purple-400/70 rounded-full blur-lg animate-pulse"></div>
        
        {/* Small decorative blobs - more prominent */}
        <div className="absolute top-10 right-1/3 w-[160px] h-[160px] bg-gradient-to-br from-green-200/95 to-green-300/85 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute top-1/4 left-1/2 w-[140px] h-[140px] bg-gradient-to-br from-blue-200/90 to-blue-300/80 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[180px] h-[180px] bg-gradient-to-br from-purple-200/85 to-purple-300/75 rounded-full blur-lg animate-bounce"></div>
        
        {/* Additional floating organic shapes - enhanced */}
        <div className="absolute top-1/2 left-1/5 w-[120px] h-[220px] bg-gradient-to-br from-green-400/75 to-green-500/65 rounded-full blur-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/5 w-[260px] h-[140px] bg-gradient-to-br from-blue-400/80 to-blue-500/70 rounded-full blur-xl rotate-12 animate-bounce"></div>
        <div className="absolute top-1/6 right-1/2 w-[180px] h-[300px] bg-gradient-to-br from-purple-400/70 to-purple-500/60 rounded-full blur-lg -rotate-12 animate-pulse"></div>
      </div>

      {/* Light overlay for readability - reduced opacity */}
      <div className="absolute inset-0 bg-white/5 dark:bg-gray-900/5"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative">
          {/* Hero background with uploaded image */}
          <div className="absolute inset-0  dark:opacity-3">
            <img 
              src="/lovable-uploads/28fa4c6a-e383-4c64-905c-130b84bf1e79.png" 
              alt="Healthcare background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-100/80 to-blue-100/80 dark:from-green-900/80 dark:to-blue-900/80"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-green-100/90 dark:bg-green-900/90 rounded-full text-green-800 dark:text-green-200 text-sm font-medium mb-6 backdrop-blur-sm border border-green-200/50 dark:border-green-700/50">
                <CheckCircle className="h-4 w-4 mr-2" />
                Trusted by 30,000+ people managing chronic conditions
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight drop-shadow-sm">
                Your Health Journey,{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-sm">
                Healinton helps you manage chronic conditions like diabetes, hypertension, and heart disease 
                with personalized meal plans, medication reminders, and health tracking tools.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                <Link to={user ? "/dashboard" : "/auth"}>
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-xl">
                    {user ? "Go to Dashboard" : "Start Your Health Journey"}
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-green-50/80 dark:hover:bg-green-900/30 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
              
              {/* App Preview Mockup - mobile responsive */}
              <div className="relative mx-auto max-w-4xl">
                <div className="bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl p-4 md:p-8 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
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

        {/* Features Section with Glow Animation */}
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
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg relative overflow-hidden group">
                  {/* Glow animation behind each card */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 animate-pulse"></div>
                  
                  <div className="flex flex-col items-center text-center relative z-10">
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50/60 dark:bg-green-900/20 backdrop-blur-sm">
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

        {/* CTA Section with animated background */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 via-purple-400/20 to-green-400/20 animate-gradient-shift"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
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
              Get premuim service for just $5
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
