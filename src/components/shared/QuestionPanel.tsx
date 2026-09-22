import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Send, Lightbulb, HelpCircle } from 'lucide-react';
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
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

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

  const toggleHint = (qId: string) => {
    setRevealedHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
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
                className={`flex items-center p-3.5 rounded-xl border cursor-pointer transition-all ${
                  answers[currentQ.id] === opt.value
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-medium shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 text-slate-300'
                } ${showResults ? 'pointer-events-none' : ''}`}
              >
                <input
                  type="radio"
                  name={currentQ.id}
                  value={opt.value}
                  checked={answers[currentQ.id] === opt.value}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-4 h-4 text-emerald-500 border-slate-700 bg-slate-800 focus:ring-emerald-500"
                  disabled={showResults}
                />
                <span className="ml-3 text-sm">
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
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all disabled:opacity-50 font-mono"
              placeholder={t('common.typeAnswer', { defaultValue: 'Saisissez votre réponse ici...' })}
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
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:border-emerald-500 outline-none disabled:opacity-50 font-mono"
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 flex flex-col h-full font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 border-b border-slate-800 pb-3">
        <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs">
            Q{currentIdx + 1}
          </span>
          <span>{t('common.question', { defaultValue: 'Question' })} {currentIdx + 1}</span>
          <span className="text-slate-500 text-xs font-normal">/ {questions.length}</span>
        </h2>
        
        {showResults ? (
          <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
            results[currentQ.id] ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}>
            {results[currentQ.id] ? (
              <><CheckCircle2 className="w-3.5 h-3.5" /> <span>{t('common.correct', { defaultValue: 'Correct (+ points)' })}</span></>
            ) : (
              <><XCircle className="w-3.5 h-3.5" /> <span>{t('common.incorrect', { defaultValue: 'Incorrect' })}</span></>
            )}
          </div>
        ) : (
          <span className="text-xs font-mono text-slate-400">
            Valeur : <strong className="text-emerald-400">{currentQ.points || 25} pts</strong>
          </span>
        )}
      </div>

      {/* Question Content */}
      <div className="flex-grow overflow-y-auto pr-1 space-y-4">
        <p className="text-base text-slate-200 font-semibold leading-relaxed">
          {t(currentQ.questionKey, { defaultValue: currentQ.questionKey })}
        </p>
        
        {renderQuestionInput()}

        {/* Hints feature */}
        {!showResults && (
          <div className="pt-2">
            <button
              onClick={() => toggleHint(currentQ.id)}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{revealedHints[currentQ.id] ? 'Masquer l\'indice' : 'Besoin d\'un indice ?'}</span>
            </button>

            {revealedHints[currentQ.id] && (
              <div className="mt-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed font-sans animate-in fade-in">
                💡 <strong>Conseil d'analyste :</strong> Examinez attentivement les horodatages, les adresses IP d'origine ainsi que les valeurs des champs clés dans les évidences pour repérer toute anomalie statistique.
              </div>
            )}
          </div>
        )}

        {/* Results Feedback */}
        {showResults && (
          <div className={`mt-5 p-4 rounded-xl border ${
            results[currentQ.id] ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'
          }`}>
            <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-slate-200 mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              {t('common.explanation', { defaultValue: 'Explication Technique' })} :
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {t(currentQ.explanationKey, { defaultValue: 'Aucune explication renseignée.' })}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="flex items-center px-3.5 py-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t('common.previous', { defaultValue: 'Précédent' })}
        </button>

        {!showResults && currentIdx === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="flex items-center px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all font-mono font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 mr-2" />
            {t('common.submit', { defaultValue: 'Valider le Shift' })}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIdx === questions.length - 1}
            className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors font-mono text-xs cursor-pointer disabled:opacity-40"
          >
            {t('common.next', { defaultValue: 'Suivant' })}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionPanel;
