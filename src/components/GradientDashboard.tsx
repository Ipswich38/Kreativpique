import { TrendingUp, TrendingDown, MoreVertical, Plus, Search } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function GradientDashboard() {
  const circularStats = [
    { label: "Total balance", value: "16k", total: "248k", percentage: 65, color: "#3b82f6" },
    { label: "New members", value: "19k", change: "+43%", percentage: 76, color: "#8b5cf6" },
    { label: "New Orders", value: "76", change: "+28%", percentage: 38, color: "#ec4899" },
  ];

  const chartData = [
    { x: 1, blue: 20, orange: 35, green: 25 },
    { x: 2, blue: 45, orange: 28, green: 35 },
    { x: 3, blue: 35, orange: 45, green: 28 },
    { x: 4, blue: 55, orange: 32, green: 42 },
    { x: 5, blue: 42, orange: 55, green: 35 },
    { x: 6, blue: 75, orange: 38, green: 55 },
    { x: 7, blue: 65, orange: 52, green: 48 },
    { x: 8, blue: 85, orange: 45, green: 65 },
    { x: 9, blue: 70, orange: 60, green: 55 },
  ];

  const pieData = [
    { name: "ChatGPT", value: 40, color: "#3b82f6" },
    { name: "Perplexity", value: 25, color: "#10b981" },
    { name: "Claude", value: 20, color: "#f59e0b" },
    { name: "Gemini", value: 15, color: "#ec4899" },
  ];

  const messages = [
    {
      id: 1,
      sender: "Victoria Cantrell",
      role: "Researcher",
      time: "4 hours ago",
      message: "I'd also be interested, but I'm afraid, that I don't understand the current structure that well.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      tags: ["Relay", "System", "Folder"],
    },
    {
      id: 2,
      sender: "Joseph Lewis",
      role: "Web Developer",
      time: "5 days ago",
      message: "Probably somewhere in middle layer, where we need some unified management...",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      sender: "Robert Smith",
      role: "Lead Developer",
      time: "8 days ago",
      message: "Good, I hope we can get a second developer assigned to this project. I see we're really...",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  ];

  const members = [
    {
      id: 1,
      name: "Paul Robert Smith",
      email: "Resquedys.United States",
      status: "online",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Victoria Cantrell",
      email: "Resquedys.United States",
      status: "online",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Joseph Lewis",
      email: "Resquedys.United States",
      status: "offline",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  ];

  const mediaItems = [
    {
      id: 1,
      title: "Granny-Put-R-Cards",
      author: "Jeremy Becker",
      date: "26 Feb, 2014",
      views: "12.5k",
      image: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=200&h=150&fit=crop",
    },
    {
      id: 2,
      title: "Red Hot Sticker",
      author: "Timothy Robinson",
      date: "26 Feb, 2014",
      views: "12.5k",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=150&fit=crop",
    },
    {
      id: 3,
      title: "Wood Burning-Logo",
      author: "Timothy Robinson",
      date: "22 Jan, 2014",
      views: "9.0k",
      image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=200&h=150&fit=crop",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-purple-900/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-gray-400 mb-1">Resume of the day</div>
            <div className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {circularStats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Circular progress */}
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#374151"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke={stat.color}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(stat.percentage / 100) * 251.2} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white">{stat.value}</span>
                </div>
              </div>

              <div>
                <div className="text-gray-400 mb-1">{stat.label}</div>
                {stat.total && <div className="text-white">{stat.total}</div>}
                {stat.change && (
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Statistics Chart */}
        <div className="col-span-2 bg-[#2c3e50]/80 backdrop-blur rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white">Statistics</h3>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-[#34495e] text-gray-400 hover:text-white flex items-center justify-center">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div>
              <div className="text-blue-400">5.1M</div>
              <div className="text-gray-400">Visits</div>
            </div>
            <div>
              <div className="text-orange-400">6.1M</div>
              <div className="text-gray-400">Total Balance</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="x" stroke="#9ca3af" hide />
              <YAxis stroke="#9ca3af" hide />
              <Line
                type="monotone"
                dataKey="blue"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="orange"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="green"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gradient-to-br from-pink-900/50 via-purple-900/50 to-blue-900/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white">Pie Chart</h3>
            <button className="w-8 h-8 rounded-lg bg-[#34495e] text-gray-400 hover:text-white flex items-center justify-center">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-green-400">+42</div>
                <div className="text-gray-400 text-xs">New Citations</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center">
              <div className="text-white">89%</div>
              <div className="text-gray-400 text-xs">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-white">56%</div>
              <div className="text-gray-400 text-xs">Growth</div>
            </div>
            <div className="text-center">
              <div className="text-white">13%</div>
              <div className="text-gray-400 text-xs">Decline</div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages and Members Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Messages */}
        <div className="bg-[#2c3e50]/80 backdrop-blur rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white">Messages</h3>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-[#34495e] text-gray-400 hover:text-white flex items-center justify-center">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex gap-3 p-4 rounded-xl bg-[#34495e]/50 hover:bg-[#34495e] transition-colors cursor-pointer"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white">{msg.sender}</span>
                    <span className="text-gray-400 text-xs">{msg.time}</span>
                  </div>
                  <div className="text-gray-400 text-xs mb-2">{msg.role}</div>
                  <div className="text-gray-300 text-xs line-clamp-2">{msg.message}</div>
                  {msg.tags && (
                    <div className="flex gap-2 mt-2">
                      {msg.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-[#2c3e50] text-gray-400 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full mt-4 text-gray-400 hover:text-white hover:bg-[#34495e]"
          >
            Leave a Message...
          </Button>
        </div>

        {/* Members */}
        <div className="bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-purple-900/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white">Members</h3>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-[#34495e] text-gray-400 hover:text-white flex items-center justify-center">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mb-4 text-gray-400">
            Total users: <span className="text-white">184,036</span>
          </div>

          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#2c3e50]/50 hover:bg-[#2c3e50] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {member.status === "online" && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#2c3e50]" />
                    )}
                  </div>
                  <div>
                    <div className="text-white">{member.name}</div>
                    <div className="text-gray-400 text-xs">{member.email}</div>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-lg bg-[#34495e] text-gray-400 hover:text-white flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full mt-4 text-gray-400 hover:text-white hover:bg-[#34495e]"
          >
            Load More...
          </Button>
        </div>
      </div>

      {/* Media Table */}
      <div className="bg-[#2c3e50]/80 backdrop-blur rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white">Media Table</h3>
          <button className="w-8 h-8 rounded-lg bg-[#34495e] text-gray-400 hover:text-white flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 rounded-xl bg-[#34495e]/50 hover:bg-[#34495e] transition-colors cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-12 rounded-lg object-cover"
              />
              <div>
                <div className="text-white mb-1">{item.title}</div>
                <div className="text-gray-400 text-xs">{item.author}</div>
              </div>
              <div className="text-gray-400 text-xs">{item.date}</div>
              <div className="text-gray-400 text-xs">{item.views}</div>
              <button className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
