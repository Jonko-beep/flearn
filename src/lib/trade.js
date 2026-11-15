// Order sizing for the trade dialog: turns what the user typed (a dollar
// amount or a share count) into the share quantity actually traded. Pure, so
// it can be unit-tested.

const SHARE_SCALE = 10000; // 4 decimal places of fractional shares
const FLOAT_SLOP = 1e-7;

function floorShares(n) {
  return Math.floor(n * SHARE_SCALE + FLOAT_SLOP) / SHARE_SCALE;
}

function roundShares(n) {
  return Math.round(n * SHARE_SCALE) / SHARE_SCALE;
}

/**
 * Shares to trade for an order.
 *
 * Dollar orders round DOWN to 4 decimals so a buy never costs more than the
 * amount entered (rounding to nearest could overshoot available cash by a few
 * cents on high-priced tickers, rejecting a "Max" buy). A dollar sell worth
 * the whole position (to the cent) sells every share instead of stranding
 * fractional dust or overshooting what's owned.
 */
export function sharesForOrder({ side, mode, amount, price, ownedShares = 0 }) {
  if (!Number.isFinite(amount) || amount <= 0 || !(price > 0)) return 0;
  if (mode === "shares") return roundShares(amount);
  // The Max button fills in the position's value rounded to the cent.
  if (side === "sell" && ownedShares > 0 && Math.abs(amount - ownedShares * price) < 0.0051) {
    return ownedShares;
  }
  return floorShares(amount / price);
}
