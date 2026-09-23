import { useTranslation } from 'react-i18next';
import { Clock, CheckCircle2, Target, ArrowRight, ShieldAlert, Mail, Network, AlertTriangle, Bug, FileCode, Brain } from 'lucide-react';
import type { Scenario } from '../../types/scenario';
import DifficultyBadge from './DifficultyBadge';

interface ScenarioCardProps {
  scenario: Scenario;
  onClick: (id: string) => void;
  isCompleted?: boolean;
  bestScore?: number;
}

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'siem': return <ShieldAlert className="w-4 h-4 text-emerald-400" />;
    case 'phishing': return <Mail className="w-4 h-4 text-cyan-400" />;
    case 'network': return <Network className="w-4 h-4 text-blue-400" />;
    case 'incident': return <AlertTriangle className="w-4 h-4 text-rose-400" />;
    case 'malware': return <Bug className="w-4 h-4 text-purple-400" />;
    case 'sigma': return <FileCode className="w-4 h-4 text-amber-400" />;
    case 'threat-intel': return <Brain className="w-4 h-4 text-indigo-400" />;
    default: return <ShieldAlert className="w-4 h-4 text-emerald-400" />;
  }
};

export default function ScenarioCard({
  scenario,
  onClick,
  isCompleted = false,
  bestScore,
}: ScenarioCardProps) {
  const { t } = useTranslation(['common', scenario.module]);

  return (
    <div
      onClick={() => onClick(scenario.id)}
      className="group relative flex flex-col h-full bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)] hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Top subtle ambient highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/70 transition-all duration-500"></div>

      {/* Header Row: Category Badge + Difficulty + Status */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-800/90 border border-slate-700/60 flex items-center justify-center">
            {getCategoryIcon(scenario.category)}
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            {t(`categories.${scenario.category}`, { defaultValue: scenario.category })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={scenario.difficulty} />
          {isCompleted && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{bestScore !== undefined ? `${bestScore}%` : 'Complété'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors mb-2.5 leading-snug">
        {t(scenario.titleKey, { defaultValue: scenario.id })}
      </h3>
      
      {/* Description */}
      <p className="text-slate-400 text-xs leading-relaxed mb-5 flex-grow line-clamp-2">
        {t(scenario.descriptionKey, { defaultValue: '' })}
      </p>

      {/* MITRE Tags / Pills */}
      <div className="mt-auto space-y-4">
        {scenario.mitreTechniques && scenario.mitreTechniques.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {scenario.mitreTechniques.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50 rounded-md"
              >
                {tag}
              </span>
            ))}
            {scenario.mitreTechniques.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800/40 text-slate-500 rounded-md">
                +{scenario.mitreTechniques.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer Meta: Time, Questions, Action Link */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3.5 border-t border-slate-800/70 font-mono">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{scenario.estimatedTime} {t('common.minutes', { defaultValue: 'min' })}</span>
            </div>
            {scenario.questions && (
              <div className="flex items-center gap-1 text-slate-500">
                <Target className="w-3.5 h-3.5" />
                <span>{scenario.questions.length} Q</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
            <span>Démarrer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
