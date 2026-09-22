import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScenarioResult, UserProgress } from '../types/scenario';

interface ProgressState extends UserProgress {
  addResult: (result: ScenarioResult) => void;
  getScenarioResult: (scenarioId: string) => ScenarioResult | undefined;
  isCompleted: (scenarioId: string) => boolean;
  getBestScore: (scenarioId: string) => number;
  getCompletionRate: (totalScenarios: number) => number;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedScenarios: {},
      totalScore: 0,
      streak: 0,
      lastActive: new Date().toISOString(),
      
      addResult: (result) => set((state) => {
        const existing = state.completedScenarios[result.scenarioId];
        const isNewBest = !existing || result.score > existing.score;
        const newCompleted = {
          ...state.completedScenarios,
          [result.scenarioId]: isNewBest ? result : existing,
        };
        const totalScore = Object.values(newCompleted).reduce(
          (sum, r) => sum + r.score, 0
        );
        return {
          completedScenarios: newCompleted,
          totalScore,
          lastActive: new Date().toISOString(),
        };
      }),
      
      getScenarioResult: (scenarioId) => get().completedScenarios[scenarioId],
      isCompleted: (scenarioId) => !!get().completedScenarios[scenarioId],
      getBestScore: (scenarioId) => {
        const result = get().completedScenarios[scenarioId];
        return result ? Math.round((result.score / result.maxScore) * 100) : 0;
      },
      getCompletionRate: (totalScenarios) => {
        const completed = Object.keys(get().completedScenarios).length;
        return totalScenarios > 0 ? Math.round((completed / totalScenarios) * 100) : 0;
      },
      resetProgress: () => set({
        completedScenarios: {},
        totalScore: 0,
        streak: 0,
        lastActive: new Date().toISOString(),
      }),
    }),
    { name: 'cybersec-training-progress' }
  )
);
