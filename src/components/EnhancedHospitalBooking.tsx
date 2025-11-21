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

const EnhancedHospitalBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospital_id: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    user_name: '',
    phone_number: '',
    country: '',
    state: '',
  });
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [userHospitals, setUserHospitals] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else {
          setProfile(profileData);
          setFormData(prev => ({
            ...prev,
            user_name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim(),
            phone_number: profileData.phone_number || '',
            country: profileData.country || '',
          }));
        }

        // Fetch user's selected hospitals
        const { data: hospitalsData, error: hospitalsError } = await supabase
          .from('user_hospitals')
          .select('*, hospitals(*)')
          .eq('user_id', user.id);
        
        if (hospitalsError) {
          console.error('Error fetching hospitals:', hospitalsError);
        } else {
          setUserHospitals(hospitalsData || []);
          
          // If no hospitals selected, redirect to hospital selection
          if (!hospitalsData || hospitalsData.length === 0) {
            toast({
              title: 'Select a Hospital First',
              description: 'Please select a hospital before booking an appointment',
            });
            navigate('/hospitals');
          }
        }
      }
    };
    
    fetchData();
  }, [user, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) {
      toast({
        title: "Profile Required",
        description: "Please complete your profile before booking.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.hospital_id) {
      toast({
        title: "Hospital Required",
        description: "Please select a hospital",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const selectedHospital = userHospitals.find(h => h.hospital_id === formData.hospital_id)?.hospitals;
      if (!selectedHospital) throw new Error('Hospital not found');

      const referenceNumber = `APT-${Date.now().toString().slice(-6)}`;
      const appointmentDateTime = `${formData.appointmentDate}T${formData.appointmentTime}`;

      // Insert booking
      const { error } = await supabase
        .from('hospital_bookings')
        .insert({
          user_id: user.id,
          hospital_name: selectedHospital.name,
          hospital_email: selectedHospital.email,
          appointment_date: appointmentDateTime,
          reason: formData.reason,
          country: formData.country,
          state: formData.state,
          reference_number: referenceNumber,
          user_name: formData.user_name,
          phone_number: formData.phone_number,
        });

      if (error) throw error;

      // Send notification emails
      await supabase.functions.invoke('send-appointment-notification', {
        body: {
          hospital_email: selectedHospital.email,
          hospital_name: selectedHospital.name,
          user_name: formData.user_name,
          user_email: profile.email,
          user_phone: formData.phone_number,
          appointment_date: formData.appointmentDate,
          appointment_time: formData.appointmentTime,
          reason: formData.reason,
          country: formData.country,
          state: formData.state,
          reference_number: referenceNumber,
        }
      });

      toast({
        title: "Success!",
        description: `Appointment booked successfully. Reference: ${referenceNumber}`,
      });

      // Reset form
      setFormData(prev => ({
        ...prev,
        hospital_id: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
        state: '',
      }));

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

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-green-50/20 to-card dark:from-card dark:via-green-950/10 dark:to-card">
      <h3 className="text-lg font-semibold mb-4">Book Hospital Appointment</h3>
      
      {!profile?.first_name || !profile?.phone_number ? (
        <Alert className="mb-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            Please complete your profile before booking.{' '}
            <Button 
              variant="link" 
              className="p-0 h-auto text-yellow-800 dark:text-yellow-200 underline font-semibold"
              onClick={() => navigate('/profile')}
            >
              Complete profile
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="user_name">Full Name *</Label>
            <Input
              id="user_name"
              value={formData.user_name}
              onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone_number">Phone Number *</Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="hospital">Select Hospital *</Label>
          <Select value={formData.hospital_id} onValueChange={(value) => setFormData({ ...formData, hospital_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a hospital" />
            </SelectTrigger>
            <SelectContent>
              {userHospitals.map((hospitalRelation) => (
                <SelectItem key={hospitalRelation.hospital_id} value={hospitalRelation.hospital_id}>
                  {hospitalRelation.hospitals?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Appointment Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.appointmentDate}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Appointment Time *</Label>
            <Input
              id="time"
              type="time"
              value={formData.appointmentTime}
              onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
              required
            />
          </div>
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

        <Button 
          type="submit" 
          disabled={loading || !profile?.first_name || userHospitals.length === 0} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Booking Appointment...' : 'Book Appointment'}
        </Button>
      </form>
    </Card>
  );
};

export default EnhancedHospitalBooking;
