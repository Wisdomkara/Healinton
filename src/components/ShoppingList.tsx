
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Trash2, Phone, Mail, MapPin, User, Package } from 'lucide-react';

const ShoppingList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    medication_name: '',
    full_name: '',
    phone_number: '',
    email_address: '',
    pharmacy_name: '',
    country: ''
  });

  useEffect(() => {
    if (user) {
      fetchMedications();
    }
  }, [user]);

  const fetchMedications = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('shopping_lists')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedications(data || []);
    } catch (error) {
      console.error('Error fetching medications:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch medications',
        variant: 'destructive'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please log in to add medications',
        variant: 'destructive'
      });
      return;
    }

    if (!formData.medication_name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a medication name',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const referenceNumber = `MED-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const { data, error } = await supabase
        .from('shopping_lists')
        .insert([{
          ...formData,
          user_id: user.id,
          reference_number: referenceNumber,
          is_purchased: false
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Medication added successfully! Reference: ${referenceNumber}`,
      });

      // Reset form
      setFormData({
        medication_name: '',
        full_name: '',
        phone_number: '',
        email_address: '',
        pharmacy_name: '',
        country: ''
      });

      // Refresh list
      await fetchMedications();
    } catch (error) {
      console.error('Error adding medication:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add medication to shopping list',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePurchased = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('shopping_lists')
        .update({ is_purchased: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      await fetchMedications();
      toast({
        title: 'Success',
        description: 'Medication status updated',
      });
    } catch (error) {
      console.error('Error updating medication:', error);
      toast({
        title: 'Error',
        description: 'Failed to update medication status',
        variant: 'destructive'
      });
    }
  };

  const deleteMedication = async (id) => {
    try {
      const { error } = await supabase
        .from('shopping_lists')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchMedications();
      toast({
        title: 'Success',
        description: 'Medication removed from list',
      });
    } catch (error) {
      console.error('Error deleting medication:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove medication',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Medication Form */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold">Add New Medication</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="medication_name">Medication Name *</Label>
              <Input
                id="medication_name"
                value={formData.medication_name}
                onChange={(e) => setFormData({...formData, medication_name: e.target.value})}
                placeholder="Enter medication name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                placeholder="Your phone number"
              />
            </div>
            
            <div>
              <Label htmlFor="email_address">Email Address</Label>
              <Input
                id="email_address"
                type="email"
                value={formData.email_address}
                onChange={(e) => setFormData({...formData, email_address: e.target.value})}
                placeholder="Your email address"
              />
            </div>
            
            <div>
              <Label htmlFor="pharmacy_name">Pharmacy Name</Label>
              <Input
                id="pharmacy_name"
                value={formData.pharmacy_name}
                onChange={(e) => setFormData({...formData, pharmacy_name: e.target.value})}
                placeholder="Preferred pharmacy"
              />
            </div>
            
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                placeholder="Your country"
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Adding...' : 'Add to Shopping List'}
          </Button>
        </form>
      </Card>

      {/* Medications List */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Your Medications</h3>
        </div>
        
        {medications.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No medications in your shopping list</p>
        ) : (
          <div className="space-y-4">
            {medications.map((medication) => (
              <div key={medication.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-gray-600" />
                      <h4 className="font-medium text-lg">{medication.medication_name}</h4>
                      <Badge variant={medication.is_purchased ? "default" : "secondary"}>
                        {medication.is_purchased ? 'Purchased' : 'Pending'}
                      </Badge>
                    </div>
                    
                    {/* Enhanced Reference Number Display */}
                    {medication.reference_number && (
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-3 rounded-lg mb-3 border-l-4 border-green-500">
                        <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Reference Number:</p>
                        <p className="text-lg font-bold text-green-800 dark:text-green-200 tracking-wider">{medication.reference_number}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-300">
                      {medication.full_name && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {medication.full_name}
                        </div>
                      )}
                      {medication.phone_number && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {medication.phone_number}
                        </div>
                      )}
                      {medication.email_address && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {medication.email_address}
                        </div>
                      )}
                      {medication.pharmacy_name && (
                        <div className="flex items-center gap-1">
                          <ShoppingCart className="h-3 w-3" />
                          {medication.pharmacy_name}
                        </div>
                      )}
                      {medication.country && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {medication.country}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant={medication.is_purchased ? "outline" : "default"}
                      onClick={() => togglePurchased(medication.id, medication.is_purchased)}
                    >
                      {medication.is_purchased ? 'Mark Pending' : 'Mark Purchased'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMedication(medication.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShoppingList;
