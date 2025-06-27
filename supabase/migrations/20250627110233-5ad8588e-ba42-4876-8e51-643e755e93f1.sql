
-- Set OTP expiry to 5 minutes (300 seconds)
-- Note: This might need to be configured in Supabase Dashboard under Authentication > Settings
-- as direct auth.config updates may not be supported in all Supabase versions

-- Fix search_path for existing functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, gender, country, illness_type)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.email,
    NEW.raw_user_meta_data->>'gender',
    NEW.raw_user_meta_data->>'country',
    NEW.raw_user_meta_data->>'illness_type'
  );
  RETURN NEW;
END;
$$;
