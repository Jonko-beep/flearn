import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { markToolUsed } from "../lib/achievements.js";
import {
  fmt$,
  fmtAxis,
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ACCENT = "#D97706"; // Charlie's amber
const PRINCIPAL = "#D97706";
const INTEREST = "#6366F1";
const PMI_ANNUAL_RATE = 0.0075; // ~0.75%/yr of the loan, a typical middle-of-the-road PMI estimate

/**
 * Full mortgage math: P&I payment, PITI breakdown, total interest, and a
 * year-by-year split of each year's payments into principal vs interest.
 * Pure function so it's testable.
 */
export function computeMortgage({ price, downPct, rate, termYears, taxRate, insurance }) {
  const down = (price * downPct) / 100;
  const loan = Math.max(0, price - down);
  const r = rate / 100 / 12;
  const n = termYears * 12;
  const monthlyPI = loan === 0 ? 0 : r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));

  const pmiMonthly = downPct < 20 && loan > 0 ? (loan * PMI_ANNUAL_RATE) / 12 : 0;
  const taxMonthly = (price * taxRate) / 100 / 12;
  const insMonthly = insurance / 12;
  const monthlyTotal = monthlyPI + pmiMonthly + taxMonthly + insMonthly;

  // Amortization, summed per year for the chart.
  const schedule = [];
  let balance = loan;
  let totalInterest = 0;
  let crossoverYear = null; // first year principal outweighs interest
  for (let y = 1; y <= termYears; y++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let m = 0; m < 12 && balance > 0.005; m++) {
      const interest = balance * r;
      const principal = Math.min(monthlyPI - interest, balance);
      yearInterest += interest;
      yearPrincipal += principal;
      balance -= principal;
    }
    totalInterest += yearInterest;
    if (crossoverYear === null && yearPrincipal > yearInterest) crossoverYear = y;
    schedule.push({ year: y, principal: yearPrincipal, interest: yearInterest });
  }

  return {
    down,
    loan,
    monthlyPI,
    pmiMonthly,
    taxMonthly,
    insMonthly,
    monthlyTotal,
    totalInterest,
    schedule,
    crossoverYear,
  };
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const byKey = Object.fromEntries(payload.map((p) => [p.dataKey, p.value]));
  const rows = [
    { name: "Principal", value: byKey.principal ?? 0, color: PRINCIPAL },
    { name: "Interest", value: byKey.interest ?? 0, color: INTEREST },
  ];
  return (
    <div className="rounded-card border border-edge bg-well px-4 py-3 text-sm shadow-xl">
      <div className="mb-1.5 font-semibold text-ink">Year {label} payments</div>
      {rows.map((r) => (
        <div key={r.name} className="flex items-center justify-between gap-6 py-0.5">
          <span className="flex items-center gap-1.5 text-ink-secondary">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: r.color }} />
            {r.name}
          </span>
          <span className="text-ink-secondary">{fmt$(r.value)}</span>
        </div>
      ))}
    </div>
  );
}

function BreakdownRow({ label, value, color, note }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-edge/50 py-2 last:border-b-0">
      <span className="flex items-center gap-2 text-sm text-ink-secondary">
        {color && <span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />}
        {label}
        {note && <span className="text-xs text-ink-muted">{note}</span>}
      </span>
      <span className="text-sm font-semibold text-ink">{fmt$(value)}/mo</span>
    </div>
  );
}

