
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Pill, Search, ShoppingCart, Star, AlertCircle, CheckCircle2 } from 'lucide-react';

const DrugStore = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [drugs, setDrugs] = useState<any[]>([]);
  const [filteredDrugs, setFilteredDrugs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<any>(null);
  const [orderForm, setOrderForm] = useState({
    quantity: 1,
    notes: ''
  });

  useEffect(() => {
    fetchDrugs();
  }, []);

  useEffect(() => {
    filterDrugs();
  }, [drugs, selectedCategory, searchTerm]);

  const fetchDrugs = async () => {
    const { data, error } = await supabase
      .from('drug_categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching drugs:', error);
      return;
    }

    setDrugs(data || []);
  };

  const filterDrugs = () => {
    let filtered = drugs;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(drug => drug.type === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(drug => 
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDrugs(filtered);
  };

  const handleOrder = async () => {
    if (!user || !selectedDrug) return;

    setIsOrdering(true);
    try {
      const totalAmount = selectedDrug.price * orderForm.quantity;

      const { error } = await supabase
        .from('drug_orders')
        .insert({
          user_id: user.id,
          drug_id: selectedDrug.id,
          quantity: orderForm.quantity,
          total_amount: totalAmount,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: 'Order Placed Successfully!',
        description: `Your order for ${selectedDrug.name} has been placed. We'll contact you soon.`,
      });

      setSelectedDrug(null);
      setOrderForm({ quantity: 1, notes: '' });

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsOrdering(false);
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'unique': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';  
      case 'hard_to_find': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'basic': return <CheckCircle2 className="h-4 w-4" />;
      case 'unique': return <Star className="h-4 w-4" />;
      case 'hard_to_find': return <AlertCircle className="h-4 w-4" />;
      default: return <Pill className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Pill className="h-6 w-6 mr-2 text-blue-600" />
          Drug Store
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search drugs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All Drugs', count: drugs.length },
          { key: 'basic', label: 'Basic Drugs', count: drugs.filter(d => d.type === 'basic').length },
          { key: 'unique', label: 'Unique Drugs', count: drugs.filter(d => d.type === 'unique').length },
          { key: 'hard_to_find', label: 'Hard to Find', count: drugs.filter(d => d.type === 'hard_to_find').length }
        ].map((category) => (
          <Button
            key={category.key}
            variant={selectedCategory === category.key ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.key)}
            className="flex items-center space-x-2"
          >
            <span>{category.label}</span>
            <Badge variant="secondary" className="ml-1">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Drugs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDrugs.map((drug) => (
          <Card key={drug.id} className="p-4 hover:shadow-lg transition-all border">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-3">
                <Badge className={`${getCategoryColor(drug.type)} flex items-center space-x-1`}>
                  {getCategoryIcon(drug.type)}
                  <span className="capitalize">{drug.type.replace('_', ' ')}</span>
                </Badge>
                {!drug.availability && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                {drug.name}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                {drug.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ${drug.price}
                </span>
                {drug.availability && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    In Stock
                  </Badge>
                )}
              </div>
              
              <Button
                onClick={() => setSelectedDrug(drug)}
                disabled={!drug.availability}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {drug.availability ? 'Order Now' : 'Out of Stock'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Order Modal */}
      {selectedDrug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Order {selectedDrug.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDrug(null)}
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm(prev => ({
                    ...prev,
                    quantity: parseInt(e.target.value) || 1
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Special Instructions (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions for your order..."
                  value={orderForm.notes}
                  onChange={(e) => setOrderForm(prev => ({
                    ...prev,
                    notes: e.target.value
                  }))}
                />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Price per unit:</span>
                  <span className="font-semibold">${selectedDrug.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Quantity:</span>
                  <span className="font-semibold">{orderForm.quantity}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">
                    ${(selectedDrug.price * orderForm.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDrug(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleOrder}
                  disabled={isOrdering}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isOrdering ? 'Placing Order...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {filteredDrugs.length === 0 && (
        <div className="text-center py-12">
          <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No drugs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DrugStore;
