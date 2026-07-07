// Achievement unlock engine. checkAchievements() runs after any XP-earning
// event, evaluates every locked achievement's condition against localStorage,
// and awards new unlocks exactly once (persisted with dates under
// "flearn_achievements"). Same module-level-store pattern as gamification.js
// so any component can subscribe via useAchievements().
//
// localStorage:
//   flearn_achievements { [achievementId]: { date } }
//   flearn_tools        { [toolId]: true }  (which tools have been used)

import { useSyncExternalStore } from "react";
import { achievements } from "../data/achievements.js";
import { categories } from "../data/curriculum.js";
import { awardXp } from "./gamification.js";

const UNLOCKS_KEY = "flearn_achievements";
const TOOLS_KEY = "flearn_tools";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — unlocks still work in-session, they just won't persist
  }
}

let unlocks = readJson(UNLOCKS_KEY, {});

const listeners = new Set();
const toastListeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Reactive snapshot of { [achievementId]: { date } } for components. */
export function useAchievements() {
  return useSyncExternalStore(subscribe, () => unlocks);
}

/** Toast stream: cb(achievement) fires whenever an achievement unlocks. */
export function onAchievementToast(cb) {
  toastListeners.add(cb);
  return () => toastListeners.delete(cb);
}

// ── Condition evaluators ──────────────────────────────────────────────
// Each receives a fresh snapshot of persisted app state. Parameterized
// conditions ("categoryMastered:investing") pass the part after the colon.

const masteredCount = (progress) =>
  Object.values(progress).filter((p) => p.completed).length;

const EVALUATORS = {
  firstLessonMastered: (s) => masteredCount(s.progress) >= 1,
  perfectQuiz: (s) => Object.values(s.progress).some((p) => p.bestScore === 100),
  firstTrade: (s) => (s.portfolio?.transactions?.length ?? 0) > 0,
  diversified: (s) => Object.keys(s.portfolio?.holdings ?? {}).length >= 5,
  budgetComplete: (s) => Boolean(s.budget?.completedAt),
  streak7: (s) => (s.streak?.best ?? 0) >= 7,
  streak30: (s) => (s.streak?.best ?? 0) >= 30,
  categoryMastered: (s, categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    const unlocked = category?.lessons.filter((l) => !l.locked) ?? [];
    return (
      unlocked.length > 0 && unlocked.every((l) => s.progress[l.id]?.completed)
    );
  },
  usedTool: (s, toolId) => Boolean(s.tools?.[toolId]),
  lessonsMastered: (s, n) => masteredCount(s.progress) >= Number(n),
};

function readAppState() {
  return {
    progress: readJson("flearn_progress", {}),
    portfolio: readJson("flearn_portfolio", null),
    streak: readJson("flearn_streak", null),
    budget: readJson("flearn_budget", null),
    tools: readJson(TOOLS_KEY, {}),
  };
}

/**
 * Evaluate all locked achievements against current state and unlock any
 * whose condition now holds: persist the unlock, grant the XP bonus through
 * the existing XP system, and fire the achievement toast.
 */
export function checkAchievements() {
  const state = readAppState();
  let changed = false;

  for (const achievement of achievements) {
    if (unlocks[achievement.id]) continue;
    const [key, param] = achievement.condition.split(":");
    const evaluate = EVALUATORS[key];
    if (!evaluate?.(state, param)) continue;

    unlocks = { ...unlocks, [achievement.id]: { date: new Date().toISOString() } };
    changed = true;
    // silent: the gold achievement toast already announces the bonus
    awardXp(achievement.xpBonus, achievement.title, `achievement:${achievement.id}`, {
      silent: true,
    });
    for (const fn of toastListeners) fn(achievement);
  }

  if (changed) {
    writeJson(UNLOCKS_KEY, unlocks);
    for (const fn of listeners) fn();
  }
}

/** Record that a tool was used (e.g. "compound"), then re-check unlocks. */
export function markToolUsed(toolId) {
  const tools = readJson(TOOLS_KEY, {});
  if (!tools[toolId]) writeJson(TOOLS_KEY, { ...tools, [toolId]: true });
  checkAchievements();
}
