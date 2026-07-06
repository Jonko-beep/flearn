import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ACCENT = "#0D9488"; // growth (earnings)
const CONTRIB = "#6366F1"; // contributions

const RETIRE_AGE = 65;
const PRESETS = [
  { age: 20, label: "Start at 20", years: RETIRE_AGE - 20 },
  { age: 30, label: "Start at 30", years: RETIRE_AGE - 30 },
  { age: 40, label: "Start at 40", years: RETIRE_AGE - 40 },
];

function fmt$(n) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function fmtAxis(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M`;
  if (n >= 1e3) return `$${Math.round(n / 1e3)}k`;
  return `$${Math.round(n)}`;
}

// Month-by-month compounding, sampled once per year for the chart.
function simulate(start, monthly, rate, years) {
  const r = rate / 100 / 12;
  let balance = start;
  const data = [{ year: 0, contributions: start, growth: 0, balance: start }];
  let crossoverYear = null; // first year the money earns more than the contributions
  for (let y = 1; y <= years; y++) {
    const opening = balance;
    for (let m = 0; m < 12; m++) balance = balance * (1 + r) + monthly;
    const contributions = start + monthly * 12 * y;
    const earned = balance - opening - monthly * 12;
    if (crossoverYear === null && monthly > 0 && earned > monthly * 12) crossoverYear = y;
    data.push({
      year: y,
      contributions,
      growth: Math.max(0, balance - contributions),
      balance,
      earned,
    });
  }
  const last = data[data.length - 1];
  return {
    data,
    crossoverYear,
    finalBalance: last.balance,
    totalContributed: last.contributions,
    totalGrowth: Math.max(0, last.balance - last.contributions),
    lastYearEarnings: last.earned ?? 0,
  };
}

function buildInsight(sim, monthly, rate, years) {
  const yearly = monthly * 12;
  if (rate === 0)
    return "At a 0% return there's no compounding at all — every dollar in the chart is one you deposited. Nudge the rate up and watch the teal wedge appear.";
  if (monthly === 0 && sim.finalBalance > 0)
    return `Without adding a dime, your starting amount grows to ${fmt$(sim.finalBalance)} — all ${fmt$(sim.totalGrowth)} of that is pure compounding.`;
  if (monthly === 0) return "Add a starting amount or a monthly contribution to see compounding work.";
  if (sim.crossoverYear !== null)
    return `By year ${sim.crossoverYear}, your money earns more per year than you contribute — from there, compounding is doing the heavy lifting, not you.`;
  return `Your money isn't out-earning you yet: in year ${years} it makes ${fmt$(sim.lastYearEarnings)} vs. your ${fmt$(yearly)} of contributions. Stretch the timeline (or the rate) to find the crossover.`;
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const byKey = Object.fromEntries(payload.map((p) => [p.dataKey, p.value]));
  const total = (byKey.contributions ?? 0) + (byKey.growth ?? 0);
  const rows = [
    { name: "Total balance", value: total, color: "#f1f5f9", bold: true },
    { name: "Growth", value: byKey.growth ?? 0, color: ACCENT },
    { name: "Contributions", value: byKey.contributions ?? 0, color: CONTRIB },
  ];
  return (
    <div className="rounded-card border border-edge bg-well px-4 py-3 text-sm shadow-xl">
      <div className="mb-1.5 font-semibold text-ink">Year {label}</div>
      {rows.map((r) => (
        <div key={r.name} className="flex items-center justify-between gap-6 py-0.5">
          <span className="flex items-center gap-1.5 text-ink-secondary">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: r.color }} />
            {r.name}
          </span>
          <span className={r.bold ? "font-semibold text-ink" : "text-ink-secondary"}>
            {fmt$(r.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

function SliderField({ label, value, min, max, step, onChange, prefix, suffix, display }) {
  const [text, setText] = useState(String(value));
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!focused) setText(String(value));
  }, [value, focused]);

  const clamp = (n) => Math.min(max, Math.max(min, n));
  const handleText = (raw) => {
    setText(raw);
    const n = parseFloat(raw);
    if (Number.isFinite(n)) onChange(clamp(n));
  };

  return (
    <div className="rounded-card border border-edge bg-well/50 px-4 py-3.5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink">{label}</label>
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
              {prefix}
            </span>
          )}
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={text}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              setText(String(value));
            }}
            onChange={(e) => handleText(e.target.value)}
            className={`w-[110px] rounded-card border border-edge bg-well py-1.5 pr-2 text-right text-sm text-ink outline-none transition-colors focus:border-invest ${prefix ? "pl-7" : "pl-2"} ${suffix ? "pr-8" : ""}`}
            aria-label={`${label} value`}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
              {suffix}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(clamp(parseFloat(e.target.value)))}
          className="h-1.5 w-full cursor-pointer accent-invest"
          aria-label={`${label} slider`}
        />
        <span className="w-14 shrink-0 text-right text-xs text-ink-muted">{display(value)}</span>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, delay }) {
  return (
    <div
      className="rounded-card-lg border bg-card p-5"
      style={{ borderColor: `${color}33`, animation: `fadeInUp 0.6s ease-out ${delay}s both` }}
    >
      <div className="mb-1 text-xs tracking-wide text-ink-muted uppercase">{label}</div>
      <div className="font-serif text-[1.65rem] font-bold tracking-heading" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

export default function CompoundPage() {
  const [start, setStart] = useState(1000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(8);
  const [years, setYearsRaw] = useState(30);
  const [activePreset, setActivePreset] = useState(null);

  const setYears = (n) => {
    setYearsRaw(n);
    setActivePreset(null); // manual change breaks out of preset mode
  };

  const sim = useMemo(() => simulate(start, monthly, rate, years), [start, monthly, rate, years]);
  const insight = buildInsight(sim, monthly, rate, years);

  const presetFinals = useMemo(
    () => PRESETS.map((p) => simulate(start, monthly, rate, p.years).finalBalance),
    [start, monthly, rate]
  );

  const applyPreset = (i) => {
    setYearsRaw(PRESETS[i].years);
    setActivePreset(i);
  };

  const presetNote = useMemo(() => {
    if (activePreset === null) return null;
    const others = PRESETS.map((p, i) => ({ ...p, final: presetFinals[i] })).filter(
      (_, i) => i !== activePreset
    );
    const mine = presetFinals[activePreset];
    const parts = others.map((o) => {
      const diff = mine - o.final;
      return `${fmt$(Math.abs(diff))} ${diff >= 0 ? "more than" : "less than"} starting at ${o.age}`;
    });
    return `Retiring at ${RETIRE_AGE} with the same ${fmt$(monthly)}/month: that's ${parts.join(" and ")}. Same money in — the only difference is time.`;
  }, [activePreset, presetFinals, monthly]);

  return (
    <div className="min-h-screen p-8 max-md:p-5">
      <div className="mx-auto max-w-[760px]">
        <Link
          to="/tools"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to tools
        </Link>

        <div className="mb-6 animate-fade-in-down">
          <div className="flex items-center gap-3">
            <span
              className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
              style={{ background: `${ACCENT}15` }}
            >
              📈
            </span>
            <div>
              <h2 className="m-0 text-3xl font-bold">Compound Interest Visualizer</h2>
              <span className="text-sm text-ink-muted">
                See the moment your money starts working harder than you do.
              </span>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div
          className="mb-6 grid grid-cols-2 gap-3 max-md:grid-cols-1"
          style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
        >
          <SliderField
            label="💵 Starting amount"
            value={start}
            min={0}
            max={100000}
            step={500}
            onChange={setStart}
            prefix="$"
            display={(v) => fmtAxis(v)}
          />
          <SliderField
            label="📆 Monthly contribution"
            value={monthly}
            min={0}
            max={5000}
            step={25}
            onChange={setMonthly}
            prefix="$"
            display={(v) => `${fmt$(v)}`}
          />
          <SliderField
            label="📊 Annual return"
            value={rate}
            min={0}
            max={15}
            step={0.1}
            onChange={setRate}
            suffix="%"
            display={(v) => `${v.toFixed(1)}%`}
          />
          <SliderField
            label="⏳ Years"
            value={years}
            min={1}
            max={50}
            step={1}
            onChange={setYears}
            display={(v) => `${v} yrs`}
          />
        </div>

        {/* Presets */}
        <div className="mb-6" style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}>
          <div className="mb-2 text-sm font-medium text-ink-secondary">
            The cost of waiting (invest until {RETIRE_AGE}):
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={p.age}
                onClick={() => applyPreset(i)}
                className="rounded-full border px-4 py-1.5 text-sm font-medium transition-all hover:-translate-y-px"
                style={
                  activePreset === i
                    ? { borderColor: ACCENT, color: "#fff", background: ACCENT }
                    : { borderColor: `${ACCENT}55`, color: ACCENT, background: `${ACCENT}10` }
                }
              >
                {p.label}
              </button>
            ))}
          </div>
          {presetNote && (
            <div
              className="mt-3 rounded-card border p-4 text-sm leading-relaxed text-ink"
              style={{ borderColor: `${ACCENT}33`, background: `${ACCENT}0d` }}
            >
              <span className="font-semibold" style={{ color: ACCENT }}>
                {PRESETS[activePreset].label}:
              </span>{" "}
              you'd retire with <span className="font-semibold">{fmt$(presetFinals[activePreset])}</span>.{" "}
              {presetNote}
            </div>
          )}
        </div>

        {/* Chart */}
        <div
          className="mb-6 rounded-card-lg border border-edge bg-card p-5 max-md:p-3"
          style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <h3 className="m-0 text-lg font-semibold">Your money over {years} years</h3>
            <div className="flex gap-4 text-xs text-ink-secondary">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: ACCENT }} />
                Growth
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: CONTRIB }} />
                Contributions
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={sim.data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#334155" strokeOpacity={0.4} vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#334155" }}
                interval="preserveStartEnd"
                tickFormatter={(y) => `${y}y`}
              />
              <YAxis
                tickFormatter={fmtAxis}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={54}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#64748b", strokeDasharray: "4 4" }} />
              <Area
                type="monotone"
                dataKey="contributions"
                name="Contributions"
                stackId="1"
                stroke={CONTRIB}
                strokeWidth={2}
                fill={CONTRIB}
                fillOpacity={0.3}
                animationDuration={600}
              />
              <Area
                type="monotone"
                dataKey="growth"
                name="Growth"
                stackId="1"
                stroke={ACCENT}
                strokeWidth={2}
                fill={ACCENT}
                fillOpacity={0.35}
                animationDuration={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-3 gap-3 max-md:grid-cols-1">
          <StatCard label="Final balance" value={fmt$(sim.finalBalance)} color="#f1f5f9" delay={0.25} />
          <StatCard label="Total contributed" value={fmt$(sim.totalContributed)} color={CONTRIB} delay={0.3} />
          <StatCard label="Total growth" value={fmt$(sim.totalGrowth)} color={ACCENT} delay={0.35} />
        </div>

        {/* Insight */}
        <div
          className="mb-6 rounded-card border p-4"
          style={{
            borderColor: `${ACCENT}33`,
            background: `${ACCENT}0d`,
            animation: "fadeInUp 0.6s ease-out 0.4s both",
          }}
        >
          <div className="mb-1 text-xs font-semibold tracking-wide uppercase" style={{ color: ACCENT }}>
            💡 Insight
          </div>
          <p className="m-0 text-sm leading-relaxed text-ink">{insight}</p>
        </div>

        {/* Warren explainer */}
        <div
          className="mb-8 flex items-start gap-4 rounded-card px-5 py-4"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}12, ${ACCENT}08)`,
            border: `1px solid ${ACCENT}20`,
            animation: "fadeInUp 0.6s ease-out 0.45s both",
          }}
        >
          <span className="text-4xl">🦭</span>
          <div>
            <span className="font-serif text-[0.95rem] font-semibold" style={{ color: ACCENT }}>
              Warren the Walrus
            </span>
            <p className="m-0 mt-1 text-sm leading-relaxed text-ink-secondary">
              Here's the secret this chart gives away: time in the market beats timing the market.
              In the early years the indigo band — your own deposits — does almost all the work,
              and it's tempting to think investing "isn't doing anything." Then the teal wedge
              creeps up, crosses over, and eventually dwarfs everything you put in. Nobody can
              reliably guess which days the market will jump, and missing just a handful of its
              best days can cost you a huge slice of that wedge. So don't wait for the "perfect"
              moment — the 8% default here is roughly the stock market's long-run average, not a
              promise, but the pattern holds at any rate: the earlier a dollar goes in, the more
              years it spends compounding. Play with the "Start at 20 / 30 / 40" buttons above
              and you'll see waiting is the most expensive thing most investors ever do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
