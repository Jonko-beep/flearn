import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getCategory } from "../data/curriculum.js";
import { useProgress } from "../hooks/useProgress.js";
import {
  buildFinalExam,
  recordFinalAttempt,
  useFinals,
  EXAM_SIZE,
  EXAM_PASS_THRESHOLD,
  EXAM_XP,
} from "../lib/finals.js";
import Quiz from "../components/Quiz.jsx";

const GOLD = "#f59e0b";

// Score ring + per-question review, exam flavored: pass threshold is 80%,
// a pass unlocks the certificate.
function ExamResults({ exam, answers, category, passed, score, onRetake }) {
  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  return (
    <div className="animate-fade-in-up text-center">
      {/* Score ring */}
      <div
        className="mx-auto mb-6 mt-4 flex h-40 w-40 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(${passed ? "#059669" : GOLD} ${
            score * 3.6
          }deg, #1e293b ${score * 3.6}deg)`,
        }}
      >
        <div className="flex h-[130px] w-[130px] flex-col items-center justify-center rounded-full bg-night-mid">
          <span className="font-serif text-4xl font-bold">{score}%</span>
          <span className="text-sm text-ink-secondary">
            {correctCount}/{exam.length} correct
          </span>
        </div>
      </div>

      {/* Pass/fail banner */}
      <div
        className="mb-6 rounded-card p-5"
        style={{
          background: passed ? "#05966915" : `${GOLD}15`,
          border: `1px solid ${passed ? "#05966933" : `${GOLD}33`}`,
        }}
      >
        <div className="mb-2 text-3xl">{passed ? "🎓" : "📚"}</div>
        <h3
          className="m-0 mb-2 text-xl"
          style={{ color: passed ? "#34d399" : "#fbbf24" }}
        >
          {passed ? `${category.title} Final: Passed!` : "Not This Time"}
        </h3>
        <p className="m-0 text-sm leading-normal text-ink-secondary">
          {passed
            ? `You scored ${score}% — at or above the ${EXAM_PASS_THRESHOLD}% pass mark. You've earned +${EXAM_XP} XP and your Certificate of Mastery.`
            : `You scored ${score}%, but the final exam needs ${EXAM_PASS_THRESHOLD}%. Review the questions below, revisit the lessons that tripped you up, and take it again — a fresh set of questions every time.`}
        </p>
      </div>

      {/* Per-question review */}
      <div className="mb-6 text-left">
        <h4 className="m-0 mb-3 font-sans text-[0.95rem] tracking-normal text-ink-secondary">
          Question Review
        </h4>
        {exam.map((q, i) => {
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
                <p className="m-0 mb-1 text-sm leading-snug text-slate-200">
                  {q.question}
                </p>
                {!answer?.correct && (
                  <>
                    <p className="m-0 text-[0.8rem] text-ink-muted">
                      Your answer: {q.options[answer?.selected]}
                    </p>
                    <p className="m-0 text-[0.8rem]" style={{ color: "#34d399" }}>
                      Correct answer: {q.options[q.correct]}
                    </p>
                  </>
                )}
                <Link
                  to={`/learn/${category.id}/${q.lessonId}`}
                  className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-[0.7rem] transition-all hover:-translate-y-px"
                  style={{
                    background: `${category.color}15`,
                    color: category.color,
                  }}
                >
                  From: {q.lessonTitle}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onRetake}
          className="cursor-pointer rounded-full border-none px-6 py-3 text-sm font-semibold"
          style={
            passed
              ? { background: "#1e293b", color: category.color }
              : {
                  background: `linear-gradient(135deg, ${category.color}, ${category.color}cc)`,
                  color: "white",
                  boxShadow: `0 4px 20px ${category.color}30`,
                }
          }
        >
          {passed ? "Retake Exam" : "Try Again →"}
        </button>
        {passed ? (
          <Link
            to={`/learn/${category.id}/certificate`}
            className="rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #059669, #059669cc)",
              boxShadow: "0 4px 20px #05966930",
            }}
          >
            🎓 View Certificate →
          </Link>
        ) : (
          <Link
            to={`/learn/${category.id}`}
            className="rounded-full border border-edge px-6 py-3 text-sm font-medium text-slate-200"
          >
            📖 Back to Lessons
          </Link>
        )}
      </div>
    </div>
  );
}

