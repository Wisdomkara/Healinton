
-- First, let's check what constraint is causing the issue and remove it if it's too restrictive
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_illness_type_check;

-- Make sure the profiles table allows NULL values for illness_type during registration
ALTER TABLE public.profiles ALTER COLUMN illness_type DROP NOT NULL;

-- Update the handle_new_user function to handle cases where illness_type might not be provided
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, gender, country, illness_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    NEW.raw_user_meta_data->>'gender',
    NEW.raw_user_meta_data->>'country',
    NEW.raw_user_meta_data->>'illness_type'
  );
  RETURN NEW;
END;
$$;

-- Add trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update subscriptions table to have proper monthly expiration
ALTER TABLE public.subscriptions 
ALTER COLUMN end_date SET DEFAULT (now() + interval '1 month');

-- Create a function to check and update expired subscriptions
CREATE OR REPLACE FUNCTION public.update_expired_subscriptions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Update expired subscriptions to inactive
  UPDATE public.subscriptions 
  SET status = 'expired', updated_at = now()
  WHERE status = 'active' 
  AND end_date IS NOT NULL 
  AND end_date < now();
  
  -- Update expired premium_users to inactive
  UPDATE public.premium_users 
  SET is_active = false
  WHERE is_active = true 
  AND expires_at IS NOT NULL 
  AND expires_at < now();
END;
$$;

-- Create a function to renew premium subscription
CREATE OR REPLACE FUNCTION public.renew_premium_subscription(p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  current_subscription RECORD;
BEGIN
  -- Get current active subscription
  SELECT * INTO current_subscription
  FROM public.subscriptions 
  WHERE user_id = p_user_id 
  AND status = 'active'
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF FOUND THEN
    -- Extend current subscription by 1 month
    UPDATE public.subscriptions 
    SET end_date = COALESCE(end_date, now()) + interval '1 month',
        updated_at = now()
    WHERE id = current_subscription.id;
    RETURN true;
  ELSE
    -- Create new subscription
    INSERT INTO public.subscriptions (user_id, plan_type, status, end_date)
    VALUES (p_user_id, 'premium', 'active', now() + interval '1 month');
    RETURN true;
  END IF;
END;
$$;

-- Update the get_user_subscription function to handle monthly expiration properly
CREATE OR REPLACE FUNCTION public.get_user_subscription(check_user_id uuid)
RETURNS TABLE(is_premium boolean, plan_type text, status text, end_date timestamp with time zone, days_remaining integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  sub_record RECORD;
  premium_record RECORD;
BEGIN
  -- First update any expired subscriptions
  PERFORM public.update_expired_subscriptions();
  
  -- Check subscriptions table
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
