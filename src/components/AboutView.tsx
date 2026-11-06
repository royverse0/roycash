import React from 'react';
import { ActiveTab } from '../types';
import { Layers, ShieldCheck, Target, Heart, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md w-fit mx-auto border border-emerald-500/20">
          Company Vision
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About RoyCash
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Built on a foundation of absolute transparency, technical excellence, and mutual growth for publishers and advertisers.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Our Mission</h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The affiliate marketing industry has long suffered from opaque attribution, hidden discrepancies, and delayed payments. RoyCash was founded to change that by building an ultra-reliable, developer-friendly performance network where trust is engineered into every postback.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">✓</div>
              <span>Zero hidden fees or opaque ledger deductions</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">✓</div>
              <span>Strict compliance and anti-fraud verification</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">✓</div>
              <span>On-time Net-15 / Net-30 settlement cycles</span>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">RoyCash Network</h3>
              <p className="text-xs text-slate-400">Earn Through Actions. Grow Through Referrals.</p>
            </div>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            We empower independent creators, media buyers, performance marketers, and global brands to scale seamlessly without friction.
          </p>
          <button 
            onClick={() => setActiveTab('contact')}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Get in Touch with Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
