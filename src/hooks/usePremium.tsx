
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
        // Use .select() instead of .maybeSingle() to handle multiple rows
        const { data, error } = await supabase
          .from('premium_users')
          .select('subscription_type, expires_at, is_active')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1);

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

        const latestRecord = data && data.length > 0 ? data[0] : null;
        const now = new Date();
        const isExpired = latestRecord?.expires_at && new Date(latestRecord.expires_at) < now;
        
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
