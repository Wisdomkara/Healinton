// ================================================================
// Paystack Payment Verification Edge Function
// ================================================================
// This function verifies Paystack transactions server-side and
// stores successful payments in the database securely.
// 
// SECURITY: Uses PAYSTACK_SECRET_KEY stored in edge function secrets.
// This key must NEVER be exposed to client-side code.
// ================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

// ================================================================
// CORS Headers - Allow frontend to call this endpoint
// ================================================================
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ================================================================
// Environment Variables (Secrets)
// ================================================================
// PAYSTACK_SECRET_KEY: Your Paystack secret key (sk_test_... or sk_live_...)
//   - Set in Supabase Dashboard > Edge Functions > Secrets
//   - NEVER expose this to client code
// 
// SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY: 
//   - Automatically available in edge functions
//   - Service role key allows writing to protected tables
// ================================================================

interface PaystackVerificationRequest {
  reference: string;
  email: string;
  amount?: number; // Expected amount in kobo (smallest currency unit)
  currency?: string; // Expected currency (e.g., 'NGN')
}

interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: any;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: any;
      risk_action: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    };
  };
}

// ================================================================
// Rate Limiting Configuration
// ================================================================
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 verification requests per minute per IP
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Check if the request is within rate limits
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// ================================================================
// Input Validation
// ================================================================
function validateRequest(body: any): { valid: boolean; error?: string; data?: PaystackVerificationRequest } {
  if (!body) {
    return { valid: false, error: 'Request body is required' };
  }

  const { reference, email, amount, currency } = body;

  // Validate reference
  if (!reference || typeof reference !== 'string' || reference.trim().length === 0) {
    return { valid: false, error: 'Transaction reference is required' };
  }

  // Validate reference format (Paystack references are alphanumeric)
  if (!/^[a-zA-Z0-9_-]+$/.test(reference)) {
    return { valid: false, error: 'Invalid transaction reference format' };
  }

  // Validate email
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Validate optional amount (if provided)
  if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
    return { valid: false, error: 'Amount must be a positive number' };
  }

  // Validate optional currency (if provided)
  if (currency !== undefined && (typeof currency !== 'string' || currency.length !== 3)) {
    return { valid: false, error: 'Currency must be a 3-letter code (e.g., NGN, USD)' };
  }

  return {
    valid: true,
    data: {
      reference: reference.trim(),
      email: email.trim().toLowerCase(),
      amount,
      currency: currency?.toUpperCase()
    }
  };
}

// ================================================================
// Main Request Handler
// ================================================================
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ================================================================
    // Step 1: Rate Limiting
    // ================================================================
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
    const authHeader = req.headers.get('authorization') || '';
    const identifier = `${clientIp}_${authHeader.slice(0, 20)}`; // Combine IP and auth token

    if (!checkRateLimit(identifier)) {
      console.warn(`Rate limit exceeded for identifier: ${identifier}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Too many requests. Please wait a moment and try again.' 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // ================================================================
    // Step 2: Parse and Validate Request Body
    // ================================================================
    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON in request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validation = validateRequest(body);
    if (!validation.valid) {
      console.error('Validation error:', validation.error);
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { reference, email, amount: expectedAmount, currency: expectedCurrency } = validation.data!;

    // ================================================================
    // Step 3: Get Paystack Secret Key from Environment
    // ================================================================
    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY not configured in edge function secrets');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Payment gateway configuration error. Please contact support.' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ================================================================
    // Step 4: Initialize Supabase Client with Service Role
    // ================================================================
    // Service role key allows writing to protected tables (payments)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // ================================================================
    // Step 5: Check if payment already verified (idempotency)
    // ================================================================
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id, status')
      .eq('reference', reference)
      .maybeSingle();

    if (existingPayment && existingPayment.status === 'completed') {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Payment already verified',
          payment_id: existingPayment.id
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ================================================================
    // Step 6: Verify Transaction with Paystack API
    // ================================================================
    // Call Paystack's verification endpoint to confirm the payment
    // https://paystack.com/docs/payments/verify-payments/
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!paystackResponse.ok) {
      const errorText = await paystackResponse.text();
      console.error(`Paystack API error: ${paystackResponse.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Unable to verify payment with payment gateway. Please try again.' 
        }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const verificationData: PaystackVerificationResponse = await paystackResponse.json();

    // ================================================================
    // Step 7: Validate Paystack Response
    // ================================================================
    if (!verificationData.status || !verificationData.data) {
      console.error('Invalid Paystack response structure:', verificationData);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid payment verification response' }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const paymentData = verificationData.data;

    // Check if transaction was successful
    if (paymentData.status !== 'success') {
      console.warn(`Payment not successful: ${reference} - Status: ${paymentData.status}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Payment verification failed: ${paymentData.gateway_response || 'Transaction not successful'}` 
        }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify email matches
    if (paymentData.customer.email.toLowerCase() !== email.toLowerCase()) {
      console.error(`Email mismatch - Expected: ${email}, Got: ${paymentData.customer.email}`);
      return new Response(
        JSON.stringify({ success: false, error: 'Payment verification failed: Email mismatch' }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify amount matches (if provided)
    if (expectedAmount !== undefined && paymentData.amount !== expectedAmount) {
      console.error(`Amount mismatch - Expected: ${expectedAmount}, Got: ${paymentData.amount}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Payment amount mismatch. Expected ${expectedAmount}, received ${paymentData.amount}` 
        }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify currency matches (if provided)
    if (expectedCurrency && paymentData.currency !== expectedCurrency) {
      console.error(`Currency mismatch - Expected: ${expectedCurrency}, Got: ${paymentData.currency}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Currency mismatch. Expected ${expectedCurrency}, received ${paymentData.currency}` 
        }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ================================================================
    // Step 8: Get User ID from Email
    // ================================================================
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (!profile) {
      console.error(`No user found for email: ${email}`);
      return new Response(
        JSON.stringify({ success: false, error: 'User not found for this email' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = profile.id;

    // ================================================================
    // Step 9: Store Payment in Database
    // ================================================================
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .upsert({
        user_id: userId,
        email: paymentData.customer.email,
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: 'completed',
        reference: paymentData.reference,
        transaction_id: paymentData.id.toString(),
        payment_method: paymentData.channel,
        paid_at: paymentData.paid_at,
      }, {
        onConflict: 'reference',
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Error storing payment:', paymentError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to store payment record. Please contact support.' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ================================================================
    // Step 10: Activate Premium Subscription
    // ================================================================
    // Use the renew_premium_subscription function to grant/extend premium access
    const { data: subscriptionResult, error: subscriptionError } = await supabase
      .rpc('renew_premium_subscription', { p_user_id: userId });

    if (subscriptionError) {
      console.error('Error activating subscription:', subscriptionError);
      // Payment was recorded but subscription failed - log for manual intervention
      console.error(`MANUAL INTERVENTION REQUIRED: Payment ${payment.id} succeeded but subscription activation failed for user ${userId}`);
    } else {
      // Link payment to subscription
      const { data: activeSubscription } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (activeSubscription) {
        await supabase
          .from('subscriptions')
          .update({ payment_id: payment.id })
          .eq('id', activeSubscription.id);
      }
    }

    // ================================================================
    // Step 11: Return Success Response
    // ================================================================
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment verified and subscription activated successfully',
        payment_id: payment.id,
        amount: paymentData.amount,
        currency: paymentData.currency,
        reference: paymentData.reference,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    // ================================================================
    // Global Error Handler
    // ================================================================
    console.error('Unexpected error in payment verification:', error);
    
    // Don't expose internal error details to client
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An unexpected error occurred during payment verification. Please contact support.' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
