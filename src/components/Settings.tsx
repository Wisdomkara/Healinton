
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, User, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    country: '',
    illness_type: '',
    phone_number: '',
    delivery_address: ''
  });
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    push_notifications: false,
    weekly_reports: true,
    medication_reminders: true,
    dark_mode: false
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!error && data) {
      setProfile({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
        gender: data.gender || '',
        country: data.country || '',
        illness_type: data.illness_type || '',
        phone_number: data.phone_number || '',
        delivery_address: data.delivery_address || ''
      });
    }
  };

  const handleProfileUpdate = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    }
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>

      {/* Profile Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-5 w-5 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={profile.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={profile.last_name}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={profile.gender} onValueChange={(value) => handleInputChange('gender', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={profile.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
              placeholder="+1 234 567 8900"
              className="mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Input
              id="deliveryAddress"
              value={profile.delivery_address}
              onChange={(e) => handleInputChange('delivery_address', e.target.value)}
              placeholder="Enter your complete delivery address"
              className="mt-1"
            />
          </div>
        </div>
        
        <Button onClick={handleProfileUpdate} disabled={loading} className="mt-6">
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <Switch
              checked={preferences.email_notifications}
              onCheckedChange={(value) => handlePreferenceChange('email_notifications', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Medication Reminders</Label>
              <p className="text-sm text-gray-500">Get reminded about medications</p>
            </div>
            <Switch
              checked={preferences.medication_reminders}
              onCheckedChange={(value) => handlePreferenceChange('medication_reminders', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Weekly Health Reports</Label>
              <p className="text-sm text-gray-500">Receive weekly health summaries</p>
            </div>
            <Switch
              checked={preferences.weekly_reports}
              onCheckedChange={(value) => handlePreferenceChange('weekly_reports', value)}
            />
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-5 w-5 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Privacy & Security</h3>
        </div>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            Download My Data
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="h-5 w-5 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>Dark Mode</Label>
            <p className="text-sm text-gray-500">Switch to dark theme</p>
          </div>
          <Switch
            checked={preferences.dark_mode}
            onCheckedChange={(value) => handlePreferenceChange('dark_mode', value)}
          />
        </div>
      </Card>
    </div>
  );
};

export default Settings;
