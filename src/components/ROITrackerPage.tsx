import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Progress } from './ui/progress'
import { DollarSign, TrendingUp, TrendingDown, Target, Users, Calendar, FileText, Award, Zap, Calculator } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts'
import { useAnalytics } from '../contexts/AnalyticsContext'

interface ROIMetrics {
  platformInvestment: {
    monthlyFee: number
    totalInvested: number
    monthsActive: number
    additionalCosts: number
  }
  resultsDelivered: {
    aiCitations: {
      baseline: number
      current: number
      growth: number
      monthlyTrend: Array<{
        month: string
        citations: number
        value: number
      }>
    }
    seoPerformance: {
      avgPositionBefore: number
      avgPositionAfter: number
      trafficIncrease: number
      page1Keywords: {
        before: number
        after: number
      }
      monthlyTrend: Array<{
        month: string
        avgPosition: number
        traffic: number
      }>
    }
    adPerformance: {
      ctrImprovement: number
      cpcReduction: number
      conversionsIncrease: number
      costSavings: number
    }
  }
  revenueAttribution: {
    leadsGenerated: number
    sourceBreakdown: Array<{
      source: string
      leads: number
      conversionRate: number
      revenue: number
    }>
    totalRevenue: number
    averageDealSize: number
    monthlyTrend: Array<{
      month: string
      leads: number
      revenue: number
    }>
  }
  roi: {
    currentROI: number
    projectedROI: number
    paybackPeriod: number
    netProfit: number
  }
  projections: {
    sixMonth: {
      expectedCitations: number
      expectedLeads: number
      expectedRevenue: number
      projectedROI: number
    }
    twelveMonth: {
      expectedCitations: number
      expectedLeads: number
      expectedRevenue: number
      projectedROI: number
    }
  }
  benchmarks: {
    industryAverage: {
      roi: number
      growthRate: number
      citationRate: number
    }
    topPerformers: {
      roi: number
      growthRate: number
      citationRate: number
    }
  }
}

