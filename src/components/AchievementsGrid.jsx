import { achievements } from "../data/achievements.js";
import { useAchievements } from "../lib/achievements.js";

const GOLD = "#f59e0b";

function earnDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Badge grid for the /learn page: unlocked badges in full color with their
// earn date, locked ones grayed out with the description as a hint.
export default function AchievementsGrid() {
  const unlocks = useAchievements();
  const unlockedCount = achievements.filter((a) => unlocks[a.id]).length;

  return (
    <div className="mb-8" style={{ animation: "fadeInDown 0.6s ease-out 0.2s both" }}>
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="m-0 text-lg font-bold">🏅 Achievements</h3>
        <span className="text-sm font-semibold" style={{ color: GOLD }}>
          {unlockedCount} of {achievements.length}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-2">
        {achievements.map((a, i) => {
          const unlock = unlocks[a.id];
          return (
            <div
              key={a.id}
              className="rounded-card border bg-card px-3 py-4 text-center"
              style={{
                borderColor: unlock ? `${GOLD}55` : "#334155",
                background: unlock ? `${GOLD}0d` : undefined,
                animation: `fadeInUp 0.5s ease-out ${0.25 + i * 0.04}s both`,
              }}
            >
              <div
                className="mb-1.5 text-2xl"
                style={unlock ? undefined : { filter: "grayscale(1)", opacity: 0.35 }}
              >
                {a.emoji}
              </div>
              <div
                className="text-[0.8rem] font-semibold"
                style={{ color: unlock ? GOLD : "#64748b" }}
              >
                {unlock ? a.title : `🔒 ${a.title}`}
              </div>
              <div className="mt-1 text-[0.68rem] leading-snug text-ink-muted">
                {unlock ? `Earned ${earnDate(unlock.date)}` : a.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
