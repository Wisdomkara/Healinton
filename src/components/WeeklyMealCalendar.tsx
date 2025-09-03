import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Circle, Calendar, Utensils } from 'lucide-react';

interface MealPlan {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

interface DayMeals {
  breakfast: string;
  lunch: string;
  dinner: string;
}

const WeeklyMealCalendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [weeklyMeals, setWeeklyMeals] = useState<Record<string, DayMeals>>({});
  const [completedMeals, setCompletedMeals] = useState<Record<string, Record<string, boolean>>>({});
  const [userProfile, setUserProfile] = useState<any>(null);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Comprehensive meal database organized by health condition
  const mealDatabase: Record<string, MealPlan> = {
    diabetes: {
      breakfast: ['Steel-cut oats with berries', 'Greek yogurt with nuts', 'Vegetable omelet', 'Chia seed pudding', 'Whole grain toast with avocado'],
      lunch: ['Quinoa salad with vegetables', 'Grilled chicken with broccoli', 'Lentil soup', 'Salmon with leafy greens', 'Turkey and vegetable wrap'],
      dinner: ['Baked fish with asparagus', 'Lean beef stir-fry', 'Cauliflower rice bowl', 'Grilled chicken with vegetables', 'Tofu and vegetable curry']
    },
    hypertension: {
      breakfast: ['Low-sodium oatmeal with fruit', 'Banana smoothie', 'Herb scrambled eggs', 'Fresh fruit bowl', 'Whole grain cereal'],
      lunch: ['Herb-roasted vegetables', 'Grilled fish salad', 'Low-sodium soup', 'Quinoa pilaf', 'Fresh vegetable wrap'],
      dinner: ['Herb-crusted salmon', 'Steamed vegetables with chicken', 'Low-sodium pasta', 'Roasted turkey breast', 'Vegetable stir-fry']
    },
    heart_disease: {
      breakfast: ['Heart-healthy oatmeal', 'Omega-3 rich smoothie', 'Whole grain toast', 'Fresh berries with yogurt', 'Nuts and seeds bowl'],
      lunch: ['Mediterranean salad', 'Grilled salmon', 'Vegetable and bean soup', 'Olive oil drizzled vegetables', 'Whole grain sandwich'],
      dinner: ['Baked cod with herbs', 'Lean protein with vegetables', 'Heart-healthy pasta', 'Grilled chicken breast', 'Mediterranean bowl']
    },
    general: {
      breakfast: ['Balanced oatmeal bowl', 'Protein smoothie', 'Whole grain pancakes', 'Fresh fruit and yogurt', 'Healthy breakfast wrap'],
      lunch: ['Colorful salad bowl', 'Grilled protein with vegetables', 'Hearty soup', 'Balanced grain bowl', 'Nutritious sandwich'],
      dinner: ['Lean protein with sides', 'Vegetable stir-fry', 'Balanced pasta dish', 'Grilled fish dinner', 'Healthy curry bowl']
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      generateWeeklyMeals();
      fetchCompletedMeals();
    }
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
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const generateWeeklyMeals = () => {
    const illnessType = userProfile?.illness_type || 'general';
    const meals = mealDatabase[illnessType] || mealDatabase.general;
    
    const newWeeklyMeals: Record<string, DayMeals> = {};
    
    daysOfWeek.forEach(day => {
      newWeeklyMeals[day] = {
        breakfast: getRandomMeal(meals.breakfast),
        lunch: getRandomMeal(meals.lunch),
        dinner: getRandomMeal(meals.dinner)
      };
    });
    
    setWeeklyMeals(newWeeklyMeals);
  };

  const getRandomMeal = (mealArray: string[]): string => {
    return mealArray[Math.floor(Math.random() * mealArray.length)];
  };

  const fetchCompletedMeals = async () => {
    if (!user) return;

    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('meal_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('meal_date', currentDate);

      if (error) throw error;

      const completed: Record<string, Record<string, boolean>> = {};
      data?.forEach(item => {
        if (!completed[item.meal_date]) completed[item.meal_date] = {};
        completed[item.meal_date][item.meal_time] = item.completed;
      });

      setCompletedMeals(completed);
    } catch (error) {
      console.error('Error fetching completed meals:', error);
    }
  };

  const toggleMealCompletion = async (day: string, mealTime: string) => {
    if (!user) return;

    const currentDate = new Date().toISOString().split('T')[0];
    const isCompleted = !completedMeals[currentDate]?.[`${day}-${mealTime}`];

    try {
      const { error } = await supabase
        .from('meal_tracking')
        .upsert({
          user_id: user.id,
          illness_type: userProfile?.illness_type || 'general',
          meal_date: currentDate,
          meal_time: `${day}-${mealTime}`,
          completed: isCompleted
        }, {
          onConflict: 'user_id,meal_date,meal_time'
        });

      if (error) throw error;

      setCompletedMeals(prev => ({
        ...prev,
        [currentDate]: {
          ...prev[currentDate],
          [`${day}-${mealTime}`]: isCompleted
        }
      }));

      // Update analytics
      await updateMealAnalytics(isCompleted);

      toast({
        title: isCompleted ? 'Meal Completed!' : 'Meal Unchecked',
        description: `${mealTime} for ${day} has been ${isCompleted ? 'marked as completed' : 'unchecked'}.`,
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

  const updateMealAnalytics = async (isCompleted: boolean) => {
    if (!user) return;

    const currentDate = new Date().toISOString().split('T')[0];
    const completionRate = calculateDailyCompletionRate();

    try {
      await supabase
        .from('user_analytics')
        .upsert({
          user_id: user.id,
          date: currentDate,
          metric_type: 'meal_compliance_rate',
          value: completionRate
        }, {
          onConflict: 'user_id,date,metric_type'
        });
    } catch (error) {
      console.error('Error updating analytics:', error);
    }
  };

  const calculateDailyCompletionRate = (): number => {
    const currentDate = new Date().toISOString().split('T')[0];
    const todayMeals = completedMeals[currentDate] || {};
    const completedCount = Object.values(todayMeals).filter(Boolean).length;
    const totalMeals = daysOfWeek.length * 3; // 7 days * 3 meals
    return Math.round((completedCount / totalMeals) * 100);
  };

  const refreshMeals = () => {
    generateWeeklyMeals();
    toast({
      title: 'Meals Refreshed!',
      description: 'New meal suggestions have been generated for this week.',
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-green-600" />
          Weekly Meal Calendar
        </h2>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-sm">
            {calculateDailyCompletionRate()}% Complete Today
          </Badge>
          <Button onClick={refreshMeals} variant="outline" size="sm">
            <Utensils className="h-4 w-4 mr-2" />
            Refresh Meals
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <Card key={day} className="p-4 hover:shadow-lg transition-shadow">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {day}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(Date.now() + daysOfWeek.indexOf(day) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>

            <div className="space-y-3">
              {['breakfast', 'lunch', 'dinner'].map((mealTime) => (
                <div key={mealTime} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {mealTime}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleMealCompletion(day, mealTime)}
                      className="p-0 h-6 w-6"
                    >
                      {completedMeals[new Date().toISOString().split('T')[0]]?.[`${day}-${mealTime}`] ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                      {weeklyMeals[day]?.[mealTime as keyof DayMeals] || 'Loading meal...'}
                    </p>
                  </div>

                  {completedMeals[new Date().toISOString().split('T')[0]]?.[`${day}-${mealTime}`] && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                      ✓ Completed
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly Progress Summary */}
      <Card className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
          This Week's Progress
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2 text-center">
          {daysOfWeek.map((day) => (
            <div key={day} className="space-y-1">
              <p className="text-xs font-medium text-green-700 dark:text-green-300">{day.slice(0, 3)}</p>
              <div className="flex justify-center space-x-1">
                {['breakfast', 'lunch', 'dinner'].map((meal) => (
                  <div
                    key={meal}
                    className={`w-2 h-2 rounded-full ${
                      completedMeals[new Date().toISOString().split('T')[0]]?.[`${day}-${meal}`]
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Card>
  );
};

export default WeeklyMealCalendar;