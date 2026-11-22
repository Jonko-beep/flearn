import { Check, X } from "lucide-react";
import { Avatar, Card, Ring, cx } from "../ui/kit.jsx";

// Shared pieces of every "how did I do" screen: lesson quiz results, final
// exam results and review sessions.

/** The score ring, a verdict headline and a sentence of explanation. */
export function ScoreHeader({ score, correctCount, total, passed, title, mascot, children }) {
  return (
    <Card className={cx("flex flex-wrap items-center gap-x-7 gap-y-4 p-6", passed ? "border-gain/40" : "border-warn/40")}>
      <div className="relative">
        <Ring value={score} size={120} stroke={11} tone={passed ? "gain" : "warn"}>
          <div className="text-center leading-none">
            <div className="num font-display text-[1.8rem] font-bold">{score}%</div>
            <div className="num mt-1 text-xs font-bold text-ink-muted">
              {correctCount} of {total}
            </div>
          </div>
        </Ring>
        {mascot && (
          <Avatar emoji={mascot} size={48} happy={passed} className="absolute -bottom-1 -right-3 ring-4 ring-card" />
        )}
      </div>
      <div className="min-w-0 flex-1 basis-60">
        <div className={cx("text-sm font-bold", passed ? "text-gain" : "text-warn")}>{passed ? "Passed!" : "Not yet"}</div>
        <h2 className="mt-0.5 text-[1.8rem]">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{children}</p>
      </div>
    </Card>
  );
}

/** Every question with a tick or cross; missed ones show the right answer. */
export function AnswerList({ questions, answers, title = "Answer review", showYours = false, renderExtra }) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 text-[1.2rem]">{title}</h3>
      <Card className="divide-y-2 divide-edge">
        {questions.map((q, i) => {
          const answer = answers[i];
          const correct = answer?.correct;
          return (
            <div key={i} className="flex items-start gap-3 px-4 py-3.5">
              <span
                className={cx(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  correct ? "bg-gain text-accent-fg" : "bg-loss text-white"
                )}
              >
                {correct ? (
                  <Check size={15} strokeWidth={3.2} aria-label="Correct" />
                ) : (
                  <X size={15} strokeWidth={3.2} aria-label="Incorrect" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-ink">{q.question}</p>
                {!correct && (
                  <div className="mt-1.5 space-y-0.5 text-[0.8125rem] leading-snug">
                    {showYours && answer && (
                      <p className="text-ink-muted">Your answer: {q.options[answer.selected]}</p>
                    )}
                    <p className="text-ink-secondary">
                      <span className="font-semibold text-gain">Correct answer:</span> {q.options[q.correct]}
                    </p>
                  </div>
                )}
                {renderExtra?.(q)}
              </div>
            </div>
          );
        })}
      </Card>
    </section>
  );
}
