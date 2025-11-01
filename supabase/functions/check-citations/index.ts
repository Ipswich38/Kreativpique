import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from 'https://esm.sh/openai@4'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.20.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CitationResult {
  mentioned: boolean
  position: number | null
  context: string
  sentiment: 'positive' | 'neutral' | 'negative'
  sentimentScore: number
  fullResponse: string
  url?: string
}

// AI Provider Classes
class OpenAIProvider {
  private client: OpenAI

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey })
  }

  async checkCitation(query: string, clientName: string): Promise<CitationResult> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: query }],
      temperature: 0.1,
    })

    const content = response.choices[0].message.content || ''
    return this.analyzeCitation(content, clientName)
  }

  private analyzeCitation(content: string, clientName: string): CitationResult {
    const lowerContent = content.toLowerCase()
    const lowerClientName = clientName.toLowerCase()

    const mentioned = lowerContent.includes(lowerClientName)

    let position: number | null = null
    if (mentioned) {
      const sentences = content.split(/[.!?]+/)
      for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].toLowerCase().includes(lowerClientName)) {
          position = i + 1
          break
        }
      }
    }

    const mentionIndex = lowerContent.indexOf(lowerClientName)
    let context = ''
    if (mentionIndex !== -1) {
      const start = Math.max(0, mentionIndex - 100)
      const end = Math.min(content.length, mentionIndex + lowerClientName.length + 100)
      context = content.substring(start, end)
    }

    const sentiment = this.calculateSentiment(context || content)
    const sentimentScore = this.calculateSentimentScore(sentiment)

    return {
      mentioned,
      position,
      context,
      sentiment,
      sentimentScore,
      fullResponse: content,
    }
  }

  private calculateSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['excellent', 'great', 'best', 'outstanding', 'recommended', 'top', 'premier', 'luxury', 'quality']
    const negativeWords = ['poor', 'bad', 'worst', 'terrible', 'avoid', 'disappointing', 'overpriced']

    const lowerText = text.toLowerCase()
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length

    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    return 'neutral'
  }

  private calculateSentimentScore(sentiment: 'positive' | 'neutral' | 'negative'): number {
    switch (sentiment) {
      case 'positive': return 0.7
      case 'negative': return -0.7
      default: return 0
    }
  }
}

class AnthropicProvider {
  private client: Anthropic

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey })
  }

  async checkCitation(query: string, clientName: string): Promise<CitationResult> {
    const message = await this.client.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      temperature: 0.1,
      messages: [{ role: 'user', content: query }],
    })

    const content = message.content[0].type === 'text' ? message.content[0].text : ''
    return this.analyzeCitation(content, clientName)
  }

  private analyzeCitation(content: string, clientName: string): CitationResult {
    const lowerContent = content.toLowerCase()
    const lowerClientName = clientName.toLowerCase()

    const mentioned = lowerContent.includes(lowerClientName)

    let position: number | null = null
    if (mentioned) {
      const sentences = content.split(/[.!?]+/)
      for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].toLowerCase().includes(lowerClientName)) {
          position = i + 1
          break
        }
      }
    }

    const mentionIndex = lowerContent.indexOf(lowerClientName)
    let context = ''
    if (mentionIndex !== -1) {
      const start = Math.max(0, mentionIndex - 100)
      const end = Math.min(content.length, mentionIndex + lowerClientName.length + 100)
      context = content.substring(start, end)
    }

    const sentiment = this.calculateSentiment(context || content)
    const sentimentScore = this.calculateSentimentScore(sentiment)

    return {
      mentioned,
      position,
      context,
      sentiment,
      sentimentScore,
      fullResponse: content,
    }
  }

  private calculateSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['excellent', 'great', 'best', 'outstanding', 'recommended', 'top', 'premier', 'luxury', 'quality']
    const negativeWords = ['poor', 'bad', 'worst', 'terrible', 'avoid', 'disappointing', 'overpriced']

    const lowerText = text.toLowerCase()
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length

    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    return 'neutral'
  }

  private calculateSentimentScore(sentiment: 'positive' | 'neutral' | 'negative'): number {
    switch (sentiment) {
      case 'positive': return 0.7
      case 'negative': return -0.7
      default: return 0
    }
  }
}

class PerplexityProvider {
  constructor(private apiKey: string) {}

