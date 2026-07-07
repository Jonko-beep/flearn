import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { markToolUsed } from "../lib/achievements.js";
import { fmt$, fmtAxis, SliderField, StatCard, ToolHeader, MascotCallout } from "../components/CalcKit.jsx";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ACCENT = "#7C3AED"; // Benjamin's purple
const AVALANCHE = "#0D9488";
const SNOWBALL = "#8B5CF6";
const MAX_DEBTS = 5;
const MAX_MONTHS = 600; // 50 years — past this, the plan isn't working

/**
 * Simulate paying off a set of debts with a fixed monthly budget.
 * strategy: "avalanche" (highest APR first) or "snowball" (smallest balance first).
 * Returns { months, totalInterest, timeline, finished } — timeline is total balance per month.
 * Pure function so it's testable.
 */
export function computePayoff(debts, budget, strategy) {
  const open = debts.map((d) => ({ ...d }));
  const timeline = [{ month: 0, balance: open.reduce((s, d) => s + d.balance, 0) }];
  let totalInterest = 0;
  let month = 0;

  while (open.some((d) => d.balance > 0.005) && month < MAX_MONTHS) {
    month++;
    // 1. Interest accrues on every open balance.
    for (const d of open) {
      if (d.balance <= 0.005) continue;
      const interest = d.balance * (d.apr / 100 / 12);
      d.balance += interest;
      totalInterest += interest;
    }
    // 2. Everyone gets their minimum (capped at what's owed).
    let remaining = budget;
    for (const d of open) {
      if (d.balance <= 0.005) continue;
      const pay = Math.min(d.minPayment, d.balance, remaining);
      d.balance -= pay;
      remaining -= pay;
    }
    // 3. Everything left attacks the target debt; roll over as debts die.
    while (remaining > 0.005) {
      const targets = open.filter((d) => d.balance > 0.005);
      if (!targets.length) break;
      const target = targets.reduce((best, d) =>
        strategy === "avalanche"
          ? d.apr > best.apr
            ? d
            : best
          : d.balance < best.balance
            ? d
            : best
      );
      const pay = Math.min(remaining, target.balance);
      target.balance -= pay;
      remaining -= pay;
    }
    timeline.push({ month, balance: open.reduce((s, d) => s + d.balance, 0) });
  }

  return {
    months: month,
    totalInterest,
    timeline,
    finished: open.every((d) => d.balance <= 0.005),
  };
}

