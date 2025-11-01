import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { TrendingUp, TrendingDown, DollarSign, MousePointer, Eye, Users, Target, Zap } from 'lucide-react'
import type { AdCampaign, AdMetrics } from '../../lib/ads/types'

interface MetricsOverviewProps {
  campaigns: AdCampaign[]
  metrics: Record<string, AdMetrics>
  timeframe: 'today' | 'week' | 'month'
  onTimeframeChange: (timeframe: 'today' | 'week' | 'month') => void
}

export function MetricsOverview({ campaigns, metrics, timeframe, onTimeframeChange }: MetricsOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`
  }

  const getMetricValue = (metric: keyof AdMetrics, suffix: string) => {
    return Object.values(metrics).reduce((total, campaignMetrics) => {
      const key = `${metric}_${suffix}` as keyof AdMetrics
      return total + (campaignMetrics[key] as number || 0)
    }, 0)
  }

  const calculateCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? (clicks / impressions) * 100 : 0
  }

  const calculateCPC = (spend: number, clicks: number) => {
    return clicks > 0 ? spend / clicks : 0
  }

  const calculateCPM = (spend: number, impressions: number) => {
    return impressions > 0 ? (spend / impressions) * 1000 : 0
  }

  const getTimeframeSuffix = () => {
    switch (timeframe) {
      case 'today':
        return 'today'
      case 'week':
        return '7_days'
      case 'month':
        return '30_days'
      default:
        return '30_days'
    }
  }

  const suffix = getTimeframeSuffix()
  const totalSpend = getMetricValue('spend', suffix)
  const totalImpressions = getMetricValue('impressions', suffix)
  const totalClicks = getMetricValue('clicks', suffix)
  const totalConversions = getMetricValue('conversions', suffix)

  const avgCTR = calculateCTR(totalClicks, totalImpressions)
  const avgCPC = calculateCPC(totalSpend, totalClicks)
  const avgCPM = calculateCPM(totalSpend, totalImpressions)
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0

  const platformBreakdown = campaigns.reduce((acc, campaign) => {
    const campaignMetrics = metrics[campaign.id]
    if (!campaignMetrics) return acc

    const platform = campaign.platform
    if (!acc[platform]) {
      acc[platform] = {
        spend: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        campaigns: 0
      }
    }

    const spendKey = `spend_${suffix}` as keyof AdMetrics
    const impressionsKey = `impressions_${suffix}` as keyof AdMetrics
    const clicksKey = `clicks_${suffix}` as keyof AdMetrics
    const conversionsKey = `conversions_${suffix}` as keyof AdMetrics

    acc[platform].spend += campaignMetrics[spendKey] as number || 0
    acc[platform].impressions += campaignMetrics[impressionsKey] as number || 0
    acc[platform].clicks += campaignMetrics[clicksKey] as number || 0
    acc[platform].conversions += campaignMetrics[conversionsKey] as number || 0
    acc[platform].campaigns += 1

    return acc
  }, {} as Record<string, any>)

  const topPerformingCampaigns = campaigns
    .map(campaign => ({
      ...campaign,
      metrics: metrics[campaign.id]
    }))
    .filter(campaign => campaign.metrics)
    .sort((a, b) => {
      const aSpend = a.metrics[`spend_${suffix}` as keyof AdMetrics] as number || 0
      const bSpend = b.metrics[`spend_${suffix}` as keyof AdMetrics] as number || 0
      return bSpend - aSpend
    })
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
          <p className="text-muted-foreground">
            Performance metrics across all your advertising campaigns
          </p>
        </div>
        <Select value={timeframe} onValueChange={onTimeframeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpend)}</div>
            <p className="text-xs text-muted-foreground">
              {timeframe === 'today' ? 'today' : timeframe === 'week' ? 'last 7 days' : 'last 30 days'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalImpressions)}</div>
            <p className="text-xs text-muted-foreground">
              Avg CPM: {formatCurrency(avgCPM)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalClicks)}</div>
            <p className="text-xs text-muted-foreground">
              Avg CPC: {formatCurrency(avgCPC)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalConversions)}</div>
            <p className="text-xs text-muted-foreground">
              Conv. Rate: {formatPercentage(conversionRate)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(avgCTR)}</div>
            <div className="flex items-center mt-2">
              {avgCTR > 2 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className="text-xs text-muted-foreground">
                {avgCTR > 2 ? 'Above average' : 'Below average'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Per Click</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgCPC)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Average across all campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(conversionRate)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {totalConversions} conversions from {totalClicks} clicks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Platform</CardTitle>
          <CardDescription>
            Breakdown of metrics across advertising platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(platformBreakdown).map(([platform, data]) => {
              const platformCTR = calculateCTR(data.clicks, data.impressions)
              const platformCPC = calculateCPC(data.spend, data.clicks)

              return (
                <div key={platform} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      {platform === 'google_ads' ? 'Google Ads' :
                       platform === 'meta' ? 'Meta' : 'LinkedIn'}
                    </Badge>
                    <div>
                      <p className="font-medium">{data.campaigns} campaigns</p>
                      <p className="text-sm text-muted-foreground">
                        CTR: {formatPercentage(platformCTR)} • CPC: {formatCurrency(platformCPC)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(data.spend)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(data.clicks)} clicks
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Campaigns</CardTitle>
          <CardDescription>
            Campaigns with the highest spend in the selected timeframe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformingCampaigns.map((campaign, index) => {
              const spendKey = `spend_${suffix}` as keyof AdMetrics
              const clicksKey = `clicks_${suffix}` as keyof AdMetrics
              const impressionsKey = `impressions_${suffix}` as keyof AdMetrics

              const spend = campaign.metrics[spendKey] as number || 0
              const clicks = campaign.metrics[clicksKey] as number || 0
              const impressions = campaign.metrics[impressionsKey] as number || 0
              const ctr = calculateCTR(clicks, impressions)

              return (
                <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {campaign.platform === 'google_ads' ? 'Google Ads' :
                           campaign.platform === 'meta' ? 'Meta' : 'LinkedIn'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          CTR: {formatPercentage(ctr)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(spend)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(clicks)} clicks
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}