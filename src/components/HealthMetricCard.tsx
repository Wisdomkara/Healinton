
import React from 'react';
import { Card } from '@/components/ui/card';

interface HealthMetricCardProps {
  title: string;
  value: string;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color?: string;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  title,
  value,
  unit,
  trend = 'stable',
  icon,
  color = 'primary'
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendSymbol = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <Card className="healthcare-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              {icon}
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          <span className="text-sm font-medium">{getTrendSymbol()}</span>
        </div>
      </div>
    </Card>
  );
};

export default HealthMetricCard;
