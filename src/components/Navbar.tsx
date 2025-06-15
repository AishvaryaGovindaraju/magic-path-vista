
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 relative z-10" style={{minWidth:120}}>
            <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center relative z-10">
              <div className="text-black font-black text-lg">DD</div>
            </div>
            <div className="relative z-10">
              <h1 className="text-xl font-bold text-white tracking-tight">
                DataDone
              </h1>
              {/* Removed: <div className="text-xs text-white/60 -mt-1">Multi-Agent Platform</div> */}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Product', 'Solutions', 'Developers', 'Company'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white hover:text-white transition-colors text-sm font-semibold"
                style={{textShadow:'0 2px 8px rgba(0,0,0,0.18)'}}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="text-white hover:text-gray-200 transition-colors text-sm font-semibold"
              style={{textShadow:'0 2px 8px rgba(0,0,0,0.20)'}}
            >
              Sign In
            </a>
            <a
              href="#"
              className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors text-sm font-bold"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-white/10 bg-black/90 backdrop-blur-xl rounded-b-xl shadow-lg">
            <div className="space-y-4">
              {['Product', 'Solutions', 'Developers', 'Company'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block text-white font-semibold hover:text-gray-200 transition-colors"
                  style={{textShadow:'0 2px 8px rgba(0,0,0,0.18)'}}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="#"
                  className="block text-white font-semibold hover:text-gray-200 transition-colors"
                  style={{textShadow:'0 2px 8px rgba(0,0,0,0.18)'}}
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="block w-full px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors text-center font-bold"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

