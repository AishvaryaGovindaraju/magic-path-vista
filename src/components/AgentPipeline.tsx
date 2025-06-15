
import React, { useState, useEffect } from 'react';
import { AgentNode } from './AgentNode';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  position: { x: number; y: number };
  type: 'primary' | 'orchestrator';
}

interface AgentPipelineProps {
  selectedAgent: string | null;
  onAgentSelect: (agentId: string) => void;
}

export const AgentPipeline: React.FC<AgentPipelineProps> = ({
  selectedAgent,
  onAgentSelect
}) => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'data-ingestion',
      name: 'Data Ingestion',
      status: 'completed',
      progress: 100,
      position: { x: 100, y: 200 },
      type: 'primary'
    },
    {
      id: 'data-cleaning',
      name: 'Data Cleaning',
      status: 'running',
      progress: 65,
      position: { x: 300, y: 200 },
      type: 'primary'
    },
    {
      id: 'feature-engineering',
      name: 'Feature Engineering',
      status: 'idle',
      progress: 0,
      position: { x: 500, y: 200 },
      type: 'primary'
    },
    {
      id: 'model-training',
      name: 'Model Training',
      status: 'idle',
      progress: 0,
      position: { x: 700, y: 200 },
      type: 'primary'
    },
    {
      id: 'insight-generation',
      name: 'Insight Generation',
      status: 'idle',
      progress: 0,
      position: { x: 900, y: 200 },
      type: 'primary'
    },
    {
      id: 'communication',
      name: 'Communication Hub',
      status: 'running',
      progress: 45,
      position: { x: 500, y: 50 },
      type: 'orchestrator'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === 'running' && agent.progress < 100) {
          return { ...agent, progress: Math.min(agent.progress + Math.random() * 5, 100) };
        }
        return agent;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getConnectionPath = (from: Agent, to: Agent) => {
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;
    const midX = from.position.x + dx / 2;
    
    return `M ${from.position.x + 80} ${from.position.y + 40} 
            Q ${midX} ${from.position.y + 40} ${to.position.x} ${to.position.y + 40}`;
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1A1A1D] to-[#4E4E50]/20 rounded-xl border border-[#950740]/20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#950740" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#950740" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#C3073F" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
        
        {/* Primary pipeline connections */}
        {agents.filter(a => a.type === 'primary').slice(0, -1).map((agent, index) => {
          const nextAgent = agents.filter(a => a.type === 'primary')[index + 1];
          if (!nextAgent) return null;
          
          return (
            <path
              key={`${agent.id}-${nextAgent.id}`}
              d={getConnectionPath(agent, nextAgent)}
              stroke="url(#connectionGradient)"
              strokeWidth="3"
              fill="none"
              className="drop-shadow-lg"
            />
          );
        })}
        
        {/* Orchestrator connections */}
        {agents.filter(a => a.type === 'primary').map(agent => {
          const orchestrator = agents.find(a => a.id === 'communication');
          if (!orchestrator) return null;
          
          return (
            <path
              key={`${orchestrator.id}-${agent.id}`}
              d={getConnectionPath(orchestrator, agent)}
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
              opacity="0.6"
            />
          );
        })}
      </svg>

      {/* Agent Nodes */}
      {agents.map(agent => (
        <AgentNode
          key={agent.id}
          agent={agent}
          isSelected={selectedAgent === agent.id}
          onClick={() => onAgentSelect(agent.id)}
        />
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-[#1A1A1D]/80 backdrop-blur-sm rounded-lg p-4 border border-[#950740]/20">
        <h3 className="text-sm font-semibold text-[#C3073F] mb-2">Status Legend</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-[#CCCCCC]">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#C3073F] rounded-full animate-pulse"></div>
            <span className="text-[#CCCCCC]">Running</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#4E4E50] rounded-full"></div>
            <span className="text-[#CCCCCC]">Idle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
