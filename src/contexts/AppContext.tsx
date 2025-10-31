import { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface Client {
  id: string;
  name: string;
  industry: string;
  website: string;
  targetKeywords: string[];
  description?: string;
  citationsThisMonth: number;
  avgPosition: number;
  monitoringSince: string;
}

export interface MonitoringQuery {
  id: string;
  clientId: string;
  query: string;
  platforms: string[];
  frequency: string;
  createdAt: string;
}

export interface Citation {
  id: string;
  queryId: string;
  clientId: string;
  query: string;
  platform: string;
  position: number;
  context: string;
  sentiment: "positive" | "neutral" | "negative";
  detectedAt: string;
  url?: string;
}

interface AppContextType {
  clients: Client[];
  addClient: (client: Omit<Client, "id" | "citationsThisMonth" | "avgPosition" | "monitoringSince">) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  queries: MonitoringQuery[];
  addQuery: (query: Omit<MonitoringQuery, "id" | "createdAt">) => void;
  deleteQuery: (id: string) => void;
  
  citations: Citation[];
  addCitation: (citation: Omit<Citation, "id" | "detectedAt">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [queries, setQueries] = useState<MonitoringQuery[]>([]);
  const [citations, setCitations] = useState<Citation[]>([]);

  const addClient = (clientData: Omit<Client, "id" | "citationsThisMonth" | "avgPosition" | "monitoringSince">) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
      citationsThisMonth: 0,
      avgPosition: 0,
      monitoringSince: new Date().toLocaleDateString(),
    };
    setClients([...clients, newClient]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(clients.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
    // Also delete related queries and citations
    setQueries(queries.filter(q => q.clientId !== id));
    setCitations(citations.filter(c => c.clientId !== id));
  };

  const addQuery = (queryData: Omit<MonitoringQuery, "id" | "createdAt">) => {
    const newQuery: MonitoringQuery = {
      ...queryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setQueries([...queries, newQuery]);
  };

  const deleteQuery = (id: string) => {
    setQueries(queries.filter(q => q.id !== id));
  };

  const addCitation = (citationData: Omit<Citation, "id" | "detectedAt">) => {
    const newCitation: Citation = {
      ...citationData,
      id: Date.now().toString(),
      detectedAt: new Date().toISOString(),
    };
    setCitations([newCitation, ...citations]);

    // Update client stats
    const clientCitations = citations.filter(c => c.clientId === citationData.clientId);
    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);
    
    const citationsThisMonth = clientCitations.filter(
      c => new Date(c.detectedAt) >= thisMonthStart
    ).length + 1;

    const positions = [...clientCitations.map(c => c.position), citationData.position];
    const avgPosition = positions.reduce((a, b) => a + b, 0) / positions.length;

    updateClient(citationData.clientId, {
      citationsThisMonth,
      avgPosition: Math.round(avgPosition * 10) / 10,
    });
  };

  return (
    <AppContext.Provider
      value={{
        clients,
        addClient,
        updateClient,
        deleteClient,
        queries,
        addQuery,
        deleteQuery,
        citations,
        addCitation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
