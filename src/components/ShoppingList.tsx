
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const medicationsByIllness = {
  hypertension: ['Lisinopril', 'Amlodipine', 'Metoprolol', 'Hydrochlorothiazide'],
  diabetes: ['Metformin', 'Insulin', 'Glimepiride', 'Sitagliptin'],
  heart_disease: ['Aspirin', 'Atorvastatin', 'Clopidogrel', 'Carvedilol'],
  obesity: ['Orlistat', 'Liraglutide', 'Phentermine', 'Naltrexone'],
  high_cholesterol: ['Simvastatin', 'Rosuvastatin', 'Ezetimibe', 'Fenofibrate']
};

const pharmacies = [
  'MedPlus Pharmacy',
  'HealthCare Pharmacy',
  'Wellness Drugstore',
  'City Pharmacy',
  'Express Pharmacy'
];

const ShoppingList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({
    medicationName: '',
    pharmacyName: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    fetchShoppingList();
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('illness_type')
      .eq('id', user.id)
      .single();
    setUserProfile(data);
  };

  const fetchShoppingList = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setShoppingList(data || []);
  };

  const addToShoppingList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('shopping_lists')
      .insert({
        user_id: user.id,
        medication_name: newItem.medicationName,
        pharmacy_name: newItem.pharmacyName
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add medication",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Added to Shopping List",
        description: "Medication added successfully"
      });
      setNewItem({ medicationName: '', pharmacyName: '' });
      fetchShoppingList();
    }
    setLoading(false);
  };

  const togglePurchased = async (id: string, isPurchased: boolean) => {
    const { error } = await supabase
      .from('shopping_lists')
      .update({ is_purchased: !isPurchased })
      .eq('id', id);

    if (!error) {
      fetchShoppingList();
    }
  };

  const availableMedications = userProfile?.illness_type 
    ? medicationsByIllness[userProfile.illness_type as keyof typeof medicationsByIllness] || []
    : [];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Add Medication to Shopping List</h3>
        <form onSubmit={addToShoppingList} className="space-y-4">
          <div>
            <Label htmlFor="medication">Select Medication</Label>
            <Select value={newItem.medicationName} onValueChange={(value) => setNewItem({ ...newItem, medicationName: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose medication" />
              </SelectTrigger>
              <SelectContent>
                {availableMedications.map(med => (
                  <SelectItem key={med} value={med}>{med}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="pharmacy">Preferred Pharmacy</Label>
            <Select value={newItem.pharmacyName} onValueChange={(value) => setNewItem({ ...newItem, pharmacyName: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose pharmacy" />
              </SelectTrigger>
              <SelectContent>
                {pharmacies.map(pharmacy => (
                  <SelectItem key={pharmacy} value={pharmacy}>{pharmacy}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : 'Add to Shopping List'}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Shopping List</h3>
        <div className="space-y-3">
          {shoppingList.map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={item.is_purchased}
                  onCheckedChange={() => togglePurchased(item.id, item.is_purchased)}
                />
                <div>
                  <p className={`font-medium ${item.is_purchased ? 'line-through text-gray-500' : ''}`}>
                    {item.medication_name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.pharmacy_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {shoppingList.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No medications in your shopping list yet.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ShoppingList;
