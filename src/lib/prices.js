// Simulated price feed. This is the ONLY module the rest of the app talks to
// for prices — swap the internals for a real market-data API later and keep
// the exported getPrice / getQuote interface unchanged.
//
// Prices are a seeded daily random walk from each stock's basePrice: the seed
// for each day's move is hash(ticker + ISO date), so a ticker's price is
// stable within a calendar day (and across refreshes) but drifts day to day.

import { getStock } from "../data/stocks.js";

// Walk starts here; dates on/before the epoch return basePrice.
const EPOCH_UTC = Date.UTC(2026, 0, 1);
const MS_PER_DAY = 86400000;
const DAILY_DRIFT = 0.0004; // ~10%/yr upward bias so long holders see growth

function hashString(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Days since epoch for a Date, using the user's local calendar date so
// "today's price" rolls over at local midnight.
function dayIndexOf(date) {
  const utcMidnight = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((utcMidnight - EPOCH_UTC) / MS_PER_DAY);
}

function isoDateOfIndex(dayIndex) {
  return new Date(EPOCH_UTC + dayIndex * MS_PER_DAY).toISOString().slice(0, 10);
}

function dailyReturn(ticker, isoDate, volatility) {
  const rng = mulberry32(hashString(`${ticker}|${isoDate}`));
  // Average of three uniforms gives a rough bell curve centered on 0.5.
  const u = (rng() + rng() + rng()) / 3;
  return (u - 0.5) * 2 * volatility + DAILY_DRIFT;
}

// cache: ticker -> array of prices indexed by day (index 0 = epoch = basePrice)
const priceCache = new Map();

function priceAtDayIndex(stock, dayIndex) {
  if (dayIndex <= 0) return stock.basePrice;
  let series = priceCache.get(stock.ticker);
  if (!series) {
    series = [stock.basePrice];
    priceCache.set(stock.ticker, series);
  }
  for (let i = series.length; i <= dayIndex; i++) {
    const next = series[i - 1] * (1 + dailyReturn(stock.ticker, isoDateOfIndex(i), stock.volatility));
    series.push(Math.max(next, 0.01));
  }
  return series[dayIndex];
}

/** Today's simulated price for a ticker. */
export function getPrice(ticker, date = new Date()) {
  const stock = getStock(ticker);
  if (!stock) return null;
  return priceAtDayIndex(stock, dayIndexOf(date));
}

/** Today's price plus daily change vs. the previous derived day. */
export function getQuote(ticker, date = new Date()) {
  const stock = getStock(ticker);
  if (!stock) return null;
  const today = dayIndexOf(date);
  const price = priceAtDayIndex(stock, today);
  const prevPrice = priceAtDayIndex(stock, today - 1);
  const change = price - prevPrice;
  return {
    ticker,
    price,
    prevPrice,
    change,
    changePct: prevPrice > 0 ? (change / prevPrice) * 100 : 0,
  };
}
