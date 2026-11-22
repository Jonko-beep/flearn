import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import { onXpToast } from "../lib/gamification.js";
import { onAchievementToast } from "../lib/achievements.js";
import { achievementIcon } from "../ui/icons.js";

const TOAST_MS = 3000;
const ACHIEVEMENT_TOAST_MS = 4500; // achievements are rarer — let them linger

// Global toast stack: "+100 XP · Lesson mastered" whenever XP lands, plus
// gold-accented achievement toasts when a badge unlocks.
export default function XpToaster() {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  useEffect(() => {
    const push = (toast, ms) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev, { id, ms, ...toast }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), ms + 200);
    };
    const offXp = onXpToast(({ amount, reason }) => push({ kind: "xp", amount, reason }, TOAST_MS));
    const offAchievement = onAchievementToast((achievement) =>
      push({ kind: "achievement", achievement }, ACHIEVEMENT_TOAST_MS)
    );
    return () => {
      offXp();
      offAchievement();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2 lg:bottom-6 lg:right-6 print:hidden"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const isAchievement = t.kind === "achievement";
        const Icon = isAchievement ? achievementIcon(t.achievement.id) : Zap;
        return (
          <div
            key={t.id}
            className={`flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border-2 bg-card py-2.5 pl-2.5 pr-4 shadow-pop ${
              isAchievement ? "border-gold/60" : "border-accent/50"
            }`}
            style={{ animation: `toast ${t.ms}ms ease-out both` }}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                isAchievement
                  ? "bg-gold text-[#3a2a06] shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)]"
                  : "bg-accent text-accent-fg shadow-[inset_0_-3px_0_rgb(0_0_0/0.2)]"
              }`}
            >
              <Icon size={19} strokeWidth={2.5} aria-hidden />
            </span>
            <div className="min-w-0">
              <div className={`text-xs font-bold ${isAchievement ? "text-gold" : "text-accent-ink"}`}>
                {isAchievement ? "Achievement unlocked!" : "Nice!"}
              </div>
              <div className="truncate font-display text-[1rem] font-semibold text-ink">
                {isAchievement ? t.achievement.title : t.reason.replace(/!$/, "")}
              </div>
            </div>
            <span className={`num ml-2 font-display text-[1.05rem] font-bold ${isAchievement ? "text-gold" : "text-accent-ink"}`}>
              +{isAchievement ? t.achievement.xpBonus : t.amount} XP
            </span>
          </div>
        );
      })}
    </div>
  );
}
