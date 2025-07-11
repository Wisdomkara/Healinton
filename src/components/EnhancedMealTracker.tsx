
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { getMealPlanForIllness } from '@/utils/mealPlans';
import { Utensils, Clock, DollarSign } from 'lucide-react';

interface MealTrackerProps {
  userProfile: any;
}

const EnhancedMealTracker = ({ userProfile }: MealTrackerProps) => {
  const { user } = useAuth();
  const [mealCompletions, setMealCompletions] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const illnessType = userProfile?.illness_type || 'hypertension';
  const mealPlan = getMealPlanForIllness(illnessType);
  const today = new Date().toISOString().split('T')[0];

  const mealTimes = ['morning', 'afternoon', 'night'];
  const budgetTypes = ['low', 'high'];

  useEffect(() => {
    if (user) {
      fetchMealCompletions();
    }
  }, [user]);

  const fetchMealCompletions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('meal_completions')
        .select('*')
        .eq('user_id', user.id)
        .eq('meal_date', today);

      if (error) throw error;

      const completionsMap: any = {};
      data?.forEach((completion) => {
        const key = `${completion.meal_time}-${completion.budget_type}`;
        completionsMap[key] = completion.completed;
      });

      setMealCompletions(completionsMap);
    } catch (error) {
      console.error('Error fetching meal completions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMealCompletion = async (mealTime: string, budgetType: string) => {
    if (!user) return;

    const key = `${mealTime}-${budgetType}`;
    const currentState = mealCompletions[key] || false;
    const newState = !currentState;

    try {
      const { error } = await supabase
        .from('meal_completions')
        .upsert({
          user_id: user.id,
          meal_date: today,
          meal_time: mealTime,
          budget_type: budgetType,
          completed: newState
        }, {
          onConflict: 'user_id,meal_date,meal_time,budget_type'
        });

      if (error) throw error;

      setMealCompletions(prev => ({
        ...prev,
        [key]: newState
      }));
    } catch (error) {
      console.error('Error updating meal completion:', error);
    }
  };

  const getMealIcon = (mealTime: string) => {
    switch (mealTime) {
      case 'morning': return '🌅';
      case 'afternoon': return '☀️';
      case 'night': return '🌙';
      default: return '🍽️';
    }
  };

  const getBudgetIcon = (budgetType: string) => {
    return budgetType === 'low' ? '💰' : '💎';
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Utensils className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold">Today's Meal Tracker</h3>
      </div>

      <div className="space-y-4">
        {mealTimes.map((mealTime) => (
          <div key={mealTime} className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl">{getMealIcon(mealTime)}</span>
              <h4 className="font-medium capitalize">{mealTime}</h4>
              <Clock className="h-4 w-4 text-gray-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetTypes.map((budgetType) => {
                const key = `${mealTime}-${budgetType}`;
                const isCompleted = mealCompletions[key] || false;
                const mealContent = mealPlan[mealTime as keyof typeof mealPlan][budgetType as keyof typeof mealPlan.morning];

                return (
                  <div key={budgetType} className={`p-3 border rounded-lg transition-colors ${
                    isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span>{getBudgetIcon(budgetType)}</span>
                        <span className="text-sm font-medium capitalize">{budgetType} Budget</span>
                      </div>
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => toggleMealCompletion(mealTime, budgetType)}
                      />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{mealContent}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Today's Progress</span>
          <span className="font-medium">
            {Object.values(mealCompletions).filter(Boolean).length} / {mealTimes.length * budgetTypes.length} meals completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ 
              width: `${(Object.values(mealCompletions).filter(Boolean).length / (mealTimes.length * budgetTypes.length)) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedMealTracker;
