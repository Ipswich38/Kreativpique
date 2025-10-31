import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { Calendar } from './ui/calendar'
import { FileText, Lightbulb, Calendar as CalendarIcon, Target, TrendingUp, Zap, Users, Globe, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { useAnalytics } from '../contexts/AnalyticsContext'

interface ContentOpportunity {
  id: string
  title: string
  type: 'faq' | 'guide' | 'comparison' | 'case_study' | 'how_to' | 'news' | 'list'
  priority: 'critical' | 'high' | 'medium' | 'low'
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedImpact: {
    aiCitations: number
    seoTraffic: number
    leadGeneration: number
  }
  targetKeywords: string[]
  competitorGap: string
  reason: string
  estimatedWordCount: number
  timeToCreate: string
  suggestedOutline: string[]
  examples: Array<{
    competitor: string
    url: string
    performance: string
  }>
  status: 'suggested' | 'planned' | 'in_progress' | 'completed' | 'published'
  assignedTo?: string
  deadline?: string
}

interface ContentCalendar {
  date: string
  content: ContentOpportunity[]
  notes?: string
}

interface AIWritingAssistant {
  topic: string
  keywords: string[]
  targetLength: number
  tone: 'professional' | 'casual' | 'expert' | 'friendly'
  audience: 'general' | 'technical' | 'executives' | 'consumers'
  contentType: 'blog' | 'faq' | 'guide' | 'landing_page' | 'email'
}

export default function ContentLabPage() {
  const [selectedClient, setSelectedClient] = useState('midas-aero')
  const [contentOpportunities, setContentOpportunities] = useState<ContentOpportunity[]>([])
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null>(null)
  const [calendarData, setCalendarData] = useState<ContentCalendar[]>([])
  const [aiAssistant, setAIAssistant] = useState<AIWritingAssistant>({
    topic: '',
    keywords: [],
    targetLength: 2000,
    tone: 'professional',
    audience: 'general',
    contentType: 'blog'
  })
  const [loading, setLoading] = useState(true)
  const { trackFeatureUsage } = useAnalytics()

  const clients = [
    { id: 'midas-aero', name: 'Midas Aero', industry: 'Private Aviation' },
    { id: 'luxury-hotels', name: 'Luxury Hotels Dubai', industry: 'Hospitality' },
    { id: 'tech-startup', name: 'AI Tech Startup', industry: 'Technology' }
  ]

  useEffect(() => {
    trackFeatureUsage('content_lab_viewed', 'content_lab')
    generateContentOpportunities()
  }, [selectedClient])

  const generateContentOpportunities = async () => {
    setLoading(true)

    // Mock AI-generated content opportunities - in production this would analyze competitor content, AI citation gaps, etc.
    const mockOpportunities: ContentOpportunity[] = [
      {
        id: 'faq-section',
        title: 'Comprehensive FAQ Section',
        type: 'faq',
        priority: 'critical',
        difficulty: 'easy',
        estimatedImpact: {
          aiCitations: 15,
          seoTraffic: 500,
          leadGeneration: 3
        },
        targetKeywords: ['private jet charter FAQ', 'luxury aviation questions', 'Dubai private jet costs'],
        competitorGap: 'No competitor has comprehensive FAQ section - huge opportunity!',
        reason: 'AI models cite FAQ content frequently. Your competitors lack this content type.',
        estimatedWordCount: 3000,
        timeToCreate: '1 week',
        suggestedOutline: [
          'How much does it cost to charter a private jet from Dubai?',
          'What\'s the difference between charter and fractional ownership?',
          'Can I fly pets on a private jet?',
          'How far in advance should I book?',
          'What airports can private jets use in Dubai?',
          'What safety certifications do you have?',
          'Can I change my flight last minute?',
          'What\'s included in the charter price?',
          'How many passengers can different jets carry?',
          'What documents do I need for international flights?'
        ],
        examples: [
          {
            competitor: 'NetJets (US market)',
            url: 'netjets.com/faq',
            performance: 'Gets 25+ AI citations monthly'
          }
        ],
        status: 'suggested'
      },
      {
        id: 'ultimate-guide',
        title: 'Ultimate Guide to Private Jet Charter in Dubai',
        type: 'guide',
        priority: 'critical',
        difficulty: 'hard',
        estimatedImpact: {
          aiCitations: 25,
          seoTraffic: 2000,
          leadGeneration: 8
        },
        targetKeywords: ['private jet charter Dubai', 'luxury aviation UAE', 'Dubai private aviation guide'],
        competitorGap: 'Jetex has outdated guide from 2021 - opportunity to create better version',
        reason: 'Comprehensive guides are citation magnets. Jetex\'s version is outdated and vulnerable.',
        estimatedWordCount: 5000,
        timeToCreate: '3 weeks',
        suggestedOutline: [
          'Introduction to Dubai\'s Private Aviation Market',
          'Types of Private Jets Available',
          'Dubai\'s Private Jet Airports (DXB, DWC, Al Maktoum)',
          'Charter vs Ownership: What\'s Right for You?',
          'Costs and Pricing Structure',
          'Booking Process Step-by-Step',
          'UAE Aviation Regulations and Requirements',
          'International Flight Considerations',
          'Luxury Amenities and Services',
          'Safety and Security Standards',
          'Best Routes from Dubai',
          'Seasonal Considerations',
          'Case Studies and Examples',
          'Choosing the Right Charter Company'
        ],
        examples: [
          {
            competitor: 'Jetex',
            url: 'jetex.com/guide-to-private-aviation',
            performance: '5,400 monthly visits, 12 AI citations'
          }
        ],
        status: 'suggested'
      },
      {
        id: 'dubai-vs-abu-dhabi',
        title: 'Dubai vs Abu Dhabi Private Jet Services: Complete Comparison',
        type: 'comparison',
        priority: 'high',
        difficulty: 'medium',
        estimatedImpact: {
          aiCitations: 12,
          seoTraffic: 800,
          leadGeneration: 4
        },
        targetKeywords: ['Dubai vs Abu Dhabi private jets', 'UAE private aviation comparison', 'best private jet UAE'],
        competitorGap: 'No competitor has detailed UAE market comparison',
        reason: 'Comparison content performs well in AI citations and captures users considering options.',
        estimatedWordCount: 3500,
        timeToCreate: '2 weeks',
        suggestedOutline: [
          'Executive Summary',
          'Airport Infrastructure Comparison',
          'Available Services and Amenities',
          'Cost Differences',
          'Regulatory Environment',
          'Popular Routes from Each City',
          'Business Climate and Preferences',
          'Luxury Accommodations and Ground Services',
          'Recommendations by Use Case',
          'Conclusion and Next Steps'
        ],
        examples: [
          {
            competitor: 'None found',
            url: '',
            performance: 'First-mover advantage available'
          }
        ],
        status: 'suggested'
      },
      {
        id: 'safety-standards',
        title: 'Private Jet Safety Standards and Certifications in UAE',
        type: 'guide',
        priority: 'medium',
        difficulty: 'medium',
        estimatedImpact: {
          aiCitations: 8,
          seoTraffic: 600,
          leadGeneration: 2
        },
        targetKeywords: ['private jet safety UAE', 'aviation safety standards', 'GCAA regulations'],
        competitorGap: 'Technical safety content is missing from all competitors',
        reason: 'Safety is a primary concern for private jet customers. Technical content builds trust.',
        estimatedWordCount: 2500,
        timeToCreate: '1.5 weeks',
        suggestedOutline: [
          'UAE Aviation Safety Overview',
          'GCAA Certification Requirements',
          'International Safety Standards',
          'Pilot Training and Certification',
          'Aircraft Maintenance Standards',
          'Safety Record and Statistics',
          'Emergency Procedures',
          'Insurance and Liability',
          'Choosing Safe Charter Operators',
          'Red Flags to Watch For'
        ],
        examples: [],
        status: 'suggested'
      },
      {
        id: 'cost-calculator',
        title: 'Private Jet Charter Cost Calculator and Pricing Guide',
        type: 'how_to',
        priority: 'high',
        difficulty: 'medium',
        estimatedImpact: {
          aiCitations: 10,
          seoTraffic: 1200,
          leadGeneration: 6
        },
        targetKeywords: ['private jet cost calculator', 'charter jet pricing', 'Dubai private jet costs'],
        competitorGap: 'Paramount has basic calculator, but no detailed breakdown',
        reason: 'Cost transparency builds trust and captures high-intent users.',
        estimatedWordCount: 2000,
        timeToCreate: '1 week',
        suggestedOutline: [
          'Factors Affecting Private Jet Costs',
          'Base Hourly Rates by Aircraft Type',
          'Additional Fees and Charges',
          'Route-Specific Pricing Examples',
          'Seasonal Price Variations',
          'Money-Saving Tips',
          'Hidden Costs to Avoid',
          'When to Book for Best Rates',
          'Payment Terms and Options',
          'Cost Comparison Tools'
        ],
        examples: [
          {
            competitor: 'Paramount Business Jets',
            url: 'paramountbusinessjets.com/cost-calculator',
            performance: '6,200 monthly visits, basic tool'
          }
        ],
        status: 'suggested'
      }
    ]

    // Mock calendar data
    const mockCalendar: ContentCalendar[] = [
      {
        date: '2024-11-08',
        content: [mockOpportunities[0]], // FAQ section
        notes: 'Quick win - start here!'
      },
      {
        date: '2024-11-15',
        content: [mockOpportunities[3]], // Safety guide
        notes: 'Build authority'
      },
      {
        date: '2024-11-22',
        content: [mockOpportunities[4]], // Cost calculator
        notes: 'High-converting content'
      },
      {
        date: '2024-11-29',
        content: [mockOpportunities[1]], // Ultimate guide part 1
        notes: 'Major content piece - allocate more time'
      }
    ]

    setTimeout(() => {
      setContentOpportunities(mockOpportunities)
      setCalendarData(mockCalendar)
      setLoading(false)
    }, 1000)
  }

  const updateContentStatus = (id: string, newStatus: ContentOpportunity['status']) => {
    trackFeatureUsage('content_status_updated', 'content_lab', {
      contentId: id,
      newStatus,
      client: selectedClient
    })

    setContentOpportunities(prev =>
      prev.map(opp =>
        opp.id === id ? { ...opp, status: newStatus } : opp
      )
    )
  }

  const generateContent = () => {
    trackFeatureUsage('ai_content_generated', 'content_lab', {
      topic: aiAssistant.topic,
      contentType: aiAssistant.contentType,
      targetLength: aiAssistant.targetLength
    })

    // In production, this would call an AI content generation API
    alert('AI content generation feature would be implemented here')
  }

  const scheduleContent = (opportunityId: string, date: string) => {
    trackFeatureUsage('content_scheduled', 'content_lab', {
      contentId: opportunityId,
      scheduledDate: date
    })

    // Update calendar
    setCalendarData(prev => {
      const existingEntry = prev.find(entry => entry.date === date)
      const opportunity = contentOpportunities.find(opp => opp.id === opportunityId)

      if (existingEntry && opportunity) {
        return prev.map(entry =>
          entry.date === date
            ? { ...entry, content: [...entry.content, opportunity] }
            : entry
        )
      } else if (opportunity) {
        return [...prev, { date, content: [opportunity] }]
      }
      return prev
    })

    // Update opportunity status
    updateContentStatus(opportunityId, 'planned')
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'hard': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'published': return <Globe className="h-4 w-4 text-blue-400" />
      case 'in_progress': return <Clock className="h-4 w-4 text-yellow-400" />
      case 'planned': return <CalendarIcon className="h-4 w-4 text-purple-400" />
      default: return <Lightbulb className="h-4 w-4 text-gray-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'faq': return '❓'
      case 'guide': return '📚'
      case 'comparison': return '⚖️'
      case 'case_study': return '📋'
      case 'how_to': return '🔧'
      case 'news': return '📰'
      case 'list': return '📝'
      default: return '📄'
    }
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <FileText className="h-8 w-8 animate-pulse text-gray-400" />
          <span className="ml-2 text-gray-400">Analyzing content opportunities...</span>
        </div>
      </div>
    )
  }

  const totalEstimatedCitations = contentOpportunities.reduce((sum, opp) => sum + opp.estimatedImpact.aiCitations, 0)
  const totalEstimatedTraffic = contentOpportunities.reduce((sum, opp) => sum + opp.estimatedImpact.seoTraffic, 0)
  const totalEstimatedLeads = contentOpportunities.reduce((sum, opp) => sum + opp.estimatedImpact.leadGeneration, 0)

  return (
    <div className="p-6 space-y-6 bg-[#0f1419] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Lab</h1>
          <p className="text-gray-400">AI-powered content strategy and creation</p>
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

      {/* Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Potential Citations</p>
                <p className="text-2xl font-bold text-white">+{totalEstimatedCitations}</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
            <p className="text-xs text-gray-400 mt-1">per month when complete</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">SEO Traffic</p>
                <p className="text-2xl font-bold text-white">+{totalEstimatedTraffic.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-xs text-gray-400 mt-1">monthly visitors</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Lead Generation</p>
                <p className="text-2xl font-bold text-white">+{totalEstimatedLeads}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-xs text-gray-400 mt-1">additional leads/month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Content Pieces</p>
                <p className="text-2xl font-bold text-white">{contentOpportunities.length}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-400" />
            </div>
            <p className="text-xs text-gray-400 mt-1">opportunities identified</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList className="bg-[#1f2937] border border-gray-600">
          <TabsTrigger value="opportunities" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Content Opportunities
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Publishing Calendar
          </TabsTrigger>
          <TabsTrigger value="ai-assistant" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            AI Writing Assistant
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Content Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {contentOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="bg-[#1f2937] border-gray-600">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTypeIcon(opportunity.type)}</span>
                      <div>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <span>{opportunity.title}</span>
                          <Badge variant={getPriorityColor(opportunity.priority)}>
                            {opportunity.priority.toUpperCase()}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {opportunity.timeToCreate} • {opportunity.estimatedWordCount} words •
                          <span className={getDifficultyColor(opportunity.difficulty)}> {opportunity.difficulty} difficulty</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(opportunity.status)}
                      <span className="text-sm text-gray-400 capitalize">{opportunity.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{opportunity.reason}</p>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#0f1419] rounded-lg">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">AI Citations</p>
                      <p className="text-2xl font-bold text-blue-400">+{opportunity.estimatedImpact.aiCitations}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">SEO Traffic</p>
                      <p className="text-2xl font-bold text-green-400">+{opportunity.estimatedImpact.seoTraffic}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Leads</p>
                      <p className="text-2xl font-bold text-purple-400">+{opportunity.estimatedImpact.leadGeneration}</p>
                    </div>
                  </div>

                  {/* Competitive Gap */}
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <h4 className="text-yellow-400 font-medium mb-2">🎯 Competitive Opportunity</h4>
                    <p className="text-gray-300 text-sm">{opportunity.competitorGap}</p>
                  </div>

                  {/* Target Keywords */}
                  <div>
                    <h4 className="text-white font-medium mb-2">Target Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.targetKeywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-gray-300">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Outline */}
                  <div>
                    <h4 className="text-white font-medium mb-2">Suggested Outline</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                      {opportunity.suggestedOutline.slice(0, 5).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                      {opportunity.suggestedOutline.length > 5 && (
                        <li className="text-gray-400">... and {opportunity.suggestedOutline.length - 5} more sections</li>
                      )}
                    </ol>
                  </div>

                  {/* Examples */}
                  {opportunity.examples.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Competitor Examples</h4>
                      <div className="space-y-2">
                        {opportunity.examples.map((example, index) => (
                          <div key={index} className="p-3 bg-[#0f1419] rounded-lg">
                            <div className="flex items-center justify-between">
                              <p className="text-white font-medium">{example.competitor}</p>
                              <p className="text-sm text-gray-400">{example.performance}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 pt-4 border-t border-gray-600">
                    <Button
                      size="sm"
                      onClick={() => updateContentStatus(opportunity.id, 'in_progress')}
                      disabled={opportunity.status === 'in_progress' || opportunity.status === 'completed'}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Start Creating
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const date = prompt('Enter deadline (YYYY-MM-DD):')
                        if (date) scheduleContent(opportunity.id, date)
                      }}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedOpportunity(opportunity.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">📅 Content Publishing Calendar</CardTitle>
              <CardDescription className="text-gray-400">
                Planned content schedule for maximum impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calendarData.map((entry, index) => (
                  <div key={index} className="p-4 bg-[#0f1419] rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h4>
                      <Badge variant="outline" className="text-gray-300">
                        {entry.content.length} piece{entry.content.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {entry.content.map((content, contentIndex) => (
                        <div key={contentIndex} className="flex items-center justify-between p-2 bg-[#1f2937] rounded">
                          <div className="flex items-center space-x-2">
                            <span>{getTypeIcon(content.type)}</span>
                            <span className="text-white">{content.title}</span>
                            <Badge variant={getPriorityColor(content.priority)} className="text-xs">
                              {content.priority}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-400">{content.timeToCreate}</span>
                        </div>
                      ))}
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-400 mt-2 italic">{entry.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-assistant" className="space-y-6">
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">🤖 AI Writing Assistant</CardTitle>
              <CardDescription className="text-gray-400">
                Generate SEO-optimized content drafts with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Topic</Label>
                  <Input
                    value={aiAssistant.topic}
                    onChange={(e) => setAIAssistant(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="e.g., Private Jet Safety Standards"
                    className="bg-[#0f1419] border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Target Length</Label>
                  <Select
                    value={aiAssistant.targetLength.toString()}
                    onValueChange={(value) => setAIAssistant(prev => ({ ...prev, targetLength: parseInt(value) }))}
                  >
                    <SelectTrigger className="bg-[#0f1419] border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500">500 words (Short)</SelectItem>
                      <SelectItem value="1000">1,000 words (Medium)</SelectItem>
                      <SelectItem value="2000">2,000 words (Long)</SelectItem>
                      <SelectItem value="3000">3,000 words (Comprehensive)</SelectItem>
                      <SelectItem value="5000">5,000+ words (Ultimate Guide)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white">Content Type</Label>
                  <Select
                    value={aiAssistant.contentType}
                    onValueChange={(value: any) => setAIAssistant(prev => ({ ...prev, contentType: value }))}
                  >
                    <SelectTrigger className="bg-[#0f1419] border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="faq">FAQ Section</SelectItem>
                      <SelectItem value="guide">Comprehensive Guide</SelectItem>
                      <SelectItem value="landing_page">Landing Page</SelectItem>
                      <SelectItem value="email">Email Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white">Tone</Label>
                  <Select
                    value={aiAssistant.tone}
                    onValueChange={(value: any) => setAIAssistant(prev => ({ ...prev, tone: value }))}
                  >
                    <SelectTrigger className="bg-[#0f1419] border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="expert">Expert/Technical</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-white">Keywords (comma-separated)</Label>
                <Input
                  value={aiAssistant.keywords.join(', ')}
                  onChange={(e) => setAIAssistant(prev => ({
                    ...prev,
                    keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  }))}
                  placeholder="private jet charter, luxury aviation, Dubai"
                  className="bg-[#0f1419] border-gray-600 text-white"
                />
              </div>

              <Button onClick={generateContent} className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Generate AI Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">📝 Content Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Ultimate Guide Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  FAQ Section Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Comparison Article Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  How-To Guide Template
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">🎯 SEO Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Keyword Research Tool
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Content Optimization Checker
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Schema Markup Generator
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Content Performance Tracker
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={`text-sm font-medium ${className}`}>{children}</label>
}