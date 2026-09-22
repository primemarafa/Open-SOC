import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';
import { getSOCScenarioById } from '../../data/soc';
import ScoreBoard from '../../components/shared/ScoreBoard';
import IncidentReportModal from '../../components/shared/IncidentReportModal';
import { useProgressStore } from '../../stores/useProgressStore';
import { calculateScore } from '../../utils/scoring';

const SOCResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['soc', 'common']);
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  const scenario = getSOCScenarioById(id || '');
  const result = useProgressStore((state) => state.getScenarioResult(id || ''));

  if (!scenario || !result) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('common:error')}
        </h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          {t('common:back_to_dashboard')}
        </button>
      </div>
    );
  }

  const { details } = calculateScore(scenario.questions, result.answers);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('soc:results.title')} — {t(scenario.titleKey)}
          </h1>
          <p className="text-sm text-slate-400 font-mono mt-1">Dossier clôturé avec succès.</p>
        </div>

        <button
          onClick={() => setIsReportOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-xl text-sm font-bold font-mono transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Générer le Rapport d'Incident</span>
        </button>
      </div>

      <ScoreBoard 
        score={result.score}
        maxScore={result.maxScore}
        timeSpent={result.timeSpent}
        details={details}
        onRetry={() => navigate(`/scenario/${scenario.id}`)}
        onBackToDashboard={() => navigate('/')}
      />

      {scenario.mitreTechniques && scenario.mitreTechniques.length > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>{t('soc:results.mitre_techniques_covered')}</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {scenario.mitreTechniques.map(tech => (
              <span 
                key={tech}
                className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-mono font-medium border border-emerald-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Incident Report Modal */}
      <IncidentReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        scenario={scenario}
        score={result.score}
        maxScore={result.maxScore}
        timeSpent={result.timeSpent}
        answers={result.answers}
      />
    </div>
  );
};

export default SOCResults;
