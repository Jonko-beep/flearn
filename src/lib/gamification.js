// XP + streak engine. Module-level store (not a context) so plain hooks like
// usePortfolio and page handlers can fire awards, while any component can
// subscribe reactively via useGamification().
//
// localStorage:
//   flearn_xp     { total, events: [{ amount, reason, key, date }] }
//   flearn_streak { current, best, lastActionDate }  (calendar dates only)

import { useSyncExternalStore } from "react";

const XP_KEY = "flearn_xp";
const STREAK_KEY = "flearn_streak";
export const XP_PER_LEVEL = 500;

const LEVEL_TITLES = [
  "Curious Cub",
  "Saving Squirrel",
  "Budgeting Bear",
  "Walrus of Wall Street",
  "Munger Mode",
];

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — awards still work in-session, they just won't persist
  }
}

let state = {
  xp: { total: 0, events: [], ...readJson(XP_KEY) },
  streak: { current: 0, best: 0, lastActionDate: null, ...readJson(STREAK_KEY) },
};

const listeners = new Set();
const toastListeners = new Set();

function notify() {
  for (const fn of listeners) fn();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getState() {
  return state;
}

/** Reactive snapshot of { xp, streak } for components. */
export function useGamification() {
  return useSyncExternalStore(subscribe, getState);
}

/** Toast stream: cb({ amount, reason }) fires whenever XP is actually awarded. */
export function onXpToast(cb) {
  toastListeners.add(cb);
  return () => toastListeners.delete(cb);
}

function localDateString(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function yesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localDateString(d);
}

/**
 * Count a meaningful action (quiz attempt, trade, budget completion) toward
 * the daily streak. Compares calendar dates only, never hours.
 */
export function recordAction() {
  const today = localDateString();
  const s = state.streak;
  if (s.lastActionDate === today) return;
  const current = s.lastActionDate === yesterdayString() ? s.current + 1 : 1;
  const streak = { current, best: Math.max(s.best, current), lastActionDate: today };
  writeJson(STREAK_KEY, streak);
  state = { ...state, streak };
  notify();
}

/**
 * Award XP. Pass a onceKey to make the award one-time-ever (guarded against
 * the persisted events log). Returns true if XP was actually granted.
 */
export function awardXp(amount, reason, onceKey = null) {
  if (onceKey && state.xp.events.some((e) => e.key === onceKey)) return false;
  const event = { amount, reason, key: onceKey, date: new Date().toISOString() };
  const xp = { total: state.xp.total + amount, events: [...state.xp.events, event] };
  writeJson(XP_KEY, xp);
  state = { ...state, xp };
  notify();
  for (const fn of toastListeners) fn({ amount, reason });
  return true;
}

export function levelInfo(totalXp) {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const intoLevel = totalXp % XP_PER_LEVEL;
  return {
    level,
    title: LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length) - 1],
    intoLevel,
    toNext: XP_PER_LEVEL - intoLevel,
    pct: (intoLevel / XP_PER_LEVEL) * 100,
  };
}

/** The streak to show: 0 if it's already broken (last action before yesterday). */
export function displayStreak(streak) {
  const last = streak.lastActionDate;
  return last === localDateString() || last === yesterdayString() ? streak.current : 0;
}
