import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Users, ArrowRight } from 'lucide-react';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [trafficVolume, setTrafficVolume] = useState<number>(10000);
  const [convRate, setConvRate] = useState<number>(2.5);
  const [avgPayout, setAvgPayout] = useState<number>(35);
  const [modelType, setModelType] = useState<'cpa' | 'cpl' | 'revshare'>('cpa');

  if (!isOpen) return null;

  const estimatedConversions = Math.round(trafficVolume * (convRate / 100));
  const estimatedEarnings = estimatedConversions * avgPayout;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl p-6 overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Publisher Earnings Estimator</h3>
              <p className="text-xs text-slate-400">Calculate potential returns based on traffic volume and conversion models</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { setModelType('cpa'); setAvgPayout(35); }}
              className={`p-3 rounded-xl border text-left transition-all ${modelType === 'cpa' ? 'bg-emerald-500/10 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
            >
              <div className="text-xs font-semibold">CPA Model</div>
              <div className="text-sm font-bold text-emerald-400">Avg $35 / action</div>
            </button>
            <button
              onClick={() => { setModelType('cpl'); setAvgPayout(12); }}
              className={`p-3 rounded-xl border text-left transition-all ${modelType === 'cpl' ? 'bg-emerald-500/10 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
            >
              <div className="text-xs font-semibold">CPL Lead</div>
              <div className="text-sm font-bold text-emerald-400">Avg $12 / lead</div>
            </button>
            <button
              onClick={() => { setModelType('revshare'); setAvgPayout(85); }}
              className={`p-3 rounded-xl border text-left transition-all ${modelType === 'revshare' ? 'bg-emerald-500/10 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
            >
              <div className="text-xs font-semibold">RevShare</div>
              <div className="text-sm font-bold text-emerald-400">Avg $85 / user</div>
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">Monthly Unique Visitors / Clicks</label>
              <span className="text-sm font-mono font-bold text-emerald-400">{trafficVolume.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="250000" 
              step="1000"
              value={trafficVolume}
              onChange={(e) => setTrafficVolume(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">Estimated Conversion Rate (%)</label>
              <span className="text-sm font-mono font-bold text-emerald-400">{convRate}%</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="10" 
              step="0.1"
              value={convRate}
              onChange={(e) => setConvRate(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950"
            />
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Est. Monthly Conversions</div>
                <div className="text-xl font-extrabold text-white font-mono">{estimatedConversions.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
                <div className="text-xs text-emerald-300/80 mb-1">Estimated Net Payout</div>
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">${estimatedEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors cursor-pointer text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
