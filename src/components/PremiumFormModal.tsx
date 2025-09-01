
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Crown, User, Mail, Phone, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PremiumFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PremiumFormModal: React.FC<PremiumFormModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    surname: '',
    country: '',
    email: user?.email || '',
    phoneNumber: ''
  });

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access premium features.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.fullName || !formData.surname || !formData.country || 
        !formData.email || !formData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Submit the form data to Supabase
      const { error: formError } = await supabase
        .from('premium_form_submissions')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          surname: formData.surname,
          country: formData.country,
          email: formData.email,
          phone_number: formData.phoneNumber
        });

      if (formError) {
        throw formError;
      }

      // Create premium subscription (free until November 30th)
      const { error: subscriptionError } = await supabase
        .rpc('renew_premium_subscription', { p_user_id: user.id });

      if (subscriptionError) {
        throw subscriptionError;
      }

      toast({
        title: "Welcome to Premium!",
        description: "Your premium access is active. Enjoy all premium features free until November 30th!"
      });

      onSuccess();
      onClose();
      
      // Refresh the page to update premium status
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Premium form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-600" />
            Activate Premium Access
          </DialogTitle>
        </DialogHeader>
        
        <Card className="p-6">
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-700">
              <Crown className="h-4 w-4" />
              <span className="text-sm font-medium">FREE until November 30th!</span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Complete the form below to get instant access to all premium features
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  className="pl-10"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="surname">Surname</Label>
              <Input
                id="surname"
                placeholder="Enter your surname"
                value={formData.surname}
                onChange={(e) => handleInputChange('surname', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="country">Country</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
                <Select onValueChange={(value) => handleInputChange('country', value)} required>
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
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
                {loading ? 'Activating Premium...' : 'Activate Premium - FREE'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="w-full">
                Cancel
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              After November 30th, premium access will require payment. You'll be notified before any charges.
            </p>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumFormModal;
