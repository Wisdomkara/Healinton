
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Rate limiting storage
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5 // 5 requests per minute for email sending

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Security-Policy": "default-src 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block"
};

// Rate limiting function
const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  record.count++
  return true
}

// Input validation and sanitization
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 500) // Limit length
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

const validateHospitalData = (data: HospitalNotificationRequest): string[] => {
  const errors: string[] = []
  
  if (!data.hospitalEmail || !validateEmail(data.hospitalEmail)) {
    errors.push('Valid hospital email is required')
  }
  
  if (!data.hospitalName || data.hospitalName.trim().length === 0) {
    errors.push('Hospital name is required')
  }
  
  if (!data.patientName || data.patientName.trim().length === 0) {
    errors.push('Patient name is required')
  }
  
  if (!data.patientEmail || !validateEmail(data.patientEmail)) {
    errors.push('Valid patient email is required')
  }
  
  if (!data.appointmentDate || isNaN(Date.parse(data.appointmentDate))) {
    errors.push('Valid appointment date is required')
  }
  
  if (!data.reason || data.reason.trim().length === 0) {
    errors.push('Reason for visit is required')
  }
  
  if (!data.referenceNumber || data.referenceNumber.trim().length === 0) {
    errors.push('Reference number is required')
  }
  
  return errors
}

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
    console.log("Starting hospital notification function...");
    
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const authHeader = req.headers.get('authorization')
    const identifier = authHeader ? `auth:${authHeader.substring(0, 20)}` : `ip:${clientIP}`
    
    if (!checkRateLimit(identifier)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    
    const requestBody = await req.json();
    console.log("Request body received");

    // Validate and sanitize input data
    const validationErrors = validateHospitalData(requestBody)
    if (validationErrors.length > 0) {
      return new Response(JSON.stringify({ 
        error: 'Validation failed',
        details: validationErrors
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const sanitizedData = {
      hospitalEmail: sanitizeInput(requestBody.hospitalEmail),
      hospitalName: sanitizeInput(requestBody.hospitalName),
      patientName: sanitizeInput(requestBody.patientName),
      patientEmail: sanitizeInput(requestBody.patientEmail),
      patientPhone: sanitizeInput(requestBody.patientPhone),
      appointmentDate: requestBody.appointmentDate,
      reason: sanitizeInput(requestBody.reason),
      referenceNumber: sanitizeInput(requestBody.referenceNumber),
      patientAddress: requestBody.patientAddress ? sanitizeInput(requestBody.patientAddress) : undefined,
      country: requestBody.country ? sanitizeInput(requestBody.country) : undefined
    }

    console.log("Sending appointment notification to:", sanitizedData.hospitalEmail);

    const formattedDate = new Date(sanitizedData.appointmentDate).toLocaleString();

    const emailResponse = await resend.emails.send({
      from: "CareVital <onboarding@resend.dev>",
      to: [sanitizedData.hospitalEmail],
      subject: `New Appointment Booking - ${sanitizedData.referenceNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #16a34a; margin-bottom: 20px;">New Appointment Booking</h1>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Booking Details</h2>
            <p><strong>Reference Number:</strong> ${sanitizedData.referenceNumber}</p>
            <p><strong>Hospital:</strong> ${sanitizedData.hospitalName}</p>
            <p><strong>Appointment Date & Time:</strong> ${formattedDate}</p>
            <p><strong>Reason for Visit:</strong> ${sanitizedData.reason}</p>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Patient Information</h2>
            <p><strong>Name:</strong> ${sanitizedData.patientName}</p>
            <p><strong>Email:</strong> ${sanitizedData.patientEmail}</p>
            <p><strong>Phone:</strong> ${sanitizedData.patientPhone}</p>
            ${sanitizedData.country ? `<p><strong>Country:</strong> ${sanitizedData.country}</p>` : ''}
            ${sanitizedData.patientAddress ? `<p><strong>Address:</strong> ${sanitizedData.patientAddress}</p>` : ''}
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
      emailId: emailResponse.data?.id,
      message: "Email sent successfully"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-hospital-notification function:", error);
    
    // Don't expose internal error details in production
    const errorMessage = error instanceof Error && 
      (error.message.includes('Validation') || error.message.includes('Rate limit'))
      ? error.message 
      : 'Failed to send notification. Please try again.'
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
