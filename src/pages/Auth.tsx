
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, Globe, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    country: '',
    illnessType: ''
  });

  const illnessOptions = [
    // Chronic Diseases
    'Type 1 Diabetes',
    'Type 2 Diabetes',
    'Gestational Diabetes',
    'Hypertension (High Blood Pressure)',
    'Hypotension (Low Blood Pressure)',
    'Heart Disease',
    'Coronary Artery Disease',
    'Congestive Heart Failure',
    'Stroke',
    'Chronic Kidney Disease',
    'Kidney Stones',
    'Asthma',
    'COPD (Chronic Obstructive Pulmonary Disease)',
    'Bronchitis',
    'Emphysema',
    'Arthritis',
    'Rheumatoid Arthritis',
    'Osteoarthritis',
    'Osteoporosis',
    'Fibromyalgia',
    'Multiple Sclerosis',
    'Parkinson\'s Disease',
    'Alzheimer\'s Disease',
    'Epilepsy',
    'Migraine',
    'Chronic Headaches',
    'Depression',
    'Anxiety Disorders',
    'Bipolar Disorder',
    'PTSD',
    'Stress',
    'Insomnia',
    'Sleep Apnea',
    'Thyroid Disorders',
    'Hyperthyroidism',
    'Hypothyroidism',
    'Celiac Disease',
    'Crohn\'s Disease',
    'Ulcerative Colitis',
    'IBS (Irritable Bowel Syndrome)',
    'GERD (Gastroesophageal Reflux Disease)',
    'Peptic Ulcers',
    'Liver Disease',
    'Hepatitis B',
    'Hepatitis C',
    'Cirrhosis',
    'Cancer',
    'Breast Cancer',
    'Lung Cancer',
    'Colorectal Cancer',
    'Prostate Cancer',
    'Skin Cancer',
    'Leukemia',
    'Lymphoma',
    'Lupus',
    'Psoriasis',
    'Eczema',
    'HIV/AIDS',
    'Tuberculosis',
    'Malaria',
    'Sickle Cell Disease',
    'Hemophilia',
    'Anemia',
    'Iron Deficiency',
    'Vitamin D Deficiency',
    'Vitamin B12 Deficiency',
    'Obesity',
    'Eating Disorders',
    'Anorexia',
    'Bulimia',
    'PCOS (Polycystic Ovary Syndrome)',
    'Endometriosis',
    'Menopause',
    'Erectile Dysfunction',
    'Benign Prostatic Hyperplasia',
    'Glaucoma',
    'Cataracts',
    'Macular Degeneration',
    'Hearing Loss',
    'Tinnitus',
    'Chronic Fatigue Syndrome',
    'Chronic Pain',
    'Back Pain',
    'Neck Pain',
    'Sciatica',
    'Carpal Tunnel Syndrome',
    'Tennis Elbow',
    'Plantar Fasciitis',
    'Varicose Veins',
    'Deep Vein Thrombosis',
    'Atrial Fibrillation',
    'High Cholesterol',
    'Metabolic Syndrome',
    'Prediabetes',
    'Gout',
    'Pneumonia',
    'Bronchial Infections',
    'Sinusitis',
    'Allergies',
    'Food Allergies',
    'Seasonal Allergies',
    'Skin Allergies',
    
    // Minor Symptoms and Common Conditions
    'Cold',
    'Flu',
    'Fever',
    'Cough',
    'Sore Throat',
    'Runny Nose',
    'Congestion',
    'Headaches',
    'Nausea',
    'Vomiting',
    'Diarrhea',
    'Constipation',
    'Acid Reflux',
    'Heartburn',
    'Bloating',
    'Gas',
    'Stomach Ache',
    'Muscle Aches',
    'Joint Pain',
    'Fatigue',
    'Dizziness',
    'Shortness of Breath',
    'Chest Pain',
    'Palpitations',
    'Skin Rashes',
    'Dry Skin',
    'Acne',
    'Hair Loss',
    'Dandruff',
    'Eye Strain',
    'Dry Eyes',
    'Blurred Vision',
    'Ear Pain',
    'Toothache',
    'Jaw Pain',
    'Swollen Glands',
    'Bruising',
    'Cuts and Scrapes',
    'Burns',
    'Sprains',
    'Minor Injuries',
    'Sunburn',
    'Bug Bites',
    'Poison Ivy',
    'Dehydration',
    'Motion Sickness',
    'Jet Lag',
    'Mild Anxiety',
    'Mood Swings',
    'Irritability',
    'Concentration Issues',
    'Memory Problems',
    'Seasonal Depression',
    'PMS',
    'Menstrual Cramps',
    'Hot Flashes',
    'Night Sweats',
    'Morning Sickness',
    'Growing Pains',
    'Teething Pain',
    'Diaper Rash',
    'Cradle Cap',
    'Colic',
    'General Wellness Maintenance'
  ];

  const genderOptions = [
    'Male',
    'Female',
    'Non-binary',
    'Prefer not to say'
  ];

  const countryOptions = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'South Korea',
    'Brazil', 'Mexico', 'India', 'China', 'Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Egypt',
    'Saudi Arabia', 'UAE', 'Turkey', 'Russia', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway',
    'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria', 'Greece',
    'Portugal', 'Belgium', 'Austria', 'Switzerland', 'Ireland', 'New Zealand', 'Singapore',
    'Malaysia', 'Thailand', 'Philippines', 'Indonesia', 'Vietnam', 'Bangladesh', 'Pakistan',
    'Sri Lanka', 'Nepal', 'Afghanistan', 'Iran', 'Iraq', 'Israel', 'Jordan', 'Lebanon', 'Syria',
    'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela', 'Ecuador', 'Bolivia', 'Uruguay',
    'Paraguay', 'Costa Rica', 'Panama', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua',
    'Jamaica', 'Cuba', 'Dominican Republic', 'Haiti', 'Trinidad and Tobago', 'Barbados',
    'Morocco', 'Tunisia', 'Algeria', 'Libya', 'Sudan', 'Ethiopia', 'Somalia', 'Uganda',
    'Tanzania', 'Rwanda', 'Burundi', 'Democratic Republic of Congo', 'Angola', 'Zambia',
    'Zimbabwe', 'Botswana', 'Namibia', 'Mozambique', 'Madagascar', 'Mauritius', 'Seychelles'
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signInData.email || !signInData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const { error } = await signIn(signInData.email, signInData.password);
    
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully."
      });
      navigate('/dashboard');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpData.firstName || !signUpData.lastName || !signUpData.email || 
        !signUpData.password || !signUpData.confirmPassword || !signUpData.gender || 
        !signUpData.country || !signUpData.illnessType) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    const { error } = await signUp(signUpData.email, signUpData.password, {
      first_name: signUpData.firstName,
      last_name: signUpData.lastName,
      gender: signUpData.gender,
      country: signUpData.country,
      illness_type: signUpData.illnessType
    });
    
    if (error) {
      if (error.message.includes('already registered')) {
        toast({
          title: "Account Already Exists",
          description: "This email is already registered. Please sign in instead.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Check Your Email!",
        description: "We've sent you a verification link. Please check your email and click the link to verify your account before signing in."
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <Heart className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to CareVital</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Your personal health management companion</p>
        </div>

        <Card className="p-6 shadow-xl">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={signInData.email}
                      onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      value={signInData.password}
                      onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        className="pl-10"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      value={signUpData.lastName}
                      onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => setSignUpData({...signUpData, gender: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((gender) => (
                        <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                    <Select onValueChange={(value) => setSignUpData({...signUpData, country: value})} required>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryOptions.map((country) => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="illnessType">Health Condition to Manage</Label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                    <Select onValueChange={(value) => setSignUpData({...signUpData, illnessType: value})} required>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select condition to manage" />
                      </SelectTrigger>
                      <SelectContent>
                        {illnessOptions.map((illness) => (
                          <SelectItem key={illness} value={illness}>{illness}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            <Link to="/" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
              ← Back to Home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
