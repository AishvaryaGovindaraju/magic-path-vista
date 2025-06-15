
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Activity, Clock, AlertTriangle, Server, TrendingUp } from 'lucide-react';

interface MonitoringSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const MonitoringSidebar: React.FC<MonitoringSidebarProps> = ({ isCollapsed, onToggle }) => {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 67,
    memory: 54,
    disk: 32,
    network: 89
  });

  const [activeProjects] = useState([
    { id: 1, name: 'Customer Segmentation', status: 'running', progress: 78 },
    { id: 2, name: 'Fraud Detection', status: 'completed', progress: 100 },
    { id: 3, name: 'Predictive Maintenance', status: 'error', progress: 45 },
    { id: 4, name: 'Market Analysis', status: 'idle', progress: 0 }
  ]);

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'High memory usage detected', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Model training completed', time: '5 min ago' },
    { id: 3, type: 'error', message: 'Data ingestion failed', time: '8 min ago' }
  ]);

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        cpu: Math.max(30, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(85, prev.memory + (Math.random() - 0.5) * 8)),
        disk: Math.max(20, Math.min(70, prev.disk + (Math.random() - 0.5) * 5)),
        network: Math.max(50, Math.min(100, prev.network + (Math.random() - 0.5) * 15))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-[#C3073F]';
      case 'completed': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-[#4E4E50]';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'error': return '🔴';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`bg-[#1A1A1D] border-r border-[#950740]/20 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    } flex flex-col`}>
      
      {/* Header */}
      <div className="p-4 border-b border-[#950740]/20 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-[#C3073F]">System Monitor</h2>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-[#4E4E50]/30 rounded-lg transition-colors"
        >
          <ChevronLeft className={`w-5 h-5 text-[#CCCCCC] transition-transform ${
            isCollapsed ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* System Health */}
        <div className="p-4 border-b border-[#950740]/20">
          <div className="flex items-center space-x-2 mb-3">
            <Activity className="w-5 h-5 text-[#C3073F]" />
            {!isCollapsed && <h3 className="font-medium text-white">System Health</h3>}
          </div>
          
          {!isCollapsed ? (
            <div className="space-y-3">
              {Object.entries(systemMetrics).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#CCCCCC] capitalize">{key}</span>
                    <span className="text-white">{Math.round(value)}%</span>
                  </div>
                  <div className="w-full bg-[#4E4E50]/30 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        value > 80 ? 'bg-red-500' : value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              {Object.entries(systemMetrics).map(([key, value]) => (
                <div key={key} className="w-8 h-8 rounded-full border-2 border-[#4E4E50] relative">
                  <div 
                    className={`absolute inset-0 rounded-full ${
                      value > 80 ? 'bg-red-500/20' : value > 60 ? 'bg-yellow-500/20' : 'bg-green-500/20'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Projects */}
        <div className="p-4 border-b border-[#950740]/20">
          <div className="flex items-center space-x-2 mb-3">
            <Server className="w-5 h-5 text-[#C3073F]" />
            {!isCollapsed && <h3 className="font-medium text-white">Active Projects</h3>}
          </div>
          
          {!isCollapsed ? (
            <div className="space-y-2">
              {activeProjects.map(project => (
                <div key={project.id} className="bg-[#4E4E50]/20 rounded-lg p-3 hover:bg-[#4E4E50]/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white font-medium">{project.name}</span>
                    <span className={`text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  {project.status === 'running' && (
                    <div className="w-full bg-[#1A1A1D] rounded-full h-1">
                      <div 
                        className="bg-[#C3073F] h-1 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              {activeProjects.slice(0, 4).map(project => (
                <div key={project.id} className={`w-8 h-2 rounded-full ${
                  project.status === 'running' ? 'bg-[#C3073F]' :
                  project.status === 'completed' ? 'bg-green-500' :
                  project.status === 'error' ? 'bg-red-500' : 'bg-[#4E4E50]'
                }`} />
              ))}
            </div>
          )}
        </div>

        {/* Recent Alerts */}
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-[#C3073F]" />
            {!isCollapsed && <h3 className="font-medium text-white">Recent Alerts</h3>}
          </div>
          
          {!isCollapsed ? (
            <div className="space-y-2">
              {alerts.map(alert => (
                <div key={alert.id} className="bg-[#4E4E50]/20 rounded-lg p-3 hover:bg-[#4E4E50]/30 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-2">
                    <span className="text-sm">{getAlertIcon(alert.type)}</span>
                    <div className="flex-1">
                      <p className="text-sm text-white">{alert.message}</p>
                      <p className="text-xs text-[#CCCCCC] mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              {alerts.slice(0, 3).map(alert => (
                <div key={alert.id} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  alert.type === 'error' ? 'bg-red-500/20 text-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-blue-500/20 text-blue-500'
                }`}>
                  {alert.type === 'error' ? '!' : alert.type === 'warning' ? '⚠' : 'i'}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
