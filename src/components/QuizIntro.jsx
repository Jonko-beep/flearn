import { DISCLAIMER } from "../lib/alignQuiz.js";

const COLOR = "#EC4899";

// Cold-start explainer for the alignment quiz. Deliberately says nothing about
// who the philosophers are — the match stays hidden until results.
export default function QuizIntro({ onStart }) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-4 rounded-card-lg border border-edge bg-card p-6">
        <div className="mb-4 flex items-center gap-3">
          <span
            className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
            style={{ background: `${COLOR}15` }}
          >
            🧭
          </span>
          <div>
            <h2 className="m-0 text-2xl font-bold">Who Do I Align With?</h2>
            <span className="text-sm text-ink-muted">15 questions · about 3 minutes</span>
          </div>
        </div>
        <p className="m-0 mb-3 text-[0.95rem] leading-relaxed text-ink-secondary">
          There's no single right way to handle money — but there are distinct schools of
          thought, each championed by a well-known voice in personal finance. This quiz reads
          your honest instincts, not your knowledge, and matches you to the philosophy that
          fits how you actually think.
        </p>
        <p className="m-0 mb-3 text-[0.95rem] leading-relaxed text-ink-secondary">
          You'll also get a separate read on your current financial <em>stage</em> — because
          what you're drawn to and what your situation supports aren't always the same thing,
          and knowing the difference is half the battle.
        </p>
        <p className="m-0 text-[0.95rem] leading-relaxed text-ink-secondary">
          Answer with your gut. There are no wrong answers and no score to beat — just a
          mirror.
        </p>
      </div>

      <div className="mb-6 rounded-card border border-edge bg-well p-4">
        <p className="m-0 text-[0.8rem] leading-relaxed text-ink-muted">{DISCLAIMER}</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStart}
          className="cursor-pointer rounded-full border-none px-8 py-3 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px"
          style={{ background: COLOR }}
        >
          Start the Quiz →
        </button>
      </div>
    </div>
  );
}
