import { Target, Users, TrendingUp, Activity, AlertCircle, CheckCircle } from "lucide-react";
import MetricCard from "./MetricCard";
import PlatformMetrics from "./PlatformMetrics";
import CitationFeed from "./CitationFeed";
import PerformanceChart from "./PerformanceChart";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useApp } from "../contexts/AppContext";

export default function ProductionOverview() {
  const { clients, queries, citations } = useApp();
  
  // Check if any clients exist and monitoring is configured
  const hasClients = clients.length > 0;
  const hasMonitoring = queries.length > 0;

  if (!hasClients) {
    return (
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">AI Search Optimization Dashboard</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Monitor your clients' presence across ChatGPT, Perplexity, Claude, and Gemini
          </p>
        </div>

        {/* Welcome State */}
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h2 className="text-white mb-3 text-xl md:text-2xl">Welcome to kreativpique</h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              The AI Search Era is here. Track how ChatGPT, Perplexity, Claude, and Gemini mention your clients.
            </p>

            <div className="bg-[#0f1419] border border-[#374151] rounded-lg p-6 mb-6 text-left">
              <h3 className="text-white mb-3">Get Started in 3 Steps:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[#0f1419] text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-white mb-1">Add Your First Client</div>
                    <div className="text-gray-400 text-sm">
                      Set up client profiles with their brand, industry, and target keywords
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[#0f1419] text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-white mb-1">Configure Monitoring Queries</div>
                    <div className="text-gray-400 text-sm">
                      Define the questions and topics you want to track across AI platforms
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[#0f1419] text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-white mb-1">Start Tracking Citations</div>
                    <div className="text-gray-400 text-sm">
                      Monitor mentions, track position, and optimize your AI search presence
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg"
                onClick={() => {
                  // Navigate to clients page
                  window.location.hash = '#clients';
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Add Your First Client
              </Button>
              <Button 
                variant="outline"
                className="bg-[#1f2937] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg"
                onClick={() => {
                  // Navigate to settings
                  window.location.hash = '#settings';
                }}
              >
                Configure Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
            <h3 className="text-white mb-4">AI Platforms We Monitor</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="text-white">ChatGPT</div>
                    <div className="text-gray-400 text-xs">78% market share</div>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 rounded-lg text-xs">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div>
                    <div className="text-white">Perplexity</div>
                    <div className="text-gray-400 text-xs">15% market share</div>
                  </div>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 rounded-lg text-xs">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div>
                    <div className="text-white">Claude</div>
                    <div className="text-gray-400 text-xs">Growing rapidly</div>
                  </div>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 rounded-lg text-xs">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <div>
                    <div className="text-white">Gemini</div>
                    <div className="text-gray-400 text-xs">Google AI</div>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 rounded-lg text-xs">
                  Active
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
            <h3 className="text-white mb-4">Key Features</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">Real-time Citation Tracking</div>
                  <div className="text-gray-400 text-xs">Monitor when AI platforms mention your clients</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">Position & Context Analysis</div>
                  <div className="text-gray-400 text-xs">Track ranking position and sentiment in responses</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">Competitor Intelligence</div>
                  <div className="text-gray-400 text-xs">See who else is being cited in your industry</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">Content Optimization</div>
                  <div className="text-gray-400 text-xs">Identify gaps and opportunities to improve citations</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white">Automated Alerts</div>
                  <div className="text-gray-400 text-xs">Get notified of new citations and changes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If clients exist but no monitoring configured
  if (!hasMonitoring) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Configure monitoring to start tracking AI citations
          </p>
        </div>

        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-white mb-2">Monitoring Not Configured</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
            Set up your monitoring queries and AI platform credentials to start tracking citations
          </p>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg">
            Configure Monitoring
          </Button>
        </div>
      </div>
    );
  }

  // Full dashboard with data (shown when clients and monitoring are configured)
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Dashboard Overview</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Real-time AI search optimization performance across all platforms
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <MetricCard
          title="Total Citations"
          value={citations.length.toString()}
          subtitle="all time"
          icon={Target}
        />
        <MetricCard
          title="Active Clients"
          value={clients.length.toString()}
          subtitle="monitored"
          icon={Users}
        />
        <MetricCard
          title="Avg. Position"
          value={citations.length > 0 ? `#${(citations.reduce((acc, c) => acc + c.position, 0) / citations.length).toFixed(1)}` : "N/A"}
          subtitle="across platforms"
          icon={TrendingUp}
        />
        <MetricCard
          title="Active Queries"
          value={queries.length.toString()}
          subtitle="monitoring"
          icon={Activity}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <PlatformMetrics />
        </div>
      </div>

      {/* Citation Feed */}
      <CitationFeed />
    </div>
  );
}
