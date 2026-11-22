import { useMemo, useState } from "react";
import { ChartCandlestick, RotateCcw, Search } from "lucide-react";
import { stocks, getStock } from "../data/stocks.js";
import { getQuote } from "../lib/prices.js";
import { usePortfolio, holdingShares, holdingCost } from "../hooks/usePortfolio.js";
import { fmtMoney, fmtPct, fmtShares } from "../lib/format.js";
import { computeBenchmark } from "../lib/benchmark.js";
import TradeModal from "../components/TradeModal.jsx";
import BenchmarkCard from "../components/BenchmarkCard.jsx";
import { Badge, Button, Card, Empty, PageHeader, SectionTitle, cx } from "../ui/kit.jsx";

const gainTone = (value) => (value >= 0.005 ? "text-gain" : value <= -0.005 ? "text-loss" : "text-ink-secondary");

function GainText({ value, pct, className }) {
  return (
    <span className={cx("num", gainTone(value), className)}>
      {fmtMoney(value, { sign: true })}
      {pct !== undefined && ` (${fmtPct(pct)})`}
    </span>
  );
}

function Ticker({ children }) {
  return <span className="font-mono text-[0.9rem] font-semibold tracking-tight text-ink">{children}</span>;
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
  const investedPct = totalValue > 0 ? (holdingsValue / totalValue) * 100 : 0;

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
    <div className="animate-enter">
      <PageHeader
        title="Portfolio"
        subtitle={`Practice investing with ${fmtMoney(portfolio.startingCash).replace(/\.00$/, "")} in virtual cash — no real money, real lessons.`}
      />

      <div className="flex flex-col gap-6">
        {/* Summary */}
        <Card className="overflow-hidden">
          <div className="grid gap-px bg-edge md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="bg-card p-5">
              <div className="eyebrow">Total portfolio value</div>
              <div className="num mt-1.5 font-display text-[2.3rem] font-semibold leading-none tracking-tight">
                {fmtMoney(totalValue)}
              </div>
            </div>
            <div className="bg-card p-5">
              <div className="eyebrow">Total return</div>
              <div className={cx("num mt-2 text-[1.2rem] font-semibold leading-none", gainTone(totalReturn))}>
                {fmtMoney(totalReturn, { sign: true })}
              </div>
              <div className={cx("num mt-1.5 text-[0.8125rem]", gainTone(totalReturn))}>{fmtPct(totalReturnPct)}</div>
            </div>
            <div className="bg-card p-5">
              <div className="eyebrow">Cash available</div>
              <div className="num mt-2 text-[1.2rem] font-semibold leading-none">{fmtMoney(portfolio.cash)}</div>
              <div className="num mt-1.5 text-[0.8125rem] text-ink-muted">{(100 - investedPct).toFixed(0)}% of total</div>
            </div>
            <div className="bg-card p-5">
              <div className="eyebrow">Invested</div>
              <div className="num mt-2 text-[1.2rem] font-semibold leading-none">{fmtMoney(holdingsValue)}</div>
              <div className="num mt-1.5 text-[0.8125rem] text-ink-muted">{investedPct.toFixed(0)}% of total</div>
            </div>
          </div>
          <div className="h-1 bg-edge" aria-hidden>
            <div className="h-full bg-accent transition-[width] duration-500" style={{ width: `${investedPct}%` }} />
          </div>
        </Card>

        {/* You vs. the market */}
        <BenchmarkCard benchmark={benchmark} />

        {/* Holdings */}
        <section>
          <SectionTitle>Your holdings</SectionTitle>
          {holdings.length === 0 ? (
            <Empty icon={ChartCandlestick} mascot="walrus" title="Nothing yet">
              Warren the Walrus says: pick a company you understand and make your first trade below.
            </Empty>
          ) : (
            <Card className="overflow-x-auto">
              <table className="table-plain num min-w-[640px]">
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th className="!text-right">Shares</th>
                    <th className="!text-right">Avg cost</th>
                    <th className="!text-right">Price</th>
                    <th className="!text-right">Value</th>
                    <th className="!text-right">Gain / loss</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => (
                    <tr key={h.ticker}>
                      <td>
                        <Ticker>{h.ticker}</Ticker>
                      </td>
                      <td className="text-right text-ink-secondary">{fmtShares(h.shares)}</td>
                      <td className="text-right text-ink-secondary">{fmtMoney(h.avgCost)}</td>
                      <td className="text-right text-ink-secondary">{fmtMoney(h.price)}</td>
                      <td className="text-right font-medium text-ink">{fmtMoney(h.marketValue)}</td>
                      <td className="text-right whitespace-nowrap">
                        <GainText value={h.gain} pct={h.gainPct} />
                      </td>
                      <td className="text-right">
                        <Button variant="secondary" size="sm" onClick={() => setTrading(h.ticker)}>
                          Trade
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </section>

        {/* Market */}
        <section>
          <SectionTitle
            action={
              <div className="relative w-full max-w-[280px]">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search ticker, name, or sector"
                  aria-label="Search the market"
                  className="field h-9 pl-9"
                />
              </div>
            }
            className="items-center"
          >
            Market
          </SectionTitle>
          <Card className="overflow-x-auto">
            <table className="table-plain num">
              <thead>
                <tr>
                  <th>Company</th>
                  <th className="max-md:hidden">Sector</th>
                  <th className="!text-right">Price</th>
                  <th className="!text-right">Today</th>
                  <th className="!text-right max-sm:hidden">You own</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const q = quotes[s.ticker];
                  const up = q.changePct >= 0;
                  const owned = holdingShares(portfolio.holdings[s.ticker]);
                  return (
                    <tr
                      key={s.ticker}
                      onClick={() => setTrading(s.ticker)}
                      className="cursor-pointer transition-colors hover:bg-raised"
                    >
                      <td>
                        <div className="flex items-center gap-2">
                          <Ticker>{s.ticker}</Ticker>
                          {owned > 0 && <Badge tone="accent" className="sm:hidden">Owned</Badge>}
                        </div>
                        <div className="max-w-[16rem] truncate text-[0.8125rem] text-ink-muted">{s.name}</div>
                      </td>
                      <td className="text-[0.8125rem] text-ink-muted max-md:hidden">{s.sector}</td>
                      <td className="text-right font-medium text-ink">{fmtMoney(q.price)}</td>
                      <td className={cx("text-right font-medium", up ? "text-gain" : "text-loss")}>
                        {fmtPct(q.changePct)}
                      </td>
                      <td className="text-right text-ink-secondary max-sm:hidden">
                        {owned > 0 ? fmtShares(owned) : <span className="text-ink-muted">—</span>}
                      </td>
                      <td className="w-px text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTrading(s.ticker);
                          }}
                        >
                          Trade
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-ink-muted">No tickers match “{search}”.</p>
            )}
          </Card>
        </section>

        {/* Transactions */}
        <section>
          <SectionTitle>Transactions</SectionTitle>
          {portfolio.transactions.length === 0 ? (
            <p className="text-sm text-ink-muted">No trades yet.</p>
          ) : (
            <Card className="overflow-x-auto">
              <table className="table-plain num min-w-[520px]">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Ticker</th>
                    <th className="!text-right">Shares</th>
                    <th className="!text-right">Price</th>
                    <th className="!text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.transactions.map((t) => (
                    <tr key={t.id + t.date}>
                      <td className="whitespace-nowrap text-ink-secondary">
                        {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td>
                        <Badge tone={t.type === "buy" ? "gain" : "loss"} className="uppercase">
                          {t.type}
                        </Badge>
                      </td>
                      <td>
                        <Ticker>{t.ticker}</Ticker>
                      </td>
                      <td className="text-right text-ink-secondary">{fmtShares(t.shares)}</td>
                      <td className="text-right text-ink-secondary">{fmtMoney(t.price)}</td>
                      <td className="text-right font-medium text-ink">{fmtMoney(t.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </section>

        {/* Footer: disclaimer + reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-edge pt-5">
          <p className="text-[0.8125rem] text-ink-muted">
            Simulated prices for practice only — they drift daily but aren&apos;t real market data.
          </p>
          {confirmingReset ? (
            <div className="flex flex-wrap items-center gap-2.5 text-sm" role="alertdialog" aria-label="Confirm reset">
              <span className="text-ink-secondary">
                Wipe all holdings and history, back to {fmtMoney(portfolio.startingCash)}?
              </span>
              <Button
                variant="loss"
                size="sm"
                onClick={() => {
                  reset();
                  setConfirmingReset(false);
                }}
              >
                Yes, reset
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setConfirmingReset(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" icon={RotateCcw} onClick={() => setConfirmingReset(true)}>
              Reset portfolio
            </Button>
          )}
        </div>
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
