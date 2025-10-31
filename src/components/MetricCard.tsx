import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export default function MetricCard({ title, value, change, subtitle, icon: Icon, trend }: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === "up") return TrendingUp;
    if (trend === "down") return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-emerald-400";
    if (trend === "down") return "text-red-400";
    return "text-gray-400";
  };

  const TrendIcon = getTrendIcon();

  return (
    <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6 hover:border-emerald-500/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="text-gray-400">{title}</div>
        {Icon && (
          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-emerald-400" />
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-white text-3xl">{value}</div>
      </div>

      {(change !== undefined || subtitle) && (
        <div className="flex items-center gap-2">
          {change !== undefined && (
            <div className={`flex items-center gap-1 ${getTrendColor()}`}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-xs">
                {change > 0 ? "+" : ""}{change}%
              </span>
            </div>
          )}
          {subtitle && (
            <div className="text-gray-500 text-xs">{subtitle}</div>
          )}
        </div>
      )}
    </div>
  );
}
