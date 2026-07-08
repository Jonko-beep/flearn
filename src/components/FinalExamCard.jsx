import { Link } from "react-router-dom";
import { EXAM_SIZE, EXAM_PASS_THRESHOLD } from "../lib/finals.js";

const GOLD = "#f59e0b";

// Distinctive card at the bottom of a category's lesson list. Locked until
// every lesson in the category is mastered; once passed, shows the best score
// and links through to the exam (retakes allowed, certificate stays earned).
export default function FinalExamCard({ category, unlocked, final, index }) {
  const passed = final?.passed;

  const inner = (
    <>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg"
        style={{
          background: unlocked ? `${GOLD}18` : "#0f172a",
        }}
      >
        {unlocked ? "🎓" : "🔒"}
      </div>
      <div className="min-w-0 flex-1">
        <h4
          className={`m-0 mb-0.5 font-sans text-base font-semibold tracking-normal ${
            unlocked ? "text-ink" : "text-ink-muted"
          }`}
        >
          Final Exam{passed ? " — Passed" : ""}
        </h4>
        <p className="m-0 text-sm text-ink-muted">
          {unlocked
            ? `${EXAM_SIZE} questions from every lesson · no feedback until the end`
            : "Master all lessons to unlock"}
        </p>
      </div>
      <span
        className="shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
        style={{
          background: passed ? "#05966915" : `${GOLD}15`,
          color: passed ? "#34d399" : GOLD,
        }}
      >
        {passed
          ? `🎓 ${final.bestScore}%`
          : unlocked
            ? `${EXAM_PASS_THRESHOLD}% to pass`
            : "🔒 Certificate"}
      </span>
    </>
  );

  const baseStyle = {
    border: `1px ${passed ? "solid" : "dashed"} ${GOLD}${unlocked ? "66" : "33"}`,
    animation: `fadeInUp 0.5s ease-out ${0.15 + index * 0.08}s both`,
  };

  if (!unlocked) {
    return (
      <div
        className="flex cursor-not-allowed items-center gap-4 rounded-card bg-card/50 p-5 opacity-50"
        style={baseStyle}
        title="Master all lessons to unlock"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      to={`/learn/${category.id}/final`}
      className="flex items-center gap-4 rounded-card bg-card p-5 transition-all duration-300 hover:-translate-y-px"
      style={baseStyle}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = GOLD)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${GOLD}66`)}
    >
      {inner}
    </Link>
  );
}
