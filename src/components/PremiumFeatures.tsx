
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart, Shield, Users, Phone, Calendar, Pill, Brain } from 'lucide-react';

const PremiumFeatures = () => {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: 'Advanced Health Analytics',
      description: 'Detailed insights into your health patterns, meal completion rates, and progress tracking with AI-powered recommendations.',
      status: 'Active'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Personalized Meal Plans',
      description: 'Customized meal plans based on your specific illness type, dietary preferences, and health goals.',
      status: 'Active'
    },
    {
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      title: 'Telehealth Integration',
      description: 'Direct access to healthcare professionals for virtual consultations and medical advice.',
      status: 'Active'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: 'Hospital Integration',
      description: 'Seamless booking with partner hospitals and automatic synchronization of your health records.',
      status: 'Active'
    },
    {
      icon: <Pill className="h-8 w-8 text-orange-600" />,
      title: 'Medication Management',
      description: 'Smart medication reminders, drug interaction warnings, and pharmacy delivery integration.',
      status: 'Active'
    },
    {
      icon: <Brain className="h-8 w-8 text-indigo-600" />,
      title: 'AI Health Assistant',
      description: 'Advanced AI-powered health coaching with personalized recommendations and 24/7 support.',
      status: 'Active'
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: 'Family Health Management',
      description: 'Manage health records for up to 6 family members with coordinated care plans.',
      status: 'Active'
    },
    {
      icon: <Calendar className="h-8 w-8 text-pink-600" />,
      title: 'Priority Scheduling',
      description: 'Priority booking for appointments and faster response times from healthcare providers.',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Premium Features</h2>
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          Premium Active
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  {feature.icon}
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {feature.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Your Premium Benefits
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You have access to all premium features including advanced analytics, personalized health insights, 
                priority support, and integrated healthcare services. Make the most of your premium subscription!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumFeatures;
