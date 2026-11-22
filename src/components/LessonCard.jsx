import { Link } from "react-router-dom";
import { Check, Lock, Play } from "lucide-react";
import { Badge, cx } from "../ui/kit.jsx";
import { masteryBand } from "../ui/mastery.js";

// One stop on a course's lesson trail: a round marker (number, tick, or lock)
// joined to the next stop by a line, then the title and your best score.
export default function LessonCard({ lesson, category, lessonProgress, index, isNext, isLast }) {
  const bestScore = lessonProgress?.bestScore;
  const hasScore = bestScore !== undefined && bestScore !== null;
  const mastered = lessonProgress?.completed;
  const band = masteryBand(hasScore ? bestScore : null);

  const marker = (
    <span
      className={cx(
        "num relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-[1.1rem] font-semibold transition-transform",
        lesson.locked
          ? "border-2 border-edge bg-well text-ink-muted"
          : mastered
            ? "bg-cat text-[#0b111e] shadow-[inset_0_-4px_0_rgb(0_0_0/0.22)]"
            : isNext
              ? "bg-cat text-[#0b111e] shadow-[inset_0_-4px_0_rgb(0_0_0/0.22),0_0_0_5px_rgb(var(--cat)/0.25)]"
              : "border-2 border-cat/50 bg-card text-cat",
        !lesson.locked && "group-hover:scale-105"
      )}
    >
      {lesson.locked ? (
        <Lock size={17} strokeWidth={2.4} aria-hidden />
      ) : mastered ? (
        <Check size={22} strokeWidth={3.2} aria-hidden />
      ) : isNext ? (
        <Play size={18} strokeWidth={2.8} className="ml-0.5 fill-current" aria-hidden />
      ) : (
        index + 1
      )}
    </span>
  );

  const body = (
    <>
      {!isLast && (
        <span
          aria-hidden
          className={cx(
            "absolute left-[2.6rem] top-[3.4rem] h-[calc(100%-2.6rem)] w-1 -translate-x-1/2 rounded-full sm:left-[2.85rem]",
            mastered ? "bg-cat/70" : "bg-edge"
          )}
        />
      )}
      {marker}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2">
          <span className={cx("font-display text-[1.1rem] font-semibold", lesson.locked ? "text-ink-muted" : "text-ink")}>
            {lesson.title}
          </span>
          {isNext && <Badge tone="cat">Up next</Badge>}
        </span>
        <span className="block text-sm text-ink-muted">
          {lesson.subtitle}
          <span className="hidden sm:inline"> · {lesson.duration}</span>
        </span>
      </span>
      <span className="shrink-0">
        {lesson.locked ? (
          <Badge>Coming soon</Badge>
        ) : hasScore ? (
          <Badge tone={band.tone} className="num" title={`Best score — ${band.label}`}>
            {bestScore}%
          </Badge>
        ) : (
          <Badge>{lesson.difficulty}</Badge>
        )}
      </span>
    </>
  );

  const rowClasses = "relative flex items-center gap-4 rounded-2xl px-4 py-3.5 sm:px-5";

  if (lesson.locked) {
    return (
      <div className={cx(rowClasses, "cursor-not-allowed opacity-70")} title="Coming soon">
        {body}
      </div>
    );
  }

  return (
    <Link to={`/learn/${category.id}/${lesson.id}`} className={cx(rowClasses, "group transition-colors hover:bg-raised")}>
      {body}
    </Link>
  );
}
