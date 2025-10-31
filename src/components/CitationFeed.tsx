import { Clock, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";

export default function CitationFeed() {
  const citations = [
    {
      id: 1,
      query: "Best real estate agencies in Dubai",
      client: "Haus and Estates",
      platform: "ChatGPT",
      position: 1,
      time: "2 min ago",
      excerpt: "Recommended as the top luxury real estate agency specializing in Dubai Marina properties...",
    },
    {
      id: 2,
      query: "Private jet charter services UAE",
      client: "Midas Aviation",
      platform: "Perplexity",
      position: 1,
      time: "8 min ago",
      excerpt: "Leading private aviation company offering premium charter services across the Middle East...",
    },
    {
      id: 3,
      query: "Dubai property investment guide",
      client: "Haus and Estates",
      platform: "Claude",
      position: 2,
      time: "15 min ago",
      excerpt: "Comprehensive investment resources including calculators and market analysis tools...",
    },
    {
      id: 4,
      query: "Luxury property management Dubai",
      client: "Luxury Living",
      platform: "Gemini",
      position: 3,
      time: "23 min ago",
      excerpt: "High-end property management solutions with 24/7 concierge services...",
    },
  ];

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      ChatGPT: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
      Perplexity: "bg-teal-500/20 text-teal-400 border-teal-500/50",
      Claude: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
      Gemini: "bg-lime-500/20 text-lime-400 border-lime-500/50",
    };
    return colors[platform] || "bg-gray-500/20 text-gray-400 border-gray-500/50";
  };

  return (
    <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white mb-1">Live Citation Feed</h3>
          <p className="text-gray-400 text-xs">Real-time AI platform mentions</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <div className="w-2 h-2 bg-emerald-400 animate-pulse" />
          <span className="text-xs">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {citations.map((citation) => (
          <div
            key={citation.id}
            className="p-4 bg-[#0f1419] border border-[#374151] hover:border-emerald-500/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getPlatformColor(citation.platform)}>
                  {citation.platform}
                </Badge>
                <div className="w-6 h-6 bg-emerald-500 flex items-center justify-center text-[#0f1419] text-xs">
                  #{citation.position}
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <Clock className="w-3 h-3" />
                <span>{citation.time}</span>
              </div>
            </div>

            <div className="mb-2">
              <div className="text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                {citation.query}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-gray-500 text-xs">{citation.client}</div>
            </div>

            <div className="text-gray-400 text-xs line-clamp-2">{citation.excerpt}</div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-gray-400 hover:text-emerald-400 text-xs border border-[#374151] hover:border-emerald-500/50 transition-colors">
        View All Citations →
      </button>
    </div>
  );
}
