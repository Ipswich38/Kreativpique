import { supabase } from '../supabase'
import type { Tables, TablesInsert, TablesUpdate } from '../database.types'

export type AdCampaign = Tables<'ad_campaigns'>
export type AdCampaignInsert = TablesInsert<'ad_campaigns'>
export type AdCampaignUpdate = TablesUpdate<'ad_campaigns'>

export interface CampaignMetrics {
  impressions: number
  clicks: number
  conversions: number
  spent: number
  ctr: number // Click-through rate
  cpc: number // Cost per click
  cpm: number // Cost per mille
  roas: number // Return on ad spend
}

export interface AdAccountConnection {
  id: string
  platform: 'google' | 'meta' | 'linkedin'
  account_id: string
  account_name: string
  access_token: string
  refresh_token?: string
  expires_at?: string
  is_active: boolean
  last_synced?: string
}

export abstract class AdPlatformService {
  abstract platform: 'google' | 'meta' | 'linkedin'

  abstract authenticate(credentials: any): Promise<AdAccountConnection>
  abstract refreshToken(connection: AdAccountConnection): Promise<AdAccountConnection>
  abstract getAccounts(connection: AdAccountConnection): Promise<Array<{ id: string; name: string }>>
  abstract getCampaigns(connection: AdAccountConnection, accountId?: string): Promise<AdCampaign[]>
  abstract getCampaignMetrics(connection: AdAccountConnection, campaignId: string, dateRange: { start: string; end: string }): Promise<CampaignMetrics>
  abstract createCampaign(connection: AdAccountConnection, campaign: Partial<AdCampaignInsert>): Promise<AdCampaign>
  abstract updateCampaign(connection: AdAccountConnection, campaignId: string, updates: Partial<AdCampaignUpdate>): Promise<AdCampaign>
  abstract pauseCampaign(connection: AdAccountConnection, campaignId: string): Promise<void>
  abstract resumeCampaign(connection: AdAccountConnection, campaignId: string): Promise<void>
}

// Google Ads Service
export class GoogleAdsService extends AdPlatformService {
  platform: 'google' = 'google'

