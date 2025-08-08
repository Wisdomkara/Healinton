
-- Create a payments table to track payment transactions
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_method TEXT,
  transaction_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for payments table
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policies for payments table
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update payments" ON public.payments
  FOR UPDATE USING (true);

-- Create subscriptions table for managing premium subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_type TEXT DEFAULT 'premium' CHECK (plan_type IN ('free', 'premium')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  start_date TIMESTAMPTZ DEFAULT now(),
  end_date TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT true,
  payment_id UUID REFERENCES public.payments(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for subscriptions table
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for subscriptions table
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update subscriptions" ON public.subscriptions
  FOR UPDATE USING (true);

-- Update the is_user_premium function to check subscriptions table as well
CREATE OR REPLACE FUNCTION public.is_user_premium(check_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check premium_users table (legacy)
  IF EXISTS (
    SELECT 1 
    FROM public.premium_users 
    WHERE user_id = check_user_id 
    AND is_active = true 
    AND (expires_at IS NULL OR expires_at > now())
  ) THEN
    RETURN true;
  END IF;
  
  -- Check subscriptions table (new)
  IF EXISTS (
    SELECT 1 
    FROM public.subscriptions 
    WHERE user_id = check_user_id 
    AND status = 'active' 
    AND (end_date IS NULL OR end_date > now())
  ) THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- Create function to get user subscription details
CREATE OR REPLACE FUNCTION public.get_user_subscription(check_user_id uuid)
RETURNS TABLE (
  is_premium boolean,
  plan_type text,
  status text,
  end_date timestamptz,
  days_remaining integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sub_record RECORD;
  premium_record RECORD;
BEGIN
  -- First check subscriptions table
  SELECT * INTO sub_record
  FROM public.subscriptions 
  WHERE user_id = check_user_id 
  AND status = 'active' 
  AND (end_date IS NULL OR end_date > now())
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF FOUND THEN
    RETURN QUERY SELECT 
      true as is_premium,
      sub_record.plan_type,
      sub_record.status,
      sub_record.end_date,
      CASE 
        WHEN sub_record.end_date IS NULL THEN NULL
        ELSE EXTRACT(days FROM (sub_record.end_date - now()))::integer
      END as days_remaining;
    RETURN;
  END IF;
  
  -- Check legacy premium_users table
  SELECT * INTO premium_record
  FROM public.premium_users 
  WHERE user_id = check_user_id 
  AND is_active = true 
  AND (expires_at IS NULL OR expires_at > now())
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF FOUND THEN
    RETURN QUERY SELECT 
      true as is_premium,
      'premium'::text as plan_type,
      'active'::text as status,
      premium_record.expires_at as end_date,
      CASE 
        WHEN premium_record.expires_at IS NULL THEN NULL
        ELSE EXTRACT(days FROM (premium_record.expires_at - now()))::integer
      END as days_remaining;
    RETURN;
  END IF;
  
  -- Return free plan if no premium subscription found
  RETURN QUERY SELECT 
    false as is_premium,
    'free'::text as plan_type,
    'active'::text as status,
    NULL::timestamptz as end_date,
    NULL::integer as days_remaining;
END;
$$;
