import { Plus, Search, Filter, MoreVertical, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export default function ModernClientsPage() {
  const clients = [
    {
      id: 1,
      name: "Haus and Estates",
      industry: "Real Estate",
      citations: 4872,
      trend: 23,
      platforms: ["ChatGPT", "Perplexity", "Claude"],
      status: "active",
      avgPosition: 1.8,
    },
    {
      id: 2,
      name: "Midas Aviation",
      industry: "Aviation",
      citations: 3156,
      trend: 18,
      platforms: ["ChatGPT", "Perplexity", "Gemini"],
      status: "active",
      avgPosition: 2.1,
    },
    {
      id: 3,
      name: "Luxury Living",
      industry: "Real Estate",
      citations: 2842,
      trend: 31,
      platforms: ["ChatGPT", "Claude", "Gemini"],
      status: "active",
      avgPosition: 2.5,
    },
    {
      id: 4,
      name: "Tech Innovators",
      industry: "Technology",
      citations: 2289,
      trend: 12,
      platforms: ["Perplexity", "Claude"],
      status: "active",
      avgPosition: 3.2,
    },
    {
      id: 5,
      name: "Global Finance Co",
      industry: "Finance",
      citations: 1956,
      trend: -5,
      platforms: ["ChatGPT", "Gemini"],
      status: "warning",
      avgPosition: 4.1,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Clients</h1>
          <p className="text-gray-400">Manage client portfolios and performance</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419]">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search clients..."
            className="pl-10 bg-[#1f2937] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
          />
        </div>
        <Button variant="outline" className="bg-[#1f2937] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-[#1f2937] border border-[#374151] rounded-lg p-6 hover:border-emerald-500/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-emerald-500 flex items-center justify-center text-[#0f1419]">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white">{client.name}</h3>
                    <p className="text-gray-400 text-xs">{client.industry}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mt-4">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Citations</div>
                    <div className="text-white">{client.citations.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Trend</div>
                    <div className={`flex items-center gap-1 ${client.trend >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      <TrendingUp className="w-4 h-4" />
                      <span>{client.trend > 0 ? "+" : ""}{client.trend}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Avg. Position</div>
                    <div className="text-white">#{client.avgPosition}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Platforms</div>
                    <div className="flex gap-1">
                      {client.platforms.map((platform) => (
                        <div
                          key={platform}
                          className="w-6 h-6 bg-emerald-500/10 flex items-center justify-center"
                          title={platform}
                        >
                          <span className="text-emerald-400 text-xs">
                            {platform.charAt(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  className={
                    client.status === "active"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                  }
                >
                  {client.status}
                </Badge>
                <button className="w-8 h-8 bg-[#0f1419] text-gray-400 hover:text-white flex items-center justify-center">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-gray-400">No client data available</div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-[#1f2937] border-[#374151] text-gray-400 rounded-lg">
            Previous
          </Button>
          <Button className="bg-emerald-500 text-[#0f1419] hover:bg-emerald-600 rounded-lg">1</Button>
          <Button variant="outline" className="bg-[#1f2937] border-[#374151] text-gray-400 rounded-lg">
            2
          </Button>
          <Button variant="outline" className="bg-[#1f2937] border-[#374151] text-gray-400 rounded-lg">
            3
          </Button>
          <Button variant="outline" className="bg-[#1f2937] border-[#374151] text-gray-400 rounded-lg">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
