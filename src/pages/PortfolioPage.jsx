import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { stocks, getStock, sectorColors } from "../data/stocks.js";
import { getQuote } from "../lib/prices.js";
import { usePortfolio, holdingShares, holdingCost } from "../hooks/usePortfolio.js";
import { fmtMoney, fmtPct, fmtShares } from "../lib/format.js";
import { computeBenchmark } from "../lib/benchmark.js";
import TradeModal from "../components/TradeModal.jsx";
import BenchmarkCard from "../components/BenchmarkCard.jsx";

const ACCENT = "#0D9488";

function GainText({ value, pct, className = "" }) {
  const color = value >= 0.005 ? "text-success" : value <= -0.005 ? "text-error" : "text-ink-secondary";
  return (
    <span className={`${color} ${className}`}>
      {fmtMoney(value, { sign: true })}
      {pct !== undefined && ` (${fmtPct(pct)})`}
    </span>
  );
}

function SectorPill({ sector }) {
  const color = sectorColors[sector] ?? ACCENT;
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[0.7rem] font-medium whitespace-nowrap"
      style={{ background: `${color}18`, color }}
    >
      {sector}
    </span>
  );
}

export default function PortfolioPage() {
  const { portfolio, buy, sell, reset } = usePortfolio();
  const [search, setSearch] = useState("");
  const [trading, setTrading] = useState(null); // ticker being traded
  const [confirmingReset, setConfirmingReset] = useState(false);

  const quotes = useMemo(() => {
    const map = {};
    for (const s of stocks) map[s.ticker] = getQuote(s.ticker);
    return map;
  }, []);

  // Null until the first transaction, which hides the benchmark card.
  const benchmark = useMemo(() => computeBenchmark(portfolio), [portfolio]);

  const holdings = useMemo(() => {
    return Object.entries(portfolio.holdings)
      .map(([ticker, holding]) => {
        const shares = holdingShares(holding);
        if (shares <= 0) return null;
        const cost = holdingCost(holding);
        const avgCost = cost / shares;
        const price = quotes[ticker]?.price ?? avgCost;
        const marketValue = shares * price;
        const gain = marketValue - cost;
        return {
          ticker,
          shares,
          avgCost,
          price,
          marketValue,
          gain,
          gainPct: cost > 0 ? (gain / cost) * 100 : 0,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.marketValue - a.marketValue);
  }, [portfolio.holdings, quotes]);

  const holdingsValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const totalValue = portfolio.cash + holdingsValue;
  const totalReturn = totalValue - portfolio.startingCash;
  const totalReturnPct = (totalReturn / portfolio.startingCash) * 100;

  const filtered = stocks.filter((s) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      s.ticker.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.sector.toLowerCase().includes(q)
    );
  });

  const handleTrade = (side, ticker, shares, price) =>
    side === "buy" ? buy(ticker, shares, price) : sell(ticker, shares, price);

  const tradingStock = trading ? getStock(trading) : null;

  return (
    <div className="min-h-screen p-8 max-md:p-5">
      <div className="mx-auto max-w-[760px]">
        <Link
          to="/learn"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to learning
        </Link>

        <div className="mb-6 animate-fade-in-down">
          <div className="flex items-center gap-3">
            <span
              className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
              style={{ background: `${ACCENT}15` }}
            >
              💼
            </span>
            <div>
              <h2 className="m-0 text-3xl font-bold">Portfolio</h2>
              <span className="text-sm text-ink-muted">
                Practice investing with $10,000 in virtual cash — no real money, real lessons.
              </span>
            </div>
          </div>
        </div>

        {/* Summary header */}
        <div
          className="mb-6 rounded-card-lg border bg-card p-6"
          style={{ borderColor: `${ACCENT}33`, animation: "fadeInUp 0.6s ease-out 0.1s both" }}
        >
          <div className="mb-1 text-sm text-ink-secondary">Total portfolio value</div>
          <div className="font-serif text-4xl font-bold tracking-heading">
            {fmtMoney(totalValue)}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="text-ink-muted">Total return: </span>
              <GainText value={totalReturn} pct={totalReturnPct} className="font-semibold" />
            </div>
            <div>
              <span className="text-ink-muted">Cash available: </span>
              <span className="font-semibold text-ink">{fmtMoney(portfolio.cash)}</span>
            </div>
            <div>
              <span className="text-ink-muted">Invested: </span>
              <span className="font-semibold text-ink">{fmtMoney(holdingsValue)}</span>
            </div>
          </div>
        </div>

        {/* You vs. the Market */}
        <BenchmarkCard benchmark={benchmark} />

        {/* Holdings */}
        <section className="mb-8" style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}>
          <h3 className="m-0 mb-3 text-xl font-semibold">Your Holdings</h3>
          {holdings.length === 0 ? (
            <div className="rounded-card-lg border border-edge bg-card p-6 text-center">
              <div className="mb-2 text-3xl">🦭</div>
              <p className="m-0 text-sm text-ink-secondary">
                Nothing yet. Warren the Walrus says: pick a company you understand and make
                your first trade below.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-card-lg border border-edge bg-card">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left text-xs text-ink-muted">
                    {["Ticker", "Shares", "Avg Cost", "Price", "Value", "Gain / Loss", ""].map(
                      (h) => (
                        <th key={h} className="border-b border-edge px-4 py-3 font-medium whitespace-nowrap">
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => (
                    <tr key={h.ticker} className="border-b border-edge/50 last:border-b-0">
                      <td className="px-4 py-3 font-semibold text-ink">{h.ticker}</td>
                      <td className="px-4 py-3 text-ink-secondary">{fmtShares(h.shares)}</td>
                      <td className="px-4 py-3 text-ink-secondary">{fmtMoney(h.avgCost)}</td>
                      <td className="px-4 py-3 text-ink-secondary">{fmtMoney(h.price)}</td>
                      <td className="px-4 py-3 text-ink">{fmtMoney(h.marketValue)}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <GainText value={h.gain} pct={h.gainPct} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setTrading(h.ticker)}
                          className="rounded-card border border-edge px-3 py-1.5 text-xs text-ink-secondary transition-colors hover:border-invest hover:text-ink"
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Market */}
        <section className="mb-8" style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h3 className="m-0 text-xl font-semibold">Market</h3>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ticker, name, or sector…"
              className="w-full max-w-[260px] rounded-card border border-edge bg-well px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-invest"
            />
          </div>
          <div className="flex flex-col gap-2">
            {filtered.map((s) => {
              const q = quotes[s.ticker];
              const up = q.changePct >= 0;
              const owned = holdingShares(portfolio.holdings[s.ticker]);
              return (
                <button
                  key={s.ticker}
                  onClick={() => setTrading(s.ticker)}
                  className="flex items-center gap-3 rounded-card-lg border border-edge bg-card p-4 text-left transition-all duration-200 hover:-translate-y-px hover:border-invest/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-ink">{s.ticker}</span>
                      <SectorPill sector={s.sector} />
                      {owned > 0 && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[0.7rem] font-medium"
                          style={{ background: `${ACCENT}18`, color: ACCENT }}
                        >
                          Owned
                        </span>
                      )}
                    </div>
                    <div className="truncate text-sm text-ink-muted">{s.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-ink">{fmtMoney(q.price)}</div>
                    <div className={`text-sm ${up ? "text-success" : "text-error"}`}>
                      {fmtPct(q.changePct)}
                    </div>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="m-0 py-4 text-center text-sm text-ink-muted">
                No tickers match "{search}".
              </p>
            )}
          </div>
        </section>

        {/* Transactions */}
        <section className="mb-8" style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}>
          <h3 className="m-0 mb-3 text-xl font-semibold">Transactions</h3>
          {portfolio.transactions.length === 0 ? (
            <p className="m-0 text-sm text-ink-muted">No trades yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {portfolio.transactions.map((t) => (
                <div
                  key={t.id + t.date}
                  className="flex items-center justify-between gap-3 rounded-card border border-edge bg-card px-4 py-3 text-sm"
                >
                  <div>
                    <span
                      className={`mr-2 font-semibold uppercase ${t.type === "buy" ? "text-invest" : "text-error"}`}
                    >
                      {t.type}
                    </span>
                    <span className="font-semibold text-ink">{t.ticker}</span>
                    <span className="text-ink-secondary">
                      {" "}
                      · {fmtShares(t.shares)} sh @ {fmtMoney(t.price)}
                    </span>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <div className="text-ink">{fmtMoney(t.amount)}</div>
                    <div className="text-xs text-ink-muted">
                      {new Date(t.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reset */}
        <div className="mb-4 text-center" style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}>
          {confirmingReset ? (
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-card-lg border border-error/40 bg-card px-5 py-4 text-sm">
              <span className="text-ink-secondary">
                Wipe all holdings and history, back to {fmtMoney(portfolio.startingCash)}?
              </span>
              <button
                onClick={() => {
                  reset();
                  setConfirmingReset(false);
                }}
                className="rounded-card bg-error px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setConfirmingReset(false)}
                className="rounded-card border border-edge px-4 py-2 text-ink-secondary transition-colors hover:text-ink"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmingReset(true)}
              className="text-sm text-ink-muted transition-colors hover:text-error"
            >
              Reset Portfolio
            </button>
          )}
        </div>

        <p className="m-0 pb-4 text-center text-xs text-ink-muted">
          Simulated prices for practice only — they drift daily but aren't real market data.
        </p>
      </div>

      {tradingStock && (
        <TradeModal
          stock={tradingStock}
          quote={quotes[tradingStock.ticker]}
          ownedShares={holdingShares(portfolio.holdings[tradingStock.ticker])}
          cash={portfolio.cash}
          onTrade={handleTrade}
          onClose={() => setTrading(null)}
        />
      )}
    </div>
  );
}
