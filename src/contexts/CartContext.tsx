import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { calculateVAT, calculateTotalWithVAT, getVATRate } from '@/utils/vatRates';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'drug' | 'shopping_list';
  drugId?: string;
  pharmacyName?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getVAT: () => number;
  getTotalWithVAT: () => number;
  getVATRate: () => number;
  userCountry: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [userCountry, setUserCountry] = useState<string | null>(null);

  // Fetch user's country
  useEffect(() => {
    const fetchUserCountry = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('country')
          .eq('id', user.id)
          .single();
        
        if (data?.country) {
          setUserCountry(data.country);
        }
      }
    };
    
    fetchUserCountry();
  }, [user]);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user && items.length > 0) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(items));
    }
  }, [items, user]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.type}_${item.drugId || item.name}_${Date.now()}`;
    setItems(prev => [...prev, { ...item, id }]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getVAT = () => {
    const subtotal = getTotalPrice();
    return calculateVAT(subtotal, userCountry);
  };

  const getTotalWithVAT = () => {
    const subtotal = getTotalPrice();
    return calculateTotalWithVAT(subtotal, userCountry);
  };

  const getVATRateValue = () => {
    return getVATRate(userCountry);
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      getVAT,
      getTotalWithVAT,
      getVATRate: getVATRateValue,
      userCountry
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
