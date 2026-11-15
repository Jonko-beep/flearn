import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { markToolUsed } from "../lib/achievements.js";
import {
  fmt$,
  SliderField,
  StatCard,
  ToolHeader,
  MascotCallout,
  ToggleRow,
} from "../components/CalcKit.jsx";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  STRATEGIES,
  computeOptionPayoff,
  getStrategy,
  intrinsicValue,
  moveToBreakevenPct,
} from "../lib/options.js";

const ACCENT = "#0EA5E9"; // Fischer's sky blue
const PROFIT = "#059669";
const LOSS = "#dc2626";

const TOGGLE_OPTIONS = STRATEGIES.map((s) => ({ value: s.id, label: s.label }));

function fmtPrice(n) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Signed dollars for profit/loss: +$300, −$200, $0.
function fmtPL(n) {
  const rounded = Math.round(n);
  if (rounded === 0) return "$0";
  return `${rounded > 0 ? "+" : "−"}$${Math.abs(rounded).toLocaleString("en-US")}`;
}

function fmtPLAxis(n) {
  const abs = Math.abs(n);
  const body = abs >= 1000 ? `$${(abs / 1000).toFixed(abs >= 10000 ? 0 : 1)}k` : `$${Math.round(abs)}`;
  return n < 0 ? `−${body}` : body;
}

function plColor(n) {
  return Math.round(n) > 0 ? PROFIT : Math.round(n) < 0 ? LOSS : "#94a3b8";
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const profit = payload[0].value;
  return (
    <div className="rounded-card border border-edge bg-well px-4 py-3 text-sm shadow-xl">
      <div className="mb-1 text-ink-secondary">Stock at {fmtPrice(Number(label))}</div>
      <div className="font-semibold" style={{ color: plColor(profit) }}>
        {fmtPL(profit)}
      </div>
    </div>
  );
}

// What the same situation looks like without the option, so the leverage (or
// the cap) is visible as a dollar difference instead of a chart shape.
function sharesComparison(strategy, { stockPrice, capital, shares }, price) {
  switch (strategy) {
    case "long-call":
    case "long-put":
      return {
        label: `Putting the same ${fmt$(capital)} into shares instead`,
        profit: stockPrice > 0 ? capital * (price / stockPrice - 1) : 0,
      };
    case "covered-call":
      return {
        label: `Just holding the ${shares} shares`,
        profit: (price - stockPrice) * shares,
      };
    default:
      return {
        label: `Buying the ${shares} shares today instead`,
        profit: (price - stockPrice) * shares,
      };
  }
}

function buildInsight(strategy, { stockPrice, strike, premium }, payoff) {
  const { breakeven, maxLoss, maxProfit } = payoff;
  const move = moveToBreakevenPct(stockPrice, breakeven);
  const moveText =
    move === null
      ? null
      : Math.abs(move) < 0.05
        ? "is already at breakeven"
        : `has to ${move > 0 ? "rise" : "fall"} ${Math.abs(move).toFixed(1)}% to ${fmtPrice(breakeven)}`;

  switch (strategy) {
    case "long-call":
      return `The stock ${moveText} by expiration just for you to break even. Finish at ${fmtPrice(strike)} or below and the full ${fmt$(maxLoss)} is gone — but that's also the most you can lose, however far the stock falls.`;
    case "long-put":
      return breakeven === null
        ? `This put costs more than its strike price, so it can't make money at any stock price. Lower the premium or raise the strike.`
        : `The stock ${moveText} by expiration just for you to break even. Finish at ${fmtPrice(strike)} or above and the full ${fmt$(maxLoss)} is gone. Your best case is the stock going to zero: ${fmt$(maxProfit)}.`;
    case "covered-call":
      return maxProfit <= 0
        ? `At this strike and premium the position can't make money — you'd be agreeing to sell your shares for less than you paid, net of the premium. Raise the strike or the premium.`
        : `You pocket ${fmt$(premium * payoff.shares)} today. In exchange your profit stops at ${fmt$(maxProfit)} once the stock passes ${fmtPrice(strike)} — every dollar above that belongs to the call's buyer. The premium only cushions the first ${fmtPrice(premium)} of a drop; below ${fmtPrice(Math.max(0, stockPrice - premium))} you're losing like any shareholder.`;
    default:
      return `You pocket ${fmt$(maxProfit)} today, and that's the most this trade can ever make. If the stock finishes below ${fmtPrice(strike)} you must buy ${payoff.shares} shares at that price — an effective cost of ${fmtPrice(Math.max(0, strike - premium))} each — and every dollar the stock falls below that is your loss.`;
  }
}

