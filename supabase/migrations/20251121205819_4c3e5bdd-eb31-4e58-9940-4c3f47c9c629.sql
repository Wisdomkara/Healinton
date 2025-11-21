-- Create hospitals table
CREATE TABLE IF NOT EXISTS public.hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Nigeria',
  state TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create pharmacies table
CREATE TABLE IF NOT EXISTS public.pharmacies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Nigeria',
  state TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on hospitals
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view hospitals
CREATE POLICY "Anyone can view hospitals"
ON public.hospitals
FOR SELECT
USING (true);

-- Only admins can manage hospitals
CREATE POLICY "Only admins can manage hospitals"
ON public.hospitals
FOR ALL
USING (is_admin());

-- Enable RLS on pharmacies
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view pharmacies
CREATE POLICY "Anyone can view pharmacies"
ON public.pharmacies
FOR SELECT
USING (true);

-- Only admins can manage pharmacies
CREATE POLICY "Only admins can manage pharmacies"
ON public.pharmacies
FOR ALL
USING (is_admin());

-- Update user_hospitals to reference hospitals table
ALTER TABLE public.user_hospitals
ADD COLUMN IF NOT EXISTS hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE;

-- Update hospital_bookings to include more details
ALTER TABLE public.hospital_bookings
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS user_name TEXT;

-- Update drug_orders to include pharmacy selection
ALTER TABLE public.drug_orders
ADD COLUMN IF NOT EXISTS pharmacy_id UUID,
ADD COLUMN IF NOT EXISTS pharmacy_name TEXT,
ADD COLUMN IF NOT EXISTS pharmacy_email TEXT;

-- Insert 10 Nigerian hospitals
INSERT INTO public.hospitals (name, address, email, phone, country, state, image_url) VALUES
('Lagos University Teaching Hospital', '1 Harvey Road, Yaba, Lagos', 'info@luth.gov.ng', '+234-1-8952490', 'Nigeria', 'Lagos', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400'),
('University College Hospital Ibadan', 'Queen Elizabeth Road, Ibadan', 'info@uch-ibadan.org.ng', '+234-2-2410088', 'Nigeria', 'Oyo', 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400'),
('National Hospital Abuja', 'Plot 132 Central District, Abuja', 'info@nationalhospitalabuja.gov.ng', '+234-9-4619000', 'Nigeria', 'FCT', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400'),
('Ahmadu Bello University Teaching Hospital', 'Sambo Road, Zaria, Kaduna', 'info@abuth.gov.ng', '+234-69-230011', 'Nigeria', 'Kaduna', 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400'),
('University of Port Harcourt Teaching Hospital', 'East-West Road, Port Harcourt', 'info@upth.gov.ng', '+234-84-462606', 'Nigeria', 'Rivers', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400'),
('Aminu Kano Teaching Hospital', 'Zaria Road, Kano', 'info@akth.gov.ng', '+234-64-667191', 'Nigeria', 'Kano', 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400'),
('Nnamdi Azikiwe University Teaching Hospital', 'PMB 5025, Nnewi, Anambra', 'info@nauth.gov.ng', '+234-46-460735', 'Nigeria', 'Anambra', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400'),
('Federal Medical Centre Owerri', '13 Hospital Road, Owerri', 'info@fmcowerri.gov.ng', '+234-83-231115', 'Nigeria', 'Imo', 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400'),
('University of Benin Teaching Hospital', 'PMB 1111, Benin City', 'info@ubth.gov.ng', '+234-52-600200', 'Nigeria', 'Edo', 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400'),
('University of Calabar Teaching Hospital', 'Moore Road, Calabar', 'info@ucth.gov.ng', '+234-87-239009', 'Nigeria', 'Cross River', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400')
ON CONFLICT DO NOTHING;

-- Insert some sample pharmacies
INSERT INTO public.pharmacies (name, address, email, phone, country, state) VALUES
('HealthPlus Pharmacy Lagos', '29 Isaac John Street, GRA Ikeja, Lagos', 'info@healthplus.com.ng', '+234-1-7747000', 'Nigeria', 'Lagos'),
('MedPlus Pharmacy Abuja', 'Plot 1035 Samuel Ademulegun Avenue, Abuja', 'info@medplus.ng', '+234-9-4610200', 'Nigeria', 'FCT'),
('Alpha Pharmacy Port Harcourt', '15 Aba Road, Port Harcourt', 'info@alphapharmacy.ng', '+234-84-231145', 'Nigeria', 'Rivers'),
('Prime Pharmacy Ibadan', '23 Bodija Market Road, Ibadan', 'info@primepharmacy.ng', '+234-2-8105900', 'Nigeria', 'Oyo'),
('Care Pharmacy Kano', '45 Murtala Mohammed Way, Kano', 'info@carepharmacy.ng', '+234-64-638200', 'Nigeria', 'Kano')
ON CONFLICT DO NOTHING;