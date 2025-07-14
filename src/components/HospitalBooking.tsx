
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
    reason: '',
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      // Generate reference number
      const referenceNumber = `APT-${Date.now().toString().slice(-6)}`;

      const { error } = await supabase
        .from('hospital_bookings')
        .insert({
          user_id: user.id,
          hospital_name: formData.hospitalName,
          appointment_date: formData.appointmentDate,
          reason: formData.reason,
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email_address: formData.emailAddress,
          country: formData.country,
          reference_number: referenceNumber
        });

      if (error) throw error;

      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment at ${formData.hospitalName} has been scheduled. Reference: ${referenceNumber}. You will receive a confirmation email shortly.`
      });

      // Reset form
      setFormData({
        hospitalName: '',
        appointmentDate: '',
        reason: '',
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        country: '',
        address: ''
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emailAddress">Email Address *</Label>
            <Input
              id="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Home Address *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter your full address for potential home visits"
            required
          />
        </div>

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

        <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
          {loading ? 'Booking Appointment...' : 'Book Appointment'}
        </Button>
      </form>
    </Card>
  );
};

export default HospitalBooking;
