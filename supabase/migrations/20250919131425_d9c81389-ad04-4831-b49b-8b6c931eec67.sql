-- Fix RLS policies for ratings table to prevent unauthorized access to personal information

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own ratings" ON public.ratings;
DROP POLICY IF EXISTS "Users can create their own ratings" ON public.ratings;

-- Create more secure policies that explicitly handle authentication
CREATE POLICY "Users can view only their own ratings" 
ON public.ratings 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create only their own ratings" 
ON public.ratings 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Ensure no anonymous access is allowed by not creating policies for anon role
-- This prevents any unauthenticated access to the ratings table