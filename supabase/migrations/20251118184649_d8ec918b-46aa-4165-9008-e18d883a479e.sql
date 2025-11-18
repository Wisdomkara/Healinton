-- Delete orphaned drug orders (where user no longer exists)
DELETE FROM public.drug_orders
WHERE user_id NOT IN (SELECT id FROM auth.users);

-- Ensure all remaining users with drug orders have profiles
INSERT INTO public.profiles (id, email)
SELECT DISTINCT orders.user_id, COALESCE(users.email, 'unknown@healinton.com')
FROM public.drug_orders orders
JOIN auth.users users ON users.id = orders.user_id
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = orders.user_id
)
ON CONFLICT (id) DO NOTHING;

-- Add delivery_address and user_name columns to drug_orders
ALTER TABLE public.drug_orders 
ADD COLUMN IF NOT EXISTS delivery_address TEXT,
ADD COLUMN IF NOT EXISTS user_name TEXT;

-- Now add the foreign key relationship
ALTER TABLE public.drug_orders 
ADD CONSTRAINT drug_orders_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

-- Add comment for documentation
COMMENT ON COLUMN public.drug_orders.delivery_address IS 'Delivery address from user profile at time of order';
COMMENT ON COLUMN public.drug_orders.user_name IS 'Full name of user at time of order';