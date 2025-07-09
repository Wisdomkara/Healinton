
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Hospital, Plus, Edit, Trash2 } from 'lucide-react';

const HospitalForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    hospital_name: '',
    email: '',
    phone: '',
    address: '',
    is_default: false
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
      if (editingId) {
        const { error } = await supabase
          .from('user_hospitals')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;

        toast({
          title: 'Hospital Updated',
          description: 'Hospital information has been updated successfully.',
        });
      } else {
        const { error } = await supabase
          .from('user_hospitals')
          .insert({
            ...formData,
            user_id: user.id
          });

        if (error) throw error;

        toast({
          title: 'Hospital Added',
          description: 'Hospital information has been saved successfully.',
        });
      }

      resetForm();
      fetchHospitals();
    } catch (error) {
      console.error('Error saving hospital:', error);
      toast({
        title: 'Error',
        description: 'Failed to save hospital information.',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (hospital: any) => {
    setFormData({
      hospital_name: hospital.hospital_name || '',
      email: hospital.email || '',
      phone: hospital.phone || '',
      address: hospital.address || '',
      is_default: hospital.is_default || false
    });
    setEditingId(hospital.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hospital?')) return;

    try {
      const { error } = await supabase
        .from('user_hospitals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Hospital Deleted',
        description: 'Hospital information has been deleted.',
      });

      fetchHospitals();
    } catch (error) {
      console.error('Error deleting hospital:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete hospital.',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      hospital_name: '',
      email: '',
      phone: '',
      address: '',
      is_default: false
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Hospital className="h-6 w-6 mr-2 text-blue-600" />
          My Hospitals
        </h2>
        
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hospital
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Hospital' : 'Add New Hospital'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hospital_name">Hospital Name *</Label>
                <Input
                  id="hospital_name"
                  value={formData.hospital_name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    hospital_name: e.target.value
                  }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  address: e.target.value
                }))}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_default"
                checked={formData.is_default}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  is_default: e.target.checked
                }))}
                className="rounded"
              />
              <Label htmlFor="is_default">Make this my default hospital</Label>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingId ? 'Update Hospital' : 'Save Hospital'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Hospitals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{hospital.hospital_name}</h3>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(hospital)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(hospital.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {hospital.is_default && (
              <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mb-2">
                Default Hospital
              </div>
            )}
            
            <div className="space-y-2 text-sm">
              {hospital.phone && (
                <p className="text-gray-600 dark:text-gray-300">
                  📞 {hospital.phone}
                </p>
              )}
              {hospital.email && (
                <p className="text-gray-600 dark:text-gray-300">
                  ✉️ {hospital.email}
                </p>
              )}
              {hospital.address && (
                <p className="text-gray-600 dark:text-gray-300">
                  📍 {hospital.address}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {hospitals.length === 0 && !isAdding && (
        <div className="text-center py-12">
          <Hospital className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">No hospitals added yet</p>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700"
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
