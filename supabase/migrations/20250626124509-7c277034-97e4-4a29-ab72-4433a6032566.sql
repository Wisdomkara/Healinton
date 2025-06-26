
-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  country TEXT,
  illness_type TEXT CHECK (illness_type IN ('hypertension', 'diabetes', 'heart_disease', 'obesity', 'high_cholesterol')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create health metrics table
CREATE TABLE public.health_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  weight DECIMAL(5,2),
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  blood_sugar DECIMAL(5,2),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create symptoms table
CREATE TABLE public.symptoms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  symptoms TEXT NOT NULL,
  severity INTEGER CHECK (severity BETWEEN 1 AND 10),
  additional_notes TEXT,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reminders table
CREATE TABLE public.reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  reminder_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hospital bookings table
CREATE TABLE public.hospital_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  hospital_name TEXT NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shopping lists table for medications
CREATE TABLE public.shopping_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  medication_name TEXT NOT NULL,
  pharmacy_name TEXT,
  is_purchased BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  author TEXT DEFAULT 'Carevital Team',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT DEFAULT 'health'
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospital_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can manage own health metrics" ON public.health_metrics FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can manage own symptoms" ON public.symptoms FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can manage own reminders" ON public.reminders FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can manage own bookings" ON public.hospital_bookings FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can manage own shopping lists" ON public.shopping_lists FOR ALL USING (user_id = auth.uid());

-- Blog posts are public for reading
CREATE POLICY "Anyone can read blog posts" ON public.blog_posts FOR SELECT TO public USING (true);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample blog posts
INSERT INTO public.blog_posts (title, content, summary, category) VALUES
('Managing Hypertension Through Diet', 'A comprehensive guide on dietary approaches to managing high blood pressure. Focus on reducing sodium intake, increasing potassium-rich foods, and maintaining a balanced diet.', 'Learn how proper nutrition can help control blood pressure naturally.', 'hypertension'),
('Understanding Diabetes: Types and Management', 'Diabetes affects millions worldwide. Understanding the different types and management strategies is crucial for maintaining a healthy lifestyle.', 'Complete overview of diabetes types and management approaches.', 'diabetes'),
('Heart Health: Prevention and Care', 'Your heart is your most vital organ. Learn about prevention strategies and care techniques to maintain cardiovascular health.', 'Essential tips for maintaining optimal heart health.', 'heart_health'),
('Weight Management for Better Health', 'Sustainable weight management approaches that focus on lifestyle changes rather than quick fixes.', 'Practical strategies for healthy weight management.', 'obesity'),
('Cholesterol: The Good, The Bad, and The Management', 'Understanding cholesterol levels and how to manage them through diet, exercise, and lifestyle modifications.', 'Complete guide to understanding and managing cholesterol.', 'cholesterol');
