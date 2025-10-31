import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { CheckCircle, Circle, Clock, DollarSign, TrendingUp, AlertTriangle, Lightbulb, Target, Users, FileText, Zap } from 'lucide-react'
import { useAnalytics } from '../contexts/AnalyticsContext'

interface Recommendation {
  id: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  category: 'Quick Win' | 'Strategic' | 'Content' | 'SEO' | 'Ads' | 'Authority Building' | 'Competitive'
  title: string
  description: string
  impact: string
  effort: 'LOW' | 'MEDIUM' | 'HIGH'
  cost: string
  roi: 'EXTREME' | 'Very High' | 'HIGH' | 'Medium' | 'Low'
  timeline: string
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped'
  assignedTo: string
  deadline: string
  howTo: string[]
  expectedOutcome: string
  currentMetrics?: {
    metric: string
    current: number
    target: number
  }
  estimatedBenefit: {
    aiCitations?: number
    seoImprovement?: string
    leadGeneration?: number
    revenue?: number
  }
  dependencies?: string[]
  resources?: string[]
}

interface ClientAnalysis {
  gaps: {
    aiGaps: {
      missingPlatforms: string[]
      underperformingQueries: string[]
      competitorAdvantages: string[]
    }
    seoGaps: {
      almostPageOne: Array<{keyword: string, position: number}>
      missingContent: string[]
      technicalIssues: string[]
    }
    contentGaps: {
      missingFAQ: boolean
      outdatedContent: string[]
      competitorContent: string[]
    }
    adGaps: {
      missedKeywords: string[]
      poorPerformance: string[]
      competitorStrategy: string[]
    }
  }
  opportunities: {
    quickWins: Recommendation[]
    strategic: Recommendation[]
    competitive: Recommendation[]
  }
  budgetPlanning: {
    totalCost: number
    expectedRevenue: number
    roi: number
    timeframe: string
  }
}

