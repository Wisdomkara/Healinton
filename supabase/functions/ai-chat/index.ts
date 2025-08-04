
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get API key from environment variables
    const apiKey = Deno.env.get('HUGGING_FACE_API_KEY')
    
    if (!apiKey) {
      console.error('HUGGING_FACE_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Sending message to Hugging Face API:', message.substring(0, 100) + '...')

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `Health Assistant: I'm here to help with your health questions. Please note that I cannot provide medical diagnoses or replace professional medical advice. Always consult with a healthcare provider for medical concerns.

User: ${message}
Health Assistant:`,
          parameters: {
            max_length: 200,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9,
            return_full_text: false
          }
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Hugging Face API error:', response.status, errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const result = await response.json()
    console.log('Hugging Face API response:', result)

    if (!result || !Array.isArray(result) || result.length === 0) {
      throw new Error('Invalid response format from API')
    }

    let aiResponse = result[0]?.generated_text || "I'm here to help with your health questions!"
    
    // Clean up the response
    aiResponse = aiResponse.replace(/^Health Assistant:\s*/, '').trim()
    
    if (!aiResponse) {
      aiResponse = "I'm here to help with your health questions! Could you please rephrase your question?"
    }

    // Add health disclaimer if the response seems to be medical advice
    const medicalTerms = ['diagnose', 'treatment', 'medicine', 'prescription', 'symptoms', 'disease', 'condition']
    const containsMedicalTerms = medicalTerms.some(term => 
      aiResponse.toLowerCase().includes(term) || message.toLowerCase().includes(term)
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
    return new Response(
      JSON.stringify({ 
        error: 'Sorry, I encountered an issue processing your request. Please try again.',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
