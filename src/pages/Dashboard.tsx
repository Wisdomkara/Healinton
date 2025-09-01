
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { supabase } from '@/integrations/supabase/client';
import DashboardHeader from '@/components/DashboardHeader';
import Sidebar from '@/components/Sidebar';
import DashboardOverview from '@/components/DashboardOverview';
import PremiumDashboard from '@/components/PremiumDashboard';
import PremiumBanner from '@/components/PremiumBanner';
import IllnessSettings from '@/components/IllnessSettings';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import HealthMetricsForm from '@/components/HealthMetricsForm';
import SymptomLogger from '@/components/SymptomLogger';
import MealTracker from '@/components/MealTracker';
import EnhancedMealTracker from '@/components/EnhancedMealTracker';
import ShoppingList from '@/components/ShoppingList';
import DrugStore from '@/components/DrugStore';
import AIChat from '@/components/AIChat';
import HealthBlog from '@/components/HealthBlog';
import ReminderForm from '@/components/ReminderForm';
import NotificationCenter from '@/components/NotificationCenter';
import Settings from '@/components/Settings';
import RateUs from '@/components/RateUs';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { isPremium, loading: premiumLoading } = usePremium();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
      } else {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeSection]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (premiumLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const userName = user?.user_metadata?.first_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {!isPremium && <div className="animate-on-scroll"><PremiumBanner /></div>}
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="animate-on-scroll"><IllnessSettings /></div>
              {isPremium && <div className="animate-on-scroll"><SubscriptionStatus /></div>}
            </div>
            
            <div className="animate-on-scroll">
              {isPremium ? <PremiumDashboard /> : <DashboardOverview />}
            </div>
          </div>
        );
      case 'health-metrics':
        return (
          <div className="animate-on-scroll">
            <HealthMetricsForm />
          </div>
        );
      case 'symptoms':
        return (
          <div className="animate-on-scroll">
            <SymptomLogger />
          </div>
        );
      case 'meal-tracker':
        return (
          <div className="animate-on-scroll">
            {isPremium ? (
              <EnhancedMealTracker />
            ) : (
              <MealTracker userProfile={userProfile} />
            )}
          </div>
        );
      case 'appointments':
        return (
          <div className="text-center py-12 animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Appointments
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Appointment booking feature coming soon!
            </p>
          </div>
        );
      case 'notifications':
        return (
          <div className="animate-on-scroll">
            <NotificationCenter />
          </div>
        );
      case 'reminders':
        return (
          <div className="animate-on-scroll">
            <ReminderForm />
          </div>
        );
      case 'shopping':
        return (
          <div className="animate-on-scroll">
            <ShoppingList />
          </div>
        );
      case 'drugs':
        return (
          <div className="animate-on-scroll">
            <DrugStore />
          </div>
        );
      case 'hospital-info':
        return (
          <div className="text-center py-12 animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Hospitals
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Hospital management feature coming soon!
            </p>
          </div>
        );
      case 'chat':
        return (
          <div className="animate-on-scroll">
            <AIChat />
          </div>
        );
      case 'blog':
        return (
          <div className="animate-on-scroll">
            <HealthBlog />
          </div>
        );
      case 'health-insurance':
        return (
          <div className="text-center py-12 animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Health Insurance
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Insurance management feature coming soon!
            </p>
          </div>
        );
      case 'rate-us':
        return (
          <div className="animate-on-scroll">
            <RateUs />
          </div>
        );
      case 'about':
        return (
          <div className="text-center py-12 animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About Healinton
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Learn more about our healthcare platform and mission.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="animate-on-scroll">
            <Settings />
          </div>
        );
      default:
        return (
          <div className="text-center py-12 animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {activeSection.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              This section is being developed!
            </p>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onSectionChange={handleSectionChange}
            activeSection={activeSection}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader 
            onMenuClick={handleMenuClick}
            userName={userName}
          />
          
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
