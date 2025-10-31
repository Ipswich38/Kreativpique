import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Download, FileText, Mail, Calendar, TrendingUp, TrendingDown, Target, Users, DollarSign, AlertTriangle } from 'lucide-react'
import { useAnalytics } from '../contexts/AnalyticsContext'

interface ReportData {
  client: {
    name: string
    industry: string
    goals: string[]
  }
  period: {
    start: string
    end: string
    type: 'monthly' | 'weekly' | 'quarterly'
  }
  visibility: {
    score: number
    change: number
    trend: 'up' | 'down' | 'stable'
  }
  aiCitations: {
    total: number
    change: number
    byPlatform: Array<{
      platform: string
      count: number
      avgPosition: number
      sentiment: 'positive' | 'neutral' | 'negative'
    }>
    topQueries: Array<{
      query: string
      mentions: number
      platforms: string[]
    }>
    opportunities: string[]
  }
  seo: {
    avgPosition: number
    change: number
    page1Keywords: number
    topWins: Array<{
      keyword: string
      position: number
      change: number
    }>
    topLosses: Array<{
      keyword: string
      position: number
      change: number
    }>
  }
  ads: {
    spend: number
    clicks: number
    ctr: number
    cpc: number
    conversions: number
    bestAd: {
      headline: string
      ctr: number
      conversions: number
    }
  }
  competitors: Array<{
    name: string
    aiCitations: number
    estimatedAdSpend: number
    seoStrength: number
  }>
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low'
    category: string
    title: string
    impact: string
    effort: string
    roi: string
  }>
  goals: {
    nextMonth: string[]
    metrics: Array<{
      metric: string
      target: number
      current: number
    }>
  }
}