export default function ROITrackerPage() {
  const [selectedClient, setSelectedClient] = useState('midas-aero')
  const [timeframe, setTimeframe] = useState<'3m' | '6m' | '12m' | 'all'>('6m')
  const [roiMetrics, setROIMetrics] = useState<ROIMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const { trackFeatureUsage } = useAnalytics()

  const clients = [
    { id: 'midas-aero', name: 'Midas Aero', industry: 'Private Aviation' },
    { id: 'luxury-hotels', name: 'Luxury Hotels Dubai', industry: 'Hospitality' },
    { id: 'tech-startup', name: 'AI Tech Startup', industry: 'Technology' }
  ]

  useEffect(() => {
    trackFeatureUsage('roi_tracker_viewed', 'roi_tracker')
    loadROIData()
  }, [selectedClient, timeframe])

  const loadROIData = async () => {
    setLoading(true)

    // Mock ROI data - in production this would come from actual platform metrics
    const mockROIData: ROIMetrics = {
      platformInvestment: {
        monthlyFee: 499,
        totalInvested: 1497, // 3 months
        monthsActive: 3,
        additionalCosts: 850 // Implementation, content creation, etc.
      },
      resultsDelivered: {
        aiCitations: {
          baseline: 0,
          current: 8,
          growth: Infinity, // 0 to 8 = infinite growth
          monthlyTrend: [
            { month: 'Aug 2024', citations: 0, value: 0 },
            { month: 'Sep 2024', citations: 2, value: 5000 },
            { month: 'Oct 2024', citations: 8, value: 20000 },
            { month: 'Nov 2024', citations: 12, value: 30000 }
          ]
        },
        seoPerformance: {
          avgPositionBefore: 43,
          avgPositionAfter: 28,
          trafficIncrease: 300,
          page1Keywords: {
            before: 0,
            after: 2
          },
          monthlyTrend: [
            { month: 'Aug 2024', avgPosition: 43, traffic: 120 },
            { month: 'Sep 2024', avgPosition: 35, traffic: 180 },
            { month: 'Oct 2024', avgPosition: 28, traffic: 320 },
            { month: 'Nov 2024', avgPosition: 25, traffic: 480 }
          ]
        },
        adPerformance: {
          ctrImprovement: 15, // 15% improvement
          cpcReduction: 8, // 8% cost reduction
          conversionsIncrease: 120, // 120% more conversions
          costSavings: 350 // Monthly savings
        }
      },
      revenueAttribution: {
        leadsGenerated: 7,
        sourceBreakdown: [
          {
            source: 'AI Citations',
            leads: 2,
            conversionRate: 25,
            revenue: 25000
          },
          {
            source: 'SEO Improvement',
            leads: 3,
            conversionRate: 15,
            revenue: 75000
          },
          {
            source: 'Ad Optimization',
            leads: 2,
            conversionRate: 20,
            revenue: 50000
          }
        ],
        totalRevenue: 150000,
        averageDealSize: 21429,
        monthlyTrend: [
          { month: 'Aug 2024', leads: 0, revenue: 0 },
          { month: 'Sep 2024', leads: 1, revenue: 25000 },
          { month: 'Oct 2024', leads: 3, revenue: 75000 },
          { month: 'Nov 2024', leads: 3, revenue: 50000 }
        ]
      },
      roi: {
        currentROI: 63.8, // (150000 - 2347) / 2347 * 100
        projectedROI: 85.2,
        paybackPeriod: 0.16, // months
        netProfit: 147653
      },
      projections: {
        sixMonth: {
          expectedCitations: 40,
          expectedLeads: 25,
          expectedRevenue: 400000,
          projectedROI: 120.5
        },
        twelveMonth: {
          expectedCitations: 85,
          expectedLeads: 60,
          expectedRevenue: 950000,
          projectedROI: 185.3
        }
      },
      benchmarks: {
        industryAverage: {
          roi: 12.5,
          growthRate: 15,
          citationRate: 5
        },
        topPerformers: {
          roi: 35.2,
          growthRate: 45,
          citationRate: 25
        }
      }
    }

    setTimeout(() => {
      setROIMetrics(mockROIData)
      setLoading(false)
    }, 1000)
  }

  const generateROIReport = () => {
    trackFeatureUsage('roi_report_generated', 'roi_tracker', {
      client: selectedClient,
      timeframe
    })
    alert('ROI report generation feature would be implemented here')
  }

  const shareWithClient = () => {
    trackFeatureUsage('roi_shared_with_client', 'roi_tracker', {
      client: selectedClient
    })
    alert('Client sharing feature would be implemented here')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-400" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-400" />
    return <div className="h-4 w-4" />
  }

  const getROIColor = (roi: number) => {
    if (roi >= 50) return 'text-green-400'
    if (roi >= 20) return 'text-emerald-400'
    if (roi >= 10) return 'text-yellow-400'
    return 'text-red-400'
  }

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']

  if (loading || !roiMetrics) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <Calculator className="h-8 w-8 animate-pulse text-gray-400" />
          <span className="ml-2 text-gray-400">Calculating ROI...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-[#0f1419] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">ROI Tracker</h1>
          <p className="text-gray-400">Prove platform value and track returns</p>
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
          <Select value={timeframe} onValueChange={(value: any) => setTimeframe(value)}>
            <SelectTrigger className="w-[150px] bg-[#1f2937] border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ROI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm">Current ROI</p>
                <p className={`text-3xl font-bold ${getROIColor(roiMetrics.roi.currentROI)}`}>
                  {formatPercentage(roiMetrics.roi.currentROI)}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-green-300">
                vs Industry Avg: {formatPercentage(roiMetrics.benchmarks.industryAverage.roi)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(roiMetrics.revenueAttribution.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-400">
                From {roiMetrics.revenueAttribution.leadsGenerated} leads generated
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Platform Investment</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(roiMetrics.platformInvestment.totalInvested + roiMetrics.platformInvestment.additionalCosts)}</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-400">
                Over {roiMetrics.platformInvestment.monthsActive} months
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1f2937] border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Net Profit</p>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(roiMetrics.roi.netProfit)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-400">
                Payback in {roiMetrics.roi.paybackPeriod.toFixed(1)} months
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-[#1f2937] border border-gray-600">
          <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            ROI Overview
          </TabsTrigger>
          <TabsTrigger value="attribution" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Revenue Attribution
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger value="projections" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Future Projections
          </TabsTrigger>
          <TabsTrigger value="benchmarks" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black">
            Industry Benchmarks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* ROI Calculation Breakdown */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">💰 ROI Calculation Breakdown</CardTitle>
              <CardDescription className="text-gray-400">
                How we calculate your return on investment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Investment */}
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="text-red-400 font-medium mb-3">📉 Total Investment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Platform Subscription</p>
                    <p className="text-white font-bold">{formatCurrency(roiMetrics.platformInvestment.totalInvested)}</p>
                    <p className="text-xs text-gray-400">{formatCurrency(roiMetrics.platformInvestment.monthlyFee)}/month × {roiMetrics.platformInvestment.monthsActive} months</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Additional Costs</p>
                    <p className="text-white font-bold">{formatCurrency(roiMetrics.platformInvestment.additionalCosts)}</p>
                    <p className="text-xs text-gray-400">Setup, content creation, optimization</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-red-500/20">
                  <p className="text-red-400 font-bold text-lg">
                    Total Investment: {formatCurrency(roiMetrics.platformInvestment.totalInvested + roiMetrics.platformInvestment.additionalCosts)}
                  </p>
                </div>
              </div>

              {/* Returns */}
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="text-green-400 font-medium mb-3">📈 Total Returns</h4>
                <div className="space-y-3">
                  {roiMetrics.revenueAttribution.sourceBreakdown.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{source.source}</p>
                        <p className="text-sm text-gray-400">{source.leads} leads • {formatPercentage(source.conversionRate)} conversion rate</p>
                      </div>
                      <p className="text-green-400 font-bold">{formatCurrency(source.revenue)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-green-500/20">
                  <p className="text-green-400 font-bold text-lg">
                    Total Revenue: {formatCurrency(roiMetrics.revenueAttribution.totalRevenue)}
                  </p>
                </div>
              </div>

              {/* ROI Calculation */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <h4 className="text-emerald-400 font-medium mb-3">🧮 ROI Formula</h4>
                <div className="space-y-2 font-mono text-sm">
                  <p className="text-gray-300">ROI = (Total Revenue - Total Investment) / Total Investment × 100</p>
                  <p className="text-gray-300">
                    ROI = ({formatCurrency(roiMetrics.revenueAttribution.totalRevenue)} - {formatCurrency(roiMetrics.platformInvestment.totalInvested + roiMetrics.platformInvestment.additionalCosts)}) / {formatCurrency(roiMetrics.platformInvestment.totalInvested + roiMetrics.platformInvestment.additionalCosts)} × 100
                  </p>
                  <p className="text-emerald-400 text-lg font-bold">
                    ROI = {formatPercentage(roiMetrics.roi.currentROI)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ROI Trend Chart */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">📊 ROI Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={roiMetrics.revenueAttribution.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                    formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(value as number) : value,
                      name === 'revenue' ? 'Revenue' : 'Leads'
                    ]}
                  />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="leads" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attribution" className="space-y-6">
          {/* Revenue Sources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Revenue by Source</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roiMetrics.revenueAttribution.sourceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ source, revenue }) => `${source}: ${formatCurrency(revenue)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                    >
                      {roiMetrics.revenueAttribution.sourceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Lead Sources Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roiMetrics.revenueAttribution.sourceBreakdown.map((source, index) => (
                    <div key={index} className="p-4 bg-[#0f1419] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{source.source}</h4>
                        <Badge variant="outline" className="text-gray-300">
                          {source.leads} leads
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Conversion Rate</p>
                          <p className="text-white font-bold">{formatPercentage(source.conversionRate)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Revenue</p>
                          <p className="text-green-400 font-bold">{formatCurrency(source.revenue)}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Progress
                          value={(source.revenue / roiMetrics.revenueAttribution.totalRevenue) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Revenue Trend */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Monthly Revenue & Lead Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roiMetrics.revenueAttribution.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis yAxisId="left" stroke="#9ca3af" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                    formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(value as number) : value,
                      name === 'revenue' ? 'Revenue' : 'Leads'
                    ]}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#10b981" name="Revenue" />
                  <Bar yAxisId="right" dataKey="leads" fill="#3b82f6" name="Leads" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">🤖 AI Citations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{roiMetrics.resultsDelivered.aiCitations.current}</p>
                  <p className="text-sm text-gray-400">current monthly citations</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Baseline</span>
                    <span className="text-white">{roiMetrics.resultsDelivered.aiCitations.baseline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Growth</span>
                    <span className="text-green-400">+∞%</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={roiMetrics.resultsDelivered.aiCitations.monthlyTrend}>
                    <Line type="monotone" dataKey="citations" stroke="#10b981" strokeWidth={2} />
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">🔍 SEO Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">#{roiMetrics.resultsDelivered.seoPerformance.avgPositionAfter}</p>
                  <p className="text-sm text-gray-400">average position</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Before</span>
                    <span className="text-white">#{roiMetrics.resultsDelivered.seoPerformance.avgPositionBefore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Improvement</span>
                    <span className="text-green-400">+{roiMetrics.resultsDelivered.seoPerformance.avgPositionBefore - roiMetrics.resultsDelivered.seoPerformance.avgPositionAfter} positions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Page 1 Keywords</span>
                    <span className="text-green-400">{roiMetrics.resultsDelivered.seoPerformance.page1Keywords.after} (was {roiMetrics.resultsDelivered.seoPerformance.page1Keywords.before})</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1f2937] border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">📈 Ad Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">+{formatPercentage(roiMetrics.resultsDelivered.adPerformance.ctrImprovement)}</p>
                  <p className="text-sm text-gray-400">CTR improvement</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">CPC Reduction</span>
                    <span className="text-green-400">-{formatPercentage(roiMetrics.resultsDelivered.adPerformance.cpcReduction)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Conversions</span>
                    <span className="text-green-400">+{formatPercentage(roiMetrics.resultsDelivered.adPerformance.conversionsIncrease)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Monthly Savings</span>
                    <span className="text-green-400">{formatCurrency(roiMetrics.resultsDelivered.adPerformance.costSavings)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          {/* Future Projections */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">🔮 Future Projections</CardTitle>
              <CardDescription className="text-gray-400">
                Based on current growth trajectory and industry benchmarks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium mb-4">📅 6-Month Projections</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">AI Citations</span>
                      <span className="text-white font-bold">{roiMetrics.projections.sixMonth.expectedCitations}/month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Expected Leads</span>
                      <span className="text-white font-bold">{roiMetrics.projections.sixMonth.expectedLeads}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Projected Revenue</span>
                      <span className="text-green-400 font-bold">{formatCurrency(roiMetrics.projections.sixMonth.expectedRevenue)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">ROI</span>
                      <span className="text-blue-400 font-bold">{formatPercentage(roiMetrics.projections.sixMonth.projectedROI)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="text-purple-400 font-medium mb-4">📅 12-Month Projections</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">AI Citations</span>
                      <span className="text-white font-bold">{roiMetrics.projections.twelveMonth.expectedCitations}/month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Expected Leads</span>
                      <span className="text-white font-bold">{roiMetrics.projections.twelveMonth.expectedLeads}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Projected Revenue</span>
                      <span className="text-green-400 font-bold">{formatCurrency(roiMetrics.projections.twelveMonth.expectedRevenue)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">ROI</span>
                      <span className="text-purple-400 font-bold">{formatPercentage(roiMetrics.projections.twelveMonth.projectedROI)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <h4 className="text-emerald-400 font-medium mb-2">💡 Key Assumptions</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Continued 15-20% monthly growth in AI citations</li>
                  <li>• Average deal size remains consistent at ~{formatCurrency(roiMetrics.revenueAttribution.averageDealSize)}</li>
                  <li>• SEO improvements continue with content strategy implementation</li>
                  <li>• Ad optimization saves an additional 5-8% monthly</li>
                  <li>• Industry growth rate of 12-15% annually</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          {/* Industry Benchmarks */}
          <Card className="bg-[#1f2937] border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">📊 Industry Benchmarks</CardTitle>
              <CardDescription className="text-gray-400">
                How you compare to industry averages and top performers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h4 className="text-white font-medium mb-2">Your Performance</h4>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <p className="text-3xl font-bold text-emerald-400">{formatPercentage(roiMetrics.roi.currentROI)}</p>
                      <p className="text-sm text-gray-400">ROI</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-white font-medium mb-2">Industry Average</h4>
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-3xl font-bold text-yellow-400">{formatPercentage(roiMetrics.benchmarks.industryAverage.roi)}</p>
                      <p className="text-sm text-gray-400">ROI</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-white font-medium mb-2">Top Performers</h4>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-3xl font-bold text-blue-400">{formatPercentage(roiMetrics.benchmarks.topPerformers.roi)}</p>
                      <p className="text-sm text-gray-400">ROI</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-medium mb-3">🏆 Your Competitive Advantage</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">ROI vs Industry Avg</p>
                      <p className="text-green-400 font-bold">
                        +{formatPercentage(roiMetrics.roi.currentROI - roiMetrics.benchmarks.industryAverage.roi)} better
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Citations vs Avg</p>
                      <p className="text-green-400 font-bold">
                        +{roiMetrics.resultsDelivered.aiCitations.current - roiMetrics.benchmarks.industryAverage.citationRate} citations
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Growth vs Industry</p>
                      <p className="text-green-400 font-bold">
                        +{formatPercentage(25 - roiMetrics.benchmarks.industryAverage.growthRate)} faster
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-600">
        <Button onClick={generateROIReport} size="lg">
          <FileText className="h-4 w-4 mr-2" />
          Generate ROI Report
        </Button>
        <Button onClick={shareWithClient} variant="outline" size="lg">
          <Users className="h-4 w-4 mr-2" />
          Share with Client
        </Button>
      </div>
    </div>
  )
}