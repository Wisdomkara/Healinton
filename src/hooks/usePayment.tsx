
import { useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentData {
  amount: number;
  currency: string;
  paymentMethod: string;
}

export const usePayment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const processPayment = async (paymentData: PaymentData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to process payment",
        variant: "destructive"
      });
      return { success: false };
    }

    setLoading(true);
    try {
      console.log('Processing payment for user:', user.id);
      
      // Step 1: Create payment record
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount: paymentData.amount,
          currency: paymentData.currency,
          payment_method: paymentData.paymentMethod,
          status: 'pending',
          transaction_id: `temp_${Date.now()}_${user.id.slice(0, 8)}`
        })
        .select()
        .single();

      if (paymentError) {
        console.error('Payment creation error:', paymentError);
        throw paymentError;
      }

      console.log('Payment record created:', payment);

      // Step 2: Simulate payment success (replace with real payment gateway integration)
      const simulatePaymentSuccess = true;

      if (simulatePaymentSuccess) {
        // Update payment status to completed
        const { error: updateError } = await supabase
          .from('payments')
          .update({ 
            status: 'completed',
            transaction_id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          })
          .eq('id', payment.id);

        if (updateError) {
          console.error('Payment update error:', updateError);
          throw updateError;
        }

        console.log('Payment marked as completed');

        // Step 3: Create or renew premium subscription using the database function
        const { data: renewalResult, error: renewalError } = await supabase
          .rpc('renew_premium_subscription', { p_user_id: user.id });

        if (renewalError) {
          console.error('Subscription renewal error:', renewalError);
          throw renewalError;
        }

        console.log('Subscription renewal result:', renewalResult);

        // Step 4: Link the payment to the subscription
        const { data: userSubscription, error: subError } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1);

        if (!subError && userSubscription && userSubscription.length > 0) {
          await supabase
            .from('subscriptions')
            .update({ payment_id: payment.id })
            .eq('id', userSubscription[0].id);
        }

        toast({
          title: "Payment Successful!",
          description: "Welcome to Premium! Your subscription is active for 30 days.",
        });

        return { success: true, paymentId: payment.id };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      
      // If payment record was created, mark it as failed
      if (error.message && !error.message.includes('Payment creation error')) {
        try {
          await supabase
            .from('payments')
            .update({ status: 'failed' })
            .eq('user_id', user.id)
            .eq('status', 'pending');
        } catch (updateError) {
          console.error('Error updating failed payment:', updateError);
        }
      }

      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }

    return { success: false };
  };

  const renewSubscription = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to renew your subscription",
        variant: "destructive"
      });
      return { success: false };
    }

    setLoading(true);
    try {
      console.log('Renewing subscription for user:', user.id);

      // Use the database function to renew subscription
      const { data: renewalResult, error: renewalError } = await supabase
        .rpc('renew_premium_subscription', { p_user_id: user.id });

      if (renewalError) {
        console.error('Subscription renewal error:', renewalError);
        throw renewalError;
      }

      console.log('Subscription renewed successfully:', renewalResult);

      toast({
        title: "Subscription Renewed!",
        description: "Your premium subscription has been extended for another month.",
      });

      return { success: true };
    } catch (error) {
      console.error('Renewal error:', error);
      toast({
        title: "Renewal Failed",
        description: "There was an error renewing your subscription. Please contact support.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }

    return { success: false };
  };

  return {
    processPayment,
    renewSubscription,
    loading
  };
};
