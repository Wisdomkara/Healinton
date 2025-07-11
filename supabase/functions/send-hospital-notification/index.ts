
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface HospitalNotificationRequest {
  hospitalEmail: string;
  hospitalName: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  reason: string;
  referenceNumber: string;
  patientAddress?: string;
  country?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      hospitalEmail,
      hospitalName,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      reason,
      referenceNumber,
      patientAddress,
      country
    }: HospitalNotificationRequest = await req.json();

    console.log("Sending appointment notification to:", hospitalEmail);

    const formattedDate = new Date(appointmentDate).toLocaleString();

    const emailResponse = await resend.emails.send({
      from: "CareVital <onboarding@resend.dev>",
      to: [hospitalEmail],
      subject: `New Appointment Booking - ${referenceNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #16a34a; margin-bottom: 20px;">New Appointment Booking</h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Booking Details</h2>
            <p><strong>Reference Number:</strong> ${referenceNumber}</p>
            <p><strong>Hospital:</strong> ${hospitalName}</p>
            <p><strong>Appointment Date & Time:</strong> ${formattedDate}</p>
            <p><strong>Reason for Visit:</strong> ${reason}</p>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Patient Information</h2>
            <p><strong>Name:</strong> ${patientName}</p>
            <p><strong>Email:</strong> ${patientEmail}</p>
            <p><strong>Phone:</strong> ${patientPhone}</p>
            ${country ? `<p><strong>Country:</strong> ${country}</p>` : ''}
            ${patientAddress ? `<p><strong>Address:</strong> ${patientAddress}</p>` : ''}
          </div>

          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p style="margin: 0;"><strong>Note:</strong> Please confirm this appointment by contacting the patient directly.</p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            This notification was sent from the CareVital platform. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-hospital-notification function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
