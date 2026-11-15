// Unit tests for the "You vs. the Market" replay (src/lib/benchmark.js).

process.env.TZ = "America/Los_Angeles"; // DST ended Nov 1, 2026 in this zone

import test from "node:test";
import assert from "node:assert/strict";
import { computeBenchmark, BENCHMARK_TICKER } from "../src/lib/benchmark.js";
import { getPrice } from "../src/lib/prices.js";

const round2 = (n) => Math.round(n * 100) / 100;

function buy(ticker, dollars, date) {
  const price = getPrice(ticker, date);
  const shares = Math.floor((dollars / price) * 10000) / 10000;
  return { type: "buy", ticker, shares, price, amount: round2(shares * price), date: date.toISOString() };
}

// Transactions are stored newest-first, like usePortfolio writes them.
function portfolioOf(...txsOldestFirst) {
  return { startingCash: 10000, transactions: [...txsOldestFirst].reverse() };
}

test("returns null until there is a trade", () => {
  assert.equal(computeBenchmark({ startingCash: 10000, transactions: [] }), null);
});

test("buying the benchmark itself tracks the benchmark exactly", () => {
  const first = new Date(2026, 5, 1, 10);
  const today = new Date(2026, 5, 20, 15);
  const result = computeBenchmark(portfolioOf(buy(BENCHMARK_TICKER, 5000, first)), today);
  assert.equal(result.you.value, result.market.value);
  assert.equal(result.diffPct, 0);
});

test("today's value uses today's prices and trades across a daylight-saving change", () => {
  const first = new Date(2026, 9, 20, 10); // Oct 20, before clocks fall back
  const today = new Date(2026, 10, 15, 15); // Nov 15, after
  const early = buy("AAPL", 3000, first);
  const late = buy("KO", 2000, new Date(2026, 10, 15, 9)); // traded today
  const result = computeBenchmark(portfolioOf(early, late), today);

  const expected = round2(
    10000 -
      early.amount -
      late.amount +
      early.shares * getPrice("AAPL", today) +
      late.shares * getPrice("KO", today)
  );
  assert.equal(result.you.value, expected);

  const last = result.series[result.series.length - 1];
  const lastDay = new Date(last.ts);
  assert.deepEqual(
    [lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate(), lastDay.getHours()],
    [2026, 10, 15, 0],
    "final chart point is local midnight today"
  );
});

test("sells mirror into the benchmark without going short", () => {
  const first = new Date(2026, 2, 2, 10);
  const b = buy("MSFT", 4000, first);
  const sellDate = new Date(2026, 2, 20, 10);
  const price = getPrice("MSFT", sellDate);
  const sell = {
    type: "sell",
    ticker: "MSFT",
    shares: b.shares,
    price,
    amount: round2(b.shares * price),
    date: sellDate.toISOString(),
  };
  const result = computeBenchmark(portfolioOf(b, sell), new Date(2026, 3, 1, 12));
  // Fully sold: the user is all cash again.
  assert.equal(result.you.value, round2(10000 - b.amount + sell.amount));
  assert.ok(result.market.value > 0);
});
