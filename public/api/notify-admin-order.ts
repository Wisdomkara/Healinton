import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  // Allow CORS (for browser calls)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { type, orderId } = req.body;
    console.log(`Processing ${type} notification for order ${orderId}`);

    // 🔐 Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const resend = new Resend(process.env.RESEND_API_KEY);
    const ADMIN_EMAIL = "officialhealinton@gmail.com";

    let emailSubject = "";
    let emailHtml = "";

    // 🧪 Drug order
    if (type === "drug_order") {
      const { data: order, error } = await supabase
        .from("drug_orders")
        .select(`
          *,
          drug_categories(name, type),
          profiles(first_name, last_name, email, phone_number, country)
        `)
        .eq("id", orderId)
        .single();

      if (error || !order) {
        console.error("Error fetching drug order:", error);
        throw new Error("Failed to fetch order details");
      }

      emailSubject = `🔔 New Drug Order - ${order.reference_number}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
          <h2 style="color:#2563eb;">New Drug Order Received</h2>
          <p><strong>Drug:</strong> ${order.drug_categories?.name}</p>
          <p><strong>Quantity:</strong> ${order.quantity}</p>
          <p><strong>Total:</strong> $${order.total_amount}</p>
          <hr />
          <p><strong>Customer:</strong> ${order.profiles?.first_name} ${order.profiles?.last_name}</p>
          <p><strong>Email:</strong> ${order.profiles?.email}</p>
        </div>
      `;
    }

    // 🏥 Hospital booking
    else if (type === "hospital_booking") {
      const { data: booking, error } = await supabase
        .from("hospital_bookings")
        .select(`
          *,
          profiles(first_name, last_name, email, phone_number)
        `)
        .eq("id", orderId)
        .single();

      if (error || !booking) {
        console.error("Error fetching hospital booking:", error);
        throw new Error("Failed to fetch booking details");
      }

      emailSubject = `🏥 New Hospital Booking - ${booking.reference_number}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
          <h2 style="color:#2563eb;">New Hospital Booking</h2>
          <p><strong>Hospital:</strong> ${booking.hospital_name}</p>
          <p><strong>Date:</strong> ${new Date(booking.appointment_date).toLocaleString()}</p>
          <hr />
          <p><strong>Patient:</strong> ${booking.profiles?.first_name} ${booking.profiles?.last_name}</p>
          <p><strong>Email:</strong> ${booking.profiles?.email}</p>
        </div>
      `;
    }

    // ✉️ Send email
    const emailResponse = await resend.emails.send({
      from: "Healinton <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent:", emailResponse);

    return res.status(200).json({ success: true, emailResponse });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
