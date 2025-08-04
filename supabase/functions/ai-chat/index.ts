
import "https://deno.land/x/xhr@0.1.0/mod.ts"
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
    const apiKey = Deno.env.get('OPENAI_API_KEY')
    
    if (!apiKey) {
      console.error('OPENAI_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Sending message to OpenAI API:', message.substring(0, 100) + '...')

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI health assistant. You provide general health information and wellness tips, but you cannot diagnose medical conditions or replace professional medical advice. Always remind users to consult healthcare providers for medical concerns. Keep responses concise and helpful.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const result = await response.json()
    console.log('OpenAI API response received')

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
