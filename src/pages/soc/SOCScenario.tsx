import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSOCScenarioById } from '../../data/soc';
import EvidenceViewer from '../../components/shared/EvidenceViewer';
import QuestionPanel from '../../components/shared/QuestionPanel';
import Timer from '../../components/shared/Timer';
import { calculateScore } from '../../utils/scoring';
import { useProgressStore } from '../../stores/useProgressStore';

const SOCScenario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['soc', 'common']);
  
  const scenario = getSOCScenarioById(id || '');
  const addResult = useProgressStore((state) => state.addResult);

  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    if (!scenario) {
      navigate('/');
    }
  }, [scenario, navigate]);

  const handleSubmit = useCallback((finalAnswers: Record<string, any>) => {
    if (!scenario) return;
    
    const { score, maxScore } = calculateScore(scenario.questions, finalAnswers);
    
    addResult({
      scenarioId: scenario.id,
      score,
      maxScore,
      timeSpent,
      answers: finalAnswers,
      completedAt: new Date().toISOString()
    });

    navigate(`/results/${scenario.id}`);
  }, [scenario, timeSpent, addResult, navigate]);

  if (!scenario) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t(scenario.titleKey)}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t(scenario.descriptionKey)}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Timer initialTime={0} isRunning={true} onTimeUpdate={setTimeSpent} />
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-3/5 h-full border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <EvidenceViewer evidence={scenario.evidence} />
        </div>
        <div className="w-full lg:w-2/5 h-full overflow-y-auto bg-white dark:bg-gray-800">
          <QuestionPanel 
            questions={scenario.questions} 
            onSubmit={handleSubmit}
            showResults={false}
            results={{}}
            translationNamespace="soc"
          />
        </div>
      </main>
    </div>
  );
};

export default SOCScenario;
