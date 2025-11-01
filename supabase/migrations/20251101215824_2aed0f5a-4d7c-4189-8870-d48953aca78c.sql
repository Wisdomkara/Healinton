-- ================================================================
-- MIGRATION: Add Paystack Payment Support & Extend Free Trial
-- ================================================================

-- Step 1: Modify payments table to support Paystack
-- Add reference field for Paystack transaction reference
ALTER TABLE payments
ADD COLUMN IF NOT EXISTS reference text UNIQUE,
ADD COLUMN IF NOT EXISTS paid_at timestamptz;

-- Update the amount column comment to clarify it stores smallest currency unit
COMMENT ON COLUMN payments.amount IS 'Amount in smallest currency unit (kobo for NGN, cents for USD)';

-- Step 2: Add trial_end to profiles table
-- This extends free access for all users until January 1, 2026
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS trial_end timestamptz DEFAULT '2026-01-01T00:00:00Z';

-- Step 3: Set trial_end for all existing users to Jan 1, 2026
-- Only update if trial_end is null or earlier than the target date
UPDATE profiles
SET trial_end = '2026-01-01T00:00:00Z'
WHERE trial_end IS NULL OR trial_end < '2026-01-01T00:00:00Z';

-- Step 4: Create function to check if user has active access (trial or premium)
CREATE OR REPLACE FUNCTION public.has_active_access(check_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  user_trial_end timestamptz;
  has_premium boolean;
BEGIN
  -- Check trial period
  SELECT trial_end INTO user_trial_end
  FROM profiles
  WHERE id = check_user_id;
  
  -- If still in trial period, return true
  IF user_trial_end IS NOT NULL AND user_trial_end > now() THEN
    RETURN true;
  END IF;
  
  -- Check for active premium subscription
  SELECT EXISTS (
    SELECT 1 
    FROM subscriptions 
    WHERE user_id = check_user_id 
    AND status = 'active' 
    AND (end_date IS NULL OR end_date > now())
  ) INTO has_premium;
  
  RETURN has_premium;
END;
$$;

-- Step 5: Create index on reference for faster lookups
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(reference);

-- Step 6: Add RLS policy for reading payments via reference (for webhook verification)
-- This allows the edge function to check if a payment already exists
CREATE POLICY "Service role can manage all payments"
ON payments
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);