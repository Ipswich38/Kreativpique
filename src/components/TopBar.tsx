import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface TopBarProps {
  userEmail: string;
  onLogout: () => void;
}

export default function TopBar({ userEmail, onLogout }: TopBarProps) {
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="h-16 bg-[#0f1419] border-b border-[#1f2937] px-6 flex items-center justify-between">
      {/* Left - Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search citations, clients, content..."
            className="pl-10 bg-[#1f2937] border-[#374151] text-white placeholder:text-gray-500 h-10 rounded-lg"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] rounded-lg">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-gray-400 text-xs">All Systems Active</span>
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 bg-[#1f2937] rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#374151] transition-colors">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-emerald-500 text-[#0f1419] text-xs border-0 rounded-full">
            0
          </Badge>
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 bg-[#1f2937] rounded-lg text-gray-400 hover:text-white hover:bg-[#374151] transition-colors">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[#0f1419] text-xs">
                {getInitials(userEmail)}
              </div>
              <span className="text-xs">{userEmail}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1f2937] border-[#374151] text-white rounded-lg">
            <DropdownMenuItem className="text-gray-400 focus:bg-[#374151] focus:text-white rounded-md">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-400 focus:bg-[#374151] focus:text-white rounded-md">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#374151]" />
            <DropdownMenuItem 
              onClick={onLogout}
              className="text-red-400 focus:bg-[#374151] focus:text-red-300 rounded-md cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
