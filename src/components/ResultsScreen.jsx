import { Link } from "react-router-dom";
import { MASTERY_THRESHOLD } from "../data/curriculum.js";

export default function ResultsScreen({
  quiz,
  answers,
  category,
  nextLesson,
  onRetake,
  onReview,
}) {
  const total = quiz.length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const mastered = score >= MASTERY_THRESHOLD;

  return (
    <div className="animate-fade-in-up text-center">
      {/* Score ring */}
      <div
        className="mx-auto mb-6 mt-4 flex h-40 w-40 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(${mastered ? "#059669" : "#f59e0b"} ${
            score * 3.6
          }deg, #1e293b ${score * 3.6}deg)`,
        }}
      >
        <div className="flex h-[130px] w-[130px] flex-col items-center justify-center rounded-full bg-night-mid">
          <span className="font-serif text-4xl font-bold">{score}%</span>
          <span className="text-sm text-ink-secondary">
            {correctCount}/{total} correct
          </span>
        </div>
      </div>

      {/* Mastery banner */}
      <div
        className="mb-6 rounded-card p-5"
        style={{
          background: mastered ? "#05966915" : "#f59e0b15",
          border: `1px solid ${mastered ? "#05966933" : "#f59e0b33"}`,
        }}
      >
        <div className="mb-2 text-3xl">{mastered ? "🎉" : "📚"}</div>
        <h3
          className="m-0 mb-2 text-xl"
          style={{ color: mastered ? "#34d399" : "#fbbf24" }}
        >
          {mastered ? "Lesson Mastered!" : "Keep Learning!"}
        </h3>
        <p className="m-0 text-sm leading-normal text-ink-secondary">
          {mastered
            ? `You scored ${score}% — at or above the ${MASTERY_THRESHOLD}% mastery threshold. This lesson is now complete!`
            : `You scored ${score}%, but you need at least ${MASTERY_THRESHOLD}% to master this lesson. Review the video and transcript, then try again.`}
        </p>
      </div>

      {/* Answer review */}
      <div className="mb-6 text-left">
        <h4 className="m-0 mb-3 font-sans text-[0.95rem] tracking-normal text-ink-secondary">
          Answer Review
        </h4>
        {quiz.map((q, i) => {
          const answer = answers[i];
          return (
            <div
              key={i}
              className="mb-2 flex items-start gap-3 rounded-[10px] border border-edge bg-card px-4 py-3"
            >
              <span
                className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: answer?.correct ? "#059669" : "#dc2626" }}
              >
                {answer?.correct ? "✓" : "✗"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 mb-1 text-sm leading-snug text-slate-200">{q.question}</p>
                {!answer?.correct && (
                  <p className="m-0 text-[0.8rem] text-ink-muted">
                    Correct answer: {q.options[q.correct]}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        {!mastered && (
          <button
            onClick={onReview}
            className="cursor-pointer rounded-full border border-edge bg-transparent px-6 py-3 text-sm font-medium text-slate-200"
          >
            📹 Review Lesson
          </button>
        )}
        <button
          onClick={onRetake}
          className="cursor-pointer rounded-full border-none px-6 py-3 text-sm font-semibold"
          style={
            mastered
              ? { background: "#1e293b", color: category.color }
              : {
                  background: `linear-gradient(135deg, ${category.color}, ${category.color}cc)`,
                  color: "white",
                  boxShadow: `0 4px 20px ${category.color}30`,
                }
          }
        >
          {mastered ? "Retake Quiz" : "Try Again →"}
        </button>
        {mastered &&
          (nextLesson ? (
            <Link
              to={`/learn/${category.id}/${nextLesson.id}`}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #059669, #059669cc)",
                boxShadow: "0 4px 20px #05966930",
              }}
            >
              Next Lesson →
            </Link>
          ) : (
            <Link
              to={`/learn/${category.id}`}
              className="rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #059669, #059669cc)",
                boxShadow: "0 4px 20px #05966930",
              }}
            >
              Back to {category.title} →
            </Link>
          ))}
      </div>
    </div>
  );
}
