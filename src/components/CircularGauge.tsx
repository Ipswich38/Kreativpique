interface CircularGaugeProps {
  value: number;
  max: number;
  label: string;
  color?: string;
}

export default function CircularGauge({ value, max, label, color = "#3b82f6" }: CircularGaugeProps) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="#374151"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white">{value}</span>
          <span className="text-gray-400 text-xs">/{max}</span>
        </div>
      </div>
      <div className="text-gray-400 mt-2">{label}</div>
    </div>
  );
}
