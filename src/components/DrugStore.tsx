
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Package, Star } from 'lucide-react';

const drugs = {
  basic: [
    { name: 'Paracetamol', price: 5.99, description: 'Pain relief and fever reducer' },
    { name: 'Ibuprofen', price: 7.99, description: 'Anti-inflammatory pain reliever' },
    { name: 'Aspirin', price: 4.99, description: 'Pain relief and blood thinner' },
    { name: 'Vitamin C', price: 8.99, description: 'Immune system support' },
    { name: 'Multivitamins', price: 12.99, description: 'Daily nutritional supplement' }
  ],
  unique: [
    { name: 'Insulin Glargine', price: 89.99, description: 'Long-acting insulin for diabetes' },
    { name: 'Metformin', price: 25.99, description: 'Type 2 diabetes medication' },
    { name: 'Lisinopril', price: 35.99, description: 'Blood pressure medication' },
    { name: 'Atorvastatin', price: 45.99, description: 'Cholesterol-lowering medication' },
    { name: 'Levothyroxine', price: 29.99, description: 'Thyroid hormone replacement' }
  ],
  difficult: [
    { name: 'Humira (Adalimumab)', price: 2500.00, description: 'Autoimmune disorder treatment' },
    { name: 'Keytruda (Pembrolizumab)', price: 5000.00, description: 'Cancer immunotherapy' },
    { name: 'Sovaldi (Sofosbuvir)', price: 1800.00, description: 'Hepatitis C treatment' },
    { name: 'Tecfidera (Dimethyl fumarate)', price: 3200.00, description: 'Multiple sclerosis treatment' },
    { name: 'Epogen (Epoetin alfa)', price: 890.00, description: 'Anemia treatment for chronic kidney disease' }
  ]
};

interface OrderFormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  deliveryAddress: string;
  quantity: number;
}

const DrugStore = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<'basic' | 'unique' | 'difficult'>('basic');
  const [selectedDrug, setSelectedDrug] = useState<any>(null);
  const [orderData, setOrderData] = useState<OrderFormData>({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    deliveryAddress: '',
    quantity: 1
  });
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedDrug) return;

    setLoading(true);
    const totalPrice = selectedDrug.price * orderData.quantity;

    const { data, error } = await supabase
      .from('drug_orders')
      .insert({
        user_id: user.id,
        drug_name: selectedDrug.name,
        drug_type: selectedCategory,
        quantity: orderData.quantity,
        price: totalPrice,
        delivery_address: orderData.deliveryAddress,
        phone_number: orderData.phoneNumber,
        email_address: orderData.emailAddress
      })
      .select('reference_number')
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Order Placed Successfully!",
        description: `Your reference number is: ${data.reference_number}. Total: $${totalPrice.toFixed(2)}. Payment on delivery.`,
        duration: 10000
      });
      setOrderData({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        deliveryAddress: '',
        quantity: 1
      });
      setSelectedDrug(null);
    }
    setLoading(false);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Online Drug Store</h2>
          <p className="text-gray-600">Order your medications with pay-on-delivery service</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {(['basic', 'unique', 'difficult'] as const).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category} Drugs
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drugs[selectedCategory].map((drug, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{drug.name}</h3>
                  <p className="text-gray-600 text-sm">{drug.description}</p>
                </div>
                <Badge variant={selectedCategory === 'basic' ? 'secondary' : selectedCategory === 'unique' ? 'default' : 'destructive'}>
                  {selectedCategory}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-600">${drug.price}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full" 
                    onClick={() => setSelectedDrug(drug)}
                    disabled={!user}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {user ? 'Order Now' : 'Login to Order'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Order {selectedDrug?.name}</DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleOrder} className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={orderData.fullName}
                        onChange={(e) => setOrderData({ ...orderData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={orderData.phoneNumber}
                        onChange={(e) => setOrderData({ ...orderData, phoneNumber: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emailAddress">Email Address</Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        value={orderData.emailAddress}
                        onChange={(e) => setOrderData({ ...orderData, emailAddress: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="deliveryAddress">Delivery Address</Label>
                      <Input
                        id="deliveryAddress"
                        value={orderData.deliveryAddress}
                        onChange={(e) => setOrderData({ ...orderData, deliveryAddress: e.target.value })}
                        placeholder="Full delivery address"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Select 
                        value={orderData.quantity.toString()} 
                        onValueChange={(value) => setOrderData({ ...orderData, quantity: parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="font-bold">${(selectedDrug?.price * orderData.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Payment on delivery</p>
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full">
                      <Package className="h-4 w-4 mr-2" />
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrugStore;
