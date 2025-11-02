import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const countryHospitals = {
  Nigeria: [
    'Lagos University Teaching Hospital',
    'University College Hospital Ibadan',
    'Ahmadu Bello University Teaching Hospital',
    'Federal Medical Centre Abuja',
    'National Hospital Abuja'
  ],
  USA: [
    'Mayo Clinic Rochester',
    'Cleveland Clinic',
    'Johns Hopkins Hospital',
    'Massachusetts General Hospital',
    'UCLA Medical Center'
  ],
  UK: [
    'Royal London Hospital',
    'St. Bartholomew\'s Hospital',
    'Guy\'s Hospital',
    'King\'s College Hospital',
    'Imperial College Healthcare'
  ],
  Canada: [
    'Toronto General Hospital',
    'Montreal General Hospital',
    'Vancouver General Hospital',
    'Ottawa Hospital',
    'Calgary Medical Center'
  ]
};

const EnhancedHospitalBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalEmail: '',
    appointmentDate: '',
    reason: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [isManualHospital, setIsManualHospital] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, phone_number, email, country, delivery_address')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Profile Error",
          description: "Please complete your profile before booking.",
          variant: "destructive"
        });
        return;
      }

      if (!data?.first_name || !data?.phone_number || !data?.email) {
        toast({
          title: "Incomplete Profile",
          description: "Please complete your profile information before booking.",
          variant: "destructive"
        });
      } else {
        setProfileData(data);
        if (data.country) {
          setFormData(prev => ({ ...prev, country: data.country }));
        }
      }
    };

    fetchProfile();
  }, [user, toast]);

  const sendHospitalNotification = async (referenceNumber: string) => {
    if (!profileData) return;

    try {
      const { data, error } = await supabase.functions.invoke('send-hospital-notification', {
        body: {
          hospitalEmail: formData.hospitalEmail,
          hospitalName: formData.hospitalName,
          patientName: `${profileData.first_name} ${profileData.last_name}`,
          patientEmail: profileData.email,
          patientPhone: profileData.phone_number,
          appointmentDate: formData.appointmentDate,
          reason: formData.reason,
          referenceNumber: referenceNumber,
          patientAddress: profileData.delivery_address || '',
          country: formData.country
        }
      });

      if (error) {
        console.error('Error sending hospital notification:', error);
        toast({
          title: "Email Warning",
          description: "Appointment booked successfully, but hospital notification email failed to send.",
          variant: "destructive"
        });
      } else {
        console.log('Hospital notification sent successfully:', data);
      }
    } catch (error) {
      console.error('Error calling email function:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profileData) {
      toast({
        title: "Profile Required",
        description: "Please complete your profile before booking.",
        variant: "destructive"
      });
      return;
    }

    if (isManualHospital && !formData.hospitalEmail) {
      toast({
        title: "Hospital Email Required",
        description: "Please provide the hospital email address for manual entries.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const referenceNumber = `APT-${Date.now().toString().slice(-6)}`;

      const { error } = await supabase
        .from('hospital_bookings')
        .insert({
          user_id: user.id,
          hospital_name: formData.hospitalName,
          hospital_email: formData.hospitalEmail,
          appointment_date: formData.appointmentDate,
          reason: formData.reason,
          country: formData.country,
          reference_number: referenceNumber
        });

      if (error) throw error;

      if (formData.hospitalEmail) {
        await sendHospitalNotification(referenceNumber);
      }

      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment has been scheduled. Reference: ${referenceNumber}. ${formData.hospitalEmail ? 'Hospital has been notified via email.' : ''}`
      });

      setFormData({
        hospitalName: '',
        hospitalEmail: '',
        appointmentDate: '',
        reason: '',
        country: profileData.country || ''
      });
      setIsManualHospital(false);

    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const availableHospitals = formData.country ? countryHospitals[formData.country as keyof typeof countryHospitals] || [] : [];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Book Hospital Appointment</h3>
      {!profileData && (
        <Alert className="mb-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            Please ensure your profile is complete with name, phone number, email, and address before booking.{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-yellow-800 dark:text-yellow-200 underline font-semibold"
              onClick={() => navigate('/dashboard')}
            >
              Complete your profile here
            </Button>
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="country">Country *</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your country" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(countryHospitals).map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <Label>Hospital Selection</Label>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="preset"
                name="hospitalType"
                checked={!isManualHospital}
                onChange={() => setIsManualHospital(false)}
              />
              <label htmlFor="preset" className="text-sm">Select from list</label>
              
              <input
                type="radio"
                id="manual"
                name="hospitalType"
                checked={isManualHospital}
                onChange={() => setIsManualHospital(true)}
              />
              <label htmlFor="manual" className="text-sm">Add manually</label>
            </div>
          </div>

          {!isManualHospital ? (
            <div>
              <Label htmlFor="hospital">Select Hospital *</Label>
              <Select value={formData.hospitalName} onValueChange={(value) => setFormData({ ...formData, hospitalName: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a hospital" />
                </SelectTrigger>
                <SelectContent>
                  {availableHospitals.map(hospital => (
                    <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="manualHospital">Hospital Name *</Label>
                <Input
                  id="manualHospital"
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                  placeholder="Enter hospital name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="hospitalEmail">Hospital Email *</Label>
                <Input
                  id="hospitalEmail"
                  type="email"
                  value={formData.hospitalEmail}
                  onChange={(e) => setFormData({ ...formData, hospitalEmail: e.target.value })}
                  placeholder="Enter hospital email"
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="date">Preferred Date & Time *</Label>
          <Input
            id="date"
            type="datetime-local"
            value={formData.appointmentDate}
            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="reason">Reason for Visit *</Label>
          <Textarea
            id="reason"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Describe the reason for your visit..."
            required
            rows={4}
          />
        </div>

        <Button type="submit" disabled={loading || !profileData} className="w-full bg-green-600 hover:bg-green-700">
          {loading ? 'Booking Appointment...' : 'Book Appointment'}
        </Button>
      </form>
    </Card>
  );
};

export default EnhancedHospitalBooking;
