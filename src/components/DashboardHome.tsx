import { TrendingUp, Users, Target, Activity } from "lucide-react";
import StatCard from "./StatCard";
import MapVisualization from "./MapVisualization";
import CircularGauge from "./CircularGauge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default function DashboardHome() {
  const recentActivity = [
    {
      id: 1,
      name: "Vernarth Superclass",
      action: "New citation detected",
      time: "Dec 21st at 3:21 PM",
      platform: "ChatGPT, Perplexity",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Jennifer Marie Henry",
      action: "Report generated",
      time: "Dec 20th at 2:45 PM",
      platform: "Perplexity, Claude, LLaMA",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Steven Joannides",
      action: "Content optimized",
      time: "Dec 19th at 11:30 AM",
      platform: "Claude, LLaMA, DeepSeek AI",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "Chad Arietta",
      action: "New client onboarded",
      time: "Dec 18th at 4:15 PM",
      platform: "ChatGPT, Claude",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      name: "Cory Fitzenreuter",
      action: "Citation milestone reached",
      time: "Dec 17th at 1:00 PM",
      platform: "Gemini, DeepSeek AI, Claude AI",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Welcome to kreativpique - Track your AI search optimization performance across all major platforms.
        </p>
      </div>

      {/* Map Section */}
      <MapVisualization />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Clients"
          value="142"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Citations This Month"
          value="10,242"
          change="+23% from last month"
          changeType="positive"
          icon={Target}
        />
        <StatCard
          title="Active Platforms"
          value="2,328"
          change="+8% from last month"
          changeType="positive"
          icon={Activity}
        />
        <StatCard
          title="Avg. Position"
          value="#3.2"
          change="Improved by 1.5"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gauges */}
        <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg p-6">
          <h3 className="text-white mb-6">Compare</h3>
          <div className="space-y-6">
            <div className="flex justify-around">
              <CircularGauge value={178} max={200} label="GPT" color="#10b981" />
              <CircularGauge value={50} max={200} label="Citations" color="#3b82f6" />
            </div>
            <div className="flex justify-around">
              <div className="text-center">
                <div className="text-white mb-1">20</div>
                <div className="text-gray-400 text-xs">MIN</div>
              </div>
              <div className="text-center">
                <div className="text-white mb-1">83</div>
                <div className="text-gray-400 text-xs">MAX</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg p-6">
          <h3 className="text-white mb-6">Compromises</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-gray-400 mb-2">
                <span>Dog Parks</span>
                <span>42</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '70%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-gray-400 mb-2">
                <span>Open Crimes</span>
                <span>12</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '20%' }} />
              </div>
            </div>
            <div className="mt-6">
              <div className="text-gray-400 mb-2">Higher Worked</div>
              <div className="text-white">142 <span className="text-gray-400">KW</span></div>
              <div className="text-green-400">28,271 <span className="text-gray-400">KW</span></div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg p-6">
          <h3 className="text-white mb-6">Users</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-white truncate">{activity.name}</div>
                  <div className="text-gray-400 truncate">{activity.time}</div>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="4" r="1.5" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="8" cy="12" r="1.5" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
