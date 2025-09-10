
import React from 'react';
import { Card } from '@/components/ui/card';
import AppointmentSummary from '@/components/AppointmentSummary';
import DrugOrderSummary from '@/components/DrugOrderSummary';
import NotificationSettings from '@/components/NotificationSettings';
import { Activity, Calendar, ShoppingCart, Bell } from 'lucide-react';

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Health Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your health journey in one place
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold">Recent Appointments</h3>
          </div>
          <AppointmentSummary />
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Drug Orders</h3>
          </div>
          <DrugOrderSummary />
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <NotificationSettings />
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
