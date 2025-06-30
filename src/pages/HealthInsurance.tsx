
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, CheckCircle, Heart, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HealthInsurance = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    medicalHistory: '',
    currentMedications: '',
    emergencyContact: '',
    emergencyPhone: '',
    preferredPlan: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted Successfully!",
        description: "Your health insurance application has been submitted. Our partner will contact you within 24-48 hours.",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        medicalHistory: '',
        currentMedications: '',
        emergencyContact: '',
        emergencyPhone: '',
        preferredPlan: ''
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const insurancePlans = [
    {
      name: 'HealthGuard Basic',
      price: '$89/month',
      features: [
        'Basic medical coverage',
        'Emergency room visits',
        'Prescription drug coverage',
        'Preventive care',
        'Telemedicine consultations'
      ]
    },
    {
      name: 'HealthGuard Premium',
      price: '$149/month',
      features: [
        'Comprehensive medical coverage',
        'Specialist consultations',
        'Surgery and hospitalization',
        'Mental health services',
        'Dental and vision coverage',
        'Maternity care'
      ]
    },
    {
      name: 'HealthGuard Family',
      price: '$299/month',
      features: [
        'Family coverage (up to 4 members)',
        'All Premium features included',
        'Pediatric care',
        'Family wellness programs',
        'Health coaching',
        'Chronic disease management'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Health Insurance Plans
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Secure your health and future with our comprehensive insurance coverage. 
            Partner with trusted providers for peace of mind.
          </p>
        </div>

        {/* Insurance Partner Info */}
        <Card className="mb-12 p-8 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border-0">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Insurance Partner: MediCare Plus
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">1-800-HEALTHCARE</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">support@medicareplus.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">Nationwide Coverage</span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Licensed and regulated insurance provider with over 20 years of experience 
              serving millions of customers nationwide.
            </p>
          </div>
        </Card>

        {/* Insurance Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {insurancePlans.map((plan, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all transform hover:scale-105">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">{plan.price}</div>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => setFormData(prev => ({ ...prev, preferredPlan: plan.name }))}
              >
                Select Plan
              </Button>
            </Card>
          ))}
        </div>

        {/* Application Form */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Health Insurance Application
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Fill out the form below to apply for health insurance coverage
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                placeholder="Please describe any pre-existing conditions, surgeries, or significant medical history"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Textarea
                id="currentMedications"
                value={formData.currentMedications}
                onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                placeholder="List any medications you are currently taking"
                rows={3}
              />
            </div>

            {/* Emergency Contact */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Preferred Plan */}
            <div>
              <Label htmlFor="preferredPlan">Preferred Insurance Plan *</Label>
              <Select value={formData.preferredPlan} onValueChange={(value) => handleInputChange('preferredPlan', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HealthGuard Basic">HealthGuard Basic - $89/month</SelectItem>
                  <SelectItem value="HealthGuard Premium">HealthGuard Premium - $149/month</SelectItem>
                  <SelectItem value="HealthGuard Family">HealthGuard Family - $299/month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 py-4 text-lg"
              disabled={loading}
            >
              {loading ? 'Submitting Application...' : 'Submit Insurance Application'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default HealthInsurance;
