import { Link } from "react-router-dom";
import { getPhilosopher } from "../data/philosophers.js";
import { DISCLAIMER } from "../lib/alignQuiz.js";

// TODO(Aaron): map each archetype to a real FLearn playlist route (existing
// video embeds). While an entry is null the CTA falls back to /learn.
const LEARNING_PATHS = {
  ramsey: null,
  orman: null,
  sethi: null,
  housel: null,
  stephan: null,
  kiyosaki: null,
  cardone: null,
};

function Callout({ emoji, color, title, children, to, linkLabel }) {
  return (
    <div
      className="mb-4 rounded-card-lg p-5"
      style={{ background: `${color}10`, border: `1px solid ${color}44` }}
    >
      <div className="mb-1 flex items-center gap-2 text-[0.95rem] font-semibold" style={{ color }}>
        <span>{emoji}</span>
        <span>{title}</span>
      </div>
      <p className="m-0 text-sm leading-relaxed text-ink-secondary">{children}</p>
      {to && (
        <Link
          to={to}
          className="mt-2 inline-block text-sm font-medium transition-transform hover:translate-x-0.5"
          style={{ color }}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

// Full results screen — the first place philosopher names ever appear.
// Section order follows the feature spec: verdict, affinity bars, temperament
// vs. stage, blind spot, triggered callouts, CTAs, disclaimer, retake.
export default function QuizResults({ result, onRetake }) {
  const primary = getPhilosopher(result.primary);
  const primaryAffinity = result.affinities[0];
  const learningPath = LEARNING_PATHS[result.primary] ?? "/learn";

  return (
    <div className="animate-fade-in-up">
      {/* 1. Verdict card */}
      <div
        className="mb-4 rounded-card-lg p-6 text-center"
        style={{
          background: `linear-gradient(135deg, ${primary.color}18, #1e293b)`,
          border: `1px solid ${primary.color}55`,
        }}
      >
        <span
          className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full text-5xl"
          style={{ background: `${primary.color}20` }}
        >
          {primary.emoji}
        </span>
        <p className="m-0 mb-1 text-sm text-ink-muted">You align with</p>
        <h2 className="m-0 mb-1 text-3xl font-bold">{primary.name}</h2>
        <p className="m-0 mb-3 text-sm font-semibold" style={{ color: primary.color }}>
          {primary.role} · {primaryAffinity.percent}% affinity
        </p>
        <p className="m-0 text-[0.95rem] leading-relaxed text-ink-secondary">
          {primary.summary}
        </p>
      </div>

      {/* 2. Affinity bars — all seven, sorted */}
      <div className="mb-4 rounded-card-lg border border-edge bg-card p-6">
        <h3 className="m-0 mb-4 text-lg font-semibold">Your full spectrum</h3>
        <div className="flex flex-col gap-3">
          {result.affinities.map(({ archetype, percent }) => {
            const p = getPhilosopher(archetype);
            return (
              <div key={archetype}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-ink-secondary">
                    {p.emoji} {p.name}
                  </span>
                  <span className="font-semibold" style={{ color: p.color }}>
                    {percent}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-well">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${percent}%`, background: p.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Temperament vs. stage */}
      <div className="mb-4 rounded-card-lg border border-edge bg-card p-6">
        <p className="m-0 text-[0.95rem] leading-relaxed text-ink">
          Your temperament: <strong>{result.temperament}</strong>. Your current stage:{" "}
          <strong>{result.stage}</strong>.
        </p>
        {result.mismatchNote && (
          <p className="m-0 mt-3 rounded-[10px] border-l-[3px] border-warning bg-well p-4 text-sm leading-relaxed text-ink-secondary">
            {result.mismatchNote}
          </p>
        )}
      </div>

      {/* 4. Blind spot */}
      <div className="mb-4 rounded-card-lg border border-edge bg-card p-6">
        <h3 className="m-0 mb-2 text-lg font-semibold">
          ⚠️ The {primary.role.replace("The ", "")}'s blind spot
        </h3>
        <p className="m-0 text-sm leading-relaxed text-ink-secondary">{primary.blindSpot}</p>
      </div>

      {/* 5. Triggered callouts */}
      {result.entFlag && (
        <Callout
          emoji="🏗️"
          color="#F59E0B"
          title="Builder tendencies detected"
          to="/align/hormozi"
          linkLabel="Meet Alex Hormozi"
        >
          Several of your answers point at creating income, not just managing it. That's a
          different skill tree — offers, operations, and scale — and it has its own guide.
        </Callout>
      )}
      {result.protectionUnlocked && (
        <Callout
          emoji="🏛️"
          color="#64748B"
          title="Protect What You're Building"
          to="/align/sutton"
          linkLabel="Meet Garrett Sutton"
        >
          You operate a business or hold (or plan to hold) investment assets. Before you
          scale further, it's worth learning how entities and structure protect what you've
          built.
        </Callout>
      )}
      {result.contentFlags.includes("volatility-basics") && (
        <Callout emoji="🌊" color="#3B82F6" title="Start with market volatility basics">
          You told us you've never had real money at risk in a downturn. That's not a flaw —
          it just means the smartest first step is understanding how markets move before you
          find out live.
        </Callout>
      )}
      {result.contentFlags.includes("secure-base") && (
        <Callout emoji="🧱" color="#0D9488" title="Build your secure base">
          Your cash cushion covers less than three months. Whatever philosophy you align
          with, every one of them agrees on this: a bigger buffer buys you options.
        </Callout>
      )}

      {/* 6. CTAs */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          to={`/align/${primary.slug}`}
          className="rounded-full border-none px-6 py-3 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px"
          style={{ background: primary.color }}
        >
          Meet {primary.name} →
        </Link>
        <Link
          to={learningPath}
          className="rounded-full border px-6 py-3 text-[0.95rem] font-semibold transition-all duration-200 hover:-translate-y-px"
          style={{ borderColor: `${primary.color}66`, color: primary.color }}
        >
          Start {primary.name}'s learning path →
        </Link>
      </div>

      {/* 7. Disclaimer */}
      <div className="mb-6 rounded-card border border-edge bg-well p-4">
        <p className="m-0 text-[0.8rem] leading-relaxed text-ink-muted">{DISCLAIMER}</p>
      </div>

      {/* 8. Retake */}
      <div className="text-center">
        <button
          onClick={onRetake}
          className="cursor-pointer border-none bg-transparent text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ↺ Retake the quiz
        </button>
      </div>
    </div>
  );
}
