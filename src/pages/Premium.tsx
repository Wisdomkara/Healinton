import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Crown, Check, Star, Utensils, Calendar, Users, Truck, Phone, Clock, Shield, TrendingUp, Heart } from 'lucide-react';

const Premium = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planType: string) => {
    if (!user) {
      // Redirect to auth if not logged in
      window.location.href = '/auth';
      return;
    }

    setLoading(true);
    try {
      // Calculate expiry date (30 days from now for monthly subscription)
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);

      // Add user to premium_users table when they subscribe
      const { error } = await supabase
        .from('premium_users')
        .insert({
          user_id: user.id,
          subscription_type: 'paid',
          added_by: 'subscription',
          expires_at: expiryDate.toISOString(),
          notes: `Subscribed to ${planType} plan - Monthly billing`
        });

      if (error) {
        console.error('Error adding premium user:', error);
        alert('There was an error processing your subscription. Please try again.');
        return;
      }

      // Simulate API call for payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After successful payment, redirect to dashboard with premium features
      alert('Subscription successful! You now have access to all premium features for 30 days.');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Subscription error:', error);
      alert('There was an error processing your subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      period: '/month',
      description: 'Perfect for getting started with health management',
      features: [
        'Basic health tracking',
        'Simple meal plans',
        'Medication reminders',
        'Community access',
        'Email support'
      ],
      color: 'from-green-500 to-green-600',
      popular: false
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: '/month',
      description: 'Complete health management solution',
      features: [
        'Advanced health analytics',
        'Personalized meal plans',
        'Hospital integration',
        'Telehealth consultations',
        'Medicine delivery',
        'Priority support',
        'Family sharing',
        'Custom reports'
      ],
      color: 'from-blue-500 to-purple-600',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$39.99',
      period: '/month',
      description: 'For healthcare providers and organizations',
      features: [
        'Everything in Premium',
        'Multi-patient management',
        'Advanced integrations',
        'Custom branding',
        'Dedicated support',
        'SLA guarantees',
        'Advanced security',
        'Custom training'
      ],
      color: 'from-purple-500 to-pink-600',
      popular: false
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
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: 'Medicine Delivery',
      description: 'Free doorstep delivery of medications and health supplies within 24 hours of ordering.'
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

  const mealPlans = {
    morning: {
      low: { name: 'Oatmeal with Banana', price: '$3', description: 'Wholesome oats with fresh banana slices' },
      medium: { name: 'Greek Yogurt Bowl', price: '$8', description: 'Greek yogurt with berries and granola' },
      high: { name: 'Avocado Toast Deluxe', price: '$15', description: 'Sourdough with avocado, poached egg, and smoked salmon' }
    },
    afternoon: {
      low: { name: 'Rice & Beans', price: '$5', description: 'Nutritious rice and beans with vegetables' },
      medium: { name: 'Chicken Salad Wrap', price: '$12', description: 'Grilled chicken with fresh vegetables in a wrap' },
      high: { name: 'Quinoa Power Bowl', price: '$18', description: 'Quinoa with grilled salmon, vegetables, and tahini dressing' }
    },
    night: {
      low: { name: 'Pasta Marinara', price: '$6', description: 'Wholesome pasta with homemade marinara sauce' },
      medium: { name: 'Grilled Chicken Dinner', price: '$14', description: 'Grilled chicken breast with roasted vegetables' },
      high: { name: 'Steak & Vegetables', price: '$25', description: 'Premium grass-fed steak with seasonal vegetables' }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full mb-6">
            <Crown className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Premium Health Plans
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Upgrade to premium and unlock advanced health tracking, personalized meal plans, expert consultations, and medicine delivery
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} hover:shadow-2xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
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
                disabled={loading}
                className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transform hover:scale-105 transition-all duration-200 py-3`}
              >
                {loading ? 'Processing...' : `Choose ${plan.name}`}
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
              <Card key={index} className="p-6 hover:shadow-lg transition-all transform hover:scale-105">
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

        {/* Meal Plans Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
            <Utensils className="h-8 w-8 mr-3 text-primary-600" />
            Daily Meal Plans for Every Budget
          </h2>
          
          {Object.entries(mealPlans).map(([timeOfDay, meals]) => (
            <div key={timeOfDay} className="mb-12">
              <h3 className="text-2xl font-semibold capitalize mb-6 text-gray-900 dark:text-white">
                {timeOfDay} Meals
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(meals).map(([budget, meal]) => (
                  <Card key={budget} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        budget === 'low' ? 'bg-green-100 text-green-800' :
                        budget === 'medium' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {budget === 'low' ? 'Budget' : budget === 'medium' ? 'Standard' : 'Premium'}
                      </div>
                      <span className="text-2xl font-bold text-primary-600">{meal.price}</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{meal.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{meal.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your premium journey today with monthly billing
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => handleSubscribe('premium')}
              disabled={loading}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4"
            >
              {loading ? 'Processing...' : 'Get Premium - $19.99/month'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-4"
            >
              Contact Sales
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            Monthly billing. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;
