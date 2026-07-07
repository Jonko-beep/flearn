import { useCallback, useState } from "react";
import { awardXp, recordAction } from "../lib/gamification.js";
import { checkAchievements } from "../lib/achievements.js";

const STORAGE_KEY = "flearn_portfolio";
export const STARTING_CASH = 10000;
const SHARE_DECIMALS = 4;
const EPSILON = 1e-7;

function freshPortfolio() {
  return {
    startingCash: STARTING_CASH,
    cash: STARTING_CASH,
    // { [ticker]: { lots: [{ shares, price, date }] } }
    holdings: {},
    // newest first: { id, type: "buy"|"sell", ticker, shares, price, amount, date }
    transactions: [],
  };
}

function readPortfolio() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshPortfolio();
    return { ...freshPortfolio(), ...JSON.parse(raw) };
  } catch {
    return freshPortfolio();
  }
}

function writePortfolio(portfolio) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
  } catch {
    // storage unavailable — the session still works, it just won't persist
  }
}

function roundShares(n) {
  return Math.round(n * 10 ** SHARE_DECIMALS) / 10 ** SHARE_DECIMALS;
}

function roundMoney(n) {
  return Math.round(n * 100) / 100;
}

export function holdingShares(holding) {
  return roundShares((holding?.lots ?? []).reduce((sum, lot) => sum + lot.shares, 0));
}

export function holdingCost(holding) {
  return (holding?.lots ?? []).reduce((sum, lot) => sum + lot.shares * lot.price, 0);
}

/**
 * Virtual portfolio persistence under `flearn_portfolio`.
 * Holdings keep individual buy lots so avg cost basis stays exact;
 * sells consume lots oldest-first (FIFO).
 */
export function usePortfolio() {
  const [portfolio, setPortfolio] = useState(readPortfolio);

  const commit = useCallback((next) => {
    writePortfolio(next);
    setPortfolio(next);
  }, []);

  const recordTrade = () => {
    recordAction(); // trades count toward the daily streak
    awardXp(25, "First Trade!", "trade:first");
    checkAchievements();
  };

  const buy = useCallback(
    (ticker, shares, price) => {
      shares = roundShares(shares);
      if (!(shares > 0)) return { ok: false, error: "Enter an amount to buy." };
      const cost = roundMoney(shares * price);
      if (cost > portfolio.cash + EPSILON) {
        return { ok: false, error: "Not enough cash for that trade." };
      }
      const holding = portfolio.holdings[ticker] ?? { lots: [] };
      const date = new Date().toISOString();
      commit({
        ...portfolio,
        cash: roundMoney(portfolio.cash - cost),
        holdings: {
          ...portfolio.holdings,
          [ticker]: { lots: [...holding.lots, { shares, price, date }] },
        },
        transactions: [
          { id: `${Date.now()}-${ticker}`, type: "buy", ticker, shares, price, amount: cost, date },
          ...portfolio.transactions,
        ],
      });
      recordTrade();
      return { ok: true };
    },
    [portfolio, commit]
  );

  const sell = useCallback(
    (ticker, shares, price) => {
      shares = roundShares(shares);
      if (!(shares > 0)) return { ok: false, error: "Enter an amount to sell." };
      const holding = portfolio.holdings[ticker];
      const owned = holdingShares(holding);
      if (shares > owned + EPSILON) {
        return { ok: false, error: "You don't own that many shares." };
      }
      // consume lots FIFO
      let remaining = shares;
      const lots = [];
      for (const lot of holding.lots) {
        if (remaining <= EPSILON) {
          lots.push(lot);
        } else if (lot.shares > remaining + EPSILON) {
          lots.push({ ...lot, shares: roundShares(lot.shares - remaining) });
          remaining = 0;
        } else {
          remaining -= lot.shares;
        }
      }
      const proceeds = roundMoney(shares * price);
      const date = new Date().toISOString();
      const holdings = { ...portfolio.holdings };
      if (lots.length > 0) holdings[ticker] = { lots };
      else delete holdings[ticker];
      commit({
        ...portfolio,
        cash: roundMoney(portfolio.cash + proceeds),
        holdings,
        transactions: [
          { id: `${Date.now()}-${ticker}`, type: "sell", ticker, shares, price, amount: proceeds, date },
          ...portfolio.transactions,
        ],
      });
      recordTrade();
      return { ok: true };
    },
    [portfolio, commit]
  );

  const reset = useCallback(() => commit(freshPortfolio()), [commit]);

  return { portfolio, buy, sell, reset };
}
