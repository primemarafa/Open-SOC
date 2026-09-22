import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Difficulty } from '../../types/scenario';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const { t } = useTranslation();

  const getStyle = () => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-md border ${getStyle()} flex items-center justify-center`}
    >
      {t(`difficulty.${difficulty}`, { defaultValue: difficulty.toUpperCase() })}
    </span>
  );
};

export default DifficultyBadge;