export default function ReportsPage() {
  const [selectedClient, setSelectedClient] = useState('midas-aero')
  const [reportType, setReportType] = useState<'monthly' | 'weekly' | 'quarterly'>('monthly')
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(false)
  const { trackFeatureUsage } = useAnalytics()

  const clients = [
    { id: 'midas-aero', name: 'Midas Aero', industry: 'Private Aviation' },
    { id: 'luxury-hotels', name: 'Luxury Hotels Dubai', industry: 'Hospitality' },
    { id: 'tech-startup', name: 'AI Tech Startup', industry: 'Technology' }
  ]

  useEffect(() => {
    trackFeatureUsage('reports_page_viewed', 'reports')
    loadReportData()
  }, [selectedClient, reportType])

  const loadReportData = async () => {
    setLoading(true)

    // Mock data - in production this would come from your API
    const mockData: ReportData = {
      client: {
        name: 'Midas Aero',
        industry: 'Private Aviation',
        goals: ['Increase AI citations by 200%', 'Reach page 1 for "luxury private jet UAE"', 'Generate 5+ leads monthly']
      },
      period: {
        start: '2024-10-01',
        end: '2024-10-31',
        type: reportType
      },
      visibility: {
        score: 42,
        change: 12,
        trend: 'up'
      },
      aiCitations: {
        total: 8,
        change: 300,
        byPlatform: [
          { platform: 'Claude', count: 5, avgPosition: 2.4, sentiment: 'positive' },
          { platform: 'ChatGPT', count: 2, avgPosition: 4.5, sentiment: 'neutral' },
          { platform: 'Gemini', count: 1, avgPosition: 6.0, sentiment: 'positive' },
          { platform: 'Perplexity', count: 0, avgPosition: 0, sentiment: 'neutral' }
        ],
        topQueries: [
          { query: 'luxury private jet UAE', mentions: 3, platforms: ['Claude', 'ChatGPT'] },
          { query: 'Dubai private aviation', mentions: 2, platforms: ['Claude', 'Gemini'] },
          { query: 'private jet charter Dubai', mentions: 0, platforms: [] }
        ],
        opportunities: [
          'Zero mentions on Perplexity - target authority sites they cite',
          'Competitors getting 15x more citations - content gap identified',
          'FAQ section missing - AI models love FAQ content'
        ]
      },
      seo: {
        avgPosition: 28,
        change: 7,
        page1Keywords: 2,
        topWins: [
          { keyword: 'luxury private jet UAE', position: 8, change: -26 },
          { keyword: 'Dubai aviation services', position: 12, change: -16 }
        ],
        topLosses: [
          { keyword: 'charter jet Dubai', position: 45, change: 7 }
        ]
      },
      ads: {
        spend: 2450,
        clicks: 185,
        ctr: 3.2,
        cpc: 13.24,
        conversions: 3,
        bestAd: {
          headline: 'Luxury Private Jet Charter Dubai - 24/7 Service',
          ctr: 4.8,
          conversions: 3
        }
      },
      competitors: [
        { name: 'JETEX', aiCitations: 45, estimatedAdSpend: 8000, seoStrength: 92 },
        { name: 'Paramount Business Jets', aiCitations: 38, estimatedAdSpend: 5500, seoStrength: 78 },
        { name: 'Dubai Private Jet Charter', aiCitations: 22, estimatedAdSpend: 3200, seoStrength: 65 }
      ],
      recommendations: [
        {
          priority: 'high',
          category: 'Quick Win',
          title: 'Add FAQ Section to Website',
          impact: '+10-15 AI citations/month',
          effort: 'LOW (4 hours)',
          roi: 'Very High'
        },
        {
          priority: 'high',
          category: 'SEO',
          title: 'Push "luxury private jet UAE" to Page 1',
          impact: '+200% visibility',
          effort: 'MEDIUM (8-12 hours)',
          roi: 'Very High'
        },
        {
          priority: 'critical',
          category: 'Ads',
          title: 'Start Campaign for "private jet charter Dubai"',
          impact: '2-4 new leads/month',
          effort: 'LOW (2 hours)',
          roi: 'EXTREME'
        }
      ],
      goals: {
        nextMonth: [
          'Reach 20 AI citations (+150%)',
          'Increase ad CTR to 4%',
          'Get 1 keyword to position 5 or better',
          'Publish 2 authority content pieces'
        ],
        metrics: [
          { metric: 'AI Citations', target: 20, current: 8 },
          { metric: 'Ad CTR (%)', target: 4.0, current: 3.2 },
          { metric: 'Page 1 Keywords', target: 5, current: 2 },
          { metric: 'Monthly Leads', target: 8, current: 3 }
        ]
      }
    }

    // Simulate API delay
    setTimeout(() => {
      setReportData(mockData)
      setLoading(false)
    }, 1000)
  }

  const generatePDF = () => {
    trackFeatureUsage('report_pdf_generated', 'reports', { client: selectedClient, type: reportType })
    // In production, this would generate and download a PDF
    alert('PDF generation feature would be implemented here')
  }

  const scheduleEmail = () => {
    trackFeatureUsage('report_email_scheduled', 'reports', { client: selectedClient, type: reportType })
    alert('Email scheduling feature would be implemented here')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <div className="h-4 w-4" />
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'critical': return 'destructive'
      case 'medium': return 'secondary'
      default: return 'outline'
    }
  }

  if (loading || !reportData) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <FileText className="h-8 w-8 animate-pulse text-gray-400" />
          <span className="ml-2 text-gray-400">Generating report...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-[#0f1419] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-gray-400">Executive reports and performance insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[200px] bg-[#1f2937] border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
            <SelectTrigger className="w-[150px] bg-[#1f2937] border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Report Actions */}
      <div className="flex items-center justify-between p-4 bg-[#1f2937] rounded-lg border border-gray-600">
        <div>
          <h2 className="text-xl font-semibold text-white">{reportData.client.name} - {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h2>
          <p className="text-gray-400">{reportData.period.start} to {reportData.period.end}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={scheduleEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Schedule Email
          </Button>
          <Button onClick={generatePDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <Tabs defaultValue="executive" className="space-y-4">
        <TabsList className="bg-[#1f2937] border border-gray-600">
          <TabsTrigger value="executive" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Executive Summary
          </TabsTrigger>
          <TabsTrigger value="detailed" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Detailed Analysis
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Action Items
          </TabsTrigger>
          <TabsTrigger value="competitive" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Competitive Intel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="executive" className="space-y-6">
          {/* Executive Summary */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-emerald-400" />
                Executive Summary
              </CardTitle>
              <CardDescription className="text-gray-400">
                Overall performance and key wins for {reportData.period.type} period
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Visibility Score */}
              <div className="flex items-center justify-between p-4 bg-[#0f1419] rounded-lg">
                <div>
                  <p className="text-gray-400">Overall Visibility Score</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-white">{reportData.visibility.score}/100</span>
                    <div className="flex items-center text-green-400">
                      {getChangeIcon(reportData.visibility.change)}
                      <span className="ml-1">+{reportData.visibility.change} from last month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0f1419] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">AI Citations</p>
                      <p className="text-2xl font-bold text-white">{reportData.aiCitations.total}</p>
                    </div>
                    <div className="text-green-400">
                      +{reportData.aiCitations.change}%
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#0f1419] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">SEO Avg Position</p>
                      <p className="text-2xl font-bold text-white">#{reportData.seo.avgPosition}</p>
                    </div>
                    <div className="text-green-400">
                      +{reportData.seo.change} spots
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#0f1419] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">Ad Conversions</p>
                      <p className="text-2xl font-bold text-white">{reportData.ads.conversions}</p>
                    </div>
                    <div className="text-gray-400">
                      {formatCurrency(reportData.ads.spend)} spent
                    </div>
                  </div>
                </div>
              </div>

              {/* Wins & Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">✅ Wins This Month</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• AI Citations increased {reportData.aiCitations.change}% ({reportData.aiCitations.total} mentions)</li>
                    <li>• Reached Page 1 for "luxury private jet UAE"</li>
                    <li>• Google Ads CTR improved to {reportData.ads.ctr}%</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">⚠️ Areas Needing Attention</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Still not ranking for "private jet charter Dubai"</li>
                    <li>• Competitors outspending us 3:1 on ads</li>
                    <li>• Zero mentions on Perplexity (opportunity!)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Month Goals */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">📅 Next Month Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Targets</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {reportData.goals.nextMonth.map((goal, index) => (
                      <li key={index}>• {goal}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Progress Metrics</h4>
                  <div className="space-y-2">
                    {reportData.goals.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-white">{metric.current}</span>
                          <span className="text-sm text-gray-400">/ {metric.target}</span>
                          <div className="w-16 h-2 bg-[#0f1419] rounded">
                            <div
                              className="h-2 bg-emerald-500 rounded"
                              style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* AI Citations Performance */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">🤖 AI Citations Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">By Platform</h4>
                  <div className="space-y-3">
                    {reportData.aiCitations.byPlatform.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                        <div>
                          <p className="font-medium text-white">{platform.platform}</p>
                          <p className="text-sm text-gray-400">Avg position #{platform.avgPosition}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">{platform.count}</p>
                          <Badge variant={platform.sentiment === 'positive' ? 'default' : 'secondary'}>
                            {platform.sentiment}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Top Performing Queries</h4>
                  <div className="space-y-3">
                    {reportData.aiCitations.topQueries.map((query, index) => (
                      <div key={index} className="p-3 bg-[#0f1419] rounded-lg">
                        <p className="font-medium text-white">{query.query}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-400">{query.mentions} mentions</p>
                          <p className="text-sm text-gray-400">{query.platforms.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO & Ads Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">🔍 SEO Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Average Position</span>
                    <span className="text-white font-bold">#{reportData.seo.avgPosition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Keywords on Page 1</span>
                    <span className="text-white font-bold">{reportData.seo.page1Keywords}</span>
                  </div>

                  <div>
                    <h5 className="text-white font-medium mb-2">Biggest Wins</h5>
                    {reportData.seo.topWins.map((win, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{win.keyword}</span>
                        <div className="flex items-center text-green-400">
                          <span>#{win.position}</span>
                          <TrendingUp className="h-3 w-3 ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">📈 Google Ads Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400">Spend</p>
                      <p className="text-white font-bold">{formatCurrency(reportData.ads.spend)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Clicks</p>
                      <p className="text-white font-bold">{formatNumber(reportData.ads.clicks)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">CTR</p>
                      <p className="text-white font-bold">{reportData.ads.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">CPC</p>
                      <p className="text-white font-bold">{formatCurrency(reportData.ads.cpc)}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-white font-medium mb-2">Best Performing Ad</h5>
                    <div className="p-3 bg-[#0f1419] rounded-lg">
                      <p className="text-white text-sm">{reportData.ads.bestAd.headline}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400">CTR: {reportData.ads.bestAd.ctr}%</span>
                        <span className="text-xs text-gray-400">{reportData.ads.bestAd.conversions} conversions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">💡 Priority Recommendations</CardTitle>
              <CardDescription className="text-gray-400">
                AI-generated action items prioritized by ROI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-[#0f1419] rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{rec.title}</h4>
                      <Badge variant={getPriorityColor(rec.priority)}>
                        {rec.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{rec.category}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Impact</p>
                        <p className="text-white">{rec.impact}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Effort</p>
                        <p className="text-white">{rec.effort}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">ROI</p>
                        <p className="text-white">{rec.roi}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">🏆 Competitive Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                How you compare to top competitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#0f1419] rounded-lg">
                    <div>
                      <h4 className="font-semibold text-white">{competitor.name}</h4>
                      <p className="text-sm text-gray-400">#{index + 1} competitor</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-right">
                      <div>
                        <p className="text-xs text-gray-400">AI Citations</p>
                        <p className="text-white font-bold">{competitor.aiCitations}/mo</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Est. Ad Spend</p>
                        <p className="text-white font-bold">{formatCurrency(competitor.estimatedAdSpend)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">SEO Strength</p>
                        <p className="text-white font-bold">{competitor.seoStrength}/100</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Your Position */}
                <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-emerald-400">{reportData.client.name} (You)</h4>
                    <p className="text-sm text-gray-400">#4 position • Trending UP 📈</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-right">
                    <div>
                      <p className="text-xs text-gray-400">AI Citations</p>
                      <p className="text-emerald-400 font-bold">{reportData.aiCitations.total}/mo</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Ad Spend</p>
                      <p className="text-emerald-400 font-bold">{formatCurrency(reportData.ads.spend)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Visibility Score</p>
                      <p className="text-emerald-400 font-bold">{reportData.visibility.score}/100</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}