  async checkCitation(query: string, clientName: string): Promise<CitationResult> {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'pplx-70b-online',
        messages: [{ role: 'user', content: query }],
        temperature: 0.1,
      }),
    })

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    return this.analyzeCitation(content, clientName)
  }

  private analyzeCitation(content: string, clientName: string): CitationResult {
    const lowerContent = content.toLowerCase()
    const lowerClientName = clientName.toLowerCase()

    const mentioned = lowerContent.includes(lowerClientName)

    let position: number | null = null
    if (mentioned) {
      const sentences = content.split(/[.!?]+/)
      for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].toLowerCase().includes(lowerClientName)) {
          position = i + 1
          break
        }
      }
    }

    const mentionIndex = lowerContent.indexOf(lowerClientName)
    let context = ''
    if (mentionIndex !== -1) {
      const start = Math.max(0, mentionIndex - 100)
      const end = Math.min(content.length, mentionIndex + lowerClientName.length + 100)
      context = content.substring(start, end)
    }

    const sentiment = this.calculateSentiment(context || content)
    const sentimentScore = this.calculateSentimentScore(sentiment)

    return {
      mentioned,
      position,
      context,
      sentiment,
      sentimentScore,
      fullResponse: content,
    }
  }

  private calculateSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['excellent', 'great', 'best', 'outstanding', 'recommended', 'top', 'premier', 'luxury', 'quality']
    const negativeWords = ['poor', 'bad', 'worst', 'terrible', 'avoid', 'disappointing', 'overpriced']

    const lowerText = text.toLowerCase()
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length

    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    return 'neutral'
  }

  private calculateSentimentScore(sentiment: 'positive' | 'neutral' | 'negative'): number {
    switch (sentiment) {
      case 'positive': return 0.7
      case 'negative': return -0.7
      default: return 0
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get API keys from environment
    const openaiKey = Deno.env.get('OPENAI_API_KEY')
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY')
    const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY')

    // Initialize providers
    const providers: Record<string, any> = {}
    if (openaiKey) providers.chatgpt = new OpenAIProvider(openaiKey)
    if (anthropicKey) providers.claude = new AnthropicProvider(anthropicKey)
    if (perplexityKey) providers.perplexity = new PerplexityProvider(perplexityKey)

    // Get queries that need to be checked
    const now = new Date()
    const { data: queries, error: queriesError } = await supabase
      .from('monitoring_queries')
      .select(`
        *,
        clients!inner(
          id,
          name,
          agency_id
        )
      `)
      .eq('is_active', true)
      .or(`next_check.is.null,next_check.lte.${now.toISOString()}`)

    if (queriesError) {
      throw new Error(`Failed to fetch queries: ${queriesError.message}`)
    }

    console.log(`Found ${queries?.length || 0} queries to check`)

    const results = []

    // Process each query
    for (const query of queries || []) {
      const client = query.clients

      // Check each platform for this query
      for (const platform of query.platforms) {
        const provider = providers[platform]
        if (!provider) {
          console.log(`Provider not available for platform: ${platform}`)
          continue
        }

        try {
          console.log(`Checking ${platform} for query: "${query.query}" (client: ${client.name})`)

          const result = await provider.checkCitation(query.query, client.name)

          // Only save citation if client was mentioned
          if (result.mentioned) {
            const { error: insertError } = await supabase
              .from('citations')
              .insert({
                client_id: client.id,
                query_id: query.id,
                platform: platform,
                query: query.query,
                position: result.position,
                context: result.context,
                full_response: result.fullResponse,
                sentiment: result.sentiment,
                sentiment_score: result.sentimentScore,
                url: result.url,
                detected_at: now.toISOString(),
              })

            if (insertError) {
              console.error(`Failed to insert citation:`, insertError)
            } else {
              console.log(`✅ Citation found: ${client.name} in ${platform} at position ${result.position}`)
              results.push({
                client: client.name,
                platform,
                position: result.position,
                sentiment: result.sentiment
              })
            }
          } else {
            console.log(`❌ No citation found for ${client.name} in ${platform}`)
          }

          // Add small delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 1000))

        } catch (error) {
          console.error(`Error checking ${platform} for query "${query.query}":`, error.message)
        }
      }

      // Update next check time based on frequency
      const nextCheck = new Date()
      switch (query.check_frequency) {
        case 'hourly':
          nextCheck.setHours(nextCheck.getHours() + 1)
          break
        case 'daily':
          nextCheck.setDate(nextCheck.getDate() + 1)
          break
        case 'weekly':
          nextCheck.setDate(nextCheck.getDate() + 7)
          break
      }

      // Update query with last_checked and next_check times
      await supabase
        .from('monitoring_queries')
        .update({
          last_checked: now.toISOString(),
          next_check: nextCheck.toISOString()
        })
        .eq('id', query.id)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${queries?.length || 0} queries`,
        citations_found: results.length,
        results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Citation check error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})