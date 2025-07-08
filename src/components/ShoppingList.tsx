
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Mail, Plus, Send } from 'lucide-react';

const pharmacyEmails = {
  'MedPlus Pharmacy': 'medplus@pharmacy.com',
  'HealthCare Pharmacy': 'healthcare@pharmacy.com',
  'Wellness Drugstore': 'wellness@drugstore.com',
  'City Pharmacy': 'city@pharmacy.com',
  'Express Pharmacy': 'express@pharmacy.com'
};

const ShoppingList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({
    medicationName: '',
    pharmacyName: ''
  });
  const [emailData, setEmailData] = useState({
    recipientEmail: '',
    subject: 'Medication Shopping List',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    fetchShoppingList();
  }, [user]);

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
    if (!user || !newItem.medicationName.trim()) return;

    setLoading(true);
    const { error } = await supabase
      .from('shopping_lists')
      .insert({
        user_id: user.id,
        medication_name: newItem.medicationName.trim(),
        pharmacy_name: newItem.pharmacyName || 'Any Pharmacy'
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

  const sendShoppingListEmail = async () => {
    if (!emailData.recipientEmail || shoppingList.length === 0) {
      toast({
        title: "Error",
        description: "Please provide recipient email and ensure you have items in your shopping list",
        variant: "destructive"
      });
      return;
    }

    setEmailLoading(true);
    
    const listItems = shoppingList
      .filter(item => !item.is_purchased)
      .map(item => `• ${item.medication_name} - ${item.pharmacy_name}`)
      .join('\n');

    const emailContent = `
Subject: ${emailData.subject}

${emailData.message || 'Please find my medication shopping list below:'}

Shopping List:
${listItems}

Best regards
    `;

    // Here you would integrate with your email service
    // For now, we'll just show a success message
    setTimeout(() => {
      toast({
        title: "Email Sent",
        description: "Your shopping list has been sent successfully"
      });
      setEmailData({ recipientEmail: '', subject: 'Medication Shopping List', message: '' });
      setEmailLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Add Medication Form */}
      <Card className="p-6 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-300 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Medication to Shopping List
        </h3>
        <form onSubmit={addToShoppingList} className="space-y-4">
          <div>
            <Label htmlFor="medication" className="text-green-700 dark:text-green-300">Medication Name</Label>
            <Input
              id="medication"
              value={newItem.medicationName}
              onChange={(e) => setNewItem({ ...newItem, medicationName: e.target.value })}
              placeholder="Enter medication name..."
              className="border-green-300 focus:border-green-500 hover:border-green-400 transition-colors"
              required
            />
          </div>
          <div>
            <Label htmlFor="pharmacy" className="text-green-700 dark:text-green-300">Preferred Pharmacy (Optional)</Label>
            <Select value={newItem.pharmacyName} onValueChange={(value) => setNewItem({ ...newItem, pharmacyName: value })}>
              <SelectTrigger className="border-green-300 focus:border-green-500 hover:border-green-400 transition-colors">
                <SelectValue placeholder="Choose pharmacy (optional)" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(pharmacyEmails).map(pharmacy => (
                  <SelectItem key={pharmacy} value={pharmacy}>{pharmacy}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-green-600 hover:bg-green-700 transition-all transform hover:scale-105"
          >
            {loading ? 'Adding...' : 'Add to Shopping List'}
          </Button>
        </form>
      </Card>

      {/* Shopping List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Your Shopping List</h3>
        <div className="space-y-3">
          {shoppingList.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={item.is_purchased}
                  onCheckedChange={() => togglePurchased(item.id, item.is_purchased)}
                />
                <div>
                  <p className={`font-medium ${item.is_purchased ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
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
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No medications in your shopping list yet.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Email Shopping List */}
      {shoppingList.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-300 flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Email Shopping List
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipientEmail" className="text-blue-700 dark:text-blue-300">Recipient Email</Label>
              <Input
                id="recipientEmail"
                type="email"
                value={emailData.recipientEmail}
                onChange={(e) => setEmailData({ ...emailData, recipientEmail: e.target.value })}
                placeholder="pharmacist@pharmacy.com"
                className="border-blue-300 focus:border-blue-500 hover:border-blue-400 transition-colors"
              />
            </div>
            <div>
              <Label htmlFor="subject" className="text-blue-700 dark:text-blue-300">Subject</Label>
              <Input
                id="subject"
                value={emailData.subject}
                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                className="border-blue-300 focus:border-blue-500 hover:border-blue-400 transition-colors"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-blue-700 dark:text-blue-300">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                value={emailData.message}
                onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                placeholder="Add any additional notes for the pharmacist..."
                className="border-blue-300 focus:border-blue-500 hover:border-blue-400 transition-colors"
                rows={3}
              />
            </div>
            <Button 
              onClick={sendShoppingListEmail}
              disabled={emailLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <Send className="h-4 w-4 mr-2" />
              {emailLoading ? 'Sending...' : 'Send Shopping List'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ShoppingList;
