
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Trash2, Package, Clock } from 'lucide-react';

const ShoppingList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    medicationName: '',
    pharmacyName: '',
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    country: ''
  });

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const fetchItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('shopping_lists')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching shopping list:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      const referenceNumber = `MED-${Date.now().toString().slice(-6)}`;

      const { error } = await supabase
        .from('shopping_lists')
        .insert({
          user_id: user.id,
          medication_name: formData.medicationName,
          pharmacy_name: formData.pharmacyName,
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email_address: formData.emailAddress,
          country: formData.country,
          reference_number: referenceNumber
        });

      if (error) throw error;

      toast({
        title: "Medication Added Successfully!",
        description: `${formData.medicationName} has been added to your shopping list. Reference: ${referenceNumber}`
      });

      // Reset form
      setFormData({
        medicationName: '',
        pharmacyName: '',
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        country: ''
      });

      fetchItems();
    } catch (error) {
      console.error('Error adding medication:', error);
      toast({
        title: "Error",
        description: "Failed to add medication. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const clearAllItems = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('shopping_lists')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
      toast({
        title: "Shopping List Cleared",
        description: "All items have been cleared successfully.",
      });
    } catch (error) {
      console.error('Error clearing shopping list:', error);
      toast({
        title: "Error",
        description: "Failed to clear shopping list. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping List</h2>
        {items.length > 0 && (
          <Button
            onClick={clearAllItems}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Add Medication</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="medicationName">Medication Name *</Label>
              <Input
                id="medicationName"
                value={formData.medicationName}
                onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="pharmacyName">Pharmacy Name</Label>
              <Input
                id="pharmacyName"
                value={formData.pharmacyName}
                onChange={(e) => setFormData({ ...formData, pharmacyName: e.target.value })}
              />
            </div>
          </div>

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

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? 'Adding Medication...' : 'Add to Shopping List'}
          </Button>
        </form>
      </Card>

      {/* Shopping List Items */}
      {items.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Shopping List</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <h4 className="font-semibold text-sm">{item.medication_name}</h4>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                      Submitted
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    {item.pharmacy_name && (
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-3 w-3" />
                        <span>{item.pharmacy_name}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {item.reference_number && (
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-xs font-mono text-gray-700">
                        Ref: {item.reference_number}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ShoppingList;
