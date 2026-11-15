// Options payoff math for the Options Payoff Visualizer and the Options
// lessons. Everything here is the position's value AT EXPIRATION, when an
// option is worth exactly its intrinsic value — no pricing model, no early
// exercise, no fees or taxes. Pure functions so they're unit-testable.

export const CONTRACT_SIZE = 100; // one standard equity option contract = 100 shares

export const STRATEGIES = [
  {
    id: "long-call",
    label: "Buy a call",
    outlook: "Bullish",
    summary: "Pay a premium for the right to buy 100 shares at the strike.",
    defaults: { strike: 105, premium: 3 },
  },
  {
    id: "long-put",
    label: "Buy a put",
    outlook: "Bearish",
    summary: "Pay a premium for the right to sell 100 shares at the strike.",
    defaults: { strike: 95, premium: 3 },
  },
  {
    id: "covered-call",
    label: "Covered call",
    outlook: "Neutral to mildly bullish",
    summary: "Own 100 shares and sell a call against them for income.",
    defaults: { strike: 110, premium: 2.5 },
  },
  {
    id: "cash-secured-put",
    label: "Cash-secured put",
    outlook: "Neutral to mildly bullish",
    summary: "Sell a put while holding the cash to buy 100 shares at the strike.",
    defaults: { strike: 90, premium: 2 },
  },
];

export function getStrategy(id) {
  return STRATEGIES.find((s) => s.id === id) ?? null;
}

/** What a call is worth per share at expiration. */
export function callValueAtExpiry(strike, price) {
  return Math.max(price - strike, 0);
}

/** What a put is worth per share at expiration. */
export function putValueAtExpiry(strike, price) {
  return Math.max(strike - price, 0);
}

const isCallStrategy = (strategy) => strategy === "long-call" || strategy === "covered-call";

/**
 * Intrinsic value per share of the option in a strategy, with the stock at
 * `stockPrice` today. A real option never trades below this, so a premium
 * under it is an unrealistic input.
 */
export function intrinsicValue(strategy, stockPrice, strike) {
  return isCallStrategy(strategy)
    ? callValueAtExpiry(strike, stockPrice)
    : putValueAtExpiry(strike, stockPrice);
}

/**
 * Profit or loss PER SHARE at expiration if the stock finishes at `price`.
 * stockPrice is today's share price — the purchase price of the shares in a
 * covered call; it doesn't affect the other three payoffs.
 */
export function profitPerShare(strategy, { stockPrice, strike, premium }, price) {
  switch (strategy) {
    case "long-call":
      return callValueAtExpiry(strike, price) - premium;
    case "long-put":
      return putValueAtExpiry(strike, price) - premium;
    case "covered-call":
      // stock gain/loss + premium kept − what the sold call costs you
      return price - stockPrice + premium - callValueAtExpiry(strike, price);
    case "cash-secured-put":
      return premium - putValueAtExpiry(strike, price);
    default:
      throw new Error(`Unknown options strategy: ${strategy}`);
  }
}

const CHART_POINTS = 80;

/**
 * Full payoff picture for a position of `contracts` contracts.
 *
 * Returns dollar totals:
 *   breakeven   stock price at expiration where P/L is zero (null if the
 *               position can't break even at any price ≥ 0)
 *   maxProfit   best case (Infinity for a long call)
 *   maxLoss     worst case, as a positive number
 *   capital     cash tied up to open the position
 *   profitAt    (price) => total P/L at that expiration price
 *   series      [{ price, profit }] sampled from $0 past the strike, for charts
 */
export function computeOptionPayoff({ strategy, stockPrice, strike, premium, contracts = 1 }) {
  const shares = CONTRACT_SIZE * contracts;
  const inputs = { stockPrice, strike, premium };
  const profitAt = (price) => profitPerShare(strategy, inputs, price) * shares;

  let breakeven;
  let maxProfit;
  let maxLoss;
  let capital;

  switch (strategy) {
    case "long-call":
      breakeven = strike + premium;
      maxProfit = Infinity;
      maxLoss = premium * shares;
      capital = premium * shares;
      break;
    case "long-put":
      breakeven = strike - premium;
      maxProfit = Math.max(0, strike - premium) * shares;
      maxLoss = premium * shares;
      capital = premium * shares;
      break;
    case "covered-call":
      breakeven = stockPrice - premium;
      maxProfit = (strike - stockPrice + premium) * shares;
      maxLoss = Math.max(0, stockPrice - premium) * shares; // stock goes to $0
      capital = Math.max(0, stockPrice - premium) * shares;
      break;
    case "cash-secured-put":
      breakeven = strike - premium;
      maxProfit = premium * shares;
      maxLoss = Math.max(0, strike - premium) * shares; // forced to buy a $0 stock at the strike
      capital = Math.max(0, strike - premium) * shares;
      break;
    default:
      throw new Error(`Unknown options strategy: ${strategy}`);
  }
  if (!(breakeven > 0)) breakeven = null;

  // Sample well past both the strike and today's price so the capped/uncapped
  // shape on the right-hand side is visible.
  const top = Math.max(strike, stockPrice) * 1.6;
  const series = [];
  for (let i = 0; i <= CHART_POINTS; i++) {
    const price = (top * i) / CHART_POINTS;
    series.push({ price: Math.round(price * 100) / 100, profit: Math.round(profitAt(price) * 100) / 100 });
  }

  return { breakeven, maxProfit, maxLoss, capital, profitAt, series, shares };
}

/**
 * How far the stock has to move from today's price to reach breakeven, as a
 * signed percentage (+7.5 = must rise 7.5%). Null when there's no breakeven.
 */
export function moveToBreakevenPct(stockPrice, breakeven) {
  if (breakeven === null || !(stockPrice > 0)) return null;
  return ((breakeven - stockPrice) / stockPrice) * 100;
}
