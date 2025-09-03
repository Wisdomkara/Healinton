import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, CheckCircle, AlertCircle, Apple, Circle } from 'lucide-react';

const DietInfoPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [todayMeals, setTodayMeals] = useState<any[]>([]);
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Fetch today's meal completions
      const currentDate = new Date().toISOString().split('T')[0];
      const { data: meals, error: mealsError } = await supabase
        .from('meal_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('meal_date', currentDate);

      if (mealsError && mealsError.code !== 'PGRST116') {
        throw mealsError;
      }

      setUserProfile(profile);
      setTodayMeals(meals || []);
      
      // Set completed meals state
      const completed: Record<string, boolean> = {};
      meals?.forEach(meal => {
        completed[meal.meal_time] = meal.completed;
      });
      setCompletedMeals(completed);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMealCompletion = async (mealType: string) => {
    if (!user) return;

    const currentDate = new Date().toISOString().split('T')[0];
    const isCompleted = !completedMeals[mealType];

    try {
      const { error } = await supabase
        .from('meal_tracking')
        .upsert({
          user_id: user.id,
          illness_type: userProfile?.illness_type || 'general',
          meal_date: currentDate,
          meal_time: mealType,
          completed: isCompleted
        }, {
          onConflict: 'user_id,meal_date,meal_time'
        });

      if (error) throw error;

      setCompletedMeals(prev => ({
        ...prev,
        [mealType]: isCompleted
      }));

      // Update analytics
      await updateMealAnalytics();

      toast({
        title: isCompleted ? 'Meal Completed!' : 'Meal Unchecked',
        description: `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} has been ${isCompleted ? 'marked as completed' : 'unchecked'}.`,
      });

    } catch (error) {
      console.error('Error updating meal completion:', error);
      toast({
        title: 'Error',
        description: 'Failed to update meal status.',
        variant: 'destructive'
      });
    }
  };

  const updateMealAnalytics = async () => {
    if (!user) return;

    const currentDate = new Date().toISOString().split('T')[0];
    const completedCount = Object.values(completedMeals).filter(Boolean).length;
    const totalMeals = 3; // breakfast, lunch, dinner
    const completionRate = Math.round((completedCount / totalMeals) * 100);

    try {
      await supabase
        .from('user_analytics')
        .upsert({
          user_id: user.id,
          date: currentDate,
          metric_type: 'daily_meal_completion',
          value: completionRate
        }, {
          onConflict: 'user_id,date,metric_type'
        });
    } catch (error) {
      console.error('Error updating analytics:', error);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  const getMealCompletionStatus = () => {
    const totalMeals = 3; // breakfast, lunch, dinner
    const completedCount = Object.values(completedMeals).filter(Boolean).length;
    return { completed: completedCount, total: totalMeals };
  };

  const completionStatus = getMealCompletionStatus();

  const getDietRecommendations = (illnessType: string | null) => {
    const recommendations = {
      diabetes: {
        title: 'Diabetes-Friendly Diet',
        recommended: ['Whole grains', 'Lean proteins', 'Non-starchy vegetables', 'Healthy fats'],
        avoid: ['Sugary drinks', 'White bread', 'Candy', 'Fried foods'],
        color: 'blue'
      },
      hypertension: {
        title: 'Heart-Healthy Diet',
        recommended: ['Low-sodium foods', 'Fruits', 'Vegetables', 'Whole grains'],
        avoid: ['High sodium foods', 'Processed meats', 'Excess salt', 'Fast food'],
        color: 'red'
      },
      heart_disease: {
        title: 'Cardiac Diet',
        recommended: ['Omega-3 rich fish', 'Nuts', 'Olive oil', 'Berries'],
        avoid: ['Trans fats', 'Saturated fats', 'High cholesterol foods', 'Excess sugar'],
        color: 'pink'
      },
      default: {
        title: 'Balanced Healthy Diet',
        recommended: ['Fruits and vegetables', 'Whole grains', 'Lean proteins', 'Healthy fats'],
        avoid: ['Processed foods', 'Excess sugar', 'High sodium', 'Trans fats'],
        color: 'green'
      }
    };

    return recommendations[illnessType as keyof typeof recommendations] || recommendations.default;
  };

  const dietInfo = getDietRecommendations(userProfile?.illness_type);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Apple className={`h-6 w-6 mr-2 text-${dietInfo.color}-600`} />
          {dietInfo.title}
        </h3>
        <Badge variant="outline" className="flex items-center">
          <Heart className="h-3 w-3 mr-1" />
          Personalized
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Today's Meals Progress
            </span>
            <Badge variant="outline" className="text-xs">
              {completionStatus.completed}/{completionStatus.total} Completed
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(completionStatus.completed / completionStatus.total) * 100}%` }}
            />
          </div>

          {/* Daily Meal Tracking */}
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mark Today's Meals</h4>
            {['breakfast', 'lunch', 'dinner'].map((mealType) => (
              <div key={mealType} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {mealType}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleMealCompletion(mealType)}
                  className="p-0 h-8 w-8"
                >
                  {completedMeals[mealType] ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className={`h-4 w-4 text-${dietInfo.color}-600`} />
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Recommended</h4>
            </div>
            <ul className="space-y-1">
              {dietInfo.recommended.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Avoid</h4>
            </div>
            <ul className="space-y-1">
              {dietInfo.avoid.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DietInfoPanel;