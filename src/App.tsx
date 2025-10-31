import { useState } from "react";
import { AppProvider } from "./contexts/AppContext";
import ModernSidebar from "./components/ModernSidebar";
import TopBar from "./components/TopBar";
import MobileHeader from "./components/MobileHeader";
import MobileNav from "./components/MobileNav";
import ProductionOverview from "./components/ProductionOverview";
import ProductionClientsPage from "./components/ProductionClientsPage";
import ProductionCitationsPage from "./components/ProductionCitationsPage";
import AnalyticsPage from "./components/AnalyticsPage";
import AdsAndSeoPage from "./components/AdsAndSeoPage";
import DarkScrapePage from "./components/DarkScrapePage";
import DarkMultimailPage from "./components/DarkMultimailPage";
import DemoPage from "./components/DemoPage";
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email: string, password: string) => {
    // In production, this would validate against your backend
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setActiveTab("dashboard");
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ProductionOverview />;
      case "clients":
        return <ProductionClientsPage />;
      case "citations":
        return <ProductionCitationsPage />;
      case "ads":
        return <AdsAndSeoPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "scrape":
        return <DarkScrapePage />;
      case "multimail":
        return <DarkMultimailPage />;
      case "demo":
        return <DemoPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <ProductionOverview />;
    }
  };

  return (
    <AppProvider>
      <div className="flex h-screen bg-[#0f1419] overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <ModernSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop TopBar */}
          <div className="hidden md:block">
            <TopBar userEmail={userEmail} onLogout={handleLogout} />
          </div>

          {/* Mobile Header */}
          <div className="md:hidden">
            <MobileHeader 
              userEmail={userEmail} 
              onLogout={handleLogout}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
            <div className="p-4 md:p-6">{renderContent()}</div>
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
      </div>
    </AppProvider>
  );
}
