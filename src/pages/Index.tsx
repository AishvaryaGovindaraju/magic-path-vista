
import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { AgentPipeline } from '../components/AgentPipeline';
import { MonitoringSidebar } from '../components/MonitoringSidebar';
import { ConfigurationPanel } from '../components/ConfigurationPanel';
import { HybridChat } from '../components/HybridChat';
import { cn } from '../lib/utils';

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A1A1D] text-white overflow-hidden">
      <Navbar />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Monitoring Sidebar */}
        <MonitoringSidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          {/* Pipeline Visualization */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C3073F] to-[#950740] bg-clip-text text-transparent">
                Agent Pipeline Dashboard
              </h1>
              <p className="text-[#CCCCCC] mt-2">Monitor and control your multi-agent data science workflow</p>
            </div>
            
            <AgentPipeline 
              selectedAgent={selectedAgent}
              onAgentSelect={setSelectedAgent}
            />
          </div>
          
          {/* Chat Interface */}
          <HybridChat 
            isOpen={isChatOpen}
            onToggle={() => setIsChatOpen(!isChatOpen)}
          />
        </div>
        
        {/* Configuration Panel */}
        <ConfigurationPanel 
          selectedAgent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      </div>
    </div>
  );
};

export default Index;
