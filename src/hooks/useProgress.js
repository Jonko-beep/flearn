import { useCallback, useState } from "react";
import { categories, MASTERY_THRESHOLD } from "../data/curriculum.js";

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

  const recordAttempt = useCallback((lessonId, score) => {
    setProgress((prev) => {
      const existing = prev[lessonId];
      const bestScore = Math.max(existing?.bestScore ?? 0, score);
      const next = {
        ...prev,
        [lessonId]: {
          completed: bestScore >= MASTERY_THRESHOLD,
          bestScore,
          attempts: (existing?.attempts ?? 0) + 1,
          lastAttempt: new Date().toISOString(),
        },
      };
      writeProgress(next);
      return next;
    });
  }, []);

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
