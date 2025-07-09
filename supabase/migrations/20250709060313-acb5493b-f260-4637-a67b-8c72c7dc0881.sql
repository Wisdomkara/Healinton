
-- Add new tables for drug categories and hospital information
CREATE TABLE public.drug_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('basic', 'unique', 'hard_to_find')) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  availability BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add hospital information table
CREATE TABLE public.user_hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  hospital_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add drug orders table
CREATE TABLE public.drug_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  drug_id UUID REFERENCES drug_categories(id) NOT NULL,
  quantity INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  order_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  total_amount DECIMAL(10,2)
);

-- Add meal tracking table
CREATE TABLE public.meal_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  meal_date DATE NOT NULL,
  meal_time TEXT NOT NULL, -- 'morning', 'afternoon', 'night'
  illness_type TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, meal_date, meal_time)
);

-- Add user analytics table
CREATE TABLE public.user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  metric_type TEXT NOT NULL, -- 'meal_compliance', 'appointment_attendance', etc.
  value DECIMAL(5,2) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.drug_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view drug categories" ON public.drug_categories FOR SELECT USING (true);
CREATE POLICY "Users can manage own hospitals" ON public.user_hospitals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own drug orders" ON public.drug_orders FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own meal tracking" ON public.meal_tracking FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own analytics" ON public.user_analytics FOR ALL USING (auth.uid() = user_id);

-- Insert sample drugs
INSERT INTO public.drug_categories (name, type, description, price) VALUES
-- Basic drugs
('Paracetamol', 'basic', 'Pain relief and fever reducer', 2.99),
('Ibuprofen', 'basic', 'Anti-inflammatory pain reliever', 3.49),
('Aspirin', 'basic', 'Pain reliever and blood thinner', 2.49),
('Acetaminophen', 'basic', 'Pain and fever reducer', 2.99),
('Diphenhydramine', 'basic', 'Antihistamine for allergies', 4.99),
('Loratadine', 'basic', 'Non-drowsy allergy relief', 5.49),
('Omeprazole', 'basic', 'Acid reflux treatment', 6.99),
('Simethicone', 'basic', 'Gas relief medication', 3.99),
('Loperamide', 'basic', 'Anti-diarrheal medication', 4.49),
('Bisacodyl', 'basic', 'Laxative for constipation', 3.99),
('Hydrocortisone', 'basic', 'Topical anti-inflammatory', 5.99),
('Bacitracin', 'basic', 'Antibiotic ointment', 4.99),
('Calcium Carbonate', 'basic', 'Antacid and calcium supplement', 3.49),
('Multivitamin', 'basic', 'Daily vitamin supplement', 8.99),
('Vitamin D3', 'basic', 'Bone health supplement', 6.99),
('Vitamin C', 'basic', 'Immune system support', 4.99),
('Zinc', 'basic', 'Immune system mineral', 5.99),
('Magnesium', 'basic', 'Muscle and nerve function', 7.99),
('Melatonin', 'basic', 'Sleep aid supplement', 6.49),
('Probiotic', 'basic', 'Digestive health support', 12.99),
('Fish Oil', 'basic', 'Omega-3 fatty acids', 9.99),
('Glucosamine', 'basic', 'Joint health supplement', 14.99),
('Fiber Supplement', 'basic', 'Digestive health fiber', 8.99),
('Iron', 'basic', 'Iron deficiency supplement', 6.99),
('B-Complex', 'basic', 'B vitamin supplement', 7.99),
('Coenzyme Q10', 'basic', 'Heart health supplement', 19.99),
('Turmeric', 'basic', 'Anti-inflammatory supplement', 11.99),
('Echinacea', 'basic', 'Immune system herb', 8.99),
('Ginkgo Biloba', 'basic', 'Memory and circulation', 12.99),
('Garlic Extract', 'basic', 'Cardiovascular health', 9.99),

