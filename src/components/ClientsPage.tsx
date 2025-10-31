import { Plus, Search, Filter, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ClientsPage() {
  const clients = [
    {
      id: 1,
      name: "Haus and Estates",
      industry: "Real Estate",
      citations: 487,
      status: "active",
      trend: "+23%",
      avatar: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Midas Aviation",
      industry: "Aviation",
      citations: 156,
      status: "active",
      trend: "+15%",
      avatar: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "1FLT Corporation",
      industry: "Technology",
      citations: 234,
      status: "active",
      trend: "+18%",
      avatar: "https://images.unsplash.com/photo-1486406876117-c78f9f9c7806?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "Luxury Living",
      industry: "Real Estate",
      citations: 342,
      status: "active",
      trend: "+31%",
      avatar: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      name: "Tech Innovators",
      industry: "Technology",
      citations: 289,
      status: "pending",
      trend: "+12%",
      avatar: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
    },
    {
      id: 6,
      name: "Global Finance Co",
      industry: "Finance",
      citations: 412,
      status: "active",
      trend: "+27%",
      avatar: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2">Clients</h1>
          <p className="text-gray-400">Manage your client portfolio and track their AI search performance</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/50">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search clients..."
            className="pl-10 bg-[#34495e] border-gray-600 text-white placeholder:text-gray-500"
          />
        </div>
        <Button variant="outline" className="bg-[#34495e] border-gray-600 text-gray-400 hover:bg-[#2c3e50]">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Clients Table */}
      <div className="bg-[#2c3e50]/80 backdrop-blur border border-gray-700/50 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-900/50">
              <th className="text-left p-4 text-gray-400 uppercase text-xs">Client</th>
              <th className="text-left p-4 text-gray-400 uppercase text-xs">Industry</th>
              <th className="text-left p-4 text-gray-400 uppercase text-xs">Citations</th>
              <th className="text-left p-4 text-gray-400 uppercase text-xs">Trend</th>
              <th className="text-left p-4 text-gray-400 uppercase text-xs">Status</th>
              <th className="text-left p-4 text-gray-400 uppercase text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-white">{client.name}</div>
                  </div>
                </td>
                <td className="p-4 text-gray-400">{client.industry}</td>
                <td className="p-4 text-white">{client.citations.toLocaleString()}</td>
                <td className="p-4 text-green-400">{client.trend}</td>
                <td className="p-4">
                  <Badge
                    variant={client.status === "active" ? "default" : "secondary"}
                    className={
                      client.status === "active"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    }
                  >
                    {client.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-gray-400">Showing 1-6 of 23 clients</div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-[#1a1f2e] border-gray-700 text-gray-400">
            Previous
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600">1</Button>
          <Button variant="outline" className="bg-[#1a1f2e] border-gray-700 text-gray-400">
            2
          </Button>
          <Button variant="outline" className="bg-[#1a1f2e] border-gray-700 text-gray-400">
            3
          </Button>
          <Button variant="outline" className="bg-[#1a1f2e] border-gray-700 text-gray-400">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
