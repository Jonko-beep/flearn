import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronRight, Compass } from "lucide-react";
import {
  ONBOARDING_QUESTIONS,
  scoreOnboarding,
  getRecommendedPath,
  writeOnboarding,
  markOnboardingSkipped,
} from "../lib/onboarding.js";
import { philosophers } from "../data/philosophers.js";
import { PHILOSOPHER_ICONS } from "../ui/icons.js";
import { Avatar, Button, Card, IconTile, Logo, SpeechBubble, cx } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";
import { ThemeToggle } from "../components/AppShell.jsx";

function Steps({ step }) {
  return (
    <div className="mb-8 flex items-center gap-1.5" aria-hidden>
      {ONBOARDING_QUESTIONS.map((q, i) => (
        <span
          key={q.key}
          className={cx("h-3 flex-1 rounded-full transition-colors duration-300", i <= step ? "bg-accent" : "bg-edge")}
        />
      ))}
    </div>
  );
}

function QuestionScreen({ question, index, selected, onAnswer, onBack }) {
  return (
    <div key={question.key} className="animate-enter" style={hue(question.color)}>
      <div className="flex items-end gap-4">
        <Avatar emoji={question.mascot.emoji} size={96} className="shrink-0" />
        <SpeechBubble className="mb-3 flex-1 !px-5 !py-4">
          <div className="text-sm font-bold text-cat">
            {question.mascot.name} · {index + 1} of {ONBOARDING_QUESTIONS.length}
          </div>
          <h1 className="mt-1 text-[1.6rem] leading-tight sm:text-[1.85rem]">{question.question}</h1>
        </SpeechBubble>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswer(option.value)}
              className={cx(
                "group flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-[1rem] font-semibold transition-[transform,box-shadow,border-color,background-color] duration-75 active:translate-y-[2px]",
                isSelected
                  ? "border-accent-ink bg-accent/10 text-ink shadow-[0_3px_0_rgb(var(--accent)/0.6)]"
                  : "border-edge bg-card text-ink shadow-[0_3px_0_rgb(var(--edge))] hover:border-cat/60 hover:bg-raised active:shadow-[0_1px_0_rgb(var(--edge))]"
              )}
            >
              <span className="flex-1">{option.label}</span>
              <ChevronRight size={19} strokeWidth={2.6} className="text-cat transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
          );
        })}
      </div>

      {index > 0 && (
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={onBack} className="-ml-3 mt-6">
          Previous question
        </Button>
      )}
    </div>
  );
}

