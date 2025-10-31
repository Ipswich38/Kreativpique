import { Mail, Send, Users, Eye, Clock, Plus, Edit, Trash2, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import VintageMetricCard from "./VintageMetricCard";

export default function MultimailPage() {
  const campaigns = [
    {
      id: 1,
      name: "Q3 Citation Report",
      subject: "Your AI Search Performance Summary",
      recipients: 142,
      sent: 142,
      opened: 98,
      clicked: 45,
      status: "sent",
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "New Feature Announcement",
      subject: "Introducing Web Scraping for kreativpique",
      recipients: 142,
      sent: 89,
      opened: 0,
      clicked: 0,
      status: "sending",
      date: "Sending now",
    },
    {
      id: 3,
      name: "Monthly Newsletter",
      subject: "AI Search Trends - October 2025",
      recipients: 156,
      sent: 156,
      opened: 134,
      clicked: 67,
      status: "sent",
      date: "3 days ago",
    },
    {
      id: 4,
      name: "Onboarding Series - Day 1",
      subject: "Welcome to kreativpique!",
      recipients: 23,
      sent: 0,
      opened: 0,
      clicked: 0,
      status: "draft",
      date: "Last edited 1 hour ago",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      sent: "bg-[#52796f]/20 text-[#52796f] border-[#52796f]/50",
      sending: "bg-[#f4a261]/20 text-[#f4a261] border-[#f4a261]/50",
      draft: "bg-[#84a59d]/20 text-[#84a59d] border-[#84a59d]/50",
      failed: "bg-[#e76f51]/20 text-[#e76f51] border-[#e76f51]/50",
    };
    return colors[status] || colors.draft;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#3d3d3d] mb-2">Multimail</h1>
        <p className="text-[#6d6d6d]">
          Create and send email campaigns to your clients
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <VintageMetricCard
          title="Emails Sent This Month"
          value="4,567"
          change={32}
          subtitle="vs last month"
          icon={Send}
          trend="up"
          color="teal"
        />
        <VintageMetricCard
          title="Open Rate"
          value="68.5%"
          change={5}
          subtitle="vs last month"
          icon={Eye}
          trend="up"
          color="coral"
        />
        <VintageMetricCard
          title="Total Recipients"
          value="142"
          subtitle="active clients"
          icon={Users}
          color="sage"
        />
        <VintageMetricCard
          title="Click Rate"
          value="34.2%"
          change={8}
          subtitle="vs last month"
          icon={Mail}
          trend="up"
          color="ochre"
        />
      </div>

      {/* Create New Campaign */}
      <div className="bg-white border border-[#d4c5b9] rounded-md p-6">
        <h3 className="text-[#3d3d3d] mb-4">Create New Campaign</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#6d6d6d] text-xs mb-2 block">Campaign Name</label>
              <Input
                placeholder="e.g., Monthly Newsletter"
                className="bg-[#faf8f3] border-[#d4c5b9] text-[#3d3d3d] placeholder:text-[#a8a8a8] rounded-md"
              />
            </div>
            <div>
              <label className="text-[#6d6d6d] text-xs mb-2 block">Subject Line</label>
              <Input
                placeholder="Enter email subject"
                className="bg-[#faf8f3] border-[#d4c5b9] text-[#3d3d3d] placeholder:text-[#a8a8a8] rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="text-[#6d6d6d] text-xs mb-2 block">Email Content</label>
            <Textarea
              placeholder="Write your email message here..."
              rows={6}
              className="bg-[#faf8f3] border-[#d4c5b9] text-[#3d3d3d] placeholder:text-[#a8a8a8] rounded-md"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[#6d6d6d] text-xs mb-2 block">Recipients</label>
              <select className="w-full h-10 px-3 bg-[#faf8f3] border border-[#d4c5b9] rounded-md text-[#3d3d3d]">
                <option>All Clients (142)</option>
                <option>Active Clients Only (128)</option>
                <option>New Clients (23)</option>
                <option>Custom List...</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-[#6d6d6d] text-xs mb-2 block">Schedule</label>
              <select className="w-full h-10 px-3 bg-[#faf8f3] border border-[#d4c5b9] rounded-md text-[#3d3d3d]">
                <option>Send Now</option>
                <option>Schedule for Later</option>
                <option>Save as Draft</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-[#52796f] hover:bg-[#3d5a51] text-white rounded-md">
              <Send className="w-4 h-4 mr-2" />
              Send Campaign
            </Button>
            <Button variant="outline" className="bg-[#faf8f3] border-[#d4c5b9] text-[#6d6d6d] hover:bg-[#ede8e1] rounded-md">
              Save as Draft
            </Button>
            <Button variant="outline" className="bg-[#faf8f3] border-[#d4c5b9] text-[#6d6d6d] hover:bg-[#ede8e1] rounded-md">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Campaign List */}
      <div className="bg-white border border-[#d4c5b9] rounded-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#3d3d3d]">Recent Campaigns</h3>
        </div>

        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="p-4 bg-[#faf8f3] border border-[#d4c5b9] rounded-md hover:border-[#52796f] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-[#3d3d3d]">{campaign.name}</h4>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="text-[#6d6d6d] text-xs mb-2">{campaign.subject}</div>
                  <div className="text-[#84a59d] text-xs">{campaign.date}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 bg-white border border-[#d4c5b9] rounded-md text-[#6d6d6d] hover:text-[#3d3d3d] hover:bg-[#ede8e1] flex items-center justify-center">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-white border border-[#d4c5b9] rounded-md text-[#6d6d6d] hover:text-[#3d3d3d] hover:bg-[#ede8e1] flex items-center justify-center">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-white border border-[#d4c5b9] rounded-md text-[#e76f51] hover:bg-[#fef5f3] flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {campaign.status === "sent" && (
                <div className="grid grid-cols-4 gap-4 pt-3 border-t border-[#d4c5b9]">
                  <div>
                    <div className="text-[#84a59d] text-xs mb-1">Recipients</div>
                    <div className="text-[#3d3d3d]">{campaign.recipients}</div>
                  </div>
                  <div>
                    <div className="text-[#84a59d] text-xs mb-1">Sent</div>
                    <div className="text-[#3d3d3d]">{campaign.sent}</div>
                  </div>
                  <div>
                    <div className="text-[#84a59d] text-xs mb-1">Opened</div>
                    <div className="text-[#52796f]">
                      {campaign.opened} ({Math.round((campaign.opened / campaign.sent) * 100)}%)
                    </div>
                  </div>
                  <div>
                    <div className="text-[#84a59d] text-xs mb-1">Clicked</div>
                    <div className="text-[#52796f]">
                      {campaign.clicked} ({Math.round((campaign.clicked / campaign.sent) * 100)}%)
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