-- Unique drugs
('Metformin', 'unique', 'Diabetes medication', 15.99),
('Lisinopril', 'unique', 'Blood pressure medication', 12.99),
('Atorvastatin', 'unique', 'Cholesterol medication', 18.99),
('Amlodipine', 'unique', 'Calcium channel blocker', 14.99),
('Losartan', 'unique', 'ARB blood pressure med', 16.99),
('Metoprolol', 'unique', 'Beta blocker for heart', 13.99),
('Hydrochlorothiazide', 'unique', 'Diuretic medication', 11.99),
('Glipizide', 'unique', 'Diabetes medication', 17.99),
('Warfarin', 'unique', 'Blood thinner medication', 19.99),
('Clopidogrel', 'unique', 'Antiplatelet medication', 22.99),
('Pantoprazole', 'unique', 'Proton pump inhibitor', 14.99),
('Levothyroxine', 'unique', 'Thyroid hormone', 13.99),
('Sertraline', 'unique', 'Antidepressant medication', 16.99),
('Alprazolam', 'unique', 'Anti-anxiety medication', 18.99),
('Zolpidem', 'unique', 'Sleep medication', 15.99),
('Gabapentin', 'unique', 'Nerve pain medication', 19.99),
('Tramadol', 'unique', 'Pain medication', 21.99),
('Cyclobenzaprine', 'unique', 'Muscle relaxant', 17.99),
('Prednisone', 'unique', 'Corticosteroid medication', 14.99),
('Albuterol', 'unique', 'Bronchodilator inhaler', 25.99),
('Fluticasone', 'unique', 'Nasal corticosteroid', 18.99),
('Montelukast', 'unique', 'Asthma medication', 22.99),
('Insulin Glargine', 'unique', 'Long-acting insulin', 89.99),
('Donepezil', 'unique', 'Alzheimer medication', 45.99),
('Memantine', 'unique', 'Dementia medication', 67.99),
('Rivaroxaban', 'unique', 'Novel anticoagulant', 125.99),
('Sofosbuvir', 'unique', 'Hepatitis C treatment', 899.99),
('Adalimumab', 'unique', 'Autoimmune treatment', 1299.99),
('Etanercept', 'unique', 'Rheumatoid arthritis', 1199.99),
('Rituximab', 'unique', 'Cancer immunotherapy', 2499.99),

-- Hard to find drugs
('Orphan Drug Alpha', 'hard_to_find', 'Rare disease treatment', 2999.99),
('Experimental Beta', 'hard_to_find', 'Clinical trial medication', 3499.99),
('Rare Compound Gamma', 'hard_to_find', 'Ultra-rare condition', 4999.99),
('Specialty Delta', 'hard_to_find', 'Limited availability', 2799.99),
('Investigational Epsilon', 'hard_to_find', 'Research compound', 3299.99),
('Compassionate Zeta', 'hard_to_find', 'Compassionate use', 3799.99),
('Niche Therapy Eta', 'hard_to_find', 'Specialized treatment', 2599.99),
('Limited Access Theta', 'hard_to_find', 'Restricted distribution', 3199.99),
('Exclusive Iota', 'hard_to_find', 'Exclusive access needed', 3999.99),
('Restricted Kappa', 'hard_to_find', 'Special authorization', 2899.99),
('Specialized Lambda', 'hard_to_find', 'Specialist prescription', 3599.99),
('Custom Mu', 'hard_to_find', 'Custom formulation', 4299.99),
('Boutique Nu', 'hard_to_find', 'Boutique pharmacy only', 2999.99),
('Elite Xi', 'hard_to_find', 'Elite medical centers', 3899.99),
('Premium Omicron', 'hard_to_find', 'Premium healthcare', 4199.99),
('Selective Pi', 'hard_to_find', 'Selective availability', 2799.99),
('Exclusive Rho', 'hard_to_find', 'Exclusive clinics', 3399.99),
('Limited Sigma', 'hard_to_find', 'Limited production', 3699.99),
('Specialty Tau', 'hard_to_find', 'Specialty compounding', 2999.99),
('Unique Upsilon', 'hard_to_find', 'Unique formulation', 3799.99),
('Rare Phi', 'hard_to_find', 'Rare availability', 4099.99),
('Special Chi', 'hard_to_find', 'Special order only', 2899.99),
('Custom Psi', 'hard_to_find', 'Custom synthesis', 4599.99),
('Exclusive Omega', 'hard_to_find', 'Exclusive distribution', 3999.99),
('Investigational Alpha-2', 'hard_to_find', 'Phase III trial drug', 3299.99),
('Orphan Beta-2', 'hard_to_find', 'Orphan designation', 3799.99),
('Breakthrough Gamma-2', 'hard_to_find', 'Breakthrough therapy', 4299.99),
('Accelerated Delta-2', 'hard_to_find', 'Accelerated approval', 3599.99),
('Priority Epsilon-2', 'hard_to_find', 'Priority review drug', 3999.99),
('Fast Track Zeta-2', 'hard_to_find', 'Fast track designation', 3699.99);