export default function MortgagePage() {
  const [price, setPrice] = useState(350000);
  const [downPct, setDownPct] = useState(10);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [taxRate, setTaxRate] = useState(1.1);
  const [insurance, setInsurance] = useState(1800);

  // The $ input mirrors downPct so both stay synced.
  const [downText, setDownText] = useState("");
  const [downFocused, setDownFocused] = useState(false);
  const downDollars = Math.round((price * downPct) / 100);
  useEffect(() => {
    if (!downFocused) setDownText(String(downDollars));
  }, [downDollars, downFocused]);

  useEffect(() => {
    markToolUsed("mortgage");
  }, []);

  const calc = useMemo(
    () => computeMortgage({ price, downPct, rate, termYears, taxRate, insurance }),
    [price, downPct, rate, termYears, taxRate, insurance]
  );

  const handleDownDollars = (raw) => {
    setDownText(raw);
    const n = parseFloat(raw);
    if (Number.isFinite(n) && price > 0) {
      setDownPct(Math.min(90, Math.max(0, (n / price) * 100)));
    }
  };

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
          emoji="🏠"
          accent={ACCENT}
          title="Mortgage Calculator"
          tagline="What a home really costs per month — and where each payment actually goes."
        />

        {/* Inputs */}
        <div
          className="mb-4 grid grid-cols-2 gap-3 max-md:grid-cols-1"
          style={{ animation: "fadeInUp 0.6s ease-out 0.1s both" }}
        >
          <SliderField
            label="🏠 Home price"
            value={price}
            min={50000}
            max={1500000}
            step={5000}
            onChange={setPrice}
            prefix="$"
            display={fmtAxis}
            accent="estate"
          />
          <div className="rounded-card border border-edge bg-well/50 px-4 py-3.5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-ink">💵 Down payment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  max={price}
                  step={1000}
                  value={downText}
                  onFocus={() => setDownFocused(true)}
                  onBlur={() => {
                    setDownFocused(false);
                    setDownText(String(downDollars));
                  }}
                  onChange={(e) => handleDownDollars(e.target.value)}
                  className="w-[110px] rounded-card border border-edge bg-well py-1.5 pl-7 pr-2 text-right text-sm text-ink outline-none transition-colors focus:border-estate"
                  aria-label="Down payment dollars"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={50}
                step={0.5}
                value={downPct}
                onChange={(e) => setDownPct(parseFloat(e.target.value))}
                className="h-1.5 w-full cursor-pointer accent-estate"
                aria-label="Down payment percent slider"
              />
              <span className="w-14 shrink-0 text-right text-xs text-ink-muted">
                {downPct.toFixed(1)}%
              </span>
            </div>
          </div>
          <SliderField
            label="📊 Interest rate"
            value={rate}
            min={1}
            max={12}
            step={0.125}
            onChange={setRate}
            suffix="%"
            display={(v) => `${v.toFixed(3).replace(/\.?0+$/, "")}%`}
            accent="estate"
          />
          <div className="rounded-card border border-edge bg-well/50 px-4 py-3.5">
            <label className="mb-2.5 block text-sm font-medium text-ink">⏳ Loan term</label>
            <ToggleRow
              accent={ACCENT}
              value={termYears}
              onChange={setTermYears}
              options={[
                { value: 15, label: "15 years" },
                { value: 30, label: "30 years" },
              ]}
            />
          </div>
          <SliderField
            label="🏛️ Property tax rate (optional)"
            value={taxRate}
            min={0}
            max={3}
            step={0.05}
            onChange={setTaxRate}
            suffix="%"
            display={(v) => `${v.toFixed(2)}%/yr`}
            accent="estate"
          />
          <SliderField
            label="🛡️ Home insurance (optional)"
            value={insurance}
            min={0}
            max={6000}
            step={100}
            onChange={setInsurance}
            prefix="$"
            display={(v) => `${fmt$(v)}/yr`}
            accent="estate"
          />
        </div>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-3 gap-3 max-md:grid-cols-1">
          <StatCard
            label="Principal & interest"
            value={`${fmt$(calc.monthlyPI)}/mo`}
            color={ACCENT}
            delay={0.15}
          />
          <StatCard
            label="Full monthly payment"
            value={`${fmt$(calc.monthlyTotal)}/mo`}
            color="#f1f5f9"
            delay={0.2}
            sub="PITI: principal, interest, taxes, insurance"
          />
          <StatCard
            label={`Total interest (${termYears} yrs)`}
            value={fmt$(calc.totalInterest)}
            color={INTEREST}
            delay={0.25}
          />
        </div>

        {/* Payment breakdown */}
        <div
          className="mb-4 rounded-card-lg border border-edge bg-card p-5"
          style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}
        >
          <h3 className="m-0 mb-2 text-lg font-semibold">Monthly payment breakdown</h3>
          <BreakdownRow label="Principal & interest" value={calc.monthlyPI} color={ACCENT} />
          {calc.taxMonthly > 0 && <BreakdownRow label="Property tax" value={calc.taxMonthly} />}
          {calc.insMonthly > 0 && <BreakdownRow label="Home insurance" value={calc.insMonthly} />}
          {calc.pmiMonthly > 0 && (
            <BreakdownRow label="PMI (est.)" value={calc.pmiMonthly} note="~0.75%/yr of the loan" />
          )}
          <div className="mt-2 flex items-center justify-between gap-4 pt-1">
            <span className="text-sm font-semibold text-ink">Total</span>
            <span className="font-serif text-lg font-bold text-ink">{fmt$(calc.monthlyTotal)}/mo</span>
          </div>
        </div>

        {calc.pmiMonthly > 0 && (
          <div
            className="mb-4 rounded-card border p-4 text-sm leading-relaxed text-ink"
            style={{
              borderColor: "#f59e0b55",
              background: "#f59e0b10",
              animation: "fadeInUp 0.6s ease-out 0.35s both",
            }}
          >
            <span className="font-semibold text-warning">Under 20% down:</span> with{" "}
            {downPct.toFixed(1)}% down you'd pay an estimated{" "}
            <span className="font-semibold">{fmt$(calc.pmiMonthly)}/month</span> in private
            mortgage insurance — a fee that protects the lender, not you, until you reach ~22%
            equity.{" "}
            <Link
              to="/learn/real-estate-loans/conventional-loans"
              className="font-semibold underline"
              style={{ color: ACCENT }}
            >
              The Conventional Loans lesson
            </Link>{" "}
            explains how PMI works and when it drops off.
          </div>
        )}

        {/* Amortization chart */}
        <div
          className="mb-4 rounded-card-lg border border-edge bg-card p-5 max-md:p-3"
          style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
            <h3 className="m-0 text-lg font-semibold">Where each year's payments go</h3>
            <div className="flex gap-4 text-xs text-ink-secondary">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: PRINCIPAL }} />
                Principal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: INTEREST }} />
                Interest
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={calc.schedule} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
                dataKey="interest"
                name="Interest"
                stackId="1"
                stroke={INTEREST}
                strokeWidth={2}
                fill={INTEREST}
                fillOpacity={0.3}
                animationDuration={600}
              />
              <Area
                type="monotone"
                dataKey="principal"
                name="Principal"
                stackId="1"
                stroke={PRINCIPAL}
                strokeWidth={2}
                fill={PRINCIPAL}
                fillOpacity={0.35}
                animationDuration={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insight */}
        <div
          className="mb-6 rounded-card border p-4"
          style={{
            borderColor: `${ACCENT}33`,
            background: `${ACCENT}0d`,
            animation: "fadeInUp 0.6s ease-out 0.45s both",
          }}
        >
          <div className="mb-1 text-xs font-semibold tracking-wide uppercase" style={{ color: ACCENT }}>
            💡 Insight
          </div>
          <p className="m-0 text-sm leading-relaxed text-ink">
            {calc.crossoverYear ? (
              <>
                For the first {calc.crossoverYear - 1 || "few"} year
                {calc.crossoverYear - 1 === 1 ? "" : "s"}, most of each payment is interest — rent
                you pay the bank for the loan. Year {calc.crossoverYear} is the crossover: from
                there, the majority of every payment finally builds YOUR equity. On this loan
                you'd pay {fmt$(calc.totalInterest)} of interest on {fmt$(calc.loan)} borrowed.
              </>
            ) : (
              <>
                At this rate and term, interest outweighs principal in every single year's payments
                — you'd pay {fmt$(calc.totalInterest)} of interest on {fmt$(calc.loan)} borrowed.
                Try the 15-year term or a bigger down payment to shift the balance.
              </>
            )}
          </p>
        </div>

        <MascotCallout emoji="🐿️" name="Charlie the Chipmunk" accent={ACCENT} delay={0.5}>
          The sticker price of a house is only the opening bid — the loan's the thing. Two numbers
          on this page matter more than any listing photo: the full PITI payment (can your monthly
          budget really carry it, with room to spare?) and total interest (what the bank earns for
          fronting you the money). Watch what happens when you toggle 30 years down to 15: the
          payment jumps, but the interest bill collapses, because you're renting the money for half
          as long. And that 20% down payment threshold isn't a style choice — it's the line where
          PMI disappears and hundreds of dollars a year stop leaking out of your acorn stash.
          Stretch for it if you reasonably can; walk away from any payment that leaves you
          house-poor if you can't.
        </MascotCallout>
      </div>
    </div>
  );
}
