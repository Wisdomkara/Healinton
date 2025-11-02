// ================================================================
// Paystack Payment Modal Component
// ================================================================
// This component handles secure payment collection using Paystack.
// 
// KEY SECURITY FEATURES:
// - Uses PAYSTACK_PUBLIC_KEY (safe for client-side code)
// - Never collects or stores raw credit card data
// - Paystack handles all sensitive payment information
// - Verification happens server-side via Edge Function
// ================================================================

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CreditCard, Lock, Shield, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PaystackPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// ================================================================
// ENVIRONMENT CONFIGURATION
// ================================================================
// PAYSTACK_PUBLIC_KEY: Your Paystack publishable key
// - Test: pk_test_xxxxx (for development/testing)
// - Live: pk_live_xxxxx (for production)
// This key is SAFE to expose in client-side code
// ================================================================
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_placeholder';

// Payment configuration
const PAYMENT_AMOUNT = 705; // Amount in cents (7.05 USD)
const PAYMENT_CURRENCY = 'USD'; // US Dollar
const SUBSCRIPTION_DAYS = 30;

// ================================================================
// Load Paystack Inline JavaScript SDK
// ================================================================
// This function dynamically loads the Paystack popup library
// Documentation: https://paystack.com/docs/payments/accept-payments/
// ================================================================
const loadPaystackScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already loaded
    if (window.PaystackPop) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack script'));
    document.body.appendChild(script);
  });
};

// ================================================================
// TypeScript type for Paystack Pop
// ================================================================
declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref?: string;
        metadata?: Record<string, any>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

