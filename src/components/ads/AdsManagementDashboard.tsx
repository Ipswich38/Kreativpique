import React, { useState, useEffect } from 'react'
import { useAdsManagement } from '../../hooks/useAdsManagement'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { PlusCircle, RefreshCw, TrendingUp, TrendingDown, DollarSign, MousePointer, Eye, Users } from 'lucide-react'
import { ConnectAccountForm } from './ConnectAccountForm'
import { CreateCampaignForm } from './CreateCampaignForm'
import { CampaignList } from './CampaignList'
import { MetricsOverview } from './MetricsOverview'

export function AdsManagementDashboard() {
  const {
    data,
    loading,
    error,
    connectAccount,
    createCampaign,
    syncWithPlatforms,
    getTotalSpend,
    getTotalImpressions,
    getTotalClicks,
    getAverageCTR,
    getAccountsByPlatform,
    refetch
  } = useAdsManagement()

  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false)
  const [isCreateCampaignDialogOpen, setIsCreateCampaignDialogOpen] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('month')

  useEffect(() => {
    if (data.campaigns.length > 0) {
      // Fetch metrics for all campaigns when component loads
      const campaignIds = data.campaigns.map(c => c.id)
      // fetchMetrics(campaignIds)
    }
  }, [data.campaigns])

  const handleConnectAccount = async (platform: 'google_ads' | 'meta' | 'linkedin', accessToken: string, accountId?: string) => {
    try {
      await connectAccount(platform, accessToken, accountId)
      setIsConnectDialogOpen(false)
    } catch (error) {
      console.error('Failed to connect account:', error)
    }
  }

  const handleCreateCampaign = async (campaignData: any) => {
    try {
      await createCampaign(campaignData)
      setIsCreateCampaignDialogOpen(false)
    } catch (error) {
      console.error('Failed to create campaign:', error)
    }
  }

  const handleSync = async () => {
    try {
      await syncWithPlatforms()
    } catch (error) {
      console.error('Failed to sync:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading ads data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading ads data: {error}</p>
        <Button variant="outline" onClick={refetch} className="mt-2">
          Retry
        </Button>
      </div>
    )
  }

  const totalSpend = getTotalSpend(selectedTimeframe)
  const totalImpressions = getTotalImpressions(selectedTimeframe)
  const totalClicks = getTotalClicks(selectedTimeframe)
  const averageCTR = getAverageCTR(selectedTimeframe)

  const googleAccounts = getAccountsByPlatform('google_ads')
  const metaAccounts = getAccountsByPlatform('meta')
  const linkedinAccounts = getAccountsByPlatform('linkedin')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advertising Management</h1>
          <p className="text-muted-foreground">
            Manage your advertising campaigns across Google Ads, Meta, and LinkedIn
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleSync} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync
          </Button>
          <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                Connect Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect Advertising Account</DialogTitle>
                <DialogDescription>
                  Connect your Google Ads, Meta, or LinkedIn advertising account to manage campaigns.
                </DialogDescription>
              </DialogHeader>
              <ConnectAccountForm onConnect={handleConnectAccount} />
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateCampaignDialogOpen} onOpenChange={setIsCreateCampaignDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={data.accounts.length === 0}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Create a new advertising campaign for one of your connected accounts.
                </DialogDescription>
              </DialogHeader>
              <CreateCampaignForm
                accounts={data.accounts}
                onCreate={handleCreateCampaign}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Connected Accounts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Google Ads</CardTitle>
            <div className="h-4 w-4 bg-blue-600 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{googleAccounts.length}</div>
            <p className="text-xs text-muted-foreground">
              Connected accounts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Ads</CardTitle>
            <div className="h-4 w-4 bg-blue-500 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metaAccounts.length}</div>
            <p className="text-xs text-muted-foreground">
              Connected accounts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">LinkedIn Ads</CardTitle>
            <div className="h-4 w-4 bg-blue-700 rounded" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{linkedinAccounts.length}</div>
            <p className="text-xs text-muted-foreground">
              Connected accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Last {selectedTimeframe === 'today' ? 'day' : selectedTimeframe === 'week' ? '7 days' : '30 days'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Last {selectedTimeframe === 'today' ? 'day' : selectedTimeframe === 'week' ? '7 days' : '30 days'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Last {selectedTimeframe === 'today' ? 'day' : selectedTimeframe === 'week' ? '7 days' : '30 days'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCTR.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              Last {selectedTimeframe === 'today' ? 'day' : selectedTimeframe === 'week' ? '7 days' : '30 days'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <CampaignList
            campaigns={data.campaigns}
            metrics={data.metrics}
            onUpdate={refetch}
          />
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{account.account_name}</span>
                    <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                      {account.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {account.platform} • {account.account_id}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Last sync: {account.last_sync
                      ? new Date(account.last_sync).toLocaleDateString()
                      : 'Never'
                    }
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <MetricsOverview
            campaigns={data.campaigns}
            metrics={data.metrics}
            timeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
          />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Opportunities</CardTitle>
              <CardDescription>
                AI-powered recommendations to improve your campaign performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Optimization insights will be available once you have active campaigns with performance data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}