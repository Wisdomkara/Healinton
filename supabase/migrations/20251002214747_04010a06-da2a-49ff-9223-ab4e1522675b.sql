-- Update RLS policies to use (select auth.uid()) syntax for better compatibility

-- Drop and recreate user_analytics policies
DROP POLICY IF EXISTS "Users can manage own analytics" ON user_analytics;
CREATE POLICY "Users can manage own analytics" 
ON user_analytics 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Drop and recreate weekly_meal_plans policies
DROP POLICY IF EXISTS "Users can manage own weekly meal plans" ON weekly_meal_plans;
CREATE POLICY "Users can manage own weekly meal plans" 
ON weekly_meal_plans 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Drop and recreate reminders policies
DROP POLICY IF EXISTS "Users can manage own reminders" ON reminders;
CREATE POLICY "Users can manage own reminders" 
ON reminders 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Drop and recreate health_metrics policies
DROP POLICY IF EXISTS "Users can manage own health metrics" ON health_metrics;
CREATE POLICY "Users can manage own health metrics" 
ON health_metrics 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Drop and recreate hospital_bookings policies
DROP POLICY IF EXISTS "Users can manage own bookings" ON hospital_bookings;
CREATE POLICY "Users can manage own bookings" 
ON hospital_bookings 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Drop and recreate symptoms policies
DROP POLICY IF EXISTS "Users can manage own symptoms" ON symptoms;
CREATE POLICY "Users can manage own symptoms" 
ON symptoms 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Drop and recreate shopping_lists policies
DROP POLICY IF EXISTS "Users can manage own shopping lists" ON shopping_lists;
CREATE POLICY "Users can manage own shopping lists" 
ON shopping_lists 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Drop and recreate meal_completions policies
DROP POLICY IF EXISTS "Users can manage own meal completions" ON meal_completions;
CREATE POLICY "Users can manage own meal completions" 
ON meal_completions 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Drop and recreate meal_tracking policies
DROP POLICY IF EXISTS "Users can manage own meal tracking" ON meal_tracking;
CREATE POLICY "Users can manage own meal tracking" 
ON meal_tracking 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Drop and recreate user_hospitals policies
DROP POLICY IF EXISTS "Users can manage own hospitals" ON user_hospitals;
CREATE POLICY "Users can manage own hospitals" 
ON user_hospitals 
FOR ALL 
USING (user_id = (select auth.uid()));

-- Update profiles policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

CREATE POLICY "Users can insert own profile" 
ON profiles 
FOR INSERT 
WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Users can update own profile" 
ON profiles 
FOR UPDATE 
USING (id = (select auth.uid()));

CREATE POLICY "Users can view own profile" 
ON profiles 
FOR SELECT 
USING (id = (select auth.uid()));

-- Update drug_orders policies
DROP POLICY IF EXISTS "Users can view own drug orders" ON drug_orders;
DROP POLICY IF EXISTS "Users can insert own drug orders" ON drug_orders;
DROP POLICY IF EXISTS "Users can update own drug orders" ON drug_orders;
DROP POLICY IF EXISTS "Users can delete own drug orders" ON drug_orders;

CREATE POLICY "Users can view own drug orders" 
ON drug_orders 
FOR SELECT 
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own drug orders" 
ON drug_orders 
FOR INSERT 
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own drug orders" 
ON drug_orders 
FOR UPDATE 
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own drug orders" 
ON drug_orders 
FOR DELETE 
USING (user_id = (select auth.uid()));

-- Update ratings policies
DROP POLICY IF EXISTS "Users can create only their own ratings" ON ratings;
DROP POLICY IF EXISTS "Users can view only their own ratings" ON ratings;

CREATE POLICY "Users can create only their own ratings" 
ON ratings 
FOR INSERT 
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can view only their own ratings" 
ON ratings 
FOR SELECT 
USING (user_id = (select auth.uid()));

-- Update subscriptions policies
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can insert their own subscriptions" ON subscriptions;

CREATE POLICY "Users can view their own subscriptions" 
ON subscriptions 
FOR SELECT 
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert their own subscriptions" 
ON subscriptions 
FOR INSERT 
WITH CHECK (user_id = (select auth.uid()));

-- Update payments policies
DROP POLICY IF EXISTS "Users can view their own payments" ON payments;
DROP POLICY IF EXISTS "Users can insert their own payments" ON payments;

CREATE POLICY "Users can view their own payments" 
ON payments 
FOR SELECT 
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert their own payments" 
ON payments 
FOR INSERT 
WITH CHECK (user_id = (select auth.uid()));

-- Update premium_form_submissions policies
DROP POLICY IF EXISTS "Users can view their own premium form submissions" ON premium_form_submissions;
DROP POLICY IF EXISTS "Users can create their own premium form submissions" ON premium_form_submissions;
DROP POLICY IF EXISTS "Users can update their own premium form submissions" ON premium_form_submissions;

CREATE POLICY "Users can view their own premium form submissions" 
ON premium_form_submissions 
FOR SELECT 
USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create their own premium form submissions" 
ON premium_form_submissions 
FOR INSERT 
WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own premium form submissions" 
ON premium_form_submissions 
FOR UPDATE 
USING (user_id = (select auth.uid()));

-- Update premium_users policies
DROP POLICY IF EXISTS "Users can view their own premium status" ON premium_users;

CREATE POLICY "Users can view their own premium status" 
ON premium_users 
FOR SELECT 
USING (user_id = (select auth.uid()));