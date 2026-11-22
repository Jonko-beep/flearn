import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
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
import { markToolUsed } from "../lib/achievements.js";
import {
  fmt$,
  SliderField,
  StatCard,
  ToolHeader,
  ToolLayout,
  ChartCard,
  ChartTooltip,
  Insight,
  GroupLabel,
  MascotCallout,
  chart,
} from "../components/CalcKit.jsx";
import {
  STRATEGIES,
  computeOptionPayoff,
  getStrategy,
  intrinsicValue,
  moveToBreakevenPct,
} from "../lib/options.js";
import { Badge, Callout, Card, cx } from "../ui/kit.jsx";
import { color, hue } from "../ui/theme.js";

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

const plTone = (n) => (Math.round(n) > 0 ? "text-gain" : Math.round(n) < 0 ? "text-loss" : "text-ink-secondary");

function PayoffTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const profit = payload[0].value;
  return (
    <ChartTooltip
      title={`Stock at ${fmtPrice(Number(label))}`}
      rows={[
        {
          label: "Profit or loss",
          value: <span className={plTone(profit)}>{fmtPL(profit)}</span>,
          strong: true,
        },
      ]}
    />
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

function ScenarioFigure({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-edge bg-raised px-4 py-3.5">
      <div className="eyebrow">{label}</div>
      <div className={cx("num mt-1.5 font-display text-[1.6rem] font-semibold leading-none tracking-tight", plTone(value))}>
        {fmtPL(value)}
      </div>
      {sub && <div className="num mt-1.5 text-[0.8125rem] text-ink-muted">{sub}</div>}
    </div>
  );
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
    <div className="animate-enter" style={hue("options")}>
      <ToolHeader
        tool="options"
        hueKey="options"
        title="Options payoff visualizer"
        tagline="What an options trade is worth at expiration — worked out before you risk a dollar."
      />

      <ToolLayout
        controls={
          <>
            <Card className="p-4">
              <GroupLabel className="!pt-0">Strategy</GroupLabel>
              <div className="mt-3 grid grid-cols-2 gap-1.5" role="tablist" aria-label="Strategy">
                {STRATEGIES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={strategy === s.id}
                    onClick={() => chooseStrategy(s.id)}
                    className={cx(
                      "h-9 rounded-lg border text-[0.8125rem] font-semibold transition-colors",
                      strategy === s.id
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-edge-strong text-ink-secondary hover:bg-raised hover:text-ink"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="mt-3.5 flex items-start gap-2.5 text-sm leading-relaxed text-ink-secondary">
                <Badge tone="cat" className="mt-0.5">
                  {info.outlook}
                </Badge>
                <span>{info.summary}</span>
              </div>
            </Card>

            <SliderField
              label="Stock price today"
              value={stockPrice}
              min={1}
              max={500}
              step={1}
              onChange={setStockPrice}
              prefix="$"
              display={(v) => fmt$(v)}
            />
            <SliderField
              label="Strike price"
              value={strike}
              min={1}
              max={500}
              step={1}
              onChange={setStrike}
              prefix="$"
              display={(v) => fmt$(v)}
            />
            <SliderField
              label="Premium per share"
              value={premium}
              min={0.05}
              max={50}
              step={0.05}
              onChange={(v) => setPremium(Math.round(v * 100) / 100)}
              prefix="$"
              display={(v) => fmtPrice(v)}
            />
            <SliderField
              label="Contracts"
              value={contracts}
              min={1}
              max={10}
              step={1}
              onChange={(v) => setContracts(Math.round(v))}
              display={(v) => `${v}`}
              hint={`${contracts * 100} shares · 100 each`}
            />
          </>
        }
      >
        {underpriced && (
          <Callout tone="warn" icon={TriangleAlert} title="Unrealistic premium">
            With the stock at {fmtPrice(stockPrice)}, this option is already {fmtPrice(floor)} in the money, so in a
            real market it would cost at least that much. Raise the premium to {fmtPrice(floor)} or more for a
            picture you could actually trade.
          </Callout>
        )}

        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <StatCard
            label="Max loss"
            value={fmt$(payoff.maxLoss)}
            tone="loss"
            sub={strategy === "long-call" || strategy === "long-put" ? "the premium — all of it" : "if the stock goes to $0"}
          />
          <StatCard
            label="Max profit"
            value={payoff.maxProfit === Infinity ? "Unlimited" : fmt$(Math.max(0, payoff.maxProfit))}
            tone="gain"
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
            sub={
              move === null
                ? "no price breaks even"
                : `${move >= 0 ? "+" : "−"}${Math.abs(move).toFixed(1)}% from today · ${fmt$(payoff.capital)} to open`
            }
          />
        </div>

        <ChartCard
          title="Profit or loss at expiration"
          legend={[
            { label: "Profit", color: chart.gain },
            { label: "Loss", color: chart.loss },
          ]}
          note="Stock price at expiration along the bottom; your total profit or loss up the side."
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={payoff.series} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="optionsPlFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={zeroOffset} stopColor={chart.gain} stopOpacity={0.3} />
                  <stop offset={zeroOffset} stopColor={chart.loss} stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="optionsPlStroke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={zeroOffset} stopColor={chart.gain} />
                  <stop offset={zeroOffset} stopColor={chart.loss} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chart.grid} vertical={false} />
              <XAxis
                dataKey="price"
                type="number"
                domain={[0, chartTop]}
                tick={chart.tick}
                tickLine={false}
                axisLine={{ stroke: chart.axis }}
                tickFormatter={(v) => `$${Math.round(v)}`}
              />
              <YAxis tickFormatter={fmtPLAxis} tick={chart.tick} tickLine={false} axisLine={false} width={58} />
              <Tooltip content={<PayoffTooltip />} cursor={chart.cursor} />
              <ReferenceLine y={0} stroke={chart.muted} />
              <ReferenceLine
                x={stockPrice}
                stroke={chart.muted}
                strokeDasharray="4 4"
                label={{ value: "Today", position: "top", fill: chart.muted, fontSize: 11 }}
              />
              <ReferenceLine
                x={scenarioPrice}
                stroke={color("cat")}
                strokeDasharray="2 3"
                label={{ value: "Scenario", position: "insideTopRight", fill: color("cat"), fontSize: 11 }}
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
        </ChartCard>

        <Card className="p-4 sm:p-5">
          <h2 className="mb-4 text-[1.15rem]">Play it forward</h2>
          <SliderField
            label="Stock price at expiration"
            value={scenarioPrice}
            min={0}
            max={Math.floor(chartTop)}
            step={1}
            onChange={setExpiryPrice}
            prefix="$"
            display={(v) => fmt$(v)}
            hint={`stock ${scenarioPrice >= stockPrice ? "up" : "down"} ${Math.abs((scenarioPrice / stockPrice - 1) * 100).toFixed(0)}% from today`}
          />
          <div className="mt-3 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <ScenarioFigure
              label={info.label}
              value={scenarioPL}
              sub={
                payoff.capital > 0
                  ? `${((scenarioPL / payoff.capital) * 100).toFixed(0)}% on ${fmt$(payoff.capital)} put up`
                  : null
              }
            />
            <ScenarioFigure label={comparison.label} value={comparison.profit} />
          </div>
        </Card>

        <Insight>{insight}</Insight>

        <MascotCallout emoji="🦊" name="Fischer the Fox" hueKey="options">
          Every options trade is a picture, and once you can read the picture you can&apos;t be fooled by the pitch.
          Look at where the line sits below zero: that&apos;s what you pay for being wrong, and for a buyer it&apos;s
          a flat floor — small, but you hit it often. Look at where it flattens out on top: that&apos;s a
          seller&apos;s ceiling — the premium, and not a penny more — sitting above a slope that runs a long way
          down. Then drag the expiration slider and compare with simply owning the shares. Sometimes the option wins
          big. Notice how often the shares are ahead anyway, and how a stock that goes nowhere can cost an option
          buyer the whole premium while the shareholder loses nothing. An option is a right, not an obligation — but
          the premium is due either way.
        </MascotCallout>

        <p className="border-t border-edge pt-4 text-[0.8125rem] leading-relaxed text-ink-muted">
          <span className="font-semibold text-ink-secondary">Educational simulator only.</span> It shows value at
          expiration, when an option is worth exactly its intrinsic value. Before then, prices also depend on time
          left and volatility. It ignores commissions, bid-ask spreads, taxes, dividends, and early assignment, and
          you type the premium in yourself — it isn&apos;t a market quote. Nothing here is a recommendation to trade
          options.{" "}
          <Link to="/learn/options" className="font-semibold text-accent-ink hover:underline">
            Start with the Options lessons
          </Link>
          .
        </p>
      </ToolLayout>
    </div>
  );
}
