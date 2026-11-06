import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { ADVERTISER_FAQS } from '../data/roycashData';
import { TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, BarChart3, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

interface AdvertisersViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenS2S: () => void;
}

export const AdvertisersView: React.FC<AdvertisersViewProps> = ({ setActiveTab, onOpenS2S }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md w-fit mx-auto border border-emerald-500/20">
          Advertiser Partnerships
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Scale Customer Acquisition with Verified Performance
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Connect directly with high-intent publishers, protect your brand with advanced anti-fraud filters, and pay strictly for verified actions.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button 
            onClick={() => setActiveTab('contact')}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <span>Launch Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={onOpenS2S}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl text-sm border border-slate-800 flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Test S2S Integration</span>
          </button>
        </div>
      </div>

      {/* Core Features for Advertisers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Direct Partnerships</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Collaborate with hand-vetted publishers specializing in fintech, SaaS, e-commerce, and mobile app acquisition.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Fraud Protection</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Multi-layered bot detection, IP filtering, and behavioral validation ensure every marketing dollar drives real human value.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Real-Time Reporting</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Granular analytics dashboard tracking clicks, conversion rates, geos, publisher breakdown, and budget pacing in real time.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Advertiser Frequently Asked Questions</h2>
          <p className="text-slate-400 text-xs">Everything you need to know about partnering with RoyCash.</p>
        </div>

        <div className="space-y-3">
          {ADVERTISER_FAQS.map((faq, idx) => (
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
