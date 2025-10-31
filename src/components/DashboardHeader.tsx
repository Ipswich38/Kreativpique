import { Search, Bell, Calendar, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function DashboardHeader() {
  return (
    <div className="bg-[#2c3e50]/80 backdrop-blur-lg border-b border-gray-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title and breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Home</span>
            <span>/</span>
            <span className="text-white">Dashboard</span>
          </div>
        </div>

        {/* Right side - Date selector and search */}
        <div className="flex items-center gap-4">
          {/* Date selector buttons */}
          <div className="flex items-center gap-2 bg-[#34495e] rounded-lg p-1">
            <Button
              variant="ghost"
              className="h-8 px-3 text-gray-400 hover:text-white hover:bg-[#2c3e50]"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              className="h-8 px-3 text-gray-400 hover:text-white hover:bg-[#2c3e50]"
            >
              Yesterday
            </Button>
            <Button
              variant="ghost"
              className="h-8 px-3 bg-[#2c3e50] text-white flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              February 26, 2014
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-[#34495e] border-gray-600 text-white placeholder:text-gray-500 h-10"
            />
          </div>

          {/* Notification icon */}
          <button className="relative w-10 h-10 rounded-lg bg-[#34495e] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2c3e50] transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
