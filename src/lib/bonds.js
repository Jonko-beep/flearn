// Bond math for the Bonds & Fixed Income lessons. Pure functions so the worked
// examples in src/data/bondsCategory.js can be checked by tests/bonds.test.js.
// Rates are decimals (0.05 = 5%). U.S. bonds pay interest twice a year, so
// that's the default.

/**
 * Price of a bond today: every remaining interest payment plus the face value
 * at maturity, each discounted at the market yield.
 */
export function bondPrice({ face = 1000, couponRate, marketYield, years, perYear = 2 }) {
  const payment = (face * couponRate) / perYear;
  const r = marketYield / perYear;
  const periods = Math.round(years * perYear);
  let price = 0;
  for (let t = 1; t <= periods; t++) price += payment / (1 + r) ** t;
  return price + face / (1 + r) ** periods;
}

/** Yearly interest divided by today's price. */
export function currentYield({ face = 1000, couponRate, price }) {
  return (face * couponRate) / price;
}

/**
 * Modified duration: roughly how much the price moves, in percent, for a
 * one-percentage-point change in yield.
 */
export function modifiedDuration({ face = 1000, couponRate, marketYield, years, perYear = 2 }) {
  const payment = (face * couponRate) / perYear;
  const r = marketYield / perYear;
  const periods = Math.round(years * perYear);
  let price = 0;
  let weighted = 0;
  for (let t = 1; t <= periods; t++) {
    const cash = payment + (t === periods ? face : 0);
    const pv = cash / (1 + r) ** t;
    price += pv;
    weighted += (pv * t) / perYear;
  }
  return weighted / price / (1 + r);
}

/** The duration rule of thumb: % price change ≈ −duration × change in yield. */
export function durationEstimate(duration, yieldChange) {
  return -duration * yieldChange;
}

/** What a taxable bond would have to yield to match a tax-free one. */
export function taxEquivalentYield(taxFreeYield, taxRate) {
  return taxFreeYield / (1 - taxRate);
}
