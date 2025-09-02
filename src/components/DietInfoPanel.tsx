
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Apple, Clock, Target } from 'lucide-react';

const DietInfoPanel = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [mealCompletions, setMealCompletions] = useState<any[]>([]);
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
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch today's meal completions
      const today = new Date().toISOString().split('T')[0];
      const { data: mealData, error: mealError } = await supabase
        .from('meal_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('meal_date', today);

      if (mealError) throw mealError;
      setMealCompletions(mealData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  const getDietRecommendations = () => {
    const illness = profile?.illness_type;
    switch (illness) {
      case 'diabetes':
        return {
          title: 'Diabetes-Friendly Diet',
          foods: ['Leafy greens', 'Whole grains', 'Lean proteins', 'Berries'],
          avoid: ['Sugary drinks', 'White bread', 'Fried foods'],
          color: 'bg-blue-100 text-blue-800'
        };
      case 'hypertension':
        return {
          title: 'Heart-Healthy Diet',
          foods: ['Low-sodium foods', 'Fruits', 'Vegetables', 'Fish'],
          avoid: ['Processed foods', 'Excessive salt', 'Red meat'],
          color: 'bg-red-100 text-red-800'
        };
      case 'obesity':
        return {
          title: 'Weight Management Diet',
          foods: ['High-fiber foods', 'Lean proteins', 'Water-rich vegetables'],
          avoid: ['Processed snacks', 'Sugary beverages', 'Large portions'],
          color: 'bg-purple-100 text-purple-800'
        };
      default:
        return {
          title: 'Balanced Diet',
          foods: ['Fruits', 'Vegetables', 'Whole grains', 'Lean proteins'],
          avoid: ['Processed foods', 'Excessive sugar', 'Trans fats'],
          color: 'bg-green-100 text-green-800'
        };
    }
  };

  const recommendations = getDietRecommendations();
  const completedMeals = mealCompletions.filter(meal => meal.completed).length;
  const totalMeals = 3; // Breakfast, lunch, dinner

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
        <Apple className="h-5 w-5 text-green-600 mr-2" />
        Diet Information
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className={recommendations.color}>
            {recommendations.title}
          </Badge>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Target className="h-4 w-4" />
            <span>{completedMeals}/{totalMeals} meals today</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-sm font-medium text-green-700 dark:text-green-300">Recommended:</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {recommendations.foods.map((food, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                  {food}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-red-700 dark:text-red-300">Avoid:</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {recommendations.avoid.map((food, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {food}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-4 w-4 text-green-600" />
            <p className="text-sm font-medium text-green-800 dark:text-green-200">Today's Meal Progress</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedMeals / totalMeals) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-1">
            {completedMeals === totalMeals ? 'Great job! All meals completed today!' : 
             `${totalMeals - completedMeals} meal${totalMeals - completedMeals !== 1 ? 's' : ''} remaining`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DietInfoPanel;
