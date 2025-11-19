import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  orderId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId }: NotificationRequest = await req.json();

    console.log(`Processing delivery notification for order ${orderId}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch order details with user profile
    const { data: order, error: orderError } = await supabase
      .from('drug_orders')
      .select(`
        *,
        drug_categories (name, type, description),
        profiles (email, first_name, last_name)
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Error fetching order:', orderError);
      throw new Error('Order not found');
    }

    // Get user email
    const userEmail = order.profiles?.email;
    if (!userEmail) {
      throw new Error('User email not found');
    }

    const userName = order.profiles?.first_name 
      ? `${order.profiles.first_name} ${order.profiles.last_name || ''}`
      : 'Valued Customer';

    // Prepare email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #16a34a;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #f9fafb;
              padding: 30px;
              border: 1px solid #e5e7eb;
              border-top: none;
            }
            .order-details {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border: 1px solid #e5e7eb;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #f3f4f6;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              color: #6b7280;
            }
            .value {
              color: #111827;
            }
            .status-badge {
              display: inline-block;
              background-color: #dcfce7;
              color: #166534;
              padding: 6px 12px;
              border-radius: 20px;
              font-weight: bold;
              font-size: 14px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
            .cta-button {
              display: inline-block;
              background-color: #16a34a;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚚 Your Order is Out for Delivery!</h1>
          </div>
          <div class="content">
            <p>Dear ${userName},</p>
            
            <p>Great news! Your drug order has been dispatched and is on its way to you.</p>
            
            <div class="order-details">
              <h2 style="margin-top: 0; color: #111827;">Order Details</h2>
              
              <div class="detail-row">
                <span class="label">Drug Name:</span>
                <span class="value">${order.drug_categories?.name || 'N/A'}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Type:</span>
                <span class="value">${order.drug_categories?.type || 'N/A'}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Quantity:</span>
                <span class="value">${order.quantity || 0}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Total Amount:</span>
                <span class="value">$${order.total_amount?.toFixed(2) || '0.00'}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Reference Number:</span>
                <span class="value">${order.reference_number || 'N/A'}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Delivery Address:</span>
                <span class="value">${order.delivery_address || 'N/A'}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Status:</span>
                <span class="status-badge">DELIVERED</span>
              </div>
            </div>
            
            <p><strong>What's Next?</strong></p>
            <ul>
              <li>Your order should arrive within 2-5 business days</li>
              <li>You'll receive the package at your specified delivery address</li>
              <li>Once received, please mark the order as "Completed" in your dashboard</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="${supabaseUrl.replace('https://', 'https://').split('.supabase')[0]}.lovable.app/dashboard" class="cta-button">
                View Order in Dashboard
              </a>
            </p>
            
            <p>If you have any questions or concerns about your order, please don't hesitate to contact us.</p>
            
            <div class="footer">
              <p><strong>Healinton - Your Health, Our Priority</strong></p>
              <p>This is an automated notification. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: 'Healinton <onboarding@resend.dev>',
      to: [userEmail],
      subject: '🚚 Your Healinton Order is Out for Delivery!',
      html: emailHtml,
    });

    console.log('Delivery notification email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in notify-user-delivery function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
