
import React, { useState } from 'react';
import { Database, Brain, Zap, Target, MessageSquare, BarChart3 } from 'lucide-react';

const agents = [
  {
    id: 'ingestion',
    name: 'Data Ingestion',
    description: 'Seamlessly collect and normalize data from multiple sources',
    icon: Database,
    color: 'from-blue-400 to-blue-600',
    stats: { processed: '2.3M', accuracy: '99.8%' }
  },
  {
    id: 'analysis',
    name: 'Analysis Engine',
    description: 'Advanced pattern recognition and statistical analysis',
    icon: Brain,
    color: 'from-purple-400 to-purple-600',
    stats: { insights: '847', models: '23' }
  },
  {
    id: 'processing',
    name: 'Real-time Processing',
    description: 'Lightning-fast data transformation and enrichment',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    stats: { speed: '0.3ms', throughput: '10K/s' }
  },
  {
    id: 'optimization',
    name: 'Model Optimization',
    description: 'Continuous learning and performance enhancement',
    icon: Target,
    color: 'from-green-400 to-green-600',
    stats: { improvement: '+34%', accuracy: '97.2%' }
  },
  {
    id: 'communication',
    name: 'Agent Communication',
    description: 'Intelligent coordination between all system agents',
    icon: MessageSquare,
    color: 'from-pink-400 to-red-500',
    stats: { messages: '1.2K', latency: '12ms' }
  },
  {
    id: 'insights',
    name: 'Insight Generation',
    description: 'Transform data into actionable business intelligence',
    icon: BarChart3,
    color: 'from-indigo-400 to-blue-500',
    stats: { reports: '156', value: '$2.3M' }
  }
];

export const AgentShowcase = () => {
  const [activeAgent, setActiveAgent] = useState(agents[0]);

  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Intelligent
            <span className="block text-white/40">Agents</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Each agent is designed to excel at specific tasks while seamlessly collaborating with others
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Agent List */}
          <div className="space-y-4">
            {agents.map((agent) => {
              const Icon = agent.icon;
              const isActive = activeAgent.id === agent.id;

              return (
                <div
                  key={agent.id}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-500 ${
                    isActive
                      ? 'bg-white/5 border-white/20 scale-105'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.03] hover:border-white/10'
                  }`}
                  onClick={() => setActiveAgent(agent)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${agent.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-white mb-1">{agent.name}</h3>
                      <p className="text-base text-white/80">{agent.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Agent Details */}
          <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${activeAgent.color} mb-6 flex items-center justify-center`}>
              <activeAgent.icon className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-3xl font-light text-white mb-4">{activeAgent.name}</h3>
            <p className="text-lg text-white/80 mb-8">{activeAgent.description}</p>

            <div className="grid grid-cols-2 gap-6">
              {Object.entries(activeAgent.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-light text-white mb-1">{value}</div>
                  <div className="text-sm text-white/50 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
