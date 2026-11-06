import React from 'react';
import { ActiveTab } from '../types';
import { Terminal, ShieldCheck, CheckCircle2, ArrowRight, Cpu, Lock, RefreshCw } from 'lucide-react';

interface TrackingViewProps {
  onOpenS2S: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({ onOpenS2S, setActiveTab }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md w-fit mx-auto border border-emerald-500/20">
          Tracking Architecture
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How RoyCash Tracking & S2S Attribution Works
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Built for maximum reliability and privacy compliance. Our Server-to-Server (S2S) postback pipeline ensures precise attribution immune to third-party cookie restrictions.
        </p>
        <div className="pt-2">
          <button 
            onClick={onOpenS2S}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 mx-auto shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch S2S Sandbox Simulator</span>
          </button>
        </div>
      </div>

      {/* 6 Core Tracking Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/20">
            01
          </div>
          <h3 className="text-lg font-bold text-white">Unique Click IDs</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Every publisher link generates a cryptographically secure unique identifier (`click_id=rc_clk_...`) stored securely in the visitor session.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/20">
            02
          </div>
          <h3 className="text-lg font-bold text-white">S2S Postback Integration</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            When a user completes an action, the advertiser server pings RoyCash’s endpoint directly via secure HTTPS postback containing the `click_id`.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/20">
            03
          </div>
          <h3 className="text-lg font-bold text-white">Precise Attribution</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            The gateway matches the `click_id` against active publisher sessions, attributing the conversion instantly to the originating traffic source.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/20">
            04
          </div>
          <h3 className="text-lg font-bold text-white">Conversion Validation</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Multi-rule validation checks parameters such as payout amounts, currency codes, and conversion status before crediting publisher ledgers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/20">
            05
          </div>
          <h3 className="text-lg font-bold text-white">Duplicate Prevention</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Deduplication filters prevent double-crediting from repeated postbacks or accidental browser refreshes on conversion confirmation pages.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center border border-emerald-500/20">
            06
          </div>
          <h3 className="text-lg font-bold text-white">Manual Verification</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Edge cases and disputed postbacks can be audited and manually verified through compliance logs with full transaction history.
          </p>
        </div>
      </div>
    </div>
  );
};
