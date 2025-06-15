
import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-black font-black text-lg">DD</div>
              </div>
              <div>
                <h3 className="text-xl font-light text-white">DataDone</h3>
                <div className="text-xs text-white/60">Multi-Agent Platform</div>
              </div>
            </div>
            <p className="text-white/60 max-w-md mb-6">
              Transforming data science workflows through intelligent agent collaboration and cutting-edge automation.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <div className="space-y-3">
              {['Features', 'Pricing', 'Documentation', 'API Reference'].map((link) => (
                <a key={link} href="#" className="block text-white/60 hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <div className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                <a key={link} href="#" className="block text-white/60 hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            © 2024 DataDone. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
