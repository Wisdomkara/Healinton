import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEnsureProfile } from '@/hooks/useEnsureProfile';
import { CheckCircle, Circle, Calendar, TrendingUp } from 'lucide-react';

interface MealPlan {
  id: string;
  day_of_week: number;
  meal_type: string;
  meal_name: string;
  is_completed: boolean;
  completed_at: string | null;
}

const WeeklyMealCalendar = () => {
  useEnsureProfile(); // Ensure user profile exists
  const { user } = useAuth();
  const { toast } = useToast();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>();

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  useEffect(() => {
    if (user) {
      const weekStart = getWeekStart(new Date());
      setCurrentWeekStart(weekStart);
      generateAndFetchMealPlan();
    }
  }, [user]);

  const getWeekStart = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const generateAndFetchMealPlan = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Generate meal plan for current week
      await supabase.rpc('generate_weekly_meal_plan', { p_user_id: user.id });
      
      // Fetch the meal plan
      const weekStart = getWeekStart(new Date()).toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('weekly_meal_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('week_start_date', weekStart)
        .order('day_of_week')
        .order('meal_type');

      if (error) throw error;
      setMealPlans(data || []);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      toast({
        title: 'Error',
        description: 'Failed to load meal plans.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMealCompletion = async (mealId: string, isCompleted: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('weekly_meal_plans')
        .update({
          is_completed: !isCompleted,
          completed_at: !isCompleted ? new Date().toISOString() : null
        })
        .eq('id', mealId);

      if (error) throw error;

      // Update local state
      setMealPlans(prev => prev.map(meal => 
        meal.id === mealId 
          ? { ...meal, is_completed: !isCompleted, completed_at: !isCompleted ? new Date().toISOString() : null }
          : meal
      ));

      // Update analytics
      if (!isCompleted) {
        await supabase
          .from('user_analytics')
          .upsert({
            user_id: user.id,
            date: new Date().toISOString().split('T')[0],
            metric_type: 'weekly_meal_completed',
            value: 1
          }, {
            onConflict: 'user_id,date,metric_type'
          });
      }

      toast({
        title: !isCompleted ? 'Meal Completed!' : 'Meal Unchecked',
        description: `Meal has been ${!isCompleted ? 'marked as completed' : 'unchecked'}.`,
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

  const getCompletionRate = () => {
    if (mealPlans.length === 0) return 0;
    const completedCount = mealPlans.filter(meal => meal.is_completed).length;
    return Math.round((completedCount / mealPlans.length) * 100);
  };

  const getMealsForDay = (dayIndex: number) => {
    return mealPlans.filter(meal => meal.day_of_week === dayIndex);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-primary" />
          Weekly Meal Calendar
        </h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            {getCompletionRate()}% Complete
          </Badge>
          <Button onClick={generateAndFetchMealPlan} size="sm" variant="outline">
            Refresh Plan
          </Button>
        </div>
      </div>

      {/* Weekly Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
        {dayNames.map((dayName, dayIndex) => (
          <Card key={dayIndex} className="p-4">
            <div className="mb-3">
              <h3 className="font-semibold text-lg text-center">
                {dayName}
              </h3>
              {dayIndex === new Date().getDay() && (
                <Badge className="w-full justify-center mt-1" variant="default">
                  Today
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              {mealTypes.map((mealType) => {
                const meal = getMealsForDay(dayIndex).find(m => m.meal_type === mealType);
                return (
                  <div key={mealType} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium capitalize">{mealType}</span>
                      {meal && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleMealCompletion(meal.id, meal.is_completed)}
                          className="p-0 h-6 w-6"
                        >
                          {meal.is_completed ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400" />
                          )}
                        </Button>
                      )}
                    </div>
                    {meal ? (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {meal.meal_name}
                        </p>
                        {meal.is_completed && (
                          <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                            Completed
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">No meal planned</p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly Summary */}
      <Card className="p-6 bg-primary/5">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Weekly Progress</h3>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="text-center">
              <p className="font-semibold text-2xl text-primary">{mealPlans.filter(m => m.is_completed).length}</p>
              <p className="text-gray-600 dark:text-gray-400">Completed</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-2xl text-gray-600">{mealPlans.length - mealPlans.filter(m => m.is_completed).length}</p>
              <p className="text-gray-600 dark:text-gray-400">Remaining</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-2xl text-primary">{getCompletionRate()}%</p>
              <p className="text-gray-600 dark:text-gray-400">Progress</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WeeklyMealCalendar;