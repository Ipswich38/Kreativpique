import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { TrendingUp, TrendingDown, Eye, DollarSign, Target, Users, Globe, FileText, BarChart, Award, AlertTriangle } from 'lucide-react'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { useAnalytics } from '../contexts/AnalyticsContext'

interface Competitor {
  id: string
  name: string
  domain: string
  industry: string
  marketPosition: number
  logo?: string
  metrics: {
    aiCitations: {
      total: number
      byPlatform: {
        chatgpt: number
        claude: number
        perplexity: number
        gemini: number
      }
      trend: 'up' | 'down' | 'stable'
      monthlyGrowth: number
    }
    seo: {
      averagePosition: number
      organicTraffic: number
      domainAuthority: number
      backlinks: number
      organicKeywords: number
      topKeywords: string[]
    }
    ads: {
      estimatedSpend: number
      adVisibility: number
      topKeywords: string[]
      adCopy: string[]
      landingPages: string[]
    }
    content: {
      blogPosts: number
      publishingFrequency: string
      contentQuality: number
      topContent: Array<{
        title: string
        traffic: number
        citations: number
      }>
    }
    social: {
      followers: number
      engagement: number
      platforms: string[]
    }
  }
  strengths: string[]
  weaknesses: string[]
  strategy: {
    contentStrategy: string
    seoStrategy: string
    adStrategy: string
    overallApproach: string
  }
  benchmarkData: {
    category: string
    yourScore: number
    competitorScore: number
    industryAverage: number
  }[]
}

interface CompetitiveAnalysis {
  clientPosition: number
  totalCompetitors: number
  marketShare: {
    aiCitations: number
    organicTraffic: number
    adVisibility: number
  }
  gapAnalysis: {
    biggestGaps: Array<{
      area: string
      gap: number
      priority: 'high' | 'medium' | 'low'
      actionNeeded: string
    }>
    opportunities: Array<{
      opportunity: string
      impact: string
      effort: string
      competitor: string
    }>
  }
  recommendations: Array<{
    title: string
    description: string
    competitorExample: string
    expectedImpact: string
  }>
}

