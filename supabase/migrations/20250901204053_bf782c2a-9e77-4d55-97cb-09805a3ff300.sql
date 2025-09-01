
-- Create a table to store premium user form submissions
CREATE TABLE public.premium_form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  surname TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.premium_form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own submissions
CREATE POLICY "Users can view their own premium form submissions" 
  ON public.premium_form_submissions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own submissions
CREATE POLICY "Users can create their own premium form submissions" 
  ON public.premium_form_submissions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own submissions
CREATE POLICY "Users can update their own premium form submissions" 
  ON public.premium_form_submissions 
  FOR UPDATE 
  USING (auth.uid() = user_id);
