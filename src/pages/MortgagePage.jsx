import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
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
  ChoiceGrid,
  GroupLabel,
  Insight,
  MascotCallout,
  chart,
} from "../components/CalcKit.jsx";
import { Callout, Card } from "../ui/kit.jsx";

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

function AmortTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const byKey = Object.fromEntries(payload.map((p) => [p.dataKey, p.value]));
  return (
    <ChartTooltip
      title={`Year ${label} payments`}
      rows={[
        { label: "Principal", value: fmt$(byKey.principal ?? 0), color: chart.accent },
        { label: "Interest", value: fmt$(byKey.interest ?? 0), color: chart.second },
      ]}
    />
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

  const parts = [
    { label: "Principal & interest", value: calc.monthlyPI, color: chart.accent },
    { label: "Property tax", value: calc.taxMonthly, color: chart.second },
    { label: "Home insurance", value: calc.insMonthly, color: chart.warn },
    { label: "PMI (est.)", value: calc.pmiMonthly, color: chart.loss, note: "~0.75%/yr of the loan" },
  ].filter((p) => p.value > 0);

  return (
    <div className="animate-enter">
      <ToolHeader
        tool="mortgage"
        hueKey="estate"
        title="Mortgage calculator"
        tagline="What a home really costs per month — and where each payment actually goes."
      />

      <ToolLayout
        controls={
          <>
            <SliderField
              label="Home price"
              value={price}
              min={50000}
              max={1500000}
              step={5000}
              onChange={setPrice}
              prefix="$"
              display={fmtAxis}
            />

            {/* Down payment: type dollars or drag the percentage */}
            <div className="rounded-xl border border-edge bg-card px-4 pb-3 pt-3.5">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="down-dollars" className="text-sm font-medium text-ink-secondary">
                  Down payment
                </label>
                <div className="relative shrink-0">
                  <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-ink-muted">$</span>
                  <input
                    id="down-dollars"
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
                    className="field num h-9 w-[112px] pl-6 pr-2.5 text-right font-semibold"
                  />
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={0.5}
                value={Math.min(50, downPct)}
                onChange={(e) => setDownPct(parseFloat(e.target.value))}
                className="slider mt-2.5"
                style={{ "--pct": `${(Math.min(50, downPct) / 50) * 100}%` }}
                aria-label="Down payment percent slider"
              />
              <div className="num flex justify-between text-2xs text-ink-muted">
                <span>0%</span>
                <span className={downPct < 20 ? "font-semibold text-warn" : "font-semibold text-ink-secondary"}>
                  {downPct.toFixed(1)}% down
                </span>
                <span>50%</span>
              </div>
            </div>

            <SliderField
              label="Interest rate"
              value={rate}
              min={1}
              max={12}
              step={0.125}
              onChange={setRate}
              suffix="%"
              display={(v) => `${v.toFixed(3).replace(/\.?0+$/, "")}%`}
            />

            <Card className="p-4">
              <GroupLabel className="!pt-0">Loan term</GroupLabel>
              <div className="mt-3">
                <ChoiceGrid
                  label="Loan term"
                  value={termYears}
                  onChange={setTermYears}
                  options={[
                    { value: 15, label: "15 years" },
                    { value: 30, label: "30 years" },
                  ]}
                />
              </div>
            </Card>

            <GroupLabel className="mt-2">Optional costs</GroupLabel>
            <SliderField
              label="Property tax rate"
              value={taxRate}
              min={0}
              max={3}
              step={0.05}
              onChange={setTaxRate}
              suffix="%"
              display={(v) => `${v}%`}
              hint="per year"
            />
            <SliderField
              label="Home insurance"
              value={insurance}
              min={0}
              max={6000}
              step={100}
              onChange={setInsurance}
              prefix="$"
              display={(v) => fmt$(v)}
              hint="per year"
            />
          </>
        }
      >
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          <StatCard
            label="Full monthly payment"
            value={`${fmt$(calc.monthlyTotal)}/mo`}
            sub="PITI: principal, interest, taxes, insurance"
          />
          <StatCard label="Principal & interest" value={`${fmt$(calc.monthlyPI)}/mo`} tone="accent" />
          <StatCard label={`Total interest (${termYears} yrs)`} value={fmt$(calc.totalInterest)} tone="chart2" />
        </div>

        {/* Payment breakdown */}
        <Card className="p-4 sm:p-5">
          <h2 className="text-[1.15rem]">Monthly payment breakdown</h2>
          <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-edge" aria-hidden>
            {parts.map((p) => (
              <div
                key={p.label}
                className="h-full border-r-2 border-card last:border-r-0"
                style={{ width: `${(p.value / calc.monthlyTotal) * 100}%`, background: p.color }}
              />
            ))}
          </div>
          <dl className="num mt-3 divide-y divide-edge text-sm">
            {parts.map((p) => (
              <div key={p.label} className="flex items-center justify-between gap-4 py-2.5">
                <dt className="flex flex-wrap items-center gap-x-2 text-ink-secondary">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} />
                  {p.label}
                  {p.note && <span className="text-[0.8125rem] text-ink-muted">{p.note}</span>}
                </dt>
                <dd className="font-semibold text-ink">{fmt$(p.value)}/mo</dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 pt-3">
              <dt className="font-semibold text-ink">Total</dt>
              <dd className="font-display text-[1.25rem] font-semibold text-ink">{fmt$(calc.monthlyTotal)}/mo</dd>
            </div>
          </dl>
        </Card>

        {calc.pmiMonthly > 0 && (
          <Callout tone="warn" icon={TriangleAlert} title="Under 20% down">
            With {downPct.toFixed(1)}% down you&apos;d pay an estimated{" "}
            <span className="num font-semibold text-ink">{fmt$(calc.pmiMonthly)}/month</span> in private mortgage
            insurance — a fee that protects the lender, not you, until you reach ~22% equity.{" "}
            <Link to="/learn/real-estate-loans/conventional-loans" className="font-semibold text-ink underline">
              The Conventional Loans lesson
            </Link>{" "}
            explains how PMI works and when it drops off.
          </Callout>
        )}

        <ChartCard
          title="Where each year's payments go"
          legend={[
            { label: "Principal", color: chart.accent },
            { label: "Interest", color: chart.second },
          ]}
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={calc.schedule} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
              <Tooltip content={<AmortTooltip />} cursor={chart.cursor} />
              <Area
                type="monotone"
                dataKey="interest"
                name="Interest"
                stackId="1"
                stroke={chart.second}
                strokeWidth={2}
                fill={chart.second}
                fillOpacity={0.28}
                animationDuration={600}
              />
              <Area
                type="monotone"
                dataKey="principal"
                name="Principal"
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

        <Insight>
          {calc.crossoverYear === 1 ? (
            <>
              On this loan, principal outweighs interest from the very first year — every payment mostly builds YOUR
              equity instead of renting the bank&apos;s money. You&apos;d pay {fmt$(calc.totalInterest)} of interest
              on {fmt$(calc.loan)} borrowed.
            </>
          ) : calc.crossoverYear ? (
            <>
              For the first {calc.crossoverYear - 1} year{calc.crossoverYear - 1 === 1 ? "" : "s"}, most of each
              payment is interest — rent you pay the bank for the loan. Year {calc.crossoverYear} is the crossover:
              from there, the majority of every payment finally builds YOUR equity. On this loan you&apos;d pay{" "}
              {fmt$(calc.totalInterest)} of interest on {fmt$(calc.loan)} borrowed.
            </>
          ) : (
            <>
              At this rate and term, interest outweighs principal in every single year&apos;s payments — you&apos;d
              pay {fmt$(calc.totalInterest)} of interest on {fmt$(calc.loan)} borrowed. Try the 15-year term or a
              bigger down payment to shift the balance.
            </>
          )}
        </Insight>

        <MascotCallout emoji="🐿️" name="Charlie the Chipmunk" hueKey="estate">
          The sticker price of a house is only the opening bid — the loan&apos;s the thing. Two numbers on this page
          matter more than any listing photo: the full PITI payment (can your monthly budget really carry it, with
          room to spare?) and total interest (what the bank earns for fronting you the money). Watch what happens
          when you toggle 30 years down to 15: the payment jumps, but the interest bill collapses, because
          you&apos;re renting the money for half as long. And that 20% down payment threshold isn&apos;t a style
          choice — it&apos;s the line where PMI disappears and a fee that often runs $100-200 a month stops leaking
          out of your acorn stash. Stretch for it if you reasonably can; walk away from any payment that leaves you
          house-poor if you can&apos;t.
        </MascotCallout>
      </ToolLayout>
    </div>
  );
}
