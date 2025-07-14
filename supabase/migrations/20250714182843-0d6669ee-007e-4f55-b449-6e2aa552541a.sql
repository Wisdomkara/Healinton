
-- Fix the is_user_premium function to have a stable search_path
CREATE OR REPLACE FUNCTION public.is_user_premium(check_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.premium_users 
    WHERE user_id = check_user_id 
    AND is_active = true 
    AND (expires_at IS NULL OR expires_at > now())
  );
END;
$$;
