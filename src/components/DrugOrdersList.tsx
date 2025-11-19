import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Pill, Package, Clock, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DrugOrdersList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showClearAll, setShowClearAll] = useState(false);

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
          drug_categories (name, type, description)
        `)
        .eq('user_id', user.id)
        .order('order_date', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching drug orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to load orders',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsReceived = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('drug_orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Order Completed',
        description: 'Order marked as received and removed from list',
      });

      fetchOrders();
    } catch (error) {
      console.error('Error completing order:', error);
      toast({
        title: 'Error',
        description: 'Failed to complete order',
        variant: 'destructive'
      });
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('drug_orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: 'Order Deleted',
        description: 'Order has been removed',
      });

      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete order',
        variant: 'destructive'
      });
    }
    setDeleteId(null);
  };

  const clearAllOrders = async () => {
    try {
      const { error } = await supabase
        .from('drug_orders')
        .delete()
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: 'All Orders Cleared',
        description: 'All orders have been removed',
      });

      fetchOrders();
    } catch (error) {
      console.error('Error clearing orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to clear orders',
        variant: 'destructive'
      });
    }
    setShowClearAll(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'delivered':
        return <Package className="h-4 w-4 text-green-600" />;
      case 'received':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      received: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    };
    
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
        <p className="text-gray-500 dark:text-gray-400">Your drug orders will appear here</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Drug Orders</h2>
        {orders.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setShowClearAll(true)}
            size="sm"
          >
            Clear All Orders
          </Button>
        )}
      </div>

      {orders.map((order) => (
        <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <Pill className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg">{order.drug_categories?.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.drug_categories?.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(order.status)}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Quantity</p>
                <p className="font-semibold">{order.quantity}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Amount</p>
                <p className="font-semibold text-green-600">${order.total_amount?.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Order Date</p>
                <p className="font-semibold">{new Date(order.order_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Reference</p>
                <p className="font-semibold text-xs">{order.reference_number}</p>
              </div>
            </div>

            {order.delivery_address && (
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Address</p>
                <p className="text-sm font-medium">{order.delivery_address}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-2">
              {(order.status === 'delivered' || order.status === 'pending') && (
                <Button
                  onClick={() => markAsReceived(order.id)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Completed
                </Button>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteId(order.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {/* Delete Single Order Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this order. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && deleteOrder(deleteId)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Orders Dialog */}
      <AlertDialog open={showClearAll} onOpenChange={setShowClearAll}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Orders?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your orders. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearAllOrders} className="bg-red-600 hover:bg-red-700">
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DrugOrdersList;
