import type { Question } from '../types/scenario';

export function calculateScore(
  questions: Question[],
  answers: Record<string, string | string[]>
): { score: number; maxScore: number; details: Record<string, boolean> } {
  let score = 0;
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
  const details: Record<string, boolean> = {};

  for (const question of questions) {
    const answer = answers[question.id];
    const correct = question.correctAnswer;
    let isCorrect = false;

    if (Array.isArray(correct) && Array.isArray(answer)) {
      isCorrect = correct.length === answer.length && 
        correct.every(c => answer.includes(c));
    } else if (typeof correct === 'string' && typeof answer === 'string') {
      isCorrect = answer.toLowerCase().trim() === correct.toLowerCase().trim();
    }

    if (isCorrect) {
      score += question.points;
    }
    details[question.id] = isCorrect;
  }

  return { score, maxScore, details };
}

export function getGrade(percentage: number): { grade: string; color: string; emoji: string } {
  if (percentage >= 90) return { grade: 'A+', color: 'text-emerald-500', emoji: '🏆' };
  if (percentage >= 80) return { grade: 'A', color: 'text-emerald-400', emoji: '⭐' };
  if (percentage >= 70) return { grade: 'B', color: 'text-blue-500', emoji: '👍' };
  if (percentage >= 60) return { grade: 'C', color: 'text-yellow-500', emoji: '📝' };
  if (percentage >= 50) return { grade: 'D', color: 'text-orange-500', emoji: '💪' };
  return { grade: 'F', color: 'text-red-500', emoji: '📚' };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
