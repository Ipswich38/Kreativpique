import { BarChart3, TrendingUp } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export default function AnalyticsPage() {
  const { citations, clients } = useApp();

  if (citations.length === 0) {
    return (
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Analytics</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Comprehensive performance metrics and insights across all AI search platforms
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
            
            <h2 className="text-white mb-3 text-xl">No Analytics Data Yet</h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Analytics will appear here once you have citation data from your monitored queries.
            </p>

            <div className="bg-[#0f1419] border border-[#374151] rounded-lg p-6 text-left">
              <h3 className="text-white mb-4">To get started:</h3>
              <ol className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                  <span>Add clients in the <span className="text-emerald-400">Clients</span> page</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                  <span>Create monitoring queries in the <span className="text-emerald-400">AI Citations</span> page</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                  <span>Wait for citations to be detected across AI platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                  <span>Analytics and insights will populate automatically</span>
                </li>
              </ol>
            </div>

            {clients.length === 0 && (
              <p className="text-orange-400 text-sm mt-6">
                💡 Tip: Check out the <span className="font-semibold">Demo</span> tab to see what analytics look like with data
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // When there is data, show basic analytics
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Analytics</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Performance metrics across all AI search platforms
        </p>
      </div>

      {/* Basic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
          <div className="text-gray-400 mb-2">Total Citations</div>
          <div className="text-white text-2xl">{citations.length}</div>
        </div>
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
          <div className="text-gray-400 mb-2">Avg. Position</div>
          <div className="text-white text-2xl">
            #{citations.length > 0 ? (citations.reduce((acc, c) => acc + c.position, 0) / citations.length).toFixed(1) : "N/A"}
          </div>
        </div>
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
          <div className="text-gray-400 mb-2">Active Clients</div>
          <div className="text-white text-2xl">{clients.length}</div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
        <h3 className="text-white mb-4">Platform Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["chatgpt", "perplexity", "claude", "gemini"].map((platform) => {
            const count = citations.filter((c) => c.platform === platform).length;
            return (
              <div key={platform} className="bg-[#0f1419] rounded-lg p-4">
                <div className="text-gray-400 text-sm capitalize mb-1">{platform}</div>
                <div className="text-white text-xl">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
