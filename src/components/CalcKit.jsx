import { useEffect, useState } from "react";

// Shared building blocks for the /tools calculators (compound, debt, mortgage, paycheck).

export function fmt$(n) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export function fmtAxis(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M`;
  if (n >= 1e3) return `$${Math.round(n / 1e3)}k`;
  return `$${Math.round(n)}`;
}

// Tailwind needs full class names in source, so accents map to static strings.
const ACCENT_CLASSES = {
  invest: { focus: "focus:border-invest", range: "accent-invest" },
  save: { focus: "focus:border-save", range: "accent-save" },
  estate: { focus: "focus:border-estate", range: "accent-estate" },
};

export function SliderField({ label, value, min, max, step, onChange, prefix, suffix, display, accent = "invest" }) {
  const accentCls = ACCENT_CLASSES[accent] ?? ACCENT_CLASSES.invest;
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
            className={`w-[110px] rounded-card border border-edge bg-well py-1.5 pr-2 text-right text-sm text-ink outline-none transition-colors ${accentCls.focus} ${prefix ? "pl-7" : "pl-2"} ${suffix ? "pr-8" : ""}`}
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
          className={`h-1.5 w-full cursor-pointer ${accentCls.range}`}
          aria-label={`${label} slider`}
        />
        <span className="w-14 shrink-0 text-right text-xs text-ink-muted">{display(value)}</span>
      </div>
    </div>
  );
}

export function StatCard({ label, value, color, delay, sub }) {
  return (
    <div
      className="rounded-card-lg border bg-card p-5"
      style={{ borderColor: `${color}33`, animation: `fadeInUp 0.6s ease-out ${delay}s both` }}
    >
      <div className="mb-1 text-xs tracking-wide text-ink-muted uppercase">{label}</div>
      <div className="font-serif text-[1.65rem] font-bold tracking-heading" style={{ color }}>
        {value}
      </div>
      {sub && <div className="mt-1 text-xs text-ink-muted">{sub}</div>}
    </div>
  );
}

export function ToolHeader({ emoji, accent, title, tagline }) {
  return (
    <div className="mb-6 animate-fade-in-down">
      <div className="flex items-center gap-3">
        <span
          className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
          style={{ background: `${accent}15` }}
        >
          {emoji}
        </span>
        <div>
          <h2 className="m-0 text-3xl font-bold">{title}</h2>
          <span className="text-sm text-ink-muted">{tagline}</span>
        </div>
      </div>
    </div>
  );
}

export function MascotCallout({ emoji, name, accent, delay = 0.45, children }) {
  return (
    <div
      className="mb-8 flex items-start gap-4 rounded-card px-5 py-4"
      style={{
        background: `linear-gradient(135deg, ${accent}12, ${accent}08)`,
        border: `1px solid ${accent}20`,
        animation: `fadeInUp 0.6s ease-out ${delay}s both`,
      }}
    >
      <span className="text-4xl">{emoji}</span>
      <div>
        <span className="font-serif text-[0.95rem] font-semibold" style={{ color: accent }}>
          {name}
        </span>
        <p className="m-0 mt-1 text-sm leading-relaxed text-ink-secondary">{children}</p>
      </div>
    </div>
  );
}

export function ToggleRow({ options, value, onChange, accent }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="rounded-full border px-4 py-1.5 text-sm font-medium transition-all hover:-translate-y-px"
          style={
            value === opt.value
              ? { borderColor: accent, color: "#fff", background: accent }
              : { borderColor: `${accent}55`, color: accent, background: `${accent}10` }
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
