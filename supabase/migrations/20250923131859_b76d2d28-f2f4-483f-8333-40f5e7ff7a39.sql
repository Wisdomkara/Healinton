-- Update the free premium function to extend until December 31, 2025
CREATE OR REPLACE FUNCTION public.get_user_subscription_free(check_user_id uuid)
 RETURNS TABLE(is_premium boolean, plan_type text, status text, end_date timestamp with time zone, days_remaining integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  free_until_date timestamp with time zone := '2025-12-31 23:59:59+00'::timestamptz;
BEGIN
  -- Everyone is premium until December 31, 2025
  RETURN QUERY SELECT 
    true as is_premium,
    'premium_free'::text as plan_type,
    'active'::text as status,
    free_until_date as end_date,
    EXTRACT(days FROM (free_until_date - now()))::integer as days_remaining;
END;
$function$