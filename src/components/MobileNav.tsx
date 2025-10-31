import { Home, Users, Sparkles, Lightbulb, Settings } from "lucide-react";

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "citations", label: "Citations", icon: Sparkles },
    { id: "clients", label: "Clients", icon: Users },
    { id: "demo", label: "Demo", icon: Lightbulb },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f1419] border-t border-[#1f2937] px-2 py-2 md:hidden z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? "text-emerald-400"
                  : "text-gray-500"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "text-emerald-400" : "text-gray-500"}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
