
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface PremiumStatus {
  isPremium: boolean;
  subscriptionType: string | null;
  expiresAt: string | null;
  loading: boolean;
}

export const usePremium = (): PremiumStatus => {
  const { user } = useAuth();
  const [premiumStatus, setPremiumStatus] = useState<PremiumStatus>({
    isPremium: false,
    subscriptionType: null,
    expiresAt: null,
    loading: true,
  });

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!user) {
        setPremiumStatus({
          isPremium: false,
          subscriptionType: null,
          expiresAt: null,
          loading: false,
        });
        return;
      }

      try {
        console.log('Checking premium status for user:', user.id);
        
        // First check the new subscriptions table
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('plan_type, end_date, status')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1);

        if (subscriptionError) {
          console.error('Error checking subscription status:', subscriptionError);
        } else if (subscriptionData && subscriptionData.length > 0) {
          const subscription = subscriptionData[0];
          const now = new Date();
          const isExpired = subscription.end_date && new Date(subscription.end_date) < now;
          
          if (!isExpired) {
            console.log('Found active subscription:', subscription);
            setPremiumStatus({
              isPremium: true,
              subscriptionType: subscription.plan_type,
              expiresAt: subscription.end_date,
              loading: false,
            });
            return;
          }
        }

        // Fallback to check legacy premium_users table
        const { data: premiumData, error: premiumError } = await supabase
          .from('premium_users')
          .select('subscription_type, expires_at, is_active')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1);

        if (premiumError) {
          console.error('Error checking premium status:', premiumError);
          setPremiumStatus({
            isPremium: false,
            subscriptionType: null,
            expiresAt: null,
            loading: false,
          });
          return;
        }

        const latestRecord = premiumData && premiumData.length > 0 ? premiumData[0] : null;
        const now = new Date();
        const isExpired = latestRecord?.expires_at && new Date(latestRecord.expires_at) < now;
        
        console.log('Premium check result:', { latestRecord, isExpired });
        
        setPremiumStatus({
          isPremium: !!latestRecord && !isExpired,
          subscriptionType: latestRecord?.subscription_type || null,
          expiresAt: latestRecord?.expires_at || null,
          loading: false,
        });
      } catch (error) {
        console.error('Error checking premium status:', error);
        setPremiumStatus({
          isPremium: false,
          subscriptionType: null,
          expiresAt: null,
          loading: false,
        });
      }
    };

    checkPremiumStatus();
  }, [user]);

  return premiumStatus;
};
