
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const InteractiveDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            See It In
            <span className="block text-white/40">Action</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
            Watch how our agents collaborate to process data and generate insights in real-time
          </p>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
          {/* Demo Controls */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? 'Pause' : 'Play'} Demo</span>
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Demo Visualization */}
          <div className="h-96 bg-black/20 rounded-2xl border border-white/10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/60">Interactive Demo Visualization</p>
              <p className="text-sm text-white/40 mt-2">Progress: {Math.round(progress)}%</p>
            </div>
          </div>
        </div>

        {/* Demo Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Data Points', value: '2.3M+' },
            { label: 'Processing Speed', value: '0.3ms' },
            { label: 'Accuracy Rate', value: '99.8%' },
            { label: 'Insights Generated', value: '847' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="text-2xl font-light text-white mb-2">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
