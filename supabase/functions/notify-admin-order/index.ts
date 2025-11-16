import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "healinton1@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderNotification {
  type: 'drug_order' | 'hospital_booking';
  orderId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, orderId }: OrderNotification = await req.json();
    console.log(`Processing ${type} notification for order ${orderId}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let emailSubject = '';
    let emailHtml = '';

    if (type === 'drug_order') {
      const { data: order, error } = await supabase
        .from('drug_orders')
        .select(`
          *,
          drug_categories(name, type),
          profiles(first_name, last_name, email, phone_number, country)
        `)
        .eq('id', orderId)
        .single();

      if (error || !order) {
        console.error('Error fetching drug order:', error);
        throw new Error('Failed to fetch order details');
      }

      emailSubject = `🔔 New Drug Order - ${order.reference_number}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Drug Order Received</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Order Details</h3>
            <p><strong>Reference Number:</strong> ${order.reference_number}</p>
            <p><strong>Drug:</strong> ${order.drug_categories?.name} (${order.drug_categories?.type})</p>
            <p><strong>Quantity:</strong> ${order.quantity}</p>
            <p><strong>Total Amount:</strong> $${order.total_amount}</p>
            <p><strong>Status:</strong> <span style="background-color: #fef3c7; padding: 4px 8px; border-radius: 4px;">${order.status}</span></p>
          </div>
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${order.profiles?.first_name} ${order.profiles?.last_name}</p>
            <p><strong>Email:</strong> ${order.profiles?.email}</p>
            <p><strong>Phone:</strong> ${order.profiles?.phone_number}</p>
            <p><strong>Country:</strong> ${order.country}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              <strong>Order Date:</strong> ${new Date(order.order_date).toLocaleString()}
            </p>
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              This is an automated notification from Healinton Health Management System.
            </p>
          </div>
        </div>
      `;
    } else if (type === 'hospital_booking') {
      const { data: booking, error } = await supabase
        .from('hospital_bookings')
        .select(`
          *,
          profiles(first_name, last_name, email, phone_number)
        `)
        .eq('id', orderId)
        .single();

      if (error || !booking) {
        console.error('Error fetching hospital booking:', error);
        throw new Error('Failed to fetch booking details');
      }

      emailSubject = `🏥 New Hospital Booking - ${booking.reference_number}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Hospital Booking Received</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details</h3>
            <p><strong>Reference Number:</strong> ${booking.reference_number}</p>
            <p><strong>Hospital:</strong> ${booking.hospital_name}</p>
            <p><strong>Appointment Date:</strong> ${new Date(booking.appointment_date).toLocaleString()}</p>
            <p><strong>Reason:</strong> ${booking.reason}</p>
            <p><strong>Status:</strong> <span style="background-color: #fef3c7; padding: 4px 8px; border-radius: 4px;">${booking.status}</span></p>
          </div>
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Patient Information</h3>
            <p><strong>Name:</strong> ${booking.profiles?.first_name} ${booking.profiles?.last_name}</p>
            <p><strong>Email:</strong> ${booking.profiles?.email}</p>
            <p><strong>Phone:</strong> ${booking.profiles?.phone_number}</p>
            <p><strong>Country:</strong> ${booking.country}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              <strong>Booking Created:</strong> ${new Date(booking.created_at).toLocaleString()}
            </p>
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
              This is an automated notification from Healinton Health Management System.
            </p>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Healinton <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Admin notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in notify-admin-order function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
