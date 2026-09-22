import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import type { Question } from '../../types/scenario';

interface QuestionPanelProps {
  questions: Question[];
  onSubmit: (answers: Record<string, any>) => void;
  showResults: boolean;
  results: Record<string, boolean>;
  translationNamespace?: string;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  questions,
  onSubmit,
  showResults,
  results,
  translationNamespace = 'soc',
}) => {
  const { t } = useTranslation([translationNamespace, 'common']);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  const handleNext = () => {
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleAnswerChange = (value: any) => {
    if (showResults) return;
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const renderQuestionInput = () => {
    switch (currentQ.type) {
      case 'multiple-choice':
      case 'true-false':
        return (
          <div className="space-y-3 mt-4">
            {currentQ.options?.map((opt, i) => (
              <label
                key={i}
                className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                  answers[currentQ.id] === opt.value
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                } ${showResults ? 'pointer-events-none' : ''}`}
              >
                <input
                  type="radio"
                  name={currentQ.id}
                  value={opt.value}
                  checked={answers[currentQ.id] === opt.value}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-4 h-4 text-cyan-500 border-gray-600 bg-gray-700 focus:ring-cyan-500 focus:ring-offset-gray-900"
                  disabled={showResults}
                />
                <span className="ml-3 text-gray-200">
                  {t(opt.key, { defaultValue: opt.value })}
                </span>
              </label>
            ))}
          </div>
        );
      case 'free-text':
        return (
          <div className="mt-4">
            <input
              type="text"
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={showResults}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all disabled:opacity-50"
              placeholder={t('common.typeAnswer', { defaultValue: 'Type your answer here...' })}
            />
          </div>
        );
      default:
        return (
          <div className="mt-4">
            <input
              type="text"
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={showResults}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100 focus:border-cyan-500 outline-none disabled:opacity-50"
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <h2 className="text-xl font-semibold text-gray-100">
          {t('common.question', { defaultValue: 'Question' })} {currentIdx + 1}{' '}
          <span className="text-gray-500 text-sm">/ {questions.length}</span>
        </h2>
        
        {showResults && (
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
            results[currentQ.id] ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {results[currentQ.id] ? (
              <><CheckCircle2 className="w-4 h-4" /> <span>{t('common.correct', { defaultValue: 'Correct' })}</span></>
            ) : (
              <><XCircle className="w-4 h-4" /> <span>{t('common.incorrect', { defaultValue: 'Incorrect' })}</span></>
            )}
          </div>
        )}
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        <p className="text-lg text-gray-200 mb-6 leading-relaxed">
          {t(currentQ.questionKey, { defaultValue: currentQ.questionKey })}
        </p>
        
        {renderQuestionInput()}

        {showResults && (
          <div className={`mt-6 p-4 rounded-lg border ${
            results[currentQ.id] ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'
          }`}>
            <h4 className="font-semibold text-gray-200 mb-2">{t('common.explanation', { defaultValue: 'Explanation' })}:</h4>
            <p className="text-gray-300 text-sm">
              {t(currentQ.explanationKey, { defaultValue: 'No explanation provided.' })}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="flex items-center px-4 py-2 text-gray-400 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {t('common.previous', { defaultValue: 'Prev' })}
        </button>

        {!showResults && currentIdx === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium shadow-[0_0_10px_rgba(6,182,212,0.3)] cursor-pointer"
          >
            <Send className="w-4 h-4 mr-2" />
            {t('common.submit', { defaultValue: 'Submit Answers' })}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIdx === questions.length - 1}
            className="flex items-center px-4 py-2 text-gray-400 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {t('common.next', { defaultValue: 'Next' })}
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionPanel;
