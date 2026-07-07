import { useState } from "react";

// One question at a time: pick an option, submit to lock it in and reveal the
// explanation, then advance. Calls onComplete(answers) after the last question,
// where answers is { [questionIndex]: { selected, correct } }. Optional
// onAnswer(question, correct) fires as each answer is locked in; questions may
// carry a { tag, tagColor } for a small source pill (used by review sessions).
export default function Quiz({ quiz, color, onComplete, onAnswer }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const total = quiz.length;
  const question = quiz[current];
  const answered = answers[current] !== undefined;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  const handleConfirm = () => {
    if (selected === null || answered) return;
    const correct = selected === question.correct;
    setAnswers({ ...answers, [current]: { selected, correct } });
    onAnswer?.(question, correct);
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      onComplete(answers);
    }
  };

  const optionClasses = (i) => {
    const isSelected = selected === i;
    const isCorrect = i === question.correct;

    let style = {
      background: "#1e293b",
      border: `1px solid ${isSelected && !answered ? `${color}88` : "#334155"}`,
      color: "#e2e8f0",
    };
    if (answered) {
      if (isCorrect) {
        style = { background: "#05966920", border: "1px solid #059669", color: "#34d399" };
      } else if (isSelected) {
        style = { background: "#dc262620", border: "1px solid #dc2626", color: "#f87171" };
      } else {
        style = { ...style, color: "#64748b" };
      }
    }
    return style;
  };

  const badgeStyle = (i) => {
    const isSelected = selected === i;
    const isCorrect = i === question.correct;
    if (answered) {
      return {
        background: isCorrect ? "#059669" : isSelected ? "#dc2626" : "#0f172a",
        color: isCorrect || isSelected ? "white" : "#64748b",
      };
    }
    return {
      background: isSelected ? color : "#0f172a",
      color: isSelected ? "white" : "#64748b",
    };
  };

  return (
    <div className="animate-fade-in-up">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="text-ink-secondary">
            Question {current + 1} of {total}
          </span>
          <span className="text-ink-muted">{correctCount} correct so far</span>
        </div>
        <div className="h-1 overflow-hidden rounded-sm bg-well">
          <div
            className="h-full rounded-sm transition-all duration-500"
            style={{
              width: `${((current + (answered ? 1 : 0)) / total) * 100}%`,
              background: `linear-gradient(90deg, ${color}, #0D9488)`,
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="mb-4 rounded-card-lg border border-edge bg-card p-6">
        {question.tag && (
          <span
            className="mb-3 inline-block rounded-full px-2.5 py-1 text-xs"
            style={{
              background: `${question.tagColor ?? color}15`,
              color: question.tagColor ?? color,
            }}
          >
            {question.tag}
          </span>
        )}
        <h3 className="m-0 mb-5 font-sans text-[1.05rem] font-semibold leading-normal tracking-normal">
          {question.question}
        </h3>

        <div className="flex flex-col gap-2.5">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              className={`flex w-full items-center gap-3 rounded-xl px-5 py-4 text-left text-[0.92rem] transition-all duration-200 ${
                answered ? "cursor-default" : "cursor-pointer"
              }`}
              style={optionClasses(i)}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                style={badgeStyle(i)}
              >
                {answered
                  ? i === question.correct
                    ? "✓"
                    : selected === i
                      ? "✗"
                      : String.fromCharCode(65 + i)
                  : String.fromCharCode(65 + i)}
              </span>
              <span>{option}</span>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {answered && (
          <div
            className="mt-4 animate-fade-in-up rounded-[10px] p-4"
            style={{
              background: answers[current].correct ? "#05966912" : "#dc262612",
              borderLeft: `3px solid ${answers[current].correct ? "#059669" : "#dc2626"}`,
              animationDuration: "0.3s",
            }}
          >
            <div
              className="mb-1 text-sm font-semibold"
              style={{ color: answers[current].correct ? "#34d399" : "#f87171" }}
            >
              {answers[current].correct ? "✓ Correct!" : "✗ Not quite"}
            </div>
            <p className="m-0 text-sm leading-normal text-ink-secondary">
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="flex justify-end">
        {!answered ? (
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className="rounded-full border-none px-8 py-3 text-[0.95rem] font-semibold transition-all duration-200"
            style={{
              background: selected === null ? "#334155" : color,
              color: selected === null ? "#64748b" : "white",
              cursor: selected === null ? "not-allowed" : "pointer",
            }}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="rounded-full border-none px-8 py-3 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px"
            style={{ background: color }}
          >
            {current < total - 1 ? "Next Question →" : "See Results →"}
          </button>
        )}
      </div>
    </div>
  );
}