export default function RecommendationsPage() {
  const [selectedClient, setSelectedClient] = useState('midas-aero')
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'not_started' | 'in_progress' | 'completed'>('all')
  const [analysis, setAnalysis] = useState<ClientAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const { trackFeatureUsage } = useAnalytics()

  const clients = [
    { id: 'midas-aero', name: 'Midas Aero', industry: 'Private Aviation' },
    { id: 'luxury-hotels', name: 'Luxury Hotels Dubai', industry: 'Hospitality' },
    { id: 'tech-startup', name: 'AI Tech Startup', industry: 'Technology' }
  ]

  useEffect(() => {
    trackFeatureUsage('recommendations_page_viewed', 'recommendations')
    generateRecommendations()
  }, [selectedClient])

  const generateRecommendations = async () => {
    setLoading(true)

    // Mock AI analysis - in production this would analyze actual client data
    const mockAnalysis: ClientAnalysis = {
      gaps: {
        aiGaps: {
          missingPlatforms: ['Perplexity'],
          underperformingQueries: ['private jet charter Dubai', 'luxury aviation services'],
          competitorAdvantages: ['More comprehensive content', '15x more citations', 'Authority backlinks']
        },
        seoGaps: {
          almostPageOne: [
            {keyword: 'luxury private jet UAE', position: 11},
            {keyword: 'Dubai private aviation', position: 13}
          ],
          missingContent: ['FAQ section', 'Comprehensive guides', 'Case studies'],
          technicalIssues: ['Slow page load times', 'Missing schema markup']
        },
        contentGaps: {
          missingFAQ: true,
          outdatedContent: ['Service pages (2022)', 'Blog posts (outdated)'],
          competitorContent: ['Ultimate guides', 'Comparison articles', 'Expert interviews']
        },
        adGaps: {
          missedKeywords: ['private jet charter Dubai', 'luxury aviation UAE'],
          poorPerformance: ['Low CTR on brand terms'],
          competitorStrategy: ['Higher budget allocation', 'Better ad copy', 'Landing page optimization']
        }
      },
      opportunities: {
        quickWins: [
          {
            id: 'faq-section',
            priority: 'high',
            category: 'Quick Win',
            title: 'Add FAQ Section to Website',
            description: 'AI models frequently cite FAQ content. Adding comprehensive FAQ section will boost citations across all platforms.',
            impact: '+10-15 AI citations/month',
            effort: 'LOW',
            cost: '$300 (writer) or $0 (DIY)',
            roi: 'Very High',
            timeline: '1 week',
            status: 'not_started',
            assignedTo: 'Content Team',
            deadline: '2024-11-08',
            howTo: [
              'List 20 common questions customers ask',
              'Write 100-200 word answers for each',
              'Add schema markup for rich snippets',
              'Publish at yoursite.com/faq',
              'Optimize for voice search queries'
            ],
            expectedOutcome: '10-15 additional AI citations per month, improved search visibility',
            estimatedBenefit: {
              aiCitations: 12,
              seoImprovement: '+5 positions average',
              leadGeneration: 2
            },
            resources: ['FAQ content template', 'Schema markup guide', 'Voice search optimization tips']
          },
          {
            id: 'page-one-push',
            priority: 'high',
            category: 'SEO',
            title: 'Push "luxury private jet UAE" to Page 1',
            description: 'Currently at position #11 (page 2). Small optimization push can get this to page 1 for massive visibility boost.',
            impact: '+200% visibility for this keyword',
            effort: 'MEDIUM',
            cost: '$500-800',
            roi: 'Very High',
            timeline: '2 weeks',
            status: 'not_started',
            assignedTo: 'SEO Team',
            deadline: '2024-11-15',
            howTo: [
              'Expand existing content from 800 to 2,000+ words',
              'Add 3-5 quality internal links',
              'Get 2-3 backlinks from industry sites',
              'Optimize title tag and meta description',
              'Add 2-3 images with alt text',
              'Improve page load speed'
            ],
            expectedOutcome: 'Position #5-8 on page 1, 150+ additional monthly visitors',
            currentMetrics: {
              metric: 'Current Position',
              current: 11,
              target: 7
            },
            estimatedBenefit: {
              seoImprovement: 'Position #5-8',
              leadGeneration: 3,
              revenue: 25000
            },
            dependencies: ['Content expansion', 'Link building campaign'],
            resources: ['Content optimization checklist', 'Link building contacts', 'Technical SEO audit']
          }
        ],
        strategic: [
          {
            id: 'authority-building',
            priority: 'medium',
            category: 'Authority Building',
            title: 'Get Featured in Authority Publications',
            description: 'Perplexity heavily favors recent content from authoritative sources. Need press coverage to boost visibility.',
            impact: '+20 Perplexity citations, +10 SEO backlinks',
            effort: 'HIGH',
            cost: '$1,500-3,000',
            roi: 'HIGH',
            timeline: '2 months',
            status: 'not_started',
            assignedTo: 'PR Team / Rapid Empires',
            deadline: '2024-12-15',
            howTo: [
              'Create newsworthy story (e.g., "We served 1,000th client")',
              'Write professional press release',
              'Pitch to: Aviation Week, Business Jet Traveler, Gulf News',
              'Offer expert commentary on aviation trends',
              'Leverage coverage for social proof and backlinks'
            ],
            expectedOutcome: 'Featured in 2-3 authority publications, significant boost in AI citations',
            estimatedBenefit: {
              aiCitations: 20,
              seoImprovement: '+15 domain authority',
              leadGeneration: 5
            },
            resources: ['Press release template', 'Media contact list', 'Story angle ideas']
          }
        ],
        competitive: [
          {
            id: 'competitor-content-gap',
            priority: 'critical',
            category: 'Competitive',
            title: 'Close Content Gap with Jetex',
            description: 'Jetex has 60+ blog posts getting 45 AI citations/month. You have 5 posts getting 8 citations. Bridge this gap.',
            impact: '+25-30 AI citations/month',
            effort: 'HIGH',
            cost: '$5,000-8,000',
            roi: 'EXTREME',
            timeline: '3 months',
            status: 'not_started',
            assignedTo: 'Content Team + Agency',
            deadline: '2025-01-15',
            howTo: [
              'Audit Jetex\'s top 20 performing articles',
              'Create better, more comprehensive versions',
              'Focus on: Ultimate guides, How-to articles, Industry insights',
              'Publish 2 articles per month consistently',
              'Optimize each for AI citation and SEO'
            ],
            expectedOutcome: 'Match Jetex content quality, significantly increase AI visibility',
            estimatedBenefit: {
              aiCitations: 28,
              seoImprovement: '+20 average positions',
              leadGeneration: 8,
              revenue: 150000
            },
            dependencies: ['Content strategy approval', 'Writer/agency selection'],
            resources: ['Competitor content analysis', 'Content calendar template', 'AI optimization guide']
          }
        ]
      },
      budgetPlanning: {
        totalCost: 12800,
        expectedRevenue: 175000,
        roi: 13.7,
        timeframe: '6 months'
      }
    }

    // Combine all recommendations
    const allRecommendations = [
      ...mockAnalysis.opportunities.quickWins,
      ...mockAnalysis.opportunities.strategic,
      ...mockAnalysis.opportunities.competitive
    ]

    setTimeout(() => {
      setAnalysis(mockAnalysis)
      setLoading(false)
    }, 1000)
  }

  const updateRecommendationStatus = (id: string, newStatus: Recommendation['status']) => {
    trackFeatureUsage('recommendation_status_updated', 'recommendations', {
      recommendationId: id,
      newStatus,
      client: selectedClient
    })

    // In production, this would update the backend
    console.log(`Updating recommendation ${id} to ${newStatus}`)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive'
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'outline'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />
      case 'high': return <TrendingUp className="h-4 w-4" />
      case 'medium': return <Target className="h-4 w-4" />
      case 'low': return <Clock className="h-4 w-4" />
      default: return <Circle className="h-4 w-4" />
    }
  }

  const getROIColor = (roi: string) => {
    switch (roi) {
      case 'EXTREME': return 'text-green-400'
      case 'Very High': return 'text-green-300'
      case 'HIGH': return 'text-emerald-400'
      case 'Medium': return 'text-yellow-400'
      case 'Low': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'in_progress': return <Clock className="h-4 w-4 text-yellow-400" />
      case 'skipped': return <Circle className="h-4 w-4 text-gray-400" />
      default: return <Circle className="h-4 w-4 text-gray-600" />
    }
  }

  const generateBudgetProposal = () => {
    trackFeatureUsage('budget_proposal_generated', 'recommendations', { client: selectedClient })
    alert('Budget proposal generation feature would be implemented here')
  }

  if (loading || !analysis) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <Lightbulb className="h-8 w-8 animate-pulse text-gray-400" />
          <span className="ml-2 text-gray-400">Analyzing opportunities...</span>
        </div>
      </div>
    )
  }

  const allRecommendations = [
    ...analysis.opportunities.quickWins,
    ...analysis.opportunities.strategic,
    ...analysis.opportunities.competitive
  ]

  const filteredRecommendations = allRecommendations.filter(rec => {
    const priorityMatch = activeFilter === 'all' || rec.priority === activeFilter
    const statusMatch = statusFilter === 'all' || rec.status === statusFilter
    return priorityMatch && statusMatch
  })

  const quickWinsCount = analysis.opportunities.quickWins.length
  const strategicCount = analysis.opportunities.strategic.length
  const competitiveCount = analysis.opportunities.competitive.length

  return (
    <div className="p-6 space-y-6 bg-[#0f1419] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Recommendations</h1>
          <p className="text-gray-400">AI-powered action items prioritized by ROI</p>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Quick Wins</p>
                <p className="text-2xl font-bold text-white">{quickWinsCount}</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Strategic</p>
                <p className="text-2xl font-bold text-white">{strategicCount}</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Competitive</p>
                <p className="text-2xl font-bold text-white">{competitiveCount}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total ROI</p>
                <p className="text-2xl font-bold text-white">{analysis.budgetPlanning.roi.toFixed(1)}x</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Select value={activeFilter} onValueChange={(value: any) => setActiveFilter(value)}>
          <SelectTrigger className="w-[150px] bg-[#1f2937] border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-[150px] bg-[#1f2937] border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="not_started">Not Started</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Recommendations List */}
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList className="bg-[#1f2937] border border-gray-600">
          <TabsTrigger value="list" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Action Items
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Budget Planner
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Implementation Calendar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getPriorityIcon(rec.priority)}
                    <div>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <span>{rec.title}</span>
                        <Badge variant={getPriorityColor(rec.priority)}>
                          {rec.priority.toUpperCase()}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {rec.category} • {rec.timeline} • {rec.effort} effort
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(rec.status)}
                    <span className="text-sm text-gray-400">
                      Due: {new Date(rec.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{rec.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-[#0f1419] rounded-lg">
                  <div>
                    <p className="text-gray-400 text-sm">Impact</p>
                    <p className="text-white font-medium">{rec.impact}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Cost</p>
                    <p className="text-white font-medium">{rec.cost}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">ROI</p>
                    <p className={`font-medium ${getROIColor(rec.roi)}`}>{rec.roi}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Assigned To</p>
                    <p className="text-white font-medium">{rec.assignedTo}</p>
                  </div>
                </div>

                {/* Expected Benefits */}
                {rec.estimatedBenefit && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <h4 className="text-emerald-400 font-medium mb-2">Expected Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {rec.estimatedBenefit.aiCitations && (
                        <div>
                          <p className="text-gray-400">AI Citations</p>
                          <p className="text-white">+{rec.estimatedBenefit.aiCitations}/month</p>
                        </div>
                      )}
                      {rec.estimatedBenefit.seoImprovement && (
                        <div>
                          <p className="text-gray-400">SEO Improvement</p>
                          <p className="text-white">{rec.estimatedBenefit.seoImprovement}</p>
                        </div>
                      )}
                      {rec.estimatedBenefit.leadGeneration && (
                        <div>
                          <p className="text-gray-400">Additional Leads</p>
                          <p className="text-white">+{rec.estimatedBenefit.leadGeneration}/month</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* How To Steps */}
                <div className="space-y-2">
                  <h4 className="text-white font-medium">Implementation Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                    {rec.howTo.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-600">
                  <Button
                    size="sm"
                    onClick={() => updateRecommendationStatus(rec.id, 'in_progress')}
                    disabled={rec.status === 'in_progress'}
                  >
                    Start Task
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateRecommendationStatus(rec.id, 'completed')}
                    disabled={rec.status === 'completed'}
                  >
                    Mark Complete
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateRecommendationStatus(rec.id, 'skipped')}
                  >
                    Skip
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">💰 Budget Planning</CardTitle>
              <CardDescription className="text-gray-400">
                Investment required and expected returns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#0f1419] rounded-lg">
                  <h4 className="text-white font-medium mb-2">Total Investment</h4>
                  <p className="text-3xl font-bold text-white">
                    ${analysis.budgetPlanning.totalCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">Over {analysis.budgetPlanning.timeframe}</p>
                </div>
                <div className="p-4 bg-[#0f1419] rounded-lg">
                  <h4 className="text-white font-medium mb-2">Expected Revenue</h4>
                  <p className="text-3xl font-bold text-green-400">
                    ${analysis.budgetPlanning.expectedRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">From new bookings</p>
                </div>
                <div className="p-4 bg-[#0f1419] rounded-lg">
                  <h4 className="text-white font-medium mb-2">ROI</h4>
                  <p className="text-3xl font-bold text-emerald-400">
                    {analysis.budgetPlanning.roi.toFixed(1)}x
                  </p>
                  <p className="text-sm text-gray-400">Return on investment</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Budget Breakdown by Category</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                    <span className="text-gray-300">Quick Wins</span>
                    <span className="text-white font-medium">$800</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                    <span className="text-gray-300">Strategic Initiatives</span>
                    <span className="text-white font-medium">$4,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                    <span className="text-gray-300">Competitive Actions</span>
                    <span className="text-white font-medium">$8,000</span>
                  </div>
                </div>
              </div>

              <Button onClick={generateBudgetProposal} className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Detailed Budget Proposal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">📅 Implementation Timeline</CardTitle>
              <CardDescription className="text-gray-400">
                Recommended execution schedule for maximum impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-3">November 2024 (This Month)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Add FAQ Section</p>
                        <p className="text-sm text-gray-400">Quick win • Due Nov 8</p>
                      </div>
                      <Badge variant="secondary">Week 1</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Push "luxury private jet UAE" to Page 1</p>
                        <p className="text-sm text-gray-400">SEO optimization • Due Nov 15</p>
                      </div>
                      <Badge variant="secondary">Week 2</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">December 2024</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Authority Building Campaign</p>
                        <p className="text-sm text-gray-400">Strategic initiative • Due Dec 15</p>
                      </div>
                      <Badge variant="secondary">Month 2</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Q1 2025</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Close Content Gap with Jetex</p>
                        <p className="text-sm text-gray-400">Competitive action • Due Jan 15</p>
                      </div>
                      <Badge variant="secondary">3 Months</Badge>
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