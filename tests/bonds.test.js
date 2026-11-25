// Unit tests for the bond math (src/lib/bonds.js) and for the worked examples
// the Bonds & Fixed Income lessons quote. If a lesson says a bond falls to
// about $844, this is where that number is checked.

import test from "node:test";
import assert from "node:assert/strict";
import {
  bondPrice,
  currentYield,
  durationEstimate,
  modifiedDuration,
  taxEquivalentYield,
} from "../src/lib/bonds.js";
import { getCategory } from "../src/data/curriculum.js";
import { glossary } from "../src/data/glossary.js";
import { achievements } from "../src/data/achievements.js";

const near = (actual, expected, tol = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${actual} ≠ ${expected}`);

const lessonText = (id) => getCategory("fixed-income").lessons.find((l) => l.id === id).content;
const $ = (n) => `$${Math.round(n).toLocaleString("en-US")}`;
const pct = (x, digits = 0) => `${(x * 100).toFixed(digits)}%`;

// The running example: a $1,000 bond paying 3%.
const threePct = (marketYield, years = 10) => bondPrice({ couponRate: 0.03, marketYield, years });

test("a bond priced at its own coupon rate trades at par", () => {
  near(threePct(0.03), 1000, 1e-6);
  near(bondPrice({ couponRate: 0.07, marketYield: 0.07, years: 30 }), 1000, 1e-6);
});

test("the seesaw: rates up, price down; rates down, price up", () => {
  assert.ok(threePct(0.05) < 1000);
  assert.ok(threePct(0.02) > 1000);
  const text = lessonText("bond-prices");
  assert.ok(text.includes($(threePct(0.05))), `lesson quotes ${$(threePct(0.05))}`); // $844
  assert.ok(text.includes($(threePct(0.02))), `lesson quotes ${$(threePct(0.02))}`); // $1,090
});

test("current yield on the discounted bond", () => {
  const price = Math.round(threePct(0.05));
  const cy = currentYield({ couponRate: 0.03, price });
  assert.ok(lessonText("bond-prices").includes(pct(cy, 2)), `lesson quotes ${pct(cy, 2)}`); // 3.55%
});

test("longer bonds fall further for the same rate rise", () => {
  const text = lessonText("duration-yield-curve");
  let lastDrop = 0;
  for (const years of [2, 10, 30]) {
    const price = threePct(0.05, years);
    const drop = 1 - price / 1000;
    assert.ok(drop > lastDrop, `${years}-year falls more than the one before`);
    lastDrop = drop;
    assert.ok(text.includes($(price)), `lesson quotes ${$(price)} for the ${years}-year`);
    assert.ok(text.includes(`roughly a ${pct(drop)} drop`), `lesson quotes a ${pct(drop)} drop`);
  }
});

test("duration: the rule of thumb matches the full calculation for small moves", () => {
  near(durationEstimate(6, 0.01), -0.06);
  near(durationEstimate(6, -0.01), 0.06);
  const d = modifiedDuration({ couponRate: 0.04, marketYield: 0.04, years: 10 });
  const before = bondPrice({ couponRate: 0.04, marketYield: 0.04, years: 10 });
  const after = bondPrice({ couponRate: 0.04, marketYield: 0.0410, years: 10 });
  near((after - before) / before, durationEstimate(d, 0.001), 1e-4);
  // Longer maturity, longer duration.
  assert.ok(modifiedDuration({ couponRate: 0.03, marketYield: 0.05, years: 30 }) > d);
});

test("taxable-equivalent yield on a 3% muni", () => {
  const text = lessonText("bond-types");
  for (const rate of [0.32, 0.12]) {
    const tey = taxEquivalentYield(0.03, rate);
    assert.ok(text.includes(pct(tey, 2)), `lesson quotes ${pct(tey, 2)} for the ${pct(rate)} bracket`);
  }
  const q = getCategory("fixed-income").lessons.find((l) => l.id === "bond-types").quiz[3];
  assert.equal(q.options[q.correct], pct(taxEquivalentYield(0.03, 0.32), 2));
});

test("the basics example: $1,000 at 4% for 10 years", () => {
  const text = lessonText("bonds-basics");
  assert.ok(text.includes($(1000 * 0.04)) && text.includes($(1000 * 0.04 / 2)));
  assert.ok(text.includes($(1000 * 0.04 * 10)));
});

test("the ladder splits $10,000 into five equal rungs", () => {
  assert.ok(lessonText("bond-funds-ladders").includes($(10000 / 5)));
});

// ── Curriculum wiring ────────────────────────────────────────────────────

test("the Bonds & Fixed Income course is well-formed", () => {
  const category = getCategory("fixed-income");
  assert.ok(category, "course exists");
  assert.equal(category.mascot.name, "Bill the Badger");
  assert.ok(category.lessons.length >= 5, "enough lessons to fill a 15-question final");
  const ids = new Set();
  for (const lesson of category.lessons) {
    assert.ok(!ids.has(lesson.id), `duplicate lesson id ${lesson.id}`);
    ids.add(lesson.id);
    assert.equal(lesson.locked, false);
    assert.ok(lesson.content.length > 500, `${lesson.id} has real content`);
    assert.equal(lesson.quiz.length, 7, `${lesson.id} has a 7-question quiz`);
    lesson.quiz.forEach((q, i) => {
      assert.equal(q.id, i + 1);
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4, `${lesson.id} q${q.id} has distinct options`);
      assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4);
      assert.ok(q.explanation.length > 20);
    });
    assert.ok(new Set(lesson.quiz.map((q) => q.correct)).size >= 3, `${lesson.id} spreads correct answers`);
  }
});

test("every bonds glossary term points at a real bonds lesson", () => {
  const lessonIds = new Set(getCategory("fixed-income").lessons.map((l) => l.id));
  const terms = glossary.filter((entry) => entry.categoryId === "fixed-income");
  assert.ok(terms.length >= 12);
  for (const entry of terms) assert.ok(lessonIds.has(entry.lessonId), `${entry.term} → ${entry.lessonId}`);
  for (const id of lessonIds) assert.ok(terms.some((t) => t.lessonId === id), `${id} teaches a glossary term`);
});

test("finishing the course earns an achievement", () => {
  assert.ok(achievements.some((a) => a.condition === "categoryMastered:fixed-income"));
});
