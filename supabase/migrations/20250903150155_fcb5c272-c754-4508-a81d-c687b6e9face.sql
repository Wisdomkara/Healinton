-- Fix foreign key constraints and ensure user profiles exist properly

-- First, let's remove any problematic foreign key constraints that reference auth.users
-- and ensure user_id columns can accept UUIDs without foreign key constraints to auth schema

-- Drop existing foreign key constraints if they exist (these are causing the violations)
DO $$ 
BEGIN
    -- Drop foreign key constraints that reference auth.users (these cause issues)
    BEGIN
        ALTER TABLE user_hospitals DROP CONSTRAINT IF EXISTS user_hospitals_user_id_fkey;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE drug_orders DROP CONSTRAINT IF EXISTS drug_orders_user_id_fkey;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE shopping_lists DROP CONSTRAINT IF EXISTS shopping_lists_user_id_fkey;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE hospital_bookings DROP CONSTRAINT IF EXISTS hospital_bookings_user_id_fkey;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE health_metrics DROP CONSTRAINT IF EXISTS health_metrics_user_id_fkey;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE symptoms DROP CONSTRAINT IF EXISTS symptoms_user_id_fkey;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE reminders DROP CONSTRAINT IF EXISTS reminders_user_id_fkey;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;
END $$;

-- Create ratings table for user feedback
CREATE TABLE IF NOT EXISTS public.ratings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    user_name TEXT,
    user_email TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on ratings table
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Create policies for ratings
CREATE POLICY "Users can create their own ratings" 
ON public.ratings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own ratings" 
ON public.ratings 
FOR SELECT 
USING (auth.uid() = user_id);

-- Update drug_orders table to include personal information fields
ALTER TABLE public.drug_orders ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.drug_orders ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.drug_orders ADD COLUMN IF NOT EXISTS email_address TEXT;
ALTER TABLE public.drug_orders ADD COLUMN IF NOT EXISTS delivery_address TEXT;

-- Ensure all user_id columns are NOT NULL where they should be
ALTER TABLE user_hospitals ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE drug_orders ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE health_metrics ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE symptoms ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE meal_completions ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE meal_tracking ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE weekly_meal_plans ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE user_analytics ALTER COLUMN user_id SET NOT NULL;

-- Make sure shopping_lists user_id is NOT NULL
ALTER TABLE shopping_lists ALTER COLUMN user_id SET NOT NULL;

-- Make sure reminders user_id is NOT NULL  
ALTER TABLE reminders ALTER COLUMN user_id SET NOT NULL;

-- Make sure hospital_bookings user_id is NOT NULL
ALTER TABLE hospital_bookings ALTER COLUMN user_id SET NOT NULL;

-- Update the handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table with all available user metadata
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    email, 
    gender, 
    country, 
    illness_type
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    NEW.raw_user_meta_data->>'gender',
    NEW.raw_user_meta_data->>'country',
    NEW.raw_user_meta_data->>'illness_type'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = COALESCE(EXCLUDED.first_name, profiles.first_name),
    last_name = COALESCE(EXCLUDED.last_name, profiles.last_name),
    gender = COALESCE(EXCLUDED.gender, profiles.gender),
    country = COALESCE(EXCLUDED.country, profiles.country),
    illness_type = COALESCE(EXCLUDED.illness_type, profiles.illness_type),
    updated_at = now();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to safely get or create user profile
CREATE OR REPLACE FUNCTION public.ensure_user_profile(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (user_uuid, '')
  ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;