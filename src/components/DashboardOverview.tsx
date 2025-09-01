
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Pill, Heart, Activity, Users, MessageSquare, FileText, Utensils } from 'lucide-react';
import AppointmentSummary from './AppointmentSummary';
import DrugOrderSummary from './DrugOrderSummary';
import NotificationSettings from './NotificationSettings';
import MealPlanDisplay from './MealPlanDisplay';

const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center mb-8 animate-on-scroll">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Your Health Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your health journey and manage your wellness goals
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold">Health Score</h3>
              <p className="text-2xl font-bold text-green-600">85%</p>
              <p className="text-sm text-gray-600">Good progress</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold">Daily Goals</h3>
              <p className="text-2xl font-bold text-blue-600">3/5</p>
              <p className="text-sm text-gray-600">Completed today</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="text-lg font-semibold">Next Appointment</h3>
              <p className="text-lg font-bold text-purple-600">Tomorrow</p>
              <p className="text-sm text-gray-600">Dr. Smith - 2:00 PM</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Meal Plans Section */}
      <div className="animate-on-scroll">
        <MealPlanDisplay />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold">Recent Appointments</h3>
          </div>
          <AppointmentSummary />
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <Pill className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Drug Orders</h3>
          </div>
          <DrugOrderSummary />
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <NotificationSettings />
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">AI Health Assistant</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get instant answers to your health questions and personalized recommendations.
              </p>
              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                Chat Now
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 animate-on-scroll hover:shadow-lg transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Health Blog</h3>
              <p className="text-gray-600 text-sm mb-4">
                Stay informed with the latest health tips, articles, and medical insights.
              </p>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
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
