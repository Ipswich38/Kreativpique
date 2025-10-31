import { useState } from "react";
import { Save, X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [requirements, setRequirements] = useState("");
  const [customFeature, setCustomFeature] = useState("");
  const [saved, setSaved] = useState(false);

  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "scrape",
      name: "Web Scraping",
      description: "Automated data collection from websites for content analysis",
      enabled: false,
    },
    {
      id: "multimail",
      name: "Email Campaigns",
      description: "Send client reports and engagement emails",
      enabled: false,
    },
    {
      id: "content",
      name: "Content Library",
      description: "Manage and optimize content for AI platforms",
      enabled: false,
    },
    {
      id: "api",
      name: "API Access",
      description: "Programmatic access to citation data and analytics",
      enabled: false,
    },
  ]);

  const toggleFeature = (id: string) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, enabled: !f.enabled } : f
    ));
  };

  const addCustomFeature = () => {
    if (customFeature.trim()) {
      setFeatures([
        ...features,
        {
          id: `custom-${Date.now()}`,
          name: customFeature,
          description: "Custom feature request",
          enabled: false,
        },
      ]);
      setCustomFeature("");
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div>
          <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Settings & Configuration</h1>
          <p className="text-gray-400 text-sm md:text-base">Customize your kreativpique experience</p>
        </div>
        {saved && (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 rounded-lg text-xs md:text-sm">
            Settings saved successfully!
          </Badge>
        )}
      </div>

      {/* Company Information */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
        <h3 className="text-white mb-4 text-base md:text-lg">Company Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName" className="text-gray-400 text-sm">Company Name</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg text-sm md:text-base"
            />
          </div>
          <div>
            <Label htmlFor="contactEmail" className="text-gray-400 text-sm">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="your.email@company.com"
              className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg text-sm md:text-base"
            />
          </div>
        </div>
      </div>

      {/* AI Platform Configuration */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
        <h3 className="text-white mb-4 text-base md:text-lg">AI Platform Monitoring</h3>
        <p className="text-gray-400 text-sm mb-6">
          Configure which AI platforms to monitor for client citations.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[#0f1419] border border-[#374151] rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-white text-sm md:text-base">ChatGPT</h4>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 rounded-lg text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-gray-400 text-xs">78% market share - Monitor all ChatGPT models</p>
            </div>
            <Switch
              defaultChecked={true}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0f1419] border border-[#374151] rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-white text-sm md:text-base">Perplexity</h4>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 rounded-lg text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-gray-400 text-xs">15% market share - AI-powered search</p>
            </div>
            <Switch
              defaultChecked={true}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0f1419] border border-[#374151] rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-white text-sm md:text-base">Claude</h4>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 rounded-lg text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-gray-400 text-xs">Anthropic's AI - Growing market share</p>
            </div>
            <Switch
              defaultChecked={true}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0f1419] border border-[#374151] rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-white text-sm md:text-base">Google Gemini</h4>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 rounded-lg text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-gray-400 text-xs">Google's AI assistant</p>
            </div>
            <Switch
              defaultChecked={true}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Monitoring Configuration */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
        <h3 className="text-white mb-4 text-base md:text-lg">Monitoring Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="checkFrequency" className="text-gray-400 text-sm">Check Frequency</Label>
            <select 
              id="checkFrequency"
              className="w-full mt-2 h-10 px-3 bg-[#0f1419] border border-[#374151] rounded-lg text-white text-sm md:text-base"
            >
              <option>Every 24 hours (Recommended)</option>
              <option>Every 12 hours</option>
              <option>Every 6 hours (Premium)</option>
              <option>Real-time monitoring (Enterprise)</option>
            </select>
            <p className="text-gray-500 text-xs mt-1">
              How often to check AI platforms for new citations
            </p>
          </div>

          <div>
            <Label htmlFor="alertEmail" className="text-gray-400 text-sm">Alert Email</Label>
            <Input
              id="alertEmail"
              type="email"
              placeholder="alerts@youragency.com"
              className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg text-sm md:text-base"
            />
            <p className="text-gray-500 text-xs mt-1">
              Receive notifications when new citations are detected
            </p>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
            <div>
              <div className="text-white text-sm">Email Notifications</div>
              <div className="text-gray-400 text-xs">Get daily summary reports</div>
            </div>
            <Switch defaultChecked={true} className="data-[state=checked]:bg-emerald-500" />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg">
            <div>
              <div className="text-white text-sm">Competitor Tracking</div>
              <div className="text-gray-400 text-xs">Monitor competitor mentions</div>
            </div>
            <Switch defaultChecked={false} className="data-[state=checked]:bg-emerald-500" />
          </div>
        </div>
      </div>

      {/* Optional Features */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-4 md:p-6">
        <h3 className="text-white mb-4 text-base md:text-lg">Optional Features</h3>
        <p className="text-gray-400 text-sm mb-6">
          Additional features available for your platform.
        </p>
        
        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center justify-between p-4 bg-[#0f1419] border border-[#374151] rounded-lg hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-white">{feature.name}</h4>
                  {feature.enabled && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 rounded-lg text-xs">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-gray-400 text-xs">{feature.description}</p>
              </div>
              <Switch
                checked={feature.enabled}
                onCheckedChange={() => toggleFeature(feature.id)}
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>
          ))}
        </div>

        {/* Add Custom Feature */}
        <div className="mt-6 flex gap-2">
          <Input
            value={customFeature}
            onChange={(e) => setCustomFeature(e.target.value)}
            placeholder="Request a custom feature..."
            className="bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
            onKeyPress={(e) => e.key === "Enter" && addCustomFeature()}
          />
          <Button
            onClick={addCustomFeature}
            className="bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Detailed Requirements */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
        <h3 className="text-white mb-4">Detailed Requirements</h3>
        <p className="text-gray-400 text-sm mb-4">
          Describe your specific needs, custom workflows, or integration requirements
        </p>
        <Textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Example:
- Need integration with Slack for notifications
- Custom reporting dashboard for executive team
- Automated weekly email reports
- Multi-language support for international clients
- API access for custom integrations"
          rows={10}
          className="bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
        />
        <p className="text-gray-500 text-xs mt-2">
          Our team will review your requirements and reach out within 24-48 hours
        </p>
      </div>

      {/* API Configuration */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-6">
        <h3 className="text-white mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey" className="text-gray-400">API Key</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="apiKey"
                type="password"
                value="••••••••••••••••"
                readOnly
                className="bg-[#0f1419] border-[#374151] text-white rounded-lg"
              />
              <Button variant="outline" className="bg-[#0f1419] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg">
                Generate New
              </Button>
            </div>
          </div>
          <div>
            <Label className="text-gray-400">Webhook URL</Label>
            <Input
              placeholder="https://your-domain.com/webhook"
              className="mt-2 bg-[#0f1419] border-[#374151] text-white placeholder:text-gray-500 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <Button
          variant="outline"
          className="w-full sm:w-auto bg-[#1f2937] border-[#374151] text-gray-400 hover:bg-[#374151] rounded-lg"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-[#0f1419] rounded-lg"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
