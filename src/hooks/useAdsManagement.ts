import { useState, useEffect } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { adsManagementService } from '../lib/ads/service'
import type { AdAccount, AdCampaign, AdMetrics, CreateCampaignRequest, CampaignUpdate } from '../lib/ads/types'

export interface AdsData {
  accounts: AdAccount[]
  campaigns: AdCampaign[]
  metrics: Record<string, AdMetrics>
}

export function useAdsManagement() {
  const [data, setData] = useState<AdsData>({
    accounts: [],
    campaigns: [],
    metrics: {}
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuthContext()

  const fetchAccountsAndCampaigns = async () => {
    if (!user?.agency) return

    try {
      setLoading(true)
      setError(null)

      const accounts = await adsManagementService.getConnectedAccounts(user.agency.id)
      const campaigns = await adsManagementService.getCampaigns(user.agency.id)

      setData(prev => ({
        ...prev,
        accounts,
        campaigns
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ads data')
    } finally {
      setLoading(false)
    }
  }

  const fetchMetrics = async (campaignIds: string[] = []) => {
    if (!user?.agency) return

    try {
      const ids = campaignIds.length > 0 ? campaignIds : data.campaigns.map(c => c.id)
      const metrics = await adsManagementService.getCampaignMetrics(user.agency.id, ids)

      setData(prev => ({
        ...prev,
        metrics
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics')
    }
  }

  useEffect(() => {
    fetchAccountsAndCampaigns()
  }, [user?.agency])

  const connectAccount = async (platform: 'google_ads' | 'meta' | 'linkedin', accessToken: string, accountId?: string) => {
    if (!user?.agency) throw new Error('No agency found')

    try {
      setLoading(true)
      await adsManagementService.connectAccount(user.agency.id, platform, accessToken, accountId)
      await fetchAccountsAndCampaigns()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect account')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const disconnectAccount = async (accountId: string) => {
    if (!user?.agency) throw new Error('No agency found')

    try {
      setLoading(true)
      await adsManagementService.disconnectAccount(user.agency.id, accountId)
      await fetchAccountsAndCampaigns()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect account')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createCampaign = async (campaignData: CreateCampaignRequest) => {
    if (!user?.agency) throw new Error('No agency found')

    try {
      setLoading(true)
      const campaign = await adsManagementService.createCampaign(user.agency.id, campaignData)
      setData(prev => ({
        ...prev,
        campaigns: [...prev.campaigns, campaign]
      }))
      return campaign
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create campaign')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCampaign = async (campaignId: string, updates: CampaignUpdate) => {
    if (!user?.agency) throw new Error('No agency found')

    try {
      setLoading(true)
      const updatedCampaign = await adsManagementService.updateCampaign(user.agency.id, campaignId, updates)
      setData(prev => ({
        ...prev,
        campaigns: prev.campaigns.map(c => c.id === campaignId ? updatedCampaign : c)
      }))
      return updatedCampaign
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update campaign')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const pauseCampaign = async (campaignId: string) => {
    return updateCampaign(campaignId, { status: 'paused' })
  }

  const resumeCampaign = async (campaignId: string) => {
    return updateCampaign(campaignId, { status: 'active' })
  }

  const deleteCampaign = async (campaignId: string) => {
    if (!user?.agency) throw new Error('No agency found')

    try {
      setLoading(true)
      await adsManagementService.deleteCampaign(user.agency.id, campaignId)
      setData(prev => ({
        ...prev,
        campaigns: prev.campaigns.filter(c => c.id !== campaignId),
        metrics: Object.fromEntries(
          Object.entries(prev.metrics).filter(([id]) => id !== campaignId)
        )
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete campaign')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const syncWithPlatforms = async () => {
    if (!user?.agency) throw new Error('No agency found')

    try {
      setLoading(true)
      await adsManagementService.syncWithPlatforms(user.agency.id)
      await fetchAccountsAndCampaigns()
      await fetchMetrics()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync with platforms')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAccountsByPlatform = (platform: 'google_ads' | 'meta' | 'linkedin') => {
    return data.accounts.filter(account => account.platform === platform)
  }

  const getCampaignsByAccount = (accountId: string) => {
    return data.campaigns.filter(campaign => campaign.account_id === accountId)
  }

  const getCampaignsByPlatform = (platform: 'google_ads' | 'meta' | 'linkedin') => {
    const accountIds = getAccountsByPlatform(platform).map(acc => acc.id)
    return data.campaigns.filter(campaign => accountIds.includes(campaign.account_id))
  }

  const getTotalSpend = (timeframe: 'today' | 'week' | 'month' = 'month') => {
    return Object.values(data.metrics).reduce((total, metrics) => {
      switch (timeframe) {
        case 'today':
          return total + (metrics.spend_today || 0)
        case 'week':
          return total + (metrics.spend_7_days || 0)
        case 'month':
          return total + (metrics.spend_30_days || 0)
        default:
          return total + (metrics.spend_30_days || 0)
      }
    }, 0)
  }

  const getTotalImpressions = (timeframe: 'today' | 'week' | 'month' = 'month') => {
    return Object.values(data.metrics).reduce((total, metrics) => {
      switch (timeframe) {
        case 'today':
          return total + (metrics.impressions_today || 0)
        case 'week':
          return total + (metrics.impressions_7_days || 0)
        case 'month':
          return total + (metrics.impressions_30_days || 0)
        default:
          return total + (metrics.impressions_30_days || 0)
      }
    }, 0)
  }

  const getTotalClicks = (timeframe: 'today' | 'week' | 'month' = 'month') => {
    return Object.values(data.metrics).reduce((total, metrics) => {
      switch (timeframe) {
        case 'today':
          return total + (metrics.clicks_today || 0)
        case 'week':
          return total + (metrics.clicks_7_days || 0)
        case 'month':
          return total + (metrics.clicks_30_days || 0)
        default:
          return total + (metrics.clicks_30_days || 0)
      }
    }, 0)
  }

  const getAverageCTR = (timeframe: 'today' | 'week' | 'month' = 'month') => {
    const clicks = getTotalClicks(timeframe)
    const impressions = getTotalImpressions(timeframe)
    return impressions > 0 ? (clicks / impressions) * 100 : 0
  }

  const getAverageCPC = (timeframe: 'today' | 'week' | 'month' = 'month') => {
    const spend = getTotalSpend(timeframe)
    const clicks = getTotalClicks(timeframe)
    return clicks > 0 ? spend / clicks : 0
  }

  return {
    data,
    loading,
    error,
    connectAccount,
    disconnectAccount,
    createCampaign,
    updateCampaign,
    pauseCampaign,
    resumeCampaign,
    deleteCampaign,
    syncWithPlatforms,
    fetchMetrics,
    getAccountsByPlatform,
    getCampaignsByAccount,
    getCampaignsByPlatform,
    getTotalSpend,
    getTotalImpressions,
    getTotalClicks,
    getAverageCTR,
    getAverageCPC,
    refetch: fetchAccountsAndCampaigns
  }
}