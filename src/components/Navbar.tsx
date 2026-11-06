import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Layers, Menu, X, ArrowRight, Terminal, Calculator } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenS2S: () => void;
  onOpenCalc: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenS2S, onOpenCalc }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'models', label: 'Campaign Models' },
    { id: 'publishers', label: 'Publishers' },
    { id: 'advertisers', label: 'Advertisers' },
    { id: 'tracking', label: 'How Tracking Works' },
    { id: 'about', label: 'About RoyCash' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Layers className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
              ROY<span className="text-emerald-400">CASH</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">NETWORK</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide">Earn Through Actions</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-2xl border border-slate-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === item.id 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <button 
            onClick={onOpenCalc}
            title="Calculator"
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Estimator</span>
          </button>
          <button 
            onClick={onOpenS2S}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>S2S Sandbox</span>
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={onOpenS2S}
            className="p-2 rounded-xl bg-slate-900 text-emerald-400 border border-slate-800"
            title="S2S Sandbox"
          >
            <Terminal className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === item.id 
                  ? 'bg-emerald-500 text-slate-950' 
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { onOpenCalc(); setMobileMenuOpen(false); }}
              className="w-full py-3 bg-slate-900 text-slate-200 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border border-slate-800"
            >
              <Calculator className="w-4 h-4 text-emerald-400" /> Earnings Estimator
            </button>
            <button
              onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
              className="w-full py-3 bg-emerald-500 text-slate-950 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
