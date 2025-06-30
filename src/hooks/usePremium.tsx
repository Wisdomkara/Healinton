
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
        // Check if user is in premium_users table
        const { data, error } = await supabase
          .from('premium_users')
          .select('subscription_type, expires_at, is_active')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .maybeSingle();

        if (error) {
          console.error('Error checking premium status:', error);
          setPremiumStatus({
            isPremium: false,
            subscriptionType: null,
            expiresAt: null,
            loading: false,
          });
          return;
        }

        const now = new Date();
        const isExpired = data?.expires_at && new Date(data.expires_at) < now;
        
        setPremiumStatus({
          isPremium: !!data && !isExpired,
          subscriptionType: data?.subscription_type || null,
          expiresAt: data?.expires_at || null,
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
