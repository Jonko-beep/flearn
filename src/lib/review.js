// Spaced-repetition engine (simplified SM-2). Questions enter the queue only
// when a quiz answer is missed — review reinforces weak spots, it doesn't
// re-test everything. A wrong answer (anywhere) resets the interval to 1 day;
// a right answer during review climbs the ladder 1 → 3 → 7 → 14 → 30 days.
// Same module-level-store pattern as gamification.js so any component can
// subscribe reactively via useReview().
//
// localStorage:
//   flearn_review     { [lessonId]: { [questionId]: { correctCount, missCount, lastSeen, nextDue, intervalDays } } }
//   flearn_review_xp  { date, earned }  (daily cap on XP from review sessions)

import { useSyncExternalStore } from "react";
import { categories } from "../data/curriculum.js";
import { awardXp } from "./gamification.js";

const REVIEW_KEY = "flearn_review";
const REVIEW_XP_KEY = "flearn_review_xp";

export const INTERVAL_LADDER = [1, 3, 7, 14, 30];
export const REVIEW_XP_PER_CORRECT = 5;
export const REVIEW_XP_DAILY_CAP = 50;
export const REVIEW_SESSION_SIZE = 10;

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
    // storage unavailable — review still works in-session, it just won't persist
  }
}

let state = readJson(REVIEW_KEY, {});

const listeners = new Set();

function notify() {
  for (const fn of listeners) fn();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Reactive snapshot of the review map for components (badge counts, etc.). */
export function useReview() {
  return useSyncExternalStore(subscribe, () => state);
}

// Calendar dates only, like the streak system — "due today" means the local
// date, not a 24-hour clock.
function localDateString(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function dateStringInDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return localDateString(d);
}

function saveEntry(lessonId, questionId, entry) {
  state = { ...state, [lessonId]: { ...state[lessonId], [questionId]: entry } };
  writeJson(REVIEW_KEY, state);
  notify();
}

/**
 * Record an answer given during a lesson quiz. A miss (re)enters the question
 * into the queue at a 1-day interval; a correct answer only updates counts on
 * questions already in the queue — never-missed questions stay out entirely.
 */
export function recordQuizAnswer(lessonId, questionId, correct) {
  const existing = state[lessonId]?.[questionId];
  if (correct) {
    if (!existing) return;
    saveEntry(lessonId, questionId, {
      ...existing,
      correctCount: existing.correctCount + 1,
      lastSeen: new Date().toISOString(),
    });
    return;
  }
  saveEntry(lessonId, questionId, {
    correctCount: existing?.correctCount ?? 0,
    missCount: (existing?.missCount ?? 0) + 1,
    lastSeen: new Date().toISOString(),
    intervalDays: 1,
    nextDue: dateStringInDays(1),
  });
}

/**
 * Record an answer given during a review session. Wrong resets to 1 day;
 * right climbs the ladder and pushes nextDue out accordingly.
 * Returns { prevIntervalDays, intervalDays } so the session summary can show
 * which intervals moved.
 */
export function recordReviewAnswer(lessonId, questionId, correct) {
  const existing = state[lessonId]?.[questionId];
  if (!existing) return null;

  const prevIntervalDays = existing.intervalDays;
  const intervalDays = correct
    ? INTERVAL_LADDER.find((step) => step > prevIntervalDays) ??
      INTERVAL_LADDER[INTERVAL_LADDER.length - 1]
    : 1;

  saveEntry(lessonId, questionId, {
    ...existing,
    correctCount: existing.correctCount + (correct ? 1 : 0),
    missCount: existing.missCount + (correct ? 0 : 1),
    lastSeen: new Date().toISOString(),
    intervalDays,
    nextDue: dateStringInDays(intervalDays),
  });
  return { prevIntervalDays, intervalDays };
}

// Every queued entry joined back to its live lesson and category — stale
// entries whose lesson/question no longer exists in the curriculum are
// skipped, so counts and sessions always agree.
function queueItems(review) {
  const items = [];
  for (const category of categories) {
    for (const lesson of category.lessons) {
      const perLesson = review[lesson.id];
      if (!perLesson || !lesson.quiz) continue;
      for (const question of lesson.quiz) {
        const entry = perLesson[question.id];
        if (entry) items.push({ entry, question, lesson, category });
      }
    }
  }
  return items;
}

function dueItems(review) {
  const today = localDateString();
  return queueItems(review).filter(({ entry }) => entry.nextDue <= today);
}

/** Count of questions due today (works on any snapshot, e.g. from useReview). */
export function countDue(review = state) {
  return dueItems(review).length;
}

/** Earliest upcoming due date across the queue, or null if the queue is empty. */
export function nextDueDate(review = state) {
  let earliest = null;
  for (const { entry } of queueItems(review)) {
    if (earliest === null || entry.nextDue < earliest) earliest = entry.nextDue;
  }
  return earliest;
}

/**
 * Build a review session: the due questions, shuffled across lessons, capped
 * at REVIEW_SESSION_SIZE.
 */
export function buildReviewSession() {
  const due = dueItems(state);
  // Fisher-Yates shuffle so the session mixes lessons
  for (let i = due.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [due[i], due[j]] = [due[j], due[i]];
  }
  return due.slice(0, REVIEW_SESSION_SIZE);
}

/**
 * Award +5 XP per correct review answer through the existing XP system,
 * capped at 50/day from review. Returns the amount actually granted.
 */
export function awardReviewXp(correctCount) {
  const today = localDateString();
  const tracker = readJson(REVIEW_XP_KEY, null);
  const earnedToday = tracker?.date === today ? tracker.earned : 0;
  const granted = Math.min(
    correctCount * REVIEW_XP_PER_CORRECT,
    Math.max(0, REVIEW_XP_DAILY_CAP - earnedToday)
  );
  if (granted > 0) {
    awardXp(granted, "Review Session");
    writeJson(REVIEW_XP_KEY, { date: today, earned: earnedToday + granted });
  }
  return granted;
}
