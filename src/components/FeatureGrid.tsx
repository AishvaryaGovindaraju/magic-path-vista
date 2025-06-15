
import React from 'react';
import { Shield, Zap, Globe, Users, Cpu, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and compliance with industry standards'
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Lightning-fast data processing with sub-millisecond latency'
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Deploy anywhere with our distributed architecture'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Built for teams with advanced sharing and permission controls'
  },
  {
    icon: Cpu,
    title: 'AI-Powered',
    description: 'Machine learning algorithms that improve over time'
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'Forecast trends and make data-driven decisions'
  }
];

export const FeatureGrid = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Built For
            <span className="block text-white/40">Performance</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Every feature is designed to maximize efficiency and deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={index}
                className="group p-8 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 hover:scale-105"
              >
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-medium text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
