import React from 'react';
import { ActiveTab } from '../types';
import { Layers, ArrowRight, ShieldCheck, Zap, TrendingUp, Users, Target, CheckCircle2, Globe, Server, Terminal, Lock } from 'lucide-react';
import { CAMPAIGN_MODELS } from '../data/roycashData';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenS2S: () => void;
  onOpenCalc: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, onOpenS2S, onOpenCalc }) => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-950/0 to-slate-950/0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Performance Marketing & Affiliate Network
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
              Earn Through Actions. <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                Grow Through Referrals.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              RoyCash connects elite publishers with premium global advertisers through enterprise-grade S2S tracking, transparent attribution, and instant campaign scalability.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button 
                onClick={() => setActiveTab('publishers')}
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Join as Publisher</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab('advertisers')}
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl border border-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Advertise with RoyCash</span>
              </button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> S2S Postback Tracking
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time Fraud Filtering
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparent Net-15 Terms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction to Affiliate Network */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md w-fit border border-emerald-500/20">
              The RoyCash Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered for Maximum ROI & Uncompromised Transparency
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Whether you are an advertiser seeking verified user acquisition or a publisher looking to monetize traffic with high-paying CPA and RevShare models, RoyCash provides the infrastructure, data precision, and support you need.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm">Action-Driven Payouts</h3>
                <p className="text-xs text-slate-400">Pay or get paid strictly on verified conversions with zero hidden discrepancies.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm">Robust S2S Tracking</h3>
                <p className="text-xs text-slate-400">Reliable server-to-server postback routing immune to browser cookie blocking.</p>
              </div>
            </div>
          </div>

          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-500">roycash-network-gateway.io</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Active Campaign Vertical</span>
                <span className="text-emerald-400 font-bold">Fintech & SaaS</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Attribution Protocol</span>
                <span className="text-white font-bold">Secure S2S Postback</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Fraud Protection</span>
                <span className="text-emerald-400 font-bold">Active (99.8%)</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                onClick={onOpenS2S}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Terminal className="w-4 h-4" /> Test S2S Sandbox
              </button>
              <button 
                onClick={onOpenCalc}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Estimator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advertiser & Publisher Dual Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">For Publishers</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Monetize your traffic, blog, social media channels, or media buying portfolio with high-payout global campaigns across CPA, CPL, RevShare, and Hybrid models.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant tracking link generation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparent Net-15 / Net-30 payouts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time click & conversion reporting</li>
              </ul>
            </div>
            <button 
              onClick={() => setActiveTab('publishers')}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore Publisher Benefits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">For Advertisers</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Scale your brand acquisition with direct access to vetted high-performing publishers. Pay strictly for verified conversions with zero upfront bot waste.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Flexible budget & geo targeting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Advanced multi-layered fraud prevention</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct S2S endpoint integration</li>
              </ul>
            </div>
            <button 
              onClick={() => setActiveTab('advertisers')}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore Advertiser Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* How RoyCash Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md w-fit mx-auto border border-emerald-500/20">
            Workflow Process
          </div>
          <h2 className="text-3xl font-extrabold text-white">How RoyCash Works</h2>
          <p className="text-slate-400 text-sm">A seamless, transparent 3-step loop connecting traffic to verified revenue.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 relative">
            <div className="text-4xl font-extrabold text-emerald-500/20 font-mono">01</div>
            <h3 className="text-lg font-bold text-white">Select Campaigns</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Browse top-tier verified campaigns across finance, SaaS, e-commerce, and mobile apps. Generate unique tracking links with instant click IDs.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 relative">
            <div className="text-4xl font-extrabold text-emerald-500/20 font-mono">02</div>
            <h3 className="text-lg font-bold text-white">Drive Traffic</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Promote offers across approved channels such as content sites, social media, email newsletters, or digital media buying campaigns.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 relative">
            <div className="text-4xl font-extrabold text-emerald-500/20 font-mono">03</div>
            <h3 className="text-lg font-bold text-white">Get Paid Securely</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Conversions are recorded instantly via secure S2S postback attribution. Receive reliable payouts on time with transparent reporting.
            </p>
          </div>
        </div>
      </section>

      {/* Campaign Categories Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md w-fit mb-3 border border-emerald-500/20">
              Campaign Models
            </div>
            <h2 className="text-3xl font-extrabold text-white">Explore Available Models</h2>
          </div>
          <button 
            onClick={() => setActiveTab('models')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All 10 Models</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAMPAIGN_MODELS.slice(0, 4).map((model) => (
            <div 
              key={model.id}
              onClick={() => setActiveTab('models')}
              className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                  {model.code}
                </span>
                <span className="text-xs text-slate-500 font-medium">Risk: {model.riskLevel}</span>
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">{model.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{model.shortDesc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
