import React from 'react';
import { ActiveTab } from '../types';
import { Layers, ShieldCheck, Terminal, Globe, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'disclaimer') => void;
  onOpenS2S: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenLegal, onOpenS2S }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Layers className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-xl font-extrabold text-white tracking-tight">
                ROY<span className="text-emerald-400">CASH</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Earn Through Actions. Grow Through Referrals. A professional performance marketing and affiliate network connecting top global advertisers with elite publishers.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20 w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>S2S Postback & Fraud Guard Verified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 transition-colors">Home Overview</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('models')} className="hover:text-emerald-400 transition-colors">Campaign Models</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('publishers')} className="hover:text-emerald-400 transition-colors">For Publishers</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('advertisers')} className="hover:text-emerald-400 transition-colors">For Advertisers</button>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Technology</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('tracking')} className="hover:text-emerald-400 transition-colors">How Tracking Works</button>
              </li>
              <li>
                <button onClick={onOpenS2S} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" /> S2S Sandbox
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition-colors">About RoyCash</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-emerald-400 transition-colors">Contact Support</button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Legal & Compliance</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onOpenLegal('privacy')} className="hover:text-emerald-400 transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('terms')} className="hover:text-emerald-400 transition-colors">Terms & Conditions</button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('disclaimer')} className="hover:text-emerald-400 transition-colors">Disclaimer</button>
              </li>
              <li className="text-slate-500 pt-2 text-[11px]">
                Cloudflare Pages Ready
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} RoyCash Network. All rights reserved.
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>Designed for High-Performance Affiliate Marketing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
