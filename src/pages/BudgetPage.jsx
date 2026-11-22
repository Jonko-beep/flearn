import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, PiggyBank, RotateCcw, Rocket } from "lucide-react";
import { awardXp, recordAction } from "../lib/gamification.js";
import { checkAchievements } from "../lib/achievements.js";
import { ToolHeader, Insight } from "../components/CalcKit.jsx";
import { Avatar, Button, Callout, Card, cx } from "../ui/kit.jsx";
import { color } from "../ui/theme.js";

const STORAGE_KEY = "flearn_budget";

// bucket maps each category onto the 50/30/20 rule
export const BUDGET_CATEGORIES = [
  { key: "housing", label: "Housing", emoji: "🏠", bucket: "needs" },
  { key: "food", label: "Food", emoji: "🍎", bucket: "needs" },
  { key: "transportation", label: "Transportation", emoji: "🚗", bucket: "needs" },
  { key: "insurance", label: "Insurance & Health", emoji: "🏥", bucket: "needs" },
  { key: "debt", label: "Debt Payments", emoji: "💳", bucket: "needs" },
  { key: "fun", label: "Fun & Entertainment", emoji: "🎉", bucket: "wants" },
  { key: "subscriptions", label: "Subscriptions", emoji: "📺", bucket: "wants" },
  { key: "savings", label: "Savings & Investing", emoji: "💰", bucket: "savings" },
];

const BUCKETS = {
  needs: { label: "Needs", color: color("chart-2"), target: 50 },
  wants: { label: "Wants", color: color("warn"), target: 30 },
  savings: { label: "Savings", color: color("accent"), target: 20 },
};
const BUCKET_ORDER = ["needs", "wants", "savings"];

function emptyAllocations() {
  return Object.fromEntries(BUDGET_CATEGORIES.map((c) => [c.key, 0]));
}

function readBudget() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.income !== "number" || parsed.income <= 0) return null;
    return { income: Math.round(parsed.income), allocations: { ...emptyAllocations(), ...parsed.allocations } };
  } catch {
    return null;
  }
}

function writeBudget(budget) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budget));
  } catch {
    // storage unavailable — the exercise still works, it just won't persist
  }
}

