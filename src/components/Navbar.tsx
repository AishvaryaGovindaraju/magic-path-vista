
import React, { useState } from 'react';
import { Bell, Settings, User, ChevronDown, Code, Play, Square } from 'lucide-react';

export const Navbar = () => {
  const [notifications] = useState(3);

  return (
    <nav className="h-16 bg-[#1A1A1D] border-b border-[#4E4E50]/20 px-6 flex items-center justify-between relative z-20">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          {/* DataDone Logo */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C3073F] to-[#950740] rounded-lg flex items-center justify-center">
              <div className="text-white font-black text-lg">DD</div>
            </div>
          </div>
          
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              DataDone
            </h1>
            <div className="text-xs text-[#CCCCCC]/60 -mt-1">Multi-Agent Platform</div>
          </div>
        </div>
        
        <div className="h-6 w-px bg-[#4E4E50]/30" />
        
        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          <div className="px-3 py-1.5 text-sm text-white bg-[#950740]/20 border border-[#950740]/30 rounded-md font-medium">
            Dashboard
          </div>
          <div className="px-3 py-1.5 text-sm text-[#CCCCCC]/70 hover:text-white hover:bg-[#4E4E50]/20 rounded-md transition-colors cursor-pointer">
            Projects
          </div>
          <div className="px-3 py-1.5 text-sm text-[#CCCCCC]/70 hover:text-white hover:bg-[#4E4E50]/20 rounded-md transition-colors cursor-pointer">
            Agents
          </div>
          <div className="px-3 py-1.5 text-sm text-[#CCCCCC]/70 hover:text-white hover:bg-[#4E4E50]/20 rounded-md transition-colors cursor-pointer">
            Analytics
          </div>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-[#1A1A1D] border border-[#4E4E50]/20 rounded-lg px-3 py-1.5">
          <Play className="w-4 h-4 text-[#C3073F]" />
          <span className="text-sm text-[#CCCCCC]">Running Pipeline</span>
          <div className="w-2 h-2 bg-[#C3073F] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="relative cursor-pointer group">
          <div className="p-2 hover:bg-[#4E4E50]/20 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-[#CCCCCC] group-hover:text-white" />
            {notifications > 0 && (
              <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C3073F] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{notifications}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-2 hover:bg-[#4E4E50]/20 rounded-lg transition-colors cursor-pointer group">
          <Settings className="w-5 h-5 text-[#CCCCCC] group-hover:text-white" />
        </div>
        
        <div className="flex items-center space-x-3 bg-[#4E4E50]/10 border border-[#4E4E50]/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-[#4E4E50]/20 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C3073F] to-[#950740] rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">Dr. Sarah Chen</div>
            <div className="text-xs text-[#CCCCCC]/60">Data Scientist</div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#CCCCCC]" />
        </div>
      </div>
    </nav>
  );
};
