import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  Trophy, 
  Flame, 
  CheckCircle, 
  Layers, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { socScenarios } from '../../data/soc';
import ScenarioCard from '../../components/shared/ScenarioCard';
import { useProgressStore } from '../../stores/useProgressStore';

export default function SOCDashboard() {
  const navigate = useNavigate();
  const { isCompleted, getBestScore, totalScore, streak, getCompletionRate } = useProgressStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const completionRate = getCompletionRate(socScenarios.length);

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(socScenarios.map((s) => s.category)))];
  }, []);

  const filteredScenarios = useMemo(() => {
    return socScenarios.filter((scenario) => {
      const matchesCategory = selectedCategory === 'all' || scenario.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || scenario.difficulty === selectedDifficulty;
      
      if (!matchesCategory || !matchesDifficulty) return false;

      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();

      return (
        scenario.id.toLowerCase().includes(term) ||
        scenario.titleKey.toLowerCase().includes(term) ||
        scenario.descriptionKey.toLowerCase().includes(term) ||
        scenario.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
        scenario.mitreTechniques?.some((tech) => tech.toLowerCase().includes(term))
      );
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  // Determine Analyst Rank
  const getAnalystRank = (score: number) => {
    if (score >= 600) return { title: 'Lead Architecte SOC', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (score >= 350) return { title: 'Analyste SOC Tier 2', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
    if (score >= 100) return { title: 'Analyste SOC Tier 1', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    return { title: 'Analyste Junior en Formation', color: 'text-slate-400', bg: 'bg-slate-800/80 border-slate-700/60' };
  };

  const rank = getAnalystRank(totalScore);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Command Center Header */}
      <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/80 border border-slate-800/80 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Subtle decorative glow orb */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mt-20"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mb-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              POSTE DE GARDE SOC OPÉRATIONNEL • TIER 1 & 2
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Simulateur de{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Shifts SOC Réalistes
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Entraînez-vous aux véritables missions d'un Security Operations Center : investigation d'alertes SIEM, analyse de campagnes de phishing, détection de C2 beaconing et réponse à incident ransomware.
            </p>
          </div>

          {/* Quick Analyst Profile Badge */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex flex-col gap-3 min-w-[260px] shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>PROFIL ANALYSTE</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${rank.bg} ${rank.color}`}>
                {rank.title}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold font-mono text-emerald-400">{totalScore}</span>
                <span className="text-xs text-slate-500 font-mono">points d'expérience</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (totalScore / 600) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/60">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scénarios</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              {socScenarios.length} <span className="text-xs text-slate-500 font-normal">cas</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Complétion</span>
            </div>
            <div className="text-2xl font-bold font-mono text-cyan-400">
              {completionRate}%
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Série de Shifts</span>
            </div>
            <div className="text-2xl font-bold font-mono text-amber-400">
              {streak} <span className="text-xs text-slate-500 font-normal">jours</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>Score Total</span>
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {totalScore} <span className="text-xs text-slate-500 font-normal">pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Command Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par titre, MITRE, mot-clé (ex: RDP, T1071)..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Badges & Difficulty Selector */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat === 'all' ? 'Tous' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-950/60 px-2 py-1 rounded-xl border border-slate-800/80 text-xs font-mono text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer py-1"
            >
              <option value="all" className="bg-slate-900 text-slate-200">Toutes Difficultés</option>
              <option value="easy" className="bg-slate-900 text-slate-200">Facile</option>
              <option value="medium" className="bg-slate-900 text-slate-200">Moyen</option>
              <option value="hard" className="bg-slate-900 text-slate-200">Difficile</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      {filteredScenarios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario) => {
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
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300 font-mono">Aucun scénario trouvé</h3>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            Aucun incident ne correspond à votre recherche "{searchTerm}". Essayez de réinitialiser vos filtres.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-mono transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
