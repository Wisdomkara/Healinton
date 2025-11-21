-- Add image_url column to pharmacies table if it doesn't exist
ALTER TABLE public.pharmacies ADD COLUMN IF NOT EXISTS image_url text;

-- Insert 7 more pharmacies with image URLs
INSERT INTO public.pharmacies (name, address, email, phone, country, state, image_url) VALUES
('HealthPlus Pharmacy', '23 Awolowo Road, Ikoyi, Lagos', 'contact@healthplusng.com', '+234-803-456-7890', 'Nigeria', 'Lagos', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'),
('MedExpress Pharmacy', '45 Ahmadu Bello Way, Kaduna', 'info@medexpress.ng', '+234-805-678-9012', 'Nigeria', 'Kaduna', 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80'),
('CareWell Pharmacy', '12 University Road, Nsukka, Enugu', 'carewell@pharmacy.ng', '+234-807-890-1234', 'Nigeria', 'Enugu', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80'),
('PharmaDirect', '78 Port Harcourt Road, Aba', 'support@pharmadirect.ng', '+234-809-012-3456', 'Nigeria', 'Abia', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80'),
('WellCare Pharmacy', '34 Sapele Road, Benin City', 'contact@wellcare.ng', '+234-810-234-5678', 'Nigeria', 'Edo', 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80'),
('QuickMed Pharmacy', '56 Old Ojo Road, Lagos', 'info@quickmed.ng', '+234-812-345-6789', 'Nigeria', 'Lagos', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80'),
('TrustCare Pharmacy', '89 Bompai Road, Kano', 'hello@trustcare.ng', '+234-813-456-7890', 'Nigeria', 'Kano', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80');

-- Update existing pharmacies with image URLs
UPDATE public.pharmacies 
SET image_url = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'
WHERE name = 'St. Mary Pharmacy';

UPDATE public.pharmacies 
SET image_url = 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80'
WHERE name = 'Prime Health Pharmacy';

UPDATE public.pharmacies 
SET image_url = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80'
WHERE name = 'MediCare Plus';

UPDATE public.pharmacies 
SET image_url = 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80'
WHERE name = 'LifeLine Pharmacy';

UPDATE public.pharmacies 
SET image_url = 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80'
WHERE name = 'WellSpring Pharmacy';