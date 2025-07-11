
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar 
            isOpen={true}
            onSectionChange={setActiveSection}
            activeSection={activeSection}
          />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
            <Sidebar 
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onSectionChange={(section) => {
                setActiveSection(section);
                setSidebarOpen(false);
              }}
              activeSection={activeSection}
            />
          </div>
        </>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header - only visible on mobile */}
        <div className="lg:hidden">
          <DashboardHeader 
            onMenuClick={() => setSidebarOpen(true)} 
            userName={userName}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
