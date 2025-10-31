import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Download, Plus, Sparkles, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useApp } from "../contexts/AppContext";

export default function ProductionCitationsPage() {
  const { clients, queries, citations, addQuery } = useApp();
  const [isAddingQuery, setIsAddingQuery] = useState(false);
  const [newQuery, setNewQuery] = useState({
    clientId: "",
    query: "",
    platforms: ["chatgpt", "perplexity", "claude", "gemini"],
    frequency: "daily",
  });

  const handleAddQuery = () => {
    if (newQuery.clientId && newQuery.query) {
      addQuery({
        clientId: newQuery.clientId,
        query: newQuery.query,
        platforms: newQuery.platforms,
        frequency: newQuery.frequency,
      });
      
      setNewQuery({
        clientId: "",
        query: "",
        platforms: ["chatgpt", "perplexity", "claude", "gemini"],
        frequency: "daily",
      });
      setIsAddingQuery(false);
    }
  };

  const hasData = queries.length > 0;

  if (!hasData) {
    return (
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">AI Citation Tracking</h1>
            <p className="text-gray-400 text-sm md:text-base">
              Monitor client mentions across ChatGPT, Perplexity, Claude, and Gemini
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h2 className="text-white mb-3 text-xl">Start Tracking AI Citations</h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Add monitoring queries to track how AI platforms mention your clients when users ask questions.
            </p>

            <div className="bg-[#0f1419] border border-[#374151] rounded-lg p-6 mb-6 text-left">
              <h3 className="text-white mb-3 text-sm md:text-base">Example Queries to Monitor:</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="p-3 bg-[#1f2937] rounded-lg">
                  "Best Dubai real estate investment opportunities"
                </div>
                <div className="p-3 bg-[#1f2937] rounded-lg">
                  "How to charter a private jet from Dubai"
                </div>
                <div className="p-3 bg-[#1f2937] rounded-lg">
                  "Private aviation flight permits requirements"
                </div>
                <div className="p-3 bg-[#1f2937] rounded-lg">
                  "Dubai Marina apartment prices 2025"
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3 text-left">
                <Sparkles className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-orange-400 mb-1 text-sm font-medium">Quick Tip</div>
                  <div className="text-gray-400 text-sm">
                    Add 20-50 relevant queries per client to get comprehensive coverage. The platform will automatically check all AI platforms daily.
                  </div>
                </div>
              </div>
            </div>

            <Dialog open={isAddingQuery} onOpenChange={setIsAddingQuery}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Monitoring Query
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1f2937] border-[#374151] text-white rounded-lg max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-white">Add Monitoring Query</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Configure a query to monitor across AI platforms.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="client" className="text-gray-400">Select Client *</Label>
                    <select 
                      id="client"
                      value={newQuery.clientId}
                      onChange={(e) => setNewQuery({ ...newQuery, clientId: e.target.value })}
                      className="w-full mt-2 h-10 px-3 bg-[#0f1419] border border-[#374151] rounded-lg text-white"
                    >
                      <option value="">Select a client...</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                    {clients.length === 0 && (
                      <p className="text-orange-400 text-xs mt-1">Please add a client first</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="query" className="text-gray-400">Query to Monitor *</Label>
                    <Textarea
                      id="query"
                      value={newQuery.query}
                      onChange={(e) => setNewQuery({ ...newQuery, query: e.target.value })}
                      placeholder="e.g., Best Dubai real estate investments"
                      rows={3}
                      className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-400">Platforms to Monitor</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        { id: "chatgpt", label: "ChatGPT" },
                        { id: "perplexity", label: "Perplexity" },
                        { id: "claude", label: "Claude" },
                        { id: "gemini", label: "Gemini" },
                      ].map(platform => (
                        <label key={platform.id} className="flex items-center gap-2 p-3 bg-[#0f1419] rounded-lg cursor-pointer hover:bg-[#374151]">
                          <input 
                            type="checkbox" 
                            checked={newQuery.platforms.includes(platform.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewQuery({ ...newQuery, platforms: [...newQuery.platforms, platform.id] });
                              } else {
                                setNewQuery({ ...newQuery, platforms: newQuery.platforms.filter(p => p !== platform.id) });
                              }
                            }}
                            className="rounded" 
                          />
                          <span className="text-white text-sm">{platform.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-400">Check Frequency</Label>
                    <select 
                      value={newQuery.frequency}
                      onChange={(e) => setNewQuery({ ...newQuery, frequency: e.target.value })}
                      className="w-full mt-2 h-10 px-3 bg-[#0f1419] border border-[#374151] rounded-lg text-white"
                    >
                      <option value="daily">Daily</option>
                      <option value="every-2-days">Every 2 days</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingQuery(false)}
                      className="bg-[#0f1419] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddQuery}
                      disabled={!newQuery.clientId || !newQuery.query || newQuery.platforms.length === 0}
                      className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Query
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-xs md:text-sm">ChatGPT</div>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
            <div className="text-white text-lg md:text-2xl">0</div>
            <div className="text-gray-500 text-xs">citations</div>
          </div>

          <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-xs md:text-sm">Perplexity</div>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
            <div className="text-white text-lg md:text-2xl">0</div>
            <div className="text-gray-500 text-xs">citations</div>
          </div>

          <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-xs md:text-sm">Claude</div>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
            <div className="text-white text-lg md:text-2xl">0</div>
            <div className="text-gray-500 text-xs">citations</div>
          </div>

          <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-xs md:text-sm">Gemini</div>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
            <div className="text-white text-lg md:text-2xl">0</div>
            <div className="text-gray-500 text-xs">citations</div>
          </div>
        </div>
      </div>
    );
  }

  // When data exists (will be shown after monitoring is set up)
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">AI Citation Tracking</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Real-time monitoring across all AI platforms
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-[#1f2937] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Query
          </Button>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400 text-xs md:text-sm">ChatGPT</div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs rounded-lg">
              Active
            </Badge>
          </div>
          <div className="text-white text-lg md:text-2xl">0</div>
          <div className="text-gray-500 text-xs">citations this month</div>
        </div>

        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400 text-xs md:text-sm">Perplexity</div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs rounded-lg">
              Active
            </Badge>
          </div>
          <div className="text-white text-lg md:text-2xl">0</div>
          <div className="text-gray-500 text-xs">citations this month</div>
        </div>

        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400 text-xs md:text-sm">Claude</div>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs rounded-lg">
              Active
            </Badge>
          </div>
          <div className="text-white text-lg md:text-2xl">0</div>
          <div className="text-gray-500 text-xs">citations this month</div>
        </div>

        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-400 text-xs md:text-sm">Gemini</div>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs rounded-lg">
              Active
            </Badge>
          </div>
          <div className="text-white text-lg md:text-2xl">0</div>
          <div className="text-gray-500 text-xs">citations this month</div>
        </div>
      </div>

      {/* Tabs and Content */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <TabsList className="bg-[#1f2937] border border-[#374151] rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-[#0f1419] rounded-md text-xs md:text-sm">
              All Platforms
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
          {citations.length === 0 ? (
            <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">No citations detected yet</div>
              <div className="text-gray-500 text-sm">
                Citations will appear here once AI platforms mention your clients in their responses
              </div>
              {queries.length > 0 && (
                <div className="mt-4 text-emerald-400 text-sm">
                  {queries.length} {queries.length === 1 ? 'query' : 'queries'} being monitored
                </div>
              )}
            </div>
          ) : (
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
                    {citations.map((citation) => {
                      const client = clients.find(c => c.id === citation.clientId);
                      const platformColors: Record<string, string> = {
                        chatgpt: "bg-green-500/20 text-green-400 border-green-500/30",
                        perplexity: "bg-blue-500/20 text-blue-400 border-blue-500/30",
                        claude: "bg-purple-500/20 text-purple-400 border-purple-500/30",
                        gemini: "bg-orange-500/20 text-orange-400 border-orange-500/30",
                      };
                      
                      return (
                        <tr
                          key={citation.id}
                          className="border-b border-[#374151] hover:bg-[#374151]/30 transition-colors"
                        >
                          <td className="p-3 md:p-4">
                            <div className="text-white mb-1 text-sm md:text-base">{citation.query}</div>
                            <div className="text-gray-400 text-xs">{citation.context}</div>
                          </td>
                          <td className="p-3 md:p-4 text-gray-400 text-sm">{client?.name || 'Unknown'}</td>
                          <td className="p-3 md:p-4">
                            <Badge className={`${platformColors[citation.platform] || platformColors.chatgpt} text-xs rounded-lg`}>
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
                          <td className="p-3 md:p-4 text-gray-400 text-xs md:text-sm">
                            {new Date(citation.detectedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Active Queries */}
      {queries.length > 0 && (
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
          <h3 className="text-white mb-4">Active Monitoring Queries ({queries.length})</h3>
          <div className="space-y-2">
            {queries.map((query) => {
              const client = clients.find(c => c.id === query.clientId);
              return (
                <div key={query.id} className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
                  <div className="flex-1">
                    <div className="text-white text-sm mb-1">{query.query}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Target className="w-3 h-3" />
                      <span>{client?.name}</span>
                      <span>•</span>
                      <span>{query.platforms.length} platforms</span>
                      <span>•</span>
                      <span>{query.frequency}</span>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 rounded-lg text-xs">
                    Active
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
