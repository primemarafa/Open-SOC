import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Network, AlertTriangle, Bug, FileCode, Brain } from 'lucide-react';
import { socScenarios } from '../../data/soc';
import ScenarioCard from '../../components/shared/ScenarioCard';
import { useProgressStore } from '../../stores/useProgressStore';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'siem': return <ShieldAlert className="w-6 h-6 text-blue-500" />;
    case 'phishing': return <Mail className="w-6 h-6 text-yellow-500" />;
    case 'network': return <Network className="w-6 h-6 text-green-500" />;
    case 'incident': return <AlertTriangle className="w-6 h-6 text-red-500" />;
    case 'malware': return <Bug className="w-6 h-6 text-purple-500" />;
    case 'sigma': return <FileCode className="w-6 h-6 text-orange-500" />;
    case 'threat-intel': return <Brain className="w-6 h-6 text-indigo-500" />;
    default: return <ShieldAlert className="w-6 h-6 text-gray-500" />;
  }
};

const SOCDashboard: React.FC = () => {
  const { t } = useTranslation(['soc', 'common']);
  const navigate = useNavigate();
  const isCompleted = useProgressStore((state) => state.isCompleted);
  const getBestScore = useProgressStore((state) => state.getBestScore);

  const categories = Array.from(new Set(socScenarios.map(s => s.category)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('soc:dashboard.title')}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{t('soc:dashboard.description')}</p>
      </div>

      <div className="space-y-12">
        {categories.map(category => {
          const categoryScenarios = socScenarios.filter(s => s.category === category);
          return (
            <div key={category}>
              <div className="flex items-center space-x-3 mb-6">
                {getCategoryIcon(category)}
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 capitalize">
                  {t(`soc:categories.${category}`)}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryScenarios.map(scenario => {
                  const completed = isCompleted(scenario.id);
                  const bestScore = getBestScore(scenario.id);
                  return (
                    <ScenarioCard
                      key={scenario.id}
                      scenario={scenario}
                      isCompleted={completed}
                      bestScore={bestScore}
                      onClick={() => navigate(`/scenario/${scenario.id}`)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SOCDashboard;
