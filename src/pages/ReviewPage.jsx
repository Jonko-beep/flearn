import { useRef, useState } from "react";
import { ArrowRight, BrainCircuit, CalendarCheck, Check, X } from "lucide-react";
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
import { Button, Card, Empty, PageHeader, Ring, cx } from "../ui/kit.jsx";

function formatDueDate(dateString) {
  const [y, m, d] = dateString.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

// Turn a review session (from buildReviewSession) into Quiz-shaped questions
// tagged with their source lesson.
function toQuizQuestions(session) {
  return session.map(({ question, lesson, category }) => ({
    ...question,
    tag: lesson.title,
    tagColor: category.id,
    lessonId: lesson.id,
  }));
}

function EmptyState({ review }) {
  const upcoming = nextDueDate(review);
  return (
    <Empty
      icon={upcoming ? CalendarCheck : BrainCircuit}
      mascot="bear"
      title={upcoming ? "All caught up" : "Nothing to review yet"}
      action={
        <Button to="/learn" variant={upcoming ? "secondary" : "primary"} iconRight={upcoming ? undefined : ArrowRight}>
          {upcoming ? "Back to learning" : "Go take a quiz"}
        </Button>
      }
    >
      {upcoming
        ? `No questions are due today. Your next review unlocks on ${formatDueDate(upcoming)} — spacing it out is what makes it stick.`
        : "Miss a quiz question and it'll resurface here on a spaced schedule until you've truly got it. Never-missed questions stay out of your way."}
    </Empty>
  );
}

// End-of-session summary: score, XP earned (with the daily cap called out when
// hit), and how each question's interval moved.
function SessionSummary({ results, xpEarned, moreDue, onAgain }) {
  const total = results.length;
  const correctCount = results.filter((r) => r.correct).length;

  return (
    <div className="animate-enter">
      <Card className="flex flex-wrap items-center gap-x-7 gap-y-4 p-6">
        <Ring value={(correctCount / total) * 100} size={112} stroke={9} tone="accent">
          <div className="text-center leading-none">
            <div className="num font-display text-[1.7rem] font-semibold">
              {correctCount}/{total}
            </div>
            <div className="mt-1 text-2xs text-ink-muted">correct</div>
          </div>
        </Ring>
        <div className="min-w-0 flex-1 basis-60">
          <div className="eyebrow !text-accent-ink">Review</div>
          <h2 className="mt-1.5 text-[1.6rem]">Session complete</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
            {xpEarned > 0
              ? `+${xpEarned} XP earned (${REVIEW_XP_PER_CORRECT} per correct answer).`
              : correctCount > 0
                ? `You've hit today's ${REVIEW_XP_DAILY_CAP} XP review cap — the reps still count!`
                : "No XP this round — review XP comes from correct answers."}{" "}
            Questions you got right won&apos;t come back for a while; misses return tomorrow.
          </p>
        </div>
      </Card>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {moreDue > 0 && (
          <Button size="lg" iconRight={ArrowRight} onClick={onAgain}>
            Review {moreDue} more
          </Button>
        )}
        <Button to="/learn" size="lg" variant="secondary">
          Back to learning
        </Button>
      </div>

      <section className="mt-8">
        <h3 className="mb-3 font-sans text-[0.95rem] font-semibold tracking-normal text-ink-secondary">
          Interval changes
        </h3>
        <Card className="divide-y divide-edge">
          {results.map((r, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3.5">
              <span
                className={cx(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  r.correct ? "bg-gain/15 text-gain" : "bg-loss/15 text-loss"
                )}
              >
                {r.correct ? <Check size={12} strokeWidth={3} aria-label="Correct" /> : <X size={12} strokeWidth={3} aria-label="Incorrect" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-ink">{r.question}</p>
                <p className={cx("num mt-1 text-[0.8125rem] font-medium", r.correct ? "text-gain" : "text-loss")}>
                  {r.correct
                    ? `Next review in ${r.intervalDays} day${r.intervalDays === 1 ? "" : "s"} (was ${r.prevIntervalDays})`
                    : "Back to tomorrow — you'll get it next time"}
                </p>
              </div>
            </div>
          ))}
        </Card>
      </section>
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
    resultsRef.current = [...resultsRef.current, { question: question.question, correct, ...change }];
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
    <div className="animate-enter max-w-[760px]">
      <PageHeader title="Review" subtitle="Questions you've missed, resurfaced on a spaced schedule." />

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
        <Quiz key={sessionKey} quiz={session} onComplete={handleComplete} onAnswer={handleAnswer} />
      )}
    </div>
  );
}
