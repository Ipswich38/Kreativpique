import { supabase } from '../supabase'
import type { Tables, TablesInsert, TablesUpdate } from '../database.types'

export type MonitoringQuery = Tables<'monitoring_queries'>
export type MonitoringQueryInsert = TablesInsert<'monitoring_queries'>
export type MonitoringQueryUpdate = TablesUpdate<'monitoring_queries'>

export interface QueryWithStats extends MonitoringQuery {
  stats?: {
    total_citations: number
    avg_position: number
    last_citation: string | null
  }
}

export class QueriesAPI {
  async getQueriesByClient(clientId: string): Promise<QueryWithStats[]> {
    try {
      const { data, error } = await supabase
        .from('monitoring_queries')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })

      if (error) throw error

      const queries = data || []

      // Get stats for each query
      const queriesWithStats = await Promise.all(
        queries.map(async (query) => {
          const stats = await this.getQueryStats(query.id)
          return { ...query, stats }
        })
      )

      return queriesWithStats
    } catch (error) {
      console.error('Error fetching client queries:', error)
      throw error
    }
  }

  async createQuery(query: MonitoringQueryInsert): Promise<MonitoringQuery> {
    try {
      // Calculate next check time based on frequency
      const nextCheck = this.calculateNextCheck(query.check_frequency || 'daily')

      const { data, error } = await supabase
        .from('monitoring_queries')
        .insert({
          ...query,
          next_check: nextCheck.toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating query:', error)
      throw error
    }
  }

  async updateQuery(id: string, updates: MonitoringQueryUpdate): Promise<MonitoringQuery> {
    try {
      // If frequency is being updated, recalculate next check time
      if (updates.check_frequency) {
        updates.next_check = this.calculateNextCheck(updates.check_frequency).toISOString()
      }

      const { data, error } = await supabase
        .from('monitoring_queries')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating query:', error)
      throw error
    }
  }

  async deleteQuery(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('monitoring_queries')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting query:', error)
      throw error
    }
  }

  async toggleQueryStatus(id: string, isActive: boolean): Promise<MonitoringQuery> {
    try {
      const updates: MonitoringQueryUpdate = { is_active: isActive }

      // If activating, set next check time
      if (isActive) {
        const { data: query } = await supabase
          .from('monitoring_queries')
          .select('check_frequency')
          .eq('id', id)
          .single()

        if (query) {
          updates.next_check = this.calculateNextCheck(query.check_frequency).toISOString()
        }
      }

      const { data, error } = await supabase
        .from('monitoring_queries')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error toggling query status:', error)
      throw error
    }
  }

  async getActiveQueries(): Promise<MonitoringQuery[]> {
    try {
      const { data, error } = await supabase
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
        .order('priority', { ascending: false })
        .order('next_check', { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching active queries:', error)
      throw error
    }
  }

  async getQueriesDueForCheck(): Promise<MonitoringQuery[]> {
    try {
      const now = new Date().toISOString()

      const { data, error } = await supabase
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
        .or(`next_check.is.null,next_check.lte.${now}`)
        .order('priority', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching queries due for check:', error)
      throw error
    }
  }

  private async getQueryStats(queryId: string) {
    try {
      // Get total citations for this query
      const { count: totalCitations } = await supabase
        .from('citations')
        .select('*', { count: 'exact', head: true })
        .eq('query_id', queryId)

      // Get average position
      const { data: positions } = await supabase
        .from('citations')
        .select('position')
        .eq('query_id', queryId)
        .not('position', 'is', null)

      const avgPosition = positions && positions.length > 0
        ? positions.reduce((sum, p) => sum + (p.position || 0), 0) / positions.length
        : 0

      // Get last citation date
      const { data: lastCitation } = await supabase
        .from('citations')
        .select('detected_at')
        .eq('query_id', queryId)
        .order('detected_at', { ascending: false })
        .limit(1)
        .single()

      return {
        total_citations: totalCitations || 0,
        avg_position: Number(avgPosition.toFixed(1)),
        last_citation: lastCitation?.detected_at || null
      }
    } catch (error) {
      console.error('Error fetching query stats:', error)
      return {
        total_citations: 0,
        avg_position: 0,
        last_citation: null
      }
    }
  }

  private calculateNextCheck(frequency: 'hourly' | 'daily' | 'weekly'): Date {
    const now = new Date()

    switch (frequency) {
      case 'hourly':
        now.setHours(now.getHours() + 1)
        break
      case 'daily':
        now.setDate(now.getDate() + 1)
        break
      case 'weekly':
        now.setDate(now.getDate() + 7)
        break
    }

    return now
  }

  async bulkUpdateQueries(queryIds: string[], updates: MonitoringQueryUpdate): Promise<void> {
    try {
      const { error } = await supabase
        .from('monitoring_queries')
        .update(updates)
        .in('id', queryIds)

      if (error) throw error
    } catch (error) {
      console.error('Error bulk updating queries:', error)
      throw error
    }
  }

  async getQueryPerformance(queryId: string, days = 30) {
    try {
      const sinceDate = new Date()
      sinceDate.setDate(sinceDate.getDate() - days)

      const { data, error } = await supabase
        .from('citations')
        .select('detected_at, position, sentiment, platform')
        .eq('query_id', queryId)
        .gte('detected_at', sinceDate.toISOString())
        .order('detected_at', { ascending: true })

      if (error) throw error

      return this.processPerformanceData(data || [])
    } catch (error) {
      console.error('Error fetching query performance:', error)
      throw error
    }
  }

  private processPerformanceData(citations: any[]) {
    const dailyData = new Map<string, { count: number; positions: number[]; sentiments: string[] }>()

    citations.forEach(citation => {
      const date = new Date(citation.detected_at).toISOString().split('T')[0]
      const existing = dailyData.get(date) || { count: 0, positions: [], sentiments: [] }

      existing.count++
      if (citation.position) existing.positions.push(citation.position)
      if (citation.sentiment) existing.sentiments.push(citation.sentiment)

      dailyData.set(date, existing)
    })

    return Array.from(dailyData.entries()).map(([date, data]) => ({
      date,
      citations: data.count,
      avg_position: data.positions.length > 0
        ? data.positions.reduce((sum, p) => sum + p, 0) / data.positions.length
        : null,
      sentiment_score: this.calculateSentimentScore(data.sentiments)
    }))
  }

  private calculateSentimentScore(sentiments: string[]): number {
    if (sentiments.length === 0) return 0

    const scores = sentiments.map(sentiment => {
      switch (sentiment) {
        case 'positive': return 1
        case 'negative': return -1
        default: return 0
      }
    })

    return scores.reduce((sum, score) => sum + score, 0) / scores.length
  }
}

export const queriesAPI = new QueriesAPI()