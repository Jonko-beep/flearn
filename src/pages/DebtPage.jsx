import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, TriangleAlert } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { markToolUsed } from "../lib/achievements.js";
import {
  fmt$,
  fmtAxis,
  SliderField,
  ToolHeader,
  ToolLayout,
  ChartCard,
  ChartTooltip,
  GroupLabel,
  Insight,
  MascotCallout,
  chart,
} from "../components/CalcKit.jsx";
import { Badge, Button, Callout, Card, cx } from "../ui/kit.jsx";

const MAX_DEBTS = 5;
const MAX_MONTHS = 600; // 50 years — past this, the plan isn't working
const STORAGE_KEY = "flearn_debts";

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

function PayoffTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <ChartTooltip
      title={`Month ${label}`}
      rows={payload.map((p) => ({ label: p.name, color: p.stroke, value: fmt$(p.value) }))}
    />
  );
}

// Chosen so the two strategies visibly diverge: snowball goes for the small
// 0% medical bill first, avalanche for the 24% card.
const DEFAULT_DEBTS = [
  { name: "Credit card", balance: 5000, apr: 24, minPayment: 100 },
  { name: "Medical bill", balance: 1200, apr: 0, minPayment: 50 },
  { name: "Student loan", balance: 10000, apr: 5.5, minPayment: 120 },
];
const DEFAULT_BUDGET = 500;

function readSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.debts) || parsed.debts.length === 0) return null;
    const num = (n, max) => (Number.isFinite(n) ? Math.min(max, Math.max(0, n)) : 0);
    return {
      debts: parsed.debts.slice(0, MAX_DEBTS).map((d, i) => ({
        name: typeof d.name === "string" ? d.name.slice(0, 24) : `Debt ${i + 1}`,
        balance: num(d.balance, 1e6),
        apr: num(d.apr, 100),
        minPayment: num(d.minPayment, 1e5),
      })),
      budget: num(parsed.budget, 5000) || DEFAULT_BUDGET,
    };
  } catch {
    return null;
  }
}

function writeSaved(debts, budget) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ debts, budget }));
  } catch {
    // storage unavailable — the calculator still works, it just won't persist
  }
}

