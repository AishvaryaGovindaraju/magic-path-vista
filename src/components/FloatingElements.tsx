
import React from 'react';

export const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#C3073F]/10 to-[#950740]/5 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-br from-[#950740]/10 to-[#C3073F]/5 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-[#9F2232]/15 to-[#C3073F]/10 rotate-45 blur-lg animate-spin" style={{ animationDuration: '20s' }} />
      
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C3073F" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C3073F" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#950740" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#C3073F" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#fadeGradient)" className="animate-pulse" />
      </svg>

      {/* Floating data points */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#C3073F] rounded-full animate-ping"
            style={{
              left: `${Math.cos(i * 45 * Math.PI / 180) * 200}px`,
              top: `${Math.sin(i * 45 * Math.PI / 180) * 200}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Morphing blobs */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-[#C3073F] to-[#950740] rounded-full filter blur-3xl animate-pulse transform rotate-12" />
      </div>
      
      <div className="absolute bottom-1/3 left-1/5 w-40 h-40 opacity-15">
        <div className="w-full h-full bg-gradient-to-br from-[#950740] to-[#9F2232] rounded-full filter blur-2xl animate-bounce transform -rotate-12" style={{ animationDuration: '4s' }} />
      </div>
    </div>
  );
};
