
import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { AgentShowcase } from '../components/AgentShowcase';
import { InteractiveDemo } from '../components/InteractiveDemo';
import { FeatureGrid } from '../components/FeatureGrid';
import { Footer } from '../components/Footer';
import { AuroraBackground } from '../components/AuroraBackground';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative">
      {/* Aurora Background Centered */}
      <AuroraBackground />
      {/* Custom Cursor */}
      <div 
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`
        }}
      />
      
      {/* Grain Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      <Navbar />
      
      <main className="relative z-20">
        <HeroSection />
        <AgentShowcase />
        <InteractiveDemo />
        <FeatureGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
