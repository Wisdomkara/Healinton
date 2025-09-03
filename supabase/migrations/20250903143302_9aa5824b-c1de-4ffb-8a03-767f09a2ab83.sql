-- Add role-based access control system

-- First, add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator'));

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Create security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
$$;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(role, 'user') 
  FROM public.profiles 
  WHERE id = auth.uid();
$$;

-- Drop existing unsafe admin policies
DROP POLICY IF EXISTS "Admin can manage premium users" ON public.premium_users;
DROP POLICY IF EXISTS "Admins can manage premium users admin" ON public.premium_users_admin;

-- Create secure admin policies for premium_users table
CREATE POLICY "Only admins can manage premium users"
ON public.premium_users
FOR ALL
USING (public.is_admin());

-- Create secure admin policies for premium_users_admin table
CREATE POLICY "Only admins can manage premium users admin"
ON public.premium_users_admin
FOR ALL
USING (public.is_admin());

-- Function to promote a user to admin (only callable by existing admins)
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(target_user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
  current_user_role text;
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admins can promote users to admin';
  END IF;
  
  -- Get target user ID from email
  SELECT id INTO target_user_id 
  FROM public.profiles 
  WHERE email = target_user_email;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', target_user_email;
  END IF;
  
  -- Update user role to admin
  UPDATE public.profiles 
  SET role = 'admin' 
  WHERE id = target_user_id;
  
  RETURN true;
END;
$$;

-- Function to demote an admin to regular user
CREATE OR REPLACE FUNCTION public.demote_admin_to_user(target_user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Check if current user is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admins can demote other admins';
  END IF;
  
  -- Get target user ID from email
  SELECT id INTO target_user_id 
  FROM public.profiles 
  WHERE email = target_user_email;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', target_user_email;
  END IF;
  
  -- Prevent self-demotion (safety measure)
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot demote yourself from admin role';
  END IF;
  
  -- Update user role to user
  UPDATE public.profiles 
  SET role = 'user' 
  WHERE id = target_user_id;
  
  RETURN true;
END;
$$;

-- Create initial admin user (replace with your actual admin email)
-- This should be run manually after deployment with the correct admin email
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin@email.com';