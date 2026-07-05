import { useCallback, useState } from "react";
import { categories, MASTERY_THRESHOLD } from "../data/curriculum.js";
import { awardXp, recordAction } from "../lib/gamification.js";

const STORAGE_KEY = "flearn_progress";

function readProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage unavailable (private mode, quota) — progress just won't persist
  }
}

/**
 * Progress persistence + computed stats.
 *
 * Shape in localStorage under `flearn_progress`:
 * { [lessonId]: { completed, bestScore, attempts, lastAttempt } }
 */
export function useProgress() {
  const [progress, setProgress] = useState(readProgress);

  const recordAttempt = useCallback(
    (lessonId, score) => {
      const existing = progress[lessonId];
      const wasCompleted = existing?.completed ?? false;
      const prevBest = existing?.bestScore ?? 0;
      const bestScore = Math.max(prevBest, score);
      const next = {
        ...progress,
        [lessonId]: {
          completed: bestScore >= MASTERY_THRESHOLD,
          bestScore,
          attempts: (existing?.attempts ?? 0) + 1,
          lastAttempt: new Date().toISOString(),
        },
      };
      writeProgress(next);
      setProgress(next);

      recordAction(); // any quiz attempt counts toward the daily streak
      if (!wasCompleted && bestScore >= MASTERY_THRESHOLD) {
        awardXp(100, "Lesson Mastered!", `mastered:${lessonId}`);
      } else if (wasCompleted && score > prevBest) {
        awardXp(20, "New Best Score!");
      }
    },
    [progress]
  );

  const getLessonProgress = useCallback(
    (lessonId) => progress[lessonId] ?? null,
    [progress]
  );

  const getCategoryStats = useCallback(
    (category) => {
      const unlocked = category.lessons.filter((l) => !l.locked);
      const mastered = unlocked.filter((l) => progress[l.id]?.completed).length;
      return { total: unlocked.length, mastered };
    },
    [progress]
  );

  const totalLessons = categories.reduce(
    (sum, c) => sum + c.lessons.filter((l) => !l.locked).length,
    0
  );
  const masteredCount = Object.values(progress).filter((p) => p.completed).length;
  const overallPercent =
    totalLessons > 0 ? Math.round((masteredCount / totalLessons) * 100) : 0;

  return {
    progress,
    recordAttempt,
    getLessonProgress,
    getCategoryStats,
    totalLessons,
    masteredCount,
    overallPercent,
  };
}
