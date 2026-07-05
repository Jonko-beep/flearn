import { useGamification, levelInfo, displayStreak, XP_PER_LEVEL } from "../lib/gamification.js";

// Persistent gamification badge, fixed top-right on every page.
export default function XpBadge() {
  const { xp, streak } = useGamification();
  const { level, title, intoLevel, pct } = levelInfo(xp.total);
  const fire = displayStreak(streak);

  return (
    <div
      className="fixed top-4 right-4 z-40 flex items-center gap-3 rounded-full border border-edge bg-card/90 px-4 py-2 backdrop-blur-sm"
      title={`${xp.total.toLocaleString()} XP total · ${intoLevel}/${XP_PER_LEVEL} to next level`}
    >
      <span className={`text-sm font-semibold ${fire > 0 ? "text-warning" : "text-ink-muted"}`}>
        🔥 {fire}
      </span>
      <span className="h-4 w-px bg-edge" />
      <div>
        <div className="text-xs font-semibold text-ink leading-tight">
          Lv {level}
          <span className="text-ink-secondary max-sm:hidden"> · {title}</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <div className="h-1 w-16 overflow-hidden rounded-sm bg-well max-sm:w-10">
            <div
              className="h-full rounded-sm transition-all duration-500"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg, #7C3AED, #0D9488)" }}
            />
          </div>
          <span className="text-[0.65rem] text-ink-muted leading-none">
            {xp.total.toLocaleString()} XP
          </span>
        </div>
      </div>
    </div>
  );
}
