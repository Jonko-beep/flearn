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
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { computePaycheck } from "../lib/paycheck.js";

const ACCENT = "#0D9488"; // Warren's teal
const TAKE_HOME = "#0D9488";
const FEDERAL = "#6366F1";
const FICA_COLOR = "#D97706";

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
    <div className="rounded-card border border-edge bg-well px-4 py-3 text-sm shadow-xl">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.payload.color }} />
        <span className="font-semibold text-ink">{p.name}</span>
      </div>
      <div className="mt-0.5 text-ink-secondary">{fmt$(p.value)} per paycheck</div>
    </div>
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
    { name: "Take-home", value: calc.takeHomePer, color: TAKE_HOME },
    { name: "Federal tax", value: calc.federalPer, color: FEDERAL },
    { name: "FICA", value: calc.ficaPer, color: FICA_COLOR },
  ];

  const freqLabel = FREQUENCIES.find((f) => f.value === periodsPerYear).label.toLowerCase();

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
          emoji="🧾"
          accent={ACCENT}
          title="Paycheck Calculator"
          tagline="Why your paycheck is smaller than your salary says — and where the rest goes."
        />

        {/* Inputs */}
        <div className="mb-4 flex flex-col gap-3" style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}>
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <div className="rounded-card border border-edge bg-well/50 px-4 py-3.5">
              <label className="mb-2.5 block text-sm font-medium text-ink">💼 How you're paid</label>
              <ToggleRow
                accent={ACCENT}
                value={mode}
                onChange={setMode}
                options={[
                  { value: "salary", label: "Annual salary" },
                  { value: "hourly", label: "Hourly wage" },
                ]}
              />
            </div>
            <div className="rounded-card border border-edge bg-well/50 px-4 py-3.5">
              <label className="mb-2.5 block text-sm font-medium text-ink">📅 Pay frequency</label>
              <ToggleRow
                accent={ACCENT}
                value={periodsPerYear}
                onChange={setPeriodsPerYear}
                options={FREQUENCIES}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            {mode === "salary" ? (
              <SliderField
                label="💵 Annual salary"
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
                  label="💵 Hourly wage"
                  value={wage}
                  min={7.25}
                  max={100}
                  step={0.25}
                  onChange={setWage}
                  prefix="$"
                  display={(v) => `$${v.toFixed(2)}`}
                />
                <SliderField
                  label="🕐 Hours per week"
                  value={hoursPerWeek}
                  min={1}
                  max={60}
                  step={1}
                  onChange={setHoursPerWeek}
                  display={(v) => `${v} hrs`}
                />
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-3 gap-3 max-md:grid-cols-1">
          <StatCard
            label={`Take-home per ${freqLabel} check`}
            value={fmt$(calc.takeHomePer)}
            color={TAKE_HOME}
            delay={0.15}
          />
          <StatCard
            label="Gross per check"
            value={fmt$(calc.grossPer)}
            color="#f1f5f9"
            delay={0.2}
            sub={`${fmt$(calc.grossAnnual)}/yr before anything comes out`}
          />
          <StatCard
            label="Estimated taxes per check"
            value={fmt$(calc.federalPer + calc.ficaPer)}
            color={FEDERAL}
            delay={0.25}
            sub={`~${(calc.effectiveRate * 100).toFixed(1)}% effective rate`}
          />
        </div>

        {/* Donut */}
        <div
          className="mb-4 rounded-card-lg border border-edge bg-card p-5 max-md:p-3"
          style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}
        >
          <div className="mb-1 flex flex-wrap items-center justify-between gap-2 px-1">
            <h3 className="m-0 text-lg font-semibold">Where each paycheck goes</h3>
            <div className="flex gap-4 text-xs text-ink-secondary">
              {donutData.map((d) => (
                <span key={d.name} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
                  {d.name}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={82}
                  outerRadius={110}
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
              <div className="text-xs tracking-wide text-ink-muted uppercase">You keep</div>
              <div className="font-serif text-2xl font-bold tracking-heading" style={{ color: TAKE_HOME }}>
                {calc.grossPer > 0 ? `${((calc.takeHomePer / calc.grossPer) * 100).toFixed(0)}%` : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* What your time is worth */}
        <div
          className="mb-4 rounded-card border p-4"
          style={{
            borderColor: `${ACCENT}33`,
            background: `${ACCENT}0d`,
            animation: "fadeInUp 0.6s ease-out 0.35s both",
          }}
        >
          <div className="mb-1 text-xs font-semibold tracking-wide uppercase" style={{ color: ACCENT }}>
            ⏱️ What your time is worth
          </div>
          <p className="m-0 text-sm leading-relaxed text-ink">
            On paper you earn <span className="font-semibold">{fmtCents(calc.grossHourly)}/hour</span>
            {mode === "salary" && " (assuming a 40-hour week)"}, but after federal tax and FICA your
            true take-home rate is about{" "}
            <span className="font-semibold" style={{ color: ACCENT }}>
              {fmtCents(calc.trueHourly)}/hour
            </span>
            . Next time a $60 impulse buy tempts you, that's roughly{" "}
            {calc.trueHourly > 0 ? `${(60 / calc.trueHourly).toFixed(1)} hours` : "a lot"} of your
            life — price things in hours and spending gets honest fast.
          </p>
        </div>

        {/* Disclaimer */}
        <div
          className="mb-4 rounded-card border border-edge bg-well/50 p-4 text-xs leading-relaxed text-ink-muted"
          style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}
        >
          <span className="font-semibold text-ink-secondary">📌 Educational estimate only.</span>{" "}
          This uses 2026 federal brackets for a single filer taking the standard deduction, plus
          FICA (6.2% Social Security on the first $184,500 of wages and 1.45% Medicare, with an
          extra 0.9% Medicare above $200,000). Real paychecks also reflect state and local taxes,
          401(k) and health-insurance deductions, tax credits, and other adjustments — so yours
          will differ. This is for understanding your paystub, not tax advice.
        </div>

        <MascotCallout emoji="🦭" name="Warren the Walrus" accent={ACCENT} delay={0.45}>
          The first real paycheck is a rite of passage: you do the math on your salary, then the
          deposit lands and it's... less. Nobody stole from you — you've just met withholding.
          Federal income tax comes out in brackets, so only the dollars above each threshold pay
          the higher rate (a raise can never make your take-home shrink, whatever your uncle
          claims). FICA is your Social Security and Medicare contribution — a flat 7.65% of every
          dollar for most earners (the Social Security part stops once your wages pass a yearly cap). The
          number to burn into memory is your take-home, because that's what rent, groceries, and
          your investing plan actually draw from. Budget from take-home, not from salary, and
          you'll never write checks your paycheck can't cash.
        </MascotCallout>
      </div>
    </div>
  );
}
