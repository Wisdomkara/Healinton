
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
import { useNavigate } from 'react-router-dom';
import { Pill, Search, ShoppingCart, Star, AlertCircle, CheckCircle2 } from 'lucide-react';

const DrugStore = () => {
  useEnsureProfile();
  const { user } = useAuth();
  const { toast } = useToast();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [drugs, setDrugs] = useState<any[]>([]);
  const [filteredDrugs, setFilteredDrugs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);

  useEffect(() => {
    const pharmacyId = localStorage.getItem('selectedPharmacyId');
    setSelectedPharmacyId(pharmacyId);
    
    if (pharmacyId) {
      fetchPharmacyDetails(pharmacyId);
    }
    fetchDrugs();
  }, []);

  useEffect(() => {
    filterDrugs();
  }, [drugs, selectedCategory, searchTerm]);

  const fetchPharmacyDetails = async (pharmacyId: string) => {
    const { data } = await supabase
      .from('pharmacies')
      .select('*')
      .eq('id', pharmacyId)
      .single();
    
    if (data) {
      setSelectedPharmacy(data);
    }
  };

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

  if (!selectedPharmacyId) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-white via-green-50/30 to-white dark:from-background dark:via-green-950/10 dark:to-background rounded-lg p-8">
        <div className="text-center space-y-4 max-w-md">
          <Pill className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground">Select a Pharmacy First</h2>
          <p className="text-muted-foreground">
            Please select a pharmacy before browsing our drug store. This helps us ensure your order is fulfilled by your preferred pharmacy.
          </p>
          <Button 
            onClick={() => navigate('/pharmacies')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Select Pharmacy
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-white via-green-50/20 to-white dark:from-background dark:via-green-950/5 dark:to-background p-6 rounded-lg">
      {selectedPharmacy && (
        <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ordering from</p>
              <h3 className="font-semibold text-lg text-foreground">{selectedPharmacy.name}</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/pharmacies')}
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Change Pharmacy
            </Button>
          </div>
        </Card>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center">
          <Pill className="h-6 w-6 mr-2 text-green-600" />
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
          <Card key={drug.id} className="p-4 hover:shadow-lg transition-all border bg-white dark:bg-card">
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
              
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                {drug.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
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
                className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
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
