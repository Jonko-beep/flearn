import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { questions } from "../data/alignQuiz.js";
import { Button, Card, Progress, cx } from "../ui/kit.jsx";

const SECTION_LABELS = {
  temperament: "Instincts",
  capacity: "Your situation",
  flags: "What you operate",
};

// One question per screen. No feedback, no reveal — answers accumulate into a
// { [questionId]: optionIndex } map and scoring happens only at the end.
// Back preserves prior answers; Next stays disabled until one is picked.
export default function QuizFlow({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const total = questions.length;
  const question = questions[current];
  const selected = answers[question.id];
  const answered = selected !== undefined;

  const handleNext = () => {
    if (!answered) return;
    if (current < total - 1) {
      setCurrent(current + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <div className="animate-enter" key={question.id}>
      <div className="mb-5">
        <div className="num mb-2 flex justify-between text-[0.8125rem]">
          <span className="font-medium text-ink-secondary">
            Question {current + 1} of {total}
          </span>
          <span className="text-ink-muted">{SECTION_LABELS[question.section]}</span>
        </div>
        <Progress value={((current + (answered ? 1 : 0)) / total) * 100} label="Quiz progress" />
      </div>

      <Card className="p-5 sm:p-7">
        <h2 className="text-[1.3rem] leading-snug">{question.text}</h2>

        <div className="mt-5 flex flex-col gap-2.5" role="radiogroup" aria-label="Answer choices">
          {question.options.map((option, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setAnswers({ ...answers, [question.id]: i })}
                className={cx(
                  "flex w-full items-center gap-3.5 rounded-2xl border-2 px-4 py-3.5 text-left text-[0.95rem] font-medium leading-snug transition-[transform,box-shadow,border-color,background-color] duration-75",
                  isSelected
                    ? "border-accent-ink bg-accent/10 text-ink shadow-[0_3px_0_rgb(var(--accent)/0.6)]"
                    : "border-edge bg-card text-ink shadow-[0_3px_0_rgb(var(--edge))] hover:border-edge-strong hover:bg-raised active:translate-y-[2px] active:shadow-[0_1px_0_rgb(var(--edge))]"
                )}
              >
                <span
                  className={cx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-semibold",
                    isSelected ? "bg-accent text-accent-fg" : "border-2 border-edge-strong text-ink-muted"
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option.text}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="mt-5 flex items-center justify-between">
        <Button variant="ghost" size="lg" icon={ArrowLeft} onClick={() => setCurrent(current - 1)} disabled={current === 0}>
          Back
        </Button>
        <Button size="lg" iconRight={ArrowRight} onClick={handleNext} disabled={!answered}>
          {current < total - 1 ? "Next" : "See my match"}
        </Button>
      </div>
    </div>
  );
}