export default function CompetitorsPage() {
  const [selectedClient, setSelectedClient] = useState('midas-aero')
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<CompetitiveAnalysis | null>(null)
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const { trackFeatureUsage } = useAnalytics()

  const clients = [
    { id: 'midas-aero', name: 'Midas Aero', industry: 'Private Aviation' },
    { id: 'luxury-hotels', name: 'Luxury Hotels Dubai', industry: 'Hospitality' },
    { id: 'tech-startup', name: 'AI Tech Startup', industry: 'Technology' }
  ]

  useEffect(() => {
    trackFeatureUsage('competitors_page_viewed', 'competitors')
    loadCompetitiveData()
  }, [selectedClient])

  const loadCompetitiveData = async () => {
    setLoading(true)

    // Mock competitive data - in production this would come from competitive intelligence APIs
    const mockCompetitors: Competitor[] = [
      {
        id: 'jetex',
        name: 'JETEX',
        domain: 'jetex.com',
        industry: 'Private Aviation',
        marketPosition: 1,
        metrics: {
          aiCitations: {
            total: 45,
            byPlatform: { chatgpt: 18, claude: 15, perplexity: 8, gemini: 4 },
            trend: 'up',
            monthlyGrowth: 12
          },
          seo: {
            averagePosition: 3,
            organicTraffic: 45000,
            domainAuthority: 68,
            backlinks: 2400,
            organicKeywords: 1250,
            topKeywords: ['private jet charter', 'luxury aviation', 'business jet']
          },
          ads: {
            estimatedSpend: 8000,
            adVisibility: 95,
            topKeywords: ['private jet charter Dubai', 'luxury aviation services'],
            adCopy: ['Luxury Private Jet Charter - Book Now', 'Premium Aviation Services Worldwide'],
            landingPages: ['/charter', '/services', '/fleet']
          },
          content: {
            blogPosts: 60,
            publishingFrequency: '2x per month',
            contentQuality: 85,
            topContent: [
              { title: 'Ultimate Guide to Private Jet Charter', traffic: 5400, citations: 12 },
              { title: 'Private Aviation Safety Standards', traffic: 3200, citations: 8 },
              { title: 'Dubai Aviation Hub Guide', traffic: 2800, citations: 6 }
            ]
          },
          social: {
            followers: 15000,
            engagement: 4.2,
            platforms: ['LinkedIn', 'Instagram', 'Twitter']
          }
        },
        strengths: [
          'Market leader with strong brand recognition',
          'Comprehensive content strategy (60+ articles)',
          'Strong SEO performance (avg position #3)',
          'High-quality backlink profile',
          'Consistent publishing schedule'
        ],
        weaknesses: [
          'High ad spend may indicate organic weakness',
          'Limited social media engagement',
          'Older content needs updating',
          'Mobile site speed issues'
        ],
        strategy: {
          contentStrategy: 'Authority-focused with comprehensive guides and industry insights',
          seoStrategy: 'Targeting high-volume commercial keywords with strong technical SEO',
          adStrategy: 'High-budget approach covering all commercial intent keywords',
          overallApproach: 'Establish market dominance through content authority and ad presence'
        },
        benchmarkData: [
          { category: 'AI Citations', yourScore: 8, competitorScore: 45, industryAverage: 25 },
          { category: 'SEO Performance', yourScore: 28, competitorScore: 3, industryAverage: 15 },
          { category: 'Content Volume', yourScore: 5, competitorScore: 60, industryAverage: 30 },
          { category: 'Ad Visibility', yourScore: 40, competitorScore: 95, industryAverage: 65 }
        ]
      },
      {
        id: 'paramount',
        name: 'Paramount Business Jets',
        domain: 'paramountbusinessjets.com',
        industry: 'Private Aviation',
        marketPosition: 2,
        metrics: {
          aiCitations: {
            total: 38,
            byPlatform: { chatgpt: 15, claude: 12, perplexity: 7, gemini: 4 },
            trend: 'stable',
            monthlyGrowth: 5
          },
          seo: {
            averagePosition: 5,
            organicTraffic: 32000,
            domainAuthority: 58,
            backlinks: 1800,
            organicKeywords: 980,
            topKeywords: ['business jet charter', 'private aircraft', 'executive travel']
          },
          ads: {
            estimatedSpend: 5500,
            adVisibility: 78,
            topKeywords: ['business jet rental', 'corporate aviation'],
            adCopy: ['Business Jet Charter Services', 'Executive Travel Solutions'],
            landingPages: ['/business-jets', '/corporate', '/charter-services']
          },
          content: {
            blogPosts: 45,
            publishingFrequency: '1x per month',
            contentQuality: 75,
            topContent: [
              { title: 'Business Aviation Trends 2024', traffic: 4100, citations: 9 },
              { title: 'Private Jet Cost Calculator', traffic: 6200, citations: 5 },
              { title: 'Charter vs Ownership Guide', traffic: 2900, citations: 7 }
            ]
          },
          social: {
            followers: 8500,
            engagement: 3.1,
            platforms: ['LinkedIn', 'Facebook']
          }
        },
        strengths: [
          'Strong business-focused positioning',
          'Good content library (45 articles)',
          'Solid SEO foundation',
          'Effective lead generation'
        ],
        weaknesses: [
          'Lower publishing frequency',
          'Less social media presence',
          'Weaker brand recognition',
          'Limited international presence'
        ],
        strategy: {
          contentStrategy: 'Business-focused content targeting corporate decision makers',
          seoStrategy: 'Long-tail keyword strategy with commercial intent',
          adStrategy: 'Targeted approach focusing on business and corporate keywords',
          overallApproach: 'B2B focused with emphasis on cost-effectiveness and reliability'
        },
        benchmarkData: [
          { category: 'AI Citations', yourScore: 8, competitorScore: 38, industryAverage: 25 },
          { category: 'SEO Performance', yourScore: 28, competitorScore: 5, industryAverage: 15 },
          { category: 'Content Volume', yourScore: 5, competitorScore: 45, industryAverage: 30 },
          { category: 'Ad Visibility', yourScore: 40, competitorScore: 78, industryAverage: 65 }
        ]
      },
      {
        id: 'dubai-private-jet',
        name: 'Dubai Private Jet Charter',
        domain: 'dubaiprivatejet.com',
        industry: 'Private Aviation',
        marketPosition: 3,
        metrics: {
          aiCitations: {
            total: 22,
            byPlatform: { chatgpt: 9, claude: 7, perplexity: 4, gemini: 2 },
            trend: 'up',
            monthlyGrowth: 18
          },
          seo: {
            averagePosition: 8,
            organicTraffic: 18000,
            domainAuthority: 45,
            backlinks: 850,
            organicKeywords: 450,
            topKeywords: ['private jet charter Dubai', 'Dubai aviation', 'UAE private jets']
          },
          ads: {
            estimatedSpend: 3200,
            adVisibility: 65,
            topKeywords: ['private jet Dubai', 'charter flights UAE'],
            adCopy: ['Dubai Private Jet Charter', 'Luxury Flights in UAE'],
            landingPages: ['/dubai-charter', '/uae-flights', '/luxury-travel']
          },
          content: {
            blogPosts: 25,
            publishingFrequency: '1x per month',
            contentQuality: 65,
            topContent: [
              { title: 'Dubai Airport Private Jet Guide', traffic: 3200, citations: 6 },
              { title: 'UAE Aviation Regulations', traffic: 1800, citations: 4 },
              { title: 'Best Private Jets for UAE', traffic: 2100, citations: 3 }
            ]
          },
          social: {
            followers: 4200,
            engagement: 2.8,
            platforms: ['Instagram', 'LinkedIn']
          }
        },
        strengths: [
          'Strong local market focus',
          'Growing AI citation presence',
          'Good local SEO performance',
          'Specialization advantage'
        ],
        weaknesses: [
          'Limited content volume',
          'Lower domain authority',
          'Smaller social presence',
          'Geographic limitation'
        ],
        strategy: {
          contentStrategy: 'Local market focus with Dubai/UAE specific content',
          seoStrategy: 'Geographic SEO targeting Dubai and UAE markets',
          adStrategy: 'Local market dominance with region-specific keywords',
          overallApproach: 'Regional specialist positioning with local expertise'
        },
        benchmarkData: [
          { category: 'AI Citations', yourScore: 8, competitorScore: 22, industryAverage: 25 },
          { category: 'SEO Performance', yourScore: 28, competitorScore: 8, industryAverage: 15 },
          { category: 'Content Volume', yourScore: 5, competitorScore: 25, industryAverage: 30 },
          { category: 'Ad Visibility', yourScore: 40, competitorScore: 65, industryAverage: 65 }
        ]
      }
    ]

    const mockAnalysis: CompetitiveAnalysis = {
      clientPosition: 4,
      totalCompetitors: 3,
      marketShare: {
        aiCitations: 5,
        organicTraffic: 3,
        adVisibility: 35
      },
      gapAnalysis: {
        biggestGaps: [
          {
            area: 'AI Citations',
            gap: 37,
            priority: 'high',
            actionNeeded: 'Create 20+ comprehensive content pieces like Jetex'
          },
          {
            area: 'Content Volume',
            gap: 55,
            priority: 'high',
            actionNeeded: 'Increase publishing frequency to 2x per month'
          },
          {
            area: 'SEO Performance',
            gap: 25,
            priority: 'medium',
            actionNeeded: 'Optimize existing content and build authority backlinks'
          }
        ],
        opportunities: [
          {
            opportunity: 'Jetex has outdated content from 2020-2021',
            impact: 'High',
            effort: 'Medium',
            competitor: 'Jetex'
          },
          {
            opportunity: 'Paramount lacks UAE-specific content',
            impact: 'Medium',
            effort: 'Low',
            competitor: 'Paramount Business Jets'
          },
          {
            opportunity: 'No competitor has comprehensive FAQ section',
            impact: 'High',
            effort: 'Low',
            competitor: 'All'
          }
        ]
      },
      recommendations: [
        {
          title: 'Steal Jetex\'s Content Strategy',
          description: 'Create better versions of their top-performing content pieces',
          competitorExample: 'Their "Ultimate Guide to Private Jet Charter" gets 5,400 monthly visits',
          expectedImpact: '+15-20 AI citations/month'
        },
        {
          title: 'Target Paramount\'s Weak Spots',
          description: 'Focus on UAE market where they have limited presence',
          competitorExample: 'They rank poorly for "Dubai private jet" terms',
          expectedImpact: '+10 organic rankings improvement'
        }
      ]
    }

    setTimeout(() => {
      setCompetitors(mockCompetitors)
      setAnalysis(mockAnalysis)
      setLoading(false)
    }, 1000)
  }

  const selectedCompetitorData = selectedCompetitor
    ? competitors.find(c => c.id === selectedCompetitor)
    : null

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />
      default: return <div className="h-4 w-4" />
    }
  }

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-400'
    if (position === 2) return 'text-gray-300'
    if (position === 3) return 'text-orange-400'
    return 'text-gray-400'
  }

  const generateCompetitorReport = (competitorId: string) => {
    trackFeatureUsage('competitor_report_generated', 'competitors', {
      competitor: competitorId,
      client: selectedClient
    })
    alert(`Detailed competitor report for ${competitors.find(c => c.id === competitorId)?.name} would be generated here`)
  }

  if (loading || !analysis) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <Eye className="h-8 w-8 animate-pulse text-gray-400" />
          <span className="ml-2 text-gray-400">Analyzing competitors...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-[#0f1419] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Competitive Intelligence</h1>
          <p className="text-gray-400">Understand your competition and find opportunities</p>
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
        </div>
      </div>

      {/* Market Position Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Your Position</p>
                <p className="text-2xl font-bold text-white">#{analysis.clientPosition}</p>
              </div>
              <Award className={`h-8 w-8 ${getPositionColor(analysis.clientPosition)}`} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">AI Citation Share</p>
                <p className="text-2xl font-bold text-white">{analysis.marketShare.aiCitations}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Organic Traffic Share</p>
                <p className="text-2xl font-bold text-white">{analysis.marketShare.organicTraffic}%</p>
              </div>
              <Globe className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Ad Visibility</p>
                <p className="text-2xl font-bold text-white">{analysis.marketShare.adVisibility}%</p>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-[#1f2937] border border-gray-600">
          <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Market Overview
          </TabsTrigger>
          <TabsTrigger value="individual" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Competitor Deep Dive
          </TabsTrigger>
          <TabsTrigger value="gaps" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Gap Analysis
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Opportunities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Competitor Rankings */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">🏆 Market Leaders</CardTitle>
              <CardDescription className="text-gray-400">
                Ranking by overall market presence and AI citations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitors.map((competitor, index) => (
                  <div key={competitor.id} className="flex items-center justify-between p-4 bg-[#0f1419] rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-400 text-black' :
                        index === 1 ? 'bg-gray-300 text-black' :
                        index === 2 ? 'bg-orange-400 text-black' : 'bg-gray-600 text-white'
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{competitor.name}</h4>
                        <p className="text-sm text-gray-400">{competitor.domain}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-6 text-right">
                      <div>
                        <p className="text-xs text-gray-400">AI Citations</p>
                        <div className="flex items-center justify-end space-x-1">
                          <p className="text-white font-bold">{competitor.metrics.aiCitations.total}</p>
                          {getTrendIcon(competitor.metrics.aiCitations.trend)}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">SEO Position</p>
                        <p className="text-white font-bold">#{competitor.metrics.seo.averagePosition}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Est. Ad Spend</p>
                        <p className="text-white font-bold">{formatCurrency(competitor.metrics.ads.estimatedSpend)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Content</p>
                        <p className="text-white font-bold">{competitor.metrics.content.blogPosts} posts</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Your Position */}
                <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-black">
                      #{analysis.clientPosition}
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-400">Midas Aero (You)</h4>
                      <p className="text-sm text-gray-400">Trending UP 📈</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-6 text-right">
                    <div>
                      <p className="text-xs text-gray-400">AI Citations</p>
                      <p className="text-emerald-400 font-bold">8</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">SEO Position</p>
                      <p className="text-emerald-400 font-bold">#28</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Ad Spend</p>
                      <p className="text-emerald-400 font-bold">$2,450</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Content</p>
                      <p className="text-emerald-400 font-bold">5 posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Share Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">AI Citation Market Share</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={[
                    { name: 'Jetex', value: 45, fill: '#f59e0b' },
                    { name: 'Paramount', value: 38, fill: '#6b7280' },
                    { name: 'Dubai PJ', value: 22, fill: '#f97316' },
                    { name: 'You', value: 8, fill: '#10b981' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                    <Bar dataKey="value" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Content Volume Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={[
                    { name: 'Jetex', value: 60, fill: '#f59e0b' },
                    { name: 'Paramount', value: 45, fill: '#6b7280' },
                    { name: 'Dubai PJ', value: 25, fill: '#f97316' },
                    { name: 'You', value: 5, fill: '#10b981' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                    <Bar dataKey="value" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          {/* Competitor Selection */}
          <div className="flex items-center space-x-4">
            <Select value={selectedCompetitor || ''} onValueChange={setSelectedCompetitor}>
              <SelectTrigger className="w-[300px] bg-[#1f2937] border-gray-600 text-white">
                <SelectValue placeholder="Select competitor for deep dive" />
              </SelectTrigger>
              <SelectContent>
                {competitors.map((competitor) => (
                  <SelectItem key={competitor.id} value={competitor.id}>
                    #{competitor.marketPosition} {competitor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCompetitorData && (
              <Button onClick={() => generateCompetitorReport(selectedCompetitorData.id)}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            )}
          </div>

          {selectedCompetitorData && (
            <div className="space-y-6">
              {/* Competitor Header */}
              <Card className="bg-[#1f2937] border-gray-600">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center space-x-3">
                        <span>#{selectedCompetitorData.marketPosition}</span>
                        <span>{selectedCompetitorData.name}</span>
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {selectedCompetitorData.domain} • {selectedCompetitorData.industry}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-white">
                      Market Leader
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Strengths</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {selectedCompetitorData.strengths.map((strength, index) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Weaknesses</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {selectedCompetitorData.weaknesses.map((weakness, index) => (
                          <li key={index}>• {weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#1f2937] border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">AI Citations Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Citations</span>
                      <span className="text-white font-bold">{selectedCompetitorData.metrics.aiCitations.total}/month</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">ChatGPT</span>
                        <span className="text-white">{selectedCompetitorData.metrics.aiCitations.byPlatform.chatgpt}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Claude</span>
                        <span className="text-white">{selectedCompetitorData.metrics.aiCitations.byPlatform.claude}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Perplexity</span>
                        <span className="text-white">{selectedCompetitorData.metrics.aiCitations.byPlatform.perplexity}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Gemini</span>
                        <span className="text-white">{selectedCompetitorData.metrics.aiCitations.byPlatform.gemini}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1f2937] border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">SEO & Content Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Avg Position</p>
                        <p className="text-white font-bold">#{selectedCompetitorData.metrics.seo.averagePosition}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Domain Authority</p>
                        <p className="text-white font-bold">{selectedCompetitorData.metrics.seo.domainAuthority}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Blog Posts</p>
                        <p className="text-white font-bold">{selectedCompetitorData.metrics.content.blogPosts}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Backlinks</p>
                        <p className="text-white font-bold">{formatNumber(selectedCompetitorData.metrics.seo.backlinks)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Content */}
              <Card className="bg-[#1f2937] border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedCompetitorData.metrics.content.topContent.map((content, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                        <div>
                          <p className="font-medium text-white">{content.title}</p>
                          <p className="text-sm text-gray-400">{formatNumber(content.traffic)} monthly traffic</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{content.citations}</p>
                          <p className="text-xs text-gray-400">citations</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Strategy Analysis */}
              <Card className="bg-[#1f2937] border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white">Strategy Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Content Strategy</h4>
                    <p className="text-gray-300 text-sm">{selectedCompetitorData.strategy.contentStrategy}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">SEO Strategy</h4>
                    <p className="text-gray-300 text-sm">{selectedCompetitorData.strategy.seoStrategy}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Ad Strategy</h4>
                    <p className="text-gray-300 text-sm">{selectedCompetitorData.strategy.adStrategy}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">🎯 Biggest Gaps to Close</CardTitle>
              <CardDescription className="text-gray-400">
                Where you're falling behind and what to do about it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.gapAnalysis.biggestGaps.map((gap, index) => (
                  <div key={index} className="p-4 bg-[#0f1419] rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{gap.area}</h4>
                      <Badge variant={gap.priority === 'high' ? 'destructive' : 'secondary'}>
                        {gap.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-red-400 mb-2">Gap: {gap.gap} positions/citations behind</p>
                    <p className="text-gray-300 text-sm">{gap.actionNeeded}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">💡 Competitive Opportunities</CardTitle>
              <CardDescription className="text-gray-400">
                Weaknesses you can exploit and gaps you can fill
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.gapAnalysis.opportunities.map((opp, index) => (
                  <div key={index} className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-400">{opp.opportunity}</h4>
                      <Badge variant="outline" className="text-gray-300">
                        vs {opp.competitor}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Impact</p>
                        <p className="text-white">{opp.impact}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Effort</p>
                        <p className="text-white">{opp.effort}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">vs Competitor</p>
                        <p className="text-white">{opp.competitor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actionable Recommendations */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">🚀 Steal Their Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-[#0f1419] rounded-lg">
                    <h4 className="font-semibold text-white mb-2">{rec.title}</h4>
                    <p className="text-gray-300 text-sm mb-3">{rec.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Example</p>
                        <p className="text-white">{rec.competitorExample}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Expected Impact</p>
                        <p className="text-emerald-400">{rec.expectedImpact}</p>
                      </div>
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