-- Create unique constraints required for safe upserts and to fix ON CONFLICT errors
-- 1) Ensure one record per user/date/meal_time/budget in meal_completions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'meal_completions_user_date_time_budget_key'
  ) THEN
    ALTER TABLE public.meal_completions
    ADD CONSTRAINT meal_completions_user_date_time_budget_key
    UNIQUE (user_id, meal_date, meal_time, budget_type);
  END IF;
END $$;

-- 2) Ensure one analytics row per user/metric/date in user_analytics (matches app upsert usage)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_analytics_user_metric_date_key'
  ) THEN
    ALTER TABLE public.user_analytics
    ADD CONSTRAINT user_analytics_user_metric_date_key
    UNIQUE (user_id, metric_type, date);
  END IF;
END $$;

-- Helpful supporting indexes (no-op if constraints already create needed indexes)
CREATE INDEX IF NOT EXISTS idx_meal_completions_user_date
  ON public.meal_completions (user_id, meal_date);
