
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface PremiumStatus {
  isPremium: boolean;
  subscriptionType: string | null;
  expiresAt: string | null;
  loading: boolean;
  daysRemaining: number | null;
  status: string | null;
}

export const usePremium = (): PremiumStatus => {
  const { user } = useAuth();
  const [premiumStatus, setPremiumStatus] = useState<PremiumStatus>({
    isPremium: false,
    subscriptionType: null,
    expiresAt: null,
    loading: true,
    daysRemaining: null,
    status: null,
  });

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!user) {
        setPremiumStatus({
          isPremium: false,
          subscriptionType: null,
          expiresAt: null,
          loading: false,
          daysRemaining: null,
          status: null,
        });
        return;
      }

      try {
        console.log('Checking premium status for user:', user.id);
        
        // Use the database function to get subscription status
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .rpc('get_user_subscription', { check_user_id: user.id });

        if (subscriptionError) {
          console.error('Error checking subscription status:', subscriptionError);
          setPremiumStatus({
            isPremium: false,
            subscriptionType: null,
            expiresAt: null,
            loading: false,
            daysRemaining: null,
            status: 'error',
          });
          return;
        }

        console.log('Subscription status result:', subscriptionData);

        if (subscriptionData && subscriptionData.length > 0) {
          const subscription = subscriptionData[0];
          
          setPremiumStatus({
            isPremium: subscription.is_premium,
            subscriptionType: subscription.plan_type,
            expiresAt: subscription.end_date,
            loading: false,
            daysRemaining: subscription.days_remaining,
            status: subscription.status,
          });
        } else {
          // Fallback to free plan
          setPremiumStatus({
            isPremium: false,
            subscriptionType: 'free',
            expiresAt: null,
            loading: false,
            daysRemaining: null,
            status: 'active',
          });
        }
      } catch (error) {
        console.error('Error checking premium status:', error);
        setPremiumStatus({
          isPremium: false,
          subscriptionType: null,
          expiresAt: null,
          loading: false,
          daysRemaining: null,
          status: 'error',
        });
      }
    };

    checkPremiumStatus();

    // Set up a periodic check for subscription updates (every 2 minutes for more responsive updates)
    const interval = setInterval(checkPremiumStatus, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  return premiumStatus;
};
