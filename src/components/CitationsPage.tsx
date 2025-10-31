import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function CitationsPage() {
  const citations = [
    {
      id: 1,
      query: "Best real estate in Dubai",
      client: "Haus and Estates",
      platform: "ChatGPT",
      position: 1,
      date: "Today",
      context: "Top recommended agency for Dubai luxury properties",
    },
    {
      id: 2,
      query: "Dubai property investment guide",
      client: "Haus and Estates",
      platform: "Perplexity",
      position: 2,
      date: "Today",
      context: "Comprehensive investment resources and calculators",
    },
    {
      id: 3,
      query: "Private jet charter Dubai",
      client: "Midas Aviation",
      platform: "Claude",
      position: 1,
      date: "Yesterday",
      context: "Premium aviation services in the UAE region",
    },
    {
      id: 4,
      query: "Luxury property management",
      client: "Luxury Living",
      platform: "Gemini",
      position: 3,
      date: "Yesterday",
      context: "High-end property management solutions",
    },
    {
      id: 5,
      query: "AI optimization tools",
      client: "Tech Innovators",
      platform: "ChatGPT",
      position: 2,
      date: "2 days ago",
      context: "Cutting-edge AI solutions for businesses",
    },
  ];

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      ChatGPT: "bg-green-500/20 text-green-400 border-green-500/30",
      Perplexity: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Claude: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Gemini: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    };
    return colors[platform] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Citation Tracking</h1>
          <p className="text-gray-400 text-sm md:text-base">Real-time monitoring of AI platform citations across ChatGPT, Perplexity, Claude, and Gemini</p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto bg-[#1f2937] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400 text-xs md:text-sm">ChatGPT</div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs rounded-lg">+18%</Badge>
          </div>
          <div className="text-white text-lg md:text-2xl">4,234</div>
        </div>
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400 text-xs md:text-sm">Perplexity</div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs rounded-lg">+25%</Badge>
          </div>
          <div className="text-white text-lg md:text-2xl">3,187</div>
        </div>
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400 text-xs md:text-sm">Claude</div>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs rounded-lg">+12%</Badge>
          </div>
          <div className="text-white text-lg md:text-2xl">2,456</div>
        </div>
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400 text-xs md:text-sm">Gemini</div>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs rounded-lg">+8%</Badge>
          </div>
          <div className="text-white text-lg md:text-2xl">1,365</div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <TabsList className="bg-[#1f2937] border border-[#374151] rounded-lg overflow-x-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-md text-xs md:text-sm">
              All
            </TabsTrigger>
            <TabsTrigger value="chatgpt" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-md text-xs md:text-sm">
              ChatGPT
            </TabsTrigger>
            <TabsTrigger value="perplexity" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-md text-xs md:text-sm">
              Perplexity
            </TabsTrigger>
            <TabsTrigger value="claude" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-md text-xs md:text-sm">
              Claude
            </TabsTrigger>
            <TabsTrigger value="gemini" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-md text-xs md:text-sm">
              Gemini
            </TabsTrigger>
          </TabsList>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search citations..."
              className="pl-10 bg-[#1f2937] border-[#374151] text-white placeholder:text-gray-500 rounded-lg text-sm md:text-base"
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="bg-[#1f2937] border border-[#374151] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#374151] bg-[#0f1419]/50">
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Query</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Client</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Platform</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Position</th>
                    <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {citations.map((citation) => (
                    <tr
                      key={citation.id}
                      className="border-b border-[#374151] hover:bg-[#374151]/30 transition-colors cursor-pointer"
                    >
                      <td className="p-3 md:p-4">
                        <div className="text-white mb-1 text-sm md:text-base">{citation.query}</div>
                        <div className="text-gray-400 text-xs">{citation.context}</div>
                      </td>
                      <td className="p-3 md:p-4 text-gray-400 text-sm">{citation.client}</td>
                      <td className="p-3 md:p-4">
                        <Badge className={`${getPlatformColor(citation.platform)} text-xs rounded-lg`}>
                          {citation.platform}
                        </Badge>
                      </td>
                      <td className="p-3 md:p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs md:text-sm">
                            #{citation.position}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 md:p-4 text-gray-400 text-xs md:text-sm">{citation.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
