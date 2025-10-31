import { Home, Users, Target, FileText, BarChart3, Settings, MessageSquare, Folder, PieChart, LifeBuoy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface CompactSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function CompactSidebar({ activeTab, setActiveTab }: CompactSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "clients", label: "Clients", icon: Users },
    { id: "citations", label: "Citations", icon: Target },
    { id: "content", label: "Content", icon: FileText },
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "media", label: "Media", icon: Folder },
    { id: "statistics", label: "Statistics", icon: BarChart3 },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-20 h-screen bg-[#2c3e50] flex flex-col items-center py-6 gap-8">
        {/* Logo */}
        <div className="relative group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10L8 6L12 10L16 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 14L8 10L12 14L16 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute inset-0 bg-blue-500/30 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </div>

        {/* User Profile */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative cursor-pointer">
              <Avatar className="h-12 w-12 border-2 border-blue-400">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#2c3e50]" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Marian Lewis - Admin Manager</p>
          </TooltipContent>
        </Tooltip>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-4 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all relative group ${
                      isActive
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                        : "text-gray-400 hover:text-white hover:bg-[#34495e]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {isActive && (
                      <div className="absolute inset-0 bg-blue-500/30 blur-md rounded-xl -z-10" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Settings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setActiveTab("support")}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#34495e] transition-all"
            >
              <LifeBuoy className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Support</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setActiveTab("settings")}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#34495e] transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
