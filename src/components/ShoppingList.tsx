
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
import { Trash2, Plus } from 'lucide-react';

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

interface ShoppingItem {
  id: string;
  medication_name: string;
  pharmacy_name: string;
  is_purchased: boolean;
}

const ShoppingList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);
  const [pharmacies, setPharmacies] = useState<Hospital[]>([]);
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    medicationName: '',
    pharmacyName: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
    if (user) {
      fetchShoppingItems();
    }
  }, [user]);

  useEffect(() => {
    if (formData.country) {
      fetchPharmacies(formData.country);
    } else {
      setPharmacies([]);
    }
  }, [formData.country]);

  const fetchCountries = async () => {
    try {
      // Fallback to sample countries since new tables might not be recognized yet
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
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchPharmacies = async (countryId: string) => {
    try {
      // Fallback to sample pharmacies
      setPharmacies([
        { id: '1', name: 'City Pharmacy', address: '123 Main St', city: 'Downtown', phone: '+1-555-0123', email: 'info@citypharmacy.com', type: 'pharmacy' },
        { id: '2', name: 'Health Plus Pharmacy', address: '456 Health Ave', city: 'Midtown', phone: '+1-555-0456', email: 'contact@healthplus.com', type: 'pharmacy' }
      ]);
    } catch (error) {
      console.error('Error fetching pharmacies:', error);
    }
  };

  const fetchShoppingItems = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setItems(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('shopping_lists')
      .insert({
        user_id: user.id,
        medication_name: formData.medicationName,
        pharmacy_name: formData.pharmacyName
      })
      .select('*')
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add medication to shopping list",
        variant: "destructive"
      });
    } else {
      const referenceNumber = `SL${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      toast({
        title: "Medication Added Successfully!",
        description: `Your reference number is: ${referenceNumber}. Please save this number for your pharmacy visit.`,
        duration: 10000
      });
      setFormData({ 
        fullName: '', 
        phoneNumber: '', 
        emailAddress: '', 
        country: '', 
        medicationName: '', 
        pharmacyName: '' 
      });
      fetchShoppingItems();
    }
    setLoading(false);
  };

  const togglePurchased = async (itemId: string, isPurchased: boolean) => {
    const { error } = await supabase
      .from('shopping_lists')
      .update({ is_purchased: !isPurchased })
      .eq('id', itemId);

    if (!error) {
      fetchShoppingItems();
    }
  };

  const deleteItem = async (itemId: string) => {
    const { error } = await supabase
      .from('shopping_lists')
      .delete()
      .eq('id', itemId);

    if (!error) {
      fetchShoppingItems();
      toast({
        title: "Item Deleted",
        description: "Medication removed from shopping list"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Add Medication to Shopping List</h3>
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
            <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value, pharmacyName: '' })}>
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
            <Label htmlFor="medication">Medication Name</Label>
            <Input
              id="medication"
              value={formData.medicationName}
              onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
              placeholder="Enter medication name"
              required
            />
          </div>

          <div>
            <Label htmlFor="pharmacy">Select Pharmacy</Label>
            <Select 
              value={formData.pharmacyName} 
              onValueChange={(value) => setFormData({ ...formData, pharmacyName: value })}
              disabled={!formData.country}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.country ? "Choose a pharmacy" : "Select country first"} />
              </SelectTrigger>
              <SelectContent>
                {pharmacies.map(pharmacy => (
                  <SelectItem key={pharmacy.id} value={pharmacy.name}>
                    {pharmacy.name} - {pharmacy.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {loading ? 'Adding...' : 'Add to Shopping List'}
          </Button>
        </form>
      </Card>

      {items.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Shopping List</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={item.is_purchased}
                    onCheckedChange={() => togglePurchased(item.id, item.is_purchased)}
                  />
                  <div>
                    <p className={`font-medium ${item.is_purchased ? 'line-through text-gray-500' : ''}`}>
                      {item.medication_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.pharmacy_name}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ShoppingList;
