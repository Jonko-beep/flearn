import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fmtMoney, fmtPct } from "../lib/format.js";
import { MascotCallout } from "./CalcKit.jsx";

const YOU = "#0D9488";
const MARKET = "#8B5CF6";

function fmtDay(ts) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Portfolio values cluster in a narrow band around $10k, so whole-thousand
// ticks (CalcKit's fmtAxis) collapse into duplicate labels — keep a decimal.
function fmtValueAxis(n) {
  if (Math.abs(n) < 1000) return `$${Math.round(n)}`;
  return `$${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-card border border-edge bg-well px-4 py-3 text-sm shadow-xl">
      <div className="mb-1.5 font-semibold text-ink">{fmtDay(label)}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-6 py-0.5">
          <span className="flex items-center gap-1.5 text-ink-secondary">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.stroke }} />
            {p.name}
          </span>
          <span className="text-ink-secondary">{fmtMoney(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function ReturnBlock({ label, color, returnPct, value }) {
  return (
    <div className="flex-1 rounded-card border border-edge bg-well/50 px-4 py-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs tracking-wide text-ink-muted uppercase">
        <span className="h-2.5 w-2.5 rounded-sm" style={{ background: color }} />
        {label}
      </div>
      <div className="font-serif text-2xl font-bold tracking-heading text-ink">
        {fmtPct(returnPct)}
      </div>
      <div className="mt-0.5 text-xs text-ink-muted">{fmtMoney(value)}</div>
    </div>
  );
}

/**
 * "You vs. the Market" — the user's real return next to what the same cash
 * flows would have earned buying VOO, with a dual-line value chart.
 * `benchmark` comes from computeBenchmark(); render nothing until it exists.
 */
export default function BenchmarkCard({ benchmark }) {
  if (!benchmark) return null;
  const { you, market, diffPct, series } = benchmark;
  const even = Math.abs(diffPct) < 0.005;
  const ahead = !even && diffPct > 0;

  return (
    <section className="mb-6" style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}>
      <div
        className="rounded-card-lg border bg-card p-6 max-md:p-4"
        style={{ borderColor: ahead ? "#05966955" : "#33415588" }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="m-0 text-xl font-semibold">You vs. the Market</h3>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={
              ahead
                ? { background: "#05966922", color: "#34d399" }
                : { background: "#33415566", color: "#94a3b8" }
            }
          >
            {even
              ? "even with the index"
              : `${fmtPct(Math.abs(diffPct), { sign: false })} ${ahead ? "ahead of the index" : "behind the index"}`}
          </span>
        </div>

        <div className="mb-5 flex flex-wrap gap-3">
          <ReturnBlock label="Your portfolio" color={YOU} returnPct={you.returnPct} value={you.value} />
          <ReturnBlock
            label="Same money in VOO"
            color={MARKET}
            returnPct={market.returnPct}
            value={market.value}
          />
        </div>

        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
          <span className="text-sm text-ink-secondary">
            Portfolio value since your first trade
          </span>
          <div className="flex gap-4 text-xs text-ink-secondary">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: YOU }} />
              You
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: MARKET }} />
              VOO strategy
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#334155" strokeOpacity={0.4} vertical={false} />
            <XAxis
              dataKey="ts"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
              interval="preserveStartEnd"
              tickFormatter={fmtDay}
              minTickGap={40}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickFormatter={fmtValueAxis}
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
              dataKey="you"
              name="You"
              stroke={YOU}
              strokeWidth={2}
              dot={false}
              animationDuration={600}
            />
            <Line
              type="monotone"
              dataKey="market"
              name="VOO strategy"
              stroke={MARKET}
              strokeWidth={2}
              dot={false}
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* MascotCallout carries mb-8 for standalone use; pull it back inside the card */}
        <div className="mt-4 -mb-4">
          <MascotCallout emoji="🦭" name="Warren the Walrus" accent={YOU} delay={0.25}>
            {even ? (
              <>
                You and the index are neck and neck. This chart is the most honest scorecard
                in investing: it shows what your choices earned versus what simply buying the
                whole market would have. Check back as time passes — the gap, whichever way
                it opens, is the real lesson.
              </>
            ) : ahead ? (
              <>
                You're beating the index — nice work! One honest note from an old walrus:
                short-term outperformance is often luck, and even the pros can't tell which
                until years have passed. The real test is measured in years, not weeks. Keep
                doing what you're doing, but don't be surprised if the index catches up.
              </>
            ) : (
              <>
                Trailing the index puts you in very good company — most professional
                investors, with all their research teams, also fail to beat it over time.
                That's exactly why index funds are the default recommendation for beginners:
                you get the market's whole return without having to out-guess it. This is
                the lesson working, not you failing.
              </>
            )}
          </MascotCallout>
        </div>
      </div>
    </section>
  );
}
