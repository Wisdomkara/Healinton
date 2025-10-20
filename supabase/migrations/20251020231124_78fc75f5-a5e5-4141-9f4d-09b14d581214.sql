-- Drop existing policy that doesn't explicitly check for authentication
DROP POLICY IF EXISTS "Users can manage own bookings" ON public.hospital_bookings;

-- Create explicit policies that require authentication
CREATE POLICY "Authenticated users can view own bookings" 
ON public.hospital_bookings 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Authenticated users can insert own bookings" 
ON public.hospital_bookings 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Authenticated users can update own bookings" 
ON public.hospital_bookings 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Authenticated users can delete own bookings" 
ON public.hospital_bookings 
FOR DELETE 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());