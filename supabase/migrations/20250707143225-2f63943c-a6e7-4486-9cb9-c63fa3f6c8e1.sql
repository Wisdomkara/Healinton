-- Add missing columns to shopping_lists table
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS email_address TEXT;
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS reference_number TEXT;

-- Add missing columns to hospital_bookings table 
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS email_address TEXT;
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS reference_number TEXT;

-- Create meal_completions table for tracking user meal adherence
CREATE TABLE IF NOT EXISTS public.meal_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  meal_date DATE NOT NULL,
  meal_time TEXT NOT NULL CHECK (meal_time IN ('morning', 'afternoon', 'night')),
  completed BOOLEAN NOT NULL DEFAULT false,
  budget_type TEXT NOT NULL CHECK (budget_type IN ('low', 'high')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, meal_date, meal_time, budget_type)
);

-- Enable RLS on meal_completions
ALTER TABLE public.meal_completions ENABLE ROW LEVEL SECURITY;

-- Create policy for meal_completions
CREATE POLICY "Users can manage own meal completions" 
ON public.meal_completions 
FOR ALL 
USING (user_id = auth.uid());