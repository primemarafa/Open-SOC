import { useState, useMemo } from 'react';
import { Search, ShieldAlert, Eye, Copy, Check, X } from 'lucide-react';
import type { AlertSeverity } from '../../types/soc';

export interface SIEMAlertItem {
  id: string;
  timestamp: string;
  severity: AlertSeverity | string;
  source: string;
  ruleName?: string;
  description: string;
  sourceIP?: string;
  destIP?: string;
  user?: string;
  hostname?: string;
  rawLog?: string;
  [key: string]: any;
}

interface SIEMExplorerProps {
  alerts: SIEMAlertItem[];
}

export default function SIEMExplorer({ alerts }: SIEMExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<SIEMAlertItem | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSeverity = selectedSeverity === 'all' || alert.severity?.toLowerCase() === selectedSeverity.toLowerCase();
      if (!matchesSeverity) return false;

      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();

      return (
        alert.id?.toLowerCase().includes(term) ||
        alert.ruleName?.toLowerCase().includes(term) ||
        alert.description?.toLowerCase().includes(term) ||
        alert.sourceIP?.toLowerCase().includes(term) ||
        alert.destIP?.toLowerCase().includes(term) ||
        alert.user?.toLowerCase().includes(term) ||
        alert.hostname?.toLowerCase().includes(term) ||
        alert.rawLog?.toLowerCase().includes(term)
      );
    });
  }, [alerts, searchTerm, selectedSeverity]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getSeverityBadge = (severity: string) => {
    const s = severity?.toLowerCase();
    switch (s) {
      case 'critical':
        return <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-rose-500/20 text-rose-400 border border-rose-500/40">CRITICAL</span>;
      case 'high':
        return <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-orange-500/20 text-orange-400 border border-orange-500/40">HIGH</span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">MEDIUM</span>;
      case 'low':
        return <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-blue-500/20 text-blue-400 border border-blue-500/40">LOW</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-700 text-slate-300">INFO</span>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden font-sans">
      {/* SIEM Top Search and Filters Bar */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher IP, utilisateur, EventID, signature..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'critical', 'high', 'medium', 'low'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer capitalize ${
                  selectedSeverity === sev
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
                }`}
              >
                {sev === 'all' ? 'Tous' : sev}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>{filteredAlerts.length} événement(s) trouvé(s)</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            SIEM Ingestion Active
          </span>
        </div>
      </div>

      {/* Table of Events */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs text-slate-300 border-collapse font-mono">
          <thead className="bg-slate-950/80 sticky top-0 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Horodatage</th>
              <th className="py-2.5 px-2">Sévérité</th>
              <th className="py-2.5 px-3">Règle / Événement</th>
              <th className="py-2.5 px-2">Source IP</th>
              <th className="py-2.5 px-2">Utilisateur</th>
              <th className="py-2.5 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredAlerts.map((alert) => (
              <tr
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`cursor-pointer transition-colors hover:bg-cyan-500/5 ${
                  selectedAlert?.id === alert.id ? 'bg-cyan-500/10' : ''
                }`}
              >
                <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">{alert.timestamp}</td>
                <td className="py-2.5 px-2">{getSeverityBadge(alert.severity)}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-200">
                  <div className="truncate max-w-[200px] sm:max-w-xs">{alert.ruleName || alert.description}</div>
                  <div className="text-[10px] text-slate-500 truncate">{alert.description}</div>
                </td>
                <td className="py-2.5 px-2 text-cyan-400">{alert.sourceIP || '-'}</td>
                <td className="py-2.5 px-2 text-slate-300">{alert.user || '-'}</td>
                <td className="py-2.5 px-2 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAlert(alert);
                    }}
                    className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
                    title="Inspecter le log brut"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAlerts.length === 0 && (
          <div className="p-8 text-center text-slate-500 font-mono text-sm">
            Aucun événement ne correspond à vos filtres.
          </div>
        )}
      </div>

      {/* Event Details Inspector Modal / Bottom Sheet */}
      {selectedAlert && (
        <div className="border-t border-slate-800 bg-slate-950 p-4 max-h-[45%] overflow-y-auto space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <h4 className="text-sm font-bold text-slate-100 font-mono">
                Détail de l'Alerte : {selectedAlert.id}
              </h4>
              {getSeverityBadge(selectedAlert.severity)}
            </div>
            <button
              onClick={() => setSelectedAlert(null)}
              className="p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-500 block">Source IP :</span>
              <span className="text-cyan-400 font-bold flex items-center justify-between">
                {selectedAlert.sourceIP || 'N/A'}
                {selectedAlert.sourceIP && (
                  <button
                    onClick={() => copyToClipboard(selectedAlert.sourceIP!, 'src')}
                    className="hover:text-white"
                  >
                    {copiedKey === 'src' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-500 block">Destination IP :</span>
              <span className="text-slate-200">{selectedAlert.destIP || 'N/A'}</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-500 block">Compte Utilisateur :</span>
              <span className="text-amber-400 font-bold">{selectedAlert.user || 'N/A'}</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-500 block">Hôte / Machine :</span>
              <span className="text-slate-200">{selectedAlert.hostname || 'N/A'}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
              <span>Log Brut (Raw Event Data) :</span>
              <button
                onClick={() => copyToClipboard(selectedAlert.rawLog || JSON.stringify(selectedAlert, null, 2), 'raw')}
                className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 text-xs"
              >
                {copiedKey === 'raw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copier le log</span>
              </button>
            </div>
            <pre className="p-3 bg-[#0d1117] text-slate-300 font-mono text-xs rounded-lg overflow-x-auto border border-slate-800 whitespace-pre-wrap">
              {selectedAlert.rawLog || JSON.stringify(selectedAlert, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
