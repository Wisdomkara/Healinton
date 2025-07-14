
-- Add missing columns to drug_orders table
ALTER TABLE public.drug_orders 
ADD COLUMN IF NOT EXISTS reference_number text,
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS phone_number text,
ADD COLUMN IF NOT EXISTS email_address text,
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS delivery_address text;

-- Add missing columns to hospital_bookings table  
ALTER TABLE public.hospital_bookings
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS hospital_email text;
