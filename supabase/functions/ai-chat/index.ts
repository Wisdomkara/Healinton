
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

    // Using Hugging Face's free inference API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        headers: {
          'Authorization': 'Bearer hf_GQHJKlMNoPQRSTUVWXYZabcdefghijklmn',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: `Health question: ${message}`,
          parameters: {
            max_length: 150,
            temperature: 0.7,
            do_sample: true,
          }
        }),
      }
    )

    if (!response.ok) {
      // Fallback to a simple health response generator
      const healthResponses = [
        "For health concerns, I recommend consulting with your healthcare provider for personalized advice.",
        "Maintaining a balanced diet and regular exercise are fundamental to good health.",
        "If you're experiencing symptoms, please keep track of them and discuss with your doctor.",
        "Remember to take medications as prescribed and follow up with your healthcare team regularly.",
        "Stress management through relaxation techniques can benefit your overall well-being.",
        "Stay hydrated and get adequate sleep to support your body's natural healing processes."
      ];
      
      const randomResponse = healthResponses[Math.floor(Math.random() * healthResponses.length)];
      
      return new Response(
        JSON.stringify({ 
          response: randomResponse,
          source: 'fallback'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    const data = await response.json()
    let aiResponse = data.generated_text || data[0]?.generated_text || "I'm here to help with your health questions. Could you provide more details?"

    // Clean up the response
    aiResponse = aiResponse.replace(/Health question: .+?\n?/, '').trim()

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        source: 'ai'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error('AI Chat Error:', error)
    return new Response(
      JSON.stringify({ 
        response: "I'm having trouble processing your request right now. For urgent health matters, please contact your healthcare provider directly.",
        source: 'error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
