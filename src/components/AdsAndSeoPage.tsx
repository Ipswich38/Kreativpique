import { useState } from "react";
import { TrendingUp, Target, DollarSign, Users, Plus, Search, Globe, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { useApp } from "../contexts/AppContext";

interface Campaign {
  id: string;
  clientId: string;
  name: string;
  platform: "google" | "meta" | "linkedin";
  type: "search" | "display" | "social" | "video";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  status: "active" | "paused" | "completed";
  startDate: string;
  keywords?: string[];
}

export default function AdsAndSeoPage() {
  const { clients } = useApp();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isAddingCampaign, setIsAddingCampaign] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [newCampaign, setNewCampaign] = useState({
    clientId: "",
    name: "",
    platform: "google" as const,
    type: "search" as const,
    budget: "",
    keywords: "",
  });

  const handleAddCampaign = () => {
    if (newCampaign.clientId && newCampaign.name && newCampaign.budget) {
      const campaign: Campaign = {
        id: Date.now().toString(),
        clientId: newCampaign.clientId,
        name: newCampaign.name,
        platform: newCampaign.platform,
        type: newCampaign.type,
        budget: parseFloat(newCampaign.budget),
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        status: "active",
        startDate: new Date().toISOString(),
        keywords: newCampaign.keywords.split(",").map(k => k.trim()).filter(k => k),
      };
      
      setCampaigns([...campaigns, campaign]);
      setNewCampaign({
        clientId: "",
        name: "",
        platform: "google",
        type: "search",
        budget: "",
        keywords: "",
      });
      setIsAddingCampaign(false);
    }
  };

  // Calculate totals
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgCPC = totalClicks > 0 ? totalSpent / totalClicks : 0;
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  const luxuryKeywordSuggestions = {
    aviation: [
      "private jet charter Dubai",
      "luxury private aviation UAE",
      "VIP jet charter Middle East",
      "executive jet rental Dubai",
      "private jet Dubai to London",
      "helicopter charter Dubai",
      "business aviation Dubai",
      "ultra long range private jets",
    ],
    realEstate: [
      "luxury real estate Dubai",
      "Dubai Marina penthouse",
      "Palm Jumeirah villa",
      "Downtown Dubai apartments",
      "off-plan luxury properties Dubai",
      "Dubai investment property",
      "waterfront villas Dubai",
      "high-end real estate UAE",
    ],
  };

  if (campaigns.length === 0) {
    return (
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Ads & SEO Management</h1>
            <p className="text-gray-400 text-sm md:text-base">
              Optimize Google Ads, Meta Ads, and SEO for high-value clients
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-emerald-400" />
            </div>
            
            <h2 className="text-white mb-3 text-xl">Launch Your First Campaign</h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Create and manage high-performance ad campaigns optimized for luxury aviation and real estate markets.
            </p>

            <div className="bg-[#0f1419] border border-[#374151] rounded-lg p-6 mb-6 text-left">
              <h3 className="text-white mb-4">Campaign Types Available:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-[#1f2937] rounded-lg">
                  <Globe className="w-6 h-6 text-blue-400 mb-2" />
                  <div className="text-white mb-1">Google Ads</div>
                  <div className="text-gray-400 text-xs">Search, Display, Video campaigns</div>
                </div>
                <div className="p-4 bg-[#1f2937] rounded-lg">
                  <Facebook className="w-6 h-6 text-blue-500 mb-2" />
                  <div className="text-white mb-1">Meta Ads</div>
                  <div className="text-gray-400 text-xs">Facebook & Instagram campaigns</div>
                </div>
                <div className="p-4 bg-[#1f2937] rounded-lg">
                  <Linkedin className="w-6 h-6 text-blue-600 mb-2" />
                  <div className="text-white mb-1">LinkedIn Ads</div>
                  <div className="text-gray-400 text-xs">B2B & professional targeting</div>
                </div>
              </div>
            </div>

            <Dialog open={isAddingCampaign} onOpenChange={setIsAddingCampaign}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1f2937] border-[#374151] text-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Campaign</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Set up a new advertising campaign for Google Ads, Meta, or LinkedIn.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="clientSelect" className="text-gray-400">Select Client *</Label>
                    <select
                      id="clientSelect"
                      value={newCampaign.clientId}
                      onChange={(e) => setNewCampaign({ ...newCampaign, clientId: e.target.value })}
                      className="w-full mt-2 h-10 px-3 bg-[#0f1419] border border-[#374151] rounded-lg text-white"
                    >
                      <option value="">Select a client...</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="campaignName" className="text-gray-400">Campaign Name *</Label>
                    <Input
                      id="campaignName"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      placeholder="e.g., Dubai Luxury Real Estate - Search"
                      className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="platform" className="text-gray-400">Platform *</Label>
                      <select
                        id="platform"
                        value={newCampaign.platform}
                        onChange={(e) => setNewCampaign({ ...newCampaign, platform: e.target.value as any })}
                        className="w-full mt-2 h-10 px-3 bg-[#0f1419] border border-[#374151] rounded-lg text-white"
                      >
                        <option value="google">Google Ads</option>
                        <option value="meta">Meta (Facebook/Instagram)</option>
                        <option value="linkedin">LinkedIn Ads</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="type" className="text-gray-400">Campaign Type *</Label>
                      <select
                        id="type"
                        value={newCampaign.type}
                        onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value as any })}
                        className="w-full mt-2 h-10 px-3 bg-[#0f1419] border border-[#374151] rounded-lg text-white"
                      >
                        <option value="search">Search</option>
                        <option value="display">Display</option>
                        <option value="social">Social</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-gray-400">Monthly Budget (USD) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                      placeholder="5000"
                      className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="keywords" className="text-gray-400">Target Keywords (comma-separated)</Label>
                    <Textarea
                      id="keywords"
                      value={newCampaign.keywords}
                      onChange={(e) => setNewCampaign({ ...newCampaign, keywords: e.target.value })}
                      placeholder="private jet Dubai, luxury aviation, VIP charter"
                      rows={3}
                      className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingCampaign(false)}
                      className="bg-[#0f1419] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddCampaign}
                      disabled={!newCampaign.clientId || !newCampaign.name || !newCampaign.budget}
                      className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg"
                    >
                      Create Campaign
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Luxury Niche Keywords */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Aviation Keywords
            </h3>
            <div className="space-y-2">
              {luxuryKeywordSuggestions.aviation.map((keyword, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-[#0f1419] rounded-lg text-sm">
                  <span className="text-gray-300">{keyword}</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs rounded-lg">
                    High CPC
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Real Estate Keywords
            </h3>
            <div className="space-y-2">
              {luxuryKeywordSuggestions.realEstate.map((keyword, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-[#0f1419] rounded-lg text-sm">
                  <span className="text-gray-300">{keyword}</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs rounded-lg">
                    High Volume
                  </Badge>
                </div>
              ))}
            </div>
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
          <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Ads & SEO Management</h1>
          <p className="text-gray-400 text-sm md:text-base">
            {campaigns.length} active campaign{campaigns.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Dialog open={isAddingCampaign} onOpenChange={setIsAddingCampaign}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1f2937] border-[#374151] text-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Campaign</DialogTitle>
              <DialogDescription className="text-gray-400">
                Set up a new advertising campaign for Google Ads, Meta, or LinkedIn.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="clientSelect" className="text-gray-400">Select Client *</Label>
                <select
                  id="clientSelect"
                  value={newCampaign.clientId}
                  onChange={(e) => setNewCampaign({ ...newCampaign, clientId: e.target.value })}
                  className="w-full mt-2 h-10 px-3 bg-[#0f1419] border border-[#374151] rounded-lg text-white"
                >
                  <option value="">Select a client...</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="campaignName" className="text-gray-400">Campaign Name *</Label>
                <Input
                  id="campaignName"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="e.g., Dubai Luxury Real Estate - Search"
                  className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platform" className="text-gray-400">Platform *</Label>
                  <select
                    id="platform"
                    value={newCampaign.platform}
                    onChange={(e) => setNewCampaign({ ...newCampaign, platform: e.target.value as any })}
                    className="w-full mt-2 h-10 px-3 bg-[#0f1419] border border-[#374151] rounded-lg text-white"
                  >
                    <option value="google">Google Ads</option>
                    <option value="meta">Meta (Facebook/Instagram)</option>
                    <option value="linkedin">LinkedIn Ads</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="type" className="text-gray-400">Campaign Type *</Label>
                  <select
                    id="type"
                    value={newCampaign.type}
                    onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value as any })}
                    className="w-full mt-2 h-10 px-3 bg-[#0f1419] border border-[#374151] rounded-lg text-white"
                  >
                    <option value="search">Search</option>
                    <option value="display">Display</option>
                    <option value="social">Social</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="budget" className="text-gray-400">Monthly Budget (USD) *</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                  placeholder="5000"
                  className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="keywords" className="text-gray-400">Target Keywords (comma-separated)</Label>
                <Textarea
                  id="keywords"
                  value={newCampaign.keywords}
                  onChange={(e) => setNewCampaign({ ...newCampaign, keywords: e.target.value })}
                  placeholder="private jet Dubai, luxury aviation, VIP charter"
                  rows={3}
                  className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingCampaign(false)}
                  className="bg-[#0f1419] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCampaign}
                  disabled={!newCampaign.clientId || !newCampaign.name || !newCampaign.budget}
                  className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg"
                >
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-400 text-xs md:text-sm">Total Budget</span>
          </div>
          <div className="text-white text-lg md:text-2xl">${totalBudget.toLocaleString()}</div>
          <div className="text-gray-500 text-xs">across all campaigns</div>
        </div>

        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400 text-xs md:text-sm">Spent</span>
          </div>
          <div className="text-white text-lg md:text-2xl">${totalSpent.toLocaleString()}</div>
          <div className="text-gray-500 text-xs">{totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% of budget</div>
        </div>

        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-gray-400 text-xs md:text-sm">Clicks</span>
          </div>
          <div className="text-white text-lg md:text-2xl">{totalClicks.toLocaleString()}</div>
          <div className="text-gray-500 text-xs">total clicks</div>
        </div>

        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-orange-400" />
            <span className="text-gray-400 text-xs md:text-sm">Conversions</span>
          </div>
          <div className="text-white text-lg md:text-2xl">{totalConversions}</div>
          <div className="text-gray-500 text-xs">{conversionRate.toFixed(1)}% rate</div>
        </div>

        <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-gray-400 text-xs md:text-sm">Avg CPC</span>
          </div>
          <div className="text-white text-lg md:text-2xl">${avgCPC.toFixed(2)}</div>
          <div className="text-gray-500 text-xs">cost per click</div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#374151]">
          <h3 className="text-white">Active Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[768px]">
            <thead>
              <tr className="border-b border-[#374151] bg-[#0f1419]/50">
                <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Campaign</th>
                <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Client</th>
                <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Platform</th>
                <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Budget</th>
                <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Spent</th>
                <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Conversions</th>
                <th className="text-left p-3 md:p-4 text-gray-400 uppercase text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => {
                const client = clients.find(c => c.id === campaign.clientId);
                const platformIcons = {
                  google: Globe,
                  meta: Facebook,
                  linkedin: Linkedin,
                };
                const PlatformIcon = platformIcons[campaign.platform];
                
                return (
                  <tr
                    key={campaign.id}
                    className="border-b border-[#374151] hover:bg-[#374151]/30 transition-colors"
                  >
                    <td className="p-3 md:p-4">
                      <div className="text-white mb-1 text-sm md:text-base">{campaign.name}</div>
                      <div className="text-gray-400 text-xs capitalize">{campaign.type}</div>
                    </td>
                    <td className="p-3 md:p-4 text-gray-300 text-sm">{client?.name || 'Unknown'}</td>
                    <td className="p-3 md:p-4">
                      <div className="flex items-center gap-2">
                        <PlatformIcon className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-300 text-sm capitalize">{campaign.platform}</span>
                      </div>
                    </td>
                    <td className="p-3 md:p-4 text-white text-sm">${campaign.budget.toLocaleString()}</td>
                    <td className="p-3 md:p-4">
                      <div className="text-white text-sm">${campaign.spent.toLocaleString()}</div>
                      <div className="text-gray-400 text-xs">
                        {Math.round((campaign.spent / campaign.budget) * 100)}%
                      </div>
                    </td>
                    <td className="p-3 md:p-4 text-white text-sm">{campaign.conversions}</td>
                    <td className="p-3 md:p-4">
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 rounded-lg text-xs">
                        {campaign.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