function fmt$(n) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function Steps({ step }) {
  return (
    <ol className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8125rem]">
      {["Income", "Allocate", "Results"].map((label, i) => {
        const active = step === i + 1;
        const done = step > i + 1;
        return (
          <li key={label} className="flex items-center gap-3">
            {i > 0 && <span className="h-px w-6 bg-edge-strong" aria-hidden />}
            <span className="flex items-center gap-2">
              <span
                className={cx(
                  "num flex h-6 w-6 items-center justify-center rounded-full text-2xs font-bold",
                  active || done ? "bg-accent text-accent-fg" : "border border-edge-strong text-ink-muted"
                )}
              >
                {done ? <Check size={12} strokeWidth={3} aria-hidden /> : i + 1}
              </span>
              <span className={active ? "font-semibold text-ink" : "text-ink-muted"}>{label}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StackedBar({ label, pcts }) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-ink-secondary">{label}</div>
      <div className="flex h-9 w-full overflow-hidden rounded-lg bg-edge">
        {BUCKET_ORDER.map((key) => {
          const pct = pcts[key];
          if (pct <= 0) return null;
          return (
            <div
              key={key}
              className="num flex items-center justify-center overflow-hidden whitespace-nowrap border-r-2 border-card text-2xs font-bold text-canvas transition-[width] duration-500 last:border-r-0"
              style={{ width: `${pct}%`, background: BUCKETS[key].color }}
              title={`${BUCKETS[key].label}: ${pct.toFixed(1)}%`}
            >
              {pct >= 11 && `${Math.round(pct)}%`}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Grade + observations + next step from Benjamin the Bear.
function buildFeedback(income, allocations) {
  const dollars = (key) => allocations[key];
  const pct = (n) => (n / income) * 100;

  const needs$ = BUDGET_CATEGORIES.filter((c) => c.bucket === "needs").reduce((s, c) => s + dollars(c.key), 0);
  const wants$ = dollars("fun") + dollars("subscriptions");
  const savings$ = dollars("savings");
  const needsPct = pct(needs$);
  const wantsPct = pct(wants$);
  const savingsPct = pct(savings$);
  const housingPct = pct(dollars("housing"));
  const debtPct = pct(dollars("debt"));
  const subsPct = pct(dollars("subscriptions"));

  let grade;
  if (savingsPct >= 18 && needsPct <= 58 && wantsPct <= 35) grade = "A";
  else if (savingsPct >= 12 && needsPct <= 68) grade = "B";
  else if (savingsPct >= 5) grade = "C";
  else grade = "D";

  const gradeLines = {
    A: "This is a budget Warren would shake your hand for.",
    B: "Solid foundation — a couple of tweaks and you're in A territory.",
    C: "You've got the bones of a budget. Let's strengthen the savings muscle.",
    D: "No judgment — most people never even look. Now you have, and we can fix it.",
  };

  // Observations, most important first; we show the top 3.
  const observations = [];
  if (savingsPct >= 30) {
    observations.push(
      `You're saving ${fmt$(savings$)} a month — a ${Math.round(savingsPct)}% savings rate, way past the classic 20% target.`
    );
  } else if (savingsPct >= 20) {
    observations.push(
      `A ${Math.round(savingsPct)}% savings rate (${fmt$(savings$)}/month) clears the 20% bar — and your savings rate is one of the biggest drivers of long-term wealth.`
    );
  } else if (savingsPct < 10) {
    observations.push(
      `Savings is getting ${fmt$(savings$)} — ${Math.round(savingsPct)}% of your income. The 50/30/20 rule aims for 20%, and paying yourself first is the habit that matters most.`
    );
  }
  if (housingPct > 35) {
    observations.push(
      `Housing takes ${fmt$(dollars("housing"))} — ${Math.round(housingPct)}% of your income. Above ~35%, rent crowds out everything else; roommates or a cheaper place is the biggest lever you have.`
    );
  }
  if (needsPct > 55) {
    observations.push(
      `Your needs add up to ${fmt$(needs$)} (${Math.round(needsPct)}% vs. the 50% guideline). When essentials run high, the fix is usually one big cost — not skipping coffee.`
    );
  } else if (needsPct <= 50 && savingsPct < 20) {
    observations.push(
      `Your needs are only ${Math.round(needsPct)}% of income — nicely under the 50% line. That headroom is a gift: it can flow straight into savings.`
    );
  }
  if (wantsPct > 30) {
    observations.push(
      `Fun and subscriptions total ${fmt$(wants$)} a month (${Math.round(wantsPct)}%, vs. the 30% lane). Enjoying your money is the point — just make sure it's on purpose.`
    );
  }
  if (subsPct > 5) {
    observations.push(
      `Subscriptions alone are ${fmt$(dollars("subscriptions"))}/month — that's ${fmt$(dollars("subscriptions") * 12)} a year on autopilot. Worth an audit.`
    );
  }
  if (debtPct > 15) {
    observations.push(
      `Debt payments claim ${fmt$(dollars("debt"))} (${Math.round(debtPct)}%). Knocking out the highest-APR balance first frees that cash for good.`
    );
  }
  if (observations.length < 2) {
    observations.push(
      `Your split lands at ${Math.round(needsPct)}% needs / ${Math.round(wantsPct)}% wants / ${Math.round(savingsPct)}% savings against the 50/30/20 benchmark.`
    );
  }

  // One concrete next step.
  let nextStep;
  if (savingsPct < 20) {
    const gap = Math.max(1, Math.round(income * 0.2 - savings$));
    const donor =
      dollars("subscriptions") >= gap
        ? "subscriptions"
        : dollars("fun") >= gap
          ? "fun & entertainment"
          : "your wants categories";
    nextStep = `Move ${fmt$(gap)} a month from ${donor} into savings and you hit the 20% mark. Set the transfer to run automatically on payday so it happens before you can spend it.`;
  } else if (housingPct > 35) {
    nextStep = `Your savings rate is strong, so aim at the big one: getting housing from ${Math.round(housingPct)}% toward 30% of income would free ${fmt$(dollars("housing") - income * 0.3)} every month.`;
  } else {
    nextStep = `Make it automatic: schedule a ${fmt$(savings$)} transfer to a high-yield savings account on payday (see the HYSA lesson) so this budget runs itself.`;
  }

  return {
    grade,
    gradeLine: gradeLines[grade],
    observations: observations.slice(0, 3),
    nextStep,
    needs$,
    wants$,
    savings$,
    needsPct,
    wantsPct,
    savingsPct,
  };
}

const GRADE_TONE = { A: "text-gain", B: "text-accent-ink", C: "text-warn", D: "text-loss" };

export default function BudgetPage() {
  const saved = useMemo(readBudget, []);
  const [step, setStep] = useState(1);
  const [incomeInput, setIncomeInput] = useState(saved ? String(saved.income) : "");
  const [allocations, setAllocations] = useState(saved?.allocations ?? emptyAllocations());

  const income = Math.round(parseFloat(incomeInput) || 0);
  const incomeValid = Number.isFinite(income) && income >= 50 && income <= 1000000;

  const allocated = BUDGET_CATEGORIES.reduce((s, c) => s + allocations[c.key], 0);
  const remaining = income - allocated;

  const setAllocation = (key, value) => {
    const n = Math.max(0, Math.min(income, Math.round(Number(value) || 0)));
    setAllocations((prev) => ({ ...prev, [key]: n }));
  };

  const goToAllocate = () => {
    // clamp any stale allocations if income shrank since last visit
    setAllocations((prev) => {
      const next = { ...prev };
      for (const c of BUDGET_CATEGORIES) next[c.key] = Math.min(next[c.key], income);
      return next;
    });
    writeBudget({ income, allocations });
    setStep(2);
  };

  const goToResults = () => {
    writeBudget({ income, allocations, completedAt: new Date().toISOString() });
    recordAction(); // completing the exercise counts toward the daily streak
    awardXp(50, "Budget Built!", "budget:first");
    checkAchievements();
    setStep(3);
  };

  const startOver = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIncomeInput("");
    setAllocations(emptyAllocations());
    setStep(1);
  };

  const feedback = step === 3 ? buildFeedback(income, allocations) : null;
  const bucketTotal = (bucket) =>
    BUDGET_CATEGORIES.filter((c) => c.bucket === bucket).reduce((s, c) => s + allocations[c.key], 0);

  return (
    <div className="animate-enter">
      <ToolHeader
        tool="budget"
        hueKey="saving"
        title="Build your first budget"
        tagline="Allocate a month of income, then see how it stacks up against 50/30/20."
      />

      <Steps step={step} />

      {/* Step 1 — income */}
      {step === 1 && (
        <Card className="max-w-[640px] animate-enter p-6 sm:p-8">
          <h2 className="text-[1.5rem]">What&apos;s your monthly after-tax income?</h2>
          <p className="mt-2 leading-relaxed text-ink-secondary">
            Whatever actually lands in your account each month — a part-time gig, a side hustle, or a full salary all
            work here.
          </p>
          <div className="relative mt-6 max-w-[280px]">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-muted">$</span>
            <input
              type="number"
              min="0"
              step="1"
              value={incomeInput}
              onChange={(e) => setIncomeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && incomeValid && goToAllocate()}
              placeholder="2,500"
              aria-label="Monthly after-tax income"
              autoFocus
              className="field num h-14 pl-9 text-[1.3rem] font-semibold"
            />
          </div>
          <p className="mt-2 min-h-[1.25rem] text-sm text-warn" role="alert">
            {incomeInput !== "" &&
              !incomeValid &&
              (income < 50
                ? "Enter at least $50 — even a small budget deserves a plan."
                : "That's above the $1,000,000/month cap — congrats, and try a smaller number.")}
          </p>
          <Button size="lg" iconRight={ArrowRight} onClick={goToAllocate} disabled={!incomeValid} className="mt-3">
            Continue
          </Button>
        </Card>
      )}

      {/* Step 2 — allocate */}
      {step === 2 && (
        <div className="grid animate-enter items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <Card className="divide-y divide-edge">
            {BUDGET_CATEGORIES.map((c) => {
              const share = income > 0 ? (allocations[c.key] / income) * 100 : 0;
              return (
                <div key={c.key} className="px-4 py-3.5 sm:px-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-raised text-base" aria-hidden>
                      {c.emoji}
                    </span>
                    <label htmlFor={`alloc-${c.key}`} className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-ink">{c.label}</span>
                      <span className="flex items-center gap-1.5 text-2xs text-ink-muted">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: BUCKETS[c.bucket].color }} />
                        {BUCKETS[c.bucket].label}
                      </span>
                    </label>
                    <span className="num hidden w-10 text-right text-[0.8125rem] text-ink-muted sm:block">
                      {Math.round(share)}%
                    </span>
                    <div className="relative shrink-0">
                      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-ink-muted">$</span>
                      <input
                        id={`alloc-${c.key}`}
                        type="number"
                        min="0"
                        max={income}
                        step="1"
                        value={allocations[c.key]}
                        onChange={(e) => setAllocation(c.key, e.target.value)}
                        className="field num h-9 w-[112px] pl-6 pr-2.5 text-right font-semibold"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={income}
                    step="1"
                    value={allocations[c.key]}
                    onChange={(e) => setAllocation(c.key, e.target.value)}
                    className="slider mt-2"
                    style={{ "--pct": `${share}%` }}
                    aria-label={`${c.label} slider`}
                  />
                </div>
              );
            })}
          </Card>

          {/* Running total — stays in view while you allocate */}
          <aside className="flex flex-col gap-3 lg:sticky lg:top-8">
            <Card
              className={cx(
                "p-5",
                remaining === 0 ? "border-gain/50" : remaining < 0 ? "border-loss/50" : undefined
              )}
            >
              <div className="eyebrow">{remaining < 0 ? "Over-allocated by" : "Left to allocate"}</div>
              <div
                className={cx(
                  "num mt-1.5 flex items-center gap-2 font-display text-[2rem] font-semibold leading-none",
                  remaining === 0 ? "text-gain" : remaining < 0 ? "text-loss" : "text-ink"
                )}
              >
                {fmt$(Math.abs(remaining))}
                {remaining === 0 && <Check size={22} strokeWidth={2.6} aria-label="Every dollar allocated" />}
              </div>
              <div className="num mt-1.5 text-[0.8125rem] text-ink-muted">of {fmt$(income)} a month</div>

              <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-edge" aria-hidden>
                {BUCKET_ORDER.map((key) => (
                  <div
                    key={key}
                    className="h-full transition-[width] duration-300"
                    style={{ width: `${income > 0 ? Math.min(100, (bucketTotal(key) / income) * 100) : 0}%`, background: BUCKETS[key].color }}
                  />
                ))}
              </div>
              <dl className="num mt-3 space-y-1.5 text-[0.8125rem]">
                {BUCKET_ORDER.map((key) => (
                  <div key={key} className="flex items-center justify-between">
                    <dt className="flex items-center gap-1.5 text-ink-secondary">
                      <span className="h-2 w-2 rounded-sm" style={{ background: BUCKETS[key].color }} />
                      {BUCKETS[key].label}
                      <span className="text-ink-muted">· aim {BUCKETS[key].target}%</span>
                    </dt>
                    <dd className="font-semibold text-ink">
                      {income > 0 ? Math.round((bucketTotal(key) / income) * 100) : 0}%
                    </dd>
                  </div>
                ))}
              </dl>

              {remaining > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={PiggyBank}
                  className="mt-4 w-full"
                  onClick={() => setAllocation("savings", allocations.savings + remaining)}
                >
                  Put {fmt$(remaining)} into savings
                </Button>
              )}
            </Card>

            <Button
              size="lg"
              iconRight={ArrowRight}
              onClick={goToResults}
              disabled={remaining !== 0}
              title={remaining !== 0 ? "Allocate every dollar to continue" : undefined}
            >
              See my results
            </Button>
            <Button variant="ghost" icon={ArrowLeft} onClick={() => setStep(1)}>
              Change income
            </Button>
          </aside>
        </div>
      )}

      {/* Step 3 — results */}
      {step === 3 && feedback && (
        <div className="flex max-w-[860px] animate-enter flex-col gap-4">
          <Card className="flex flex-wrap items-center gap-x-6 gap-y-4 p-6">
            <div
              className={cx(
                "flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-edge bg-raised font-display text-[3rem] font-semibold leading-none",
                GRADE_TONE[feedback.grade]
              )}
              aria-label={`Grade ${feedback.grade}`}
            >
              {feedback.grade}
            </div>
            <div className="min-w-0 flex-1 basis-60">
              <div className="flex items-center gap-2">
                <Avatar emoji="🐻" size={24} hueKey="saving" />
                <span className="eyebrow">Benjamin the Bear&apos;s verdict</span>
              </div>
              <p className="mt-2 font-display text-[1.35rem] leading-snug text-ink">{feedback.gradeLine}</p>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <h2 className="text-[1.2rem]">You vs. the 50/30/20 rule</h2>
            <div className="mt-5 flex flex-col gap-4">
              <StackedBar
                label={`Your budget — ${fmt$(income)}/month`}
                pcts={{ needs: feedback.needsPct, wants: feedback.wantsPct, savings: feedback.savingsPct }}
              />
              <StackedBar label="The 50/30/20 rule" pcts={{ needs: 50, wants: 30, savings: 20 }} />
            </div>
            <dl className="num mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-edge bg-edge">
              {[
                ["needs", feedback.needs$, feedback.needsPct],
                ["wants", feedback.wants$, feedback.wantsPct],
                ["savings", feedback.savings$, feedback.savingsPct],
              ].map(([key, dollars, pct]) => (
                <div key={key} className="bg-card px-4 py-3">
                  <dt className="flex items-center gap-1.5 text-[0.8125rem] text-ink-secondary">
                    <span className="h-2 w-2 rounded-sm" style={{ background: BUCKETS[key].color }} />
                    {BUCKETS[key].label}
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">
                    {fmt$(dollars)} <span className="font-normal text-ink-muted">· {Math.round(pct)}%</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          {feedback.savingsPct > 30 && (
            <Callout tone="gain" icon={Rocket} title="Financial independence trajectory">
              A {Math.round(feedback.savingsPct)}% savings rate isn&apos;t just &quot;good with money&quot; — it&apos;s
              the pace people use to buy back decades of their working life. Keep this up and invest the difference, and
              you&apos;re playing a completely different game.
            </Callout>
          )}

          <Card className="p-5 sm:p-6">
            <h2 className="text-[1.2rem]">What Benjamin noticed</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {feedback.observations.map((o, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-ink-secondary">
                  <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cat" style={{ "--cat": "var(--cat-saving)" }} />
                  {o}
                </li>
              ))}
            </ul>
          </Card>

          <Insight title="Your one next step">{feedback.nextStep}</Insight>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button variant="secondary" icon={ArrowLeft} onClick={() => setStep(2)}>
              Adjust my budget
            </Button>
            <Button variant="ghost" icon={RotateCcw} onClick={startOver}>
              Start over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