function DebtRow({ debt, onChange, onRemove, canRemove }) {
  const num = (key, raw, min, max) => {
    const n = parseFloat(raw);
    onChange({ ...debt, [key]: Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : 0 });
  };
  const small = "field num h-9 px-2 text-right";
  return (
    <div className="py-3.5 first:pt-0 last:pb-0">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={debt.name}
          maxLength={24}
          onChange={(e) => onChange({ ...debt, name: e.target.value })}
          aria-label="Debt name"
          className="field h-9 font-semibold"
        />
        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`Remove ${debt.name || "debt"}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-loss/10 hover:text-loss disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Trash2 size={16} aria-hidden />
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <label className="flex flex-col gap-1 text-2xs font-medium text-ink-muted">
          Balance ($)
          <input type="number" min={0} value={debt.balance} onChange={(e) => num("balance", e.target.value, 0, 1e6)} className={small} />
        </label>
        <label className="flex flex-col gap-1 text-2xs font-medium text-ink-muted">
          APR (%)
          <input type="number" min={0} step={0.1} value={debt.apr} onChange={(e) => num("apr", e.target.value, 0, 100)} className={small} />
        </label>
        <label className="flex flex-col gap-1 text-2xs font-medium text-ink-muted">
          Min. payment ($)
          <input
            type="number"
            min={0}
            value={debt.minPayment}
            onChange={(e) => num("minPayment", e.target.value, 0, 1e5)}
            className={small}
          />
        </label>
      </div>
    </div>
  );
}

function StrategyCard({ title, rule, swatch, tone, result, best }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: swatch }} />
          <h2 className="text-[1.2rem]">{title}</h2>
        </div>
        {best && <Badge tone="gain">Cheapest</Badge>}
      </div>
      <p className="mt-1 text-[0.8125rem] text-ink-muted">{rule}</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="eyebrow">Debt-free in</div>
          <div className="num mt-1.5 font-display text-[1.5rem] font-semibold leading-none tracking-tight">
            {result.finished ? fmtMonths(result.months) : "50+ yrs"}
          </div>
        </div>
        <div>
          <div className="eyebrow">Total interest</div>
          <div className={cx("num mt-1.5 font-display text-[1.5rem] font-semibold leading-none tracking-tight", tone)}>
            {fmt$(result.totalInterest)}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function DebtPage() {
  const [saved] = useState(readSaved);
  const [debts, setDebts] = useState(saved?.debts ?? DEFAULT_DEBTS);
  const [budget, setBudget] = useState(saved?.budget ?? DEFAULT_BUDGET);

  useEffect(() => {
    markToolUsed("debt");
  }, []);

  useEffect(() => {
    writeSaved(debts, budget);
  }, [debts, budget]);

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
  const avalancheCheaper = bothFinish && Math.round(interestDiff) > 0;

  return (
    <div className="animate-enter">
      <ToolHeader
        tool="debt"
        hueKey="saving"
        title="Debt payoff calculator"
        tagline="Avalanche vs. snowball — see what each path costs and how fast it gets you free."
      />

      <ToolLayout
        controls={
          <>
            <Card className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <GroupLabel className="!pt-0">Your debts</GroupLabel>
                <span className="num text-2xs text-ink-muted">
                  {debts.length} of {MAX_DEBTS}
                </span>
              </div>
              <div className="divide-y divide-edge">
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
                <Button variant="secondary" size="sm" icon={Plus} onClick={addDebt} className="mt-4 w-full">
                  Add debt
                </Button>
              )}
            </Card>

            <SliderField
              label="Monthly payment budget"
              value={budget}
              min={0}
              max={5000}
              step={25}
              onChange={setBudget}
              prefix="$"
              display={(v) => `${fmt$(v)}`}
              hint={validDebts.length > 0 ? `minimums: ${fmt$(minTotal)}` : undefined}
            />
          </>
        }
      >
        {!budgetOk ? (
          <Callout tone="warn" icon={TriangleAlert} title={validDebts.length === 0 ? "No debts to compare" : "Budget is below the minimums"}>
            {validDebts.length === 0 ? (
              <>Add at least one debt with a balance to compare payoff strategies.</>
            ) : (
              <>
                Your minimum payments add up to <span className="num font-semibold text-ink">{fmt$(minTotal)}</span>
                /month, but your budget is <span className="num font-semibold text-ink">{fmt$(budget)}</span>. Nudge
                the budget up to at least the minimums — that&apos;s the floor that keeps every account current.
              </>
            )}
          </Callout>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              <StrategyCard
                title="Avalanche"
                rule="Highest interest rate first"
                swatch={chart.accent}
                tone="text-accent-ink"
                result={results.avalanche}
                best={avalancheCheaper}
              />
              <StrategyCard
                title="Snowball"
                rule="Smallest balance first"
                swatch={chart.second}
                tone="text-chart2"
                result={results.snowball}
              />
            </div>

            {!bothFinish && (
              <Callout tone="loss" icon={TriangleAlert} title="This budget never reaches zero">
                At this budget, the balances outrun the payments — interest is growing faster than you&apos;re paying
                it down. Raise the monthly budget until both plans reach zero.
              </Callout>
            )}

            <ChartCard
              title="Payoff timeline"
              legend={[
                { label: "Avalanche", color: chart.accent },
                { label: "Snowball", color: chart.second },
              ]}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={chart.grid} vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={chart.tick}
                    tickLine={false}
                    axisLine={{ stroke: chart.axis }}
                    interval="preserveStartEnd"
                    tickFormatter={(m) => `${m}mo`}
                  />
                  <YAxis tickFormatter={fmtAxis} tick={chart.tick} tickLine={false} axisLine={false} width={54} />
                  <Tooltip content={<PayoffTooltip />} cursor={chart.cursor} />
                  <Line type="monotone" dataKey="avalanche" name="Avalanche" stroke={chart.accent} strokeWidth={2} dot={false} animationDuration={600} />
                  <Line type="monotone" dataKey="snowball" name="Snowball" stroke={chart.second} strokeWidth={2} dot={false} animationDuration={600} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {bothFinish && (
              <Insight title="The math">
                {avalancheCheaper ? (
                  <>
                    Avalanche saves you <span className="num font-semibold">{fmt$(interestDiff)}</span> in interest
                    over snowball
                    {results.snowball.months !== results.avalanche.months && (
                      <>
                        {" "}
                        and gets you debt-free {fmtMonths(Math.abs(results.snowball.months - results.avalanche.months))}{" "}
                        {results.avalanche.months < results.snowball.months ? "sooner" : "later"}
                      </>
                    )}
                    .
                  </>
                ) : (
                  <>With these debts, both strategies cost about the same — pick whichever keeps you motivated.</>
                )}{" "}
                That said: snowball&apos;s quick wins — killing off whole accounts early — keep a lot of people from
                quitting. A plan you stick to beats a perfect plan you abandon, and that psychology is worth real
                money to some people.
              </Insight>
            )}
          </>
        )}

        <MascotCallout emoji="🐻" name="Benjamin the Bear" hueKey="saving">
          Here&apos;s how the two plans differ: avalanche points every spare dollar at the debt with the highest
          interest rate, which is mathematically unbeatable — interest is the price of debt, and you&apos;re shutting
          off the most expensive meter first. Snowball attacks the smallest balance instead, so you feel a win fast:
          one card gone, then another, each freed-up minimum &quot;snowballing&quot; into the next debt. Both plans
          pay every minimum every month — that&apos;s non-negotiable, it&apos;s what keeps your credit intact. My
          honest advice? Run your real numbers above. If avalanche only saves you fifty bucks, take the snowball
          wins. If it saves you a thousand, grit your teeth and climb the mountain.
        </MascotCallout>
      </ToolLayout>
    </div>
  );
}
