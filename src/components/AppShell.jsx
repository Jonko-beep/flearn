import { Link, NavLink, Outlet } from "react-router-dom";
import {
  GraduationCap,
  Repeat2,
  ChartCandlestick,
  Calculator,
  BookA,
  Compass,
  Flame,
  Sun,
  Moon,
  Settings,
} from "lucide-react";
import { useGamification, levelInfo, displayStreak, XP_PER_LEVEL } from "../lib/gamification.js";
import { useReview, countDue } from "../lib/review.js";
import { useTheme, setTheme } from "../ui/theme.js";
import { Avatar, Logo, Progress, cx } from "../ui/kit.jsx";
import { levelMascot } from "../ui/mascots.jsx";

const NAV = [
  { to: "/learn", label: "Learn", icon: GraduationCap },
  { to: "/review", label: "Review", icon: Repeat2, due: true },
  { to: "/portfolio", label: "Portfolio", icon: ChartCandlestick },
  { to: "/tools", label: "Tools", icon: Calculator },
  { to: "/glossary", label: "Glossary", icon: BookA },
  { to: "/align", label: "Money style", short: "Style", icon: Compass },
];

export function ThemeToggle({ withLabel = false, className }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={cx(
        "inline-flex h-9 items-center gap-2 rounded-lg text-[0.8125rem] font-medium text-ink-muted transition-colors hover:bg-raised hover:text-ink",
        withLabel ? "px-3" : "w-9 justify-center",
        className
      )}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <Icon size={16} strokeWidth={2} aria-hidden />
      {withLabel && <span>{next === "light" ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}

// Level, XP and streak — lives at the foot of the sidebar.
function LevelCard() {
  const { xp, streak } = useGamification();
  const { level, title, intoLevel, pct } = levelInfo(xp.total);
  const fire = displayStreak(streak);
  return (
    <Link to="/learn" className="block rounded-2xl border-2 border-edge bg-card p-3.5 shadow-tile transition-colors hover:border-edge-strong">
      <div className="flex items-center gap-3">
        <Avatar mascot={levelMascot(level)} size={44} />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-accent-ink">Level {level}</div>
          <div className="font-display text-[0.95rem] font-semibold leading-tight text-ink">{title}</div>
        </div>
      </div>
      <Progress value={pct} className="mt-3.5" label="Progress to next level" />
      <div className="num mt-2 flex items-center justify-between text-xs font-bold text-ink-muted">
        <span>
          {intoLevel} / {XP_PER_LEVEL} XP
        </span>
        <span
          className={cx("flex items-center gap-1", fire > 0 ? "text-warn" : "text-ink-muted")}
          title={fire > 0 ? `${fire}-day streak` : "No active streak"}
        >
          <Flame size={14} strokeWidth={2.6} aria-hidden />
          {fire} day{fire === 1 ? "" : "s"}
        </span>
      </div>
    </Link>
  );
}

// Compact version for the phone header.
function LevelChip() {
  const { xp, streak } = useGamification();
  const { level } = levelInfo(xp.total);
  const fire = displayStreak(streak);
  return (
    <div className="num flex items-center gap-2.5 rounded-xl border-2 border-edge bg-card py-1 pl-1 pr-3 font-display text-[0.9rem] font-semibold">
      <Avatar mascot={levelMascot(level)} size={26} />
      <span className="text-ink">Lv {level}</span>
      <span className={cx("flex items-center gap-1", fire > 0 ? "text-warn" : "text-ink-muted")}>
        <Flame size={15} strokeWidth={2.6} aria-hidden />
        {fire}
      </span>
    </div>
  );
}

function DueDot({ count }) {
  if (!count) return null;
  return (
    <span className="num flex h-6 min-w-6 items-center justify-center rounded-full bg-loss px-1.5 font-sans text-xs font-bold text-white">
      {count}
    </span>
  );
}

/** The frame around every screen except the landing page and onboarding. */
export default function AppShell() {
  const dueCount = countDue(useReview());

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[244px_minmax(0,1fr)] print:block">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r-2 border-edge px-4 py-5 lg:flex print:hidden">
        <Logo className="px-2" />
        <nav className="mt-8 flex flex-col gap-1.5" aria-label="Main">
          {NAV.map(({ to, label, icon: Icon, due }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cx(
                  "flex h-12 items-center gap-3 rounded-xl border-2 px-3 font-display text-[1rem] font-semibold transition-colors",
                  isActive
                    ? "border-accent/50 bg-accent/10 text-accent-ink"
                    : "border-transparent text-ink-secondary hover:bg-raised hover:text-ink"
                )
              }
            >
              <Icon size={21} strokeWidth={2.3} aria-hidden />
              <span className="flex-1">{label}</span>
              {due && <DueDot count={dueCount} />}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <LevelCard />
          <div className="flex items-center justify-between">
            <ThemeToggle withLabel className="justify-start" />
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                cx(
                  "inline-flex h-9 items-center gap-2 rounded-lg px-3 text-[0.8125rem] font-medium transition-colors hover:bg-raised hover:text-ink",
                  isActive ? "text-accent-ink" : "text-ink-muted"
                )
              }
            >
              <Settings size={16} strokeWidth={2} aria-hidden />
              Settings
            </NavLink>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Phone / tablet header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b-2 border-edge bg-canvas/90 px-4 backdrop-blur lg:hidden print:hidden">
          <Logo size={26} />
          <div className="flex items-center gap-1">
            <LevelChip />
            <ThemeToggle />
            <NavLink
              to="/settings"
              aria-label="Settings"
              title="Settings"
              className={({ isActive }) =>
                cx(
                  "inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-raised hover:text-ink",
                  isActive ? "text-accent-ink" : "text-ink-muted"
                )
              }
            >
              <Settings size={17} strokeWidth={2} aria-hidden />
            </NavLink>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1120px] px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10 print:p-0">
          <Outlet />
        </main>
      </div>

      {/* Phone / tablet tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t-2 border-edge bg-canvas/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden print:hidden"
        aria-label="Main"
      >
        {NAV.map(({ to, label, short, icon: Icon, due }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cx(
                "relative my-1.5 flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-2xs font-bold",
                isActive ? "bg-accent/10 text-accent-ink" : "text-ink-muted"
              )
            }
          >
            <Icon size={21} strokeWidth={2.3} aria-hidden />
            {short ?? label}
            {due && dueCount > 0 && (
              <span className="absolute right-[calc(50%-20px)] top-1.5 h-2.5 w-2.5 rounded-full bg-loss" />
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
