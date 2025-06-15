
import React, { useState } from 'react';
import { Bell, Settings, User, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const [notifications] = useState(3);

  return (
    <nav className="h-16 bg-gradient-to-r from-[#1A1A1D] to-[#4E4E50] border-b border-[#950740]/20 px-6 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C3073F] to-[#950740] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DF</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#C3073F] to-[#950740] bg-clip-text text-transparent">
            DataForge
          </h1>
        </div>
        
        <div className="h-6 w-px bg-[#4E4E50]" />
        
        <div className="flex items-center space-x-2 bg-[#4E4E50]/30 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-[#4E4E50]/50 transition-colors">
          <span className="text-sm text-[#CCCCCC]">Production Pipeline</span>
          <ChevronDown className="w-4 h-4 text-[#CCCCCC]" />
        </div>
      </div>

      {/* Center Section - Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-[#CCCCCC]">
        <span>Dashboard</span>
        <span>/</span>
        <span>Pipeline</span>
        <span>/</span>
        <span className="text-[#C3073F]">Real-time Monitoring</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-[#CCCCCC] hover:text-[#C3073F] transition-colors" />
          {notifications > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C3073F] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{notifications}</span>
            </div>
          )}
        </div>
        
        <Settings className="w-5 h-5 text-[#CCCCCC] hover:text-[#C3073F] transition-colors cursor-pointer" />
        
        <div className="flex items-center space-x-2 bg-[#4E4E50]/30 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-[#4E4E50]/50 transition-colors">
          <User className="w-4 h-4 text-[#CCCCCC]" />
          <span className="text-sm text-[#CCCCCC]">Dr. Sarah Chen</span>
        </div>
      </div>
    </nav>
  );
};
