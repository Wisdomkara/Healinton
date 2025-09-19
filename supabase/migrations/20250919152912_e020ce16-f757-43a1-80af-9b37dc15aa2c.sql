-- Fix RLS policy for drug_orders table to be properly restrictive
-- First drop the existing permissive policy
DROP POLICY IF EXISTS "Users can manage own drug orders" ON public.drug_orders;

-- Create proper restrictive policies for drug_orders
CREATE POLICY "Users can view own drug orders" 
ON public.drug_orders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own drug orders" 
ON public.drug_orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own drug orders" 
ON public.drug_orders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own drug orders" 
ON public.drug_orders 
FOR DELETE 
USING (auth.uid() = user_id);

-- Also add admin access for authorized staff
CREATE POLICY "Admins can manage all drug orders" 
ON public.drug_orders 
FOR ALL 
USING (public.get_current_user_role() = 'admin');