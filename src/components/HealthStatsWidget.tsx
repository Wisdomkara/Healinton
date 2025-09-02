
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Heart, Droplets, Weight } from 'lucide-react';

const HealthStatsWidget = () => {
  const { user } = useAuth();
  const [healthMetrics, setHealthMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHealthMetrics();
    }
  }, [user]);

  const fetchHealthMetrics = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      setHealthMetrics(data?.[0] || null);
    } catch (error) {
      console.error('Error fetching health metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  const stats = [
    {
      icon: <Activity className="h-5 w-5 text-green-600" />,
      label: 'Blood Pressure',
      value: healthMetrics?.blood_pressure_systolic && healthMetrics?.blood_pressure_diastolic 
        ? `${healthMetrics.blood_pressure_systolic}/${healthMetrics.blood_pressure_diastolic}`
        : 'Not recorded',
      unit: 'mmHg'
    },
    {
      icon: <Droplets className="h-5 w-5 text-blue-600" />,
      label: 'Blood Sugar',
      value: healthMetrics?.blood_sugar || 'Not recorded',
      unit: 'mg/dL'
    },
    {
      icon: <Weight className="h-5 w-5 text-purple-600" />,
      label: 'Weight',
      value: healthMetrics?.weight || 'Not recorded',
      unit: 'kg'
    },
    {
      icon: <Heart className="h-5 w-5 text-red-600" />,
      label: 'Health Score',
      value: '85',
      unit: '%'
    }
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
        <Activity className="h-5 w-5 text-green-600 mr-2" />
        Health Overview
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {stat.icon}
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {stat.value} {typeof stat.value === 'number' || (stat.value !== 'Not recorded') ? stat.unit : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HealthStatsWidget;
