import React from 'react';
import { Shield, FileText, AlertTriangle } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    disclaimer: 'Disclaimer'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col p-6 overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {type === 'privacy' && <Shield className="w-6 h-6" />}
              {type === 'terms' && <FileText className="w-6 h-6" />}
              {type === 'disclaimer' && <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{titles[type]}</h3>
              <p className="text-xs text-slate-400">RoyCash Performance Network Legal & Compliance</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 overflow-y-auto space-y-4 text-sm text-slate-300 pr-2">
          {type === 'privacy' && (
            <>
              <p>RoyCash (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy informs you how we handle user data in compliance with international standards.</p>
              <h4 className="font-semibold text-white mt-3">1. Information We Collect</h4>
              <p>We collect standard technical information necessary for affiliate attribution and network security, including IP addresses, browser user agents, referring URLs, and unique click identifiers (click_ids). We do not collect sensitive personal documents such as Aadhaar, PAN, government IDs, or passwords.</p>
              <h4 className="font-semibold text-white mt-3">2. Use of Tracking Data</h4>
              <p>Click and conversion logs are used strictly for attribution, fraud detection, and commission calculation. Data is encrypted in transit and at rest.</p>
              <h4 className="font-semibold text-white mt-3">3. Cookies & Fingerprinting</h4>
              <p>We use secure cookies and device fingerprinting to ensure accurate attribution between advertisers and publishers.</p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>Welcome to RoyCash. By accessing our platform, website, or publisher/advertiser portals, you agree to comply with and be bound by the following terms and conditions.</p>
              <h4 className="font-semibold text-white mt-3">1. Publisher Obligations</h4>
              <p>Publishers must engage in white-hat promotional methods only. Incentivized fraud, bot traffic, cookie stuffing, and trademark bidding without direct advertiser approval will result in immediate account termination and forfeiture of unpaid balances.</p>
              <h4 className="font-semibold text-white mt-3">2. Advertiser Agreements</h4>
              <p>Advertisers agree to provide accurate postback endpoints, maintain sufficient campaign funding, and honor valid conversion postbacks within agreed verification windows.</p>
              <h4 className="font-semibold text-white mt-3">3. Limitation of Liability</h4>
              <p>RoyCash acts as an intermediary network platform and is not liable for indirect or consequential damages arising from third-party server downtime or network interruptions.</p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <p>RoyCash is a performance-based affiliate marketing network. Earnings and conversion rates vary widely depending on traffic quality, promotional geos, and offer vertical.</p>
              <h4 className="font-semibold text-white mt-3">1. No Guaranteed Earnings</h4>
              <p>Estimates and calculators provided on this website are for illustrative simulation purposes only and do not constitute a guarantee of future earnings or conversion rates.</p>
              <h4 className="font-semibold text-white mt-3">2. Third-Party Links</h4>
              <p>Campaign landing pages and merchant offers are operated by independent third-party advertisers. RoyCash assumes no responsibility for external content, product fulfillment, or customer service policies of third-party merchants.</p>
            </>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-xl transition-colors text-sm cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
