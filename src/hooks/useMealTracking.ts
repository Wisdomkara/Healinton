import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface MealCompletion {
  id: string;
  meal_date: string;
  meal_time: string;
  completed: boolean;
  budget_type: string;
}

export const useMealTracking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [completions, setCompletions] = useState<MealCompletion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCompletions = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('meal_completions')
      .select('*')
      .eq('user_id', user.id)
      .order('meal_date', { ascending: false });
    
    setCompletions(data || []);
  };

  useEffect(() => {
    if (user) {
      fetchCompletions();
    }
  }, [user]);

  const toggleMealCompletion = async (date: string, mealTime: string, budgetType: string) => {
    if (!user) return;

    setLoading(true);
    
    const existingCompletion = completions.find(
      c => c.meal_date === date && c.meal_time === mealTime && c.budget_type === budgetType
    );

    if (existingCompletion) {
      // Update existing completion
      const { error } = await supabase
        .from('meal_completions')
        .update({ completed: !existingCompletion.completed })
        .eq('id', existingCompletion.id);

      if (!error) {
        toast({
          title: existingCompletion.completed ? "Meal unmarked" : "Great job!",
          description: existingCompletion.completed 
            ? "Meal completion unmarked" 
            : "Meal marked as completed! Keep up the good work!",
        });
        fetchCompletions();
      }
    } else {
      // Create new completion
      const { error } = await supabase
        .from('meal_completions')
        .insert({
          user_id: user.id,
          meal_date: date,
          meal_time: mealTime,
          budget_type: budgetType,
          completed: true
        });

      if (!error) {
        toast({
          title: "Great job!",
          description: "Meal marked as completed! Keep up the good work!",
        });
        fetchCompletions();
      }
    }
    
    setLoading(false);
  };

  const getMealCompletionStatus = (date: string, mealTime: string, budgetType: string) => {
    const completion = completions.find(
      c => c.meal_date === date && c.meal_time === mealTime && c.budget_type === budgetType
    );
    return completion?.completed || false;
  };

  const getWeeklyStats = () => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const weeklyCompletions = completions.filter(c => 
      new Date(c.meal_date) >= lastWeek && c.completed
    );
    
    return {
      completed: weeklyCompletions.length,
      total: 21, // 3 meals × 7 days
      percentage: Math.round((weeklyCompletions.length / 21) * 100)
    };
  };

  const getMonthlyStats = () => {
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);
    
    const monthlyCompletions = completions.filter(c => 
      new Date(c.meal_date) >= lastMonth && c.completed
    );
    
    return {
      completed: monthlyCompletions.length,
      total: 90, // 3 meals × 30 days
      percentage: Math.round((monthlyCompletions.length / 90) * 100)
    };
  };

  return {
    completions,
    loading,
    toggleMealCompletion,
    getMealCompletionStatus,
    getWeeklyStats,
    getMonthlyStats
  };
};