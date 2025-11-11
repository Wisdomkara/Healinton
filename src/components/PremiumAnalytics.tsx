
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const PremiumAnalytics = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState({
    mealCompletion: [],
    healthMetrics: [],
    weeklyProgress: [],
    overallStats: {
      mealsCompleted: 0,
      totalMeals: 0,
      healthRecordsLogged: 0,
      streakDays: 0
    }
  });

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    }
  }, [user]);

  // Realtime updates when meal completions change for this user
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel('premium-analytics-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'meal_completions', filter: `user_id=eq.${user.id}` },
        () => {
          fetchAnalyticsData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch meal completion data (last 30 days by meal_date)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const startStr = startDate.toISOString().split('T')[0];

      const { data: mealData } = await supabase
        .from('meal_completions')
        .select('*')
        .eq('user_id', user?.id)
        .gte('meal_date', startStr);

      // Fetch health metrics data
      const { data: healthData } = await supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', user?.id)
        .gte('recorded_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      // Process meal completion data by day
      const mealsByDay = {};
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      last7Days.forEach(day => {
        const dayMeals = mealData?.filter(meal => 
          meal.meal_date === day
        ) || [];
        
        const completedMeals = dayMeals.filter(meal => meal.completed).length;
        const totalMeals = dayMeals.length || 3; // Assume 3 meals per day if no data
        
        mealsByDay[day] = {
          date: new Date(day).toLocaleDateString('en-US', { weekday: 'short' }),
          completed: completedMeals,
          total: totalMeals,
          percentage: totalMeals > 0 ? Math.round((completedMeals / totalMeals) * 100) : 0
        };
      });

      // Calculate overall stats
      const totalMealsCompleted = mealData?.filter(meal => meal.completed).length || 0;
      const totalMeals = mealData?.length || 0;
      const healthRecordsLogged = healthData?.length || 0;
      
      // Calculate streak (simplified)
      const streakDays = calculateStreak(mealData || []);

      setAnalyticsData({
        mealCompletion: Object.values(mealsByDay),
        healthMetrics: processHealthMetrics(healthData || []),
        weeklyProgress: Object.values(mealsByDay),
        overallStats: {
          mealsCompleted: totalMealsCompleted,
          totalMeals: Math.max(totalMeals, 21), // At least 21 meals for 7 days
          healthRecordsLogged,
          streakDays
        }
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  const calculateStreak = (mealData: any[]) => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      const dayMeals = mealData.filter(meal => meal.meal_date === dateStr);
      const hasCompletedMeal = dayMeals.some(meal => meal.completed);
      
      if (hasCompletedMeal) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const processHealthMetrics = (healthData: any[]) => {
    return healthData.slice(-7).map((record, index) => ({
      day: `Day ${index + 1}`,
      weight: record.weight || 0,
      bloodPressure: record.blood_pressure_systolic || 0,
      bloodSugar: record.blood_sugar || 0
    }));
  };

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const mealCompletionData = [
    { name: 'Completed', value: analyticsData.overallStats.mealsCompleted },
    { name: 'Missed', value: analyticsData.overallStats.totalMeals - analyticsData.overallStats.mealsCompleted }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Premium Health Analytics</h2>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Meals Completed</p>
                <p className="text-3xl font-bold">{analyticsData.overallStats.mealsCompleted}</p>
                <p className="text-green-100 text-xs">
                  {Math.round((analyticsData.overallStats.mealsCompleted / analyticsData.overallStats.totalMeals) * 100)}% completion rate
                </p>
              </div>
              <Target className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Health Records</p>
                <p className="text-3xl font-bold">{analyticsData.overallStats.healthRecordsLogged}</p>
                <p className="text-blue-100 text-xs">Records logged</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Current Streak</p>
                <p className="text-3xl font-bold">{analyticsData.overallStats.streakDays}</p>
                <p className="text-purple-100 text-xs">Days in a row</p>
              </div>
              <Award className="h-8 w-8 text-purple-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">This Week</p>
                <p className="text-3xl font-bold">{analyticsData.weeklyProgress.reduce((acc, day) => acc + day.completed, 0)}</p>
                <p className="text-orange-100 text-xs">Meals completed</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Meal Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Meal Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mealCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mealCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {analyticsData.healthMetrics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Health Metrics Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.healthMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="bloodPressure" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PremiumAnalytics;
