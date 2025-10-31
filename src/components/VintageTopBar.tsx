import { Search, Bell, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export default function VintageTopBar() {
  return (
    <div className="h-16 bg-[#faf8f3] border-b border-[#d4c5b9] px-6 flex items-center justify-between">
      {/* Left - Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#84a59d]" />
          <Input
            placeholder="Search citations, clients, content..."
            className="pl-10 bg-white border-[#d4c5b9] text-[#3d3d3d] placeholder:text-[#a8a8a8] h-10 rounded-md"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-md border border-[#d4c5b9]">
          <div className="w-2 h-2 bg-[#52796f] rounded-full animate-pulse" />
          <span className="text-[#6d6d6d] text-xs">All Systems Active</span>
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 bg-white rounded-md border border-[#d4c5b9] flex items-center justify-center text-[#6d6d6d] hover:text-[#3d3d3d] hover:border-[#52796f] transition-colors">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#e76f51] text-white text-xs border-0 rounded-md">
            3
          </Badge>
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-md border border-[#d4c5b9] text-[#6d6d6d] hover:text-[#3d3d3d] hover:border-[#52796f] transition-colors">
          <span className="text-xs">Christopher A.</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
