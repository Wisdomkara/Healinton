import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useEnsureProfile = () => {
  const { user } = useAuth();

  useEffect(() => {
    const ensureProfile = async () => {
      if (user) {
        try {
          // Try to get existing profile
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();

          // If no profile exists, create one
          if (!existingProfile) {
            const { error } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email,
                first_name: user.user_metadata?.first_name || '',
                last_name: user.user_metadata?.last_name || '',
                gender: user.user_metadata?.gender || null,
                country: user.user_metadata?.country || null,
                illness_type: user.user_metadata?.illness_type || null
              });

            if (error) {
              console.error('Error creating profile:', error);
            }
          }
        } catch (error) {
          console.error('Error ensuring profile:', error);
        }
      }
    };

    ensureProfile();
  }, [user]);
};