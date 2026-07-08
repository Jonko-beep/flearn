// Category final exams + certificate profile. Same module-level-store pattern
// as gamification.js so pages and cards can subscribe via useFinals()/useProfile().
//
// localStorage:
//   flearn_finals  { [categoryId]: { passed, bestScore, date, serial } }
//   flearn_profile { name }

import { useSyncExternalStore } from "react";
import { awardXp, recordAction } from "./gamification.js";
import { checkAchievements } from "./achievements.js";

const FINALS_KEY = "flearn_finals";
const PROFILE_KEY = "flearn_profile";

export const EXAM_SIZE = 15;
export const EXAM_PASS_THRESHOLD = 80;
export const EXAM_XP = 250;
const MAX_PER_LESSON = 3;

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
    // storage unavailable — results still work in-session, they just won't persist
  }
}

let finals = readJson(FINALS_KEY, {});
let profile = readJson(PROFILE_KEY, {});

const listeners = new Set();

function notify() {
  for (const fn of listeners) fn();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Reactive snapshot of { [categoryId]: { passed, bestScore, date, serial } }. */
export function useFinals() {
  return useSyncExternalStore(subscribe, () => finals);
}

/** Reactive snapshot of { name } from flearn_profile. */
export function useProfile() {
  return useSyncExternalStore(subscribe, () => profile);
}

export function getFinal(categoryId) {
  return finals[categoryId] ?? null;
}

export function setDisplayName(name) {
  profile = { ...profile, name: name.trim() };
  writeJson(PROFILE_KEY, profile);
  notify();
}

// Serial-style certificate footer, e.g. FL-INV-2026-4821. Generated once on
// the first pass and persisted so the certificate never changes.
function makeSerial(categoryId, date) {
  const abbr = categoryId.slice(0, 3).toUpperCase();
  const year = new Date(date).getFullYear();
  const num = String(Math.floor(1000 + Math.random() * 9000));
  return `FL-${abbr}-${year}-${num}`;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Sample EXAM_SIZE questions across all of a category's lesson quizzes, no
 * more than MAX_PER_LESSON from any single lesson, shuffled. Each question is
 * tagged with its source lesson for the end-of-exam review. Falls back to the
 * overflow pool only if the cap can't fill the exam.
 */
export function buildFinalExam(category) {
  const capped = [];
  const overflow = [];
  for (const lesson of category.lessons) {
    if (lesson.locked || !lesson.quiz?.length) continue;
    const tagged = shuffle(lesson.quiz).map((q) => ({
      ...q,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
    }));
    capped.push(...tagged.slice(0, MAX_PER_LESSON));
    overflow.push(...tagged.slice(MAX_PER_LESSON));
  }
  const exam = shuffle(capped).slice(0, EXAM_SIZE);
  if (exam.length < EXAM_SIZE) {
    exam.push(...shuffle(overflow).slice(0, EXAM_SIZE - exam.length));
  }
  return exam;
}

/**
 * Persist a final exam attempt. On the first pass: stamp the completion date,
 * mint the certificate serial, and award the exam XP bonus (once ever per
 * category, guarded by the XP event key).
 */
export function recordFinalAttempt(categoryId, score) {
  const existing = finals[categoryId];
  const passedNow = score >= EXAM_PASS_THRESHOLD;
  const firstPass = passedNow && !existing?.passed;
  const date = firstPass
    ? new Date().toISOString()
    : (existing?.date ?? new Date().toISOString());

  finals = {
    ...finals,
    [categoryId]: {
      passed: (existing?.passed ?? false) || passedNow,
      bestScore: Math.max(existing?.bestScore ?? 0, score),
      date,
      serial: existing?.serial ?? (passedNow ? makeSerial(categoryId, date) : null),
    },
  };
  writeJson(FINALS_KEY, finals);
  notify();

  recordAction(); // an exam attempt counts toward the daily streak
  if (passedNow) {
    awardXp(EXAM_XP, "Final Exam Passed!", `final:${categoryId}`);
  }
  checkAchievements();
}
