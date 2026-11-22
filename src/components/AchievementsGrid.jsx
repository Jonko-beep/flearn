import { Lock } from "lucide-react";
import { achievements } from "../data/achievements.js";
import { useAchievements } from "../lib/achievements.js";
import { achievementIcon } from "../ui/icons.js";
import { mascotKey } from "../ui/mascots.jsx";
import { Avatar, SectionTitle, cx } from "../ui/kit.jsx";

function earnDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// A medal for each achievement: gold when earned (course graduations wear
// that course's mascot), grey with a lock and the how-to-earn hint otherwise.
function Medal({ achievement, unlock }) {
  const Icon = achievementIcon(achievement.id);
  const mascot = mascotKey(achievement.emoji);
  return (
    <div className="flex flex-col items-center text-center" title={achievement.description}>
      <span
        className={cx(
          "relative flex h-[68px] w-[68px] items-center justify-center rounded-full",
          unlock
            ? "bg-gold text-[#3a2a06] shadow-[inset_0_-5px_0_rgb(0_0_0/0.2),0_0_0_4px_rgb(var(--gold)/0.25)]"
            : "border-2 border-dashed border-edge-strong bg-well text-ink-muted"
        )}
      >
        {unlock ? (
          mascot ? (
            <Avatar mascot={mascot} size={54} happy className="!bg-white/30" />
          ) : (
            <Icon size={28} strokeWidth={2.4} aria-hidden />
          )
        ) : (
          <Lock size={20} strokeWidth={2.4} aria-hidden />
        )}
      </span>
      <div className={cx("mt-2.5 text-sm font-bold leading-tight", unlock ? "text-ink" : "text-ink-secondary")}>
        {achievement.title}
      </div>
      <div className="mt-0.5 text-xs leading-snug text-ink-muted">
        {unlock ? `Earned ${earnDate(unlock.date)}` : achievement.description}
      </div>
    </div>
  );
}

export default function AchievementsGrid() {
  const unlocks = useAchievements();
  const unlockedCount = achievements.filter((a) => unlocks[a.id]).length;
  // earned medals first, so the shelf shows off what you have
  const ordered = [...achievements].sort((a, b) => Boolean(unlocks[b.id]) - Boolean(unlocks[a.id]));

  return (
    <section>
      <SectionTitle
        action={
          <span className="num text-sm font-bold text-ink-muted">
            <span className="text-gold">{unlockedCount}</span> of {achievements.length} earned
          </span>
        }
      >
        Achievements
      </SectionTitle>
      <div className="grid grid-cols-2 gap-x-4 gap-y-7 rounded-2xl border-2 border-edge bg-card p-6 shadow-tile sm:grid-cols-4 xl:grid-cols-5">
        {ordered.map((a) => (
          <Medal key={a.id} achievement={a} unlock={unlocks[a.id]} />
        ))}
      </div>
    </section>
  );
}
