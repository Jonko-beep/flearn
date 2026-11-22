import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Badge, Button, Card, Progress, cx } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";

// One question at a time: pick an option, submit to lock it in and reveal the
// explanation, then advance. Calls onComplete(answers) after the last question,
// where answers is { [questionIndex]: { selected, correct } }. Optional
// onAnswer(question, correct) fires as each answer is locked in; questions may
// carry a { tag, tagColor } for a small source label (used by review sessions).
// examMode locks in and advances in one step with no feedback until the end —
// no correct/incorrect reveal, no explanation, no running score.
export default function Quiz({ quiz, onComplete, onAnswer, examMode = false }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const total = quiz.length;
  const question = quiz[current];
  const answered = answers[current] !== undefined;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const isLast = current === total - 1;

  const handleConfirm = () => {
    if (selected === null || answered) return;
    const correct = selected === question.correct;
    const next = { ...answers, [current]: { selected, correct } };
    setAnswers(next);
    onAnswer?.(question, correct);
    if (examMode) {
      // No feedback between questions — advance immediately
      if (!isLast) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        onComplete(next);
      }
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      onComplete(answers);
    }
  };

  // how one answer option looks, given what has happened so far
  const optionState = (i) => {
    if (!answered) return selected === i ? "selected" : "idle";
    if (i === question.correct) return "correct";
    if (i === selected) return "wrong";
    return "dimmed";
  };
  const OPTION_STYLES = {
    idle: "border-edge bg-card text-ink shadow-[0_3px_0_rgb(var(--edge))] hover:border-edge-strong hover:bg-raised active:translate-y-[2px] active:shadow-[0_1px_0_rgb(var(--edge))]",
    selected: "border-accent-ink bg-accent/10 text-ink shadow-[0_3px_0_rgb(var(--accent)/0.6)]",
    correct: "border-gain bg-gain/10 text-ink shadow-[0_3px_0_rgb(var(--gain)/0.6)]",
    wrong: "border-loss bg-loss/10 text-ink shadow-[0_3px_0_rgb(var(--loss)/0.6)]",
    dimmed: "border-edge bg-card text-ink-muted",
  };
  const KEY_STYLES = {
    idle: "border-2 border-edge-strong text-ink-muted",
    selected: "bg-accent text-accent-fg",
    correct: "bg-gain text-accent-fg",
    wrong: "bg-loss text-accent-fg",
    dimmed: "border-2 border-edge text-ink-muted",
  };

  const result = answers[current];

  return (
    <div className="animate-enter">
      {/* Progress */}
      <div className="mb-5">
        <div className="num mb-2 flex justify-between text-[0.8125rem]">
          <span className="font-medium text-ink-secondary">
            Question {current + 1} of {total}
          </span>
          <span className="text-ink-muted">{examMode ? "Results at the end" : `${correctCount} correct so far`}</span>
        </div>
        <Progress value={((current + (answered ? 1 : 0)) / total) * 100} label="Quiz progress" />
      </div>

      <Card className="p-5 sm:p-7">
        {question.tag && (
          <Badge tone="cat" className="mb-3" style={hue(question.tagColor)}>
            {question.tag}
          </Badge>
        )}
        <h2 className="text-[1.3rem] leading-snug">{question.question}</h2>

        <div className="mt-5 flex flex-col gap-2.5" role="radiogroup" aria-label="Answer choices">
          {question.options.map((option, i) => {
            const state = optionState(i);
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={selected === i}
                onClick={() => !answered && setSelected(i)}
                className={cx(
                  "flex w-full items-center gap-3.5 rounded-2xl border-2 px-4 py-3.5 text-left text-[0.95rem] font-medium leading-snug transition-[transform,box-shadow,border-color,background-color] duration-75",
                  answered ? "cursor-default" : "cursor-pointer",
                  OPTION_STYLES[state]
                )}
              >
                <span
                  className={cx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-sm font-semibold",
                    KEY_STYLES[state]
                  )}
                >
                  {state === "correct" ? (
                    <Check size={15} strokeWidth={3} aria-label="Correct answer" />
                  ) : state === "wrong" ? (
                    <X size={15} strokeWidth={3} aria-label="Your answer, incorrect" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {result && !examMode && (
          <div
            className={cx(
              "mt-5 animate-enter rounded-2xl border-2 px-4 py-3.5",
              result.correct ? "border-gain/40 bg-gain/[0.08]" : "border-loss/40 bg-loss/[0.08]"
            )}
          >
            <div className={cx("font-display text-[1.1rem] font-semibold", result.correct ? "text-gain" : "text-loss")}>
              {result.correct ? "Nailed it!" : "Not quite"}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{question.explanation}</p>
          </div>
        )}
      </Card>

      <div className="mt-5 flex justify-end">
        {!answered ? (
          <Button size="lg" onClick={handleConfirm} disabled={selected === null} iconRight={examMode ? ArrowRight : undefined}>
            {examMode ? (isLast ? "Finish exam" : "Next question") : "Submit answer"}
          </Button>
        ) : (
          <Button size="lg" onClick={handleNext} iconRight={ArrowRight}>
            {isLast ? "See results" : "Next question"}
          </Button>
        )}
      </div>
    </div>
  );
}
