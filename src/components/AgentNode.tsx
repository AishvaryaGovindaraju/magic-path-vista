
import React from 'react';
import { Database, Sparkles, Cog, Brain, MessageSquare, Zap } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  position: { x: number; y: number };
  type: 'primary' | 'orchestrator';
}

interface AgentNodeProps {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
}

export const AgentNode: React.FC<AgentNodeProps> = ({ agent, isSelected, onClick }) => {
  const getIcon = () => {
    switch (agent.id) {
      case 'data-ingestion': return Database;
      case 'data-cleaning': return Sparkles;
      case 'feature-engineering': return Cog;
      case 'model-training': return Brain;
      case 'insight-generation': return Zap;
      case 'communication': return MessageSquare;
      default: return Database;
    }
  };

  const getStatusColor = () => {
    switch (agent.status) {
      case 'completed': return 'from-green-500 to-green-600';
      case 'running': return 'from-[#C3073F] to-[#950740]';
      case 'error': return 'from-red-500 to-red-600';
      default: return 'from-[#4E4E50] to-[#1A1A1D]';
    }
  };

  const getGlowColor = () => {
    switch (agent.status) {
      case 'completed': return 'shadow-green-500/50';
      case 'running': return 'shadow-[#C3073F]/50';
      case 'error': return 'shadow-red-500/50';
      default: return 'shadow-[#4E4E50]/30';
    }
  };

  const Icon = getIcon();

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
        isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
      }`}
      style={{ left: agent.position.x, top: agent.position.y }}
      onClick={onClick}
    >
      {/* Outer Glow Ring */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getStatusColor()} opacity-30 blur-lg ${getGlowColor()} shadow-2xl`} />
      
      {/* Main Node */}
      <div className={`relative w-32 h-20 bg-gradient-to-br ${getStatusColor()} rounded-xl border-2 ${
        isSelected ? 'border-[#C3073F]' : 'border-white/20'
      } backdrop-blur-sm overflow-hidden group`}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id={`pattern-${agent.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#pattern-${agent.id})`} />
          </svg>
        </div>

        {/* Content */}
        <div className="relative p-3 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <Icon className="w-5 h-5 text-white" />
            {agent.status === 'running' && (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-white leading-tight">
              {agent.name}
            </h3>
            {agent.status === 'running' && (
              <div className="mt-1">
                <div className="w-full bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-white h-1 rounded-full transition-all duration-500"
                    style={{ width: `${agent.progress}%` }}
                  />
                </div>
                <span className="text-xs text-white/80">{Math.round(agent.progress)}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute -inset-1 border-2 border-[#C3073F] rounded-xl animate-pulse" />
        )}

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      </div>

      {/* Agent Type Badge */}
      {agent.type === 'orchestrator' && (
        <div className="absolute -top-2 -right-2 bg-[#9F2232] text-white text-xs px-2 py-1 rounded-full border border-white/20">
          Hub
        </div>
      )}
    </div>
  );
};