// After the recommendation: an advert for the "Who do I align with?" quiz.
// It names no philosophers (the match stays a surprise), just shows that there
// are several schools of thought to land in.
function QuizAdvert({ firstLesson }) {
  return (
    <div className="animate-enter">
      <div className="text-sm font-bold text-ink-muted">One more thing…</div>
      <Card className="mt-3 overflow-hidden" style={hue("align")}>
        <div className="bg-cat/15 px-6 pb-6 pt-7 sm:px-8">
          <IconTile icon={Compass} size={56} className="!bg-cat !text-[#0b111e]" />
          <h1 className="mt-5 text-[2rem] leading-tight sm:text-[2.3rem]">Who do I align with?</h1>
          <p className="mt-2 text-[1.05rem] leading-relaxed text-ink-secondary">
            Fifteen gut-check questions about money. At the end you&apos;ll see which well-known personal-finance
            thinker sees money the way you do, and what to read or try next.
          </p>
        </div>
        <div className="px-6 py-6 sm:px-8">
          <div className="flex flex-wrap gap-2" aria-hidden>
            {Object.values(PHILOSOPHER_ICONS).map((Icon, i) => (
              <span key={i} className="flex h-10 w-10 items-center justify-center rounded-xl bg-cat/10 text-cat">
                <Icon size={19} strokeWidth={2.2} />
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold text-ink-muted">
            {philosophers.length} schools of money thinking. Which one is yours?
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Button to="/align" state={{ start: true }} size="lg" iconRight={ArrowRight} className="!bg-cat">

              Take the quiz
            </Button>
            <span className="text-sm font-semibold text-ink-muted">15 questions · about 3 minutes</span>
          </div>
        </div>
      </Card>
      <div className="mt-6 text-center">
        <Link
          to={`/learn/${firstLesson.category.id}/${firstLesson.lesson.id}`}
          className="text-sm font-bold text-ink-secondary transition-colors hover:text-ink"
        >
          Skip for now, start “{firstLesson.lesson.title}” →
        </Link>
      </div>
    </div>
  );
}

function ResultsScreen({ recommendation, onContinue }) {
  const { intro, lessons } = getRecommendedPath(recommendation);
  const [first, ...rest] = lessons;
  const mascot = first.category.mascot;

  return (
    <div className="animate-enter">
      <div className="text-sm font-bold text-accent-ink">Your recommended path</div>
      <h1 className="mt-1 text-[2rem] sm:text-[2.4rem]">Here's where to begin</h1>

      <div className="mt-6 flex items-end gap-4" style={hue(first.category.id)}>
        <Avatar emoji={mascot.emoji} size={84} happy className="shrink-0" />
        <SpeechBubble className="mb-2 flex-1">
          <div className="text-sm font-bold text-cat">{mascot.name}</div>
          <p className="mt-0.5 text-[0.975rem] leading-relaxed text-ink-secondary">“{intro}”</p>
        </SpeechBubble>
      </div>

      <Card className="mt-7 overflow-hidden">
        {[first, ...rest].map(({ category, lesson }, i) => (
          <div
            key={lesson.id}
            style={hue(category.id)}
            className={cx("flex items-center gap-4 px-5 py-4", i > 0 && "border-t-2 border-edge")}
          >
            <span
              className={cx(
                "num flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[1rem] font-semibold",
                i === 0 ? "bg-accent text-accent-fg shadow-[inset_0_-3px_0_rgb(0_0_0/0.22)]" : "border-2 border-cat/50 text-cat"
              )}
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              {i === 0 && <span className="mb-0.5 block text-xs font-bold text-accent-ink">Start here</span>}
              <span className="block font-display text-[1.05rem] font-semibold text-ink">{lesson.title}</span>
              <span className="block text-[0.8125rem] text-ink-muted">
                {category.title} · {lesson.subtitle}
              </span>
            </span>
            <span className="hidden shrink-0 text-sm font-semibold text-ink-muted sm:block">{lesson.duration}</span>
          </div>
        ))}
      </Card>

      <div className="mt-6">
        <Button size="lg" iconRight={ArrowRight} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [showAdvert, setShowAdvert] = useState(false);

  const skip = () => {
    markOnboardingSkipped();
    navigate("/learn");
  };

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

  const handleBack = () => setStep(step - 1);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-5 sm:px-8">
        <Logo />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {!recommendation && (
            <Button variant="ghost" size="sm" onClick={skip}>
              Skip for now
            </Button>
          )}
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-center px-5 pb-20 pt-6">
        {recommendation && showAdvert ? (
          <QuizAdvert firstLesson={getRecommendedPath(recommendation).lessons[0]} />
        ) : recommendation ? (
          <ResultsScreen recommendation={recommendation} onContinue={() => setShowAdvert(true)} />
        ) : (
          <>
            <p className="mb-4 text-[0.95rem] font-semibold text-ink-secondary">
              {ONBOARDING_QUESTIONS.length} quick questions about where you are with money, then we&apos;ll suggest
              where to start.
            </p>
            <Steps step={step} />
            <QuestionScreen
              question={ONBOARDING_QUESTIONS[step]}
              index={step}
              selected={answers[ONBOARDING_QUESTIONS[step].key]}
              onAnswer={handleAnswer}
              onBack={handleBack}
            />
          </>
        )}
      </main>
    </div>
  );
}
