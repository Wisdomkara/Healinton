
-- First, let's update the illness types constraint to include all the new conditions
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_illness_type_check;

ALTER TABLE public.profiles ADD CONSTRAINT profiles_illness_type_check 
CHECK (illness_type IN (
  'cancer',
  'diabetes_type_1',
  'diabetes_type_2', 
  'hypertension',
  'chronic_kidney_disease',
  'heart_disease',
  'hiv_aids',
  'copd',
  'asthma',
  'epilepsy',
  'multiple_sclerosis',
  'liver_cirrhosis',
  'parkinsons_disease',
  'stroke',
  'sickle_cell_disease',
  'lupus',
  'rheumatoid_arthritis',
  'crohns_disease',
  'tuberculosis',
  'alzheimers_disease',
  'cystic_fibrosis'
));

-- Add phone number to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Update shopping_lists table to include more contact information and reference number
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS email_address TEXT;
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.shopping_lists ADD COLUMN IF NOT EXISTS reference_number TEXT UNIQUE DEFAULT 'SL' || LPAD(floor(random() * 1000000)::text, 6, '0');

-- Update hospital_bookings table to include more contact information and reference number
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS email_address TEXT;
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.hospital_bookings ADD COLUMN IF NOT EXISTS reference_number TEXT UNIQUE DEFAULT 'HB' || LPAD(floor(random() * 1000000)::text, 6, '0');

-- Create a table for countries and their hospitals/clinics
CREATE TABLE IF NOT EXISTS public.countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  country_id UUID REFERENCES public.countries(id),
  phone TEXT,
  email TEXT,
  type TEXT CHECK (type IN ('hospital', 'clinic', 'pharmacy')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for drug orders
CREATE TABLE IF NOT EXISTS public.drug_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  drug_name TEXT NOT NULL,
  drug_type TEXT CHECK (drug_type IN ('basic', 'unique', 'difficult')),
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2),
  delivery_address TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email_address TEXT NOT NULL,
  reference_number TEXT UNIQUE DEFAULT 'DO' || LPAD(floor(random() * 1000000)::text, 6, '0'),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for countries and hospitals (public read access)
CREATE POLICY "Anyone can read countries" ON public.countries FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read hospitals" ON public.hospitals FOR SELECT TO public USING (true);

-- Create policies for drug orders (users can manage their own orders)
CREATE POLICY "Users can view their own drug orders" ON public.drug_orders FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own drug orders" ON public.drug_orders FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own drug orders" ON public.drug_orders FOR UPDATE USING (user_id = auth.uid());

-- Insert sample countries
INSERT INTO public.countries (name, code) VALUES 
('United States', 'US'),
('United Kingdom', 'UK'),
('Canada', 'CA'),
('Australia', 'AU'),
('Germany', 'DE'),
('France', 'FR'),
('Japan', 'JP'),
('India', 'IN'),
('Brazil', 'BR'),
('South Africa', 'ZA'),
('Nigeria', 'NG'),
('Kenya', 'KE'),
('Ghana', 'GH'),
('Egypt', 'EG'),
('Morocco', 'MA')
ON CONFLICT (code) DO NOTHING;

-- Insert sample hospitals for major countries
INSERT INTO public.hospitals (name, address, city, country_id, phone, email, type) 
SELECT 
  hospital_data.name,
  hospital_data.address,
  hospital_data.city,
  c.id,
  hospital_data.phone,
  hospital_data.email,
  hospital_data.type
FROM (
  VALUES 
    ('Mayo Clinic', '200 First St SW', 'Rochester', 'US', '+1-507-284-2511', 'info@mayo.edu', 'hospital'),
    ('Johns Hopkins Hospital', '1800 Orleans St', 'Baltimore', 'US', '+1-410-955-5000', 'info@jhmi.edu', 'hospital'),
    ('NHS Royal London Hospital', 'Whitechapel Rd', 'London', 'UK', '+44-20-7377-7000', 'info@bartshealth.nhs.uk', 'hospital'),
    ('Toronto General Hospital', '200 Elizabeth St', 'Toronto', 'CA', '+1-416-340-4800', 'info@uhn.ca', 'hospital'),
    ('Royal Melbourne Hospital', '300 Grattan St', 'Melbourne', 'AU', '+61-3-9342-7000', 'info@mh.org.au', 'hospital'),
    ('Charité Berlin', 'Charitéplatz 1', 'Berlin', 'DE', '+49-30-450-50', 'info@charite.de', 'hospital'),
    ('University of Lagos Teaching Hospital', 'Idi-Araba', 'Lagos', 'NG', '+234-1-800-4000', 'info@luth.org', 'hospital'),
    ('Kenyatta National Hospital', 'Hospital Rd', 'Nairobi', 'KE', '+254-20-2726300', 'info@knh.or.ke', 'hospital'),
    ('Korle-Bu Teaching Hospital', 'Guggisberg Ave', 'Accra', 'GH', '+233-30-2665401', 'info@kbth.gov.gh', 'hospital'),
    ('Cairo University Hospital', 'Kasr Al Ainy St', 'Cairo', 'EG', '+20-2-23654321', 'info@cu.edu.eg', 'hospital')
) AS hospital_data(name, address, city, country_code, phone, email, type)
JOIN public.countries c ON c.code = hospital_data.country_code
ON CONFLICT DO NOTHING;
