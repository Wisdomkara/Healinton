
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Copy, MapPin, Clock, User, Trash2 } from 'lucide-react';

const AppointmentSummary = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('hospital_bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearAllAppointments = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('hospital_bookings')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setAppointments([]);
      toast({
        title: "Appointments Cleared",
        description: "All appointments have been cleared successfully.",
      });
    } catch (error) {
      console.error('Error clearing appointments:', error);
      toast({
        title: "Error",
        description: "Failed to clear appointments. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyReferenceNumber = (refNumber: string) => {
    navigator.clipboard.writeText(refNumber);
    toast({
      title: "Reference Number Copied",
      description: "The reference number has been copied to your clipboard.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card className="p-4 text-center">
        <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">No appointments booked yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Recent Appointments</h4>
        <Button
          onClick={clearAllAppointments}
          variant="destructive"
          size="sm"
          className="h-8"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Clear All
        </Button>
      </div>
      
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <h4 className="font-semibold text-sm">{appointment.hospital_name}</h4>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                Submitted
              </span>
            </div>
            
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" />
                <span>{formatDate(appointment.appointment_date)}</span>
              </div>
              
              {appointment.full_name && (
                <div className="flex items-center space-x-2">
                  <User className="h-3 w-3" />
                  <span>{appointment.full_name}</span>
                </div>
              )}
            </div>

            {appointment.reference_number && (
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-xs font-mono text-gray-700">
                  Ref: {appointment.reference_number}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyReferenceNumber(appointment.reference_number)}
                  className="h-6 px-2"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentSummary;
