import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Quiz from "../components/Quiz.jsx";
import {
  buildReviewSession,
  recordReviewAnswer,
  awardReviewXp,
  countDue,
  nextDueDate,
  useReview,
  REVIEW_XP_PER_CORRECT,
  REVIEW_XP_DAILY_CAP,
} from "../lib/review.js";
import { recordAction } from "../lib/gamification.js";

const REVIEW_COLOR = "#3B82F6";

function formatDueDate(dateString) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Turn a review session (from buildReviewSession) into Quiz-shaped questions
// tagged with their source lesson.
function toQuizQuestions(session) {
  return session.map(({ question, lesson, category }) => ({
    ...question,
    tag: `${category.mascot.emoji} ${lesson.title}`,
    tagColor: category.color,
    lessonId: lesson.id,
  }));
}

function EmptyState({ review }) {
  const upcoming = nextDueDate(review);
  return (
    <div className="animate-fade-in-up rounded-card-lg border border-edge bg-card p-12 text-center">
      <div className="mb-4 text-5xl">{upcoming ? "🎉" : "🧠"}</div>
      <h2 className="m-0 mb-2 text-2xl">
        {upcoming ? "All caught up!" : "Nothing to review yet"}
      </h2>
      <p className="mx-auto mb-6 mt-0 max-w-[400px] text-sm leading-relaxed text-ink-secondary">
        {upcoming
          ? `No questions are due today. Your next review unlocks on ${formatDueDate(
              upcoming
            )} — spacing it out is what makes it stick.`
          : "Miss a quiz question and it'll resurface here on a spaced schedule until you've truly got it. Never-missed questions stay out of your way."}
      </p>
      <Link
        to="/learn"
        className="inline-block rounded-full px-6 py-3 text-sm font-semibold text-white"
        style={{ background: REVIEW_COLOR }}
      >
        {upcoming ? "Back to learning" : "Go take a quiz →"}
      </Link>
    </div>
  );
}

// End-of-session summary: score, XP earned (with the daily cap called out when
// hit), and how each question's interval moved.
function SessionSummary({ results, xpEarned, moreDue, onAgain }) {
  const total = results.length;
  const correctCount = results.filter((r) => r.correct).length;

  return (
    <div className="animate-fade-in-up text-center">
      <div
        className="mx-auto mb-6 mt-4 flex h-40 w-40 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(${REVIEW_COLOR} ${
            (correctCount / total) * 360
          }deg, #1e293b ${(correctCount / total) * 360}deg)`,
        }}
      >
        <div className="flex h-[130px] w-[130px] flex-col items-center justify-center rounded-full bg-night-mid">
          <span className="font-serif text-4xl font-bold">
            {correctCount}/{total}
          </span>
          <span className="text-sm text-ink-secondary">correct</span>
        </div>
      </div>

      <div
        className="mb-6 rounded-card p-5"
        style={{ background: `${REVIEW_COLOR}15`, border: `1px solid ${REVIEW_COLOR}33` }}
      >
        <div className="mb-2 text-3xl">🧠</div>
        <h3 className="m-0 mb-2 text-xl" style={{ color: "#60a5fa" }}>
          Session complete!
        </h3>
        <p className="m-0 text-sm leading-normal text-ink-secondary">
          {xpEarned > 0
            ? `+${xpEarned} XP earned (${REVIEW_XP_PER_CORRECT} per correct answer).`
            : `You've hit today's ${REVIEW_XP_DAILY_CAP} XP review cap — the reps still count!`}{" "}
          Questions you got right won't come back for a while; misses return tomorrow.
        </p>
      </div>

      <div className="mb-6 text-left">
        <h4 className="m-0 mb-3 font-sans text-[0.95rem] tracking-normal text-ink-secondary">
          Interval changes
        </h4>
        {results.map((r, i) => (
          <div
            key={i}
            className="mb-2 flex items-start gap-3 rounded-[10px] border border-edge bg-card px-4 py-3"
          >
            <span
              className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: r.correct ? "#059669" : "#dc2626" }}
            >
              {r.correct ? "✓" : "✗"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="m-0 mb-1 text-sm leading-snug text-slate-200">{r.question}</p>
              <p
                className="m-0 text-[0.8rem] font-medium"
                style={{ color: r.correct ? "#34d399" : "#f87171" }}
              >
                {r.correct
                  ? `Next review in ${r.intervalDays} day${r.intervalDays === 1 ? "" : "s"} (was ${r.prevIntervalDays})`
                  : "Back to tomorrow — you'll get it next time"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {moreDue > 0 && (
          <button
            onClick={onAgain}
            className="cursor-pointer rounded-full border-none px-6 py-3 text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${REVIEW_COLOR}, ${REVIEW_COLOR}cc)`,
              boxShadow: `0 4px 20px ${REVIEW_COLOR}30`,
            }}
          >
            Review {moreDue} more →
          </button>
        )}
        <Link
          to="/learn"
          className="rounded-full border border-edge bg-transparent px-6 py-3 text-sm font-medium text-slate-200"
        >
          ← Back to learning
        </Link>
      </div>
    </div>
  );
}

export default function ReviewPage() {
  const review = useReview();
  // Snapshot the session once; answering updates the store, but the drawn
  // questions must stay fixed for the whole session.
  const [session, setSession] = useState(() => toQuizQuestions(buildReviewSession()));
  const [sessionKey, setSessionKey] = useState(0);
  const [summary, setSummary] = useState(null); // { results, xpEarned }
  const resultsRef = useRef([]);

  const handleAnswer = (question, correct) => {
    const change = recordReviewAnswer(question.lessonId, question.id, correct);
    resultsRef.current = [
      ...resultsRef.current,
      { question: question.question, correct, ...change },
    ];
  };

  const handleComplete = () => {
    const results = resultsRef.current;
    const correctCount = results.filter((r) => r.correct).length;
    const xpEarned = awardReviewXp(correctCount);
    recordAction(); // a review session counts toward the daily streak
    setSummary({ results, xpEarned });
  };

  const handleAgain = () => {
    resultsRef.current = [];
    setSummary(null);
    setSession(toQuizQuestions(buildReviewSession()));
    setSessionKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen p-6 sm:p-8">
      <div className="mx-auto max-w-[680px]">
        <Link
          to="/learn"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to learning
        </Link>

        <div className="mb-6 animate-fade-in-down">
          <h1 className="m-0 mb-1 text-[clamp(1.4rem,4vw,1.8rem)] font-bold">
            🔁 Review
          </h1>
          <p className="m-0 font-serif text-[0.95rem] italic text-ink-secondary">
            Questions you've missed, resurfaced on a spaced schedule
          </p>
        </div>

        {summary ? (
          <SessionSummary
            results={summary.results}
            xpEarned={summary.xpEarned}
            moreDue={countDue(review)}
            onAgain={handleAgain}
          />
        ) : session.length === 0 ? (
          <EmptyState review={review} />
        ) : (
          <Quiz
            key={sessionKey}
            quiz={session}
            color={REVIEW_COLOR}
            onComplete={handleComplete}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}
