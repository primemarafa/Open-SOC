import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, CheckCircle2, Target } from 'lucide-react';
import type { Scenario } from '../../types/scenario';
import DifficultyBadge from './DifficultyBadge';

interface ScenarioCardProps {
  scenario: Scenario;
  onClick: (id: string) => void;
  isCompleted?: boolean;
  bestScore?: number;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  onClick,
  isCompleted = false,
  bestScore,
}) => {
  const { t } = useTranslation(['common', scenario.module]);

  return (
    <div
      onClick={() => onClick(scenario.id)}
      className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all cursor-pointer relative overflow-hidden group flex flex-col h-full"
    >
      {isCompleted && (
        <div className="absolute top-4 right-4 flex items-center space-x-2 text-green-400">
          <CheckCircle2 className="w-5 h-5" />
          {bestScore !== undefined && (
            <span className="font-bold">{bestScore}%</span>
          )}
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <DifficultyBadge difficulty={scenario.difficulty} />
      </div>

      <h3 className="text-xl font-bold text-gray-100 mb-2">
        {t(scenario.titleKey, { defaultValue: scenario.id })}
      </h3>
      
      <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
        {t(scenario.descriptionKey, { defaultValue: '' })}
      </p>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {scenario.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{scenario.estimatedTime} {t('common.minutes', { defaultValue: 'min' })}</span>
          </div>
          {scenario.mitreTechniques && scenario.mitreTechniques.length > 0 && (
            <div className="flex items-center space-x-1">
              <Target className="w-4 h-4" />
              <span>{scenario.mitreTechniques.length} Techniques</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
