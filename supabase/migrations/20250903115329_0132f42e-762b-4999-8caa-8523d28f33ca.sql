-- Update expired subscriptions function to ensure proper monthly renewal handling
CREATE OR REPLACE FUNCTION public.check_and_update_subscription_status()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  
  -- Log the update for debugging
  INSERT INTO public.user_analytics (
    user_id, 
    date, 
    metric_type, 
    value
  ) 
  SELECT 
    s.user_id,
    current_date,
    'subscription_expired',
    1
  FROM public.subscriptions s
  WHERE s.status = 'expired' 
  AND s.updated_at > now() - interval '1 minute'
  ON CONFLICT (user_id, date, metric_type) DO NOTHING;
END;
$function$;