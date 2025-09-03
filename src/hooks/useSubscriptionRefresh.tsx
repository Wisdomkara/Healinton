import { useEffect } from 'react';
import { usePremium } from './usePremium';
import { useAuth } from './useAuth';

// Hook to refresh subscription status after payments
export const useSubscriptionRefresh = () => {
  const { user } = useAuth();
  const { isPremium } = usePremium();

  useEffect(() => {
    // Listen for storage events (when payment completes in another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'premium_status_updated') {
        // Force a page reload to refresh subscription status
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for focus events (when user comes back to tab after payment)
    const handleFocus = () => {
      // Small delay to allow for database updates
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return { isPremium };
};