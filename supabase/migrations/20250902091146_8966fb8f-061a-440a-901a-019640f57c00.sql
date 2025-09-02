
-- Fix foreign key constraint to enable proper cascading deletes
ALTER TABLE drug_orders 
DROP CONSTRAINT IF EXISTS drug_orders_user_id_fkey;

ALTER TABLE drug_orders 
ADD CONSTRAINT drug_orders_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;

-- Also fix other tables that may have similar issues
ALTER TABLE hospital_bookings 
DROP CONSTRAINT IF EXISTS hospital_bookings_user_id_fkey;

ALTER TABLE hospital_bookings 
ADD CONSTRAINT hospital_bookings_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;

ALTER TABLE health_metrics 
DROP CONSTRAINT IF EXISTS health_metrics_user_id_fkey;

ALTER TABLE health_metrics 
ADD CONSTRAINT health_metrics_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;

ALTER TABLE meal_completions 
DROP CONSTRAINT IF EXISTS meal_completions_user_id_fkey;

ALTER TABLE meal_completions 
ADD CONSTRAINT meal_completions_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;

ALTER TABLE meal_tracking 
DROP CONSTRAINT IF EXISTS meal_tracking_user_id_fkey;

ALTER TABLE meal_tracking 
ADD CONSTRAINT meal_tracking_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;

ALTER TABLE reminders 
DROP CONSTRAINT IF EXISTS reminders_user_id_fkey;

ALTER TABLE reminders 
ADD CONSTRAINT reminders_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;

ALTER TABLE shopping_lists 
DROP CONSTRAINT IF EXISTS shopping_lists_user_id_fkey;

ALTER TABLE shopping_lists 
ADD CONSTRAINT shopping_lists_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;

ALTER TABLE symptoms 
DROP CONSTRAINT IF EXISTS symptoms_user_id_fkey;

ALTER TABLE symptoms 
ADD CONSTRAINT symptoms_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;

ALTER TABLE user_analytics 
DROP CONSTRAINT IF EXISTS user_analytics_user_id_fkey;

ALTER TABLE user_analytics 
ADD CONSTRAINT user_analytics_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;

ALTER TABLE user_hospitals 
DROP CONSTRAINT IF EXISTS user_hospitals_user_id_fkey;

ALTER TABLE user_hospitals 
ADD CONSTRAINT user_hospitals_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) 
ON DELETE CASCADE;
