import { Home, Users, Target, FileText, BarChart3, Settings, Sparkles, TrendingUp, Globe, Mail, Lightbulb } from "lucide-react";

interface ModernSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ModernSidebar({ activeTab, setActiveTab }: ModernSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Overview", icon: Home },
    { id: "citations", label: "AI Citations", icon: Sparkles },
    { id: "clients", label: "Clients", icon: Users },
    { id: "ads", label: "Ads & SEO", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "scrape", label: "Scrape", icon: Globe },
    { id: "multimail", label: "Multimail", icon: Mail },
    { id: "demo", label: "Demo", icon: Lightbulb },
  ];

  return (
    <div className="w-64 h-screen bg-[#0f1419] border-r border-[#1f2937] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1f2937]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#0f1419]" />
          </div>
          <div>
            <div className="text-white tracking-tight">
              kreativ<span className="text-emerald-400">pique</span>
            </div>
            <div className="text-gray-500 text-xs">AI Search Platform</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-emerald-500 text-[#0f1419]"
                  : "text-gray-400 hover:bg-[#1f2937] hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-[#1f2937]">
        <button
          onClick={() => setActiveTab("settings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === "settings"
              ? "bg-emerald-500 text-[#0f1419]"
              : "text-gray-400 hover:bg-[#1f2937] hover:text-white"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
