
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

interface Country {
  id: string;
  name: string;
  code: string;
}

interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  type: string;
}

const HospitalBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    hospitalName: '',
    appointmentDate: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetchHospitals(formData.country);
    } else {
      setHospitals([]);
    }
  }, [formData.country]);

  const fetchCountries = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_countries' as any);
      
      if (error) {
        console.error('Error fetching countries:', error);
        // Fallback to sample countries
        setCountries([
          { id: '1', name: 'United States', code: 'US' },
          { id: '2', name: 'United Kingdom', code: 'UK' },
          { id: '3', name: 'Canada', code: 'CA' },
          { id: '4', name: 'Australia', code: 'AU' },
          { id: '5', name: 'Germany', code: 'DE' },
          { id: '6', name: 'Nigeria', code: 'NG' },
          { id: '7', name: 'Kenya', code: 'KE' },
          { id: '8', name: 'Ghana', code: 'GH' }
        ]);
      } else {
        setCountries(data || []);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Fallback to sample countries
      setCountries([
        { id: '1', name: 'United States', code: 'US' },
        { id: '2', name: 'United Kingdom', code: 'UK' },
        { id: '3', name: 'Canada', code: 'CA' },
        { id: '4', name: 'Australia', code: 'AU' },
        { id: '5', name: 'Germany', code: 'DE' },
        { id: '6', name: 'Nigeria', code: 'NG' },
        { id: '7', name: 'Kenya', code: 'KE' },
        { id: '8', name: 'Ghana', code: 'GH' }
      ]);
    }
  };

  const fetchHospitals = async (countryId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_hospitals_by_country' as any, { country_id: countryId });

      if (error) {
        console.error('Error fetching hospitals:', error);
        // Fallback to sample hospitals
        setHospitals([
          { id: '1', name: 'General Hospital', address: '123 Main St', city: 'City Center', phone: '+1-555-0123', email: 'info@hospital.com', type: 'hospital' },
          { id: '2', name: 'Medical Center', address: '456 Health Ave', city: 'Downtown', phone: '+1-555-0456', email: 'contact@medcenter.com', type: 'hospital' }
        ]);
      } else {
        setHospitals(data || []);
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      // Fallback to sample hospitals
      setHospitals([
        { id: '1', name: 'General Hospital', address: '123 Main St', city: 'City Center', phone: '+1-555-0123', email: 'info@hospital.com', type: 'hospital' },
        { id: '2', name: 'Medical Center', address: '456 Health Ave', city: 'Downtown', phone: '+1-555-0456', email: 'contact@medcenter.com', type: 'hospital' }
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('hospital_bookings')
      .insert({
        user_id: user.id,
        hospital_name: formData.hospitalName,
        appointment_date: formData.appointmentDate,
        reason: formData.reason
      })
      .select('*')
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment",
        variant: "destructive"
      });
    } else {
      const referenceNumber = `HB${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your reference number is: ${referenceNumber}. Please save this number and present it at the hospital.`,
        duration: 10000
      });
      setFormData({ 
        fullName: '', 
        phoneNumber: '', 
        emailAddress: '', 
        country: '', 
        hospitalName: '', 
        appointmentDate: '', 
        reason: '' 
      });
    }
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Book Hospital Appointment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="Enter your phone number"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="emailAddress">Email Address</Label>
          <Input
            id="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <Label htmlFor="country">Select Country</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value, hospitalName: '' })}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="hospital">Select Hospital</Label>
          <Select 
            value={formData.hospitalName} 
            onValueChange={(value) => setFormData({ ...formData, hospitalName: value })}
            disabled={!formData.country}
          >
            <SelectTrigger>
              <SelectValue placeholder={formData.country ? "Choose a hospital" : "Select country first"} />
            </SelectTrigger>
            <SelectContent>
              {hospitals.map(hospital => (
                <SelectItem key={hospital.id} value={hospital.name}>
                  {hospital.name} - {hospital.city}
                </SelectItem>
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
