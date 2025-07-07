
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ShoppingItem {
  id: string;
  medication_name: string;
  pharmacy_name: string;
  is_purchased: boolean;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  country: string;
  medicationName: string;
  pharmacyName: string;
}

export const useShoppingList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    medicationName: '',
    pharmacyName: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchShoppingItems = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setItems(data || []);
  };

  useEffect(() => {
    if (user) {
      fetchShoppingItems();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const referenceNumber = `SL${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    
    const { data, error } = await supabase
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
      toast({
        title: "✅ Medication Added Successfully!",
        description: `🎯 REFERENCE NUMBER: ${referenceNumber} 📋 Please save this number for your pharmacy visit!`,
        duration: 15000
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

  return {
    items,
    formData,
    setFormData,
    loading,
    handleSubmit,
    togglePurchased,
    deleteItem
  };
};
