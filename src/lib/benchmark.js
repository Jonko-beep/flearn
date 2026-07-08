// "You vs. the Market" — replays the user's exact cash flows into a pure
// index strategy (VOO) so the portfolio page can answer "would I have done
// better just buying the index?". Works because src/lib/prices.js is
// deterministic per (ticker, date): historical prices are reproducible.

import { getPrice } from "./prices.js";

export const BENCHMARK_TICKER = "VOO";
const MS_PER_DAY = 86400000;
const MAX_CHART_POINTS = 120;
const EPSILON = 1e-9;

function localMidnight(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Replay the portfolio's transaction history (stored newest-first) against a
 * buy-the-index strategy: every BUY of $X on date D buys $X of VOO at VOO's
 * derived price on D, every SELL of $X sells $X of VOO (capped at available
 * benchmark shares). Uninvested cash sits as cash in both.
 *
 * Returns null until there is at least one transaction; otherwise
 * { you: { value, returnPct }, market: { value, returnPct }, diffPct,
 *   series: [{ ts, you, market }] } — one point per day from the first trade
 * to today (sampled every few days past MAX_CHART_POINTS to keep it light).
 */
export function computeBenchmark(portfolio, today = new Date()) {
  const txs = [...(portfolio?.transactions ?? [])].reverse(); // oldest first
  if (txs.length === 0) return null;

  const firstDay = localMidnight(new Date(txs[0].date));
  const lastDay = localMidnight(today);
  const totalDays = Math.max(0, Math.round((lastDay - firstDay) / MS_PER_DAY));
  const stride = Math.max(1, Math.ceil(totalDays / MAX_CHART_POINTS));

  let userCash = portfolio.startingCash;
  const userShares = {}; // ticker -> shares held
  let benchCash = portfolio.startingCash;
  let benchShares = 0;

  let txIndex = 0;
  const series = [];

  for (let day = 0; day <= totalDays; day++) {
    const date = new Date(firstDay.getTime() + day * MS_PER_DAY);

    // Apply every transaction dated on (or, defensively, before) this day.
    while (
      txIndex < txs.length &&
      localMidnight(new Date(txs[txIndex].date)) <= date
    ) {
      const t = txs[txIndex++];
      const benchPrice = getPrice(BENCHMARK_TICKER, new Date(t.date));
      if (t.type === "buy") {
        userCash -= t.amount;
        userShares[t.ticker] = (userShares[t.ticker] ?? 0) + t.shares;
        // Mirror the cash flow; cap at benchmark cash in case earlier capped
        // sells left the benchmark with less cash than the user.
        const spend = Math.min(t.amount, benchCash);
        benchShares += spend / benchPrice;
        benchCash -= spend;
      } else {
        userCash += t.amount;
        userShares[t.ticker] = (userShares[t.ticker] ?? 0) - t.shares;
        const sold = Math.min(t.amount / benchPrice, benchShares);
        benchShares -= sold;
        benchCash += sold * benchPrice;
      }
    }

    if (day % stride !== 0 && day !== totalDays) continue;

    let userValue = userCash;
    for (const [ticker, shares] of Object.entries(userShares)) {
      if (shares > EPSILON) userValue += shares * (getPrice(ticker, date) ?? 0);
    }
    const benchValue =
      benchCash + benchShares * getPrice(BENCHMARK_TICKER, date);
    series.push({ ts: date.getTime(), you: round2(userValue), market: round2(benchValue) });
  }

  // A first trade made today would leave a single point — no visible line.
  // Pad a baseline point the day before so the chart always draws.
  if (series.length === 1) {
    series.unshift({
      ts: firstDay.getTime() - MS_PER_DAY,
      you: portfolio.startingCash,
      market: portfolio.startingCash,
    });
  }

  const start = portfolio.startingCash;
  const last = series[series.length - 1];
  const youPct = ((last.you - start) / start) * 100;
  const marketPct = ((last.market - start) / start) * 100;

  return {
    you: { value: last.you, returnPct: youPct },
    market: { value: last.market, returnPct: marketPct },
    diffPct: youPct - marketPct,
    series,
  };
}
