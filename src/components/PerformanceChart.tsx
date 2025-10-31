import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PerformanceChart() {
  const data = [
    { date: "Jan 1", chatgpt: 2800, perplexity: 1800, claude: 1200, gemini: 800 },
    { date: "Jan 8", chatgpt: 3100, perplexity: 2100, claude: 1400, gemini: 950 },
    { date: "Jan 15", chatgpt: 3400, perplexity: 2300, claude: 1650, gemini: 1100 },
    { date: "Jan 22", chatgpt: 3200, perplexity: 2500, claude: 1800, gemini: 1200 },
    { date: "Jan 29", chatgpt: 3800, perplexity: 2800, claude: 2100, gemini: 1300 },
    { date: "Feb 5", chatgpt: 4000, perplexity: 2900, claude: 2200, gemini: 1280 },
    { date: "Feb 12", chatgpt: 4234, perplexity: 3187, claude: 2456, gemini: 1365 },
  ];

  return (
    <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-white mb-1">Citation Trends</h3>
        <p className="text-gray-400 text-xs">Last 7 weeks performance</p>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500" />
          <span className="text-gray-400 text-xs">ChatGPT</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-500" />
          <span className="text-gray-400 text-xs">Perplexity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-500" />
          <span className="text-gray-400 text-xs">Claude</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-lime-500" />
          <span className="text-gray-400 text-xs">Gemini</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chatgpt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="perplexity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="claude" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gemini" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: "12px" }} />
          <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "0",
              color: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey="chatgpt"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#chatgpt)"
          />
          <Area
            type="monotone"
            dataKey="perplexity"
            stroke="#14b8a6"
            strokeWidth={2}
            fill="url(#perplexity)"
          />
          <Area
            type="monotone"
            dataKey="claude"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="url(#claude)"
          />
          <Area
            type="monotone"
            dataKey="gemini"
            stroke="#84cc16"
            strokeWidth={2}
            fill="url(#gemini)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
