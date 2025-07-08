
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

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
  'Specialist Hospital Sokoto'
];

const HospitalBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    hospitalName: '',
    appointmentDate: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('hospital_bookings')
      .insert({
        user_id: user.id,
        hospital_name: formData.hospitalName,
        appointment_date: formData.appointmentDate,
        reason: formData.reason
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Appointment Booked",
        description: `Your appointment at ${formData.hospitalName} has been scheduled. You will receive a confirmation email shortly.`
      });
      setFormData({ hospitalName: '', appointmentDate: '', reason: '' });
    }
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Book Hospital Checkup</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="hospital">Select Hospital</Label>
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
          <Label htmlFor="date">Preferred Date & Time</Label>
          <Input
            id="date"
            type="datetime-local"
            value={formData.appointmentDate}
            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="reason">Reason for Visit</Label>
          <Textarea
            id="reason"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Describe the reason for your visit..."
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Booking...' : 'Book Appointment'}
        </Button>
      </form>
    </Card>
  );
};

export default HospitalBooking;
