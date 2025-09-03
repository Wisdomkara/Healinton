
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Morocco', 
  'Tanzania', 'Uganda', 'Ethiopia', 'Cameroon', 'Algeria', 'Angola',
  'Burkina Faso', 'Burundi', 'Botswana', 'Central African Republic',
  'Chad', 'Congo', 'Democratic Republic of Congo', 'Djibouti',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Gabon', 'Gambia',
  'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Lesotho', 'Liberia',
  'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius',
  'Mozambique', 'Namibia', 'Niger', 'Rwanda', 'Sao Tome and Principe',
  'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Sudan',
  'Sudan', 'Togo', 'Tunisia', 'Zambia', 'Zimbabwe', 'Other'
];

const illnesses = [
  { value: 'mild_hypertension', label: 'Mild Hypertension (High Blood Pressure)' },
  { value: 'mild_diabetes', label: 'Mild Type 2 Diabetes / Pre-diabetes' },
  { value: 'hypertension', label: 'Hypertension (High Blood Pressure)' },
  { value: 'diabetes', label: 'Diabetes (Type 1 & 2)' },
  { value: 'heart_disease', label: 'Heart Disease' },
  { value: 'high_cholesterol', label: 'High Cholesterol (Mild)' },
  { value: 'obesity', label: 'Obesity & Weight Management' },
  { value: 'asthma', label: 'Asthma & Respiratory Issues' },
  { value: 'arthritis', label: 'Arthritis & Joint Pain' },
  { value: 'kidney_disease', label: 'Kidney Disease' },
  { value: 'liver_disease', label: 'Liver Disease' },
  { value: 'mild_fatty_liver', label: 'Mild Fatty Liver' },
  { value: 'thyroid_disorders', label: 'Thyroid Disorders' },
  { value: 'anxiety_depression', label: 'Anxiety & Depression' },
  { value: 'chronic_pain', label: 'Chronic Pain Management' },
  { value: 'acid_reflux', label: 'Acid Reflux / Mild Gastritis' },
  { value: 'constipation', label: 'Constipation' },
  { value: 'mild_anemia', label: 'Mild Anemia (Iron Deficiency)' },
  { value: 'skin_issues', label: 'Skin Issues (Acne, Eczema)' },
  { value: 'ibs', label: 'Irritable Bowel Syndrome (IBS - Mild)' },
  { value: 'low_immunity', label: 'Low Immunity / Frequent Colds' },
  { value: 'insomnia', label: 'Insomnia & Sleep Disorders' },
  { value: 'migraine', label: 'Migraine & Headaches' },
  { value: 'osteoporosis', label: 'Osteoporosis & Bone Health' },
  { value: 'gout', label: 'Gout & Uric Acid' }
];

const Auth = () => {
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gender: '',
    country: '',
    illnessType: ''
  });

  // Handle email verification redirect
  useEffect(() => {
    const emailVerified = searchParams.get('type') === 'signup';
    const accessToken = searchParams.get('access_token');
    
    if (emailVerified && accessToken) {
      toast({
        title: "Email Verified Successfully!",
        description: "Your account has been verified. You can now sign in to your account.",
      });
    }
  }, [searchParams, navigate, toast]);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login Successful",
            description: "Welcome back to Healinton!"
          });
          navigate('/dashboard');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords don't match",
            variant: "destructive"
          });
          return;
        }

        if (!formData.firstName || !formData.lastName || !formData.gender || !formData.country || !formData.illnessType) {
          toast({
            title: "Error",
            description: "Please fill in all required fields",
            variant: "destructive"
          });
          return;
        }

        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          gender: formData.gender,
          country: formData.country,
          illness_type: formData.illnessType
        };

        const { error } = await signUp(formData.email, formData.password, userData);
        if (error) {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account Created Successfully!",
            description: "Please check your email to verify your account. After verification, you'll be redirected to your dashboard."
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const isVerificationSuccess = searchParams.get('type') === 'signup' && searchParams.get('access_token');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-green-950 dark:via-gray-900 dark:to-green-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 w-24 h-24 bg-green-300/20 rounded-full blur-sm"></div>
        <div className="absolute top-32 right-24 w-32 h-32 bg-green-400/15 rounded-full blur-md"></div>
        <div className="absolute bottom-32 left-24 w-28 h-28 bg-green-500/25 rounded-full blur-sm"></div>
        <div className="absolute bottom-48 right-20 w-36 h-36 bg-green-300/20 rounded-full blur-md"></div>
        <div className="absolute top-1/2 left-8 w-20 h-20 bg-green-600/25 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 right-8 w-44 h-44 bg-green-400/15 rounded-full blur-lg"></div>
      </div>
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40"></div>
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-3 rounded-xl shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Healinton
            </span>
          </Link>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
            {isVerificationSuccess 
              ? 'Email verified successfully! Redirecting to dashboard...' 
              : isLogin 
                ? 'Welcome back to your health journey' 
                : 'Start your personalized health journey'
            }
          </p>
        </div>

        {isVerificationSuccess ? (
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur shadow-xl border-2 border-green-200 dark:border-green-800">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Email Verified Successfully!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your account has been verified. You can now sign in to your account.
              </p>
              <Button 
                onClick={() => {setIsLogin(true); window.location.reload();}}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                Sign In Now
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur shadow-xl border-2 border-green-200 dark:border-green-800">
            <div className="p-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                  {isLogin 
                    ? 'Access your personalized health dashboard' 
                    : 'Join thousands managing their health with Healinton'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-900 dark:text-white font-medium">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-900 dark:text-white font-medium">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gender" className="text-gray-900 dark:text-white font-medium">Gender *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                        <SelectTrigger className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500 bg-white dark:bg-gray-800 z-50">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-green-200 shadow-xl z-50">
                          <SelectItem value="male" className="hover:bg-green-50 dark:hover:bg-green-900/20">Male</SelectItem>
                          <SelectItem value="female" className="hover:bg-green-50 dark:hover:bg-green-900/20">Female</SelectItem>
                          <SelectItem value="other" className="hover:bg-green-50 dark:hover:bg-green-900/20">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="country" className="text-gray-900 dark:text-white font-medium">Country *</Label>
                      <Select value={formData.country} onValueChange={(value) => handleSelectChange('country', value)}>
                        <SelectTrigger className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500 bg-white dark:bg-gray-800 z-40">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-green-200 shadow-xl max-h-60 overflow-y-auto z-40">
                          {countries.map(country => (
                            <SelectItem key={country} value={country} className="hover:bg-green-50 dark:hover:bg-green-900/20">
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="illness" className="text-gray-900 dark:text-white font-medium">Health Condition to Manage *</Label>
                      <Select value={formData.illnessType} onValueChange={(value) => handleSelectChange('illnessType', value)}>
                        <SelectTrigger className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500 bg-white dark:bg-gray-800 z-30">
                          <SelectValue placeholder="Select condition to manage" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-green-200 shadow-xl max-h-60 overflow-y-auto z-30">
                          {illnesses.map(illness => (
                            <SelectItem key={illness.value} value={illness.value} className="hover:bg-green-50 dark:hover:bg-green-900/20">
                              {illness.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email" className="text-gray-900 dark:text-white font-medium">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-900 dark:text-white font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500 pr-10"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-white font-medium">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="mt-1 border-green-200 focus:border-green-500 focus:ring-green-500 pr-10"
                        placeholder="••••••••"
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors underline"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : 'Already have an account? Sign in'
                  }
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
