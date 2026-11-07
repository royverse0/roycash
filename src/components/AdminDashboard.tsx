import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, TrendingUp, FileText, Target, DollarSign, 
  Activity, Settings, LogOut, CheckCircle2, XCircle, AlertCircle, RefreshCw, Plus, ArrowLeft
} from 'lucide-react';

interface AdminDashboardProps {
  admin: any;
  onLogout: () => void;
  onReturnHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin, onLogout, onReturnHome }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'publishers' | 'advertisers' | 'applications' | 'campaigns' | 'conversions' | 'withdrawals' | 'audit_logs' | 'settings'>('overview');
  
  const [stats, setStats] = useState<any>(null);
  const [publishers, setPublishers] = useState<any[]>([]);
  const [advertisers, setAdvertisers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New Campaign Modal state
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    advertiser_id: '',
    title: '',
    model: 'CPA',
    payout_amount: 1000,
    currency: 'USD',
    budget_total: 50000,
    eligibility_rules: 'Global traffic permitted. No incent.',
    allowed_geos: ['US', 'GB', 'CA']
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, pubRes, advRes, appRes, campRes, auditRes] = await Promise.all([
        fetch('/api/v1/admin/dashboard'),
        fetch('/api/v1/admin/publishers'),
        fetch('/api/v1/admin/advertisers'),
        fetch('/api/v1/admin/applications'),
        fetch('/api/v1/admin/campaigns'),
        fetch('/api/v1/admin/audit-logs')
      ]);

      const [dashData, pubData, advData, appData, campData, auditData] = await Promise.all([
        dashRes.json(),
        pubRes.json(),
        advRes.json(),
        appRes.json(),
        campRes.json(),
        auditRes.json()
      ]);

      if (dashRes.ok) setStats(dashData.stats);
      if (pubRes.ok) setPublishers(pubData.publishers);
      if (advRes.ok) setAdvertisers(advData.advertisers);
      if (appRes.ok) setApplications(appData.applications);
      if (campRes.ok) setCampaigns(campData.campaigns);
      if (auditRes.ok) setAuditLogs(auditData.auditLogs);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReviewApp = async (type: string, id: string, status: string) => {
    try {
      const res = await fetch(`/api/v1/admin/applications/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, review_notes: `Application ${status} by admin` })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      alert('Failed to update application');
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/admin/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCampaign)
      });
      if (res.ok) {
        setShowNewCampaignModal(false);
        fetchData();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to create campaign');
      }
    } catch (err) {
      alert('Network error creating campaign');
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'publishers', label: 'Publishers', icon: Users },
    { id: 'advertisers', label: 'Advertisers', icon: TrendingUp },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'conversions', label: 'Conversions', icon: DollarSign },
    { id: 'withdrawals', label: 'Withdrawals', icon: DollarSign },
    { id: 'audit_logs', label: 'Audit Logs', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white">RoyCash Admin</h1>
                <p className="text-[11px] text-emerald-400 font-mono">Secure Node Cluster</p>
              </div>
            </div>
            <button 
              onClick={onReturnHome}
              title="Return to Public Site"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
              {admin.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{admin.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{admin.email}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-extrabold text-white capitalize">{activeSection.replace('_', ' ')}</h2>
            <p className="text-xs text-slate-400 mt-1">Real-time database records and administrative controls</p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* OVERVIEW SECTION */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase font-semibold">Total Publishers</div>
                <div className="text-3xl font-extrabold text-white font-mono">{stats?.publishers ?? 0}</div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase font-semibold">Total Advertisers</div>
                <div className="text-3xl font-extrabold text-white font-mono">{stats?.advertisers ?? 0}</div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase font-semibold">Active Campaigns</div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">{stats?.campaigns ?? 0}</div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase font-semibold">Total Conversions</div>
                <div className="text-3xl font-extrabold text-white font-mono">{stats?.conversions ?? 0}</div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase font-semibold">Pending Applications</div>
                <div className="text-3xl font-extrabold text-amber-400 font-mono">{stats?.pendingApplications ?? 0}</div>
              </div>
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400 uppercase font-semibold">Total Payout Volume</div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">${((stats?.totalPayoutVolume ?? 0) / 100).toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}

        {/* PUBLISHERS SECTION */}
        {activeSection === 'publishers' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 overflow-x-auto">
              {publishers.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">No publisher profiles found in database.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">Contact</th>
                      <th className="pb-3 font-semibold">Email</th>
                      <th className="pb-3 font-semibold">Company</th>
                      <th className="pb-3 font-semibold">Traffic Sources</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {publishers.map((pub) => (
                      <tr key={pub.id}>
                        <td className="py-3.5 font-medium text-white">{pub.contact_name}</td>
                        <td className="py-3.5 text-slate-400">{pub.email}</td>
                        <td className="py-3.5">{pub.company_name || 'N/A'}</td>
                        <td className="py-3.5 font-mono">{pub.traffic_sources?.join(', ') || 'N/A'}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${pub.user_status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            {pub.user_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ADVERTISERS SECTION */}
        {activeSection === 'advertisers' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 overflow-x-auto">
              {advertisers.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">No advertiser profiles found in database.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">Company</th>
                      <th className="pb-3 font-semibold">Contact</th>
                      <th className="pb-3 font-semibold">Email</th>
                      <th className="pb-3 font-semibold">Industry</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {advertisers.map((adv) => (
                      <tr key={adv.id}>
                        <td className="py-3.5 font-medium text-white">{adv.company_name}</td>
                        <td className="py-3.5">{adv.contact_name}</td>
                        <td className="py-3.5 text-slate-400">{adv.email}</td>
                        <td className="py-3.5">{adv.industry || 'General'}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${adv.user_status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            {adv.user_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* APPLICATIONS SECTION */}
        {activeSection === 'applications' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 overflow-x-auto">
              {applications.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">No pending or historical applications found.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">Type</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Submitted</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td className="py-3.5 font-bold uppercase text-emerald-400">{app.app_type}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${app.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : app.status === 'rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-slate-400">{new Date(app.created_at).toLocaleDateString()}</td>
                        <td className="py-3.5 text-right space-x-2">
                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleReviewApp(app.app_type, app.id, 'approved')}
                                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReviewApp(app.app_type, app.id, 'rejected')}
                                className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold rounded-lg"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* CAMPAIGNS SECTION */}
        {activeSection === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-xs text-slate-400">Manage campaign inventory, payout models, and budgets.</div>
              <button
                onClick={() => setShowNewCampaignModal(true)}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <Plus className="w-4 h-4" /> Create Campaign
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 overflow-x-auto">
              {campaigns.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">No campaigns found in database.</div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">Title</th>
                      <th className="pb-3 font-semibold">Advertiser</th>
                      <th className="pb-3 font-semibold">Model</th>
                      <th className="pb-3 font-semibold">Payout</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {campaigns.map((camp) => (
                      <tr key={camp.id}>
                        <td className="py-3.5 font-bold text-white">{camp.title}</td>
                        <td className="py-3.5">{camp.advertiser_name}</td>
                        <td className="py-3.5 font-mono text-emerald-400">{camp.model}</td>
                        <td className="py-3.5 font-mono">${(camp.payout_amount / 100).toFixed(2)}</td>
                        <td className="py-3.5">
                          <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {camp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* AUDIT LOGS SECTION */}
        {activeSection === 'audit_logs' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 overflow-x-auto">
              {auditLogs.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">No audit logs recorded yet.</div>
              ) : (
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">Timestamp</th>
                      <th className="pb-3 font-semibold">Admin</th>
                      <th className="pb-3 font-semibold">Action</th>
                      <th className="pb-3 font-semibold">Target Entity</th>
                      <th className="pb-3 font-semibold">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="py-3.5 text-slate-400">{new Date(log.created_at).toLocaleString()}</td>
                        <td className="py-3.5 text-emerald-400">{log.admin_email || 'System'}</td>
                        <td className="py-3.5 font-bold text-white">{log.action}</td>
                        <td className="py-3.5">{log.target_entity}</td>
                        <td className="py-3.5 text-slate-400">{log.ip_address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* SETTINGS / OTHERS */}
        {(activeSection === 'conversions' || activeSection === 'withdrawals' || activeSection === 'settings') && (
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
            <h3 className="text-lg font-bold text-white capitalize">{activeSection.replace('_', ' ')} Management</h3>
            <p className="text-slate-400 text-xs max-w-md mx-auto">
              Production database ledger and configuration settings for {activeSection}. All transactions are recorded securely via S2S postback records.
            </p>
          </div>
        )}
      </main>

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Create New Campaign</h3>
              <button onClick={() => setShowNewCampaignModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Advertiser ID (UUID)</label>
                <input 
                  type="text" 
                  required
                  placeholder="Paste advertiser profile UUID"
                  value={newCampaign.advertiser_id}
                  onChange={(e) => setNewCampaign({ ...newCampaign, advertiser_id: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Campaign Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Fintech App Acquisition Q1"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Model</label>
                  <select 
                    value={newCampaign.model}
                    onChange={(e) => setNewCampaign({ ...newCampaign, model: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
                  >
                    <option value="CPA">CPA</option>
                    <option value="CPL">CPL</option>
                    <option value="CPC">CPC</option>
                    <option value="CPI">CPI</option>
                    <option value="RevShare">RevShare</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Payout Amount (in cents/paise, e.g. 2500 = $25)</label>
                  <input 
                    type="number" 
                    required
                    value={newCampaign.payout_amount}
                    onChange={(e) => setNewCampaign({ ...newCampaign, payout_amount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
              >
                Save & Activate Campaign
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
