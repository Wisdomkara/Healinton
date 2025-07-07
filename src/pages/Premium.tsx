
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { useNavigate } from 'react-router-dom';

const Premium = () => {
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
    }
  };

  const plans = [
    {
      name: 'Basic',
      price: '$3.00',
      period: '/month',
      description: 'Essential health tracking for individuals',
      features: [
        'Basic health metrics tracking',
        'Simple meal planning',
        'Basic symptom logging',
        'Email support',
        'Mobile app access'
      ],
      icon: <Star className="h-6 w-6" />,
      popular: false,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: '/month',
      description: 'Advanced health management with AI insights',
      features: [
        'Advanced health analytics',
        'AI-powered health recommendations',
        'Personalized meal plans for 21+ conditions',
        'Priority hospital booking',
        'Advanced symptom tracking with AI insights',
        '24/7 chat support',
        'Medication reminders',
        'Health reports and trends',
        'Family health sharing',
        'Premium drug store discounts'
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: true,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800">
            <Zap className="h-4 w-4 mr-2" />
            Upgrade Your Health Journey
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Health Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock advanced health management features and get personalized care for your specific condition
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''} hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-8">
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${plan.color} text-white mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                onClick={handleGetStarted}
                disabled={isPremium && plan.name === 'Premium'}
              >
                {isPremium && plan.name === 'Premium' ? 'Current Plan' : 
                 !user ? 'Sign Up to Get Started' : 
                 plan.name === 'Premium' ? 'Upgrade to Premium' : 'Get Basic Plan'}
              </Button>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Premium?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">Get personalized health recommendations based on your specific condition and health data.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Crown className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Comprehensive Care</h3>
              <p className="text-gray-600">Access specialized meal plans and health tips for 21+ medical conditions.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Priority Support</h3>
              <p className="text-gray-600">Get 24/7 support and priority access to hospital bookings and consultations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
