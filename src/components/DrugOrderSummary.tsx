
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Pill, Package, Clock } from 'lucide-react';

const DrugOrderSummary = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('drug_orders')
        .select(`
          *,
          drug_categories (name, type)
        `)
        .eq('user_id', user.id)
        .order('order_date', { ascending: false })
        .limit(3);

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching drug orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="p-4 text-center">
        <Pill className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">No drug orders yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <Pill className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-sm">{order.drug_categories?.name}</h4>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <Package className="h-3 w-3" />
                <span>Qty: {order.quantity}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" />
                <span>{new Date(order.order_date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DrugOrderSummary;
