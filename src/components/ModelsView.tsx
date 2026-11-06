import React, { useState } from 'react';
import { CAMPAIGN_MODELS } from '../data/roycashData';
import { CampaignModel } from '../types';
import { Layers, Target, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface ModelsViewProps {
  setActiveTab: (tab: any) => void;
  onOpenS2S: () => void;
}

export const ModelsView: React.FC<ModelsViewProps> = ({ setActiveTab, onOpenS2S }) => {
  const [selectedModel, setSelectedModel] = useState<CampaignModel | null>(CAMPAIGN_MODELS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-md w-fit mx-auto border border-emerald-500/20">
          Comprehensive Structure
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Campaign Models Explained
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          RoyCash supports a robust array of performance marketing models tailored to every traffic type, vertical, and growth objective.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: List of Models */}
        <div className="lg:col-span-1 space-y-2.5 max-h-[700px] overflow-y-auto pr-2">
          {CAMPAIGN_MODELS.map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedModel?.id === model.id
                  ? 'bg-emerald-500/10 border-emerald-500 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-12 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs shrink-0">
                  {model.code}
                </span>
                <div>
                  <div className="font-bold text-sm">{model.name}</div>
                  <div className="text-xs text-slate-400 line-clamp-1">{model.shortDesc}</div>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${selectedModel?.id === model.id ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
            </div>
          ))}
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-2">
          {selectedModel && (
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-extrabold text-lg">
                    {selectedModel.code}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedModel.name}</h2>
                    <p className="text-xs text-slate-400">RoyCash Verified Model Specification</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <span>Risk Level:</span>
                  <span className="font-bold text-emerald-400">{selectedModel.riskLevel}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Overview</h4>
                  <p className="text-slate-200 text-sm leading-relaxed">{selectedModel.fullDesc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Best Suited For</span>
                    <p className="text-xs text-slate-300">{selectedModel.bestFor}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Payment Trigger</span>
                    <p className="text-xs text-slate-300">{selectedModel.paymentTrigger}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Ready to run or promote {selectedModel.code} campaigns?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button 
                    onClick={onOpenS2S}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Test Postback
                  </button>
                  <button 
                    onClick={() => setActiveTab('contact')}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Apply for {selectedModel.code}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
