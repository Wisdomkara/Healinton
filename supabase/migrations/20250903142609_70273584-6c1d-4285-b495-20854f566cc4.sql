-- Create premium_users_admin table for manual user management
CREATE TABLE IF NOT EXISTS public.premium_users_admin (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  added_by TEXT DEFAULT 'admin',
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT '2025-11-30 23:59:59+00'::timestamptz,
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.premium_users_admin ENABLE ROW LEVEL SECURITY;

-- Create policies for admin management
CREATE POLICY "Admins can manage premium users admin" 
ON public.premium_users_admin 
FOR ALL 
USING (true);

-- Create a function to make all users premium until Nov 30, 2025
CREATE OR REPLACE FUNCTION public.get_user_subscription_free(check_user_id uuid)
RETURNS TABLE(is_premium boolean, plan_type text, status text, end_date timestamp with time zone, days_remaining integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  free_until_date timestamp with time zone := '2025-11-30 23:59:59+00'::timestamptz;
BEGIN
  -- Everyone is premium until November 30, 2025
  RETURN QUERY SELECT 
    true as is_premium,
    'premium_free'::text as plan_type,
    'active'::text as status,
    free_until_date as end_date,
    EXTRACT(days FROM (free_until_date - now()))::integer as days_remaining;
END;
$$;

-- Create or update meal tracking analytics function
CREATE OR REPLACE FUNCTION public.update_meal_analytics()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Insert or update analytics when meal is completed
  IF NEW.completed = true THEN
    INSERT INTO public.user_analytics (user_id, date, metric_type, value)
    VALUES (NEW.user_id, NEW.meal_date, 'meal_completed', 1)
    ON CONFLICT (user_id, date, metric_type) 
    DO UPDATE SET value = user_analytics.value + 1;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for meal analytics
DROP TRIGGER IF EXISTS trigger_meal_analytics ON public.meal_completions;
CREATE TRIGGER trigger_meal_analytics
  AFTER INSERT OR UPDATE ON public.meal_completions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_meal_analytics();

-- Create weekly meal plans table
CREATE TABLE IF NOT EXISTS public.weekly_meal_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner')),
  meal_name TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_start_date, day_of_week, meal_type)
);

-- Enable RLS on weekly meal plans
ALTER TABLE public.weekly_meal_plans ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own meal plans
CREATE POLICY "Users can manage own weekly meal plans" 
ON public.weekly_meal_plans 
FOR ALL 
USING (auth.uid() = user_id);

-- Create function to generate weekly meal plans
CREATE OR REPLACE FUNCTION public.generate_weekly_meal_plan(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  week_start date := date_trunc('week', current_date)::date;
  meal_options text[] := ARRAY[
    'Oatmeal with fruits', 'Scrambled eggs with toast', 'Greek yogurt with berries',
    'Grilled chicken salad', 'Vegetable soup with bread', 'Quinoa bowl with vegetables',
    'Baked salmon with rice', 'Stir-fried vegetables with tofu', 'Lean beef with sweet potato'
  ];
  day_num integer;
  meal_type text;
BEGIN
  -- Generate meals for the current week if not exists
  FOR day_num IN 0..6 LOOP
    FOR meal_type IN SELECT unnest(ARRAY['breakfast', 'lunch', 'dinner']) LOOP
      INSERT INTO public.weekly_meal_plans (user_id, week_start_date, day_of_week, meal_type, meal_name)
      VALUES (
        p_user_id, 
        week_start, 
        day_num, 
        meal_type, 
        meal_options[1 + (random() * (array_length(meal_options, 1) - 1))::integer]
      )
      ON CONFLICT (user_id, week_start_date, day_of_week, meal_type) DO NOTHING;
    END LOOP;
  END LOOP;
END;
$$;