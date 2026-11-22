import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Callout, Card, Crumbs, IconTile, MascotNote, Segmented, Stat, cx } from "../ui/kit.jsx";
import { color, hue } from "../ui/theme.js";
import { TOOL_ICONS } from "../ui/icons.js";

// Shared building blocks for the /tools calculators (compound, debt, mortgage,
// paycheck, options) and for the portfolio chart.

export function fmt$(n) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export function fmtAxis(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M`;
  if (n >= 1e3) return `$${Math.round(n / 1e3)}k`;
  return `$${Math.round(n)}`;
}

/** A number you can type or drag: text box on the right, slider underneath. */
export function SliderField({ label, value, min, max, step, onChange, prefix, suffix, display, hint }) {
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
  const pct = max > min ? ((clamp(value) - min) / (max - min)) * 100 : 0;

  return (
    <div className="rounded-xl border border-edge bg-card px-4 pb-3 pt-3.5">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ink-secondary">{label}</label>
        <div className="relative shrink-0">
          {prefix && (
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
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
            className={cx(
              "field num h-9 w-[112px] text-right font-semibold",
              prefix ? "pl-6" : "pl-2",
              suffix ? "pr-7" : "pr-2.5"
            )}
            aria-label={`${label} value`}
          />
          {suffix && (
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
              {suffix}
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(clamp(parseFloat(e.target.value)))}
        className="slider mt-2.5"
        style={{ "--pct": `${pct}%` }}
        aria-label={`${label} slider`}
      />
      <div className="num flex justify-between text-2xs text-ink-muted">
        <span>{display(min)}</span>
        {hint && <span>{hint}</span>}
        <span>{display(max)}</span>
      </div>
    </div>
  );
}

/** A headline figure in its own card. `tone` colours the number. */
export function StatCard({ label, value, tone, sub, className }) {
  return <Stat boxed label={label} value={value} tone={tone} sub={sub} className={cx("p-5", className)} />;
}

/** Breadcrumb, icon, title and one-line description for a tool page. */
export function ToolHeader({ tool, title, tagline, hueKey }) {
  return (
    <div style={hue(hueKey)}>
      <Crumbs items={[{ label: "Tools", to: "/tools" }, { label: title }]} />
      <header className="mb-8 flex flex-wrap items-start gap-4">
        <IconTile icon={TOOL_ICONS[tool]} size={52} />
        <div className="min-w-0 flex-1 basis-72">
          <h1 className="text-[1.9rem] sm:text-[2.2rem]">{title}</h1>
          <p className="mt-1.5 max-w-2xl leading-relaxed text-ink-secondary">{tagline}</p>
        </div>
      </header>
    </div>
  );
}

export function MascotCallout({ emoji, name, hueKey, children, className }) {
  return (
    <MascotNote emoji={emoji} name={name} hueKey={hueKey} className={className}>
      {children}
    </MascotNote>
  );
}

export function ToggleRow({ options, value, onChange, label }) {
  return <Segmented options={options} value={value} onChange={onChange} label={label} />;
}

/** The standard tool layout: inputs in a narrow left column, results beside them. */
export function ToolLayout({ controls, children }) {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-3">{controls}</div>
      <div className="flex min-w-0 flex-col gap-5">{children}</div>
    </div>
  );
}

/** A titled card for a chart, with an optional legend on the right and a note below. */
export function ChartCard({ title, legend, note, children, className }) {
  return (
    <Card className={cx("p-4 sm:p-5", className)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2 className="text-[1.15rem]">{title}</h2>
        {legend && <ChartLegend items={legend} />}
      </div>
      {children}
      {note && <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-muted">{note}</p>}
    </Card>
  );
}

/** The one-sentence takeaway under a chart. */
export function Insight({ children, title = "Insight", icon = Lightbulb, className }) {
  return (
    <Callout tone="accent" icon={icon} title={title} className={className}>
      <span className="text-ink">{children}</span>
    </Callout>
  );
}

/** A few mutually exclusive choices laid out as equal buttons in a grid. */
export function ChoiceGrid({ options, value, onChange, columns = 2, label }) {
  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      role="radiogroup"
      aria-label={label}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cx(
              "h-9 rounded-lg border px-2 text-[0.8125rem] font-semibold transition-colors",
              active
                ? "border-accent bg-accent text-accent-fg"
                : "border-edge-strong text-ink-secondary hover:bg-raised hover:text-ink"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/** Small label above a group of inputs. */
export function GroupLabel({ children, className }) {
  return <div className={cx("eyebrow px-0.5 pt-1", className)}>{children}</div>;
}

// ------------------------------------------------------------------ charts
// One look for every recharts chart, so they all follow the theme.
export const chart = {
  accent: color("accent"),
  second: color("chart-2"),
  gain: color("gain"),
  loss: color("loss"),
  warn: color("warn"),
  muted: color("ink-3"),
  grid: color("edge"),
  axis: color("edge-strong"),
  tick: { fill: color("ink-3"), fontSize: 12 },
  cursor: { stroke: color("ink-3"), strokeDasharray: "4 4" },
};

export function ChartLegend({ items, className }) {
  return (
    <div className={cx("flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-ink-secondary", className)}>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

/** Tooltip body: a title, then one row per series. Pass `rows` to override. */
export function ChartTooltip({ title, rows, footer }) {
  return (
    <div className="num rounded-lg border border-edge-strong bg-raised px-3.5 py-2.5 text-[0.8125rem] shadow-pop">
      {title && <div className="mb-1.5 font-semibold text-ink">{title}</div>}
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-6 py-0.5">
          <span className="flex items-center gap-1.5 text-ink-secondary">
            {row.color && <span className="h-2.5 w-2.5 rounded-sm" style={{ background: row.color }} />}
            {row.label}
          </span>
          <span className={cx("font-medium", row.strong ? "text-ink" : "text-ink-secondary")}>{row.value}</span>
        </div>
      ))}
      {footer && <div className="mt-1.5 border-t border-edge pt-1.5 text-ink-muted">{footer}</div>}
    </div>
  );
}
