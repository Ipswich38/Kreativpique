import { useState } from "react";
import { Plus, Search, Filter, Building2, TrendingUp, Target, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useApp } from "../contexts/AppContext";

export default function ProductionClientsPage() {
  const { clients, addClient } = useApp();
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    industry: "",
    website: "",
    targetKeywords: "",
    description: "",
  });

  const handleAddClient = () => {
    if (newClient.name && newClient.industry) {
      addClient({
        name: newClient.name,
        industry: newClient.industry,
        website: newClient.website,
        targetKeywords: newClient.targetKeywords.split(",").map(k => k.trim()).filter(k => k),
        description: newClient.description,
      });
      
      setNewClient({
        name: "",
        industry: "",
        website: "",
        targetKeywords: "",
        description: "",
      });
      setIsAddingClient(false);
    }
  };

  if (clients.length === 0) {
    return (
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Clients</h1>
            <p className="text-gray-400 text-sm md:text-base">Manage client portfolios and AI search monitoring</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h2 className="text-white mb-3 text-xl">No Clients Added Yet</h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Add your first client to start tracking their presence across AI platforms like ChatGPT, Perplexity, Claude, and Gemini.
            </p>

            <div className="bg-[#0f1419] border border-[#374151] rounded-lg p-6 mb-6 text-left">
              <h3 className="text-white mb-3 text-sm md:text-base">Client Profile Includes:</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>Company name and industry</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>Website and brand information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>Target keywords and queries to monitor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>Competitors to track</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span>Citation goals and benchmarks</span>
                </div>
              </div>
            </div>

            <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Client
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1f2937] border-[#374151] text-white rounded-lg max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Client</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Add a new client to start tracking their AI search presence.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName" className="text-gray-400">Client Name *</Label>
                      <Input
                        id="clientName"
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        placeholder="e.g., Haus and Estates"
                        className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry" className="text-gray-400">Industry *</Label>
                      <Input
                        id="industry"
                        value={newClient.industry}
                        onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                        placeholder="e.g., Real Estate"
                        className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website" className="text-gray-400">Website</Label>
                    <Input
                      id="website"
                      value={newClient.website}
                      onChange={(e) => setNewClient({ ...newClient, website: e.target.value })}
                      placeholder="https://example.com"
                      className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="keywords" className="text-gray-400">Target Keywords (comma-separated)</Label>
                    <Textarea
                      id="keywords"
                      value={newClient.targetKeywords}
                      onChange={(e) => setNewClient({ ...newClient, targetKeywords: e.target.value })}
                      placeholder="Dubai real estate, luxury properties Dubai, Dubai Marina apartments"
                      rows={3}
                      className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-400">Client Description</Label>
                    <Textarea
                      id="description"
                      value={newClient.description}
                      onChange={(e) => setNewClient({ ...newClient, description: e.target.value })}
                      placeholder="Brief description of the client's business and goals..."
                      rows={4}
                      className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingClient(false)}
                      className="bg-[#0f1419] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddClient}
                      className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg"
                    >
                      Add Client
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Clients</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Managing {clients.length} client{clients.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Dialog open={isAddingClient} onOpenChange={setIsAddingClient}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1f2937] border-[#374151] text-white rounded-lg max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Client</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new client to start tracking their AI search presence.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName" className="text-gray-400">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    placeholder="e.g., Haus and Estates"
                    className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="industry" className="text-gray-400">Industry *</Label>
                  <Input
                    id="industry"
                    value={newClient.industry}
                    onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                    placeholder="e.g., Real Estate"
                    className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website" className="text-gray-400">Website</Label>
                <Input
                  id="website"
                  value={newClient.website}
                  onChange={(e) => setNewClient({ ...newClient, website: e.target.value })}
                  placeholder="https://example.com"
                  className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="keywords" className="text-gray-400">Target Keywords (comma-separated)</Label>
                <Textarea
                  id="keywords"
                  value={newClient.targetKeywords}
                  onChange={(e) => setNewClient({ ...newClient, targetKeywords: e.target.value })}
                  placeholder="Dubai real estate, luxury properties Dubai, Dubai Marina apartments"
                  rows={3}
                  className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-400">Client Description</Label>
                <Textarea
                  id="description"
                  value={newClient.description}
                  onChange={(e) => setNewClient({ ...newClient, description: e.target.value })}
                  placeholder="Brief description of the client's business and goals..."
                  rows={4}
                  className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingClient(false)}
                  className="bg-[#0f1419] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddClient}
                  className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg"
                >
                  Add Client
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search clients..."
            className="pl-10 bg-[#1f2937] border-[#374151] text-white placeholder:text-gray-500 rounded-lg text-sm md:text-base"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto bg-[#1f2937] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6 hover:border-emerald-500/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-white mb-1">{client.name}</h3>
                <p className="text-gray-400 text-sm">{client.industry}</p>
                {client.website && (
                  <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-xs hover:underline">
                    {client.website}
                  </a>
                )}
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-[#0f1419] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-400 text-xs">Citations</span>
                </div>
                <div className="text-white text-lg">{client.citationsThisMonth}</div>
              </div>

              <div className="bg-[#0f1419] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-400 text-xs">Avg Pos</span>
                </div>
                <div className="text-white text-lg">{client.avgPosition || 'N/A'}</div>
              </div>

              <div className="bg-[#0f1419] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-400 text-xs">Keywords</span>
                </div>
                <div className="text-white text-lg">{client.targetKeywords.length}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {client.targetKeywords.slice(0, 3).map((keyword, idx) => (
                <span key={idx} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-lg border border-emerald-500/20">
                  {keyword}
                </span>
              ))}
              {client.targetKeywords.length > 3 && (
                <span className="px-2 py-1 bg-[#0f1419] text-gray-400 text-xs rounded-lg">
                  +{client.targetKeywords.length - 3} more
                </span>
              )}
            </div>

            <div className="text-gray-500 text-xs">
              Monitoring since {client.monitoringSince}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
