import { useState } from "react";
import { fmtMoney, fmtPct, fmtShares } from "../lib/format.js";

const ACCENT = "#0D9488";

/**
 * Buy/sell dialog for one ticker. Amount can be entered in dollars or
 * shares (fractional to 4 decimals); validation happens live so the
 * confirm button only enables on a legal trade.
 */
export default function TradeModal({ stock, quote, ownedShares, cash, onTrade, onClose }) {
  const [side, setSide] = useState("buy");
  const [mode, setMode] = useState("dollars");
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const amount = parseFloat(input);
  const valid = Number.isFinite(amount) && amount > 0;
  const shares = !valid ? 0 : mode === "dollars" ? amount / quote.price : amount;
  const roundedShares = Math.round(shares * 10000) / 10000;
  const cost = roundedShares * quote.price;

  const overCash = side === "buy" && valid && cost > cash + 0.005;
  const overShares = side === "sell" && valid && roundedShares > ownedShares + 1e-7;
  const liveError = overCash
    ? `That's ${fmtMoney(cost)} — you only have ${fmtMoney(cash)} in cash.`
    : overShares
      ? `You only own ${fmtShares(ownedShares)} shares of ${stock.ticker}.`
      : null;
  const canSubmit = valid && roundedShares > 0 && !liveError;

  const setMax = () => {
    if (side === "buy") {
      setInput(mode === "dollars" ? cash.toFixed(2) : String(Math.floor((cash / quote.price) * 10000) / 10000));
    } else {
      setInput(mode === "dollars" ? (ownedShares * quote.price).toFixed(2) : String(ownedShares));
    }
    setError(null);
  };

  const submit = () => {
    const result = onTrade(side, stock.ticker, roundedShares, quote.price);
    if (result.ok) onClose();
    else setError(result.error);
  };

  const up = quote.changePct >= 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] animate-scale-in rounded-card-lg border border-edge bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 flex items-baseline justify-between">
          <h3 className="m-0 text-xl font-bold">{stock.ticker}</h3>
          <button
            onClick={onClose}
            className="rounded-md px-2 text-lg text-ink-muted transition-colors hover:text-ink"
          >
            ✕
          </button>
        </div>
        <p className="m-0 mb-4 text-sm text-ink-secondary">
          {stock.name} · {fmtMoney(quote.price)}{" "}
          <span className={up ? "text-success" : "text-error"}>
            {fmtPct(quote.changePct)} today
          </span>
        </p>

        {/* Buy / Sell toggle */}
        <div className="mb-4 flex gap-2">
          {["buy", "sell"].map((s) => (
            <button
              key={s}
              onClick={() => {
                setSide(s);
                setError(null);
              }}
              disabled={s === "sell" && ownedShares <= 0}
              className="flex-1 rounded-card py-2 text-sm font-semibold capitalize transition-all disabled:cursor-not-allowed disabled:opacity-40"
              style={
                side === s
                  ? { background: s === "buy" ? ACCENT : "#dc2626", color: "#fff" }
                  : { background: "#0f172a", color: "#94a3b8" }
              }
            >
              {s}
            </button>
          ))}
        </div>

        {/* Dollars / Shares toggle */}
        <div className="mb-2 flex gap-4 text-sm">
          {[
            ["dollars", "Dollar amount"],
            ["shares", "Share count"],
          ].map(([m, label]) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setInput("");
                setError(null);
              }}
              className="transition-colors"
              style={{ color: mode === m ? ACCENT : "#64748b", fontWeight: mode === m ? 600 : 400 }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-1 flex items-center gap-2">
          <div className="relative flex-1">
            {mode === "dollars" && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">$</span>
            )}
            <input
              type="number"
              min="0"
              step={mode === "dollars" ? "0.01" : "0.0001"}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              placeholder={mode === "dollars" ? "0.00" : "0.0000"}
              autoFocus
              className="w-full rounded-card border border-edge bg-well py-2.5 pr-3 text-ink outline-none transition-colors focus:border-invest"
              style={{ paddingLeft: mode === "dollars" ? "1.75rem" : "0.75rem" }}
            />
          </div>
          <button
            onClick={setMax}
            className="rounded-card border border-edge px-3 py-2.5 text-sm text-ink-secondary transition-colors hover:border-invest hover:text-ink"
          >
            Max
          </button>
        </div>

        <p className="m-0 mb-3 min-h-[1.25rem] text-sm text-ink-muted">
          {valid && roundedShares > 0 && (
            <>
              {mode === "dollars"
                ? `≈ ${fmtShares(roundedShares)} shares`
                : `≈ ${fmtMoney(cost)}`}
              {" · "}
              {side === "buy" ? `cash after: ${fmtMoney(cash - cost)}` : `cash after: ${fmtMoney(cash + cost)}`}
            </>
          )}
        </p>

        {(liveError || error) && (
          <p className="m-0 mb-3 rounded-card border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
            🐻 {liveError || error}
          </p>
        )}

        <button
          onClick={submit}
          disabled={!canSubmit}
          className="w-full rounded-card py-3 font-serif text-base font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: side === "buy" ? `linear-gradient(135deg, ${ACCENT}, #0f766e)` : "linear-gradient(135deg, #dc2626, #b91c1c)" }}
        >
          {side === "buy" ? "Buy" : "Sell"} {stock.ticker}
        </button>

        <p className="m-0 mt-3 text-center text-xs text-ink-muted">
          {side === "buy" ? `Cash available: ${fmtMoney(cash)}` : `You own ${fmtShares(ownedShares)} shares`}
        </p>
      </div>
    </div>
  );
}
