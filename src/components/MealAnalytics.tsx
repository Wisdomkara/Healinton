import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

interface MealData {
  date: string;
  completionRate: number;
  mealsCompleted: number;
}

const MealAnalytics = () => {
  const { user } = useAuth();
  const [monthlyData, setMonthlyData] = useState<MealData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMonthlyData();
    }
  }, [user]);

  const fetchMonthlyData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const today = new Date();
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);

      // Fetch meal completions for current month
      const { data, error } = await supabase
        .from('meal_completions')
        .select('meal_date, completed')
        .eq('user_id', user.id)
        .gte('meal_date', format(monthStart, 'yyyy-MM-dd'))
        .lte('meal_date', format(monthEnd, 'yyyy-MM-dd'))
        .order('meal_date');

      if (error) throw error;

      // Process data to get daily completion rates
      const dailyStats: Record<string, { completed: number; total: number }> = {};

      data?.forEach(item => {
        const date = item.meal_date;
        if (!dailyStats[date]) {
          dailyStats[date] = { completed: 0, total: 0 };
        }
        dailyStats[date].total += 1;
        if (item.completed) {
          dailyStats[date].completed += 1;
        }
      });

      // Create array of all days in month with their completion rates
      const allDays = eachDayOfInterval({ start: monthStart, end: today });
      const chartData: MealData[] = allDays.map(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const stats = dailyStats[dateStr];
        
        return {
          date: format(day, 'MMM dd'),
          completionRate: stats ? Math.round((stats.completed / stats.total) * 100) : 0,
          mealsCompleted: stats?.completed || 0
        };
      });

      setMonthlyData(chartData);
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAverageCompletion = () => {
    if (monthlyData.length === 0) return 0;
    const sum = monthlyData.reduce((acc, day) => acc + day.completionRate, 0);
    return Math.round(sum / monthlyData.length);
  };

  const getTotalMeals = () => {
    return monthlyData.reduce((acc, day) => acc + day.mealsCompleted, 0);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
          Monthly Progress Analytics
        </h2>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-green-50 dark:bg-green-900/20">
          <div className="text-center">
            <p className="text-sm text-green-800 dark:text-green-200 mb-1">Average Completion</p>
            <p className="text-3xl font-bold text-green-600">{getAverageCompletion()}%</p>
          </div>
        </Card>
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
          <div className="text-center">
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-1">Total Meals Completed</p>
            <p className="text-3xl font-bold text-blue-600">{getTotalMeals()}</p>
          </div>
        </Card>
        <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
          <div className="text-center">
            <p className="text-sm text-purple-800 dark:text-purple-200 mb-1">Days Tracked</p>
            <p className="text-3xl font-bold text-purple-600">{monthlyData.filter(d => d.mealsCompleted > 0).length}</p>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            Daily Completion Rate - {format(new Date(), 'MMMM yyyy')}
          </h3>
        </div>
        
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="date" 
                className="text-xs text-gray-600 dark:text-gray-400"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs text-gray-600 dark:text-gray-400"
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#374151', fontWeight: 'bold' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="completionRate" 
                stroke="#16a34a" 
                strokeWidth={2}
                name="Completion Rate (%)"
                dot={{ fill: '#16a34a', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>No meal data available yet. Start tracking your meals to see progress!</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MealAnalytics;
