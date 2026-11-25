// Unit tests for the options payoff math (src/lib/options.js) and for the
// worked examples the Options lessons quote — if a lesson says a trade makes
// $300, this is where that number is checked.

import test from "node:test";
import assert from "node:assert/strict";
import {
  CONTRACT_SIZE,
  STRATEGIES,
  computeOptionPayoff,
  intrinsicValue,
  moveToBreakevenPct,
  profitPerShare,
} from "../src/lib/options.js";
import { getCategory } from "../src/data/curriculum.js";
import { glossary } from "../src/data/glossary.js";

const near = (actual, expected, tol = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${actual} ≠ ${expected}`);

test("long call: loss capped at the premium, breakeven at strike + premium", () => {
  const p = computeOptionPayoff({ strategy: "long-call", stockPrice: 50, strike: 55, premium: 2 });
  assert.equal(p.maxLoss, 200);
  assert.equal(p.capital, 200);
  assert.equal(p.maxProfit, Infinity);
  assert.equal(p.breakeven, 57);
  assert.equal(p.profitAt(40), -200); // expires worthless
  assert.equal(p.profitAt(55), -200); // at the strike: still worthless
  assert.equal(p.profitAt(56), -100); // right direction, still a loss
  assert.equal(p.profitAt(57), 0);
  assert.equal(p.profitAt(60), 300); // the lesson's 150% example
});

test("long put: profits as the stock falls, max profit if it goes to zero", () => {
  const p = computeOptionPayoff({ strategy: "long-put", stockPrice: 50, strike: 45, premium: 1.5 });
  assert.equal(p.maxLoss, 150);
  assert.equal(p.breakeven, 43.5);
  assert.equal(p.maxProfit, 4350);
  assert.equal(p.profitAt(0), 4350);
  assert.equal(p.profitAt(38), 550); // the lesson's example
  assert.equal(p.profitAt(45), -150);
  assert.equal(p.profitAt(70), -150);
});

test("covered call: upside capped at the strike, downside cushioned by the premium", () => {
  const p = computeOptionPayoff({ strategy: "covered-call", stockPrice: 50, strike: 55, premium: 1.5 });
  assert.equal(p.maxProfit, 650); // the lesson's example
  assert.equal(p.breakeven, 48.5);
  assert.equal(p.profitAt(55), 650);
  assert.equal(p.profitAt(80), 650); // capped no matter how high
  assert.equal(p.profitAt(50), 150); // flat stock: keep the premium
  assert.equal(p.profitAt(0), -4850);
  assert.equal(p.maxLoss, 4850);
  assert.equal(p.capital, 4850);
});

test("cash-secured put: keep the premium above the strike, own the downside below", () => {
  const p = computeOptionPayoff({ strategy: "cash-secured-put", stockPrice: 50, strike: 45, premium: 1.2 });
  near(p.maxProfit, 120);
  near(p.breakeven, 43.8); // the lesson's effective purchase price
  near(p.profitAt(60), 120);
  near(p.profitAt(45), 120);
  near(p.profitAt(35), -880); // the lesson's example
  near(p.maxLoss, 4380);
  near(p.capital, 4380);
});

test("protective put: a floor under the shares, upside open minus the premium", () => {
  // The Protective Puts lesson: shares at $100, a $95 put for $3.
  const p = computeOptionPayoff({ strategy: "protective-put", stockPrice: 100, strike: 95, premium: 3 });
  assert.equal(p.maxLoss, 800);
  assert.equal(p.breakeven, 103);
  assert.equal(p.maxProfit, Infinity);
  assert.equal(p.capital, 10300);
  assert.equal(p.profitAt(70), -800);
  assert.equal(p.profitAt(95), -800); // the floor
  assert.equal(p.profitAt(0), -800); // however far it falls
  assert.equal(p.profitAt(100), -300); // nothing happened: the cost of insurance
  assert.equal(p.profitAt(120), 1700); // vs $2,000 without the put
  // Bought at $80: worst case sells at $95 after a $3 put — at least $12/share kept.
  assert.equal(95 - 3 - 80, 12);
  // The strike-as-deductible comparison.
  near(computeOptionPayoff({ strategy: "protective-put", stockPrice: 100, strike: 90, premium: 1.5 }).maxLoss, 1150);
  near(computeOptionPayoff({ strategy: "protective-put", stockPrice: 100, strike: 100, premium: 5.5 }).maxLoss, 550);
  assert.equal(intrinsicValue("protective-put", 100, 105), 5);
});

test("covered call deep dive: the $40 stock, $42 call for $0.80", () => {
  const p = computeOptionPayoff({ strategy: "covered-call", stockPrice: 40, strike: 42, premium: 0.8 });
  near(p.maxProfit, 280);
  near(p.breakeven, 39.2);
  near(p.profitAt(40), 80); // flat: keep the premium
  near(p.profitAt(42), 280);
  near(p.profitAt(50), 280); // capped; holding would have made $1,000
  near(p.profitAt(35), -420); // vs −$500 just holding
  near(0.8 / 40, 0.02); // "about 2% in a month"
});

test("a protective put pays off like a long call at the same strike", () => {
  // Put-call parity again: shares + a K put has the shape of a K call.
  const inputs = { stockPrice: 100, strike: 95, premium: 3 };
  const shift = profitPerShare("protective-put", inputs, 200) - profitPerShare("long-call", inputs, 200);
  for (const price of [0, 50, 95, 100, 130, 200]) {
    near(profitPerShare("protective-put", inputs, price) - profitPerShare("long-call", inputs, price), shift);
  }
});

test("a covered call and a cash-secured put at the same strike have the same shape", () => {
  // Put-call parity in miniature: buying stock at K and selling the K call
  // pays off like selling the K put, shifted by the premium difference.
  const inputs = { stockPrice: 100, strike: 100, premium: 4 };
  for (const price of [0, 50, 99, 100, 101, 150, 300]) {
    near(
      profitPerShare("covered-call", inputs, price),
      profitPerShare("cash-secured-put", inputs, price)
    );
  }
});

test("buyer and seller of the same option are a zero-sum pair", () => {
  const inputs = { stockPrice: 100, strike: 95, premium: 3 };
  for (const price of [0, 60, 92, 95, 100, 140]) {
    const buyer = profitPerShare("long-put", inputs, price);
    const seller = profitPerShare("cash-secured-put", inputs, price);
    near(buyer + seller, 0);
  }
});

test("contracts scale every dollar figure by 100 shares each", () => {
  const one = computeOptionPayoff({ strategy: "long-call", stockPrice: 100, strike: 105, premium: 3 });
  const five = computeOptionPayoff({
    strategy: "long-call",
    stockPrice: 100,
    strike: 105,
    premium: 3,
    contracts: 5,
  });
  assert.equal(one.shares, CONTRACT_SIZE);
  assert.equal(five.shares, 500);
  assert.equal(five.maxLoss, one.maxLoss * 5);
  assert.equal(five.profitAt(120), one.profitAt(120) * 5);
  assert.equal(five.breakeven, one.breakeven); // breakeven is a price, not a total
});

test("max profit and max loss bound every point on the chart", () => {
  for (const { id, defaults } of STRATEGIES) {
    const p = computeOptionPayoff({ strategy: id, stockPrice: 100, ...defaults, contracts: 2 });
    assert.ok(p.series.length > 10);
    assert.equal(p.series[0].price, 0);
    for (const { price, profit } of p.series) {
      assert.ok(profit >= -p.maxLoss - 0.01, `${id} @ ${price}: ${profit} < -${p.maxLoss}`);
      assert.ok(profit <= p.maxProfit + 0.01, `${id} @ ${price}: ${profit} > ${p.maxProfit}`);
    }
    near(p.profitAt(p.breakeven), 0, 1e-6);
  }
});

test("a put whose premium exceeds its strike can never break even", () => {
  const p = computeOptionPayoff({ strategy: "long-put", stockPrice: 10, strike: 5, premium: 6 });
  assert.equal(p.breakeven, null);
  assert.equal(p.maxProfit, 0);
  assert.equal(moveToBreakevenPct(10, p.breakeven), null);
});

test("move-to-breakeven is signed relative to today's price", () => {
  near(moveToBreakevenPct(100, 108), 8);
  near(moveToBreakevenPct(100, 92), -8);
});

test("intrinsic value matches the pricing lesson's examples", () => {
  assert.equal(intrinsicValue("long-call", 100, 95), 5); // $8 premium → $3 time value
  assert.equal(intrinsicValue("long-call", 100, 105), 0);
  assert.equal(intrinsicValue("covered-call", 100, 95), 5);
  assert.equal(intrinsicValue("long-put", 100, 105), 5);
  assert.equal(intrinsicValue("cash-secured-put", 100, 90), 0);
});

test("unknown strategies fail loudly", () => {
  assert.throws(() => computeOptionPayoff({ strategy: "iron-condor", stockPrice: 1, strike: 1, premium: 1 }));
});

// ── Curriculum wiring ────────────────────────────────────────────────────

test("the Options category is well-formed", () => {
  const category = getCategory("options");
  assert.ok(category, "options category exists");
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
  }
});

test("correct answers aren't all in the same slot", () => {
  const category = getCategory("options");
  for (const lesson of category.lessons) {
    const slots = new Set(lesson.quiz.map((q) => q.correct));
    assert.ok(slots.size >= 3, `${lesson.id} spreads correct answers across options`);
  }
});

test("every options glossary term points at a real options lesson", () => {
  const category = getCategory("options");
  const lessonIds = new Set(category.lessons.map((l) => l.id));
  const terms = glossary.filter((entry) => entry.categoryId === "options");
  assert.ok(terms.length >= 12);
  for (const entry of terms) {
    assert.ok(lessonIds.has(entry.lessonId), `${entry.term} → ${entry.lessonId}`);
  }
  // Glossary terms are used as React keys and search targets — keep them unique.
  const all = glossary.map((entry) => entry.term.toLowerCase());
  assert.equal(new Set(all).size, all.length, "glossary terms are unique");
});
