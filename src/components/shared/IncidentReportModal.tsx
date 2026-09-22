import { useState } from 'react';
import { FileText, Copy, Check, Download, X, Shield, Award } from 'lucide-react';
import type { SOCScenario } from '../../types/soc';

interface IncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: SOCScenario;
  score: number;
  maxScore: number;
  timeSpent: number;
  answers: Record<string, any>;
}

export default function IncidentReportModal({
  isOpen,
  onClose,
  scenario,
  score,
  maxScore,
  timeSpent,
  answers,
}: IncidentReportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const dateStr = new Date().toISOString().split('T')[0];
  const timeFormatted = `${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s`;

  const reportMarkdown = `# 📋 RAPPORT D'INCIDENT SOC / CIRT — CONFIDENTIEL
**Référence du Dossier :** INC-${scenario.id.toUpperCase()}-${new Date().getFullYear()}  
**Date d'investigation :** ${dateStr}  
**Analyste responsable :** Analyste SOC L1 / L2  
**Statut du Dossier :** INVESTIGATION TERMINÉE  
**Niveau de Sévérité :** ${scenario.difficulty.toUpperCase()}  

---

## 1. Résumé Exécutif
Un incident de sécurité de type **${scenario.category.toUpperCase()}** a été détecté et analysé au sein du Security Operations Center (SOC).
L'analyste a procédé à l'investigation des alertes, à l'extraction des indicateurs de compromission (IOCs) et à l'évaluation des mesures de confinement.

- **Score d'investigation :** ${score} / ${maxScore} (${percentage}%)
- **Durée de l'analyse :** ${timeFormatted}
- **Précision du diagnostic :** ${percentage >= 80 ? 'EXCELLENTE' : percentage >= 60 ? 'ACCEPTABLE' : 'À APPROFONDIR'}

---

## 2. Cartographie MITRE ATT&CK
L'analyse des preuves corrèle cet incident avec les techniques d'adversaire suivantes :
${scenario.mitreTechniques?.map((t) => `- **${t}**`).join('\n') || '- Non spécifié'}

---

## 3. Détails des Constatations & Questions Clés
${scenario.questions
  .map(
    (q, idx) => `### Question ${idx + 1} :
- **Réponse retenue par l'analyste :** \`${answers[q.id] || 'Non renseigné'}\`
- **Réponse attendue :** \`${q.correctAnswer}\`
`
  )
  .join('\n')}

---

## 4. Recommandations et Plan d'Action Post-Incident
1. **Confinement immédiat :** Bloquer les IOCs identifiés (adresses IP, domaines et hashes malveillants) au niveau du pare-feu et du proxy.
2. **Éradication :** Révoquer les sessions actives des comptes compromis et forcer la réinitialisation des mots de passe.
3. **Surveillance renforcée :** Déployer une règle de détection SIGMA sur le SIEM pour surveiller toute tentative de récurrence.

*Rapport généré automatiquement via la plateforme Open-SOC.*
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([reportMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RAPPORT_INCIDENT_${scenario.id.toUpperCase()}_${dateStr}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-mono">
                Rapport d'Incident Formel : INC-{scenario.id.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-400">Génération automatique prête pour export ou portfolio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Report Preview */}
        <div className="p-6 overflow-y-auto space-y-4 bg-slate-950/60 font-mono text-xs">
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> CIRT / SOC Incident Document
              </span>
              <span className="text-slate-500">{dateStr}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400 text-[11px]">
              <div><span className="text-slate-500 block">Dossier :</span> <span className="text-slate-200">{scenario.id}</span></div>
              <div><span className="text-slate-500 block">Sévérité :</span> <span className="text-amber-400">{scenario.difficulty}</span></div>
              <div><span className="text-slate-500 block">Score :</span> <span className="text-cyan-400 font-bold">{percentage}%</span></div>
              <div><span className="text-slate-500 block">Temps :</span> <span className="text-slate-200">{timeFormatted}</span></div>
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <pre className="whitespace-pre-wrap font-mono text-slate-300 leading-relaxed text-xs">
              {reportMarkdown}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Award className="w-4 h-4 text-yellow-400" /> Export conforme aux standards de documentation SOC
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié !' : 'Copier Markdown'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
