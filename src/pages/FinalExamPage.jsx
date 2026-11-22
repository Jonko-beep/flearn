import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Award, BookOpen, ListChecks, Lock, RotateCcw, Target, Zap } from "lucide-react";
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
import { ScoreHeader, AnswerList } from "../components/ScoreReview.jsx";
import { Avatar, Badge, Button, Card, Crumbs, Empty } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";

// Score ring + per-question review, exam flavoured: the pass mark is 80% and
// a pass unlocks the certificate.
function ExamResults({ exam, answers, category, passed, score, onRetake }) {
  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  return (
    <div className="animate-enter">
      <ScoreHeader
        score={score}
        correctCount={correctCount}
        total={exam.length}
        passed={passed}
        title={passed ? `${category.title} final: passed` : "Not this time"}
      >
        {passed
          ? `You scored ${score}% — at or above the ${EXAM_PASS_THRESHOLD}% pass mark. You've earned +${EXAM_XP} XP and your Certificate of Mastery.`
          : `You scored ${score}%, but the final exam needs ${EXAM_PASS_THRESHOLD}%. Review the questions below, revisit the lessons that tripped you up, and take it again — a fresh set of questions every time.`}
      </ScoreHeader>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {passed ? (
          <>
            <Button to={`/learn/${category.id}/certificate`} size="lg" icon={Award}>
              View certificate
            </Button>
            <Button size="lg" variant="secondary" icon={RotateCcw} onClick={onRetake}>
              Retake exam
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" icon={RotateCcw} onClick={onRetake}>
              Try again
            </Button>
            <Button to={`/learn/${category.id}`} size="lg" variant="secondary" icon={BookOpen}>
              Back to lessons
            </Button>
          </>
        )}
      </div>

      <AnswerList
        questions={exam}
        answers={answers}
        title="Question review"
        showYours
        renderExtra={(q) => (
          <Link
            to={`/learn/${category.id}/${q.lessonId}`}
            className="mt-2 inline-block text-[0.8125rem] font-medium text-cat hover:underline"
          >
            From: {q.lessonTitle}
          </Link>
        )}
      />
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

  const facts = [
    { icon: ListChecks, label: `${EXAM_SIZE} questions` },
    { icon: Target, label: `${EXAM_PASS_THRESHOLD}% to pass` },
    { icon: Zap, label: `+${EXAM_XP} XP` },
    { icon: Award, label: "Certificate" },
  ];

  return (
    <div className="animate-enter max-w-[760px]" style={hue(category.id)}>
      <Crumbs
        items={[
          { label: "Learn", to: "/learn" },
          { label: category.title, to: `/learn/${category.id}` },
          { label: "Final exam" },
        ]}
      />

      <header className="mb-7">
        <div className="eyebrow !text-gold">{category.title} · Capstone</div>
        <h1 className="mt-2 text-[1.9rem] sm:text-[2.4rem]">{category.title} final exam</h1>
        <p className="mt-2 text-[1.1rem] font-medium text-ink-secondary">
          Prove your mastery and earn the certificate
        </p>
        {final?.bestScore != null && final.bestScore > 0 && (
          <div className="mt-4">
            <Badge tone={final.passed ? "gold" : "neutral"} className="num">
              Best {final.bestScore}%
            </Badge>
          </div>
        )}
      </header>

      {/* Locked: not all lessons mastered */}
      {!unlocked && (
        <Empty
          icon={Lock}
          title="Final exam locked"
          action={
            <Button to={`/learn/${category.id}`} variant="secondary">
              Back to {category.title}
            </Button>
          }
        >
          Master all {stats.total} lessons in {category.title} to unlock the final exam. You&apos;re at{" "}
          {stats.mastered}/{stats.total}.
        </Empty>
      )}

      {/* ── INTRO ── */}
      {unlocked && phase === "intro" && (
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <Avatar emoji={category.mascot.emoji} size={52} />
            <h2 className="text-[1.5rem]">Ready for the final?</h2>
          </div>
          <p className="mt-4 leading-relaxed text-ink-secondary">
            {EXAM_SIZE} questions drawn from every lesson in {category.title}, shuffled fresh each attempt. Unlike
            lesson quizzes, there&apos;s <strong className="font-semibold text-ink">no feedback between questions</strong>{" "}
            — you see your results only at the end. Score {EXAM_PASS_THRESHOLD}% or higher to pass, earn +{EXAM_XP}{" "}
            XP, and claim your Certificate of Mastery.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-4">
            {facts.map(({ icon: Icon, label }) => (
              <li key={label} className="num flex items-center gap-2 bg-card px-3.5 py-3 text-[0.8125rem] font-medium text-ink-secondary">
                <Icon size={15} className="shrink-0 text-gold" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="lg" iconRight={ArrowRight} onClick={startExam}>
              Begin final exam
            </Button>
            {final?.passed && (
              <span className="text-[0.8125rem] text-ink-muted">
                Already passed with {final.bestScore}% —{" "}
                <Link to={`/learn/${category.id}/certificate`} className="font-medium text-accent-ink hover:underline">
                  view your certificate
                </Link>
              </span>
            )}
          </div>
        </Card>
      )}

      {/* ── EXAM ── */}
      {unlocked && phase === "exam" && exam && <Quiz quiz={exam} examMode onComplete={handleComplete} />}

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
  );
}
