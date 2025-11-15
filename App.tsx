import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import AdGeneratorTool from './pages/AdGeneratorTool';
import { SocialPostWriterTool } from './pages/SocialPostWriterTool';
import Dashboard from './pages/Dashboard';
import GbpOptimizerTool from './pages/GbpOptimizerTool';
import ContentCalendarTool from './pages/ContentCalendarTool';
import ClientServicesPage from './pages/ClientServicesPage';
import ThemeToggle from './components/ThemeToggle';
import type { Tool } from './types';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>('dashboard');

  const handleNavClick = useCallback((tool: Tool) => {
    setActiveTool(tool);
  }, []);

  const handleSignInAsGuest = useCallback(() => {
    setIsSignedIn(true);
  }, []);

  const renderTool = () => {
    const backToDashboard = () => handleNavClick('dashboard');

    switch (activeTool) {
      case 'dashboard':
        return <Dashboard onNavClick={handleNavClick} />;
      case 'ad-generator':
        return <AdGeneratorTool onBackToDashboard={backToDashboard} />;
      case 'social-posts':
        return <SocialPostWriterTool onBackToDashboard={backToDashboard} />;
      case 'gbp-optimizer':
        return <GbpOptimizerTool onBackToDashboard={backToDashboard} />;
      case 'content-calendar':
        return <ContentCalendarTool onBackToDashboard={backToDashboard} />;
      case 'client-services':
        return <ClientServicesPage onBackToDashboard={backToDashboard} />;
      default:
        return <Dashboard onNavClick={handleNavClick} />;
    }
  }

  if (!isSignedIn) {
    return <LandingPage onSignInAsGuest={handleSignInAsGuest} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-background">
      <Sidebar activeTool={activeTool} onNavClick={handleNavClick} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 relative">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-20">
            <ThemeToggle />
        </div>
        {renderTool()}
      </main>
    </div>
  );
};

export default App;
