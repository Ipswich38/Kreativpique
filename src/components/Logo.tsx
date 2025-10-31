export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Logo icon */}
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 10L8 6L12 10L16 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 14L8 10L12 14L16 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-500/30 blur-md rounded-lg -z-10" />
      </div>
      <div className="flex flex-col">
        <span className="text-white tracking-tight">
          kreativ<span className="text-blue-400">pique</span>
        </span>
        <span className="text-gray-500 text-xs tracking-wider">AI SEARCH PLATFORM</span>
      </div>
    </div>
  );
}
