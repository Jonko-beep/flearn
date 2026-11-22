import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { markToolUsed } from "../lib/achievements.js";
import {
  fmt$,
  fmtAxis,
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
import { Card, cx } from "../ui/kit.jsx";
import { color } from "../ui/theme.js";

const RETIRE_AGE = 65;
const PRESETS = [
  { age: 20, label: "Start at 20", years: RETIRE_AGE - 20 },
  { age: 30, label: "Start at 30", years: RETIRE_AGE - 30 },
  { age: 40, label: "Start at 40", years: RETIRE_AGE - 40 },
];

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

function GrowthTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const byKey = Object.fromEntries(payload.map((p) => [p.dataKey, p.value]));
  const total = (byKey.contributions ?? 0) + (byKey.growth ?? 0);
  return (
    <ChartTooltip
      title={`Year ${label}`}
      rows={[
        { label: "Total balance", value: fmt$(total), color: color("ink"), strong: true },
        { label: "Growth", value: fmt$(byKey.growth ?? 0), color: chart.accent },
        { label: "Contributions", value: fmt$(byKey.contributions ?? 0), color: chart.second },
      ]}
    />
  );
}

export default function CompoundPage() {
  const [start, setStart] = useState(1000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(8);
  const [years, setYearsRaw] = useState(30);
  const [activePreset, setActivePreset] = useState(null);

  useEffect(() => {
    markToolUsed("compound"); // Tool Time achievement
  }, []);

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
    const others = PRESETS.map((p, i) => ({ ...p, final: presetFinals[i] })).filter((_, i) => i !== activePreset);
    const mine = presetFinals[activePreset];
    const parts = others.map((o) => {
      const diff = mine - o.final;
      return `${fmt$(Math.abs(diff))} ${diff >= 0 ? "more than" : "less than"} starting at ${o.age}`;
    });
    return `Retiring at ${RETIRE_AGE} with the same ${fmt$(monthly)}/month: that's ${parts.join(" and ")}. Same monthly habit — the earlier start adds deposits, but most of the gap is extra years of compounding.`;
  }, [activePreset, presetFinals, monthly]);

  return (
    <div className="animate-enter">
      <ToolHeader
        tool="compound"
        hueKey="investing"
        title="Compound interest visualizer"
        tagline="See the moment your money starts working harder than you do."
      />

      <ToolLayout
        controls={
          <>
            <SliderField
              label="Starting amount"
              value={start}
              min={0}
              max={100000}
              step={500}
              onChange={setStart}
              prefix="$"
              display={(v) => fmtAxis(v)}
            />
            <SliderField
              label="Monthly contribution"
              value={monthly}
              min={0}
              max={5000}
              step={25}
              onChange={setMonthly}
              prefix="$"
              display={(v) => `${fmt$(v)}`}
            />
            <SliderField
              label="Annual return"
              value={rate}
              min={0}
              max={15}
              step={0.1}
              onChange={setRate}
              suffix="%"
              display={(v) => `${v}%`}
            />
            <SliderField
              label="Years"
              value={years}
              min={1}
              max={50}
              step={1}
              onChange={setYears}
              display={(v) => `${v} yr${v === 1 ? "" : "s"}`}
            />

            <Card className="p-4">
              <GroupLabel className="!pt-0">The cost of waiting · invest until {RETIRE_AGE}</GroupLabel>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                {PRESETS.map((p, i) => (
                  <button
                    key={p.age}
                    type="button"
                    onClick={() => applyPreset(i)}
                    aria-pressed={activePreset === i}
                    className={cx(
                      "h-9 rounded-lg border text-[0.8125rem] font-semibold transition-colors",
                      activePreset === i
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-edge-strong text-ink-secondary hover:bg-raised hover:text-ink"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {presetNote && (
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-secondary">
                  <span className="font-semibold text-accent-ink">{PRESETS[activePreset].label}:</span> you&apos;d
                  retire with <span className="num font-semibold text-ink">{fmt$(presetFinals[activePreset])}</span>.{" "}
                  {presetNote}
                </p>
              )}
            </Card>
          </>
        }
      >
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <StatCard label="Final balance" value={fmt$(sim.finalBalance)} />
          <StatCard label="Total contributed" value={fmt$(sim.totalContributed)} tone="chart2" />
          <StatCard label="Total growth" value={fmt$(sim.totalGrowth)} tone="accent" />
        </div>

        <ChartCard
          title={`Your money over ${years} year${years === 1 ? "" : "s"}`}
          legend={[
            { label: "Growth", color: chart.accent },
            { label: "Contributions", color: chart.second },
          ]}
        >
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={sim.data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={chart.grid} vertical={false} />
              <XAxis
                dataKey="year"
                tick={chart.tick}
                tickLine={false}
                axisLine={{ stroke: chart.axis }}
                interval="preserveStartEnd"
                tickFormatter={(y) => `${y}y`}
              />
              <YAxis tickFormatter={fmtAxis} tick={chart.tick} tickLine={false} axisLine={false} width={54} />
              <Tooltip content={<GrowthTooltip />} cursor={chart.cursor} />
              <Area
                type="monotone"
                dataKey="contributions"
                name="Contributions"
                stackId="1"
                stroke={chart.second}
                strokeWidth={2}
                fill={chart.second}
                fillOpacity={0.28}
                animationDuration={600}
              />
              <Area
                type="monotone"
                dataKey="growth"
                name="Growth"
                stackId="1"
                stroke={chart.accent}
                strokeWidth={2}
                fill={chart.accent}
                fillOpacity={0.3}
                animationDuration={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <Insight>{insight}</Insight>

        <MascotCallout emoji="🦭" name="Warren the Walrus" hueKey="investing">
          Here&apos;s the secret this chart gives away: time in the market beats timing the market. In the early years
          the indigo band — your own deposits — does almost all the work, and it&apos;s tempting to think investing
          &quot;isn&apos;t doing anything.&quot; Then the teal wedge creeps up, crosses over, and eventually dwarfs
          everything you put in. Nobody can reliably guess which days the market will jump, and missing just a
          handful of its best days can cost you a huge slice of that wedge. So don&apos;t wait for the
          &quot;perfect&quot; moment — the 8% default here is roughly the stock market&apos;s long-run average, not a
          promise, but the pattern holds at any rate: the earlier a dollar goes in, the more years it spends
          compounding. Play with the &quot;Start at 20 / 30 / 40&quot; buttons and you&apos;ll see waiting is the
          most expensive thing most investors ever do.
        </MascotCallout>
      </ToolLayout>
    </div>
  );
}
