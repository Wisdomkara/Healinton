
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getMealPlanForIllness } from '@/utils/mealPlans';
import { CheckCircle, Clock, TrendingUp, Calendar } from 'lucide-react';

interface MealTrackerProps {
  userProfile: any;
}

const MealTracker = ({ userProfile }: MealTrackerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mealCompletions, setMealCompletions] = useState<any[]>([]);
  const [todayCompletions, setTodayCompletions] = useState<any>({});
  const [weeklyStats, setWeeklyStats] = useState({ completed: 0, total: 0 });

  const today = new Date().toISOString().split('T')[0];
  const todaysMealPlan = userProfile?.illness_type 
    ? getMealPlanForIllness(userProfile.illness_type)
    : getMealPlanForIllness('hypertension');

  useEffect(() => {
    if (user) {
      fetchMealCompletions();
      fetchWeeklyStats();
    }
  }, [user]);

  const fetchMealCompletions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('meal_tracking')
      .select('*')
      .eq('user_id', user.id)
      .eq('meal_date', today);

    if (error) {
      console.error('Error fetching meal completions:', error);
      return;
    }

    const completionsMap = {};
    data?.forEach(completion => {
      completionsMap[completion.meal_time] = completion.completed;
    });

    setTodayCompletions(completionsMap);
  };

  const fetchWeeklyStats = async () => {
    if (!user) return;

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('meal_tracking')
      .select('*')
      .eq('user_id', user.id)
      .gte('meal_date', weekAgoStr)
      .lte('meal_date', today);

    if (error) {
      console.error('Error fetching weekly stats:', error);
      return;
    }

    const completed = data?.filter(item => item.completed).length || 0;
    const total = data?.length || 0;

    setWeeklyStats({ completed, total: Math.max(total, 21) }); // 3 meals × 7 days = 21
  };

  const handleMealCompletion = async (mealTime: string) => {
    if (!user || !userProfile?.illness_type) return;

    const isCompleted = !todayCompletions[mealTime];

    try {
      const { error } = await supabase
        .from('meal_tracking')
        .upsert({
          user_id: user.id,
          meal_date: today,
          meal_time: mealTime,
          illness_type: userProfile.illness_type,
          completed: isCompleted
        }, {
          onConflict: 'user_id,meal_date,meal_time'
        });

      if (error) throw error;

      // Update analytics
      const completionRate = Object.values({
        ...todayCompletions,
        [mealTime]: isCompleted
      }).filter(Boolean).length / 3 * 100;

      await supabase
        .from('user_analytics')
        .upsert({
          user_id: user.id,
          metric_type: 'meal_compliance',
          value: completionRate,
          date: today
        }, {
          onConflict: 'user_id,metric_type,date'
        });

      setTodayCompletions(prev => ({
        ...prev,
        [mealTime]: isCompleted
      }));

      fetchWeeklyStats();

      toast({
        title: isCompleted ? 'Meal Completed!' : 'Meal Unchecked',
        description: isCompleted 
          ? 'Great job following your meal plan!'
          : 'Meal unmarked from your progress.',
      });

    } catch (error) {
      console.error('Error updating meal completion:', error);
      toast({
        title: 'Error',
        description: 'Failed to update meal completion.',
        variant: 'destructive'
      });
    }
  };

  const getMealCompletionRate = () => {
    const completed = Object.values(todayCompletions).filter(Boolean).length;
    return Math.round((completed / 3) * 100);
  };

  const getWeeklyCompletionRate = () => {
    return weeklyStats.total > 0 ? Math.round((weeklyStats.completed / weeklyStats.total) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Today's Progress */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            Today's Meal Progress
          </h3>
          <div className="text-2xl font-bold text-green-600">
            {getMealCompletionRate()}%
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getMealCompletionRate()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {Object.values(todayCompletions).filter(Boolean).length} of 3 meals completed today
        </p>
      </Card>

      {/* Weekly Stats */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Weekly Success Rate
          </h3>
          <div className="text-2xl font-bold text-blue-600">
            {getWeeklyCompletionRate()}%
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getWeeklyCompletionRate()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {weeklyStats.completed} of {weeklyStats.total} meals completed this week
        </p>
      </Card>

      {/* Today's Meals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['morning', 'afternoon', 'night'].map((time) => (
          <Card key={time} className="p-4 hover:shadow-lg transition-all">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-5 w-5 mr-2 text-gray-600" />
                <h4 className="font-semibold capitalize">{time}</h4>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {todaysMealPlan[time as keyof typeof todaysMealPlan]?.low}
                </p>
              </div>

              <Button
                onClick={() => handleMealCompletion(time)}
                variant={todayCompletions[time] ? "default" : "outline"}
                className={`w-full ${
                  todayCompletions[time] 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'hover:bg-green-50 border-green-300'
                }`}
              >
                {todayCompletions[time] ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  'Mark as Completed'
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MealTracker;
