
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { Crown, Check, Star, TrendingUp, Heart, Shield, Users, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentModal from '@/components/PaymentModal';

const Premium = () => {
  const { user } = useAuth();
  const { isPremium, loading } = usePremium();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSubscribe = async (planType: string) => {
    if (!user) {
      window.location.href = '/auth';
      return;
    }

    if (planType === 'basic') {
      // Basic plan is free - redirect to dashboard
      window.location.href = '/dashboard';
      return;
    }

    if (planType === 'premium') {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    alert('Welcome to Premium! You now have access to all premium features.');
    window.location.href = '/dashboard';
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      period: '',
      description: 'Perfect for getting started with health management',
      features: [
        'Basic health tracking',
        'Simple meal plans',
        'Medication reminders',
        'Community access',
        'Email support',
        'Fitness tracking',
        'Symptom logging'
      ],
      color: 'from-green-500 to-green-600',
      shadow: 'shadow-green-500/20',
      popular: false
    },
    {
      name: 'Premium',
      price: '$5',
      period: '/month',
      description: 'Complete health management solution with AI insights',
      features: [
        'Everything in Basic',
        'Advanced health analytics',
        'Personalized meal plans',
        'Hospital integration',
        'Telehealth consultations',
        'Medicine delivery',
        'Priority support',
        'Family sharing',
        'Custom reports',
        'AI-powered insights'
      ],
      color: 'from-blue-500 to-purple-600',
      shadow: 'shadow-blue-500/20',
      popular: true
    }
  ];

  const premiumFeatures = [
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: 'Advanced Health Analytics',
      description: 'AI-powered insights and predictive health analysis to identify trends and potential issues before they become serious.'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Telehealth Integration',
      description: 'Direct video consultations with certified healthcare professionals, available 24/7 for premium subscribers.'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: 'Hospital Integration',
      description: 'Seamless integration with major hospitals for automatic appointment booking and health record synchronization.'
    },
    {
      icon: <Phone className="h-8 w-8 text-orange-600" />,
      title: 'Priority Support',
      description: '24/7 priority customer support with dedicated health advisors and emergency response team access.'
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: 'Family Health Management',
      description: 'Manage health records for up to 6 family members with shared calendars and coordinated care plans.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full mb-6">
            <Crown className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Health Plans for Everyone
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start with our free plan or upgrade to premium for advanced health tracking, personalized meal plans, expert consultations, and medicine delivery
          </p>
          {isPremium && (
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg inline-block">
              <p className="text-green-800 dark:text-green-200 font-semibold">
                🎉 You're currently on Premium! Enjoy all the advanced features.
              </p>
            </div>
          )}
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${plan.shadow} ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              } ${isPremium && plan.name === 'Premium' ? 'border-green-500 border-2' : ''}`}
              style={{
                background: plan.popular 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                  : undefined
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              {isPremium && plan.name === 'Premium' && (
                <div className="absolute -top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Current Plan
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleSubscribe(plan.name.toLowerCase())}
                disabled={isPremium && plan.name === 'Premium'}
                className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transform hover:scale-105 transition-all duration-200 py-3 ${
                  isPremium && plan.name === 'Premium' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isPremium && plan.name === 'Premium' 
                  ? 'Current Plan' 
                  : plan.name === 'Basic' 
                    ? 'Get Started Free' 
                    : `Choose ${plan.name}`
                }
              </Button>
            </Card>
          ))}
        </div>

        {/* Premium Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
            <Star className="h-8 w-8 mr-3 text-primary-600" />
            Premium Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all transform hover:scale-105 hover:bg-green-50 dark:hover:bg-green-900/10">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {!isPremium && (
          <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
              <p className="text-xl mb-8 opacity-90">
                Start free or get premium for just $5/month!
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={() => handleSubscribe('free')}
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4"
                >
                  Start Free
                </Button>
                <Button
                  onClick={() => handleSubscribe('premium')}
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white/20 font-semibold px-8 py-4 border border-white/30"
                >
                  Go Premium - $5/month
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-75">
                No hidden fees. Cancel premium anytime.
              </p>
            </div>
          </div>
        )}

        {isPremium && (
          <div className="text-center bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white">
            <Crown className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">You're Premium!</h2>
            <p className="text-xl mb-8 opacity-90">
              Enjoy all the advanced features and premium benefits.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>

      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Premium;
