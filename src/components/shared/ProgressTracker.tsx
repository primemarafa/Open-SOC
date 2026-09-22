import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Target, TrendingUp } from 'lucide-react';

interface ProgressTrackerProps {
  completedCount: number;
  totalCount: number;
  averageScore: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  completedCount,
  totalCount,
  averageScore,
}) => {
  const { t } = useTranslation();
  
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-6">{t('dashboard.progress', { defaultValue: 'Your Progress' })}</h3>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              className="text-gray-800"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="64"
              cy="64"
            />
            <circle
              className="text-cyan-500 transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="64"
              cy="64"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-gray-100">{percentage}%</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider">{t('dashboard.completed', { defaultValue: 'Completed' })}</span>
          </div>
        </div>

        <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-col items-center justify-center text-center">
            <Target className="w-6 h-6 text-cyan-400 mb-2" />
            <span className="text-2xl font-bold text-gray-100">{completedCount} <span className="text-sm font-normal text-gray-500">/ {totalCount}</span></span>
            <span className="text-xs text-gray-400 mt-1">{t('dashboard.scenariosDone', { defaultValue: 'Scenarios Done' })}</span>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-col items-center justify-center text-center">
            <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
            <span className="text-2xl font-bold text-gray-100">{Math.round(averageScore)}%</span>
            <span className="text-xs text-gray-400 mt-1">{t('dashboard.avgScore', { defaultValue: 'Avg. Score' })}</span>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-col items-center justify-center text-center">
            <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
            <span className="text-2xl font-bold text-gray-100">
              {completedCount === totalCount && totalCount > 0 ? t('dashboard.master', { defaultValue: 'Master' }) : 
               completedCount > 0 ? t('dashboard.learner', { defaultValue: 'Learner' }) : 
               t('dashboard.novice', { defaultValue: 'Novice' })}
            </span>
            <span className="text-xs text-gray-400 mt-1">{t('dashboard.currentRank', { defaultValue: 'Current Rank' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
