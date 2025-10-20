-- Remove PII fields from drug_orders table
ALTER TABLE public.drug_orders 
DROP COLUMN IF EXISTS full_name,
DROP COLUMN IF EXISTS phone_number,
DROP COLUMN IF EXISTS email_address,
DROP COLUMN IF EXISTS delivery_address;

-- Add phone and address fields to profiles if they don't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone_number text,
ADD COLUMN IF NOT EXISTS delivery_address text;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_drug_orders_user_id ON public.drug_orders(user_id);