import { Target, Users, TrendingUp, Activity, MessageSquare, Search, Sparkles, Cpu } from "lucide-react";
import VintageMetricCard from "./VintageMetricCard";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function VintageOverview() {
  const chartData = [
    { month: "Jan", chatgpt: 2800, perplexity: 1800, claude: 1200, gemini: 800 },
    { month: "Feb", chatgpt: 3100, perplexity: 2100, claude: 1400, gemini: 950 },
    { month: "Mar", chatgpt: 3400, perplexity: 2300, claude: 1650, gemini: 1100 },
    { month: "Apr", chatgpt: 3200, perplexity: 2500, claude: 1800, gemini: 1200 },
    { month: "May", chatgpt: 3800, perplexity: 2800, claude: 2100, gemini: 1300 },
    { month: "Jun", chatgpt: 4234, perplexity: 3187, claude: 2456, gemini: 1365 },
  ];

  const pieData = [
    { name: "ChatGPT", value: 38, color: "#52796f" },
    { name: "Perplexity", value: 29, color: "#84a98c" },
    { name: "Claude", value: 22, color: "#e76f51" },
    { name: "Gemini", value: 11, color: "#f4a261" },
  ];

  const barData = [
    { client: "Haus & Estates", citations: 4872 },
    { client: "Midas Aviation", citations: 3156 },
    { client: "Luxury Living", citations: 2842 },
    { client: "Tech Innovators", citations: 2289 },
    { client: "Global Finance", citations: 1956 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#d4c5b9] rounded-md p-6">
        <h1 className="text-[#3d3d3d] mb-2">MOTORPH ANALYTICS DASHBOARD - Q3 2025</h1>
        <p className="text-[#6d6d6d]">
          Kreativpique achieved a strong Q3 2025 performance with ₱9.8M total revenue and 15,000 units sold across 651 conversions. 
          The average transaction value of ₱6.2M reflects consistent growth and solid market demand for AI search optimization.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <VintageMetricCard
          title="Total Citations Q3 2025"
          value="11,242"
          change={23}
          subtitle="vs Q2 2025"
          icon={Target}
          trend="up"
          color="teal"
        />
        <VintageMetricCard
          title="Active Clients"
          value="142"
          change={12}
          subtitle="vs last quarter"
          icon={Users}
          trend="up"
          color="coral"
        />
        <VintageMetricCard
          title="Average Position Q3"
          value="#2.8"
          change={-15}
          subtitle="improved"
          icon={TrendingUp}
          trend="up"
          color="sage"
        />
        <VintageMetricCard
          title="Total Units Sold Q3 2025"
          value="15,000"
          change={8}
          subtitle="vs Q2"
          icon={Activity}
          trend="up"
          color="ochre"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Sales Over Time */}
        <div className="bg-white border border-[#d4c5b9] rounded-md p-6">
          <h3 className="text-[#3d3d3d] mb-6">Total Sales Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="vintageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#52796f" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#52796f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4c5b9" />
              <XAxis dataKey="month" stroke="#6d6d6d" style={{ fontSize: "12px" }} />
              <YAxis stroke="#6d6d6d" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#faf8f3",
                  border: "1px solid #d4c5b9",
                  borderRadius: "6px",
                  color: "#3d3d3d",
                }}
              />
              <Area
                type="monotone"
                dataKey="chatgpt"
                stroke="#52796f"
                strokeWidth={2}
                fill="url(#vintageGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Total Sales by Client Type */}
        <div className="bg-white border border-[#d4c5b9] rounded-md p-6">
          <h3 className="text-[#3d3d3d] mb-6">Total Sales by Client Type</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#faf8f3",
                  border: "1px solid #d4c5b9",
                  borderRadius: "6px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#52796f] rounded-sm" />
              <span className="text-[#6d6d6d] text-xs">Retail</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#e76f51] rounded-sm" />
              <span className="text-[#6d6d6d] text-xs">Wholesale</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients */}
        <div className="bg-white border border-[#d4c5b9] rounded-md p-6">
          <h3 className="text-[#3d3d3d] mb-6">Total Product Sold</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4c5b9" />
              <XAxis dataKey="client" stroke="#6d6d6d" style={{ fontSize: "10px" }} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#6d6d6d" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#faf8f3",
                  border: "1px solid #d4c5b9",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="citations" fill="#52796f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Performance */}
        <div className="bg-white border border-[#d4c5b9] rounded-md p-6">
          <h3 className="text-[#3d3d3d] mb-6">Transaction Value vs Qty. Sold</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4c5b9" />
              <XAxis dataKey="month" stroke="#6d6d6d" style={{ fontSize: "12px" }} />
              <YAxis stroke="#6d6d6d" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#faf8f3",
                  border: "1px solid #d4c5b9",
                  borderRadius: "6px",
                }}
              />
              <Bar dataKey="perplexity" fill="#e76f51" radius={[4, 4, 0, 0]} />
              <Bar dataKey="claude" fill="#84a98c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
