import { useEffect, useRef, useState } from "react";
import { onXpToast } from "../lib/gamification.js";

const TOAST_MS = 3000;

// Global toast stack: "+100 XP — Lesson Mastered!" whenever XP lands.
export default function XpToaster() {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  useEffect(
    () =>
      onXpToast(({ amount, reason }) => {
        const id = ++counter.current;
        setToasts((prev) => [...prev, { id, amount, reason }]);
        setTimeout(
          () => setToasts((prev) => prev.filter((t) => t.id !== id)),
          TOAST_MS + 200
        );
      }),
    []
  );

  return (
    <div className="pointer-events-none fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold text-ink shadow-lg whitespace-nowrap"
          style={{
            borderColor: "#7C3AED55",
            boxShadow: "0 8px 32px rgba(124,58,237,0.25)",
            animation: `xpToast ${TOAST_MS}ms ease-out both`,
          }}
        >
          <span>⭐</span>
          <span style={{ color: "#a78bfa" }}>+{t.amount} XP</span>
          <span className="text-ink-secondary">— {t.reason}</span>
        </div>
      ))}
    </div>
  );
}
