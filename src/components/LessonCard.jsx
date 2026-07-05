import { Link } from "react-router-dom";
import { getMasteryInfo } from "../data/curriculum.js";

export default function LessonCard({ lesson, category, lessonProgress, index }) {
  const bestScore = lessonProgress?.bestScore;
  const hasScore = bestScore !== undefined && bestScore !== null;
  const mastered = lessonProgress?.completed;
  const mastery = getMasteryInfo(hasScore ? bestScore : null);

  const inner = (
    <>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold"
        style={{
          fontSize: mastered ? "1rem" : "0.85rem",
          background: mastered
            ? category.color
            : lesson.locked
              ? "#0f172a"
              : `${category.color}15`,
          color: mastered ? "white" : lesson.locked ? "#475569" : category.color,
        }}
      >
        {lesson.locked ? "🔒" : mastered ? "✓" : index + 1}
      </div>
      <div className="min-w-0 flex-1">
        <h4
          className={`m-0 mb-0.5 font-sans text-base font-semibold tracking-normal ${
            lesson.locked ? "text-ink-muted" : "text-ink"
          }`}
        >
          {lesson.title}
        </h4>
        <p className="m-0 text-sm text-ink-muted">{lesson.subtitle}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-xs text-ink-muted">{lesson.duration}</span>
        {!lesson.locked && hasScore ? (
          <span
            className="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
            style={{ background: mastery.bg, color: mastery.color }}
          >
            {mastery.icon} {bestScore}%
          </span>
        ) : (
          <span
            className="rounded-full px-2 py-0.5 text-[0.7rem]"
            style={{
              background: lesson.difficulty === "Beginner" ? "#0D948815" : "#7C3AED15",
              color: lesson.difficulty === "Beginner" ? "#0D9488" : "#7C3AED",
            }}
          >
            {lesson.locked ? "🔒 " : ""}
            {lesson.difficulty}
          </span>
        )}
      </div>
    </>
  );

  const baseStyle = {
    border: mastered ? `1px solid ${category.color}44` : "1px solid #334155",
    animation: `fadeInUp 0.5s ease-out ${0.15 + index * 0.08}s both`,
  };

  if (lesson.locked) {
    return (
      <div
        className="flex cursor-not-allowed items-center gap-4 rounded-card bg-card/50 p-5 opacity-50"
        style={baseStyle}
        title="Coming soon"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      to={`/learn/${category.id}/${lesson.id}`}
      className="flex items-center gap-4 rounded-card bg-card p-5 transition-all duration-300 hover:-translate-y-px"
      style={baseStyle}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${category.color}44`)}
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = mastered ? `${category.color}44` : "#334155")
      }
    >
      {inner}
    </Link>
  );
}
