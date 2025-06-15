
import React, { useState } from 'react';
import { X, Settings, Sliders, ToggleLeft, ToggleRight, Save, RefreshCw } from 'lucide-react';

interface ConfigurationPanelProps {
  selectedAgent: string | null;
  onClose: () => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ selectedAgent, onClose }) => {
  const [isAutomated, setIsAutomated] = useState(true);
  const [threshold, setThreshold] = useState(75);
  const [algorithm, setAlgorithm] = useState('neural-network');
  const [batchSize, setBatchSize] = useState(32);

  if (!selectedAgent) return null;

  const getAgentConfig = () => {
    switch (selectedAgent) {
      case 'data-ingestion':
        return {
          title: 'Data Ingestion Agent',
          description: 'Configure data sources and ingestion parameters',
          settings: [
            { key: 'source-type', label: 'Source Type', type: 'select', options: ['Database', 'API', 'File Upload', 'Stream'] },
            { key: 'batch-size', label: 'Batch Size', type: 'slider', min: 10, max: 1000, value: batchSize },
            { key: 'validation', label: 'Data Validation', type: 'toggle', value: true }
          ]
        };
      case 'data-cleaning':
        return {
          title: 'Data Cleaning Agent',
          description: 'Set data quality and cleaning parameters',
          settings: [
            { key: 'outlier-threshold', label: 'Outlier Threshold', type: 'slider', min: 0, max: 100, value: threshold },
            { key: 'missing-data', label: 'Handle Missing Data', type: 'select', options: ['Drop', 'Interpolate', 'Fill Mean'] },
            { key: 'automated', label: 'Automated Cleaning', type: 'toggle', value: isAutomated }
          ]
        };
      case 'model-training':
        return {
          title: 'Model Training Agent',
          description: 'Configure training algorithms and parameters',
          settings: [
            { key: 'algorithm', label: 'Algorithm', type: 'select', options: ['Neural Network', 'Random Forest', 'SVM', 'XGBoost'] },
            { key: 'epochs', label: 'Training Epochs', type: 'slider', min: 10, max: 500, value: 100 },
            { key: 'learning-rate', label: 'Learning Rate', type: 'slider', min: 0.001, max: 0.1, value: 0.01, step: 0.001 }
          ]
        };
      default:
        return {
          title: 'Agent Configuration',
          description: 'Configure agent parameters',
          settings: []
        };
    }
  };

  const config = getAgentConfig();

  return (
    <div className={`fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-[#1A1A1D]/95 backdrop-blur-xl border-l border-[#950740]/20 transform transition-transform duration-300 ${
      selectedAgent ? 'translate-x-0' : 'translate-x-full'
    } z-30`}>
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1D]/80 to-[#4E4E50]/40 backdrop-blur-xl" />
      
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#950740]/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-[#C3073F]" />
              <h2 className="text-xl font-bold text-white">{config.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#4E4E50]/30 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#CCCCCC]" />
            </button>
          </div>
          <p className="text-[#CCCCCC] text-sm">{config.description}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {config.settings.map((setting, index) => (
              <div key={setting.key} className="space-y-2">
                <label className="text-sm font-medium text-white">{setting.label}</label>
                
                {setting.type === 'select' && (
                  <select className="w-full bg-[#4E4E50]/30 border border-[#950740]/20 rounded-lg px-3 py-2 text-white focus:border-[#C3073F] focus:outline-none">
                    {setting.options?.map(option => (
                      <option key={option} value={option.toLowerCase().replace(' ', '-')}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                
                {setting.type === 'slider' && (
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={setting.min}
                      max={setting.max}
                      step={setting.step || 1}
                      defaultValue={setting.value}
                      className="w-full h-2 bg-[#4E4E50]/30 rounded-lg appearance-none cursor-pointer slider"
                      onChange={(e) => {
                        if (setting.key === 'outlier-threshold') setThreshold(Number(e.target.value));
                        if (setting.key === 'batch-size') setBatchSize(Number(e.target.value));
                      }}
                    />
                    <div className="flex justify-between text-xs text-[#CCCCCC]">
                      <span>{setting.min}</span>
                      <span className="text-[#C3073F] font-medium">
                        {setting.key === 'outlier-threshold' ? threshold : 
                         setting.key === 'batch-size' ? batchSize : setting.value}
                      </span>
                      <span>{setting.max}</span>
                    </div>
                  </div>
                )}
                
                {setting.type === 'toggle' && (
                  <button
                    onClick={() => setIsAutomated(!isAutomated)}
                    className="flex items-center space-x-2 group"
                  >
                    {isAutomated ? (
                      <ToggleRight className="w-8 h-8 text-[#C3073F] group-hover:text-[#9F2232] transition-colors" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-[#4E4E50] group-hover:text-[#CCCCCC] transition-colors" />
                    )}
                    <span className={`text-sm ${isAutomated ? 'text-[#C3073F]' : 'text-[#CCCCCC]'}`}>
                      {isAutomated ? 'Enabled' : 'Disabled'}
                    </span>
                  </button>
                )}
              </div>
            ))}

            {/* Advanced Settings Section */}
            <div className="border-t border-[#950740]/20 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Sliders className="w-5 h-5 mr-2 text-[#C3073F]" />
                Advanced Settings
              </h3>
              
              <div className="bg-[#4E4E50]/20 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#CCCCCC]">Debug Mode</span>
                  <ToggleLeft className="w-6 h-6 text-[#4E4E50]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#CCCCCC]">Verbose Logging</span>
                  <ToggleRight className="w-6 h-6 text-[#C3073F]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#CCCCCC]">Auto-retry on Failure</span>
                  <ToggleRight className="w-6 h-6 text-[#C3073F]" />
                </div>
              </div>
            </div>

            {/* Real-time Preview */}
            <div className="bg-gradient-to-br from-[#950740]/10 to-[#C3073F]/5 rounded-lg p-4 border border-[#950740]/20">
              <h4 className="text-sm font-semibold text-[#C3073F] mb-2">Configuration Preview</h4>
              <div className="text-xs text-[#CCCCCC] space-y-1">
                <div>• Threshold: {threshold}%</div>
                <div>• Mode: {isAutomated ? 'Automated' : 'Manual'}</div>
                <div>• Batch Size: {batchSize}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#950740]/20">
          <div className="flex space-x-3">
            <button className="flex-1 bg-gradient-to-r from-[#C3073F] to-[#950740] hover:from-[#9F2232] hover:to-[#C3073F] text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Apply Changes</span>
            </button>
            <button className="px-4 py-2 bg-[#4E4E50]/30 hover:bg-[#4E4E50]/50 text-[#CCCCCC] rounded-lg transition-colors flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
