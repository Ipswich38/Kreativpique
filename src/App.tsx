import { useState } from "react";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
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
import ROITrackerPage from "./components/ROITrackerPage";
import ContentLabPage from "./components/ContentLabPage";
import CompetitorsPage from "./components/CompetitorsPage";
import RecommendationsPage from "./components/RecommendationsPage";
import ReportsPage from "./components/ReportsPage";

function AppContent() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, loading, initialized, signOut } = useAuthContext();

  const handleLogout = async () => {
    await signOut();
    setActiveTab("dashboard");
  };

  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f1419]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
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
      case "roi-tracker":
        return <ROITrackerPage />;
      case "content-lab":
        return <ContentLabPage />;
      case "competitors":
        return <CompetitorsPage />;
      case "recommendations":
        return <RecommendationsPage />;
      case "reports":
        return <ReportsPage />;
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
            <TopBar userEmail={user.email || ''} onLogout={handleLogout} />
          </div>

          {/* Mobile Header */}
          <div className="md:hidden">
            <MobileHeader
              userEmail={user.email || ''}
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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
