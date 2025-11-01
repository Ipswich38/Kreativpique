import { supabase } from '../supabase'
import type { Tables, TablesInsert, TablesUpdate } from '../database.types'
import type { AdAccount, AdCampaign, CreateCampaignRequest, CampaignUpdate } from '../ads/types'

export type DbAdAccount = Tables<'ad_accounts'>
export type DbAdCampaign = Tables<'ad_campaigns'>
export type AdAccountInsert = TablesInsert<'ad_accounts'>
export type AdCampaignInsert = TablesInsert<'ad_campaigns'>
export type AdAccountUpdate = TablesUpdate<'ad_accounts'>
export type AdCampaignUpdate = TablesUpdate<'ad_campaigns'>

export class AdsApiService {
  async getAdAccounts(agencyId: string): Promise<AdAccount[]> {
    try {
      const { data, error } = await supabase
        .from('ad_accounts')
        .select('*')
        .eq('agency_id', agencyId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching ad accounts:', error)
      throw error
    }
  }

  async getAdAccount(accountId: string): Promise<AdAccount | null> {
    try {
      const { data, error } = await supabase
        .from('ad_accounts')
        .select('*')
        .eq('id', accountId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching ad account:', error)
      throw error
    }
  }

  async createAdAccount(account: AdAccountInsert): Promise<AdAccount> {
    try {
      const { data, error } = await supabase
        .from('ad_accounts')
        .insert(account)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating ad account:', error)
      throw error
    }
  }

  async updateAdAccount(accountId: string, updates: AdAccountUpdate): Promise<AdAccount> {
    try {
      const { data, error } = await supabase
        .from('ad_accounts')
        .update(updates)
        .eq('id', accountId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating ad account:', error)
      throw error
    }
  }

  async deleteAdAccount(accountId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('ad_accounts')
        .delete()
        .eq('id', accountId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting ad account:', error)
      throw error
    }
  }

  async getAdCampaigns(agencyId: string, accountId?: string): Promise<AdCampaign[]> {
    try {
      let query = supabase
        .from('ad_campaigns')
        .select(`
          *,
          ad_accounts!inner(agency_id)
        `)
        .eq('ad_accounts.agency_id', agencyId)
        .order('created_at', { ascending: false })

      if (accountId) {
        query = query.eq('account_id', accountId)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching ad campaigns:', error)
      throw error
    }
  }

  async getAdCampaign(campaignId: string): Promise<AdCampaign | null> {
    try {
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select('*')
        .eq('id', campaignId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching ad campaign:', error)
      throw error
    }
  }

  async createAdCampaign(campaign: AdCampaignInsert): Promise<AdCampaign> {
    try {
      const { data, error } = await supabase
        .from('ad_campaigns')
        .insert(campaign)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating ad campaign:', error)
      throw error
    }
  }

  async updateAdCampaign(campaignId: string, updates: AdCampaignUpdate): Promise<AdCampaign> {
    try {
      const { data, error } = await supabase
        .from('ad_campaigns')
        .update(updates)
        .eq('id', campaignId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating ad campaign:', error)
      throw error
    }
  }

  async deleteAdCampaign(campaignId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('ad_campaigns')
        .delete()
        .eq('id', campaignId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting ad campaign:', error)
      throw error
    }
  }

  async getCampaignsByClient(clientId: string): Promise<AdCampaign[]> {
    try {
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching campaigns by client:', error)
      throw error
    }
  }

  async syncCampaignMetrics(campaignId: string, metrics: any): Promise<void> {
    try {
      const { error } = await supabase
        .from('ad_campaigns')
        .update({
          metrics_data: metrics,
          last_sync: new Date().toISOString()
        })
        .eq('id', campaignId)

      if (error) throw error
    } catch (error) {
      console.error('Error syncing campaign metrics:', error)
      throw error
    }
  }

  async getAccountsByPlatform(agencyId: string, platform: 'google_ads' | 'meta' | 'linkedin'): Promise<AdAccount[]> {
    try {
      const { data, error } = await supabase
        .from('ad_accounts')
        .select('*')
        .eq('agency_id', agencyId)
        .eq('platform', platform)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching accounts by platform:', error)
      throw error
    }
  }

  async getActiveCampaigns(agencyId: string): Promise<AdCampaign[]> {
    try {
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select(`
          *,
          ad_accounts!inner(agency_id)
        `)
        .eq('ad_accounts.agency_id', agencyId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching active campaigns:', error)
      throw error
    }
  }

  async updateAccountStatus(accountId: string, status: 'active' | 'disconnected' | 'error'): Promise<void> {
    try {
      const { error } = await supabase
        .from('ad_accounts')
        .update({
          status,
          last_sync: new Date().toISOString()
        })
        .eq('id', accountId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating account status:', error)
      throw error
    }
  }

  async getCampaignPerformance(agencyId: string, days: number = 30): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select(`
          id,
          name,
          platform,
          status,
          metrics_data,
          ad_accounts!inner(agency_id)
        `)
        .eq('ad_accounts.agency_id', agencyId)
        .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching campaign performance:', error)
      throw error
    }
  }

  async searchCampaigns(agencyId: string, query: string): Promise<AdCampaign[]> {
    try {
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select(`
          *,
          ad_accounts!inner(agency_id)
        `)
        .eq('ad_accounts.agency_id', agencyId)
        .ilike('name', `%${query}%`)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching campaigns:', error)
      throw error
    }
  }

  async bulkUpdateCampaigns(campaignIds: string[], updates: AdCampaignUpdate): Promise<void> {
    try {
      const { error } = await supabase
        .from('ad_campaigns')
        .update(updates)
        .in('id', campaignIds)

      if (error) throw error
    } catch (error) {
      console.error('Error bulk updating campaigns:', error)
      throw error
    }
  }
}

export const adsApiService = new AdsApiService()