
import React, { useState } from 'react';
import { Bell, Settings, User, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const [notifications] = useState(3);

  return (
    <nav className="h-16 bg-gradient-to-r from-[#1A1A1D] via-[#1A1A1D]/95 to-[#4E4E50]/50 backdrop-blur-xl border-b border-[#950740]/30 px-6 flex items-center justify-between relative z-20">
      {/* Animated underline */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#C3073F] to-transparent animate-pulse" />
      
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          {/* Enhanced DataDone Logo */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C3073F] via-[#950740] to-[#9F2232] rounded-xl flex items-center justify-center shadow-lg shadow-[#C3073F]/30 animate-pulse">
              <div className="text-white font-black text-lg tracking-tight">DD</div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-[#C3073F] to-[#950740] rounded-xl blur-md opacity-50 animate-pulse" />
          </div>
          
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-[#C3073F] via-[#950740] to-[#C3073F] bg-clip-text text-transparent tracking-tight">
              DataDone
            </h1>
            <div className="text-xs text-[#CCCCCC]/70 -mt-1">Multi-Agent Platform</div>
          </div>
        </div>
        
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#950740] to-transparent opacity-50" />
        
        <div className="flex items-center space-x-2 bg-[#4E4E50]/20 backdrop-blur-sm rounded-xl px-4 py-2 cursor-pointer hover:bg-[#4E4E50]/40 transition-all duration-300 border border-[#950740]/20">
          <div className="w-2 h-2 bg-[#C3073F] rounded-full animate-pulse" />
          <span className="text-sm text-[#CCCCCC]">Production Pipeline</span>
          <ChevronDown className="w-4 h-4 text-[#CCCCCC]" />
        </div>
      </div>

      {/* Center Section - Enhanced Breadcrumb */}
      <div className="flex items-center space-x-3 text-sm">
        <div className="flex items-center space-x-2 bg-[#1A1A1D]/60 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-[#950740]/20">
          <span className="text-[#CCCCCC]">Dashboard</span>
          <div className="w-1 h-1 bg-[#C3073F] rounded-full" />
          <span className="text-[#CCCCCC]">Pipeline</span>
          <div className="w-1 h-1 bg-[#C3073F] rounded-full" />
          <span className="text-[#C3073F] font-medium">Real-time Monitoring</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="relative cursor-pointer group">
          <div className="p-2 hover:bg-[#4E4E50]/30 rounded-lg transition-all duration-200">
            <Bell className="w-5 h-5 text-[#CCCCCC] group-hover:text-[#C3073F] transition-colors" />
            {notifications > 0 && (
              <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br from-[#C3073F] to-[#950740] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xs font-bold text-white">{notifications}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-2 hover:bg-[#4E4E50]/30 rounded-lg transition-all duration-200 cursor-pointer group">
          <Settings className="w-5 h-5 text-[#CCCCCC] group-hover:text-[#C3073F] transition-colors" />
        </div>
        
        <div className="flex items-center space-x-3 bg-[#4E4E50]/20 backdrop-blur-sm rounded-xl px-4 py-2 cursor-pointer hover:bg-[#4E4E50]/40 transition-all duration-300 border border-[#950740]/20">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C3073F] to-[#950740] rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">Dr. Sarah Chen</div>
            <div className="text-xs text-[#CCCCCC]/70">Data Scientist</div>
          </div>
        </div>
      </div>
    </nav>
  );
};
