import { Target, Users, TrendingUp, Activity } from "lucide-react";
import MetricCard from "./MetricCard";
import PlatformMetrics from "./PlatformMetrics";
import CitationFeed from "./CitationFeed";
import PerformanceChart from "./PerformanceChart";

export default function OverviewDashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Overview</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Real-time AI search optimization performance across all platforms
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <MetricCard
          title="Total Citations"
          value="11,242"
          change={23}
          subtitle="vs last month"
          icon={Target}
          trend="up"
        />
        <MetricCard
          title="Active Clients"
          value="142"
          change={12}
          subtitle="vs last month"
          icon={Users}
          trend="up"
        />
        <MetricCard
          title="Avg. Position"
          value="#2.8"
          change={-15}
          subtitle="improved"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="Platforms"
          value="4"
          change={0}
          subtitle="monitored"
          icon={Activity}
          trend="neutral"
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
