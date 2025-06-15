
import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { AgentPipeline } from '../components/AgentPipeline';
import { MonitoringSidebar } from '../components/MonitoringSidebar';
import { ConfigurationPanel } from '../components/ConfigurationPanel';
import { HybridChat } from '../components/HybridChat';
import { ParticleBackground } from '../components/ParticleBackground';
import { FloatingElements } from '../components/FloatingElements';
import { cn } from '../lib/utils';

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A1A1D] text-white overflow-hidden relative">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#950740]/5 via-transparent to-[#C3073F]/3 pointer-events-none" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(195, 7, 63, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(195, 7, 63, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      <Navbar />
      
      <div className="flex h-[calc(100vh-4rem)] relative z-10">
        {/* Monitoring Sidebar */}
        <MonitoringSidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col relative bg-[#1A1A1D]/80 backdrop-blur-sm">
          {/* Header Section */}
          <div className="border-b border-[#4E4E50]/20 bg-[#1A1A1D]/90 backdrop-blur-md">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Pipeline Dashboard
                  </h1>
                  <p className="text-[#CCCCCC]/80 text-sm">
                    Monitor and control your multi-agent data science workflow
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="px-4 py-2 bg-[#950740]/20 border border-[#950740]/30 rounded-lg text-sm font-medium text-[#C3073F]">
                    Production
                  </div>
                  <div className="px-4 py-2 bg-[#4E4E50]/20 border border-[#4E4E50]/30 rounded-lg text-sm text-[#CCCCCC] hover:bg-[#4E4E50]/30 transition-colors cursor-pointer">
                    Settings
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pipeline Visualization */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-[#1A1A1D]/40 border border-[#4E4E50]/20 rounded-xl p-6 h-full backdrop-blur-sm">
              <AgentPipeline 
                selectedAgent={selectedAgent}
                onAgentSelect={setSelectedAgent}
              />
            </div>
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
