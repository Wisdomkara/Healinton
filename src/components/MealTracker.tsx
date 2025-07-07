import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CheckCircle2, Circle, TrendingUp, Calendar, Target } from 'lucide-react';
import { useMealTracking } from '@/hooks/useMealTracking';
import { getDailyMealPlan } from '@/utils/monthlyMealPlans';

interface MealTrackerProps {
  illnessType: string;
  day?: number;
}

const MealTracker: React.FC<MealTrackerProps> = ({ illnessType, day = 1 }) => {
  const { toggleMealCompletion, getMealCompletionStatus, loading, getWeeklyStats, getMonthlyStats } = useMealTracking();
  
  const today = new Date().toISOString().split('T')[0];
  const dailyMealPlan = getDailyMealPlan(illnessType, day);
  
  const weeklyStats = getWeeklyStats();
  const monthlyStats = getMonthlyStats();

  const handleMealClick = (mealTime: string, budgetType: string) => {
    toggleMealCompletion(today, mealTime, budgetType);
  };

  const renderMealCard = (time: string, meal: { low: string; high: string }) => {
    const lowCompleted = getMealCompletionStatus(today, time, 'low');
    const highCompleted = getMealCompletionStatus(today, time, 'high');

    return (
      <Card key={time} className="p-4 space-y-4 hover:shadow-lg transition-all">
        <h3 className="font-semibold text-lg capitalize text-green-700 dark:text-green-300 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          {time}
        </h3>
        
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Low Budget</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMealClick(time, 'low')}
                disabled={loading}
                className={`p-2 rounded-full ${lowCompleted ? 'text-green-600 bg-green-100' : 'text-gray-400'}`}
              >
                {lowCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 break-words">{meal.low}</p>
          </div>
          
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">High Budget</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMealClick(time, 'high')}
                disabled={loading}
                className={`p-2 rounded-full ${highCompleted ? 'text-blue-600 bg-blue-100' : 'text-gray-400'}`}
              >
                {highCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 break-words">{meal.high}</p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Weekly Progress</p>
              <p className="text-2xl font-bold text-green-600">{weeklyStats.percentage}%</p>
              <p className="text-xs text-gray-500">{weeklyStats.completed}/{weeklyStats.total} meals</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Monthly Progress</p>
              <p className="text-2xl font-bold text-blue-600">{monthlyStats.percentage}%</p>
              <p className="text-xs text-gray-500">{monthlyStats.completed}/{monthlyStats.total} meals</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Check className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Today's Status</p>
              <div className="flex space-x-1 mt-1">
                {['morning', 'afternoon', 'night'].map(time => {
                  const lowDone = getMealCompletionStatus(today, time, 'low');
                  const highDone = getMealCompletionStatus(today, time, 'high');
                  return (
                    <Badge 
                      key={time} 
                      variant={lowDone || highDone ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {time[0].toUpperCase()}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Meal Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(dailyMealPlan).map(([time, meal]) => 
          renderMealCard(time, meal as { low: string; high: string })
        )}
      </div>

      {/* Instructions */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <div className="flex items-start space-x-3">
          <CheckCircle2 className="h-6 w-6 text-green-600 mt-1" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">How to use meal tracking</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Click the circle icon next to each meal after you've completed it. Track your progress daily to build healthy eating habits and see your improvement over time!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MealTracker;