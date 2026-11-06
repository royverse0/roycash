import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { PUBLISHER_FAQS } from '../data/roycashData';
import { Users, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, Link, ChevronDown, ChevronUp } from 'lucide-react';

interface PublishersViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCalc: () => void;
}

export const PublishersView: React.FC<PublishersViewProps> = ({ setActiveTab, onOpenCalc }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md w-fit mx-auto border border-emerald-500/20">
          Publisher Network
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Monetize Your Traffic with Industry-Leading Payouts
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Join elite publishers worldwide leveraging RoyCash tracking infrastructure, real-time analytics, and guaranteed Net-15 settlements.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button 
            onClick={() => setActiveTab('contact')}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <span>Apply as Publisher</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={onOpenCalc}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl text-sm border border-slate-800 cursor-pointer"
          >
            Calculate Earnings
          </button>
        </div>
      </div>

      {/* Core Features for Publishers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Link className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Smart Tracking Links</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Generate clean affiliate links embedded with unique click IDs (`click_id`) and fallback sub-IDs instantly for multi-channel optimization.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Eligible Conversions</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Clear conversion criteria verified in real-time via server-to-server postbacks. No guesswork on whether a lead or sale qualified.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Transparent Payouts</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Reliable payment terms (Net-15/Net-30) via Wire transfer, USDT (Crypto), or regional business accounts with zero hidden fees.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Publisher Frequently Asked Questions</h2>
          <p className="text-slate-400 text-xs">Everything you need to know about joining and earning with RoyCash.</p>
        </div>

        <div className="space-y-3">
          {PUBLISHER_FAQS.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-white font-semibold text-sm hover:bg-slate-900/80 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
