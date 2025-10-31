import { Menu, Bell, LogOut, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Sparkles, Home, Users, Globe, Mail, BarChart3, Settings } from "lucide-react";

interface MobileHeaderProps {
  userEmail: string;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MobileHeader({ userEmail, onLogout, activeTab, setActiveTab }: MobileHeaderProps) {
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const allMenuItems = [
    { id: "dashboard", label: "Overview", icon: Home },
    { id: "citations", label: "AI Citations", icon: Sparkles },
    { id: "clients", label: "Clients", icon: Users },
    { id: "scrape", label: "Web Scraping", icon: Globe },
    { id: "multimail", label: "Email Campaigns", icon: Mail },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="sticky top-0 z-40 bg-[#0f1419] border-b border-[#1f2937] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left - Logo & Menu */}
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden w-10 h-10 bg-[#1f2937] rounded-lg flex items-center justify-center text-gray-400 hover:text-white">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#0f1419] border-[#1f2937] w-72 p-0">
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

              {/* Menu Items */}
              <nav className="p-4 space-y-1">
                {allMenuItems.map((item) => {
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

              {/* User Profile */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1f2937]">
                <div className="flex items-center gap-3 p-3 bg-[#1f2937] rounded-lg mb-2">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-[#0f1419] text-xs">
                    {getInitials(userEmail)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm truncate">{userEmail}</div>
                    <div className="text-gray-400 text-xs">Account</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#0f1419]" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white text-sm tracking-tight">
                kreativ<span className="text-emerald-400">pique</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <button className="relative w-10 h-10 bg-[#1f2937] rounded-lg flex items-center justify-center text-gray-400 hover:text-white">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-emerald-500 text-[#0f1419] text-xs border-0 rounded-full">
              0
            </Badge>
          </button>
          
          <div className="hidden sm:flex w-8 h-8 bg-emerald-500 rounded-full items-center justify-center text-[#0f1419] text-xs">
            {getInitials(userEmail)}
          </div>
        </div>
      </div>
    </div>
  );
}
