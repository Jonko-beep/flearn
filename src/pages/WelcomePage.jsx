import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ONBOARDING_QUESTIONS,
  scoreOnboarding,
  getRecommendedPath,
  writeOnboarding,
} from "../lib/onboarding.js";

function QuestionDots({ step, answers }) {
  return (
    <div className="mb-10 flex items-center justify-center gap-2.5">
      {ONBOARDING_QUESTIONS.map((q, i) => {
        const done = answers[q.key] !== undefined;
        const active = step === i;
        return (
          <span
            key={q.key}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: active ? "24px" : "8px",
              background: active || done ? q.color : "#334155",
            }}
          />
        );
      })}
    </div>
  );
}

function QuestionScreen({ question, index, selected, onAnswer, onBack }) {
  return (
    <div key={question.key} className="animate-fade-in-up text-center">
      <div
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-5xl"
        style={{ background: `${question.color}15` }}
      >
        {question.mascot.emoji}
      </div>
      <div className="mb-1 text-sm font-medium" style={{ color: question.color }}>
        {question.mascot.name} asks…
      </div>
      <h2 className="m-0 mb-8 text-2xl font-bold">{question.question}</h2>

      <div className="mx-auto flex max-w-[420px] flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className="rounded-card border bg-card px-6 py-4 text-left font-sans text-[0.95rem] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: isSelected ? question.color : "#334155",
                background: isSelected ? `${question.color}15` : undefined,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = question.color)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = isSelected
                  ? question.color
                  : "#334155")
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="mt-8 bg-transparent font-sans text-sm text-ink-muted transition-colors hover:text-ink-secondary"
      >
        ← {index === 0 ? "Back to start" : "Previous question"}
      </button>
    </div>
  );
}

function ResultsScreen({ recommendation }) {
  const navigate = useNavigate();
  const { intro, lessons } = getRecommendedPath(recommendation);
  const [first, ...rest] = lessons;
  const mascot = first.category.mascot;
  const accent = first.category.color;

  return (
    <div className="animate-fade-in-up text-center">
      <div
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-5xl"
        style={{ background: `${accent}15` }}
      >
        {mascot.emoji}
      </div>
      <h2 className="m-0 mb-2 text-3xl font-bold">Your recommended path</h2>
      <p className="mx-auto m-0 mb-8 max-w-[440px] font-sans text-[0.95rem] leading-relaxed text-ink-secondary">
        <span className="font-semibold text-ink">{mascot.name}:</span> "{intro}"
      </p>

      <button
        onClick={() => navigate(`/learn/${first.category.id}/${first.lesson.id}`)}
        className="group relative mx-auto mb-6 block w-full max-w-[480px] overflow-hidden rounded-card-lg p-7 text-left transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "#1e293b",
          border: `1px solid ${accent}55`,
          boxShadow: `0 4px 24px ${accent}22`,
        }}
      >
        <div className="pointer-events-none absolute -top-8 -right-5 text-[6rem] opacity-[0.06]">
          {first.category.emoji}
        </div>
        <div
          className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
          style={{ background: `${accent}20`, color: accent }}
        >
          START HERE
        </div>
        <h3 className="m-0 mb-1 text-2xl font-bold text-ink">{first.lesson.title}</h3>
        <p className="m-0 mb-3 font-sans text-sm text-ink-secondary">
          {first.lesson.subtitle}
        </p>
        <span
          className="font-sans text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: accent, display: "inline-block" }}
        >
          Begin lesson →
        </span>
      </button>

      <div className="mx-auto mb-8 max-w-[480px]">
        <div className="mb-3 text-left font-sans text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Then continue with
        </div>
        <div className="flex flex-col gap-3">
          {rest.map(({ category, lesson }, i) => (
            <button
              key={lesson.id}
              onClick={() => navigate(`/learn/${category.id}/${lesson.id}`)}
              className="flex items-center gap-4 rounded-card border border-edge bg-card px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${category.color}55`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#334155")}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                style={{ background: `${category.color}15`, color: category.color }}
              >
                {i + 2}
              </span>
              <span>
                <span className="block font-serif font-semibold text-ink">
                  {lesson.title}
                </span>
                <span className="block font-sans text-xs text-ink-muted">
                  {lesson.subtitle}
                </span>
              </span>
              <span className="ml-auto" style={{ color: category.color }}>
                →
              </span>
            </button>
          ))}
        </div>
      </div>

      <Link
        to="/learn"
        className="font-sans text-sm text-ink-muted transition-colors hover:text-ink-secondary"
      >
        Or browse all lessons →
      </Link>
    </div>
  );
}

export default function WelcomePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  const handleAnswer = (value) => {
    const question = ONBOARDING_QUESTIONS[step];
    const next = { ...answers, [question.key]: value };
    setAnswers(next);
    if (step < ONBOARDING_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const rec = scoreOnboarding(next);
      writeOnboarding(next, rec);
      setRecommendation(rec);
    }
  };

  const handleBack = () => {
    if (step === 0) navigate("/");
    else setStep(step - 1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 font-serif">
      <div className="w-full max-w-[560px]">
        {recommendation ? (
          <ResultsScreen recommendation={recommendation} />
        ) : (
          <>
            <QuestionDots step={step} answers={answers} />
            <QuestionScreen
              question={ONBOARDING_QUESTIONS[step]}
              index={step}
              selected={answers[ONBOARDING_QUESTIONS[step].key]}
              onAnswer={handleAnswer}
              onBack={handleBack}
            />
          </>
        )}
      </div>
    </div>
  );
}
