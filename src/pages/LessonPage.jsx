import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLesson, getNextLesson, getMasteryInfo } from "../data/curriculum.js";
import { getTermsForLesson } from "../data/glossary.js";
import { useProgress } from "../hooks/useProgress.js";
import VideoPlayer from "../components/VideoPlayer.jsx";
import Transcript from "../components/Transcript.jsx";
import Quiz from "../components/Quiz.jsx";
import ResultsScreen from "../components/ResultsScreen.jsx";

// Lesson body for reading text: plain paragraphs, with bullet/numbered blocks
// rendered as accent-bordered wells (same treatment as the prototype).
function LessonBody({ content, color }) {
  const paragraphs = content.split("\n\n");
  return (
    <div className="mt-6 rounded-card border border-edge bg-card p-6">
      <div className="mb-4 flex items-center gap-2 border-b border-edge pb-4">
        <span className="text-lg">📖</span>
        <span className="text-sm font-semibold text-ink-secondary">LESSON NOTES</span>
      </div>
      {paragraphs.map((p, i) => {
        const isBullets = p.includes("•") || /^\d\./m.test(p.trim());
        if (isBullets) {
          return (
            <div
              key={i}
              className="my-4 rounded-r-[10px] bg-well px-5 py-4"
              style={{ borderLeft: `3px solid ${color}` }}
            >
              {p.split("\n").map((line, j) => (
                <p
                  key={j}
                  className={`m-0 text-sm leading-relaxed text-slate-300 ${
                    j > 0 ? "mt-1.5" : ""
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          );
        }
        return (
          <p key={i} className="my-4 text-[0.92rem] leading-[1.8] text-slate-300">
            {p}
          </p>
        );
      })}
    </div>
  );
}

// Chips linking each glossary term this lesson teaches into /glossary,
// pre-filled as the search query.
function KeyTerms({ lessonId, color }) {
  const terms = getTermsForLesson(lessonId);
  if (terms.length === 0) return null;
  return (
    <div className="mt-6 rounded-card border border-edge bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">🔑</span>
        <span className="text-sm font-semibold text-ink-secondary">KEY TERMS</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {terms.map((entry) => (
          <Link
            key={entry.term}
            to={`/glossary?q=${encodeURIComponent(entry.term)}`}
            className="rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium transition-all hover:-translate-y-px"
            style={{ borderColor: `${color}44`, color, background: `${color}10` }}
          >
            {entry.term}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function LessonPage() {
  const { categoryId, lessonId } = useParams();
  const { category, lesson } = getLesson(categoryId, lessonId);
  const { recordAttempt, getLessonProgress } = useProgress();

  const [phase, setPhase] = useState("lesson"); // lesson | quiz | results
  const [quizKey, setQuizKey] = useState(0); // bump to reset the Quiz component
  const [answers, setAnswers] = useState(null);
  const [startSeconds, setStartSeconds] = useState(null);

  if (!category) return <Navigate to="/learn" replace />;
  if (!lesson) return <Navigate to={`/learn/${category.id}`} replace />;

  const lessonProgress = getLessonProgress(lesson.id);
  const bestScore = lessonProgress?.bestScore;
  const bestMastery = getMasteryInfo(bestScore ?? null);
  const hasQuiz = Boolean(lesson.quiz?.length);
  const nextLesson = getNextLesson(category.id, lesson.id);

  // Locked lessons render a notice instead of content
  if (lesson.locked) {
    return (
      <div className="min-h-screen p-8">
        <div className="mx-auto max-w-[680px]">
          <Link
            to={`/learn/${category.id}`}
            className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
          >
            ← Back to lessons
          </Link>
          <div className="animate-fade-in-up rounded-card-lg border border-edge bg-card p-12 text-center">
            <div className="mb-4 text-5xl">🔒</div>
            <h2 className="m-0 mb-2 text-2xl">{lesson.title}</h2>
            <p className="m-0 mb-6 text-ink-secondary">
              This lesson is coming soon. Check back later!
            </p>
            <Link
              to={`/learn/${category.id}`}
              className="inline-block rounded-full px-6 py-3 text-sm font-semibold text-white"
              style={{ background: category.color }}
            >
              Back to {category.title}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (finalAnswers) => {
    const correctCount = Object.values(finalAnswers).filter((a) => a.correct).length;
    const score = Math.round((correctCount / lesson.quiz.length) * 100);
    recordAttempt(lesson.id, score);
    setAnswers(finalAnswers);
    setPhase("results");
  };

  const handleRetake = () => {
    setAnswers(null);
    setQuizKey((k) => k + 1);
    setPhase("quiz");
  };

  const tabs = [
    { key: "lesson", label: "📹 Lesson", enabled: true },
    { key: "quiz", label: "📝 Quiz", enabled: hasQuiz },
    { key: "results", label: "🏆 Results", enabled: answers !== null },
  ];

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
            <span className="rounded-full bg-card px-2.5 py-1 text-xs text-ink-secondary">
              {lesson.duration}
            </span>
            <span className="rounded-full bg-card px-2.5 py-1 text-xs text-ink-secondary">
              {category.mascot.emoji} {category.mascot.name}
            </span>
            {bestScore !== undefined && (
              <span
                className="rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{ background: bestMastery.bg, color: bestMastery.color }}
              >
                Best: {bestScore}% — {bestMastery.label}
              </span>
            )}
          </div>
          <h1 className="m-0 mb-1 text-[clamp(1.4rem,4vw,1.8rem)] font-bold">
            {lesson.title}
          </h1>
          <p className="m-0 font-serif text-[0.95rem] italic text-ink-secondary">
            {lesson.subtitle}
          </p>
        </div>

        {/* Phase tabs */}
        <div
          className="mb-6 flex gap-1 rounded-xl bg-well p-1"
          style={{ animation: "fadeInDown 0.6s ease-out 0.1s both" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => tab.enabled && setPhase(tab.key)}
              className="flex-1 rounded-[10px] border-none py-2.5 text-sm transition-all duration-200"
              style={{
                fontWeight: phase === tab.key ? 600 : 400,
                background: phase === tab.key ? `${category.color}20` : "transparent",
                color: phase === tab.key ? category.color : "#64748b",
                cursor: tab.enabled ? "pointer" : "not-allowed",
                opacity: tab.enabled ? 1 : 0.4,
              }}
            >
              {tab.label}
              {tab.key === "quiz" && lessonProgress?.completed ? " ✓" : ""}
            </button>
          ))}
        </div>

        {/* ── LESSON PHASE ── */}
        {phase === "lesson" && (
          <div className="animate-fade-in-up" style={{ animationDuration: "0.5s" }}>
            <VideoPlayer lesson={lesson} category={category} startSeconds={startSeconds} />

            {lesson.transcript && (
              <Transcript
                transcript={lesson.transcript}
                color={category.color}
                canSeek={Boolean(lesson.videoUrl)}
                onSeek={setStartSeconds}
              />
            )}

            {lesson.content && <LessonBody content={lesson.content} color={category.color} />}

            <KeyTerms lessonId={lesson.id} color={category.color} />

            <div className="mt-6 text-center">
              {hasQuiz ? (
                <>
                  <p className="mb-4 text-sm text-ink-muted">
                    Finished the lesson? Test your knowledge to master it — score 70% or
                    higher and your best result is saved.
                  </p>
                  <button
                    onClick={() => setPhase("quiz")}
                    className="cursor-pointer rounded-full border-none px-10 py-3.5 font-serif text-base font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${category.color}, ${category.color}cc)`,
                      boxShadow: `0 4px 20px ${category.color}30`,
                    }}
                  >
                    Take the Quiz →
                  </button>
                </>
              ) : (
                <p className="mb-4 text-sm text-ink-muted">
                  📝 Quiz coming soon for this lesson.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── QUIZ PHASE ── */}
        {phase === "quiz" && hasQuiz && (
          <Quiz
            key={quizKey}
            quiz={lesson.quiz}
            color={category.color}
            onComplete={handleQuizComplete}
          />
        )}

        {/* ── RESULTS PHASE ── */}
        {phase === "results" && answers && (
          <ResultsScreen
            quiz={lesson.quiz}
            answers={answers}
            category={category}
            nextLesson={nextLesson}
            onRetake={handleRetake}
            onReview={() => setPhase("lesson")}
          />
        )}
      </div>
    </div>
  );
}
