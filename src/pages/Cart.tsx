import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('first_name, last_name, email, phone_number, delivery_address, country')
      .eq('id', user.id)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  const handleCheckout = async () => {
    if (!user || !profile) {
      toast({
        title: 'Profile Required',
        description: 'Please complete your profile to checkout.',
        variant: 'destructive'
      });
      return;
    }

    if (!profile.phone_number || !profile.delivery_address) {
      toast({
        title: 'Profile Incomplete',
        description: 'Please add phone number and delivery address in Settings.',
        variant: 'destructive'
      });
      navigate('/profile');
      return;
    }

    if (items.length === 0) {
      toast({
        title: 'Cart Empty',
        description: 'Please add items to cart before checkout.',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
      const orderPromises = items.map(async (item) => {
        const referenceNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        if (item.type === 'drug' && item.drugId) {
          // Create drug order
          const { error, data } = await supabase
            .from('drug_orders')
            .insert({
              user_id: user.id,
              drug_id: item.drugId,
              quantity: item.quantity,
              total_amount: item.price * item.quantity,
              status: 'pending',
              reference_number: referenceNumber,
              country: profile.country,
              delivery_address: profile.delivery_address || '',
              user_name: userName || 'Unknown'
            })
            .select('id')
            .single();

          if (error) throw error;

          // Send admin notification
          if (data) {
            supabase.functions.invoke('notify-admin-order', {
              body: { type: 'drug_order', orderId: data.id }
            }).catch(err => console.error('Failed to send admin notification:', err));
          }
        } else {
          // Create shopping list order
          await supabase
            .from('shopping_lists')
            .insert({
              user_id: user.id,
              medication_name: item.name,
              pharmacy_name: item.pharmacyName || '',
              reference_number: referenceNumber,
              is_purchased: false
            });
        }

        return referenceNumber;
      });

      const references = await Promise.all(orderPromises);

      toast({
        title: 'Order Placed Successfully!',
        description: `Your orders have been placed. References: ${references.join(', ')}`,
      });

      clearCart();
      navigate('/dashboard');

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg mb-4">Please sign in to view your cart</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add items from the drug store or shopping list</p>
            <Button onClick={() => navigate('/dashboard')}>
              Continue Shopping
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      {item.pharmacyName && (
                        <p className="text-sm text-muted-foreground">Pharmacy: {item.pharmacyName}</p>
                      )}
                      <p className="text-sm text-muted-foreground capitalize">Type: {item.type.replace('_', ' ')}</p>
                      <p className="text-lg font-bold text-green-600 mt-2">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                {profile && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold mb-2">Delivery Details:</p>
                    <p className="text-sm">{profile.first_name} {profile.last_name}</p>
                    <p className="text-sm">{profile.email}</p>
                    <p className="text-sm">{profile.phone_number || 'No phone'}</p>
                    <p className="text-sm">{profile.delivery_address || 'No address'}</p>
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Items ({items.length})</span>
                    <span>{items.reduce((sum, item) => sum + item.quantity, 0)} total</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isProcessing ? 'Processing...' : 'Checkout'}
                </Button>

                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="w-full mt-2"
                  disabled={isProcessing}
                >
                  Clear Cart
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
