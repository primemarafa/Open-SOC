import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Clock, RotateCcw, ArrowLeft, Target, CheckCircle2, XCircle } from 'lucide-react';
import { getGrade, formatTime } from '../../utils/scoring';

interface ScoreBoardProps {
  score: number;
  maxScore: number;
  timeSpent: number;
  details: Record<string, boolean>;
  onRetry: () => void;
  onBackToDashboard: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  maxScore,
  timeSpent,
  details,
  onRetry,
  onBackToDashboard,
}) => {
  const { t } = useTranslation();
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const gradeInfo = getGrade(percentage);

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-gray-800 p-8 text-center border-b border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-100 mb-2">{t('scoreboard.completed', { defaultValue: 'Scenario Completed!' })}</h2>
        <p className="text-gray-400">{t('scoreboard.subtitle', { defaultValue: 'Here is your final assessment.' })}</p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center">
            <span className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">{t('scoreboard.score', { defaultValue: 'Score' })}</span>
            <div className="text-4xl font-bold text-gray-100">
              {score} <span className="text-xl text-gray-500 font-normal">/ {maxScore}</span>
            </div>
            <div className="text-cyan-400 mt-1 font-semibold">{percentage}%</div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center">
            <span className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">{t('scoreboard.grade', { defaultValue: 'Grade' })}</span>
            <div className={`text-5xl font-extrabold ${gradeInfo.color} drop-shadow-md`}>
              {gradeInfo.emoji} {gradeInfo.grade}
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center">
            <span className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">{t('scoreboard.time', { defaultValue: 'Time Spent' })}</span>
            <div className="flex items-center text-3xl font-bold text-gray-100">
              <Clock className="w-6 h-6 mr-2 text-gray-500" />
              {formatTime(timeSpent)}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-cyan-500" />
            {t('scoreboard.breakdown', { defaultValue: 'Question Breakdown' })}
          </h3>
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <ul className="divide-y divide-gray-700">
              {Object.entries(details).map(([qId, isCorrect], idx) => (
                <li key={qId} className="p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors">
                  <span className="text-gray-300 font-medium">{t('common.question', { defaultValue: 'Question' })} {idx + 1}</span>
                  {isCorrect ? (
                    <span className="flex items-center text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1.5" /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center text-red-400 bg-red-400/10 px-3 py-1 rounded-full text-sm">
                      <XCircle className="w-4 h-4 mr-1.5" /> Incorrect
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBackToDashboard}
            className="flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 rounded-lg transition-colors font-medium cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('scoreboard.backToDash', { defaultValue: 'Back to Dashboard' })}
          </button>
          <button
            onClick={onRetry}
            className="flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            {t('scoreboard.retry', { defaultValue: 'Retry Scenario' })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
