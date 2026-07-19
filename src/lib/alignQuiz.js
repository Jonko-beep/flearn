// Scoring engine + persistence for the "Who Do I Align With?" quiz.
// scoreQuiz is a pure function over the answer map so it can be unit-tested
// (see tests/alignQuiz.test.js — run with `npm test`).
//
// localStorage:
//   flearn_quiz_result_v1  { answers, result, timestamp }

import { ARCHETYPES, questions } from "../data/alignQuiz.js";

export const RESULT_KEY = "flearn_quiz_result_v1";
export const ENT_THRESHOLD = 3;

export const TEMPERAMENTS = {
  ramsey: "Conservative",
  orman: "Conservative",
  sethi: "Balanced",
  housel: "Balanced",
  stephan: "Balanced",
  kiyosaki: "Aggressive",
  cardone: "Aggressive",
};

const STAGES = [
  { max: 1.75, label: "Foundation" },
  { max: 2.5, label: "Stabilizing" },
  { max: 3.25, label: "Positioned" },
  { max: 4, label: "Flexible" },
];

export const MISMATCH_AGGRESSIVE_EARLY =
  "Your temperament leans aggressive, but your current stage says build the base first. That's not a contradiction — it's sequencing. Lock in your foundation, then your temperament gets room to run.";

// Shown verbatim on both the intro and results screens.
export const DISCLAIMER =
  "This quiz is for education only. It matches your temperament to financial philosophies and learning content — it is not investment advice, and it does not recommend specific investments, allocations, or securities. Consider your own situation or consult a licensed professional before making investment decisions.";

export const MISMATCH_CONSERVATIVE_FLEXIBLE =
  "Your situation could support more risk than your temperament prefers. That's worth knowing — not a command to change.";

// Highest weight any single option carries per archetype, summed across
// questions — the denominator that turns raw scores into affinity %.
function maxPossibleScores() {
  const max = Object.fromEntries(ARCHETYPES.map((a) => [a, 0]));
  for (const question of questions) {
    for (const archetype of ARCHETYPES) {
      let best = 0;
      for (const option of question.options) {
        best = Math.max(best, option.weights?.[archetype] ?? 0);
      }
      max[archetype] += best;
    }
  }
  return max;
}

/**
 * Score a completed quiz. `answers` maps question id → selected option index,
 * e.g. { q1: 0, q2: 3, ... }. Returns the full result object rendered by the
 * results screen. Pure — no storage, no randomness.
 */
export function scoreQuiz(answers) {
  const raw = Object.fromEntries(ARCHETYPES.map((a) => [a, 0]));
  let entCount = 0;
  let capSum = 0;
  let capCount = 0;
  let tier = "none";
  const contentFlags = [];

  for (const question of questions) {
    const option = question.options[answers[question.id]];
    if (!option) continue;
    for (const [archetype, weight] of Object.entries(option.weights ?? {})) {
      raw[archetype] += weight;
    }
    if (option.ent) entCount += 1;
    if (option.cap != null) {
      capSum += option.cap;
      capCount += 1;
    }
    if (option.tier) tier = option.tier;
    if (option.contentFlag && !contentFlags.includes(option.contentFlag)) {
      contentFlags.push(option.contentFlag);
    }
  }

  const max = maxPossibleScores();
  const affinities = ARCHETYPES.map((archetype) => ({
    archetype,
    score: raw[archetype],
    max: max[archetype],
    percent: max[archetype] ? Math.round((raw[archetype] / max[archetype]) * 100) : 0,
  })).sort((a, b) => b.percent - a.percent);

  const primary = affinities[0].archetype;
  const runnerUp = affinities[1].archetype;
  const temperament = TEMPERAMENTS[primary];

  const capacityAvg = capCount ? capSum / capCount : 0;
  const stage = STAGES.find((s) => capacityAvg <= s.max)?.label ?? "Flexible";

  let mismatchNote = null;
  if (temperament === "Aggressive" && (stage === "Foundation" || stage === "Stabilizing")) {
    mismatchNote = MISMATCH_AGGRESSIVE_EARLY;
  } else if (temperament === "Conservative" && stage === "Flexible") {
    mismatchNote = MISMATCH_CONSERVATIVE_FLEXIBLE;
  }

  return {
    affinities,
    primary,
    runnerUp,
    temperament,
    capacityAvg,
    stage,
    entCount,
    entFlag: entCount >= ENT_THRESHOLD,
    tier,
    protectionUnlocked: tier === "business" || tier === "investor",
    contentFlags,
    mismatchNote,
  };
}

export function loadStoredResult() {
  try {
    const raw = localStorage.getItem(RESULT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveResult(answers, result) {
  try {
    localStorage.setItem(
      RESULT_KEY,
      JSON.stringify({ answers, result, timestamp: new Date().toISOString() })
    );
  } catch {
    // storage unavailable — the result still renders, it just won't persist
  }
}

export function clearStoredResult() {
  try {
    localStorage.removeItem(RESULT_KEY);
  } catch {
    // ignore
  }
}
