import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Mail, Network, Cpu, Database, Clock, Globe, File, Radio, BookOpen } from 'lucide-react';
import type { Evidence } from '../../types/scenario';
import SIEMExplorer from '../soc/SIEMExplorer';
import SOCPlaybookModal from '../soc/SOCPlaybookModal';

interface EvidenceViewerProps {
  evidence: Evidence[];
  translationNamespace?: string;
}

const EvidenceViewer: React.FC<EvidenceViewerProps> = ({ evidence, translationNamespace = 'soc' }) => {
  const { t } = useTranslation([translationNamespace, 'common']);
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);

  if (!evidence || evidence.length === 0) return <div className="text-gray-500 p-4 font-mono text-sm">No evidence available.</div>;

  const getIcon = (type: string) => {
    switch (type) {
      case 'log': return <FileText className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'network': return <Network className="w-4 h-4" />;
      case 'process': return <Cpu className="w-4 h-4" />;
      case 'registry': return <Database className="w-4 h-4" />;
      case 'timeline': return <Clock className="w-4 h-4" />;
      case 'browser': return <Globe className="w-4 h-4" />;
      case 'pcap': return <Radio className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const currentEvidence = evidence[activeTab] || evidence[0];

  const renderContent = () => {
    const data = currentEvidence.data as Record<string, any>;
    
    // Check if we have structured alerts for the SIEM Explorer
    if (data?.alerts && Array.isArray(data.alerts)) {
      return <SIEMExplorer alerts={data.alerts} />;
    }

    switch (currentEvidence.type) {
      case 'log':
        return (
          <pre className="bg-[#0d1117] text-gray-300 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-800">
            {JSON.stringify(data, null, 2)}
          </pre>
        );
      case 'email':
        return (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="mb-4 pb-4 border-b border-gray-700 space-y-2 text-sm font-mono">
              <div className="flex"><span className="w-24 text-gray-400 font-semibold">From:</span><span className="text-gray-200">{data?.headers?.from || data?.from || 'Unknown'}</span></div>
              <div className="flex"><span className="w-24 text-gray-400 font-semibold">To:</span><span className="text-gray-200">{data?.headers?.to || data?.to || 'Unknown'}</span></div>
              <div className="flex"><span className="w-24 text-gray-400 font-semibold">Date:</span><span className="text-gray-200">{data?.headers?.date || data?.date || 'Unknown'}</span></div>
              <div className="flex"><span className="w-24 text-gray-400 font-semibold">Subject:</span><span className="font-semibold text-gray-100">{data?.headers?.subject || data?.subject || 'No Subject'}</span></div>
              {data?.headers?.spf && (
                <div className="flex"><span className="w-24 text-gray-400 font-semibold">SPF:</span><span className="text-yellow-400 font-mono">{data.headers.spf}</span></div>
              )}
              {data?.headers?.replyTo && (
                <div className="flex"><span className="w-24 text-gray-400 font-semibold">Reply-To:</span><span className="text-rose-400 font-bold font-mono">{data.headers.replyTo}</span></div>
              )}
            </div>
            <div className="whitespace-pre-wrap text-gray-200 font-sans p-4 bg-gray-900/60 rounded-lg border border-gray-700/80 leading-relaxed">
              {data?.body || 'No body content.'}
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 overflow-x-auto">
            <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 flex flex-col h-full overflow-hidden">
      {/* Tab Navigation and Action Bar */}
      <div className="flex items-center justify-between bg-gray-900 border-b border-gray-800 pr-3">
        <div className="flex overflow-x-auto custom-scrollbar">
          {evidence.map((item, idx) => (
            <button
              key={item.id || idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activeTab === idx
                  ? 'border-emerald-400 text-emerald-400 bg-gray-800/50'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
              }`}
            >
              {getIcon(item.type)}
              <span>{t(item.titleKey, { defaultValue: item.titleKey || item.id })}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsPlaybookOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono transition-colors cursor-pointer shrink-0"
          title="Consulter le Playbook / SOP d'intervention"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Playbook SOP</span>
        </button>
      </div>
      
      {/* Evidence Body */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-900 flex flex-col">
        <div className="mb-3">
          <h3 className="text-base font-bold text-gray-100 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {t(currentEvidence.titleKey, { defaultValue: currentEvidence.titleKey || currentEvidence.id })}
          </h3>
        </div>
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>

      {/* SOP Modal */}
      <SOCPlaybookModal isOpen={isPlaybookOpen} onClose={() => setIsPlaybookOpen(false)} />
    </div>
  );
};

export default EvidenceViewer;
