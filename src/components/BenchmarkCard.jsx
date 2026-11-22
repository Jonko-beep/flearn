import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fmtMoney, fmtPct } from "../lib/format.js";
import { Badge, Card, MascotNote } from "../ui/kit.jsx";
import { chart, ChartLegend, ChartTooltip } from "./CalcKit.jsx";

function fmtDay(ts) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Portfolio values cluster in a narrow band around $10k, so whole-thousand
// ticks (CalcKit's fmtAxis) collapse into duplicate labels — keep a decimal.
function fmtValueAxis(n) {
  if (Math.abs(n) < 1000) return `$${Math.round(n)}`;
  return `$${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

function BenchmarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <ChartTooltip
      title={fmtDay(label)}
      rows={payload.map((p) => ({ label: p.name, color: p.stroke, value: fmtMoney(p.value) }))}
    />
  );
}

function ReturnBlock({ label, swatch, returnPct, value }) {
  return (
    <div className="flex-1 basis-40 px-5 py-4">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-sm" style={{ background: swatch }} />
        <span className="eyebrow">{label}</span>
      </div>
      <div className="num mt-1.5 font-display text-[1.6rem] font-semibold leading-none tracking-tight">
        {fmtPct(returnPct)}
      </div>
      <div className="num mt-1.5 text-[0.8125rem] text-ink-muted">{fmtMoney(value)}</div>
    </div>
  );
}

/**
 * "You vs. the market" — the user's real return next to what the same cash
 * flows would have earned buying VOO, with a dual-line value chart.
 * `benchmark` comes from computeBenchmark(); render nothing until it exists.
 */
export default function BenchmarkCard({ benchmark }) {
  if (!benchmark) return null;
  const { you, market, diffPct, series } = benchmark;
  const even = Math.abs(diffPct) < 0.005;
  const ahead = !even && diffPct > 0;

  return (
    <Card as="section" className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-5">
        <h2 className="text-[1.25rem]">You vs. the market</h2>
        <Badge tone={ahead ? "gain" : "neutral"} className="num">
          {even
            ? "Even with the index"
            : `${fmtPct(Math.abs(diffPct), { sign: false })} ${ahead ? "ahead of the index" : "behind the index"}`}
        </Badge>
      </div>

      <div className="mt-2 flex flex-wrap divide-x divide-edge border-b border-edge">
        <ReturnBlock label="Your portfolio" swatch={chart.accent} returnPct={you.returnPct} value={you.value} />
        <ReturnBlock label="Same money in VOO" swatch={chart.second} returnPct={market.returnPct} value={market.value} />
      </div>

      <div className="px-5 pt-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-ink-secondary">Portfolio value since your first trade</span>
          <ChartLegend
            items={[
              { label: "You", color: chart.accent },
              { label: "VOO strategy", color: chart.second },
            ]}
          />
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={chart.grid} vertical={false} />
            <XAxis
              dataKey="ts"
              tick={chart.tick}
              tickLine={false}
              axisLine={{ stroke: chart.axis }}
              interval="preserveStartEnd"
              tickFormatter={fmtDay}
              minTickGap={40}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={fmtValueAxis}
              tick={chart.tick}
              tickLine={false}
              axisLine={false}
              width={54}
            />
            <Tooltip content={<BenchmarkTooltip />} cursor={chart.cursor} />
            <Line type="monotone" dataKey="you" name="You" stroke={chart.accent} strokeWidth={2} dot={false} animationDuration={600} />
            <Line
              type="monotone"
              dataKey="market"
              name="VOO strategy"
              stroke={chart.second}
              strokeWidth={2}
              dot={false}
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-5">
        <MascotNote emoji="🦭" name="Warren the Walrus" hueKey="investing" className="bg-raised">
          {even ? (
            <>
              You and the index are neck and neck. This chart is the most honest scorecard in investing: it shows
              what your choices earned versus what simply buying the whole market would have. Check back as time
              passes — the gap, whichever way it opens, is the real lesson.
            </>
          ) : ahead ? (
            <>
              You&apos;re beating the index — nice work! One honest note from an old walrus: short-term
              outperformance is often luck, and even the pros can&apos;t tell which until years have passed. The
              real test is measured in years, not weeks. Keep doing what you&apos;re doing, but don&apos;t be
              surprised if the index catches up.
            </>
          ) : (
            <>
              Trailing the index puts you in very good company — most professional investors, with all their
              research teams, also fail to beat it over time. That&apos;s exactly why index funds are the default
              recommendation for beginners: you get the market&apos;s whole return without having to out-guess it.
              This is the lesson working, not you failing.
            </>
          )}
        </MascotNote>
      </div>
    </Card>
  );
}