const PaystackPaymentModal: React.FC<PaystackPaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState<'idle' | 'paying' | 'verifying'>('idle');

  // ================================================================
  // STEP 1: Initialize Paystack Payment
  // ================================================================
  // This function opens the Paystack payment popup where users
  // securely enter their payment information.
  // ================================================================
  const handlePayment = async () => {
    if (!user || !user.email) {
      toast({
        title: "Authentication Required",
        description: "Please log in to continue with payment",
        variant: "destructive"
      });
      return;
    }

    // Validate Paystack public key is configured
    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'pk_test_placeholder') {
      toast({
        title: "Configuration Error",
        description: "Payment gateway not configured. Please contact support.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setProcessingStep('paying');

    try {
      // Load Paystack SDK
      await loadPaystackScript();

      // Generate unique reference for this transaction
      const reference = `healinton_${Date.now()}_${user.id.slice(0, 8)}`;

      console.log(`Initiating payment - Reference: ${reference}, Email: ${user.email}`);

      // ================================================================
      // STEP 2: Open Paystack Payment Popup
      // ================================================================
      // Paystack handles all payment data collection securely
      // We never see or store credit card information
      // ================================================================
      const handler = window.PaystackPop!.setup({
        key: PAYSTACK_PUBLIC_KEY, // Public key - SAFE in client code
        email: user.email,
        amount: PAYMENT_AMOUNT, // Amount in smallest currency unit (kobo/cents)
        currency: PAYMENT_CURRENCY,
        ref: reference,
        metadata: {
          user_id: user.id,
          subscription_type: 'premium',
          subscription_days: SUBSCRIPTION_DAYS,
        },
        // ================================================================
        // STEP 3: Handle Successful Payment
        // ================================================================
        // When payment succeeds, Paystack calls this callback
        // We then verify the payment server-side for security
        // ================================================================
        callback: async (response) => {
          console.log('Payment completed, verifying...', response);
          setProcessingStep('verifying');
          
          try {
            await verifyPayment(response.reference, user.email!);
          } catch (error) {
            console.error('Verification error:', error);
            setLoading(false);
            setProcessingStep('idle');
          }
        },
        // ================================================================
        // User closed payment popup without completing
        // ================================================================
        onClose: () => {
          console.log('Payment popup closed by user');
          setLoading(false);
          setProcessingStep('idle');
          toast({
            title: "Payment Cancelled",
            description: "You closed the payment window. No charges were made.",
          });
        },
      });

      // Open the payment popup
      handler.openIframe();

    } catch (error) {
      console.error('Payment initialization error:', error);
      setLoading(false);
      setProcessingStep('idle');
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  // ================================================================
  // STEP 4: Verify Payment Server-Side
  // ================================================================
  // CRITICAL SECURITY: Never trust client-side payment confirmation
  // Always verify transactions with Paystack API server-side
  // This prevents fraud and ensures payment was actually completed
  // ================================================================
  const verifyPayment = async (reference: string, email: string) => {
    try {
      console.log(`Verifying payment with Edge Function - Reference: ${reference}`);

      // Call our secure Edge Function to verify with Paystack
      // This function uses PAYSTACK_SECRET_KEY (server-side only)
      const { data, error } = await supabase.functions.invoke('verify-paystack-payment', {
        body: {
          reference,
          email,
          amount: PAYMENT_AMOUNT, // Verify expected amount
          currency: PAYMENT_CURRENCY, // Verify expected currency
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Payment verification failed');
      }

      if (!data || !data.success) {
        throw new Error(data?.error || 'Payment verification failed');
      }

      console.log('Payment verified successfully:', data);

      // ================================================================
      // STEP 5: Success - Update UI and Redirect
      // ================================================================
      toast({
        title: "Payment Successful! 🎉",
        description: `Welcome to Premium! Your subscription is active for ${SUBSCRIPTION_DAYS} days.`,
      });

      onSuccess();
      onClose();

      // Refresh to update premium status throughout the app
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error: any) {
      console.error('Payment verification error:', error);
      
      toast({
        title: "Verification Failed",
        description: error.message || "Unable to verify payment. Please contact support if you were charged.",
        variant: "destructive"
      });

      throw error; // Re-throw to be caught by caller
    } finally {
      setLoading(false);
      setProcessingStep('idle');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Premium Subscription - ${(PAYMENT_AMOUNT / 100).toFixed(2)} USD
          </DialogTitle>
        </DialogHeader>
        
        <Card className="p-6">
          {/* Subscription Benefits */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{SUBSCRIPTION_DAYS}-Day Premium Access</span>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Your subscription will expire after {SUBSCRIPTION_DAYS} days and requires manual renewal
            </p>
          </div>

          {/* Security Information */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-3 rounded-lg mb-4">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Secured by Paystack - PCI DSS compliant payment processing</span>
          </div>

          {/* Processing Status */}
          {processingStep !== 'idle' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary p-3 rounded-lg mb-4">
              <AlertCircle className="h-4 w-4 animate-pulse" />
              <span>
                {processingStep === 'paying' && 'Processing payment...'}
                {processingStep === 'verifying' && 'Verifying payment with bank...'}
              </span>
            </div>
          )}

          {/* Payment Button */}
          <div className="space-y-2">
            <Button 
              onClick={handlePayment} 
              disabled={loading || !user} 
              className="w-full"
            >
              <Lock className="h-4 w-4 mr-2" />
              {loading 
                ? processingStep === 'paying' 
                  ? 'Opening Payment Window...' 
                  : 'Verifying Payment...'
                : `Pay $${(PAYMENT_AMOUNT / 100).toFixed(2)} USD - Get ${SUBSCRIPTION_DAYS} Days Premium`
              }
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={loading}
              className="w-full"
            >
              Cancel
            </Button>
          </div>

          {/* Additional Information */}
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              No auto-renewal. You'll need to manually renew after {SUBSCRIPTION_DAYS} days.
            </p>
            
            {PAYSTACK_PUBLIC_KEY.startsWith('pk_test') && (
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded p-2">
                <p className="text-xs text-yellow-700 dark:text-yellow-300 text-center">
                  🧪 <strong>Test Mode:</strong> Use test cards to simulate payments
                </p>
              </div>
            )}
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PaystackPaymentModal;