export default function OptionsPage() {
  const [strategy, setStrategy] = useState("long-call");
  const [stockPrice, setStockPrice] = useState(100);
  const [strike, setStrike] = useState(105);
  const [premium, setPremium] = useState(3);
  const [contracts, setContracts] = useState(1);
  const [expiryPrice, setExpiryPrice] = useState(120);

  useEffect(() => {
    markToolUsed("options");
  }, []);

  // Switching strategy loads a typical setup for it, scaled to the current stock price.
  const chooseStrategy = (id) => {
    const { defaults } = getStrategy(id);
    const scale = stockPrice / 100;
    setStrategy(id);
    setStrike(Math.max(1, Math.round(defaults.strike * scale)));
    setPremium(Math.max(0.05, Math.round(defaults.premium * scale * 20) / 20));
    setExpiryPrice(Math.round(stockPrice * (id === "long-put" ? 0.8 : 1.2)));
  };

  const inputs = { strategy, stockPrice, strike, premium, contracts };
  const payoff = useMemo(
    () => computeOptionPayoff({ strategy, stockPrice, strike, premium, contracts }),
    [strategy, stockPrice, strike, premium, contracts]
  );

  const info = getStrategy(strategy);
  const chartTop = payoff.series[payoff.series.length - 1].price;
  const scenarioPrice = Math.min(expiryPrice, Math.floor(chartTop));
  const scenarioPL = payoff.profitAt(scenarioPrice);
  const comparison = sharesComparison(strategy, { stockPrice, ...payoff }, scenarioPrice);
  const insight = buildInsight(strategy, inputs, payoff);

  const floor = intrinsicValue(strategy, stockPrice, strike);
  const underpriced = premium < floor - 0.001;

  // Where the green/red fill flips: the fraction of the chart's height above $0.
  const profits = payoff.series.map((d) => d.profit);
  const hi = Math.max(...profits);
  const lo = Math.min(...profits);
  const zeroOffset = hi <= 0 ? 0 : lo >= 0 ? 1 : hi / (hi - lo);

  const move = moveToBreakevenPct(stockPrice, payoff.breakeven);

  return (
    <div className="min-h-screen p-8 max-md:p-5">
      <div className="mx-auto max-w-[760px]">
        <Link
          to="/tools"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to tools
        </Link>

        <ToolHeader
          emoji="🎯"
          accent={ACCENT}
          title="Options Payoff Visualizer"
          tagline="What an options trade is worth at expiration — worked out before you risk a dollar."
        />

        {/* Strategy */}
        <div
          className="mb-4 rounded-card border border-edge bg-well/50 px-4 py-3.5"
          style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
        >
          <label className="mb-2.5 block text-sm font-medium text-ink">🧭 Strategy</label>
          <ToggleRow accent={ACCENT} value={strategy} onChange={chooseStrategy} options={TOGGLE_OPTIONS} />
          <p className="m-0 mt-3 text-sm leading-relaxed text-ink-secondary">
            <span
              className="mr-2 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
              style={{ background: `${ACCENT}15`, color: ACCENT }}
            >
              {info.outlook}
            </span>
            {info.summary}
          </p>
        </div>

        {/* Inputs */}
        <div
          className="mb-4 grid grid-cols-2 gap-3 max-md:grid-cols-1"
          style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}
        >
          <SliderField
            label="📈 Stock price today"
            value={stockPrice}
            min={1}
            max={500}
            step={1}
            onChange={setStockPrice}
            prefix="$"
            display={(v) => fmt$(v)}
            accent="options"
          />
          <SliderField
            label="🎯 Strike price"
            value={strike}
            min={1}
            max={500}
            step={1}
            onChange={setStrike}
            prefix="$"
            display={(v) => fmt$(v)}
            accent="options"
          />
          <SliderField
            label="🏷️ Premium per share"
            value={premium}
            min={0.05}
            max={50}
            step={0.05}
            onChange={(v) => setPremium(Math.round(v * 100) / 100)}
            prefix="$"
            display={(v) => fmtPrice(v)}
            accent="options"
          />
          <SliderField
            label="📄 Contracts (100 shares each)"
            value={contracts}
            min={1}
            max={10}
            step={1}
            onChange={(v) => setContracts(Math.round(v))}
            display={(v) => `${v * 100} sh`}
            accent="options"
          />
        </div>

        {underpriced && (
          <div
            className="mb-4 rounded-card border p-4 text-sm leading-relaxed text-ink"
            style={{ borderColor: "#f59e0b55", background: "#f59e0b10" }}
          >
            <span className="font-semibold text-warning">Unrealistic premium:</span> with the stock at{" "}
            {fmtPrice(stockPrice)}, this option is already {fmtPrice(floor)} in the money, so in a real
            market it would cost at least that much. Raise the premium to {fmtPrice(floor)} or more for
            a picture you could actually trade.
          </div>
        )}

        {/* Stats */}
        <div className="mb-4 grid grid-cols-3 gap-3 max-md:grid-cols-1">
          <StatCard
            label="Max loss"
            value={fmt$(payoff.maxLoss)}
            color="#f87171"
            delay={0.2}
            sub={
              strategy === "long-call" || strategy === "long-put"
                ? "the premium — all of it"
                : "if the stock goes to $0"
            }
          />
          <StatCard
            label="Max profit"
            value={payoff.maxProfit === Infinity ? "Unlimited" : fmt$(Math.max(0, payoff.maxProfit))}
            color="#34d399"
            delay={0.25}
            sub={
              strategy === "long-call"
                ? "grows as the stock rises"
                : strategy === "long-put"
                  ? "if the stock goes to $0"
                  : strategy === "covered-call"
                    ? "capped at the strike"
                    : "the premium, nothing more"
            }
          />
          <StatCard
            label="Breakeven at expiration"
            value={payoff.breakeven === null ? "—" : fmtPrice(payoff.breakeven)}
            color="#f1f5f9"
            delay={0.3}
            sub={
              move === null
                ? "no price breaks even"
                : `${move >= 0 ? "+" : "−"}${Math.abs(move).toFixed(1)}% from today · ${fmt$(payoff.capital)} to open`
            }
          />
        </div>

        {/* Payoff chart */}
        <div
          className="mb-4 rounded-card-lg border border-edge bg-card p-5 max-md:p-3"
          style={{ animation: "fadeInUp 0.6s ease-out 0.35s both" }}
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <h3 className="m-0 text-lg font-semibold">Profit or loss at expiration</h3>
            <div className="flex gap-4 text-xs text-ink-secondary">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: PROFIT }} />
                Profit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: LOSS }} />
                Loss
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={payoff.series} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="optionsPlFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={zeroOffset} stopColor={PROFIT} stopOpacity={0.35} />
                  <stop offset={zeroOffset} stopColor={LOSS} stopOpacity={0.35} />
                </linearGradient>
                <linearGradient id="optionsPlStroke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={zeroOffset} stopColor={PROFIT} />
                  <stop offset={zeroOffset} stopColor={LOSS} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#334155" strokeOpacity={0.4} vertical={false} />
              <XAxis
                dataKey="price"
                type="number"
                domain={[0, chartTop]}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                tickFormatter={(v) => `$${Math.round(v)}`}
              />
              <YAxis
                tickFormatter={fmtPLAxis}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={58}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#64748b", strokeDasharray: "4 4" }} />
              <ReferenceLine y={0} stroke="#94a3b8" strokeOpacity={0.7} />
              <ReferenceLine
                x={stockPrice}
                stroke="#94a3b8"
                strokeDasharray="4 4"
                label={{ value: "Today", position: "top", fill: "#94a3b8", fontSize: 11 }}
              />
              <ReferenceLine
                x={scenarioPrice}
                stroke={ACCENT}
                strokeDasharray="2 3"
                label={{ value: "Scenario", position: "insideTopRight", fill: ACCENT, fontSize: 11 }}
              />
              <Area
                type="linear"
                dataKey="profit"
                name="Profit / loss"
                baseValue={0}
                stroke="url(#optionsPlStroke)"
                strokeWidth={2}
                fill="url(#optionsPlFill)"
                animationDuration={400}
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="m-0 mt-2 px-1 text-xs text-ink-muted">
            Stock price at expiration along the bottom; your total profit or loss up the side.
          </p>
        </div>

        {/* Scenario */}
        <div
          className="mb-4 rounded-card-lg border border-edge bg-card p-5"
          style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}
        >
          <h3 className="m-0 mb-3 text-lg font-semibold">Play it forward</h3>
          <SliderField
            label="🔮 Stock price at expiration"
            value={scenarioPrice}
            min={0}
            max={Math.floor(chartTop)}
            step={1}
            onChange={setExpiryPrice}
            prefix="$"
            display={(v) => fmt$(v)}
            accent="options"
          />
          <div className="mt-3 grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <div className="rounded-card border border-edge bg-well/50 px-4 py-3">
              <div className="mb-1 text-xs tracking-wide text-ink-muted uppercase">{info.label}</div>
              <div className="font-serif text-2xl font-bold tracking-heading" style={{ color: plColor(scenarioPL) }}>
                {fmtPL(scenarioPL)}
              </div>
              {payoff.capital > 0 && (
                <div className="mt-0.5 text-xs text-ink-muted">
                  {((scenarioPL / payoff.capital) * 100).toFixed(0)}% on {fmt$(payoff.capital)} put up
                </div>
              )}
            </div>
            <div className="rounded-card border border-edge bg-well/50 px-4 py-3">
              <div className="mb-1 text-xs tracking-wide text-ink-muted uppercase">{comparison.label}</div>
              <div
                className="font-serif text-2xl font-bold tracking-heading"
                style={{ color: plColor(comparison.profit) }}
              >
                {fmtPL(comparison.profit)}
              </div>
              <div className="mt-0.5 text-xs text-ink-muted">
                stock {scenarioPrice >= stockPrice ? "up" : "down"}{" "}
                {Math.abs((scenarioPrice / stockPrice - 1) * 100).toFixed(0)}% from today
              </div>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div
          className="mb-4 rounded-card border p-4"
          style={{
            borderColor: `${ACCENT}33`,
            background: `${ACCENT}0d`,
            animation: "fadeInUp 0.6s ease-out 0.45s both",
          }}
        >
          <div className="mb-1 text-xs font-semibold tracking-wide uppercase" style={{ color: ACCENT }}>
            💡 Insight
          </div>
          <p className="m-0 text-sm leading-relaxed text-ink">{insight}</p>
        </div>

        {/* Disclaimer */}
        <div
          className="mb-4 rounded-card border border-edge bg-well/50 p-4 text-xs leading-relaxed text-ink-muted"
          style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}
        >
          <span className="font-semibold text-ink-secondary">📌 Educational simulator only.</span> It
          shows value at expiration, when an option is worth exactly its intrinsic value. Before then,
          prices also depend on time left and volatility. It ignores commissions, bid-ask spreads,
          taxes, dividends, and early assignment, and you type the premium in yourself — it isn't a
          market quote. Nothing here is a recommendation to trade options.{" "}
          <Link to="/learn/options" className="font-semibold underline" style={{ color: ACCENT }}>
            Start with the Options lessons
          </Link>
          .
        </div>

        <MascotCallout emoji="🦊" name="Fischer the Fox" accent={ACCENT} delay={0.55}>
          Every options trade is a picture, and once you can read the picture you can't be fooled by
          the pitch. Look at where the line sits below zero: that's what you pay for being wrong, and
          for a buyer it's a flat floor — small, but you hit it often. Look at where it flattens out
          on top: that's a seller's ceiling — the premium, and not a penny more — sitting above a
          slope that runs a long way down. Then drag the expiration slider and compare with simply
          owning the shares. Sometimes the option wins big. Notice how often the shares are ahead
          anyway, and how a stock that goes nowhere can cost an option buyer the whole premium
          while the shareholder loses nothing. An option is a right, not an obligation — but the premium is
          due either way.
        </MascotCallout>
      </div>
    </div>
  );
}
