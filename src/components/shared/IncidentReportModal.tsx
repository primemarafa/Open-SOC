import { useState } from 'react';
import { FileText, Copy, Check, Download, X, Shield, Award, Printer } from 'lucide-react';
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

  const handlePrintPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Rapport d'Incident SOC - INC-${scenario.id.toUpperCase()}</title>
        <style>
          @page { size: A4; margin: 18mm; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            line-height: 1.5;
            font-size: 13px;
            margin: 0;
            padding: 0;
          }
          .header-banner {
            border-bottom: 2px solid #0f172a;
            padding-bottom: 12px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .title {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 4px 0;
          }
          .badge-tlp {
            display: inline-block;
            background: #fff7ed;
            color: #c2410c;
            border: 1px solid #fdba74;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 700;
            font-size: 11px;
            font-family: monospace;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 20px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px;
          }
          .meta-item span {
            display: block;
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
          }
          .meta-item strong {
            font-size: 14px;
            color: #0f172a;
          }
          h2 {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
            border-left: 4px solid #10b981;
            padding-left: 8px;
            margin: 20px 0 10px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .mitre-tags {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            margin-bottom: 15px;
          }
          .mitre-pill {
            background: #ecfdf5;
            color: #047857;
            border: 1px solid #a7f3d0;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-family: monospace;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #e2e8f0;
            padding: 8px 10px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background: #f1f5f9;
            color: #475569;
            font-weight: 600;
          }
          .ans-code {
            font-family: monospace;
            background: #f1f5f9;
            padding: 1px 4px;
            border-radius: 3px;
          }
          .footer-sign {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #cbd5e1;
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #64748b;
          }
          .seal {
            border: 2px dashed #94a3b8;
            padding: 8px 16px;
            border-radius: 6px;
            text-align: center;
            font-weight: 700;
            color: #475569;
          }
        </style>
      </head>
      <body>
        <div class="header-banner">
          <div>
            <div class="badge-tlp">TLP:AMBER+STRICT • CONFIDENTIEL CIRT</div>
            <h1 class="title">Rapport d'Incident de Sécurité (CIRT)</h1>
            <div style="font-family: monospace; color: #64748b; font-size: 11px;">
              Dossier : INC-${scenario.id.toUpperCase()}-${new Date().getFullYear()} • Open-SOC Shift Platform
            </div>
          </div>
          <div style="text-align: right; font-size: 11px; color: #64748b;">
            Date d'évaluation : <strong>${dateStr}</strong><br>
            Analyste : <strong>Tier 1 / Tier 2 Responder</strong>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-item">
            <span>Scénario d'Incident</span>
            <strong>${scenario.id}</strong>
          </div>
          <div class="meta-item">
            <span>Classification</span>
            <strong style="text-transform: uppercase;">${scenario.difficulty}</strong>
          </div>
          <div class="meta-item">
            <span>Score d'Investigation</span>
            <strong style="color: #047857;">${score} / ${maxScore} (${percentage}%)</strong>
          </div>
          <div class="meta-item">
            <span>Temps d'Intervention</span>
            <strong>${timeFormatted}</strong>
          </div>
        </div>

        <h2>1. Synthèse de l'Analyse Opérationnelle</h2>
        <p style="margin: 0 0 10px 0;">
          L'investigation de sécurité a permis de qualifier un incident de type <strong>${scenario.category.toUpperCase()}</strong>.
          L'analyste a corrélé les alertes SIEM avec la télémétrie des équipements pour identifier les indicateurs de compromission (IOCs) et vérifier l'efficacité des mesures de détection.
        </p>

        <h2>2. Couverture Tactique MITRE ATT&CK</h2>
        <div class="mitre-tags">
          ${scenario.mitreTechniques?.map(t => `<span class="mitre-pill">${t}</span>`).join('') || '<span>Non spécifié</span>'}
        </div>

        <h2>3. Détails des Questions et Réponses de l'Analyste</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 10%;">#</th>
              <th style="width: 50%;">Question Technique</th>
              <th style="width: 40%;">Réponse de l'Analyste</th>
            </tr>
          </thead>
          <tbody>
            ${scenario.questions.map((q, idx) => `
              <tr>
                <td><strong>Q${idx + 1}</strong></td>
                <td>${q.questionKey}</td>
                <td><span class="ans-code">${answers[q.id] || 'Non renseigné'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>4. Plan de Remédiation & Actions Immédiates</h2>
        <ol style="margin: 0; padding-left: 20px;">
          <li><strong>Isolement & Confinement :</strong> Blocage sur périmètre (Firewall/EDR) des adresses IP et artefacts malveillants identifiés.</li>
          <li><strong>Révocation des Accès :</strong> Réinitialisation immédiate des identifiants et révocation des tokens de session compromis.</li>
          <li><strong>Durcissement :</strong> Déploiement de règles de détection comportementales (SIGMA / Yara) pour prévenir la récidive.</li>
        </ol>

        <div class="footer-sign">
          <div>
            Document officiel certifié généré par la plateforme <strong>Open-SOC</strong>.<br>
            Empreinte de validation : <code>SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}</code>
          </div>
          <div class="seal">
            SOCIÉTÉ / CERT<br>DOSSIER CLÔTURÉ
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-mono">
                Rapport d'Incident Formel : INC-{scenario.id.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-400">Génération automatique prête pour export PDF ou portfolio</p>
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
              <div><span className="text-slate-500 block">Score :</span> <span className="text-emerald-400 font-bold">{percentage}%</span></div>
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
            <Award className="w-4 h-4 text-emerald-400" /> Export conforme aux standards de documentation SOC
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié !' : 'Copier'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.md</span>
            </button>
            <button
              onClick={handlePrintPDF}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
