import { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Timer } from "lucide-react";
import { markToolUsed } from "../lib/achievements.js";
import {
  fmt$,
  SliderField,
  StatCard,
  ToolHeader,
  ToolLayout,
  ChartCard,
  ChartTooltip,
  ChoiceGrid,
  GroupLabel,
  Insight,
  MascotCallout,
  chart,
} from "../components/CalcKit.jsx";
import { computePaycheck } from "../lib/paycheck.js";
import { Card } from "../ui/kit.jsx";

export const FREQUENCIES = [
  { value: 52, label: "Weekly" },
  { value: 26, label: "Biweekly" },
  { value: 24, label: "Semimonthly" },
  { value: 12, label: "Monthly" },
];

function fmtCents(n) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <ChartTooltip
      rows={[{ label: p.name, color: p.payload.color, value: `${fmt$(p.value)} per paycheck`, strong: true }]}
    />
  );
}

export default function PaycheckPage() {
  const [mode, setMode] = useState("salary");
  const [salary, setSalary] = useState(60000);
  const [wage, setWage] = useState(20);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [periodsPerYear, setPeriodsPerYear] = useState(26);

  useEffect(() => {
    markToolUsed("paycheck");
  }, []);

  const calc = useMemo(
    () => computePaycheck({ mode, salary, wage, hoursPerWeek, periodsPerYear }),
    [mode, salary, wage, hoursPerWeek, periodsPerYear]
  );

  const donutData = [
    { name: "Take-home", value: calc.takeHomePer, color: chart.accent },
    { name: "Federal tax", value: calc.federalPer, color: chart.second },
    { name: "FICA", value: calc.ficaPer, color: chart.warn },
  ];

  const freqLabel = FREQUENCIES.find((f) => f.value === periodsPerYear).label.toLowerCase();
  const keepPct = calc.grossPer > 0 ? `${((calc.takeHomePer / calc.grossPer) * 100).toFixed(0)}%` : "—";

  return (
    <div className="animate-enter">
      <ToolHeader
        tool="paycheck"
        hueKey="investing"
        title="Paycheck calculator"
        tagline="Why your paycheck is smaller than your salary says — and where the rest goes."
      />

      <ToolLayout
        controls={
          <>
            <Card className="p-4">
              <GroupLabel className="!pt-0">How you&apos;re paid</GroupLabel>
              <div className="mt-3">
                <ChoiceGrid
                  label="How you're paid"
                  value={mode}
                  onChange={setMode}
                  options={[
                    { value: "salary", label: "Annual salary" },
                    { value: "hourly", label: "Hourly wage" },
                  ]}
                />
              </div>
              <GroupLabel className="mt-4">Pay frequency</GroupLabel>
              <div className="mt-3">
                <ChoiceGrid label="Pay frequency" value={periodsPerYear} onChange={setPeriodsPerYear} options={FREQUENCIES} />
              </div>
            </Card>

            {mode === "salary" ? (
              <SliderField
                label="Annual salary"
                value={salary}
                min={0}
                max={300000}
                step={1000}
                onChange={setSalary}
                prefix="$"
                display={(v) => `$${Math.round(v / 1000)}k`}
              />
            ) : (
              <>
                <SliderField
                  label="Hourly wage"
                  value={wage}
                  min={7.25}
                  max={100}
                  step={0.25}
                  onChange={setWage}
                  prefix="$"
                  display={(v) => `$${v.toFixed(2)}`}
                />
                <SliderField
                  label="Hours per week"
                  value={hoursPerWeek}
                  min={1}
                  max={60}
                  step={1}
                  onChange={setHoursPerWeek}
                  display={(v) => `${v} hrs`}
                />
              </>
            )}
          </>
        }
      >
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <StatCard label={`Take-home per ${freqLabel} check`} value={fmt$(calc.takeHomePer)} tone="accent" />
          <StatCard
            label="Gross per check"
            value={fmt$(calc.grossPer)}
            sub={`${fmt$(calc.grossAnnual)}/yr before anything comes out`}
          />
          <StatCard
            label="Estimated taxes per check"
            value={fmt$(calc.federalPer + calc.ficaPer)}
            tone="chart2"
            sub={`~${(calc.effectiveRate * 100).toFixed(1)}% effective rate`}
          />
        </div>

        <ChartCard title="Where each paycheck goes">
          <div className="grid items-center gap-x-8 gap-y-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="relative">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={78}
                    outerRadius={108}
                    paddingAngle={2}
                    strokeWidth={0}
                    animationDuration={600}
                  >
                    {donutData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <div className="eyebrow">You keep</div>
                <div className="num mt-1 font-display text-[2rem] font-semibold leading-none text-accent-ink">{keepPct}</div>
              </div>
            </div>
            <dl className="num flex flex-col divide-y divide-edge text-sm">
              {donutData.map((d) => (
                <div key={d.name} className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="flex items-center gap-2 text-ink-secondary">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
                    {d.name}
                  </dt>
                  <dd className="font-semibold text-ink">{fmtCents(d.value)}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-ink-muted">Gross pay</dt>
                <dd className="font-semibold text-ink">{fmtCents(calc.grossPer)}</dd>
              </div>
            </dl>
          </div>
        </ChartCard>

        <Insight title="What your time is worth" icon={Timer}>
          On paper you earn <span className="num font-semibold">{fmtCents(calc.grossHourly)}/hour</span>
          {mode === "salary" && " (assuming a 40-hour week)"}, but after federal tax and FICA your true take-home rate
          is about <span className="num font-semibold text-accent-ink">{fmtCents(calc.trueHourly)}/hour</span>. Next
          time a $60 impulse buy tempts you, that&apos;s roughly{" "}
          {calc.trueHourly > 0 ? `${(60 / calc.trueHourly).toFixed(1)} hours` : "a lot"} of your life — price things
          in hours and spending gets honest fast.
        </Insight>

        <MascotCallout emoji="🦭" name="Warren the Walrus" hueKey="investing">
          The first real paycheck is a rite of passage: you do the math on your salary, then the deposit lands and
          it&apos;s... less. Nobody stole from you — you&apos;ve just met withholding. Federal income tax comes out in
          brackets, so only the dollars above each threshold pay the higher rate (a raise can never make your
          take-home shrink, whatever your uncle claims). FICA is your Social Security and Medicare contribution — a
          flat 7.65% of every dollar for most earners (the Social Security part stops once your wages pass a yearly
          cap). The number to burn into memory is your take-home, because that&apos;s what rent, groceries, and your
          investing plan actually draw from. Budget from take-home, not from salary, and you&apos;ll never write
          checks your paycheck can&apos;t cash.
        </MascotCallout>

        <p className="border-t border-edge pt-4 text-[0.8125rem] leading-relaxed text-ink-muted">
          <span className="font-semibold text-ink-secondary">Educational estimate only.</span> This uses 2026 federal
          brackets for a single filer taking the standard deduction, plus FICA (6.2% Social Security on the first
          $184,500 of wages and 1.45% Medicare, with an extra 0.9% Medicare above $200,000). Real paychecks also
          reflect state and local taxes, 401(k) and health-insurance deductions, tax credits, and other adjustments
          — so yours will differ. This is for understanding your paystub, not tax advice.
        </p>
      </ToolLayout>
    </div>
  );
}
