
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Check, Star, Utensils, Calendar, Users } from 'lucide-react';

const Premium = () => {
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

  const premiumFeatures = [
    'Personalized meal planning',
    'Advanced health analytics',
    'Priority customer support',
    'Telehealth consultations',
    'Medication reminders',
    'Hospital integrations',
    'Custom health reports',
    'Family sharing options'
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
            Premium Health Plans
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Upgrade to premium and unlock advanced health tracking, personalized meal plans, and expert consultations
          </p>
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
                  <Card key={budget} className="healthcare-card p-6">
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

        {/* Premium Features */}
        <div className="mb-16">
          <Card className="healthcare-card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Star className="h-6 w-6 mr-2 text-primary-600" />
                  Premium Features
                </h3>
                <div className="space-y-4">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-xl">
                <h4 className="text-xl font-semibold mb-4">Start Your Premium Journey</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get access to all premium features and personalized health guidance
                </p>
                <div className="space-y-3">
                  <Button className="w-full healthcare-button">
                    Start 7-Day Free Trial
                  </Button>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Cancel anytime. No commitments.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Premium;
