import { MessageSquare, Sparkles, Cpu, Search } from "lucide-react";
import { Progress } from "./ui/progress";

export default function PlatformMetrics() {
  const platforms = [
    {
      name: "ChatGPT",
      icon: MessageSquare,
      citations: 4234,
      share: 38,
      change: "+18%",
      color: "emerald",
    },
    {
      name: "Perplexity",
      icon: Search,
      citations: 3187,
      share: 29,
      change: "+25%",
      color: "teal",
    },
    {
      name: "Claude",
      icon: Sparkles,
      citations: 2456,
      share: 22,
      change: "+12%",
      color: "cyan",
    },
    {
      name: "Gemini",
      icon: Cpu,
      citations: 1365,
      share: 11,
      change: "+8%",
      color: "lime",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; progress: string }> = {
      emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", progress: "bg-emerald-500" },
      teal: { bg: "bg-teal-500/10", text: "text-teal-400", progress: "bg-teal-500" },
      cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", progress: "bg-cyan-500" },
      lime: { bg: "bg-lime-500/10", text: "text-lime-400", progress: "bg-lime-500" },
    };
    return colors[color];
  };

  return (
    <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white mb-1">Platform Performance</h3>
          <p className="text-gray-400 text-xs">Citation distribution across AI platforms</p>
        </div>
        <div className="text-right">
          <div className="text-white">11,242</div>
          <div className="text-gray-400 text-xs">Total Citations</div>
        </div>
      </div>

      <div className="space-y-4">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const colors = getColorClasses(platform.color);
          
          return (
            <div key={platform.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${colors.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <div className="text-white">{platform.name}</div>
                    <div className="text-gray-400 text-xs">{platform.citations.toLocaleString()} citations</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={colors.text}>{platform.share}%</div>
                  <div className="text-gray-400 text-xs">{platform.change}</div>
                </div>
              </div>
              <div className="h-2 bg-[#0f1419]">
                <div
                  className={colors.progress}
                  style={{ width: `${platform.share}%`, height: "100%" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
