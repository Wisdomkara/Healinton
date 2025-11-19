
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Rate limiting storage
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10 // 10 requests per minute

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Security-Policy': "default-src 'self'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block'
}

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
const sanitizeMessage = (message: string): string => {
  if (typeof message !== 'string') {
    throw new Error('Message must be a string')
  }
  
  // Remove potential XSS and injection attempts
  const sanitized = message
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
  
  if (sanitized.length > 1000) {
    throw new Error('Message too long')
  }
  
  if (sanitized.length === 0) {
    throw new Error('Message cannot be empty')
  }
  
  return sanitized
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
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

    const requestData = await req.json()
    const { message } = requestData
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Sanitize and validate input
    const sanitizedMessage = sanitizeMessage(message)

    // Get Lovable AI API key from environment variables
    const apiKey = Deno.env.get('LOVABLE_API_KEY')
    
    if (!apiKey) {
      console.error('LOVABLE_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI health assistant. You provide general health information and wellness tips, but you cannot diagnose medical conditions or replace professional medical advice. Always remind users to consult healthcare providers for medical concerns. Keep responses concise and helpful.`
          },
          {
            role: 'user',
            content: sanitizedMessage
          }
        ],
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const result = await response.json()

    if (!result.choices || result.choices.length === 0) {
      throw new Error('Invalid response format from API')
    }

    let aiResponse = result.choices[0]?.message?.content || "I'm here to help with your health questions!"
    
    // Clean up the response
    aiResponse = aiResponse.trim()
    
    if (!aiResponse) {
      aiResponse = "I'm here to help with your health questions! Could you please rephrase your question?"
    }

    // Add health disclaimer if the response seems to be medical advice
    const medicalTerms = ['diagnose', 'treatment', 'medicine', 'prescription', 'symptoms', 'disease', 'condition', 'therapy']
    const containsMedicalTerms = medicalTerms.some(term => 
      aiResponse.toLowerCase().includes(term) || sanitizedMessage.toLowerCase().includes(term)
    )

    if (containsMedicalTerms && !aiResponse.toLowerCase().includes('consult')) {
      aiResponse += "\n\n*Please remember to consult with a qualified healthcare provider for proper medical advice and treatment.*"
    }

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error in ai-chat function:', error)
    
    // Don't expose internal error details in production
    const errorMessage = error instanceof Error && error.message.includes('Message') 
      ? error.message 
      : 'Sorry, I encountered an issue processing your request. Please try again.'
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
