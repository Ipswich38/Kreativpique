import { Globe, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export default function DarkScrapePage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white mb-1 md:mb-2 text-xl md:text-2xl">Web Scraping</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Automated web scraping to collect data for AI citation optimization
        </p>
      </div>

      {/* Empty State */}
      <div className="bg-[#1f2937] border border-[#374151] rounded-lg p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-white mb-3 text-xl">Web Scraping Coming Soon</h2>
          <p className="text-gray-400 mb-6 text-sm md:text-base">
            This feature is currently in development. You'll soon be able to automatically scrape websites to collect data for optimizing your AI search presence.
          </p>

          <div className="bg-[#0f1419] border border-[#374151] rounded-lg p-6 text-left">
            <h3 className="text-white mb-4">Planned Features:</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                <span>Automated website scraping with customizable schedules</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                <span>Content extraction for AI optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                <span>Competitor analysis and monitoring</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                <span>Data export in multiple formats</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                <span>Real-time scraping status and notifications</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-blue-400 mb-1">Demo Available</div>
                <div className="text-gray-300 text-sm">
                  Visit the <span className="text-emerald-400 font-semibold">Demo</span> tab to see how web scraping features will work with sample data.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
