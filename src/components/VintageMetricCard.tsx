import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface VintageMetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: "teal" | "coral" | "sage" | "ochre";
}

export default function VintageMetricCard({ 
  title, 
  value, 
  change, 
  subtitle, 
  icon: Icon, 
  trend,
  color = "teal" 
}: VintageMetricCardProps) {
  const getTrendIcon = () => {
    if (trend === "up") return TrendingUp;
    if (trend === "down") return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-[#52796f]";
    if (trend === "down") return "text-[#e76f51]";
    return "text-[#84a59d]";
  };

  const getColorClasses = () => {
    const colors = {
      teal: { bg: "bg-[#52796f]/10", icon: "text-[#52796f]", iconBg: "bg-[#52796f]" },
      coral: { bg: "bg-[#e76f51]/10", icon: "text-[#e76f51]", iconBg: "bg-[#e76f51]" },
      sage: { bg: "bg-[#84a98c]/10", icon: "text-[#84a98c]", iconBg: "bg-[#84a98c]" },
      ochre: { bg: "bg-[#f4a261]/10", icon: "text-[#f4a261]", iconBg: "bg-[#f4a261]" },
    };
    return colors[color];
  };

  const TrendIcon = getTrendIcon();
  const colorClasses = getColorClasses();

  return (
    <div className="bg-white border border-[#d4c5b9] rounded-md p-6 hover:border-[#52796f] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="text-[#6d6d6d]">{title}</div>
        {Icon && (
          <div className={`w-10 h-10 ${colorClasses.bg} rounded-md flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${colorClasses.icon}`} />
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-[#3d3d3d] text-3xl">{value}</div>
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
            <div className="text-[#84a59d] text-xs">{subtitle}</div>
          )}
        </div>
      )}
    </div>
  );
}
