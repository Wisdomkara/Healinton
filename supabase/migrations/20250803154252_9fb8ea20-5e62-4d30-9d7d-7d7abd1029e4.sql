
-- Create a function to manually add premium users (can be called from database or admin interface)
CREATE OR REPLACE FUNCTION public.add_premium_user_manual(
  p_user_email text,
  p_duration_months integer DEFAULT 1,
  p_added_by text DEFAULT 'admin',
  p_notes text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Get user ID from email
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = p_user_email;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', p_user_email;
  END IF;
  
  -- Check if user already has an active subscription
  IF EXISTS (
    SELECT 1 FROM public.subscriptions 
    WHERE user_id = target_user_id 
    AND status = 'active' 
    AND (end_date IS NULL OR end_date > now())
  ) THEN
    -- Extend existing subscription
    UPDATE public.subscriptions 
    SET end_date = COALESCE(end_date, now()) + (p_duration_months || ' months')::interval,
        updated_at = now()
    WHERE user_id = target_user_id 
    AND status = 'active'
    AND (end_date IS NULL OR end_date > now());
  ELSE
    -- Create new subscription
    INSERT INTO public.subscriptions (user_id, plan_type, status, end_date)
    VALUES (target_user_id, 'premium', 'active', now() + (p_duration_months || ' months')::interval);
  END IF;
  
  -- Also add to premium_users table for legacy compatibility
  INSERT INTO public.premium_users (user_id, expires_at, subscription_type, added_by, notes)
  VALUES (target_user_id, now() + (p_duration_months || ' months')::interval, 'manual', p_added_by, p_notes)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    expires_at = EXCLUDED.expires_at,
    is_active = true,
    added_by = EXCLUDED.added_by,
    notes = EXCLUDED.notes;
  
  RETURN true;
END;
$$;

-- Create a function to remove premium access
CREATE OR REPLACE FUNCTION public.remove_premium_user_manual(p_user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Get user ID from email
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = p_user_email;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', p_user_email;
  END IF;
  
  -- Deactivate subscriptions
  UPDATE public.subscriptions 
  SET status = 'cancelled', updated_at = now()
  WHERE user_id = target_user_id AND status = 'active';
  
  -- Deactivate premium_users
  UPDATE public.premium_users 
  SET is_active = false
  WHERE user_id = target_user_id;
  
  RETURN true;
END;
$$;

-- Create a view to easily see all premium users (for admin management)
CREATE OR REPLACE VIEW public.premium_users_admin_view AS
SELECT 
  u.email,
  u.created_at as user_created_at,
  COALESCE(p.first_name, '') || ' ' || COALESCE(p.last_name, '') as full_name,
  p.country,
  s.plan_type,
  s.status,
  s.end_date,
  CASE 
    WHEN s.end_date IS NULL THEN NULL
    ELSE EXTRACT(days FROM (s.end_date - now()))::integer
  END as days_remaining,
  pu.added_by,
  pu.notes,
  pu.subscription_type
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
LEFT JOIN public.subscriptions s ON u.id = s.user_id AND s.status = 'active'
LEFT JOIN public.premium_users pu ON u.id = pu.user_id AND pu.is_active = true
WHERE s.id IS NOT NULL OR pu.id IS NOT NULL
ORDER BY s.end_date DESC NULLS LAST;
