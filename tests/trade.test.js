// Unit tests for trade-dialog order sizing (src/lib/trade.js).

import test from "node:test";
import assert from "node:assert/strict";
import { sharesForOrder } from "../src/lib/trade.js";

test("a dollar buy never costs more than the dollars entered", () => {
  // Rounding to the nearest 0.0001 share used to overshoot cash on pricey
  // tickers, so pressing Max on a buy was rejected as "not enough cash".
  for (const price of [692.4, 566.2, 521.7, 428.9, 28.4, 0.37]) {
    for (const amount of [10000, 9999.99, 1234.56, 50, 0.5]) {
      const shares = sharesForOrder({ side: "buy", mode: "dollars", amount, price });
      assert.ok(shares * price <= amount + 1e-9, `${amount} @ ${price} → ${shares}`);
      // ...and wastes less than one share-increment of buying power.
      assert.ok(amount - shares * price < price / 10000 + 1e-9);
    }
  }
});

test("exact dollar amounts convert to whole share counts", () => {
  assert.equal(sharesForOrder({ side: "buy", mode: "dollars", amount: 100, price: 50 }), 2);
  assert.equal(sharesForOrder({ side: "buy", mode: "dollars", amount: 0.3, price: 0.1 }), 3);
});

test("selling the full dollar value of a position sells every share", () => {
  for (const [ownedShares, price] of [
    [3.1234, 28.4],
    [0.0007, 692.4],
    [17.6056, 28.4],
    [12, 63.4],
  ]) {
    const amount = Number((ownedShares * price).toFixed(2)); // what Max fills in
    const shares = sharesForOrder({ side: "sell", mode: "dollars", amount, price, ownedShares });
    assert.equal(shares, ownedShares);
  }
});

test("a dollar sell above the position's value is left for validation to reject", () => {
  const shares = sharesForOrder({
    side: "sell",
    mode: "dollars",
    amount: 500,
    price: 50,
    ownedShares: 2,
  });
  assert.ok(shares > 2);
});

test("share-count orders round to 4 decimals; junk input sizes to zero", () => {
  assert.equal(sharesForOrder({ side: "buy", mode: "shares", amount: 1.23456, price: 10 }), 1.2346);
  assert.equal(sharesForOrder({ side: "buy", mode: "dollars", amount: NaN, price: 10 }), 0);
  assert.equal(sharesForOrder({ side: "buy", mode: "dollars", amount: -5, price: 10 }), 0);
  assert.equal(sharesForOrder({ side: "buy", mode: "dollars", amount: 5, price: 0 }), 0);
});
