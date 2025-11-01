import { supabase } from '../supabase'
import type { Tables, TablesInsert } from '../database.types'

export type Citation = Tables<'citations'>
export type CitationInsert = TablesInsert<'citations'>

export interface CitationWithClient extends Citation {
  clients: {
    id: string
    name: string
    industry: string
  }
}

export interface CitationFilters {
  client_id?: string
  platform?: 'chatgpt' | 'claude' | 'perplexity' | 'gemini'
  sentiment?: 'positive' | 'neutral' | 'negative'
  date_from?: string
  date_to?: string
  page?: number
  limit?: number
}

export interface CitationAnalytics {
  total_citations: number
  platform_distribution: Record<string, number>
  sentiment_breakdown: Record<string, number>
  avg_position: number
  trend_data: Array<{ date: string; count: number }>
  top_queries: Array<{ query: string; citations: number; avg_position: number }>
}

export class CitationsAPI {
  async getCitations(filters: CitationFilters = {}) {
    try {
      let query = supabase
        .from('citations')
        .select(`
          *,
          clients!inner(
            id,
            name,
            industry
          )
        `)
        .order('detected_at', { ascending: false })

      if (filters.client_id) {
        query = query.eq('client_id', filters.client_id)
      }

      if (filters.platform) {
        query = query.eq('platform', filters.platform)
      }

      if (filters.sentiment) {
        query = query.eq('sentiment', filters.sentiment)
      }

      if (filters.date_from) {
        query = query.gte('detected_at', filters.date_from)
      }

      if (filters.date_to) {
        query = query.lte('detected_at', filters.date_to)
      }

      const page = filters.page || 1
      const limit = filters.limit || 50
      const from = (page - 1) * limit
      const to = from + limit - 1

      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      return {
        data: data as CitationWithClient[] || [],
        count: count || 0,
        page,
        limit,
        total_pages: Math.ceil((count || 0) / limit)
      }
    } catch (error) {
      console.error('Error fetching citations:', error)
      throw error
    }
  }

  async getCitationById(id: string): Promise<CitationWithClient | null> {
    try {
      const { data, error } = await supabase
        .from('citations')
        .select(`
          *,
          clients!inner(
            id,
            name,
            industry
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return data as CitationWithClient
    } catch (error) {
      console.error('Error fetching citation:', error)
      throw error
    }
  }

  async getAnalytics(filters: Omit<CitationFilters, 'page' | 'limit'> = {}): Promise<CitationAnalytics> {
    try {
      // Build base query
      let baseQuery = supabase.from('citations').select('*')

      if (filters.client_id) {
        baseQuery = baseQuery.eq('client_id', filters.client_id)
      }

      if (filters.platform) {
        baseQuery = baseQuery.eq('platform', filters.platform)
      }

      if (filters.sentiment) {
        baseQuery = baseQuery.eq('sentiment', filters.sentiment)
      }

      if (filters.date_from) {
        baseQuery = baseQuery.gte('detected_at', filters.date_from)
      }

      if (filters.date_to) {
        baseQuery = baseQuery.lte('detected_at', filters.date_to)
      }

      const { data: citations, error } = await baseQuery

      if (error) throw error

      const citationsData = citations || []

      // Calculate analytics
      const totalCitations = citationsData.length

      // Platform distribution
      const platformDistribution: Record<string, number> = {}
      citationsData.forEach(citation => {
        platformDistribution[citation.platform] = (platformDistribution[citation.platform] || 0) + 1
      })

      // Sentiment breakdown
      const sentimentBreakdown: Record<string, number> = {}
      citationsData.forEach(citation => {
        if (citation.sentiment) {
          sentimentBreakdown[citation.sentiment] = (sentimentBreakdown[citation.sentiment] || 0) + 1
        }
      })

      // Average position
      const positionsWithValues = citationsData.filter(c => c.position !== null)
      const avgPosition = positionsWithValues.length > 0
        ? positionsWithValues.reduce((sum, c) => sum + (c.position || 0), 0) / positionsWithValues.length
        : 0

      // Trend data (daily counts for the last 30 days)
      const trendData = this.calculateTrendData(citationsData)

      // Top queries
      const topQueries = this.calculateTopQueries(citationsData)

      return {
        total_citations: totalCitations,
        platform_distribution: platformDistribution,
        sentiment_breakdown: sentimentBreakdown,
        avg_position: Number(avgPosition.toFixed(1)),
        trend_data: trendData,
        top_queries: topQueries
      }
    } catch (error) {
      console.error('Error fetching citation analytics:', error)
      throw error
    }
  }

  private calculateTrendData(citations: Citation[]): Array<{ date: string; count: number }> {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split('T')[0]
    }).reverse()

    const dailyCounts: Record<string, number> = {}

    citations.forEach(citation => {
      const date = new Date(citation.detected_at).toISOString().split('T')[0]
      dailyCounts[date] = (dailyCounts[date] || 0) + 1
    })

    return last30Days.map(date => ({
      date,
      count: dailyCounts[date] || 0
    }))
  }

  private calculateTopQueries(citations: Citation[]): Array<{ query: string; citations: number; avg_position: number }> {
    const queryMap = new Map<string, { count: number; positions: number[] }>()

    citations.forEach(citation => {
      const existing = queryMap.get(citation.query) || { count: 0, positions: [] }
      existing.count++
      if (citation.position !== null) {
        existing.positions.push(citation.position)
      }
      queryMap.set(citation.query, existing)
    })

    return Array.from(queryMap.entries())
      .map(([query, { count, positions }]) => ({
        query,
        citations: count,
        avg_position: positions.length > 0
          ? Number((positions.reduce((sum, p) => sum + p, 0) / positions.length).toFixed(1))
          : 0
      }))
      .sort((a, b) => b.citations - a.citations)
      .slice(0, 10)
  }

  async createCitation(citation: CitationInsert): Promise<Citation> {
    try {
      const { data, error } = await supabase
        .from('citations')
        .insert(citation)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating citation:', error)
      throw error
    }
  }

  async getRecentCitations(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('citations')
        .select(`
          *,
          clients!inner(
            id,
            name,
            industry
          )
        `)
        .order('detected_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data as CitationWithClient[] || []
    } catch (error) {
      console.error('Error fetching recent citations:', error)
      throw error
    }
  }

  async getCitationsByClient(clientId: string, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('citations')
        .select('*')
        .eq('client_id', clientId)
        .order('detected_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching client citations:', error)
      throw error
    }
  }

  async getTopPerformingClients(limit = 5) {
    try {
      // This would ideally be done with a database view or function
      // For now, we'll get all citations and group by client
      const { data: citations, error } = await supabase
        .from('citations')
        .select(`
          client_id,
          clients!inner(
            id,
            name,
            industry
          )
        `)

      if (error) throw error

      const clientCounts = new Map<string, { client: any; count: number }>()

      citations?.forEach(citation => {
        const clientId = citation.client_id
        const existing = clientCounts.get(clientId)
        if (existing) {
          existing.count++
        } else {
          clientCounts.set(clientId, { client: citation.clients, count: 1 })
        }
      })

      return Array.from(clientCounts.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
        .map(({ client, count }) => ({
          ...client,
          citation_count: count
        }))
    } catch (error) {
      console.error('Error fetching top performing clients:', error)
      throw error
    }
  }
}

export const citationsAPI = new CitationsAPI()