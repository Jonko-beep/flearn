import { useGamification, levelInfo, displayStreak } from "../lib/gamification.js";

// Gamification stats row for the /learn page.
export default function StatsStrip({ masteredCount }) {
  const { xp, streak } = useGamification();
  const { level, title } = levelInfo(xp.total);
  const fire = displayStreak(streak);

  const tiles = [
    { label: "Total XP", value: `⭐ ${xp.total.toLocaleString()}` },
    { label: `Level ${level}`, value: title },
    { label: "Streak", value: `🔥 ${fire} day${fire === 1 ? "" : "s"}` },
    { label: "Best streak", value: `🏆 ${streak.best}` },
    { label: "Mastered", value: `✓ ${masteredCount}` },
  ];

  return (
    <div
      className="mb-8 grid grid-cols-5 gap-2 max-sm:grid-cols-3"
      style={{ animation: "fadeInDown 0.6s ease-out 0.15s both" }}
    >
      {tiles.map((t) => (
        <div key={t.label} className="rounded-card border border-edge bg-card px-2 py-3 text-center">
          <div className="text-sm font-semibold text-ink whitespace-nowrap">{t.value}</div>
          <div className="mt-0.5 text-[0.68rem] text-ink-muted">{t.label}</div>
        </div>
      ))}
    </div>
  );
}
