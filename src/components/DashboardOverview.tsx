
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Pill, Heart, Activity, Users, MessageSquare, FileText, Utensils, Crown, TrendingUp } from 'lucide-react';
import AppointmentSummary from './AppointmentSummary';
import DrugOrderSummary from './DrugOrderSummary';
import NotificationSettings from './NotificationSettings';
import MealPlanDisplay from './MealPlanDisplay';

interface DashboardOverviewProps {
  onSectionChange?: (section: string) => void;
}

const DashboardOverview = ({ onSectionChange }: DashboardOverviewProps) => {
  const handleChatClick = () => {
    if (onSectionChange) {
      onSectionChange('chat');
    }
  };

  const handleBlogClick = () => {
    if (onSectionChange) {
      onSectionChange('blog');
    }
  };

  const handleMealTrackerClick = () => {
    if (onSectionChange) {
      onSectionChange('meal-tracker');
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center mb-6 animate-on-scroll">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Your Health Dashboard
        </h1>
        <p className="text-gray-600">
          Track your health journey and manage your wellness goals
        </p>
      </div>

      {/* Premium Upgrade Banner for Basic Users */}
      <div className="animate-on-scroll">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Crown className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
              <p className="text-green-100 mb-4">
                Unlock advanced health features, AI insights, and priority support. Get premium access FREE until November 30th!
              </p>
              <Link to="/premium">
                <Button className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
                  Get Premium - FREE until Nov 30th
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Health Overview */}
      <div className="animate-on-scroll">
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Utensils className="h-6 w-6 text-green-600" />
            Today's Meal Plan
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-gray-800">Breakfast</h4>
              <p className="text-sm text-gray-600">Oatmeal with berries</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-gray-800">Lunch</h4>
              <p className="text-sm text-gray-600">Grilled chicken salad</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-gray-800">Dinner</h4>
              <p className="text-sm text-gray-600">Baked salmon with vegetables</p>
            </div>
          </div>
          <Button onClick={handleMealTrackerClick} className="w-full bg-green-600 hover:bg-green-700">
            View Full Meal Plan
          </Button>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Health Score</h3>
              <p className="text-2xl font-bold text-green-600">85%</p>
              <p className="text-sm text-gray-600">Good progress</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Daily Goals</h3>
              <p className="text-2xl font-bold text-blue-600">3/5</p>
              <p className="text-sm text-gray-600">Completed today</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Next Checkup</h3>
              <p className="text-lg font-bold text-purple-600">Dec 15</p>
              <p className="text-sm text-gray-600">Dr. Smith - 2:00 PM</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-white border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold">Recent Appointments</h3>
          </div>
          <AppointmentSummary />
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <Pill className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Drug Orders</h3>
          </div>
          <DrugOrderSummary />
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-white border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Health Analytics</h3>
          </div>
          <div className="text-center py-4">
            <div className="text-2xl font-bold text-green-600 mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6" />
              98%
            </div>
            <p className="text-sm text-gray-600">Health Score</p>
            <p className="text-xs text-gray-500 mt-2">Based on recent data</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-white border-green-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">AI Health Assistant</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get instant answers to your health questions and personalized recommendations.
              </p>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300"
                onClick={handleChatClick}
              >
                Chat Now
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Health Blog</h3>
              <p className="text-gray-600 text-sm mb-4">
                Stay informed with the latest health tips, articles, and medical insights.
              </p>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                onClick={handleBlogClick}
              >
                Read Articles
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
