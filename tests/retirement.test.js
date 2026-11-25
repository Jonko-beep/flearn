// Checks the retirement-account lessons in the Investing category: that they're
// wired up like every other lesson, and that the worked dollar figures they
// quote actually add up. If you change an example in the lesson text, change
// it here too.

import test from "node:test";
import assert from "node:assert/strict";
import { getCategory } from "../src/data/curriculum.js";
import { glossary } from "../src/data/glossary.js";

const RETIREMENT_LESSONS = ["iras", "employer-retirement-plans"];

const lesson = (id) => getCategory("investing").lessons.find((l) => l.id === id);
const $ = (n) => `$${Math.round(n).toLocaleString("en-US")}`;
const roundTo = (n, step) => Math.round(n / step) * step;

test("the retirement lessons are well-formed", () => {
  for (const id of RETIREMENT_LESSONS) {
    const l = lesson(id);
    assert.ok(l, `${id} exists in Investing`);
    assert.equal(l.locked, false);
    assert.ok(l.content.length > 500, `${id} has real content`);
    assert.equal(l.quiz.length, 7, `${id} has a 7-question quiz`);
    l.quiz.forEach((q, i) => {
      assert.equal(q.id, i + 1);
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4, `${id} q${q.id} has distinct options`);
      assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4);
      assert.ok(q.explanation.length > 20);
    });
    assert.ok(new Set(l.quiz.map((q) => q.correct)).size >= 3, `${id} spreads correct answers`);
    assert.ok(glossary.some((g) => g.lessonId === id), `${id} has glossary terms`);
  }
});

test("IRA: Roth and Traditional come out even at the same tax rate", () => {
  const income = 1000;
  const rate = 0.22;
  const growth = 10;
  const roth = income * (1 - rate) * growth;
  const traditional = income * growth * (1 - rate);
  assert.equal(Math.round(roth), 7800);
  assert.equal(Math.round(traditional), 7800);
  const text = lesson("iras").content;
  for (const figure of ["$220", "$780", "$7,800", "$10,000", "$2,200"]) {
    assert.ok(text.includes(figure), `lesson quotes ${figure}`);
  }
});

test("IRA: $100 a month from 20 to 65 at 8%", () => {
  const months = (65 - 20) * 12;
  const r = 0.08 / 12;
  const fv = (100 * ((1 + r) ** months - 1)) / r;
  const text = lesson("iras").content;
  assert.ok(text.includes($(100 * months)), "contributions total");
  assert.ok(text.includes($(roundTo(fv, 1000))), `about ${$(roundTo(fv, 1000))}`);
});

test("IRA: the shared-limit quiz question", () => {
  const q = lesson("iras").quiz[2];
  assert.equal(q.options[q.correct], $(7500 - 5000));
});

test("401(k): match, pre-tax savings, and cashing out", () => {
  const text = lesson("employer-retirement-plans").content;
  const salary = 50000;
  // 50% match up to 6% of salary
  assert.ok(text.includes($(salary * 0.06)) && text.includes($(salary * 0.06 * 0.5)));
  assert.ok(text.includes($(salary * 0.03 * 0.5)), "half the match at 3%");
  // $3,000 pre-tax in the 12% bracket
  assert.ok(text.includes($(3000 * 0.12)) && text.includes($(3000 * 0.88)));
  // Cash out $10,000 in the 22% bracket, plus the 10% penalty
  assert.ok(text.includes($(10000 * 0.22)) && text.includes($(10000 * 0.1)));
  assert.ok(text.includes($(10000 * (1 - 0.22 - 0.1))));
  // ...versus 40 years at 8%
  assert.ok(text.includes($(roundTo(10000 * 1.08 ** 40, 1000))));
  const q = lesson("employer-retirement-plans").quiz[1];
  assert.equal(q.options[q.correct], $(salary * 0.06 * 0.5));
});
