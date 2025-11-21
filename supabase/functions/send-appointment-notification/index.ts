import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentNotification {
  hospital_email: string;
  hospital_name: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  country: string;
  state: string;
  reference_number: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: AppointmentNotification = await req.json();
    console.log("Sending appointment notifications for:", data.reference_number);

    // Email to hospital
    const hospitalEmail = await resend.emails.send({
      from: "Healinton <onboarding@resend.dev>",
      to: [data.hospital_email],
      subject: `New Appointment Request - ${data.reference_number}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(to bottom, #ffffff, #f0fdf4); padding: 20px; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0;">New Appointment Request</h1>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #10b981; margin-top: 0;">Patient Details</h2>
            <p><strong>Name:</strong> ${data.user_name}</p>
            <p><strong>Email:</strong> ${data.user_email}</p>
            <p><strong>Phone:</strong> ${data.user_phone}</p>
            <p><strong>Location:</strong> ${data.state}, ${data.country}</p>
            
            <h2 style="color: #10b981;">Appointment Information</h2>
            <p><strong>Date:</strong> ${new Date(data.appointment_date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${data.appointment_time}</p>
            <p><strong>Reason:</strong> ${data.reason}</p>
            <p><strong>Reference Number:</strong> ${data.reference_number}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 4px;">
            <p style="margin: 0; color: #059669;"><strong>Note:</strong> Please contact the patient to confirm the appointment.</p>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
            This is an automated message from Healinton Health Management System
          </p>
        </div>
      `,
    });

    console.log("Hospital email sent:", hospitalEmail);

    // Email to admin
    const adminEmail = await resend.emails.send({
      from: "Healinton <onboarding@resend.dev>",
      to: ["officialhealinton@gmail.com"],
      subject: `Appointment Booking - ${data.reference_number}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Appointment Booking</h2>
          <p><strong>Hospital:</strong> ${data.hospital_name}</p>
          <p><strong>Patient:</strong> ${data.user_name}</p>
          <p><strong>Email:</strong> ${data.user_email}</p>
          <p><strong>Phone:</strong> ${data.user_phone}</p>
          <p><strong>Date:</strong> ${new Date(data.appointment_date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${data.appointment_time}</p>
          <p><strong>Reference:</strong> ${data.reference_number}</p>
        </div>
      `,
    });

    console.log("Admin email sent:", adminEmail);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending notifications:", error);
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
