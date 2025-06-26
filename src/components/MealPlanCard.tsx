
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Heart } from 'lucide-react';

interface MealPlanCardProps {
  title: string;
  description: string;
  calories: number;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  healthScore: number;
  imageUrl?: string;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({
  title,
  description,
  calories,
  prepTime,
  difficulty,
  healthScore,
  imageUrl
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  return (
    <Card className="healthcare-card overflow-hidden">
      {imageUrl && (
        <div className="aspect-video w-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
          <div className="text-4xl">🥗</div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
            {difficulty}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{prepTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🔥</span>
              <span>{calories} cal</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span>{healthScore}/10</span>
            </div>
          </div>
        </div>

        <Button className="w-full healthcare-button">
          View Recipe
        </Button>
      </div>
    </Card>
  );
};

export default MealPlanCard;
