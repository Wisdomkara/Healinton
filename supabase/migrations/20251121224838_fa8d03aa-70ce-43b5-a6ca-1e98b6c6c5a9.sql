-- Extend global free premium period to 14 February 2026
CREATE OR REPLACE FUNCTION public.get_user_subscription_free(check_user_id uuid)
 RETURNS TABLE(is_premium boolean, plan_type text, status text, end_date timestamp with time zone, days_remaining integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  free_until_date timestamp with time zone := '2026-02-14 23:59:59+00'::timestamptz;
BEGIN
  -- Everyone is premium until February 14, 2026
  RETURN QUERY SELECT 
    true as is_premium,
    'premium_free'::text as plan_type,
    'active'::text as status,
    free_until_date as end_date,
    EXTRACT(days FROM (free_until_date - now()))::integer as days_remaining;
END;
$function$;

-- Optionally align default expiry for admin-managed premium users
ALTER TABLE public.premium_users_admin
  ALTER COLUMN expires_at SET DEFAULT '2026-02-14 23:59:59+00'::timestamptz;

-- Helper function for admins to find a user by email, checking both auth.users and profiles
CREATE OR REPLACE FUNCTION public.find_user_by_email(p_user_email text)
RETURNS TABLE(user_id uuid, email text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Ensure only admins can use this helper
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admins can search users by email';
  END IF;

  RETURN QUERY
  SELECT u.id AS user_id, COALESCE(p.email, u.email) AS email
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.id = u.id
  WHERE lower(u.email) = lower(p_user_email)
     OR (p.email IS NOT NULL AND lower(p.email) = lower(p_user_email))
  LIMIT 1;
END;
$function$;