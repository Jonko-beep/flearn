import { useState } from "react";
import { questions } from "../data/alignQuiz.js";

const COLOR = "#EC4899";

const SECTION_LABELS = {
  temperament: "Instincts",
  capacity: "Your Situation",
  flags: "What You Operate",
};

// One question per screen. No feedback, no reveal — answers accumulate into a
// { [questionId]: optionIndex } map and scoring happens only at the end.
// Back preserves prior answers; Next stays disabled until one is picked.
export default function QuizFlow({ initialAnswers = {}, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);

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
    <div className="animate-fade-in-up" key={question.id}>
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-1.5 flex justify-between text-sm">
          <span className="text-ink-secondary">
            Question {current + 1} of {total}
          </span>
          <span className="text-ink-muted">{SECTION_LABELS[question.section]}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-sm bg-well">
          <div
            className="h-full rounded-sm transition-all duration-500"
            style={{
              width: `${((current + (answered ? 1 : 0)) / total) * 100}%`,
              background: `linear-gradient(90deg, ${COLOR}, #7C3AED)`,
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="mb-4 rounded-card-lg border border-edge bg-card p-6">
        <h3 className="m-0 mb-5 font-sans text-[1.05rem] font-semibold leading-normal tracking-normal">
          {question.text}
        </h3>

        <div className="flex flex-col gap-2.5">
          {question.options.map((option, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                onClick={() => setAnswers({ ...answers, [question.id]: i })}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-5 py-4 text-left text-[0.92rem] transition-all duration-200"
                style={{
                  background: isSelected ? `${COLOR}15` : "#1e293b",
                  border: `1px solid ${isSelected ? COLOR : "#334155"}`,
                  color: "#e2e8f0",
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    background: isSelected ? COLOR : "#0f172a",
                    color: isSelected ? "white" : "#64748b",
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrent(current - 1)}
          disabled={current === 0}
          className="rounded-full border border-edge bg-transparent px-6 py-3 text-[0.95rem] font-medium transition-all duration-200"
          style={{
            color: current === 0 ? "#334155" : "#94a3b8",
            cursor: current === 0 ? "not-allowed" : "pointer",
          }}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!answered}
          className="rounded-full border-none px-8 py-3 text-[0.95rem] font-semibold transition-all duration-200"
          style={{
            background: answered ? COLOR : "#334155",
            color: answered ? "white" : "#64748b",
            cursor: answered ? "pointer" : "not-allowed",
          }}
        >
          {current < total - 1 ? "Next →" : "See My Match →"}
        </button>
      </div>
    </div>
  );
}
