
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Circle, Utensils } from 'lucide-react';

const budgetMealPlans = {
  'low-budget': {
    breakfast: ['Oatmeal with banana', 'Toast with peanut butter', 'Scrambled eggs'],
    lunch: ['Rice and beans', 'Vegetable soup', 'Pasta with tomato sauce'],
    dinner: ['Grilled chicken with rice', 'Fish stew', 'Vegetable stir-fry']
  },
  'high-budget': {
    breakfast: ['Avocado toast with eggs', 'Greek yogurt with berries', 'Protein smoothie bowl'],
    lunch: ['Grilled salmon salad', 'Quinoa bowl with vegetables', 'Chicken caesar wrap'],
    dinner: ['Steak with roasted vegetables', 'Lobster with pasta', 'Lamb chops with quinoa']
  }
};

const EnhancedMealTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedBudget, setSelectedBudget] = useState<'low-budget' | 'high-budget'>('low-budget');
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({});
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (user) {
      fetchMealCompletions();
    }
  }, [user, selectedBudget]);

  const fetchMealCompletions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('meal_completions')
      .select('*')
      .eq('user_id', user.id)
      .eq('budget_type', selectedBudget)
      .eq('meal_date', currentDate);

    if (error) {
      console.error('Error fetching meal completions:', error);
      return;
    }

    const completions: Record<string, boolean> = {};
    data?.forEach(item => {
      completions[item.meal_time] = item.completed;
    });
    setCompletedMeals(completions);
  };

  const toggleMealCompletion = async (mealTime: string) => {
    if (!user) return;

    const isCompleted = !completedMeals[mealTime];

    try {
      const { error } = await supabase
        .from('meal_completions')
        .upsert({
          user_id: user.id,
          budget_type: selectedBudget,
          meal_date: currentDate,
          meal_time: mealTime,
          completed: isCompleted
        }, {
          onConflict: 'user_id,budget_type,meal_date,meal_time'
        });

      if (error) throw error;

      setCompletedMeals(prev => ({
        ...prev,
        [mealTime]: isCompleted
      }));

      toast({
        title: isCompleted ? 'Meal Completed!' : 'Meal Unchecked',
        description: `${mealTime.charAt(0).toUpperCase() + mealTime.slice(1)} has been ${isCompleted ? 'marked as completed' : 'unchecked'}.`,
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

  const getMealSuggestions = (mealTime: string) => {
    return budgetMealPlans[selectedBudget][mealTime as keyof typeof budgetMealPlans['low-budget']] || [];
  };

  const getCompletionRate = () => {
    const totalMeals = 3; // breakfast, lunch, dinner
    const completedCount = Object.values(completedMeals).filter(Boolean).length;
    return Math.round((completedCount / totalMeals) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Utensils className="h-6 w-6 mr-2 text-green-600" />
          Meal Tracker
        </h2>
        <Badge variant="outline" className="text-sm">
          {getCompletionRate()}% Complete
        </Badge>
      </div>

      {/* Budget Selection */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant={selectedBudget === 'low-budget' ? 'default' : 'outline'}
          onClick={() => setSelectedBudget('low-budget')}
          className={`flex-1 ${selectedBudget === 'low-budget' ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          Low Budget Meals
        </Button>
        <Button
          variant={selectedBudget === 'high-budget' ? 'default' : 'outline'}
          onClick={() => setSelectedBudget('high-budget')}
          className={`flex-1 ${selectedBudget === 'high-budget' ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          High Budget Meals
        </Button>
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['breakfast', 'lunch', 'dinner'].map((mealTime) => (
          <Card key={mealTime} className="p-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg capitalize">{mealTime}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleMealCompletion(mealTime)}
                  className="p-0 h-8 w-8"
                >
                  {completedMeals[mealTime] ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400" />
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Suggested meals:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {getMealSuggestions(mealTime).map((meal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{meal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {completedMeals[mealTime] && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Completed
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Progress Summary */}
      <Card className="p-4 bg-green-50 dark:bg-green-900/20">
        <div className="text-center">
          <p className="text-sm text-green-800 dark:text-green-200 mb-2">
            Today's Progress ({selectedBudget.replace('-', ' ').toUpperCase()})
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className={`${completedMeals.breakfast ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
              Breakfast ✓
            </span>
            <span className={`${completedMeals.lunch ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
              Lunch ✓
            </span>
            <span className={`${completedMeals.dinner ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
              Dinner ✓
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedMealTracker;
