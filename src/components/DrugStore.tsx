
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEnsureProfile } from '@/hooks/useEnsureProfile';
import { useCart } from '@/contexts/CartContext';
import { Pill, Search, ShoppingCart, Star, AlertCircle, CheckCircle2 } from 'lucide-react';

const DrugStore = () => {
  useEnsureProfile();
  const { user } = useAuth();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [drugs, setDrugs] = useState<any[]>([]);
  const [filteredDrugs, setFilteredDrugs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleAddToCart = (drug: any) => {
    if (!user) {
      toast({
        title: 'Sign In Required',
        description: 'Please sign in to add items to cart.',
        variant: 'destructive'
      });
      return;
    }

    addItem({
      name: drug.name,
      price: drug.price,
      quantity: 1,
      type: 'drug',
      drugId: drug.id
    });

    toast({
      title: 'Added to Cart',
      description: `${drug.name} has been added to your cart.`,
    });
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
                onClick={() => handleAddToCart(drug)}
                disabled={!drug.availability}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {drug.availability ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

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
