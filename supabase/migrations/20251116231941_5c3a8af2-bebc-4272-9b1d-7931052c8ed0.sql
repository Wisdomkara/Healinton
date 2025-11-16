-- Fix RLS policies for drug_orders table to allow admins full access
DROP POLICY IF EXISTS "Admins can manage all drug orders" ON drug_orders;

CREATE POLICY "Admins can view all drug orders"
  ON drug_orders
  FOR SELECT
  USING (
    get_current_user_role() = 'admin' OR 
    user_id = auth.uid()
  );

CREATE POLICY "Admins can update all drug orders"
  ON drug_orders
  FOR UPDATE
  USING (
    get_current_user_role() = 'admin' OR 
    user_id = auth.uid()
  );

-- Add missing constraint to ensure drug_id references drug_categories
ALTER TABLE drug_orders 
DROP CONSTRAINT IF EXISTS drug_orders_drug_id_fkey;

ALTER TABLE drug_orders
ADD CONSTRAINT drug_orders_drug_id_fkey 
FOREIGN KEY (drug_id) 
REFERENCES drug_categories(id) 
ON DELETE CASCADE;

-- Update hospital_bookings RLS to allow admin access
CREATE POLICY "Admins can view all hospital bookings"
  ON hospital_bookings
  FOR SELECT
  USING (
    get_current_user_role() = 'admin' OR 
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

CREATE POLICY "Admins can update all hospital bookings"
  ON hospital_bookings
  FOR UPDATE
  USING (
    get_current_user_role() = 'admin' OR 
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

-- Update premium_form_submissions RLS to allow admin access
CREATE POLICY "Admins can view all premium submissions"
  ON premium_form_submissions
  FOR SELECT
  USING (
    get_current_user_role() = 'admin' OR 
    user_id = auth.uid()
  );