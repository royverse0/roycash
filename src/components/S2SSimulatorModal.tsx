import React, { useState } from 'react';
import { Terminal, CheckCircle2, Copy, RefreshCw, Send, ShieldCheck, AlertCircle } from 'lucide-react';

interface S2SSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const S2SSimulatorModal: React.FC<S2SSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [clickId, setClickId] = useState('rc_clk_8f93a10b42c');
  const [payout, setPayout] = useState('45.00');
  const [currency, setCurrency] = useState('USD');
  const [status, setStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  if (!isOpen) return null;

  const samplePostbackUrl = `https://track.roycash.network/postback?click_id=${clickId}&payout=${payout}&currency=${currency}&status=approved`;

  const handleRunSimulation = () => {
    setStatus('testing');
    setLogs(['[0.001s] Initializing secure S2S handshake with RoyCash gateway...']);

    setTimeout(() => {
      setLogs(prev => [...prev, `[0.142s] Validating click_id: ${clickId} in Redis cache... Found valid session.`]);
    }, 400);

    setTimeout(() => {
      setLogs(prev => [...prev, `[0.289s] Checking anti-fraud fingerprint & IP velocity... Passed (Score: 99.4/100).`]);
    }, 800);

    setTimeout(() => {
      setLogs(prev => [...prev, `[0.450s] SUCCESS: Conversion recorded. Ledger credited $${payout} ${currency}. Postback HTTP 200 OK returned.`]);
      setStatus('success');
    }, 1200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl p-6 overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">S2S Postback Sandbox Simulator</h3>
              <p className="text-xs text-slate-400">Test server-to-server conversion attribution in real time</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Simulated Click ID</label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={clickId}
                  onChange={(e) => setClickId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <button 
                  onClick={() => setClickId('rc_clk_' + Math.random().toString(36).substring(2, 12))}
                  title="Generate random"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Payout Amount</label>
                <input 
                  type="number" 
                  value={payout}
                  onChange={(e) => setPayout(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Generated Postback URL Endpoint</label>
            <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
              <span className="whitespace-nowrap flex-1">{samplePostbackUrl}</span>
              <button 
                onClick={() => copyToClipboard(samplePostbackUrl)}
                className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg shrink-0 flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Sandbox mode: Safe environment for testing integration parameters.</span>
            </div>

            <button 
              onClick={handleRunSimulation}
              disabled={status === 'testing'}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-slate-950 font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              {status === 'testing' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  Simulating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Test Postback Now
                </>
              )}
            </button>
          </div>

          {logs.length > 0 && (
            <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5 max-h-40 overflow-y-auto">
              <div className="text-slate-500 font-bold uppercase tracking-wider mb-2 text-[10px]">Execution Logs</div>
              {logs.map((log, idx) => (
                <div key={idx} className={log.includes('SUCCESS') ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
