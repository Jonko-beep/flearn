// Unit tests for the paycheck calculator math (src/lib/paycheck.js).

import test from "node:test";
import assert from "node:assert/strict";
import {
  computeFica,
  computePaycheck,
  SOCIAL_SECURITY_WAGE_BASE_2026,
} from "../src/lib/paycheck.js";

const salaried = (salary) =>
  computePaycheck({ mode: "salary", salary, wage: 0, hoursPerWeek: 40, periodsPerYear: 26 });

const near = (actual, expected, tol = 0.01) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${actual} ≠ ${expected}`);

test("$60k salary: bracketed federal tax after the standard deduction", () => {
  const r = salaried(60000);
  // taxable 43,900 → 10% of 12,400 + 12% of 31,500
  near(r.federal, 1240 + 3780);
  near(r.fica, 60000 * 0.0765);
  near(r.takeHomeAnnual, 60000 - 5020 - 4590);
  near(r.takeHomePer, r.takeHomeAnnual / 26);
});

test("income under the standard deduction owes no federal income tax, but still FICA", () => {
  const r = salaried(15000);
  assert.equal(r.federal, 0);
  near(r.fica, 15000 * 0.0765);
});

test("Social Security stops at the wage base", () => {
  near(computeFica(SOCIAL_SECURITY_WAGE_BASE_2026), SOCIAL_SECURITY_WAGE_BASE_2026 * 0.0765);
  // $190k: SS on 184,500 only; Medicare on everything
  near(computeFica(190000), 184500 * 0.062 + 190000 * 0.0145);
});

test("Additional Medicare tax applies above $200k", () => {
  // $300k: SS capped, 1.45% Medicare on all, +0.9% on the 100k over 200k
  near(computeFica(300000), 184500 * 0.062 + 300000 * 0.0145 + 100000 * 0.009);
  assert.ok(computeFica(300000) < 300000 * 0.0765, "flat 7.65% overstates high-earner FICA");
});

test("hourly mode annualizes wage × hours × 52", () => {
  const r = computePaycheck({
    mode: "hourly",
    salary: 0,
    wage: 20,
    hoursPerWeek: 30,
    periodsPerYear: 52,
  });
  assert.equal(r.grossAnnual, 31200);
  near(r.grossHourly, 20);
  assert.ok(r.trueHourly < 20 && r.trueHourly > 15);
});

test("a raise never lowers take-home", () => {
  let prev = -1;
  for (let salary = 0; salary <= 700000; salary += 500) {
    const { takeHomeAnnual } = salaried(salary);
    assert.ok(takeHomeAnnual >= prev, `take-home dropped at ${salary}`);
    prev = takeHomeAnnual;
  }
});
