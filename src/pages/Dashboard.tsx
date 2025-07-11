
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardOverview from '@/components/DashboardOverview';
import HealthMetricsForm from '@/components/HealthMetricsForm';
import SymptomLogger from '@/components/SymptomLogger';
import EnhancedHospitalBooking from '@/components/EnhancedHospitalBooking';
import NotificationSettings from '@/components/NotificationSettings';
import ReminderForm from '@/components/ReminderForm';
import EnhancedMealTracker from '@/components/EnhancedMealTracker';
import ShoppingList from '@/components/ShoppingList';
import AIChat from '@/components/AIChat';
import HealthBlog from '@/components/HealthBlog';
import Settings from '@/components/Settings';
import DrugStore from '@/components/DrugStore';
import HospitalForm from '@/components/HospitalForm';
import RateUs from '@/components/RateUs';

const Dashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const userName = user?.user_metadata?.first_name || 'User';

  const renderContent = () => {
    switch (activeSection) {
      case 'health-metrics':
        return <HealthMetricsForm />;
      case 'symptoms':
        return <SymptomLogger />;
      case 'appointments':
        return <EnhancedHospitalBooking />;
      case 'notifications':
        return <NotificationSettings />;
      case 'reminders':
        return <ReminderForm />;
      case 'meal-tracker':
        return <EnhancedMealTracker />;
      case 'shopping':
        return <ShoppingList />;
      case 'drugs':
        return <DrugStore />;
      case 'hospital-info':
        return <HospitalForm />;
      case 'chat':
        return <AIChat />;
      case 'blog':
        return <HealthBlog />;
      case 'rate-us':
        return <RateUs />;
      case 'settings':
        return <Settings />;
      case 'overview':
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      {/* Mobile Header */}
      <DashboardHeader 
        onMenuClick={() => setSidebarOpen(true)} 
        userName={userName}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onSectionChange={setActiveSection}
        activeSection={activeSection}
      />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <div className="flex-1 p-6 pt-20 md:pt-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
