import { ImageWithFallback } from "./figma/ImageWithFallback";
import exampleImage from "figma:asset/413f4bf5768f373d2e4d385e8e03eab39bf64843.png";

export default function MapVisualization() {
  // Mock data points for the map
  const dataPoints = [
    { id: 1, x: 15, y: 35, value: 83, label: "San Francisco" },
    { id: 2, x: 45, y: 25, value: 142, label: "New York" },
    { id: 3, x: 75, y: 45, value: 56, label: "Miami" },
    { id: 4, x: 35, y: 55, value: 28, label: "Austin" },
    { id: 5, x: 65, y: 30, value: 91, label: "Boston" },
  ];

  return (
    <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white">Location Overview</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded text-xs hover:bg-gray-700">
            LIVE DATA
          </button>
          <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded text-xs hover:bg-gray-700">
            30D VIEW
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-80 bg-[#0f1419] rounded-lg overflow-hidden">
        {/* Background map pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          {dataPoints.map((point, index) => {
            const nextPoint = dataPoints[(index + 1) % dataPoints.length];
            return (
              <line
                key={`line-${point.id}`}
                x1={`${point.x}%`}
                y1={`${point.y}%`}
                x2={`${nextPoint.x}%`}
                y2={`${nextPoint.y}%`}
                stroke="#3b82f6"
                strokeWidth="1"
                opacity="0.2"
              />
            );
          })}
        </svg>

        {/* Data points */}
        {dataPoints.map((point) => (
          <div
            key={point.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            {/* Pulse animation */}
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
            
            {/* Main point */}
            <div className="relative bg-blue-500 rounded-full w-3 h-3 border-2 border-[#1a1f2e]" />
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900 border border-gray-700 rounded px-3 py-2 whitespace-nowrap">
                <div className="text-white">{point.label}</div>
                <div className="text-blue-400">{point.value} citations</div>
              </div>
            </div>
          </div>
        ))}

        {/* Stats overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-4">
          <div className="flex-1 bg-gray-900/80 backdrop-blur border border-gray-700 rounded p-3">
            <div className="text-gray-400 text-xs">Total Citations</div>
            <div className="text-white">10,242</div>
          </div>
          <div className="flex-1 bg-gray-900/80 backdrop-blur border border-gray-700 rounded p-3">
            <div className="text-gray-400 text-xs">Active Locations</div>
            <div className="text-white">142</div>
          </div>
          <div className="flex-1 bg-gray-900/80 backdrop-blur border border-gray-700 rounded p-3">
            <div className="text-gray-400 text-xs">AI Platforms</div>
            <div className="text-white">4</div>
          </div>
        </div>
      </div>
    </div>
  );
}
