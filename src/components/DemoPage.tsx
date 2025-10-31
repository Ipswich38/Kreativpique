import { useState } from "react";
import { Sparkles, TrendingUp, TrendingDown, Users, Target, Mail, Send, Eye, Globe, Play, Download, Activity, Plus, Building2, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import MetricCard from "./MetricCard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Demo data for overview
  const demoClients = [
    {
      id: "1",
      name: "Skyline Aviation Dubai",
      industry: "Aviation",
      website: "skylineaviation.ae",
      targetKeywords: ["private jet Dubai", "luxury aviation UAE"],
      citationsThisMonth: 47,
      avgPosition: 2.3,
      monitoringSince: "Jan 15, 2025",
    },
    {
      id: "2",
      name: "Dubai Marina Properties",
      industry: "Real Estate",
      website: "dubaimarinaprop.com",
      targetKeywords: ["Dubai Marina apartments", "luxury real estate"],
      citationsThisMonth: 89,
      avgPosition: 1.8,
      monitoringSince: "Feb 1, 2025",
    },
    {
      id: "3",
      name: "Palm Jumeirah Villas",
      industry: "Real Estate",
      website: "palmvillas.ae",
      targetKeywords: ["Palm Jumeirah villa", "waterfront properties"],
      citationsThisMonth: 62,
      avgPosition: 2.1,
      monitoringSince: "Jan 28, 2025",
    },
  ];

  const demoCitations = [
    {
      id: "1",
      clientId: "1",
      clientName: "Skyline Aviation Dubai",
      query: "Best private jet charter services in Dubai",
      platform: "chatgpt",
      position: 2,
      context: "Skyline Aviation Dubai offers premium private jet charter services...",
      sentiment: "positive" as const,
      detectedAt: "2025-10-28T10:30:00Z",
    },
    {
      id: "2",
      clientId: "2",
      clientName: "Dubai Marina Properties",
      query: "Luxury apartments in Dubai Marina",
      platform: "perplexity",
      position: 1,
      context: "Dubai Marina Properties is a leading real estate company specializing in luxury apartments...",
      sentiment: "positive" as const,
      detectedAt: "2025-10-28T09:15:00Z",
    },
    {
      id: "3",
      clientId: "1",
      clientName: "Skyline Aviation Dubai",
      query: "VIP aviation services UAE",
      platform: "claude",
      position: 3,
      context: "For VIP aviation services in the UAE, Skyline Aviation Dubai provides...",
      sentiment: "neutral" as const,
      detectedAt: "2025-10-27T14:20:00Z",
    },
    {
      id: "4",
      clientId: "3",
      clientName: "Palm Jumeirah Villas",
      query: "Waterfront villas Dubai",
      platform: "gemini",
      position: 2,
      context: "Palm Jumeirah Villas offers exclusive waterfront properties...",
      sentiment: "positive" as const,
      detectedAt: "2025-10-27T11:45:00Z",
    },
  ];

  // Analytics demo data
  const citationTrendData = [
    { month: "Jan", chatgpt: 2400, perplexity: 1398, claude: 980, gemini: 690 },
    { month: "Feb", chatgpt: 2210, perplexity: 1480, claude: 1120, gemini: 720 },
    { month: "Mar", chatgpt: 2890, perplexity: 1520, claude: 1260, gemini: 890 },
    { month: "Apr", chatgpt: 3200, perplexity: 1680, claude: 1390, gemini: 980 },
    { month: "May", chatgpt: 3490, perplexity: 1890, claude: 1520, gemini: 1120 },
    { month: "Jun", chatgpt: 3890, perplexity: 2100, claude: 1680, gemini: 1280 },
  ];

  const platformDistribution = [
    { name: "ChatGPT", value: 4234, color: "#10b981" },
    { name: "Perplexity", value: 3187, color: "#3b82f6" },
    { name: "Claude", value: 2456, color: "#8b5cf6" },
    { name: "Gemini", value: 1365, color: "#f59e0b" },
  ];

  const topContentData = [
    { content: "Dubai Marina Guide", citations: 892, growth: 23 },
    { content: "Investment Calculator", citations: 745, growth: 18 },
    { content: "Off-Plan Properties FAQ", citations: 678, growth: 31 },
    { content: "Luxury Listings", citations: 543, growth: 12 },
    { content: "Market Reports", citations: 487, growth: 27 },
  ];

  // Scrape demo data
  const scrapeJobs = [
    {
      id: 1,
      url: "https://www.luxury-dubai-properties.com",
      status: "completed",
      pages: 342,
      updated: "2 hours ago",
      duration: "45 min",
    },
    {
      id: 2,
      url: "https://www.aviation-news-today.com",
      status: "running",
      pages: 156,
      updated: "Running now",
      duration: "12 min",
    },
    {
      id: 3,
      url: "https://www.tech-innovations-blog.com",
      status: "completed",
      pages: 289,
      updated: "5 hours ago",
      duration: "38 min",
    },
  ];

  // Email campaigns demo data
  const emailCampaigns = [
    {
      id: 1,
      name: "Q3 Citation Report",
      subject: "Your AI Search Performance Summary",
      recipients: 142,
      sent: 142,
      opened: 98,
      clicked: 45,
      status: "sent",
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "Monthly Newsletter",
      subject: "AI Search Trends - October 2025",
      recipients: 156,
      sent: 156,
      opened: 134,
      clicked: 67,
      status: "sent",
      date: "3 days ago",
    },
    {
      id: 3,
      name: "Onboarding Series - Day 1",
      subject: "Welcome to kreativpique!",
      recipients: 23,
      sent: 0,
      opened: 0,
      clicked: 0,
      status: "draft",
      date: "Last edited 1 hour ago",
    },
  ];

  // Ads campaigns demo data
  const adsCampaigns = [
    {
      id: "1",
      name: "Dubai Luxury Real Estate - Search",
      clientName: "Dubai Marina Properties",
      platform: "google" as const,
      type: "search" as const,
      budget: 5000,
      spent: 3240,
      impressions: 45600,
      clicks: 892,
      conversions: 34,
      status: "active" as const,
    },
    {
      id: "2",
      name: "Private Aviation - Social",
      clientName: "Skyline Aviation Dubai",
      platform: "meta" as const,
      type: "social" as const,
      budget: 3500,
      spent: 2100,
      impressions: 78900,
      clicks: 1245,
      conversions: 28,
      status: "active" as const,
    },
    {
      id: "3",
      name: "Luxury Villas - Display",
      clientName: "Palm Jumeirah Villas",
      platform: "google" as const,
      type: "display" as const,
      budget: 4200,
      spent: 1890,
      impressions: 125000,
      clicks: 678,
      conversions: 19,
      status: "active" as const,
    },
  ];

  const platformColors: Record<string, string> = {
    chatgpt: "bg-green-500/20 text-green-400 border-green-500/30",
    perplexity: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    claude: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    gemini: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
      running: "bg-orange-500/20 text-orange-400 border-orange-500/50",
      scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      sent: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
      sending: "bg-orange-500/20 text-orange-400 border-orange-500/50",
      draft: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
      failed: "bg-red-500/20 text-red-400 border-red-500/50",
    };
    return colors[status] || colors.completed;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Demo Mode</h1>
            <p className="text-gray-300 text-sm md:text-base">
              Explore kreativpique with sample data showing all features in action. This demonstrates how the platform tracks AI citations, manages clients, and optimizes campaigns.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-[#1f2937] border border-[#374151] p-1 rounded-lg inline-flex flex-wrap gap-1">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-lg text-sm px-3 py-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="clients" className="text-white data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-lg text-sm px-3 py-2">
            Clients
          </TabsTrigger>
          <TabsTrigger value="citations" className="text-white data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-lg text-sm px-3 py-2">
            Citations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-lg text-sm px-3 py-2">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="ads" className="text-white data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-lg text-sm px-3 py-2">
            Ads & SEO
          </TabsTrigger>
          <TabsTrigger value="scrape" className="text-white data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-lg text-sm px-3 py-2">
            Scraping
          </TabsTrigger>
          <TabsTrigger value="email" className="text-white data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-lg text-sm px-3 py-2">
            Email
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MetricCard title="Total Citations" value="198" subtitle="this month" icon={Target} />
            <MetricCard title="Active Clients" value="3" subtitle="monitored" icon={Users} />
            <MetricCard title="Avg. Position" value="#2.1" subtitle="across platforms" icon={TrendingUp} />
            <MetricCard title="Active Queries" value="12" subtitle="monitoring" icon={Activity} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
              <h3 className="text-white mb-4">Recent Citations</h3>
              <div className="space-y-3">
                {demoCitations.slice(0, 3).map((citation) => (
                  <div key={citation.id} className="p-3 bg-[#0f1419] rounded-lg">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="text-white text-sm flex-1">{citation.query}</div>
                      <Badge className={`${platformColors[citation.platform]} text-xs rounded-lg shrink-0`}>
                        #{citation.position}
                      </Badge>
                    </div>
                    <div className="text-gray-400 text-xs mb-2">{citation.context}</div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge className={platformColors[citation.platform]}>
                        {citation.platform}
                      </Badge>
                      <span className="text-gray-500">{citation.clientName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
              <h3 className="text-white mb-4">Client Performance</h3>
              <div className="space-y-3">
                {demoClients.map((client) => (
                  <div key={client.id} className="p-3 bg-[#0f1419] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white text-sm">{client.name}</div>
                      <div className="text-emerald-400 text-sm">{client.citationsThisMonth} citations</div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{client.industry}</span>
                      <span className="text-gray-500">Avg. #{client.avgPosition}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-4">
          <div className="bg-[#1f2937] border border-[#374151] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[768px]">
                <thead>
                  <tr className="border-b border-[#374151] bg-[#0f1419]/50">
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Client</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Industry</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Citations</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Avg Position</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Since</th>
                  </tr>
                </thead>
                <tbody>
                  {demoClients.map((client) => (
                    <tr key={client.id} className="border-b border-[#374151] hover:bg-[#374151]/30">
                      <td className="p-3 md:p-4">
                        <div className="text-white mb-1">{client.name}</div>
                        <div className="text-gray-400 text-xs">{client.website}</div>
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">{client.industry}</td>
                      <td className="p-3 md:p-4 text-emerald-400">{client.citationsThisMonth}</td>
                      <td className="p-3 md:p-4 text-white">#{client.avgPosition}</td>
                      <td className="p-3 md:p-4 text-gray-400 text-sm">{client.monitoringSince}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Citations Tab */}
        <TabsContent value="citations" className="space-y-4">
          <div className="bg-[#1f2937] border border-[#374151] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#374151] bg-[#0f1419]/50">
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Query</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Client</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Platform</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {demoCitations.map((citation) => (
                    <tr key={citation.id} className="border-b border-[#374151] hover:bg-[#374151]/30">
                      <td className="p-3 md:p-4">
                        <div className="text-white mb-1 text-sm">{citation.query}</div>
                        <div className="text-gray-400 text-xs">{citation.context}</div>
                      </td>
                      <td className="p-3 md:p-4 text-gray-400 text-sm">{citation.clientName}</td>
                      <td className="p-3 md:p-4">
                        <Badge className={`${platformColors[citation.platform]} text-xs rounded-lg`}>
                          {citation.platform}
                        </Badge>
                      </td>
                      <td className="p-3 md:p-4">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs md:text-sm">
                          #{citation.position}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
              <div className="text-gray-400 mb-2 text-xs md:text-sm">Total Citations</div>
              <div className="flex items-end justify-between">
                <div className="text-white text-lg md:text-2xl">11,242</div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs md:text-sm">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                  <span>23%</span>
                </div>
              </div>
            </div>
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
              <div className="text-gray-400 mb-2 text-xs md:text-sm">Avg. Position</div>
              <div className="flex items-end justify-between">
                <div className="text-white text-lg md:text-2xl">#2.8</div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs md:text-sm">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                  <span>1.2</span>
                </div>
              </div>
            </div>
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
              <div className="text-gray-400 mb-2 text-xs md:text-sm">Click Rate</div>
              <div className="flex items-end justify-between">
                <div className="text-white text-lg md:text-2xl">34.5%</div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs md:text-sm">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                  <span>8%</span>
                </div>
              </div>
            </div>
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
              <div className="text-gray-400 mb-2 text-xs md:text-sm">Conversion Rate</div>
              <div className="flex items-end justify-between">
                <div className="text-white text-lg md:text-2xl">12.3%</div>
                <div className="flex items-center gap-1 text-red-400 text-xs md:text-sm">
                  <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
                  <span>3%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
              <h3 className="text-white mb-4 md:mb-6">Citation Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={citationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="chatgpt" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="perplexity" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="claude" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="gemini" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
              <h3 className="text-white mb-4 md:mb-6">Platform Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={platformDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {platformDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-400 text-sm">{item.name}</span>
                    </div>
                    <span className="text-white text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Ads & SEO Tab */}
        <TabsContent value="ads" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
              <div className="text-gray-400 mb-2 text-xs">Total Budget</div>
              <div className="text-white text-lg md:text-xl">$12,700</div>
            </div>
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
              <div className="text-gray-400 mb-2 text-xs">Spent</div>
              <div className="text-white text-lg md:text-xl">$7,230</div>
            </div>
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
              <div className="text-gray-400 mb-2 text-xs">Clicks</div>
              <div className="text-white text-lg md:text-xl">2,815</div>
            </div>
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
              <div className="text-gray-400 mb-2 text-xs">Conversions</div>
              <div className="text-white text-lg md:text-xl">81</div>
            </div>
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
              <div className="text-gray-400 mb-2 text-xs">Avg CPC</div>
              <div className="text-white text-lg md:text-xl">$2.57</div>
            </div>
          </div>

          <div className="bg-[#1f2937] border border-[#374151] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[768px]">
                <thead>
                  <tr className="border-b border-[#374151] bg-[#0f1419]/50">
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Campaign</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Client</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Platform</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Budget</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Conversions</th>
                  </tr>
                </thead>
                <tbody>
                  {adsCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-[#374151] hover:bg-[#374151]/30">
                      <td className="p-3 md:p-4">
                        <div className="text-white mb-1 text-sm">{campaign.name}</div>
                        <div className="text-gray-400 text-xs capitalize">{campaign.type}</div>
                      </td>
                      <td className="p-3 md:p-4 text-gray-300 text-sm">{campaign.clientName}</td>
                      <td className="p-3 md:p-4 text-gray-300 text-sm capitalize">{campaign.platform}</td>
                      <td className="p-3 md:p-4">
                        <div className="text-white text-sm">${campaign.spent.toLocaleString()}</div>
                        <div className="text-gray-400 text-xs">of ${campaign.budget.toLocaleString()}</div>
                      </td>
                      <td className="p-3 md:p-4 text-emerald-400 text-sm">{campaign.conversions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Scraping Tab */}
        <TabsContent value="scrape" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MetricCard title="Pages Scraped" value="24,567" change={18} subtitle="this month" icon={Globe} trend="up" />
            <MetricCard title="Active Jobs" value="12" subtitle="running now" icon={Play} />
            <MetricCard title="Completed Jobs" value="342" change={25} subtitle="this month" icon={Download} trend="up" />
            <MetricCard title="Success Rate" value="98.5%" change={2} subtitle="vs last month" icon={Activity} trend="up" />
          </div>

          <div className="bg-[#1f2937] border border-[#374151] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#374151] bg-[#0f1419]/50">
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">URL</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Pages</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Duration</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scrapeJobs.map((job) => (
                    <tr key={job.id} className="border-b border-[#374151] hover:bg-[#374151]/30">
                      <td className="p-3 md:p-4">
                        <div className="text-white text-sm mb-1">{job.url}</div>
                        <div className="text-gray-400 text-xs">{job.updated}</div>
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">{job.pages}</td>
                      <td className="p-3 md:p-4 text-gray-400">{job.duration}</td>
                      <td className="p-3 md:p-4">
                        <Badge className={`${getStatusColor(job.status)} rounded-lg text-xs`}>
                          {job.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <MetricCard title="Emails Sent" value="4,567" change={32} subtitle="this month" icon={Send} trend="up" />
            <MetricCard title="Open Rate" value="68.5%" change={5} subtitle="vs last month" icon={Eye} trend="up" />
            <MetricCard title="Total Recipients" value="142" subtitle="active clients" icon={Users} />
            <MetricCard title="Click Rate" value="24.3%" change={3} subtitle="vs last month" icon={Target} trend="up" />
          </div>

          <div className="bg-[#1f2937] border border-[#374151] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#374151] bg-[#0f1419]/50">
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Campaign</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Recipients</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Opened</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {emailCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-[#374151] hover:bg-[#374151]/30">
                      <td className="p-3 md:p-4">
                        <div className="text-white text-sm mb-1">{campaign.name}</div>
                        <div className="text-gray-400 text-xs">{campaign.subject}</div>
                      </td>
                      <td className="p-3 md:p-4 text-gray-300">{campaign.recipients}</td>
                      <td className="p-3 md:p-4">
                        <div className="text-white text-sm">{campaign.opened}</div>
                        <div className="text-gray-400 text-xs">
                          {campaign.recipients > 0 ? Math.round((campaign.opened / campaign.recipients) * 100) : 0}%
                        </div>
                      </td>
                      <td className="p-3 md:p-4">
                        <Badge className={`${getStatusColor(campaign.status)} rounded-lg text-xs`}>
                          {campaign.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
