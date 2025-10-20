
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useEnsureProfile } from '@/hooks/useEnsureProfile';

const hospitals = [
  'General Hospital Lagos',
  'University College Hospital Ibadan',
  'Ahmadu Bello University Teaching Hospital',
  'Federal Medical Centre Abuja',
  'Lagos State University Teaching Hospital',
  'National Hospital Abuja',
  'Obafemi Awolowo University Teaching Hospital',
  'University of Nigeria Teaching Hospital',
  'Federal Medical Centre Owerri',
  'Specialist Hospital Sokoto',
  'Lagos University Teaching Hospital',
  'University of Benin Teaching Hospital',
  'Jos University Teaching Hospital',
  'University of Calabar Teaching Hospital',
  'University of Port Harcourt Teaching Hospital',
  'Usmanu Danfodiyo University Teaching Hospital',
  'Lagos State University Teaching Hospital Ikeja',
  'Niger Delta University Teaching Hospital',
  'Lagoon Hospital',
  'St. Nicholas Hospital',
  'Primus International Super Speciality Hospital',
  'Reddington Hospital',
  'Eko Hospital',
  'First Consultants Medical Centre',
  'Nisa Premier Hospital',
  'Cedarcrest Hospitals',
  'Evercare Hospital',
  'The Limi Hospital'
];


const HospitalBooking = () => {
  useEnsureProfile();
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    hospitalName: '',
    appointmentDate: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Fetch user profile to ensure it exists
  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, phone_number, email, country, delivery_address')
        .eq('id', user.id)
        .single();

      if (error) {
        toast({
          title: "Profile Error",
          description: "Please complete your profile before booking an appointment.",
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
        setProfileLoaded(true);
      }
    };

    checkProfile();
  }, [user, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profileLoaded) {
      toast({
        title: "Profile Required",
        description: "Please complete your profile before booking.",
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
          appointment_date: formData.appointmentDate,
          reason: formData.reason,
          reference_number: referenceNumber
        });

      if (error) throw error;

      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment at ${formData.hospitalName} has been scheduled. Reference: ${referenceNumber}.`
      });

      setFormData({
        hospitalName: '',
        appointmentDate: '',
        reason: ''
      });

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
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Book Hospital Appointment</h3>
      {!profileLoaded && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          Please ensure your profile is complete with name, phone number, email, and address before booking.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="hospital">Select Hospital *</Label>
          <Select value={formData.hospitalName} onValueChange={(value) => setFormData({ ...formData, hospitalName: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a hospital" />
            </SelectTrigger>
            <SelectContent>
              {hospitals.map(hospital => (
                <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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

        <Button type="submit" disabled={loading || !profileLoaded} className="w-full bg-green-600 hover:bg-green-700">
          {loading ? 'Booking Appointment...' : 'Book Appointment'}
        </Button>
      </form>
    </Card>
  );
};

export default HospitalBooking;
