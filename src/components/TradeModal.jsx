import { useEffect, useState } from "react";
import { TriangleAlert, X } from "lucide-react";
import { fmtMoney, fmtPct, fmtShares } from "../lib/format.js";
import { sharesForOrder } from "../lib/trade.js";
import { Button, Segmented, cx } from "../ui/kit.jsx";

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

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const amount = parseFloat(input);
  const valid = Number.isFinite(amount) && amount > 0;
  const roundedShares = sharesForOrder({ side, mode, amount, price: quote.price, ownedShares });
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
  const showEstimate = valid && roundedShares > 0;
  const cashAfter = side === "buy" ? cash - cost : cash + cost;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Trade ${stock.ticker}`}
        className="w-full max-w-[440px] animate-enter rounded-t-2xl border border-edge-strong bg-card p-6 shadow-pop sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2.5">
              <h2 className="font-mono text-[1.4rem] font-semibold tracking-tight">{stock.ticker}</h2>
              <span className="truncate text-sm text-ink-muted">{stock.name}</span>
            </div>
            <div className="num mt-1 flex items-baseline gap-2">
              <span className="text-[1.05rem] font-semibold text-ink">{fmtMoney(quote.price)}</span>
              <span className={cx("text-sm font-medium", up ? "text-gain" : "text-loss")}>
                {fmtPct(quote.changePct)} today
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-raised hover:text-ink"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Buy / sell */}
        <div className="mt-5 grid grid-cols-2 gap-1 rounded-lg border border-edge bg-well p-1">
          {["buy", "sell"].map((s) => {
            const active = side === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSide(s);
                  setError(null);
                }}
                disabled={s === "sell" && ownedShares <= 0}
                className={cx(
                  "h-9 rounded-md text-sm font-semibold capitalize transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  active
                    ? s === "buy"
                      ? "bg-gain text-accent-fg"
                      : "bg-loss text-accent-fg"
                    : "text-ink-secondary hover:text-ink"
                )}
              >
                {s}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <label htmlFor="trade-amount" className="text-sm font-medium text-ink-secondary">
            Amount
          </label>
          <Segmented
            size="sm"
            label="Enter the amount as"
            value={mode}
            onChange={(m) => {
              setMode(m);
              setInput("");
              setError(null);
            }}
            options={[
              { value: "dollars", label: "Dollars" },
              { value: "shares", label: "Shares" },
            ]}
          />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="relative flex-1">
            {mode === "dollars" && (
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted">$</span>
            )}
            <input
              id="trade-amount"
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
              className={cx("field num h-12 text-[1.05rem] font-semibold", mode === "dollars" && "pl-8")}
            />
          </div>
          <Button variant="secondary" size="lg" onClick={setMax}>
            Max
          </Button>
        </div>

        <dl className="num mt-4 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-muted">{mode === "dollars" ? "Estimated shares" : "Estimated cost"}</dt>
            <dd className="font-medium text-ink">
              {showEstimate ? (mode === "dollars" ? fmtShares(roundedShares) : fmtMoney(cost)) : "—"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-muted">{side === "buy" ? "Cash available" : "Shares you own"}</dt>
            <dd className="font-medium text-ink">{side === "buy" ? fmtMoney(cash) : fmtShares(ownedShares)}</dd>
          </div>
          <div className="flex justify-between border-t border-edge pt-1.5">
            <dt className="text-ink-muted">Cash after</dt>
            <dd className="font-semibold text-ink">{showEstimate ? fmtMoney(cashAfter) : "—"}</dd>
          </div>
        </dl>

        {(liveError || error) && (
          <p className="mt-4 flex gap-2 rounded-lg border border-warn/30 bg-warn/10 px-3 py-2.5 text-sm text-warn" role="alert">
            <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden />
            {liveError || error}
          </p>
        )}

        <Button
          variant={side === "buy" ? "gain" : "loss"}
          size="lg"
          className="mt-5 w-full"
          onClick={submit}
          disabled={!canSubmit}
        >
          {side === "buy" ? "Buy" : "Sell"} {stock.ticker}
        </Button>
      </div>
    </div>
  );
}
