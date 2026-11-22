// FLearn's small design system: the handful of building blocks every screen
// is assembled from. Keeping them here is what makes the screens look like
// they belong to the same product.

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { hue } from "./theme.js";
import { Mascot, mascotKey } from "./mascots.jsx";

export const cx = (...parts) => parts.filter(Boolean).join(" ");

// ------------------------------------------------------------------ Button
// Buttons are chunky and pressable: a darker lip along the bottom edge that
// flattens when clicked.
const BUTTON_BASE =
  "inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-xl font-display font-semibold tracking-[0.01em] whitespace-nowrap transition-[transform,box-shadow,background-color,filter] duration-75 active:translate-y-[2px] disabled:pointer-events-none disabled:opacity-40";
const BUTTON_SIZES = {
  sm: "h-9 px-3.5 text-[0.875rem]",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[52px] px-6 text-[1.05rem]",
};
const FILLED = "pb-[3px] shadow-[inset_0_-4px_0_rgb(0_0_0/0.25)] active:pb-px active:shadow-[inset_0_-2px_0_rgb(0_0_0/0.25)] hover:brightness-110";
const BUTTON_VARIANTS = {
  primary: cx("bg-accent text-accent-fg", FILLED),
  secondary:
    "border-2 border-edge-strong bg-card text-ink shadow-[0_3px_0_rgb(var(--edge-strong))] hover:bg-raised active:shadow-[0_1px_0_rgb(var(--edge-strong))]",
  ghost: "text-ink-secondary hover:bg-raised hover:text-ink active:translate-y-0",
  danger:
    "border-2 border-loss/50 text-loss shadow-[0_3px_0_rgb(var(--loss)/0.5)] hover:bg-loss/10 active:shadow-[0_1px_0_rgb(var(--loss)/0.5)]",
  gain: cx("bg-gain text-accent-fg", FILLED),
  loss: cx("bg-loss text-accent-fg", FILLED),
};

/** A button, or a link that looks like one when `to` (route) or `href` is given. */
export function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  ...rest
}) {
  const classes = cx(BUTTON_BASE, BUTTON_SIZES[size], BUTTON_VARIANTS[variant], className);
  const iconSize = size === "lg" ? 19 : size === "sm" ? 15 : 17;
  const inner = (
    <>
      {Icon && <Icon size={iconSize} strokeWidth={2.5} aria-hidden />}
      {children}
      {IconRight && <IconRight size={iconSize} strokeWidth={2.5} aria-hidden />}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}

// -------------------------------------------------------------------- Card
/** A surface with a thick sticker-like edge. `flat` drops the bottom lip (for nesting). */
export function Card({ as: Tag = "div", flat, className, children, ...rest }) {
  return (
    <Tag className={cx("rounded-2xl border-2 border-edge bg-card", !flat && "shadow-tile", className)} {...rest}>
      {children}
    </Tag>
  );
}

// ------------------------------------------------------------------- Badge
const BADGE_TONES = {
  neutral: "bg-raised text-ink-secondary",
  accent: "bg-accent/15 text-accent-ink",
  cat: "bg-cat/15 text-cat",
  gain: "bg-gain/15 text-gain",
  loss: "bg-loss/15 text-loss",
  warn: "bg-warn/15 text-warn",
  gold: "bg-gold/15 text-gold",
};

export function Badge({ tone = "neutral", icon: Icon, className, children, ...rest }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold leading-5 whitespace-nowrap",
        BADGE_TONES[tone],
        className
      )}
      {...rest}
    >
      {Icon && <Icon size={12} strokeWidth={2.6} aria-hidden />}
      {children}
    </span>
  );
}

