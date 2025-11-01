import { supabase } from '../supabase'
import type { Tables, TablesInsert, TablesUpdate } from '../database.types'

export type Client = Tables<'clients'>
export type ClientInsert = TablesInsert<'clients'>
export type ClientUpdate = TablesUpdate<'clients'>

export interface ClientWithStats extends Client {
  stats?: {
    total_citations: number
    citations_this_month: number
    avg_position: number
    top_platform: string
    sentiment_breakdown: {
      positive: number
      neutral: number
      negative: number
    }
  }
}

export class ClientsAPI {
  async getClients(filters?: {
    industry?: string
    is_active?: boolean
    sort?: 'name' | 'industry' | 'created_at'
    order?: 'asc' | 'desc'
    page?: number
    limit?: number
  }) {
    try {
      let query = supabase
        .from('clients')
        .select('*')
        .order(filters?.sort || 'created_at', { ascending: filters?.order === 'asc' })

      if (filters?.industry) {
        query = query.eq('industry', filters.industry)
      }

      if (filters?.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active)
      }

      const page = filters?.page || 1
      const limit = filters?.limit || 25
      const from = (page - 1) * limit
      const to = from + limit - 1

      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      return {
        data: data || [],
        count: count || 0,
        page,
        limit,
        total_pages: Math.ceil((count || 0) / limit)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
      throw error
    }
  }

  async getClientById(id: string): Promise<ClientWithStats | null> {
    try {
      const { data: client, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (!client) return null

      // Get client statistics
      const stats = await this.getClientStats(id)

      return {
        ...client,
        stats
      }
    } catch (error) {
      console.error('Error fetching client:', error)
      throw error
    }
  }

  async createClient(client: ClientInsert): Promise<Client> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert(client)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating client:', error)
      throw error
    }
  }

  async updateClient(id: string, updates: ClientUpdate): Promise<Client> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating client:', error)
      throw error
    }
  }

  async deleteClient(id: string): Promise<void> {
    try {
      // Soft delete by marking as inactive
      const { error } = await supabase
        .from('clients')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting client:', error)
      throw error
    }
  }

  private async getClientStats(clientId: string) {
    try {
      // Get total citations
      const { count: totalCitations } = await supabase
        .from('citations')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', clientId)

      // Get citations this month
      const thisMonth = new Date()
      thisMonth.setDate(1)
      thisMonth.setHours(0, 0, 0, 0)

      const { count: citationsThisMonth } = await supabase
        .from('citations')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', clientId)
        .gte('detected_at', thisMonth.toISOString())

      // Get average position
      const { data: positions } = await supabase
        .from('citations')
        .select('position')
        .eq('client_id', clientId)
        .not('position', 'is', null)

      const avgPosition = positions && positions.length > 0
        ? positions.reduce((sum, p) => sum + (p.position || 0), 0) / positions.length
        : 0

      // Get top platform
      const { data: platformCounts } = await supabase
        .from('citations')
        .select('platform')
        .eq('client_id', clientId)

      const platformMap = new Map<string, number>()
      platformCounts?.forEach(p => {
        platformMap.set(p.platform, (platformMap.get(p.platform) || 0) + 1)
      })

      const topPlatform = Array.from(platformMap.entries())
        .sort(([,a], [,b]) => b - a)[0]?.[0] || ''

      // Get sentiment breakdown
      const { data: sentiments } = await supabase
        .from('citations')
        .select('sentiment')
        .eq('client_id', clientId)

      const sentimentBreakdown = {
        positive: 0,
        neutral: 0,
        negative: 0
      }

      sentiments?.forEach(s => {
        if (s.sentiment) {
          sentimentBreakdown[s.sentiment as keyof typeof sentimentBreakdown]++
        }
      })

      return {
        total_citations: totalCitations || 0,
        citations_this_month: citationsThisMonth || 0,
        avg_position: Number(avgPosition.toFixed(1)),
        top_platform: topPlatform,
        sentiment_breakdown: sentimentBreakdown
      }
    } catch (error) {
      console.error('Error fetching client stats:', error)
      return {
        total_citations: 0,
        citations_this_month: 0,
        avg_position: 0,
        top_platform: '',
        sentiment_breakdown: {
          positive: 0,
          neutral: 0,
          negative: 0
        }
      }
    }
  }

  async getClientsByAgency(agencyId: string) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('agency_id', agencyId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching agency clients:', error)
      throw error
    }
  }

  async searchClients(query: string) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .or(`name.ilike.%${query}%,website.ilike.%${query}%,industry.ilike.%${query}%`)
        .eq('is_active', true)
        .limit(10)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching clients:', error)
      throw error
    }
  }
}

export const clientsAPI = new ClientsAPI()