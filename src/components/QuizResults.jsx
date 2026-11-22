import { Link } from "react-router-dom";
import { ArrowRight, Hammer, Landmark, Layers, RotateCcw, TriangleAlert, Waves } from "lucide-react";
import { getPhilosopher } from "../data/philosophers.js";
import { DISCLAIMER } from "../lib/alignQuiz.js";
import { Button, Callout, Card, IconTile, cx } from "../ui/kit.jsx";
import { philosopherIcon } from "../ui/icons.js";

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

function LinkedCallout({ icon, tone = "neutral", title, children, to, linkLabel }) {
  return (
    <Callout icon={icon} tone={tone} title={title}>
      {children}
      {to && (
        <Link to={to} className="mt-2 flex items-center gap-1 font-semibold text-ink hover:underline">
          {linkLabel}
          <ArrowRight size={14} aria-hidden />
        </Link>
      )}
    </Callout>
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
    <div className="animate-enter flex flex-col gap-4">
      {/* 1. Verdict */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start gap-5">
          <IconTile icon={philosopherIcon(primary.slug)} size={64} />
          <div className="min-w-0 flex-1 basis-64">
            <div className="eyebrow !text-cat">You align with</div>
            <h2 className="mt-1.5 text-[2rem]">{primary.name}</h2>
            <p className="num mt-1 text-sm font-semibold text-ink-secondary">
              {primary.role} · {primaryAffinity.percent}% affinity
            </p>
            <p className="mt-3 text-[1.05rem] font-medium leading-relaxed text-ink-secondary">
              {primary.summary}
            </p>
          </div>
        </div>
        {/* 6. CTAs */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Button to={`/align/${primary.slug}`} size="lg" iconRight={ArrowRight}>
            Meet {primary.name}
          </Button>
          <Button to={learningPath} size="lg" variant="secondary">
            Start {primary.name}&apos;s learning path
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* 2. Affinity bars — all seven, sorted */}
        <Card className="p-5 sm:p-6">
          <h3 className="text-[1.15rem]">Your full spectrum</h3>
          <div className="mt-4 flex flex-col gap-3.5">
            {result.affinities.map(({ archetype, percent }) => {
              const p = getPhilosopher(archetype);
              const isPrimary = archetype === result.primary;
              return (
                <div key={archetype}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <Link
                      to={`/align/${p.slug}`}
                      className={cx("hover:underline", isPrimary ? "font-semibold text-ink" : "text-ink-secondary")}
                    >
                      {p.name}
                    </Link>
                    <span className={cx("num font-semibold", isPrimary ? "text-cat" : "text-ink-muted")}>{percent}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-edge">
                    <div
                      className={cx("h-full rounded-full transition-[width] duration-700 ease-out", isPrimary ? "bg-cat" : "bg-ink-muted/60")}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          {/* 3. Temperament vs. stage */}
          <Card className="p-5 sm:p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="eyebrow">Your temperament</div>
                <div className="mt-1.5 font-display text-[1.35rem] font-semibold">{result.temperament}</div>
              </div>
              <div>
                <div className="eyebrow">Your current stage</div>
                <div className="mt-1.5 font-display text-[1.35rem] font-semibold">{result.stage}</div>
              </div>
            </div>
            {result.mismatchNote && (
              <p className="mt-4 rounded-lg border-l-[3px] border-warn bg-warn/[0.07] px-4 py-3 text-sm leading-relaxed text-ink-secondary">
                {result.mismatchNote}
              </p>
            )}
          </Card>

          {/* 4. Blind spot */}
          <Callout tone="warn" icon={TriangleAlert} title={`The ${primary.role.replace("The ", "")}'s blind spot`}>
            {primary.blindSpot}
          </Callout>
        </div>
      </div>

      {/* 5. Triggered callouts */}
      {result.entFlag && (
        <LinkedCallout icon={Hammer} title="Builder tendencies detected" to="/align/hormozi" linkLabel="Meet Alex Hormozi">
          Several of your answers point at creating income, not just managing it. That&apos;s a different skill tree —
          offers, operations, and scale — and it has its own guide.
        </LinkedCallout>
      )}
      {result.protectionUnlocked && (
        <LinkedCallout icon={Landmark} title="Protect what you're building" to="/align/sutton" linkLabel="Meet Garrett Sutton">
          You operate a business or hold (or plan to hold) investment assets. Before you scale further, it&apos;s
          worth learning how entities and structure protect what you&apos;ve built.
        </LinkedCallout>
      )}
      {result.contentFlags.includes("volatility-basics") && (
        <LinkedCallout icon={Waves} title="Start with market volatility basics">
          You told us you&apos;ve never had real money at risk in a downturn. That&apos;s not a flaw — it just means
          the smartest first step is understanding how markets move before you find out live.
        </LinkedCallout>
      )}
      {result.contentFlags.includes("secure-base") && (
        <LinkedCallout icon={Layers} title="Build your secure base">
          Your cash cushion covers less than three months. Whatever philosophy you align with, every one of them
          agrees on this: a bigger buffer buys you options.
        </LinkedCallout>
      )}

      {/* 7. Disclaimer + 8. Retake */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-t border-edge pt-5">
        <p className="max-w-[60ch] flex-1 basis-72 text-[0.8125rem] leading-relaxed text-ink-muted">{DISCLAIMER}</p>
        <Button variant="ghost" size="sm" icon={RotateCcw} onClick={onRetake}>
          Retake the quiz
        </Button>
      </div>
    </div>
  );
}