  async authenticate(credentials: {
    client_id: string
    client_secret: string
    refresh_token: string
    developer_token: string
  }): Promise<AdAccountConnection> {
    try {
      // In a real implementation, you would use the Google Ads API SDK
      // This is a simplified version for demonstration

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
          refresh_token: credentials.refresh_token,
          grant_type: 'refresh_token'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to authenticate with Google Ads')
      }

      const data = await response.json()

      return {
        id: `google_${Date.now()}`,
        platform: 'google',
        account_id: 'default',
        account_name: 'Google Ads Account',
        access_token: data.access_token,
        refresh_token: credentials.refresh_token,
        expires_at: new Date(Date.now() + data.expires_in * 1000).toISOString(),
        is_active: true,
        last_synced: new Date().toISOString()
      }
    } catch (error) {
      console.error('Google Ads authentication error:', error)
      throw error
    }
  }

  async refreshToken(connection: AdAccountConnection): Promise<AdAccountConnection> {
    // Implementation for refreshing Google Ads tokens
    return connection
  }

  async getAccounts(connection: AdAccountConnection): Promise<Array<{ id: string; name: string }>> {
    // Implementation for fetching Google Ads accounts
    return [
      { id: 'account_1', name: 'Main Account' },
      { id: 'account_2', name: 'Secondary Account' }
    ]
  }

  async getCampaigns(connection: AdAccountConnection, accountId?: string): Promise<AdCampaign[]> {
    // Mock implementation - in production, use Google Ads API
    return [
      {
        id: 'google_campaign_1',
        client_id: 'mock_client_id',
        name: 'Search Campaign - Luxury Hotels',
        platform: 'google',
        campaign_type: 'search',
        external_id: 'gads_12345',
        budget: 5000,
        spent: 2350,
        impressions: 45000,
        clicks: 892,
        conversions: 23,
        status: 'active',
        start_date: new Date('2025-01-01').toISOString(),
        end_date: null,
        keywords: ['luxury hotels Dubai', 'premium accommodation UAE'],
        last_synced: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }

  async getCampaignMetrics(
    connection: AdAccountConnection,
    campaignId: string,
    dateRange: { start: string; end: string }
  ): Promise<CampaignMetrics> {
    // Mock implementation
    return {
      impressions: 45000,
      clicks: 892,
      conversions: 23,
      spent: 2350,
      ctr: 1.98,
      cpc: 2.63,
      cpm: 52.22,
      roas: 4.2
    }
  }

  async createCampaign(connection: AdAccountConnection, campaign: Partial<AdCampaignInsert>): Promise<AdCampaign> {
    throw new Error('Campaign creation not implemented for Google Ads')
  }

  async updateCampaign(connection: AdAccountConnection, campaignId: string, updates: Partial<AdCampaignUpdate>): Promise<AdCampaign> {
    throw new Error('Campaign update not implemented for Google Ads')
  }

  async pauseCampaign(connection: AdAccountConnection, campaignId: string): Promise<void> {
    // Implementation for pausing Google Ads campaigns
    console.log(`Pausing Google Ads campaign: ${campaignId}`)
  }

  async resumeCampaign(connection: AdAccountConnection, campaignId: string): Promise<void> {
    // Implementation for resuming Google Ads campaigns
    console.log(`Resuming Google Ads campaign: ${campaignId}`)
  }
}

// Meta Ads Service
export class MetaAdsService extends AdPlatformService {
  platform: 'meta' = 'meta'

  async authenticate(credentials: {
    access_token: string
    app_id: string
    app_secret: string
  }): Promise<AdAccountConnection> {
    try {
      // Verify the access token
      const response = await fetch(`https://graph.facebook.com/me?access_token=${credentials.access_token}`)

      if (!response.ok) {
        throw new Error('Invalid Meta access token')
      }

      const userData = await response.json()

      return {
        id: `meta_${Date.now()}`,
        platform: 'meta',
        account_id: userData.id,
        account_name: userData.name || 'Meta Ad Account',
        access_token: credentials.access_token,
        is_active: true,
        last_synced: new Date().toISOString()
      }
    } catch (error) {
      console.error('Meta Ads authentication error:', error)
      throw error
    }
  }

  async refreshToken(connection: AdAccountConnection): Promise<AdAccountConnection> {
    // Meta tokens are typically long-lived, refresh logic would go here
    return connection
  }

  async getAccounts(connection: AdAccountConnection): Promise<Array<{ id: string; name: string }>> {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/me/adaccounts?access_token=${connection.access_token}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch Meta ad accounts')
      }

      const data = await response.json()

      return data.data.map((account: any) => ({
        id: account.id,
        name: account.name
      }))
    } catch (error) {
      console.error('Error fetching Meta ad accounts:', error)
      return []
    }
  }

  async getCampaigns(connection: AdAccountConnection, accountId?: string): Promise<AdCampaign[]> {
    // Mock implementation - in production, use Meta Marketing API
    return [
      {
        id: 'meta_campaign_1',
        client_id: 'mock_client_id',
        name: 'Social Campaign - Luxury Travel',
        platform: 'meta',
        campaign_type: 'social',
        external_id: 'meta_67890',
        budget: 3000,
        spent: 1890,
        impressions: 125000,
        clicks: 2340,
        conversions: 45,
        status: 'active',
        start_date: new Date('2025-01-01').toISOString(),
        end_date: null,
        keywords: ['luxury travel', 'premium experiences'],
        last_synced: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }

  async getCampaignMetrics(
    connection: AdAccountConnection,
    campaignId: string,
    dateRange: { start: string; end: string }
  ): Promise<CampaignMetrics> {
    // Mock implementation
    return {
      impressions: 125000,
      clicks: 2340,
      conversions: 45,
      spent: 1890,
      ctr: 1.87,
      cpc: 0.81,
      cpm: 15.12,
      roas: 3.8
    }
  }

  async createCampaign(connection: AdAccountConnection, campaign: Partial<AdCampaignInsert>): Promise<AdCampaign> {
    throw new Error('Campaign creation not implemented for Meta Ads')
  }

  async updateCampaign(connection: AdAccountConnection, campaignId: string, updates: Partial<AdCampaignUpdate>): Promise<AdCampaign> {
    throw new Error('Campaign update not implemented for Meta Ads')
  }

  async pauseCampaign(connection: AdAccountConnection, campaignId: string): Promise<void> {
    console.log(`Pausing Meta campaign: ${campaignId}`)
  }

  async resumeCampaign(connection: AdAccountConnection, campaignId: string): Promise<void> {
    console.log(`Resuming Meta campaign: ${campaignId}`)
  }
}

// LinkedIn Ads Service
export class LinkedInAdsService extends AdPlatformService {
  platform: 'linkedin' = 'linkedin'

  async authenticate(credentials: {
    access_token: string
    client_id: string
    client_secret: string
  }): Promise<AdAccountConnection> {
    try {
      // Verify the access token
      const response = await fetch('https://api.linkedin.com/v2/people/~', {
        headers: {
          'Authorization': `Bearer ${credentials.access_token}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      })

      if (!response.ok) {
        throw new Error('Invalid LinkedIn access token')
      }

      const userData = await response.json()

      return {
        id: `linkedin_${Date.now()}`,
        platform: 'linkedin',
        account_id: userData.id,
        account_name: 'LinkedIn Ad Account',
        access_token: credentials.access_token,
        is_active: true,
        last_synced: new Date().toISOString()
      }
    } catch (error) {
      console.error('LinkedIn Ads authentication error:', error)
      throw error
    }
  }

  async refreshToken(connection: AdAccountConnection): Promise<AdAccountConnection> {
    // LinkedIn token refresh logic would go here
    return connection
  }

  async getAccounts(connection: AdAccountConnection): Promise<Array<{ id: string; name: string }>> {
    // Implementation for fetching LinkedIn ad accounts
    return [
      { id: 'linkedin_account_1', name: 'Main LinkedIn Account' }
    ]
  }

  async getCampaigns(connection: AdAccountConnection, accountId?: string): Promise<AdCampaign[]> {
    // Mock implementation
    return [
      {
        id: 'linkedin_campaign_1',
        client_id: 'mock_client_id',
        name: 'Professional Services Campaign',
        platform: 'linkedin',
        campaign_type: 'social',
        external_id: 'li_54321',
        budget: 2000,
        spent: 750,
        impressions: 35000,
        clicks: 450,
        conversions: 12,
        status: 'active',
        start_date: new Date('2025-01-01').toISOString(),
        end_date: null,
        keywords: ['professional services', 'B2B consulting'],
        last_synced: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }

  async getCampaignMetrics(
    connection: AdAccountConnection,
    campaignId: string,
    dateRange: { start: string; end: string }
  ): Promise<CampaignMetrics> {
    // Mock implementation
    return {
      impressions: 35000,
      clicks: 450,
      conversions: 12,
      spent: 750,
      ctr: 1.29,
      cpc: 1.67,
      cpm: 21.43,
      roas: 5.2
    }
  }

  async createCampaign(connection: AdAccountConnection, campaign: Partial<AdCampaignInsert>): Promise<AdCampaign> {
    throw new Error('Campaign creation not implemented for LinkedIn Ads')
  }

  async updateCampaign(connection: AdAccountConnection, campaignId: string, updates: Partial<AdCampaignUpdate>): Promise<AdCampaign> {
    throw new Error('Campaign update not implemented for LinkedIn Ads')
  }

  async pauseCampaign(connection: AdAccountConnection, campaignId: string): Promise<void> {
    console.log(`Pausing LinkedIn campaign: ${campaignId}`)
  }

  async resumeCampaign(connection: AdAccountConnection, campaignId: string): Promise<void> {
    console.log(`Resuming LinkedIn campaign: ${campaignId}`)
  }
}

// Main Ads Management Service
export class AdsManagementService {
  private services: Map<string, AdPlatformService> = new Map()

  constructor() {
    this.services.set('google', new GoogleAdsService())
    this.services.set('meta', new MetaAdsService())
    this.services.set('linkedin', new LinkedInAdsService())
  }

  getService(platform: 'google' | 'meta' | 'linkedin'): AdPlatformService {
    const service = this.services.get(platform)
    if (!service) {
      throw new Error(`Unsupported platform: ${platform}`)
    }
    return service
  }

  async connectAccount(
    platform: 'google' | 'meta' | 'linkedin',
    credentials: any,
    agencyId: string
  ): Promise<AdAccountConnection> {
    const service = this.getService(platform)
    const connection = await service.authenticate(credentials)

    // Store connection in database (encrypted)
    await this.storeConnection(connection, agencyId)

    return connection
  }

  async syncCampaigns(agencyId: string, clientId?: string): Promise<AdCampaign[]> {
    try {
      const connections = await this.getStoredConnections(agencyId)
      const allCampaigns: AdCampaign[] = []

      for (const connection of connections) {
        if (!connection.is_active) continue

        try {
          const service = this.getService(connection.platform)
          const campaigns = await service.getCampaigns(connection)

          // Store campaigns in database
          for (const campaign of campaigns) {
            if (clientId) {
              campaign.client_id = clientId
            }

            const { data: existingCampaign } = await supabase
              .from('ad_campaigns')
              .select('id')
              .eq('external_id', campaign.external_id)
              .single()

            if (existingCampaign) {
              // Update existing campaign
              await supabase
                .from('ad_campaigns')
                .update({
                  ...campaign,
                  last_synced: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                })
                .eq('id', existingCampaign.id)
            } else {
              // Create new campaign
              await supabase
                .from('ad_campaigns')
                .insert({
                  ...campaign,
                  last_synced: new Date().toISOString()
                })
            }

            allCampaigns.push(campaign)
          }

          // Update connection last sync time
          await this.updateConnectionSyncTime(connection.id)

        } catch (error) {
          console.error(`Failed to sync campaigns for ${connection.platform}:`, error)
        }
      }

      return allCampaigns
    } catch (error) {
      console.error('Error syncing campaigns:', error)
      throw error
    }
  }

  async getCampaignMetrics(
    campaignId: string,
    dateRange: { start: string; end: string }
  ): Promise<CampaignMetrics | null> {
    try {
      // Get campaign details
      const { data: campaign, error } = await supabase
        .from('ad_campaigns')
        .select('*')
        .eq('id', campaignId)
        .single()

      if (error || !campaign) {
        throw new Error('Campaign not found')
      }

      // Get connection for this platform
      const { data: apiKey } = await supabase
        .from('api_keys')
        .select('*')
        .eq('service', campaign.platform)
        .eq('is_active', true)
        .single()

      if (!apiKey) {
        throw new Error(`No active connection found for ${campaign.platform}`)
      }

      // Mock connection object
      const connection: AdAccountConnection = {
        id: apiKey.id,
        platform: campaign.platform as 'google' | 'meta' | 'linkedin',
        account_id: 'mock',
        account_name: 'Mock Account',
        access_token: 'mock_token',
        is_active: true
      }

      const service = this.getService(campaign.platform as 'google' | 'meta' | 'linkedin')
      return await service.getCampaignMetrics(connection, campaign.external_id || campaignId, dateRange)

    } catch (error) {
      console.error('Error fetching campaign metrics:', error)
      return null
    }
  }

  private async storeConnection(connection: AdAccountConnection, agencyId: string): Promise<void> {
    // In production, encrypt the access token before storing
    await supabase
      .from('api_keys')
      .insert({
        agency_id: agencyId,
        service: connection.platform,
        encrypted_key: connection.access_token, // Should be encrypted
        is_active: true
      })
  }

  private async getStoredConnections(agencyId: string): Promise<AdAccountConnection[]> {
    const { data: apiKeys } = await supabase
      .from('api_keys')
      .select('*')
      .eq('agency_id', agencyId)
      .eq('is_active', true)
      .in('service', ['google', 'meta', 'linkedin'])

    return (apiKeys || []).map(key => ({
      id: key.id,
      platform: key.service as 'google' | 'meta' | 'linkedin',
      account_id: 'stored',
      account_name: `${key.service} Account`,
      access_token: key.encrypted_key, // Should be decrypted
      is_active: key.is_active,
      last_synced: key.last_used
    }))
  }

  private async updateConnectionSyncTime(connectionId: string): Promise<void> {
    await supabase
      .from('api_keys')
      .update({ last_used: new Date().toISOString() })
      .eq('id', connectionId)
  }
}

export const adsManagementService = new AdsManagementService()