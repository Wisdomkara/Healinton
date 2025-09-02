
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIAssistantWidget = () => {
  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700/30">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-full">
          <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">AI Health Assistant</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">Get instant health advice and support</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span>Available 24/7 for health questions</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Heart className="h-4 w-4 text-red-500" />
          <span>Personalized advice based on your condition</span>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Link to="/community" className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat Now
            </Button>
          </Link>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
          Quick tips: Ask about medications, symptoms, or diet advice
        </div>
      </div>
    </Card>
  );
};

export default AIAssistantWidget;
