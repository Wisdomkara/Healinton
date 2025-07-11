
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
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalEmail: '',
    appointmentDate: '',
    reason: '',
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [isManualHospital, setIsManualHospital] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

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
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email_address: formData.emailAddress,
          country: formData.country,
          address: formData.address,
          reference_number: referenceNumber
        });

      if (error) throw error;

      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment has been scheduled. Reference: ${referenceNumber}. Hospital will be notified via email.`
      });

      // Reset form
      setFormData({
        hospitalName: '',
        hospitalEmail: '',
        appointmentDate: '',
        reason: '',
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        country: '',
        address: ''
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
        </div>

        <div>
          <Label htmlFor="address">Home Address *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter your full address"
            required
          />
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

        <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
          {loading ? 'Booking Appointment...' : 'Book Appointment'}
        </Button>
      </form>
    </Card>
  );
};

export default EnhancedHospitalBooking;
