export function fmtMoney(n, { sign = false } = {}) {
  const abs = Math.abs(n);
  const str = abs.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (n < -0.004) return `-${str}`;
  if (sign && n > 0.004) return `+${str}`;
  return str;
}

export function fmtPct(n, { sign = true } = {}) {
  const str = `${Math.abs(n).toFixed(2)}%`;
  if (n < -0.004) return `-${str}`;
  if (sign && n > 0.004) return `+${str}`;
  return str;
}

export function fmtShares(n) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}
