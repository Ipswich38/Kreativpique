import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
}

export default function StatCard({ title, value, change, changeType = "neutral", icon: Icon }: StatCardProps) {
  return (
    <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="text-gray-400">{title}</div>
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
      </div>
      <div className="text-white mb-2">{value}</div>
      {change && (
        <div className={`${
          changeType === "positive" ? "text-green-400" :
          changeType === "negative" ? "text-red-400" :
          "text-gray-400"
        }`}>
          {change}
        </div>
      )}
    </div>
  );
}
