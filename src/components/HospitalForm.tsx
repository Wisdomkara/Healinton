
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Building2, Plus, Check, X, Star } from 'lucide-react';

const HospitalForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newHospital, setNewHospital] = useState({
    hospital_name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      fetchHospitals();
    }
  }, [user]);

  const fetchHospitals = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_hospitals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching hospitals:', error);
      return;
    }

    setHospitals(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_hospitals')
        .insert({
          ...newHospital,
          user_id: user.id,
          is_default: hospitals.length === 0 // Make first hospital default
        });

      if (error) throw error;

      toast({
        title: 'Hospital Added Successfully!',
        description: 'Hospital information saved for future appointments.',
      });

      setNewHospital({
        hospital_name: '',
        email: '',
        phone: '',
        address: ''
      });
      setIsAdding(false);
      fetchHospitals();

    } catch (error) {
      console.error('Error adding hospital:', error);
      toast({
        title: 'Error',
        description: 'Failed to add hospital information.',
        variant: 'destructive'
      });
    }
  };

  const setAsDefault = async (id: string) => {
    try {
      // First, remove default from all hospitals
      await supabase
        .from('user_hospitals')
        .update({ is_default: false })
        .eq('user_id', user!.id);

      // Then set the selected hospital as default
      const { error } = await supabase
        .from('user_hospitals')
        .update({ is_default: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Default Hospital Updated',
        description: 'This hospital is now your default choice.',
      });

      fetchHospitals();
    } catch (error) {
      console.error('Error updating default hospital:', error);
      toast({
        title: 'Error',
        description: 'Failed to update default hospital.',
        variant: 'destructive'
      });
    }
  };

  const deleteHospital = async (id: string) => {
    if (!confirm('Are you sure you want to remove this hospital?')) return;

    try {
      const { error } = await supabase
        .from('user_hospitals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Hospital Removed',
        description: 'Hospital information removed successfully.',
      });

      fetchHospitals();
    } catch (error) {
      console.error('Error deleting hospital:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove hospital.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Building2 className="h-5 w-5 md:h-6 md:w-6 mr-2 text-blue-600" />
          My Hospitals
        </h2>
        
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hospital
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Add Hospital Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="hospital_name">Hospital Name *</Label>
              <Input
                id="hospital_name"
                value={newHospital.hospital_name}
                onChange={(e) => setNewHospital(prev => ({
                  ...prev,
                  hospital_name: e.target.value
                }))}
                required
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Hospital Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newHospital.email}
                  onChange={(e) => setNewHospital(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Hospital Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newHospital.phone}
                  onChange={(e) => setNewHospital(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Hospital Address</Label>
              <Input
                id="address"
                value={newHospital.address}
                onChange={(e) => setNewHospital(prev => ({
                  ...prev,
                  address: e.target.value
                }))}
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
                Add Hospital
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAdding(false)}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Hospitals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white break-words">
                  {hospital.hospital_name}
                </h3>
                {hospital.is_default && (
                  <Badge className="bg-green-600 flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>Default</span>
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                {hospital.email && (
                  <p className="text-gray-600 dark:text-gray-300 break-all">
                    <strong>Email:</strong> {hospital.email}
                  </p>
                )}
                {hospital.phone && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Phone:</strong> {hospital.phone}
                  </p>
                )}
                {hospital.address && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Address:</strong> {hospital.address}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-3">
                {!hospital.is_default && (
                  <Button
                    onClick={() => setAsDefault(hospital.id)}
                    variant="outline"
                    className="bg-green-50 text-green-600 hover:bg-green-100 flex-1"
                    size="sm"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Set as Default
                  </Button>
                )}
                <Button
                  onClick={() => deleteHospital(hospital.id)}
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex-1"
                  size="sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {hospitals.length === 0 && !isAdding && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">No hospitals saved yet</p>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:blue-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Hospital
          </Button>
        </div>
      )}
    </div>
  );
};

export default HospitalForm;
