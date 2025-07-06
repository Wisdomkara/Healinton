import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HealthMetricCard from '@/components/HealthMetricCard';
import MealPlanCard from '@/components/MealPlanCard';
import PremiumBanner from '@/components/PremiumBanner';
import TestimonialsSection from '@/components/TestimonialsSection';
import Loader from '@/components/Loader';
import { useAuth } from '@/hooks/useAuth';
import { Heart, User, Calendar, Stethoscope, Clock, Settings, Shield, Users, TrendingUp, Smartphone, CheckCircle } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading
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
      icon: <Heart className="h-5 w-5 text-primary-600" />,
      calories: 0
    },
    {
      title: 'Weight',
      value: '72.5',
      unit: 'kg',
      trend: 'down' as const,
      icon: <User className="h-5 w-5 text-primary-600" />,
      calories: 0
    },
    {
      title: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      trend: 'stable' as const,
      icon: <Calendar className="h-5 w-5 text-primary-600" />,
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
      icon: <Heart className="h-6 w-6 md:h-8 md:w-8 text-green-600" />,
      title: 'Health Monitoring',
      description: 'Track your vital signs, medications, and symptoms in one comprehensive dashboard.'
    },
    {
      icon: <Calendar className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />,
      title: 'Smart Scheduling',
      description: 'Never miss appointments or medication doses with intelligent reminders and notifications.'
    },
    {
      icon: <Stethoscope className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />,
      title: 'Expert Guidance',
      description: 'Get personalized meal plans and health tips tailored to your specific conditions.'
    },
    {
      icon: <Users className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />,
      title: 'Community Support',
      description: 'Connect with others managing similar conditions and share experiences.'
    },
    {
      icon: <Shield className="h-6 w-6 md:h-8 md:w-8 text-red-600" />,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected with enterprise-grade security.'
    },
    {
      icon: <Smartphone className="h-6 w-6 md:h-8 md:w-8 text-indigo-600" />,
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-green-950 dark:via-gray-900 dark:to-green-900 relative overflow-hidden">
      {/* Enhanced Decorative background blobs - removed overlay for better visibility */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large primary blobs */}
        <div className="absolute top-10 left-10 w-72 h-64 bg-green-500/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-96 h-80 bg-green-400/45 rounded-full blur-3xl transform rotate-12 animate-bounce-gentle"></div>
        <div className="absolute top-64 left-1/4 w-48 h-56 bg-green-600/50 rounded-full blur-xl transform -rotate-45"></div>
        <div className="absolute top-80 right-1/3 w-80 h-72 bg-green-300/40 rounded-full blur-2xl transform rotate-45"></div>
        
        {/* Medium accent blobs */}
        <div className="absolute bottom-32 left-20 w-64 h-88 bg-green-500/45 rounded-full blur-xl transform -rotate-12"></div>
        <div className="absolute bottom-48 right-16 w-56 h-64 bg-green-400/50 rounded-full blur-lg transform rotate-30"></div>
        <div className="absolute bottom-80 left-1/2 w-88 h-96 bg-green-600/35 rounded-full blur-3xl transform -rotate-30"></div>
        <div className="absolute top-1/2 left-8 w-40 h-48 bg-green-500/55 rounded-full blur-md transform rotate-60"></div>
        
        {/* Small decorative blobs */}
        <div className="absolute top-1/3 right-8 w-60 h-72 bg-green-400/40 rounded-full blur-xl transform -rotate-45"></div>
        <div className="absolute top-2/3 left-1/3 w-96 h-80 bg-green-300/30 rounded-full blur-3xl transform rotate-15"></div>
        <div className="absolute top-1/4 left-2/3 w-52 h-64 bg-green-600/45 rounded-full blur-2xl transform -rotate-60"></div>
        
        {/* Extra organic shapes */}
        <div className="absolute top-96 left-12 w-32 h-40 bg-green-500/50 rounded-full blur-lg transform rotate-90"></div>
        <div className="absolute bottom-64 right-32 w-44 h-56 bg-green-400/45 rounded-full blur-xl transform -rotate-30"></div>
        <div className="absolute top-48 left-3/4 w-68 h-80 bg-green-600/35 rounded-full blur-2xl transform rotate-75"></div>
        <div className="absolute bottom-96 left-1/4 w-48 h-56 bg-green-300/50 rounded-full blur-xl transform -rotate-15"></div>
        
        {/* Additional floating blobs */}
        <div className="absolute top-2/4 right-1/4 w-76 h-88 bg-green-500/30 rounded-full blur-3xl transform rotate-45"></div>
        <div className="absolute bottom-1/3 left-2/3 w-56 h-68 bg-green-400/40 rounded-full blur-2xl transform -rotate-75"></div>
        
        {/* More varied shapes */}
        <div className="absolute top-20 left-1/2 w-84 h-72 bg-green-600/25 rounded-full blur-3xl transform rotate-30"></div>
        <div className="absolute bottom-20 right-1/2 w-72 h-64 bg-green-500/35 rounded-full blur-2xl transform -rotate-45"></div>
        
        {/* Additional random blobs for more decoration */}
        <div className="absolute top-1/5 left-1/5 w-36 h-44 bg-green-400/50 rounded-full blur-lg transform rotate-25"></div>
        <div className="absolute bottom-1/5 right-1/5 w-28 h-36 bg-green-600/40 rounded-full blur-md transform -rotate-35"></div>
        <div className="absolute top-3/5 right-3/5 w-52 h-60 bg-green-300/45 rounded-full blur-xl transform rotate-80"></div>
        <div className="absolute bottom-2/5 left-4/5 w-40 h-48 bg-green-500/40 rounded-full blur-lg transform -rotate-50"></div>
      </div>
      
      {/* Light white overlay for readability - reduced opacity */}
      <div className="absolute inset-0 bg-white/20 dark:bg-gray-900/20"></div>
      
      <div className="relative z-10 w-full overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative overflow-hidden w-full">
          {/* Hero background image with high transparency */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
            style={{
              backgroundImage: `url(/lovable-uploads/28fa4c6a-e383-4c64-905c-130b84bf1e79.png)`
            }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-blue-50/20 to-purple-50/30 dark:from-green-950/50 dark:via-blue-950/40 dark:to-purple-950/50 animate-gradient-shift"></div>
          <div className="relative w-full max-w-none px-4 sm:px-6 lg:px-8 mx-auto py-12 md:py-24">
            <div className="text-center animate-fade-in-up max-w-7xl mx-auto">
              <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-green-100/80 to-blue-100/80 dark:from-green-900/70 dark:to-blue-900/70 px-3 py-2 rounded-full mb-6 hover:scale-105 transition-transform backdrop-blur-sm">
                <Heart className="h-4 w-4 text-green-600 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                  Trusted by 10,000+ people managing chronic conditions
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight text-center">
                Your Health Journey,{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Simplified
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-2 text-center">
                Healinton helps you manage chronic conditions like diabetes, hypertension, and heart disease 
                with personalized meal plans, medication reminders, and health tracking tools.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 px-2">
                <Link to={user ? "/dashboard" : "/auth"} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Start Your Health Journey
                  </Button>
                </Link>
                <Link to="/about" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-green-600 text-white hover:bg-white hover:text-green-600 border-2 border-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Contact Sales
                  </Button>
                </Link>
              </div>

              {/* App Preview Mockup */}
              <div className="relative max-w-4xl mx-auto animate-slide-up px-2">
                <div className="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-8 border overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 justify-items-center">
                    {healthMetrics.map((metric, index) => (
                      <div 
                        key={index} 
                        className="animate-stagger overflow-hidden w-full max-w-sm"
                        style={{
                          background: `linear-gradient(135deg, ${
                            index % 3 === 0 ? 'rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1)' :
                            index % 3 === 1 ? 'rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)' :
                            'rgba(147, 51, 234, 0.1), rgba(34, 197, 94, 0.1)'
                          })`
                        }}
                      >
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
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50/60 to-white/60 dark:from-gray-900/40 dark:to-gray-800/40 backdrop-blur-sm w-full overflow-hidden">
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="text-center mb-12 md:mb-16 max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Everything You Need to Manage Your Health
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2 text-center">
                Comprehensive tools designed specifically for chronic condition management
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto justify-items-center">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-4 sm:p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 backdrop-blur-sm shadow-lg overflow-hidden w-full max-w-sm"
                  style={{
                    background: `linear-gradient(135deg, ${
                      index % 6 === 0 ? 'rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1)' :
                      index % 6 === 1 ? 'rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)' :
                      index % 6 === 2 ? 'rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1)' :
                      index % 6 === 3 ? 'rgba(236, 72, 153, 0.1), rgba(251, 146, 60, 0.1)' :
                      index % 6 === 4 ? 'rgba(251, 146, 60, 0.1), rgba(34, 197, 94, 0.1)' :
                      'rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1)'
                    })`
                  }}
                >
                  <div className="p-2 md:p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl w-fit mx-auto mb-4 md:mb-6 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900 dark:text-white text-center">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Benefits Section */}
        <section className="py-12 md:py-16 lg:py-20 w-full overflow-hidden">
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto">
              <div className="order-2 lg:order-1 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center lg:text-left">
                  Join Thousands Who've Transformed Their Health Management
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-center lg:text-left">
                  Our users report significant improvements in their health outcomes and quality of life.
                </p>
                <div className="space-y-4 flex flex-col items-center lg:items-start">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-base md:text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative order-1 lg:order-2 flex justify-center">
                <div className="bg-gradient-to-br from-green-100/80 to-blue-200/80 dark:from-green-900/80 dark:to-blue-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl overflow-hidden max-w-lg w-full">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { icon: TrendingUp, value: "40%", label: "Fewer ER Visits", color: "text-green-600" },
                      { icon: Heart, value: "85%", label: "Medication Adherence", color: "text-red-500" },
                      { icon: Users, value: "10K+", label: "Active Users", color: "text-blue-500" },
                      { icon: Shield, value: "100%", label: "Data Security", color: "text-purple-500" }
                    ].map((stat, index) => (
                      <div 
                        key={index}
                        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                      >
                        <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${stat.color} mx-auto mb-2`} />
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50/60 to-white/60 dark:from-gray-900/40 dark:to-gray-800/40 backdrop-blur-sm w-full overflow-hidden">
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="text-center mb-12 max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Your Personalized Health Dashboard
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2 text-center">
                Get a complete overview of your health metrics, meal plans, and upcoming activities.
              </p>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center">
              <div className="w-full flex justify-center mb-8">
                <PremiumBanner />
              </div>

              <div className="mb-8 mt-8 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
                    Personalized Meal Plans
                  </h3>
                  <Link to={user ? "/dashboard" : "/auth"}>
                    <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all hover:scale-105">
                      View Recipes →
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 justify-items-center">
                  {mealPlans.map((meal, index) => (
                    <div 
                      key={index} 
                      className="animate-stagger overflow-hidden w-full max-w-lg"
                      style={{
                        background: `linear-gradient(135deg, ${
                          index % 2 === 0 ? 'rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1)' :
                          'rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)'
                        })`
                      }}
                    >
                      <MealPlanCard {...meal} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl justify-items-center">
                {[
                  { icon: Clock, label: "Log Symptoms", color: "hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/20" },
                  { icon: Heart, label: "Track Vitals", color: "hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20" },
                  { icon: Calendar, label: "Schedule", color: "hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-900/20" },
                  { icon: Settings, label: "Settings", color: "hover:bg-orange-50 hover:border-orange-300 dark:hover:bg-orange-900/20" }
                ].map((item, index) => (
                  <Link key={index} to={user ? "/dashboard" : "/auth"} className="w-full max-w-40">
                    <Button 
                      variant="outline" 
                      className={`p-3 sm:p-4 md:p-6 h-auto flex-col space-y-2 ${item.color} transition-all transform hover:scale-105 backdrop-blur-sm w-full`}
                    >
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
                      <span className="text-xs sm:text-sm font-medium text-center">{item.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>

              {/* Community Section */}
              <div className="mt-12 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Join Our Community
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Connect with others on similar health journeys and share experiences
                </p>
                <a 
                  href="https://www.facebook.com/profile.php?id=61577629151627" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all">
                    Join Facebook Group
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 w-full animate-gradient-shift overflow-hidden">
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 mx-auto text-center flex justify-center">
            <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-2xl p-6 md:p-8 w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                Take Control of Your Health Today
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed px-2 text-center">
                Join thousands of people who are successfully managing their chronic conditions with Healinton.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to={user ? "/dashboard" : "/auth"}>
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/premium">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg transform hover:scale-105 transition-all duration-200">
                    Start Premium
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