function fmtMonths(m) {
  const years = Math.floor(m / 12);
  const months = m % 12;
  if (years === 0) return `${months} mo`;
  if (months === 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${years} yr${years > 1 ? "s" : ""} ${months} mo`;
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-card border border-edge bg-well px-4 py-3 text-sm shadow-xl">
      <div className="mb-1.5 font-semibold text-ink">Month {label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-6 py-0.5">
          <span className="flex items-center gap-1.5 text-ink-secondary">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.stroke }} />
            {p.name}
          </span>
          <span className="text-ink-secondary">{fmt$(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

// Chosen so the two strategies visibly diverge: snowball goes for the small
// 0% medical bill first, avalanche for the 24% card.
const DEFAULT_DEBTS = [
  { name: "Credit card", balance: 5000, apr: 24, minPayment: 100 },
  { name: "Medical bill", balance: 1200, apr: 0, minPayment: 50 },
  { name: "Student loan", balance: 10000, apr: 5.5, minPayment: 120 },
];

function DebtRow({ debt, onChange, onRemove, canRemove }) {
  const num = (key, raw, min, max) => {
    const n = parseFloat(raw);
    onChange({ ...debt, [key]: Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : 0 });
  };
  const inputCls =
    "rounded-card border border-edge bg-well py-1.5 px-2 text-sm text-ink outline-none transition-colors focus:border-save";
  return (
    <div className="grid grid-cols-[1.4fr_1fr_0.8fr_1fr_auto] items-end gap-2 max-md:grid-cols-2">
      <label className="flex flex-col gap-1 text-xs text-ink-muted">
        Name
        <input
          type="text"
          value={debt.name}
          maxLength={24}
          onChange={(e) => onChange({ ...debt, name: e.target.value })}
          className={inputCls}
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-ink-muted">
        Balance ($)
        <input
          type="number"
          min={0}
          value={debt.balance}
          onChange={(e) => num("balance", e.target.value, 0, 1e6)}
          className={`${inputCls} text-right`}
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-ink-muted">
        APR (%)
        <input
          type="number"
          min={0}
          step={0.1}
          value={debt.apr}
          onChange={(e) => num("apr", e.target.value, 0, 100)}
          className={`${inputCls} text-right`}
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-ink-muted">
        Min. payment ($)
        <input
          type="number"
          min={0}
          value={debt.minPayment}
          onChange={(e) => num("minPayment", e.target.value, 0, 1e5)}
          className={`${inputCls} text-right`}
        />
      </label>
      <button
        onClick={onRemove}
        disabled={!canRemove}
        aria-label={`Remove ${debt.name || "debt"}`}
        className="mb-0.5 flex h-8 w-8 items-center justify-center rounded-card border border-edge text-ink-muted transition-colors hover:border-error hover:text-error disabled:cursor-not-allowed disabled:opacity-30 max-md:col-span-2 max-md:w-full"
      >
        ✕
      </button>
    </div>
  );
}

function StrategyColumn({ title, emoji, color, result, delay }) {
  return (
    <div
      className="rounded-card-lg border bg-card p-5"
      style={{ borderColor: `${color}33`, animation: `fadeInUp 0.6s ease-out ${delay}s both` }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />
        <h3 className="m-0 text-lg font-semibold" style={{ color }}>
          {emoji} {title}
        </h3>
      </div>
      <div className="mb-3">
        <div className="text-xs tracking-wide text-ink-muted uppercase">Debt-free in</div>
        <div className="font-serif text-[1.65rem] font-bold tracking-heading text-ink">
          {result.finished ? fmtMonths(result.months) : "50+ yrs"}
        </div>
      </div>
      <div>
        <div className="text-xs tracking-wide text-ink-muted uppercase">Total interest paid</div>
        <div className="font-serif text-[1.65rem] font-bold tracking-heading" style={{ color }}>
          {fmt$(result.totalInterest)}
        </div>
      </div>
    </div>
  );
}

export default function DebtPage() {
  const [debts, setDebts] = useState(DEFAULT_DEBTS);
  const [budget, setBudget] = useState(500);

  useEffect(() => {
    markToolUsed("debt");
  }, []);

  const validDebts = useMemo(() => debts.filter((d) => d.balance > 0), [debts]);
  const minTotal = useMemo(
    () => validDebts.reduce((s, d) => s + Math.min(d.minPayment, d.balance), 0),
    [validDebts]
  );
  const budgetOk = validDebts.length > 0 && budget >= minTotal && budget > 0;

  const results = useMemo(() => {
    if (!budgetOk) return null;
    return {
      avalanche: computePayoff(validDebts, budget, "avalanche"),
      snowball: computePayoff(validDebts, budget, "snowball"),
    };
  }, [validDebts, budget, budgetOk]);

  const chartData = useMemo(() => {
    if (!results) return [];
    const len = Math.max(results.avalanche.timeline.length, results.snowball.timeline.length);
    return Array.from({ length: len }, (_, i) => ({
      month: i,
      avalanche: results.avalanche.timeline[i]?.balance ?? 0,
      snowball: results.snowball.timeline[i]?.balance ?? 0,
    }));
  }, [results]);

  const updateDebt = (i, next) => setDebts(debts.map((d, j) => (j === i ? next : d)));
  const removeDebt = (i) => setDebts(debts.filter((_, j) => j !== i));
  const addDebt = () =>
    setDebts([...debts, { name: `Debt ${debts.length + 1}`, balance: 1000, apr: 10, minPayment: 25 }]);

  const interestDiff = results ? results.snowball.totalInterest - results.avalanche.totalInterest : 0;
  const bothFinish = results && results.avalanche.finished && results.snowball.finished;

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
          emoji="💳"
          accent={ACCENT}
          title="Debt Payoff Calculator"
          tagline="Avalanche vs. snowball — see what each path costs and how fast it gets you free."
        />

        {/* Debts editor */}
        <div
          className="mb-4 rounded-card-lg border border-edge bg-card p-5"
          style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
        >
          <h3 className="m-0 mb-4 text-lg font-semibold">Your debts</h3>
          <div className="flex flex-col gap-4">
            {debts.map((d, i) => (
              <DebtRow
                key={i}
                debt={d}
                onChange={(next) => updateDebt(i, next)}
                onRemove={() => removeDebt(i)}
                canRemove={debts.length > 1}
              />
            ))}
          </div>
          {debts.length < MAX_DEBTS && (
            <button
              onClick={addDebt}
              className="mt-4 rounded-full border px-4 py-1.5 text-sm font-medium transition-all hover:-translate-y-px"
              style={{ borderColor: `${ACCENT}55`, color: ACCENT, background: `${ACCENT}10` }}
            >
              + Add debt
            </button>
          )}
        </div>

        {/* Budget */}
        <div className="mb-4" style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}>
          <SliderField
            label="💰 Total monthly payment budget"
            value={budget}
            min={0}
            max={5000}
            step={25}
            onChange={setBudget}
            prefix="$"
            display={(v) => `${fmt$(v)}`}
            accent="save"
          />
        </div>

        {!budgetOk ? (
          <div
            className="mb-6 rounded-card border p-4 text-sm leading-relaxed text-ink"
            style={{ borderColor: "#f59e0b55", background: "#f59e0b10" }}
          >
            {validDebts.length === 0 ? (
              <>Add at least one debt with a balance to compare payoff strategies.</>
            ) : (
              <>
                Your minimum payments add up to{" "}
                <span className="font-semibold">{fmt$(minTotal)}</span>/month, but your budget is{" "}
                <span className="font-semibold">{fmt$(budget)}</span>. Nudge the budget up to at
                least the minimums — that's the floor that keeps every account current.
              </>
            )}
          </div>
        ) : (
          <>
            {/* Side-by-side comparison */}
            <div className="mb-4 grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <StrategyColumn
                title="Avalanche"
                emoji="🏔️"
                color={AVALANCHE}
                result={results.avalanche}
                delay={0.2}
              />
              <StrategyColumn
                title="Snowball"
                emoji="⛄"
                color={SNOWBALL}
                result={results.snowball}
                delay={0.25}
              />
            </div>

            {!bothFinish && (
              <div
                className="mb-4 rounded-card border p-4 text-sm leading-relaxed text-ink"
                style={{ borderColor: "#dc262655", background: "#dc262610" }}
              >
                At this budget, the balances outrun the payments — interest is growing faster than
                you're paying it down. Raise the monthly budget until both plans reach zero.
              </div>
            )}

            {bothFinish && (
              <div
                className="mb-6 rounded-card border p-4 text-sm leading-relaxed text-ink"
                style={{
                  borderColor: `${ACCENT}33`,
                  background: `${ACCENT}0d`,
                  animation: "fadeInUp 0.6s ease-out 0.3s both",
                }}
              >
                <span className="font-semibold" style={{ color: ACCENT }}>
                  The math:
                </span>{" "}
                {Math.round(interestDiff) > 0 ? (
                  <>
                    avalanche saves you <span className="font-semibold">{fmt$(interestDiff)}</span>{" "}
                    in interest over snowball
                    {results.snowball.months !== results.avalanche.months && (
                      <>
                        {" "}
                        and gets you debt-free{" "}
                        {fmtMonths(Math.abs(results.snowball.months - results.avalanche.months))}{" "}
                        {results.avalanche.months < results.snowball.months ? "sooner" : "later"}
                      </>
                    )}
                    .
                  </>
                ) : (
                  <>with these debts, both strategies cost about the same — pick whichever keeps you motivated.</>
                )}{" "}
                That said: snowball's quick wins — killing off whole accounts early — keep a lot of
                people from quitting. A plan you stick to beats a perfect plan you abandon, and
                that psychology is worth real money to some people.
              </div>
            )}

            {/* Chart */}
            <div
              className="mb-6 rounded-card-lg border border-edge bg-card p-5 max-md:p-3"
              style={{ animation: "fadeInUp 0.6s ease-out 0.35s both" }}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
                <h3 className="m-0 text-lg font-semibold">Payoff timeline</h3>
                <div className="flex gap-4 text-xs text-ink-secondary">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: AVALANCHE }} />
                    Avalanche
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: SNOWBALL }} />
                    Snowball
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#334155" strokeOpacity={0.4} vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#334155" }}
                    interval="preserveStartEnd"
                    tickFormatter={(m) => `${m}mo`}
                  />
                  <YAxis
                    tickFormatter={fmtAxis}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    width={54}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ stroke: "#64748b", strokeDasharray: "4 4" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avalanche"
                    name="Avalanche"
                    stroke={AVALANCHE}
                    strokeWidth={2}
                    dot={false}
                    animationDuration={600}
                  />
                  <Line
                    type="monotone"
                    dataKey="snowball"
                    name="Snowball"
                    stroke={SNOWBALL}
                    strokeWidth={2}
                    dot={false}
                    animationDuration={600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        <MascotCallout emoji="🐻" name="Benjamin the Bear" accent={ACCENT} delay={0.4}>
          Here's how the two plans differ: avalanche points every spare dollar at the debt with the
          highest interest rate, which is mathematically unbeatable — interest is the price of
          debt, and you're shutting off the most expensive meter first. Snowball attacks the
          smallest balance instead, so you feel a win fast: one card gone, then another, each freed-up
          minimum "snowballing" into the next debt. Both plans pay every minimum every month —
          that's non-negotiable, it's what keeps your credit intact. My honest advice? Run your
          real numbers above. If avalanche only saves you fifty bucks, take the snowball wins. If
          it saves you a thousand, grit your teeth and climb the mountain.
        </MascotCallout>
      </div>
    </div>
  );
}
