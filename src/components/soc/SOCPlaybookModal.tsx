import { useState } from 'react';
import { BookOpen, X, ShieldAlert, CheckSquare, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface SOCPlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export default function SOCPlaybookModal({ isOpen, onClose }: SOCPlaybookModalProps) {
  const [activeTab, setActiveTab] = useState<'phishing' | 'bruteforce' | 'ransomware' | 'c2'>('bruteforce');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Playbooks & Procédures SOC (SOP)</h3>
              <p className="text-xs text-slate-400">Guides d'investigation et procédures d'escalade normalisées</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2 overflow-x-auto text-xs font-mono">
          {[
            { id: 'bruteforce', label: '1. Brute Force (SIEM)' },
            { id: 'phishing', label: '2. Email Phishing' },
            { id: 'c2', label: '3. Beaconing C2' },
            { id: 'ransomware', label: '4. Ransomware Containment' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-400 text-emerald-400 bg-slate-800/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'bruteforce' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <h4 className="font-bold text-emerald-400 flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4" /> Procédure de Triage : Brute Force & Échecs d'Authentification
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Appliqué aux attaques par dictionnaire ou pulvérisation de mots de passe ciblant RDP (port 3389), SSH (port 22) ou Kerberos/Active Directory.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">Checklist d'investigation :</h5>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Identifier l'IP source :</strong> Vérifier la réputation sur AbuseIPDB, VirusTotal et Shodan. Est-ce un VPN public, un nœud Tor ou une IP cloud ?</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Vérifier les connexions réussies :</strong> Y a-t-il un Event ID 4624 (Logon réussi) immédiatement après des séries de 4625 (Échecs) depuis la même IP ? Si oui, alerte critique immédiate !</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Mesures de remédiation :</strong> Bloquer l'IP source au pare-feu périmétrique, réinitialiser le mot de passe du compte ciblé, forcer l'authentification MFA.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'phishing' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <h4 className="font-bold text-cyan-400 flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4" /> Procédure Phishing & Fraude au CEO (BEC)
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Guide d'inspection pour les emails frauduleux, usurpations d'identité et pièces jointes armées.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">Points de contrôle des En-têtes :</h5>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Authentification SPF / DKIM / DMARC :</strong> Un <code>softfail</code> ou <code>fail</code> SPF indique que l'émetteur n'est pas autorisé par le propriétaire du domaine.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Adresse Reply-To versus From :</strong> Dans une fraude au CEO (BEC), le champ Display Name imite le dirigeant, mais le Reply-To redirige vers une boîte externe (ex: gmail, proton, ou domaine typo-squatté).</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Analyse de l'URL :</strong> Ne jamais cliquer directement ! Analyser sur urlscan.io ou VirusTotal. Rechercher les pages de login usurpées (M365, Google Workspace).</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'c2' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                <h4 className="font-bold text-yellow-400 flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4" /> Détection de Command & Control (C2 Beaconing)
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Analyse des communications périodiques entre un malware résident et l'infrastructure de l'attaquant.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">Indicateurs clés de Beaconing :</h5>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckSquare className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span><strong>Régularité des intervalles (Faible Jitter) :</strong> Des requêtes sortantes toutes les exactes 60s, 30s ou 5min indiquent un processus automatisé de heartbeat.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckSquare className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span><strong>Tailles des paquets uniformes :</strong> Des échanges HTTP POST ou DNS de tailles quasiment identiques traduisent des signaux d'attente d'instructions.</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <CheckSquare className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span><strong>Action immédiate :</strong> Isoler le poste endpoint infecté du LAN, extraire la mémoire vive (dump RAM) avant extinction.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'ransomware' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <h4 className="font-bold text-rose-400 flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4" /> Procédure d'Urgence : Attaque Ransomware
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Actions prioritaires dans les 15 premières minutes suivant la détection d'un chiffrement actif ou d'une note de rançon.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800 space-y-1">
                  <div className="font-bold text-rose-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" /> 1. Isolation Réseau Immédiate
                  </div>
                  <p className="text-slate-400">Débrancher le câble Ethernet, désactiver le Wi-Fi, isoler le segment VLAN via le commutateur.</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" /> 2. Ne Pas Éteindre la Machine
                  </div>
                  <p className="text-slate-400">Mettre en veille prolongée ou figer la VM pour conserver la clé de chiffrement présente dans la mémoire RAM.</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800 space-y-1">
                  <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" /> 3. Bloquer les C2 et Partages
                  </div>
                  <p className="text-slate-400">Couper les partages SMB réseau pour stopper la propagation latérale vers les sauvegardes et serveurs de fichiers.</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5" /> 4. Escalade CERT & Juridique
                  </div>
                  <p className="text-slate-400">Notifier le RSSI, documenter les artéfacts pour le rapport légal (CNIL / ANSSI sous 72h).</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> SOC Level 1 & Level 2 Guidelines
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Fermer le Guide
          </button>
        </div>
      </div>
    </div>
  );
}
