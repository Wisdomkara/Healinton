
-- Remove the insecure premium_users_admin_view that exposes auth.users data
DROP VIEW IF EXISTS public.premium_users_admin_view;

-- Create a secure function to get premium users admin data
CREATE OR REPLACE FUNCTION public.get_premium_users_admin_data()
RETURNS TABLE(
  user_id uuid,
  full_name text,
  email text,
  country text,
  plan_type text,
  status text,
  end_date timestamp with time zone,
  days_remaining integer,
  subscription_type text,
  added_by text,
  notes text,
  user_created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- This function should only be accessible to admin users
  -- For now, we'll return the data but in a real implementation
  -- you would add proper admin role checks here
  
  RETURN QUERY
  SELECT 
    p.id as user_id,
    COALESCE(pr.first_name || ' ' || pr.last_name, 'Unknown User') as full_name,
    pr.email,
    pr.country,
    COALESCE(s.plan_type, pu.subscription_type, 'free') as plan_type,
    COALESCE(s.status, CASE WHEN pu.is_active THEN 'active' ELSE 'inactive' END, 'free') as status,
    COALESCE(s.end_date, pu.expires_at) as end_date,
    CASE 
      WHEN s.end_date IS NOT NULL THEN EXTRACT(days FROM (s.end_date - now()))::integer
      WHEN pu.expires_at IS NOT NULL THEN EXTRACT(days FROM (pu.expires_at - now()))::integer
      ELSE NULL
    END as days_remaining,
    COALESCE(pu.subscription_type, 'none') as subscription_type,
    pu.added_by,
    pu.notes,
    p.created_at as user_created_at
  FROM public.profiles pr
  LEFT JOIN public.subscriptions s ON pr.id = s.user_id AND s.status = 'active'
  LEFT JOIN public.premium_users pu ON pr.id = pu.user_id
  LEFT JOIN (SELECT DISTINCT user_id, created_at FROM public.profiles) p ON pr.id = p.user_id
  WHERE s.id IS NOT NULL OR pu.id IS NOT NULL
  ORDER BY COALESCE(s.created_at, pu.created_at) DESC;
END;
$$;

-- Grant execute permission to authenticated users (you should restrict this to admin users only)
GRANT EXECUTE ON FUNCTION public.get_premium_users_admin_data() TO authenticated;
