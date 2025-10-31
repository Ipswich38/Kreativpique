import { Globe, Play, Pause, Download, Plus, Trash2, ExternalLink, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import VintageMetricCard from "./VintageMetricCard";

export default function ScrapePage() {
  const scrapeJobs = [
    {
      id: 1,
      url: "https://www.luxury-dubai-properties.com",
      status: "completed",
      pages: 342,
      updated: "2 hours ago",
      duration: "45 min",
    },
    {
      id: 2,
      url: "https://www.aviation-news-today.com",
      status: "running",
      pages: 156,
      updated: "Running now",
      duration: "12 min",
    },
    {
      id: 3,
      url: "https://www.tech-innovations-blog.com",
      status: "completed",
      pages: 289,
      updated: "5 hours ago",
      duration: "38 min",
    },
    {
      id: 4,
      url: "https://www.finance-market-insights.com",
      status: "scheduled",
      pages: 0,
      updated: "Starts in 2 hours",
      duration: "-",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-[#52796f]/20 text-[#52796f] border-[#52796f]/50",
      running: "bg-[#f4a261]/20 text-[#f4a261] border-[#f4a261]/50",
      scheduled: "bg-[#84a59d]/20 text-[#84a59d] border-[#84a59d]/50",
      failed: "bg-[#e76f51]/20 text-[#e76f51] border-[#e76f51]/50",
    };
    return colors[status] || colors.completed;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#3d3d3d] mb-2">Web Scraping</h1>
        <p className="text-[#6d6d6d]">
          Automated web scraping to collect data for AI citation optimization
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <VintageMetricCard
          title="Total Pages Scraped"
          value="24,567"
          change={18}
          subtitle="this month"
          icon={Globe}
          trend="up"
          color="teal"
        />
        <VintageMetricCard
          title="Active Jobs"
          value="12"
          subtitle="running now"
          icon={Play}
          color="coral"
        />
        <VintageMetricCard
          title="Completed Jobs"
          value="342"
          change={25}
          subtitle="this month"
          icon={Download}
          trend="up"
          color="sage"
        />
        <VintageMetricCard
          title="Success Rate"
          value="98.5%"
          change={2}
          subtitle="vs last month"
          icon={Activity}
          trend="up"
          color="ochre"
        />
      </div>

      {/* New Scrape Job */}
      <div className="bg-white border border-[#d4c5b9] rounded-md p-6">
        <h3 className="text-[#3d3d3d] mb-4">Create New Scrape Job</h3>
        <div className="flex gap-4">
          <Input
            placeholder="Enter URL to scrape (e.g., https://example.com)"
            className="flex-1 bg-[#faf8f3] border-[#d4c5b9] text-[#3d3d3d] placeholder:text-[#a8a8a8] rounded-md"
          />
          <Button className="bg-[#52796f] hover:bg-[#3d5a51] text-white rounded-md">
            <Plus className="w-4 h-4 mr-2" />
            Start Scraping
          </Button>
        </div>
        <div className="mt-4 flex gap-4">
          <label className="flex items-center gap-2 text-[#6d6d6d]">
            <input type="checkbox" className="rounded border-[#d4c5b9]" />
            <span className="text-xs">Include subpages</span>
          </label>
          <label className="flex items-center gap-2 text-[#6d6d6d]">
            <input type="checkbox" className="rounded border-[#d4c5b9]" />
            <span className="text-xs">Extract metadata</span>
          </label>
          <label className="flex items-center gap-2 text-[#6d6d6d]">
            <input type="checkbox" className="rounded border-[#d4c5b9]" />
            <span className="text-xs">Follow external links</span>
          </label>
        </div>
      </div>

      {/* Scrape Jobs List */}
      <div className="bg-white border border-[#d4c5b9] rounded-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#3d3d3d]">Recent Scrape Jobs</h3>
          <Button variant="outline" className="bg-[#faf8f3] border-[#d4c5b9] text-[#6d6d6d] hover:bg-[#ede8e1] rounded-md">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>

        <div className="space-y-3">
          {scrapeJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-4 bg-[#faf8f3] border border-[#d4c5b9] rounded-md hover:border-[#52796f] transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-5 h-5 text-[#52796f]" />
                  <div className="text-[#3d3d3d] flex items-center gap-2">
                    {job.url}
                    <ExternalLink className="w-3 h-3 text-[#84a59d]" />
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#6d6d6d]">
                  <span>{job.pages} pages</span>
                  <span>•</span>
                  <span>{job.duration}</span>
                  <span>•</span>
                  <span>{job.updated}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(job.status)}>
                  {job.status}
                </Badge>
                {job.status === "running" && (
                  <button className="w-8 h-8 bg-[#e76f51] rounded-md text-white hover:bg-[#d15a3a] flex items-center justify-center">
                    <Pause className="w-4 h-4" />
                  </button>
                )}
                {job.status === "completed" && (
                  <button className="w-8 h-8 bg-[#52796f] rounded-md text-white hover:bg-[#3d5a51] flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </button>
                )}
                <button className="w-8 h-8 bg-white border border-[#d4c5b9] rounded-md text-[#e76f51] hover:bg-[#fef5f3] flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
