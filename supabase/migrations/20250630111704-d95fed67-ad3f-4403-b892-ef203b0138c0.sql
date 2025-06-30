
-- Create a table to store premium users (both paid and manually added)
CREATE TABLE public.premium_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  subscription_type TEXT NOT NULL DEFAULT 'manual', -- 'paid', 'manual', 'trial'
  added_by TEXT DEFAULT 'admin', -- who added this user
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE, -- NULL for lifetime premium
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT -- admin notes
);

-- Add Row Level Security (RLS)
ALTER TABLE public.premium_users ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view their own premium status
CREATE POLICY "Users can view their own premium status" 
  ON public.premium_users 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for admin access (you'll need to modify this based on your admin setup)
CREATE POLICY "Admin can manage premium users" 
  ON public.premium_users 
  FOR ALL 
  USING (true); -- For now, this allows all operations. You should restrict this to admin users only.

-- Create function to check if user is premium
CREATE OR REPLACE FUNCTION public.is_user_premium(check_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Add index for better performance
CREATE INDEX idx_premium_users_user_id ON public.premium_users(user_id);
CREATE INDEX idx_premium_users_active ON public.premium_users(user_id, is_active, expires_at);
