export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple-choice' | 'true-false' | 'classification' | 'ordering' | 'free-text';
export type ModuleType = 'soc' | 'forensics';

export interface Question {
  id: string;
  type: QuestionType;
  questionKey: string; // i18n key
  options?: { key: string; value: string }[];
  correctAnswer: string | string[];
  explanationKey: string; // i18n key
  points: number;
}

export interface Evidence {
  id: string;
  type: 'log' | 'email' | 'network' | 'process' | 'registry' | 'file' | 'timeline' | 'pcap' | 'browser' | 'text';
  titleKey: string;
  data: Record<string, unknown>;
}

export interface Scenario {
  id: string;
  module: ModuleType;
  category: string;
  titleKey: string;
  descriptionKey: string;
  difficulty: Difficulty;
  estimatedTime: number; // minutes
  mitreTechniques?: string[];
  evidence: Evidence[];
  questions: Question[];
  tags: string[];
}

export interface ScenarioResult {
  scenarioId: string;
  score: number;
  maxScore: number;
  timeSpent: number; // seconds
  answers: Record<string, string | string[]>;
  completedAt: string;
}

export interface UserProgress {
  completedScenarios: Record<string, ScenarioResult>;
  totalScore: number;
  streak: number;
  lastActive: string;
}