export default function FinalExamPage() {
  const { categoryId } = useParams();
  const category = getCategory(categoryId);
  const { getCategoryStats } = useProgress();
  const finals = useFinals();

  const [phase, setPhase] = useState("intro"); // intro | exam | results
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  if (!category) return <Navigate to="/learn" replace />;

  const stats = getCategoryStats(category);
  const unlocked = stats.total > 0 && stats.mastered === stats.total;
  const final = finals[category.id];

  const startExam = () => {
    setExam(buildFinalExam(category));
    setAnswers(null);
    setPhase("exam");
  };

  const handleComplete = (finalAnswers) => {
    const correctCount = Object.values(finalAnswers).filter((a) => a.correct).length;
    const examScore = Math.round((correctCount / exam.length) * 100);
    recordFinalAttempt(category.id, examScore);
    setAnswers(finalAnswers);
    setScore(examScore);
    setPassed(examScore >= EXAM_PASS_THRESHOLD);
    setPhase("results");
  };

  return (
    <div className="min-h-screen p-6 sm:p-8">
      <div className="mx-auto max-w-[680px]">
        <Link
          to={`/learn/${category.id}`}
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to lessons
        </Link>

        {/* Header */}
        <div className="mb-6 animate-fade-in-down">
          <div className="mb-3 flex flex-wrap gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-xs"
              style={{ background: `${category.color}15`, color: category.color }}
            >
              {category.title}
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ background: `${GOLD}15`, color: GOLD }}
            >
              🎓 Final Exam
            </span>
            {final?.bestScore != null && final.bestScore > 0 && (
              <span className="rounded-full bg-card px-2.5 py-1 text-xs text-ink-secondary">
                Best: {final.bestScore}%
              </span>
            )}
          </div>
          <h1 className="m-0 mb-1 text-[clamp(1.4rem,4vw,1.8rem)] font-bold">
            {category.title} Final Exam
          </h1>
          <p className="m-0 font-serif text-[0.95rem] italic text-ink-secondary">
            Prove your mastery and earn the certificate
          </p>
        </div>

        {/* Locked: not all lessons mastered */}
        {!unlocked && (
          <div className="animate-fade-in-up rounded-card-lg border border-edge bg-card p-12 text-center">
            <div className="mb-4 text-5xl">🔒</div>
            <h2 className="m-0 mb-2 text-2xl">Final Exam Locked</h2>
            <p className="m-0 mb-6 text-ink-secondary">
              Master all {stats.total} lessons in {category.title} to unlock the final
              exam. You&apos;re at {stats.mastered}/{stats.total}.
            </p>
            <Link
              to={`/learn/${category.id}`}
              className="inline-block rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: category.color }}
            >
              Back to {category.title}
            </Link>
          </div>
        )}

        {/* ── INTRO ── */}
        {unlocked && phase === "intro" && (
          <div
            className="animate-fade-in-up rounded-card-lg bg-card p-8 text-center"
            style={{ border: `1px solid ${GOLD}44` }}
          >
            <div className="mb-4 text-6xl">{category.mascot.emoji}</div>
            <h2 className="m-0 mb-3 text-2xl">Ready for the final?</h2>
            <p className="mx-auto mb-6 max-w-[440px] text-sm leading-relaxed text-ink-secondary">
              {EXAM_SIZE} questions drawn from every lesson in {category.title},
              shuffled fresh each attempt. Unlike lesson quizzes, there&apos;s{" "}
              <strong className="text-ink">no feedback between questions</strong> — you
              see your results only at the end. Score {EXAM_PASS_THRESHOLD}% or higher
              to pass, earn +{EXAM_XP} XP, and claim your Certificate of Mastery.
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-2 text-xs">
              {[
                `📝 ${EXAM_SIZE} questions`,
                `🎯 ${EXAM_PASS_THRESHOLD}% to pass`,
                `⭐ +${EXAM_XP} XP`,
                "🎓 Certificate",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-edge bg-well px-3 py-1.5 text-ink-secondary"
                >
                  {chip}
                </span>
              ))}
            </div>
            <button
              onClick={startExam}
              className="cursor-pointer rounded-full border-none px-10 py-3.5 font-serif text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #d97706)`,
                boxShadow: `0 4px 20px ${GOLD}30`,
              }}
            >
              Begin Final Exam →
            </button>
            {final?.passed && (
              <p className="mt-4 text-xs text-ink-muted">
                Already passed with {final.bestScore}% —{" "}
                <Link
                  to={`/learn/${category.id}/certificate`}
                  className="underline transition-colors hover:text-ink-secondary"
                >
                  view your certificate
                </Link>
              </p>
            )}
          </div>
        )}

        {/* ── EXAM ── */}
        {unlocked && phase === "exam" && exam && (
          <Quiz quiz={exam} color={GOLD} examMode onComplete={handleComplete} />
        )}

        {/* ── RESULTS ── */}
        {unlocked && phase === "results" && answers && (
          <ExamResults
            exam={exam}
            answers={answers}
            category={category}
            passed={passed}
            score={score}
            onRetake={startExam}
          />
        )}
      </div>
    </div>
  );
}
