
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, TrendingUp, Calendar, Users, Pill, Heart, Activity, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import PremiumAnalytics from './PremiumAnalytics';
import PremiumFeatures from './PremiumFeatures';
import AppointmentSummary from './AppointmentSummary';
import DrugOrderSummary from './DrugOrderSummary';
import NotificationSettings from './NotificationSettings';

const PremiumDashboard = () => {
  const quickActions = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'View Analytics',
      description: 'Detailed health insights',
      action: 'analytics',
      color: 'bg-green-500'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Schedule Consultation',
      description: 'Book telehealth session',
      action: 'consultation',
      color: 'bg-blue-500'
    },
    {
      icon: <Pill className="h-6 w-6" />,
      title: 'Medication Tracker',
      description: 'Smart reminders',
      action: 'medication',
      color: 'bg-purple-500'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Family Health',
      description: 'Manage family records',
      action: 'family',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Premium Dashboard</h1>
              <p className="text-green-100">Welcome to your premium health management center</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="secondary"
                className="h-auto p-4 flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-none"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  {action.icon}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p className="text-xs text-green-100">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Dashboard Content - Same as Basic */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Premium Health Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Advanced health management with premium features
        </p>
      </div>

      {/* Summary Cards - Enhanced for Premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold">Recent Appointments</h3>
            <Crown className="h-4 w-4 text-yellow-500" />
          </div>
          <AppointmentSummary />
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Pill className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Drug Orders</h3>
            <Crown className="h-4 w-4 text-yellow-500" />
          </div>
          <DrugOrderSummary />
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Health Analytics</h3>
            <Crown className="h-4 w-4 text-yellow-500" />
          </div>
          <div className="text-center py-4">
            <div className="text-2xl font-bold text-green-600 mb-2">98%</div>
            <p className="text-sm text-gray-600">Health Score</p>
            <p className="text-xs text-gray-500 mt-2">Based on recent data</p>
          </div>
        </Card>
      </div>

      {/* Premium Analytics */}
      <PremiumAnalytics />

      {/* Premium Features Overview */}
      <PremiumFeatures />

      {/* Additional Premium Services */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Telehealth Consultations</h3>
              <p className="text-gray-600 text-sm mb-4">
                Connect with certified healthcare professionals for virtual consultations, 
                available 24/7 with priority scheduling.
              </p>
              <Button size="sm" className="bg-red-500 hover:bg-red-600">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Stethoscope className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Hospital Integration</h3>
              <p className="text-gray-600 text-sm mb-4">
                Seamless appointment booking with partner hospitals and automatic 
                synchronization of your health records.
              </p>
              <Link to="/hospital-booking">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PremiumDashboard;
