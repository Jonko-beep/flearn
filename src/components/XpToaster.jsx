import { useEffect, useRef, useState } from "react";
import { onXpToast } from "../lib/gamification.js";
import { onAchievementToast } from "../lib/achievements.js";

const TOAST_MS = 3000;
const ACHIEVEMENT_TOAST_MS = 4500; // achievements are rarer — let them linger
const GOLD = "#f59e0b";

// Global toast stack: "+100 XP — Lesson Mastered!" whenever XP lands, plus
// gold-accented achievement toasts when a badge unlocks.
export default function XpToaster() {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  useEffect(() => {
    const push = (toast, ms) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev, { id, ms, ...toast }]);
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        ms + 200
      );
    };
    const offXp = onXpToast(({ amount, reason }) =>
      push({ kind: "xp", amount, reason }, TOAST_MS)
    );
    const offAchievement = onAchievementToast((achievement) =>
      push({ kind: "achievement", achievement }, ACHIEVEMENT_TOAST_MS)
    );
    return () => {
      offXp();
      offAchievement();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 print:hidden">
      {toasts.map((t) =>
        t.kind === "achievement" ? (
          <div
            key={t.id}
            className="flex items-center gap-2.5 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold text-ink shadow-lg whitespace-nowrap"
            style={{
              borderColor: `${GOLD}88`,
              boxShadow: `0 8px 32px ${GOLD}40`,
              animation: `xpToast ${t.ms}ms ease-out both`,
            }}
          >
            <span className="text-lg">{t.achievement.emoji}</span>
            <span
              className="text-[0.65rem] font-bold uppercase tracking-wider"
              style={{ color: GOLD }}
            >
              Achievement
            </span>
            <span>{t.achievement.title}</span>
            <span className="text-ink-muted">+{t.achievement.xpBonus} XP</span>
          </div>
        ) : (
          <div
            key={t.id}
            className="flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold text-ink shadow-lg whitespace-nowrap"
            style={{
              borderColor: "#7C3AED55",
              boxShadow: "0 8px 32px rgba(124,58,237,0.25)",
              animation: `xpToast ${t.ms}ms ease-out both`,
            }}
          >
            <span>⭐</span>
            <span style={{ color: "#a78bfa" }}>+{t.amount} XP</span>
            <span className="text-ink-secondary">— {t.reason}</span>
          </div>
        )
      )}
    </div>
  );
}
