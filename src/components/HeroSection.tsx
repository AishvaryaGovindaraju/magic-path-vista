
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';

export const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="max-w-6xl mx-auto text-center">
        {/* Removed Multi-Agent Platform badge */}
        
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-9xl font-light leading-tight md:leading-none mb-8 opacity-0 translate-y-20"
          style={{ color: 'white', textShadow: '0 2px 24px rgba(10, 10, 18, 0.60)' }}
        >
          <span className="block font-semibold">Data</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 font-semibold">
            Done
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-3xl font-light text-white/85 max-w-2xl mx-auto mb-12 opacity-0 translate-y-20"
          style={{ textShadow: '0 1px 12px rgba(10,10,18,0.4)' }}
        >
          Orchestrate intelligent agents that transform raw data into actionable insights through collaborative workflows
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center space-x-3 font-semibold text-lg shadow-md">
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-all duration-300 flex items-center space-x-3 font-semibold text-lg shadow">
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="w-2 h-2 bg-white/40 rounded-full mx-auto mt-2 animate-bounce" />
      </div>
    </section>
  );
};
