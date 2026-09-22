import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSOCScenarioById } from '../../data/soc';
import ScoreBoard from '../../components/shared/ScoreBoard';
import { useProgressStore } from '../../stores/useProgressStore';
import { calculateScore } from '../../utils/scoring';

const SOCResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['soc', 'common']);
  
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
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('soc:results.title')} - {t(scenario.titleKey)}
        </h1>
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
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('soc:results.mitre_techniques_covered')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {scenario.mitreTechniques.map(tech => (
              <span 
                key={tech}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SOCResults;
