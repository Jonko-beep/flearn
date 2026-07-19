// Unit tests for the "Who Do I Align With?" scoring engine.
// Run with `npm test` (Node's built-in test runner — no extra dependency).

import test from "node:test";
import assert from "node:assert/strict";
import { questions } from "../src/data/alignQuiz.js";
import {
  scoreQuiz,
  ENT_THRESHOLD,
  MISMATCH_AGGRESSIVE_EARLY,
  MISMATCH_CONSERVATIVE_FLEXIBLE,
} from "../src/lib/alignQuiz.js";

// Answer every question with the option at `index` (clamped to the last
// option), then apply overrides keyed by question id.
function answersWith(index, overrides = {}) {
  const answers = {};
  for (const q of questions) {
    answers[q.id] = Math.min(index, q.options.length - 1);
  }
  return { ...answers, ...overrides };
}

test("all first options yields Ramsey as primary", () => {
  const result = scoreQuiz(answersWith(0));
  assert.equal(result.primary, "ramsey");
  assert.equal(result.temperament, "Conservative");
});

test("most-aggressive answers yield Cardone as primary at 100%", () => {
  const result = scoreQuiz(
    answersWith(3, { q1: 5, q2: 5, q4: 4, q10: 4, q11: 3, q12: 3, q13: 3, q14: 3 })
  );
  assert.equal(result.primary, "cardone");
  assert.equal(result.affinities[0].percent, 100);
  assert.equal(result.temperament, "Aggressive");
});

test("affinities cover all seven archetypes, sorted descending", () => {
  const result = scoreQuiz(answersWith(0));
  assert.equal(result.affinities.length, 7);
  for (let i = 1; i < result.affinities.length; i++) {
    assert.ok(result.affinities[i - 1].percent >= result.affinities[i].percent);
  }
});

test("Q3-E contributes no archetype weight and flags volatility content", () => {
  const base = answersWith(0);
  const withE = scoreQuiz({ ...base, q3: 4 });
  const without = scoreQuiz({ ...base, q3: undefined });
  for (let i = 0; i < 7; i++) {
    assert.equal(withE.affinities[i].score, without.affinities[i].score);
  }
  assert.ok(withE.contentFlags.includes("volatility-basics"));
  assert.ok(!without.contentFlags.includes("volatility-basics"));
});

test("ENT flag fires at 3+ tagged picks, not at 2", () => {
  assert.equal(ENT_THRESHOLD, 3);
  // q2 F, q5 D, q6 D are ENT-tagged
  const three = scoreQuiz(answersWith(0, { q2: 5, q5: 3, q6: 3 }));
  assert.equal(three.entCount, 3);
  assert.equal(three.entFlag, true);
  const two = scoreQuiz(answersWith(0, { q2: 5, q5: 3 }));
  assert.equal(two.entCount, 2);
  assert.equal(two.entFlag, false);
});

test("capacity averages map to the correct stage labels", () => {
  const capCase = (caps) =>
    scoreQuiz(
      answersWith(0, { q11: caps[0] - 1, q12: caps[1] - 1, q13: caps[2] - 1, q14: caps[3] - 1 })
    );
  assert.equal(capCase([1, 1, 1, 1]).stage, "Foundation");
  assert.equal(capCase([1, 2, 2, 2]).stage, "Foundation"); // avg 1.75, boundary
  assert.equal(capCase([2, 2, 2, 2]).stage, "Stabilizing");
  assert.equal(capCase([2, 2, 3, 3]).stage, "Stabilizing"); // avg 2.5, boundary
  assert.equal(capCase([3, 3, 3, 3]).stage, "Positioned");
  assert.equal(capCase([4, 4, 4, 4]).stage, "Flexible");
  assert.equal(capCase([3, 3, 4, 4]).stage, "Flexible"); // avg 3.5
});

test("Q13 low-cash options flag secure-base content", () => {
  const low = scoreQuiz(answersWith(0, { q13: 1 }));
  assert.ok(low.contentFlags.includes("secure-base"));
  const ok = scoreQuiz(answersWith(0, { q13: 2 }));
  assert.ok(!ok.contentFlags.includes("secure-base"));
});

test("protection tier from Q15 unlocks at business/investor", () => {
  assert.equal(scoreQuiz(answersWith(0, { q15: 0 })).tier, "none");
  assert.equal(scoreQuiz(answersWith(0, { q15: 1 })).protectionUnlocked, false);
  const business = scoreQuiz(answersWith(0, { q15: 2 }));
  assert.equal(business.tier, "business");
  assert.equal(business.protectionUnlocked, true);
  assert.equal(scoreQuiz(answersWith(0, { q15: 3 })).protectionUnlocked, true);
});

test("mismatch note: aggressive temperament at an early stage", () => {
  // Aggressive answers but rock-bottom capacity
  const result = scoreQuiz(
    answersWith(3, { q1: 5, q2: 5, q4: 4, q10: 4, q11: 0, q12: 0, q13: 0, q14: 0 })
  );
  assert.equal(result.temperament, "Aggressive");
  assert.equal(result.stage, "Foundation");
  assert.equal(result.mismatchNote, MISMATCH_AGGRESSIVE_EARLY);
});

test("mismatch note: conservative temperament at Flexible stage", () => {
  const result = scoreQuiz(answersWith(0, { q11: 3, q12: 3, q13: 3, q14: 3 }));
  assert.equal(result.temperament, "Conservative");
  assert.equal(result.stage, "Flexible");
  assert.equal(result.mismatchNote, MISMATCH_CONSERVATIVE_FLEXIBLE);
});

test("no mismatch note when temperament and stage agree", () => {
  const result = scoreQuiz(answersWith(0, { q11: 0, q12: 0, q13: 0, q14: 0 }));
  assert.equal(result.temperament, "Conservative");
  assert.equal(result.stage, "Foundation");
  assert.equal(result.mismatchNote, null);
});
