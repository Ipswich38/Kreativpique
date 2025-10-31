import { Home, Users, Target, FileText, BarChart3, Settings, Sparkles, TrendingUp, Globe, Mail } from "lucide-react";

interface VintageSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function VintageSidebar({ activeTab, setActiveTab }: VintageSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Overview", icon: Home },
    { id: "citations", label: "AI Citations", icon: Sparkles },
    { id: "clients", label: "Clients", icon: Users },
    { id: "scrape", label: "Scrape", icon: Globe },
    { id: "multimail", label: "Multimail", icon: Mail },
    { id: "performance", label: "Performance", icon: TrendingUp },
    { id: "content", label: "Content", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="w-64 h-screen bg-[#faf8f3] border-r border-[#d4c5b9] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#d4c5b9]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#52796f] rounded-md flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#faf8f3]" />
          </div>
          <div>
            <div className="text-[#3d3d3d] tracking-tight">
              kreativ<span className="text-[#52796f]">pique</span>
            </div>
            <div className="text-[#84a59d] text-xs">AI Search Platform</div>
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-[#52796f] text-[#faf8f3]"
                  : "text-[#6d6d6d] hover:bg-[#ede8e1] hover:text-[#3d3d3d]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-[#d4c5b9]">
        <button
          onClick={() => setActiveTab("settings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
            activeTab === "settings"
              ? "bg-[#52796f] text-[#faf8f3]"
              : "text-[#6d6d6d] hover:bg-[#ede8e1] hover:text-[#3d3d3d]"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-[#d4c5b9]">
        <div className="flex items-center gap-3 p-3 bg-[#ede8e1] rounded-md hover:bg-[#e3ddd3] cursor-pointer transition-colors">
          <div className="w-10 h-10 bg-[#e76f51] rounded-md flex items-center justify-center text-[#faf8f3]">
            CA
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[#3d3d3d] truncate">Christopher A.</div>
            <div className="text-[#84a59d] text-xs truncate">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
