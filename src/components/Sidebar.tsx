import { Home, Users, Target, FileText, BarChart3, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Logo from "./Logo";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "clients", label: "Clients", icon: Users },
    { id: "citations", label: "Citations", icon: Target },
    { id: "content", label: "Content", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-[#1a1f2e] border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Logo />
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
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-white">Christopher Arana</div>
            <div className="text-gray-400 truncate">admin@platform.com</div>
          </div>
          <LogOut className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
