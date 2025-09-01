
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Utensils, Clock, DollarSign, CheckCircle, Plus } from 'lucide-react';

interface MealPlan {
  id: string;
  name: string;
  description: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  illnessType: string;
  budgetType: 'low' | 'medium' | 'high';
  calories: number;
  duration: string;
}

const MealPlanDisplay = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [completedMeals, setCompletedMeals] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample meal plans based on different illness types
  const sampleMealPlans: MealPlan[] = [
    {
      id: '1',
      name: 'Diabetes Management Plan',
      description: 'Low glycemic index foods to help manage blood sugar levels',
      meals: {
        breakfast: ['Oatmeal with berries', 'Greek yogurt', 'Whole grain toast', 'Green tea'],
        lunch: ['Grilled chicken salad', 'Quinoa bowl', 'Steamed vegetables', 'Water'],
        dinner: ['Baked salmon', 'Brown rice', 'Roasted broccoli', 'Herbal tea'],
        snacks: ['Mixed nuts', 'Apple slices', 'Carrot sticks']
      },
      illnessType: 'diabetes',
      budgetType: 'medium',
      calories: 1800,
      duration: '7 days'
    },
    {
      id: '2',
      name: 'Heart-Healthy Plan',
      description: 'Low sodium, high fiber foods for cardiovascular health',
      meals: {
        breakfast: ['Whole grain cereal', 'Fresh fruits', 'Low-fat milk', 'Orange juice'],
        lunch: ['Tuna sandwich', 'Mixed greens', 'Olive oil dressing', 'Water'],
        dinner: ['Grilled fish', 'Sweet potato', 'Green beans', 'Herbal tea'],
        snacks: ['Yogurt', 'Berries', 'Whole grain crackers']
      },
      illnessType: 'hypertension',
      budgetType: 'medium',
      calories: 2000,
      duration: '7 days'
    },
    {
      id: '3',
      name: 'Weight Management Plan',
      description: 'Balanced nutrition for healthy weight management',
      meals: {
        breakfast: ['Smoothie bowl', 'Protein shake', 'Whole grain toast', 'Green tea'],
        lunch: ['Lean protein salad', 'Quinoa', 'Fresh vegetables', 'Water'],
        dinner: ['Grilled chicken', 'Steamed rice', 'Mixed vegetables', 'Herbal tea'],
        snacks: ['Protein bar', 'Fresh fruit', 'Vegetable sticks']
      },
      illnessType: 'obesity',
      budgetType: 'medium',
      calories: 1600,
      duration: '7 days'
    },
    {
      id: '4',
      name: 'General Wellness Plan',
      description: 'Balanced nutrition for overall health and wellness',
      meals: {
        breakfast: ['Scrambled eggs', 'Whole grain toast', 'Fresh fruit', 'Coffee'],
        lunch: ['Chicken wrap', 'Side salad', 'Yogurt', 'Water'],
        dinner: ['Pasta with vegetables', 'Garlic bread', 'Green salad', 'Herbal tea'],
        snacks: ['Trail mix', 'Cheese and crackers', 'Fresh fruit']
      },
      illnessType: 'general',
      budgetType: 'medium',
      calories: 2200,
      duration: '7 days'
    }
  ];

  useEffect(() => {
    fetchUserProfile();
    fetchCompletedMeals();
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserProfile(data);

      // Filter meal plans based on user's illness type
      const filteredPlans = sampleMealPlans.filter(
        plan => plan.illnessType === data?.illness_type || plan.illnessType === 'general'
      );
      setMealPlans(filteredPlans);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Show general plans if no specific illness type
      setMealPlans(sampleMealPlans.filter(plan => plan.illnessType === 'general'));
    } finally {
      setLoading(false);
    }
  };

  const fetchCompletedMeals = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('meal_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('meal_date', today)
        .eq('completed', true);

      if (error) throw error;
      
      const completed = data?.map(meal => `${meal.meal_time}`) || [];
      setCompletedMeals(completed);
    } catch (error) {
      console.error('Error fetching completed meals:', error);
    }
  };

  const markMealCompleted = async (mealTime: string) => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('meal_completions')
        .upsert({
          user_id: user.id,
          meal_date: today,
          meal_time: mealTime,
          budget_type: 'medium',
          completed: true,
          created_at: new Date().toISOString()
        });

      if (error) throw error;
      
      setCompletedMeals(prev => [...prev, mealTime]);
    } catch (error) {
      console.error('Error marking meal completed:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-on-scroll">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Meal Plans
        </h2>
        <Badge variant="outline" className="text-green-600 border-green-600">
          {userProfile?.illness_type || 'General'} Plan
        </Badge>
      </div>

      <div className="grid gap-6">
        {mealPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-lg transition-all duration-300 hover:scale-102">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-green-600" />
                    {plan.name}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {plan.description}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{plan.budgetType} budget</Badge>
                  <p className="text-sm text-gray-500 mt-1">{plan.calories} cal/day</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(plan.meals).map(([mealType, foods]) => (
                  <Card key={mealType} className="bg-gray-50 dark:bg-gray-800">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm capitalize flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {mealType}
                        </h4>
                        {completedMeals.includes(mealType) ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markMealCompleted(mealType)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-1">
                        {foods.map((food, index) => (
                          <li key={index} className="text-xs text-gray-600 dark:text-gray-400">
                            • {food}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {plan.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {plan.budgetType} budget
                  </span>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Start This Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mealPlans.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Meal Plans Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Please update your illness type in settings to see personalized meal plans.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MealPlanDisplay;