// -------------------------------------------------------------- Page header
export function Crumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-[0.8125rem] print:hidden">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={13} className="text-ink-muted" aria-hidden />}
          {item.to ? (
            <Link to={item.to} className="text-ink-muted transition-colors hover:text-ink">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-secondary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({ crumbs, eyebrow, title, subtitle, actions, children, className }) {
  return (
    <header className={cx("mb-8", className)}>
      {crumbs && <Crumbs items={crumbs} />}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div className="min-w-0">
          {eyebrow && <div className="mb-1 font-display text-[1rem] font-semibold text-cat">{eyebrow}</div>}
          <h1 className="text-[2rem] sm:text-[2.5rem]">{title}</h1>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-[1rem] leading-relaxed text-ink-secondary">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </header>
  );
}

export function SectionTitle({ children, action, className, id }) {
  return (
    <div id={id} className={cx("mb-3 flex items-baseline justify-between gap-4", className)}>
      <h2 className="text-[1.45rem]">{children}</h2>
      {action}
    </div>
  );
}

// -------------------------------------------------------------------- Stat
const STAT_TONES = {
  default: "text-ink",
  accent: "text-accent-ink",
  gain: "text-gain",
  loss: "text-loss",
  warn: "text-warn",
  chart2: "text-chart2",
  muted: "text-ink-secondary",
};

/** A labelled figure. Use inside a Card, or with `boxed` to get its own card. */
export function Stat({ label, value, sub, tone = "default", boxed, size = "md", className }) {
  const body = (
    <>
      <div className="eyebrow">{label}</div>
      <div
        className={cx(
          "num mt-1.5 font-display font-semibold leading-none tracking-tight",
          size === "lg" ? "text-[2.4rem]" : size === "sm" ? "text-[1.2rem]" : "text-[1.6rem]",
          STAT_TONES[tone]
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-1.5 text-[0.8125rem] leading-snug text-ink-muted">{sub}</div>}
    </>
  );
  return boxed ? (
    <Card className={cx("p-4", className)}>{body}</Card>
  ) : (
    <div className={className}>{body}</div>
  );
}

// ---------------------------------------------------------------- Progress
/** A fat, game-style progress bar with a shine along the filled part. */
export function Progress({ value, tone = "accent", size = "md", className, label }) {
  const pct = Math.min(100, Math.max(0, value));
  const fill = { accent: "bg-accent", cat: "bg-cat", gold: "bg-gold", gain: "bg-gain", warn: "bg-warn" }[tone];
  const height = { sm: "h-2", md: "h-3", lg: "h-4" }[size];
  return (
    <div
      className={cx("w-full overflow-hidden rounded-full bg-edge", height, className)}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={cx("relative h-full rounded-full transition-[width] duration-500 ease-out", fill)}
        style={{ width: `${pct}%` }}
      >
        {size !== "sm" && pct > 6 && (
          <span className="absolute inset-x-2 top-[3px] h-[3px] rounded-full bg-white/30" />
        )}
      </div>
    </div>
  );
}

/** Circular progress with whatever you put inside it centred. */
export function Ring({ value, size = 44, stroke = 5, tone = "cat", children, className }) {
  const pct = Math.min(100, Math.max(0, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const strokeClass = { cat: "stroke-cat", accent: "stroke-accent", gain: "stroke-gain", warn: "stroke-warn", gold: "stroke-gold" }[tone];
  return (
    <div className={cx("relative shrink-0", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-edge" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          className={cx(strokeClass, "transition-[stroke-dashoffset] duration-700 ease-out")}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

// ------------------------------------------------------------------ Avatar
// Which course colour each mascot wears.
const MASCOT_HUE = { walrus: "investing", bear: "saving", chipmunk: "estate", fox: "options" };

/**
 * A course mascot in a coloured circle. Takes a mascot id (`mascot`) or one of
 * the emoji faces the content files use (`emoji`); unknown emoji are shown as-is.
 */
export function Avatar({ emoji, mascot, size = 40, hueKey, happy, className }) {
  const key = mascotKey(mascot ?? emoji);
  const style = { width: size, height: size, ...hue(hueKey ?? MASCOT_HUE[key]) };
  if (!key) {
    return (
      <span
        className={cx("flex shrink-0 items-center justify-center rounded-full bg-cat/15 leading-none", className)}
        style={{ ...style, fontSize: size * 0.52 }}
        aria-hidden
      >
        {emoji}
      </span>
    );
  }
  return (
    <span
      className={cx("flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-cat/20", className)}
      style={style}
      aria-hidden
    >
      <Mascot who={key} size={size} happy={happy} />
    </span>
  );
}

/** A rounded tinted tile holding an icon. */
export function IconTile({ icon: Icon, size = 40, hueKey, className }) {
  return (
    <span
      className={cx("flex shrink-0 items-center justify-center rounded-xl bg-cat/15 text-cat", className)}
      style={{ width: size, height: size, ...hue(hueKey) }}
      aria-hidden
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={2.2} />
    </span>
  );
}

// ----------------------------------------------------------------- Callout
const CALLOUT_TONES = {
  accent: "border-accent/30 bg-accent/[0.07]",
  cat: "border-cat/30 bg-cat/[0.07]",
  warn: "border-warn/35 bg-warn/[0.07]",
  gain: "border-gain/35 bg-gain/[0.07]",
  loss: "border-loss/35 bg-loss/[0.07]",
  neutral: "border-edge bg-card",
};
const CALLOUT_ICON = {
  accent: "text-accent-ink",
  cat: "text-cat",
  warn: "text-warn",
  gain: "text-gain",
  loss: "text-loss",
  neutral: "text-ink-muted",
};

export function Callout({ tone = "neutral", icon: Icon, title, children, className, ...rest }) {
  return (
    <div className={cx("flex gap-3 rounded-2xl border-2 p-4", CALLOUT_TONES[tone], className)} {...rest}>
      {Icon && <Icon size={19} strokeWidth={2.3} className={cx("mt-0.5 shrink-0", CALLOUT_ICON[tone])} aria-hidden />}
      <div className="min-w-0 text-sm leading-relaxed text-ink-secondary">
        {title && <div className={cx("mb-1 font-display text-[1rem] font-semibold", CALLOUT_ICON[tone])}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

/**
 * A speech bubble with its speaker beside it. The tail is a rotated square
 * whose fill covers the bubble's border where they meet.
 */
export function SpeechBubble({ children, className, tail = "left", tone = "cat" }) {
  const border = tone === "cat" ? "border-cat/40" : "border-edge";
  return (
    <div className={cx("relative min-w-0 rounded-2xl border-2 bg-card px-4 py-3", border, className)}>
      <span
        aria-hidden
        className={cx(
          "absolute h-3.5 w-3.5 rotate-45 bg-card",
          border,
          tail === "left" && "-left-[9px] top-5 border-b-2 border-l-2",
          tail === "bottom" && "-bottom-[9px] left-8 border-b-2 border-r-2",
          tail === "top" && "-top-[9px] left-[calc(50%-7px)] border-l-2 border-t-2"
        )}
      />
      {children}
    </div>
  );
}

/** A mascot's aside: the mascot, and what they say in a speech bubble. */
export function MascotNote({ emoji, mascot, name, hueKey, children, className }) {
  return (
    <div className={cx("flex items-start gap-3.5", className)} style={hue(hueKey)}>
      <Avatar emoji={emoji} mascot={mascot} hueKey={hueKey} size={56} className="mt-1" />
      <SpeechBubble className="flex-1">
        <div className="font-display text-[0.95rem] font-semibold text-cat">{name}</div>
        <div className="mt-1 text-[0.95rem] leading-relaxed text-ink-secondary">{children}</div>
      </SpeechBubble>
    </div>
  );
}

// --------------------------------------------------------------- Segmented
export function Segmented({ options, value, onChange, className, size = "md", label }) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cx("inline-flex max-w-full flex-wrap gap-1 rounded-xl border-2 border-edge bg-well p-1", className)}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            className={cx(
              "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
              size === "sm" ? "h-8 px-3 text-[0.8125rem]" : "h-9 px-4 text-sm",
              active
                ? "bg-card text-ink shadow-[0_2px_0_rgb(var(--edge-strong))]"
                : "text-ink-muted hover:text-ink"
            )}
          >
            {opt.icon && <opt.icon size={15} strokeWidth={2.4} aria-hidden />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------------- Empty
export function Empty({ icon: Icon, mascot, title, children, action, className }) {
  return (
    <div className={cx("flex flex-col items-center rounded-2xl border-2 border-dashed border-edge-strong px-6 py-10 text-center", className)}>
      {mascot ? (
        <Avatar mascot={mascot} size={88} happy className="mb-4" />
      ) : Icon && (
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-raised text-ink-muted">
          <Icon size={22} strokeWidth={2.2} aria-hidden />
        </span>
      )}
      {title && <div className="font-display text-[1.1rem] font-semibold text-ink">{title}</div>}
      {children && <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-muted">{children}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ---------------------------------------------------------------- Logo mark
export function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="10" className="fill-accent" />
      <rect y="27" width="32" height="5" rx="2.5" fill="rgb(0 0 0 / 0.22)" />
      <path d="M10 21.5v-3.5M16 21.5v-8.5M22 21.5V8" fill="none" strokeWidth="3.6" strokeLinecap="round" className="stroke-accent-fg" />
    </svg>
  );
}

export function Logo({ to = "/", size = 30, className }) {
  return (
    <Link to={to} className={cx("inline-flex items-center gap-2.5", className)} aria-label="FLearn home">
      <LogoMark size={size} />
      <span className="font-display text-[1.45rem] font-bold text-ink">FLearn</span>
    </Link>
  );
}
