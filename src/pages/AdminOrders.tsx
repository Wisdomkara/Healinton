import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { 
  ShoppingCart, 
  Calendar, 
  FileText, 
  Users,
  RefreshCw,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  exportDrugOrdersToCSV,
  exportHospitalBookingsToCSV,
  exportPremiumSubmissionsToCSV
} from '@/utils/exportToCSV';

const AdminOrders = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drugOrders, setDrugOrders] = useState<any[]>([]);
  const [hospitalBookings, setHospitalBookings] = useState<any[]>([]);
  const [premiumSubmissions, setPremiumSubmissions] = useState<any[]>([]);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data, error } = await supabase.rpc('is_admin');
    
    if (error || !data) {
      toast({
        title: 'Access Denied',
        description: 'You do not have admin privileges.',
        variant: 'destructive'
      });
      navigate('/dashboard');
      return;
    }

    setIsAdmin(data);
    if (data) {
      fetchAllData();
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchDrugOrders(),
      fetchHospitalBookings(),
      fetchPremiumSubmissions()
    ]);
    setLoading(false);
  };

  const fetchDrugOrders = async () => {
    const { data, error } = await supabase
      .from('drug_orders')
      .select(`
        *,
        drug_categories(name, type),
        profiles(first_name, last_name, email, phone_number)
      `)
      .order('order_date', { ascending: false });

    if (error) {
      console.error('Error fetching drug orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch drug orders',
        variant: 'destructive'
      });
    } else {
      setDrugOrders(data || []);
    }
  };

  const fetchHospitalBookings = async () => {
    const { data, error } = await supabase
      .from('hospital_bookings')
      .select(`
        *,
        profiles(first_name, last_name, email, phone_number)
      `)
      .order('appointment_date', { ascending: false });

    if (error) {
      console.error('Error fetching hospital bookings:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch hospital bookings',
        variant: 'destructive'
      });
    } else {
      setHospitalBookings(data || []);
    }
  };

  const fetchPremiumSubmissions = async () => {
    const { data, error } = await supabase
      .from('premium_form_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching premium submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch premium submissions',
        variant: 'destructive'
      });
    } else {
      setPremiumSubmissions(data || []);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('drug_orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Order status updated successfully'
      });
      fetchDrugOrders();
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    const { error } = await supabase
      .from('hospital_bookings')
      .update({ status: newStatus })
      .eq('id', bookingId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update booking status',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Success',
        description: 'Booking status updated successfully'
      });
      fetchHospitalBookings();
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage all orders and submissions</p>
        </div>

        <Tabs defaultValue="drug-orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="drug-orders">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Drug Orders
            </TabsTrigger>
            <TabsTrigger value="hospital-bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Hospital Bookings
            </TabsTrigger>
            <TabsTrigger value="premium-submissions">
              <FileText className="w-4 h-4 mr-2" />
              Premium Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drug-orders">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Drug Orders ({drugOrders.length})</h2>
                <div className="flex gap-2">
                  <Button onClick={() => exportDrugOrdersToCSV(drugOrders)} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button onClick={fetchDrugOrders} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Drug</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drugOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={11} className="text-center text-muted-foreground">
                          No drug orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      drugOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">{order.reference_number}</TableCell>
                          <TableCell>
                            {order.profiles?.first_name} {order.profiles?.last_name}
                          </TableCell>
                          <TableCell>{order.profiles?.email}</TableCell>
                          <TableCell>{order.profiles?.phone_number}</TableCell>
                          <TableCell>{order.drug_categories?.name}</TableCell>
                          <TableCell>{order.quantity}</TableCell>
                          <TableCell>${order.total_amount}</TableCell>
                          <TableCell>{order.country}</TableCell>
                          <TableCell>
                            <Badge variant={
                              order.status === 'completed' ? 'default' :
                              order.status === 'pending' ? 'secondary' :
                              'destructive'
                            }>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(order.order_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="border rounded px-2 py-1 text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="hospital-bookings">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Hospital Bookings ({hospitalBookings.length})</h2>
                <div className="flex gap-2">
                  <Button onClick={() => exportHospitalBookingsToCSV(hospitalBookings)} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button onClick={fetchHospitalBookings} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Appointment Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hospitalBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center text-muted-foreground">
                          No hospital bookings found
                        </TableCell>
                      </TableRow>
                    ) : (
                      hospitalBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-mono text-sm">{booking.reference_number}</TableCell>
                          <TableCell>
                            {booking.profiles?.first_name} {booking.profiles?.last_name}
                          </TableCell>
                          <TableCell>{booking.profiles?.email}</TableCell>
                          <TableCell>{booking.profiles?.phone_number}</TableCell>
                          <TableCell>{booking.hospital_name}</TableCell>
                          <TableCell>
                            {new Date(booking.appointment_date).toLocaleString()}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{booking.reason}</TableCell>
                          <TableCell>{booking.country}</TableCell>
                          <TableCell>
                            <Badge variant={
                              booking.status === 'confirmed' ? 'default' :
                              booking.status === 'pending' ? 'secondary' :
                              'destructive'
                            }>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                              className="border rounded px-2 py-1 text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="completed">Completed</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="premium-submissions">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Premium Form Submissions ({premiumSubmissions.length})</h2>
                <div className="flex gap-2">
                  <Button onClick={() => exportPremiumSubmissionsToCSV(premiumSubmissions)} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button onClick={fetchPremiumSubmissions} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Surname</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Submitted At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {premiumSubmissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          No premium submissions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      premiumSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>{submission.full_name}</TableCell>
                          <TableCell>{submission.surname}</TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell>{submission.phone_number}</TableCell>
                          <TableCell>{submission.country}</TableCell>
                          <TableCell>
                            {new Date(submission.submitted_at).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminOrders;
