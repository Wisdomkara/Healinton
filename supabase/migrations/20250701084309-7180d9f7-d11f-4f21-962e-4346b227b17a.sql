
-- First, let's see what constraint exists and drop it
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_illness_type_check;

-- Create a new constraint that matches the illness types used in the Auth.tsx form
ALTER TABLE public.profiles ADD CONSTRAINT profiles_illness_type_check 
CHECK (illness_type IN (
  'hypertension',
  'diabetes', 
  'heart_disease',
  'obesity',
  'high_cholesterol',
  'asthma',
  'arthritis',
  'kidney_disease',
  'liver_disease',
  'thyroid_disorders',
  'anxiety_depression',
  'chronic_pain'
));
