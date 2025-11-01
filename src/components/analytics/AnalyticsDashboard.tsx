import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Activity, Users, MousePointer, TrendingUp, AlertTriangle, Zap, Clock, Target } from 'lucide-react'
import { useAnalytics } from '../../contexts/AnalyticsContext'

interface AnalyticsData {
  pageViews: Array<{ date: string; views: number; uniqueVisitors: number }>
  userActions: Array<{ action: string; count: number; page: string }>
  citations: Array<{ platform: string; found: number; missing: number; date: string }>
  campaigns: Array<{ platform: string; active: number; paused: number; spend: number }>
  errors: Array<{ type: string; count: number; severity: string }>
  performance: Array<{ metric: string; value: number; trend: 'up' | 'down' | 'stable' }>
  features: Array<{ name: string; usage: number; uniqueUsers: number }>
  conversions: Array<{ type: string; count: number; value: number }>
}

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('7d')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AnalyticsData | null>(null)
  const { trackPageView, trackFeatureUsage } = useAnalytics()

  useEffect(() => {
    trackPageView('analytics_dashboard')
    fetchAnalyticsData()
  }, [timeframe, trackPageView])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      // In a real implementation, this would fetch data from PostHog or your analytics API
      // For now, we'll use mock data
      const mockData: AnalyticsData = {
        pageViews: [
          { date: '2024-01-01', views: 150, uniqueVisitors: 45 },
          { date: '2024-01-02', views: 180, uniqueVisitors: 52 },
          { date: '2024-01-03', views: 165, uniqueVisitors: 48 },
          { date: '2024-01-04', views: 220, uniqueVisitors: 68 },
          { date: '2024-01-05', views: 195, uniqueVisitors: 61 },
          { date: '2024-01-06', views: 240, uniqueVisitors: 74 },
          { date: '2024-01-07', views: 210, uniqueVisitors: 65 }
        ],
        userActions: [
          { action: 'campaign_created', count: 12, page: 'ads_management' },
          { action: 'citation_check', count: 145, page: 'monitoring' },
          { action: 'client_added', count: 8, page: 'clients' },
          { action: 'report_generated', count: 23, page: 'reports' },
          { action: 'account_connected', count: 5, page: 'settings' }
        ],
        citations: [
          { platform: 'ChatGPT', found: 45, missing: 12, date: '2024-01-07' },
          { platform: 'Claude', found: 38, missing: 15, date: '2024-01-07' },
          { platform: 'Perplexity', found: 52, missing: 8, date: '2024-01-07' },
          { platform: 'Gemini', found: 31, missing: 18, date: '2024-01-07' }
        ],
        campaigns: [
          { platform: 'Google Ads', active: 12, paused: 3, spend: 5420 },
          { platform: 'Meta', active: 8, paused: 2, spend: 3280 },
          { platform: 'LinkedIn', active: 5, paused: 1, spend: 1850 }
        ],
        errors: [
          { type: 'API Error', count: 8, severity: 'medium' },
          { type: 'Authentication Error', count: 3, severity: 'high' },
          { type: 'Payment Error', count: 2, severity: 'high' },
          { type: 'Scraping Error', count: 12, severity: 'low' }
        ],
        performance: [
          { metric: 'Page Load Time', value: 2.3, trend: 'down' },
          { metric: 'API Response Time', value: 450, trend: 'stable' },
          { metric: 'Citation Check Time', value: 1.8, trend: 'up' },
          { metric: 'Database Query Time', value: 120, trend: 'down' }
        ],
        features: [
          { name: 'Citation Monitoring', usage: 156, uniqueUsers: 45 },
          { name: 'Campaign Management', usage: 89, uniqueUsers: 32 },
          { name: 'Report Generation', usage: 67, uniqueUsers: 28 },
          { name: 'Client Management', usage: 43, uniqueUsers: 22 }
        ],
        conversions: [
          { type: 'Trial Sign-up', count: 12, value: 0 },
          { type: 'Subscription', count: 8, value: 2400 },
          { type: 'Upgrade', count: 3, value: 450 },
          { type: 'Campaign Created', count: 15, value: 0 }
        ]
      }

      setData(mockData)
    } catch (error) {
      console.error('Failed to fetch analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFeatureClick = (feature: string) => {
    trackFeatureUsage(feature, 'analytics_dashboard')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Activity className="h-8 w-8 animate-pulse" />
        <span className="ml-2">Loading analytics...</span>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Failed to load analytics data</p>
        <Button onClick={fetchAnalyticsData} className="mt-2">
          Retry
        </Button>
      </div>
    )
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  const totalPageViews = data.pageViews.reduce((sum, day) => sum + day.views, 0)
  const totalUniqueVisitors = Math.max(...data.pageViews.map(day => day.uniqueVisitors))
  const totalCitationsFound = data.citations.reduce((sum, platform) => sum + platform.found, 0)
  const totalCitationsMissing = data.citations.reduce((sum, platform) => sum + platform.missing, 0)
  const totalCampaignSpend = data.campaigns.reduce((sum, platform) => sum + platform.spend, 0)
  const totalErrors = data.errors.reduce((sum, error) => sum + error.count, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Platform usage, performance metrics, and business insights
          </p>
        </div>
        <Select value={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalUniqueVisitors} unique visitors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citations Found</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCitationsFound}</div>
            <p className="text-xs text-muted-foreground">
              {totalCitationsMissing} missing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaign Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCampaignSpend.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalErrors}</div>
            <p className="text-xs text-muted-foreground">
              Last {timeframe}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage" onClick={() => handleFeatureClick('usage_analytics')}>
            Usage
          </TabsTrigger>
          <TabsTrigger value="citations" onClick={() => handleFeatureClick('citation_analytics')}>
            Citations
          </TabsTrigger>
          <TabsTrigger value="campaigns" onClick={() => handleFeatureClick('campaign_analytics')}>
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="performance" onClick={() => handleFeatureClick('performance_analytics')}>
            Performance
          </TabsTrigger>
          <TabsTrigger value="errors" onClick={() => handleFeatureClick('error_analytics')}>
            Errors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Views Over Time</CardTitle>
                <CardDescription>Daily page views and unique visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.pageViews}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" name="Page Views" />
                    <Line type="monotone" dataKey="uniqueVisitors" stroke="#82ca9d" name="Unique Visitors" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Usage</CardTitle>
                <CardDescription>Most used features and their adoption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.features.map((feature, index) => (
                    <div key={feature.name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{feature.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {feature.uniqueUsers} unique users
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{feature.usage}</p>
                        <p className="text-sm text-muted-foreground">uses</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Actions</CardTitle>
              <CardDescription>Most common user actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.userActions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="action" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="citations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Citations by Platform</CardTitle>
                <CardDescription>Found vs missing citations across AI platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.citations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="found" fill="#82ca9d" name="Found" />
                    <Bar dataKey="missing" fill="#ff7c7c" name="Missing" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Citation Success Rate</CardTitle>
                <CardDescription>Overall citation discovery performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Found', value: totalCitationsFound },
                        { name: 'Missing', value: totalCitationsMissing }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#82ca9d" />
                      <Cell fill="#ff7c7c" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Overview</CardTitle>
              <CardDescription>Campaign status and spend by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.campaigns.map((campaign) => (
                  <div key={campaign.platform} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{campaign.platform}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <Badge variant="outline" className="text-green-600">
                          {campaign.active} active
                        </Badge>
                        <Badge variant="outline" className="text-yellow-600">
                          {campaign.paused} paused
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${campaign.spend.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">total spend</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>System performance and response times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.performance.map((metric) => (
                  <div key={metric.metric} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{metric.metric}</p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={
                              metric.trend === 'up' ? 'text-red-600' :
                              metric.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                            }
                          >
                            {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} {metric.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {metric.metric.includes('Time') ? `${metric.value}s` : `${metric.value}ms`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Summary</CardTitle>
              <CardDescription>System errors by type and severity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.errors.map((error) => (
                  <div key={error.type} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{error.type}</p>
                        <Badge
                          variant="outline"
                          className={
                            error.severity === 'high' ? 'text-red-600' :
                            error.severity === 'medium' ? 'text-yellow-600' : 'text-gray-600'
                          }
                        >
                          {error.severity} severity
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{error.count}</p>
                      <p className="text-sm text-muted-foreground">occurrences</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}