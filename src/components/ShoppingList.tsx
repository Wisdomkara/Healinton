
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Check, X } from 'lucide-react';

const ShoppingList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [medications, setMedications] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMedication, setNewMedication] = useState({
    medication_name: '',
    pharmacy_name: '',
    full_name: '',
    phone_number: '',
    email_address: '',
    country: ''
  });

  useEffect(() => {
    if (user) {
      fetchMedications();
    }
  }, [user]);

  const fetchMedications = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching medications:', error);
      return;
    }

    setMedications(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Generate reference number
      const referenceNumber = `MED-${Date.now().toString().slice(-6)}`;

      const { error } = await supabase
        .from('shopping_lists')
        .insert({
          ...newMedication,
          user_id: user.id,
          reference_number: referenceNumber,
          is_purchased: false
        });

      if (error) throw error;

      toast({
        title: 'Medication Added Successfully!',
        description: `Reference number: ${referenceNumber}`,
      });

      setNewMedication({
        medication_name: '',
        pharmacy_name: '',
        full_name: '',
        phone_number: '',
        email_address: '',
        country: ''
      });
      setIsAdding(false);
      fetchMedications();

    } catch (error) {
      console.error('Error adding medication:', error);
      toast({
        title: 'Error',
        description: 'Failed to add medication to shopping list.',
        variant: 'destructive'
      });
    }
  };

  const markAsPurchased = async (id: string) => {
    try {
      const { error } = await supabase
        .from('shopping_lists')
        .update({ is_purchased: true })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Medication Purchased',
        description: 'Medication marked as purchased successfully.',
      });

      fetchMedications();
    } catch (error) {
      console.error('Error updating medication:', error);
      toast({
        title: 'Error',
        description: 'Failed to update medication status.',
        variant: 'destructive'
      });
    }
  };

  const deleteMedication = async (id: string) => {
    if (!confirm('Are you sure you want to remove this medication?')) return;

    try {
      const { error } = await supabase
        .from('shopping_lists')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Medication Removed',
        description: 'Medication removed from shopping list.',
      });

      fetchMedications();
    } catch (error) {
      console.error('Error deleting medication:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove medication.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 mr-2 text-green-600" />
          Shopping List
        </h2>
        
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Medication</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="medication_name">Medication Name *</Label>
                <Input
                  id="medication_name"
                  value={newMedication.medication_name}
                  onChange={(e) => setNewMedication(prev => ({
                    ...prev,
                    medication_name: e.target.value
                  }))}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="pharmacy_name">Pharmacy Name</Label>
                <Input
                  id="pharmacy_name"
                  value={newMedication.pharmacy_name}
                  onChange={(e) => setNewMedication(prev => ({
                    ...prev,
                    pharmacy_name: e.target.value
                  }))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name">Your Full Name</Label>
                <Input
                  id="full_name"
                  value={newMedication.full_name}
                  onChange={(e) => setNewMedication(prev => ({
                    ...prev,
                    full_name: e.target.value
                  }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  type="tel"
                  value={newMedication.phone_number}
                  onChange={(e) => setNewMedication(prev => ({
                    ...prev,
                    phone_number: e.target.value
                  }))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email_address">Email Address</Label>
                <Input
                  id="email_address"
                  type="email"
                  value={newMedication.email_address}
                  onChange={(e) => setNewMedication(prev => ({
                    ...prev,
                    email_address: e.target.value
                  }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={newMedication.country}
                  onChange={(e) => setNewMedication(prev => ({
                    ...prev,
                    country: e.target.value
                  }))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button type="submit" className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none">
                Add to List
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

      {/* Medications List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {medications.map((medication) => (
          <Card key={medication.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white break-words">
                  {medication.medication_name}
                </h3>
                <Badge
                  variant={medication.is_purchased ? "default" : "secondary"}
                  className={medication.is_purchased ? "bg-green-600" : ""}
                >
                  {medication.is_purchased ? 'Purchased' : 'Pending'}
                </Badge>
              </div>
              
              {medication.reference_number && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Reference Number
                  </p>
                  <p className="text-xl font-bold text-blue-900 dark:text-blue-100 font-mono">
                    {medication.reference_number}
                  </p>
                </div>
              )}
              
              <div className="space-y-2 text-sm">
                {medication.pharmacy_name && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Pharmacy:</strong> {medication.pharmacy_name}
                  </p>
                )}
                {medication.full_name && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Name:</strong> {medication.full_name}
                  </p>
                )}
                {medication.phone_number && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Phone:</strong> {medication.phone_number}
                  </p>
                )}
                {medication.email_address && (
                  <p className="text-gray-600 dark:text-gray-300 break-all">
                    <strong>Email:</strong> {medication.email_address}
                  </p>
                )}
                {medication.country && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Country:</strong> {medication.country}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-3">
                {!medication.is_purchased && (
                  <Button
                    onClick={() => markAsPurchased(medication.id)}
                    className="bg-green-600 hover:bg-green-700 flex-1"
                    size="sm"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Purchased
                  </Button>
                )}
                <Button
                  onClick={() => deleteMedication(medication.id)}
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

      {medications.length === 0 && !isAdding && (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">No medications in your shopping list</p>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Medication
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
