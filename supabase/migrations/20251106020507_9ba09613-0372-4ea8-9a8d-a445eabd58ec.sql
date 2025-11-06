-- Migration to add terms acceptance tracking and remove duplicate PII
-- This migration addresses multiple security concerns

-- Step 1: Add terms acceptance columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS terms_accepted_at timestamptz,
ADD COLUMN IF NOT EXISTS privacy_accepted_at timestamptz;

-- Step 2: Remove duplicate PII columns from shopping_lists table
-- These columns duplicate data already in profiles table
ALTER TABLE public.shopping_lists 
DROP COLUMN IF EXISTS full_name,
DROP COLUMN IF EXISTS phone_number,
DROP COLUMN IF EXISTS email_address,
DROP COLUMN IF EXISTS country;

-- Step 3: Remove duplicate PII columns from ratings table
ALTER TABLE public.ratings 
DROP COLUMN IF EXISTS user_name,
DROP COLUMN IF EXISTS user_email;

-- Step 4: Create function to check terms acceptance (for future enforcement)
CREATE OR REPLACE FUNCTION public.check_terms_acceptance()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if terms were accepted during signup
  IF NEW.raw_user_meta_data->>'terms_accepted_at' IS NOT NULL THEN
    -- Store terms acceptance in profiles table
    INSERT INTO public.profiles (id, terms_accepted_at, privacy_accepted_at)
    VALUES (
      NEW.id,
      (NEW.raw_user_meta_data->>'terms_accepted_at')::timestamptz,
      (NEW.raw_user_meta_data->>'privacy_accepted_at')::timestamptz
    )
    ON CONFLICT (id) DO UPDATE SET
      terms_accepted_at = EXCLUDED.terms_accepted_at,
      privacy_accepted_at = EXCLUDED.privacy_accepted_at;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Step 5: Create trigger to enforce terms acceptance on signup
DROP TRIGGER IF EXISTS enforce_terms_acceptance ON auth.users;
CREATE TRIGGER enforce_terms_acceptance
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.check_terms_acceptance();