import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { awardXp, recordAction } from "../lib/gamification.js";
import { checkAchievements } from "../lib/achievements.js";

const ACCENT = "#7C3AED";
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
  needs: { label: "Needs", color: "#0EA5E9", target: 50 },
  wants: { label: "Wants", color: "#EC4899", target: 30 },
  savings: { label: "Savings", color: "#10B981", target: 20 },
};

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

function StepDots({ step }) {
  return (
    <div className="mb-8 flex items-center gap-2 text-xs text-ink-muted">
      {["Income", "Allocate", "Results"].map((label, i) => {
        const active = step === i + 1;
        const done = step > i + 1;
        return (
          <span key={label} className="flex items-center gap-2">
            {i > 0 && <span className="text-edge">—</span>}
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[0.7rem] font-semibold"
              style={{
                background: active || done ? ACCENT : "#0f172a",
                color: active || done ? "#fff" : "#64748b",
              }}
            >
              {done ? "✓" : i + 1}
            </span>
            <span style={{ color: active ? "#f1f5f9" : undefined }}>{label}</span>
          </span>
        );
      })}
    </div>
  );
}

function StackedBar({ label, needsPct, wantsPct, savingsPct }) {
  const segments = [
    { pct: needsPct, ...BUCKETS.needs },
    { pct: wantsPct, ...BUCKETS.wants },
    { pct: savingsPct, ...BUCKETS.savings },
  ];
  return (
    <div className="mb-4">
      <div className="mb-1.5 text-sm font-medium text-ink-secondary">{label}</div>
      <div className="flex h-9 w-full overflow-hidden rounded-card border border-edge bg-well">
        {segments.map(
          (s) =>
            s.pct > 0 && (
              <div
                key={s.label}
                className="flex items-center justify-center overflow-hidden text-[0.7rem] font-semibold text-white transition-all duration-500 whitespace-nowrap"
                style={{ width: `${s.pct}%`, background: s.color }}
                title={`${s.label}: ${s.pct.toFixed(1)}%`}
              >
                {s.pct >= 11 && `${Math.round(s.pct)}%`}
              </div>
            )
        )}
      </div>
    </div>
  );
}

// Grade + observations + next step from Benjamin the Bear.
function buildFeedback(income, allocations) {
  const dollars = (key) => allocations[key];
  const pct = (n) => (n / income) * 100;

  const needs$ = BUDGET_CATEGORIES.filter((c) => c.bucket === "needs").reduce(
    (s, c) => s + dollars(c.key),
    0
  );
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
      `A ${Math.round(savingsPct)}% savings rate (${fmt$(savings$)}/month) clears the 20% bar — that's the single best predictor of long-term wealth.`
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

  return (
    <div className="min-h-screen p-8 max-md:p-5">
      <div className="mx-auto max-w-[640px]">
        <Link
          to="/learn/saving-budgeting"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to Saving & Budgeting
        </Link>

        <div className="mb-6 animate-fade-in-down">
          <div className="flex items-center gap-3">
            <span
              className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
              style={{ background: `${ACCENT}15` }}
            >
              🧮
            </span>
            <div>
              <h2 className="m-0 text-3xl font-bold">Build Your First Budget</h2>
              <span className="text-sm text-ink-muted">
                Allocate a month of income, then see how it stacks up against 50/30/20.
              </span>
            </div>
          </div>
        </div>

        <StepDots step={step} />

        {/* Step 1 — income */}
        {step === 1 && (
          <div
            className="rounded-card-lg border border-edge bg-card p-6"
            style={{ animation: "fadeInUp 0.5s ease-out both" }}
          >
            <h3 className="m-0 mb-1 text-xl font-semibold">
              What's your monthly after-tax income?
            </h3>
            <p className="m-0 mb-5 text-sm text-ink-secondary">
              Whatever actually lands in your account each month — a part-time gig, a
              side hustle, or a full salary all work here.
            </p>
            <div className="relative mb-2 max-w-[280px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-muted">
                $
              </span>
              <input
                type="number"
                min="0"
                step="1"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && incomeValid && goToAllocate()}
                placeholder="2,500"
                autoFocus
                className="w-full rounded-card border border-edge bg-well py-3 pl-9 pr-4 text-lg text-ink outline-none transition-colors focus:border-save"
              />
            </div>
            <p className="m-0 mb-5 min-h-[1.25rem] text-sm text-warning">
              {incomeInput !== "" && !incomeValid &&
                (income < 50
                  ? "Enter at least $50 — even a small budget deserves a plan."
                  : "That's above the $1,000,000/month cap — congrats, and try a smaller number.")}
            </p>
            <button
              onClick={goToAllocate}
              disabled={!incomeValid}
              className="rounded-card px-8 py-3 font-serif text-base font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #6D28D9)` }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2 — allocate */}
        {step === 2 && (
          <div style={{ animation: "fadeInUp 0.5s ease-out both" }}>
            <div
              className="sticky top-3 z-10 mb-4 flex items-center justify-between rounded-card-lg border bg-card px-5 py-4"
              style={{
                borderColor:
                  remaining === 0 ? "#10B98155" : remaining < 0 ? "#dc262655" : `${ACCENT}33`,
              }}
            >
              <div>
                <div className="text-xs text-ink-muted">
                  {remaining < 0 ? "Over-allocated by" : "Left to allocate"}
                </div>
                <div
                  className="font-serif text-2xl font-bold"
                  style={{
                    color: remaining === 0 ? "#10B981" : remaining < 0 ? "#ef4444" : "#f1f5f9",
                  }}
                >
                  {remaining === 0 ? "$0 — perfect ✓" : fmt$(Math.abs(remaining))}
                </div>
              </div>
              <div className="text-right text-xs text-ink-muted">
                of {fmt$(income)}/month
                {remaining > 0 && (
                  <div>
                    <button
                      onClick={() => setAllocation("savings", allocations.savings + remaining)}
                      className="mt-1 rounded-full border px-3 py-1 text-xs font-medium transition-all hover:-translate-y-px"
                      style={{ borderColor: `${ACCENT}55`, color: ACCENT, background: `${ACCENT}10` }}
                    >
                      💰 Put {fmt$(remaining)} into savings
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4 flex flex-col gap-3">
              {BUDGET_CATEGORIES.map((c) => (
                <div key={c.key} className="rounded-card border border-edge bg-card px-5 py-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor={`alloc-${c.key}`} className="text-sm font-medium text-ink">
                      {c.emoji} {c.label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
                        $
                      </span>
                      <input
                        id={`alloc-${c.key}`}
                        type="number"
                        min="0"
                        max={income}
                        step="1"
                        value={allocations[c.key]}
                        onChange={(e) => setAllocation(c.key, e.target.value)}
                        className="w-[110px] rounded-card border border-edge bg-well py-1.5 pl-7 pr-2 text-right text-sm text-ink outline-none transition-colors focus:border-save"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max={income}
                      step="1"
                      value={allocations[c.key]}
                      onChange={(e) => setAllocation(c.key, e.target.value)}
                      className="h-1.5 w-full cursor-pointer accent-save"
                      aria-label={`${c.label} slider`}
                    />
                    <span className="w-10 shrink-0 text-right text-xs text-ink-muted">
                      {income > 0 ? Math.round((allocations[c.key] / income) * 100) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-ink-muted transition-colors hover:text-ink-secondary"
              >
                ← Change income
              </button>
              <button
                onClick={goToResults}
                disabled={remaining !== 0}
                className="rounded-card px-8 py-3 font-serif text-base font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: `linear-gradient(135deg, ${ACCENT}, #6D28D9)` }}
                title={remaining !== 0 ? "Allocate every dollar to continue" : undefined}
              >
                See my results →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — results */}
        {step === 3 && feedback && (
          <div style={{ animation: "fadeInUp 0.5s ease-out both" }}>
            {/* Grade card */}
            <div
              className="mb-6 rounded-card-lg border bg-card p-6"
              style={{ borderColor: `${ACCENT}33` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-5xl">🐻</span>
                <div className="min-w-0">
                  <div className="mb-1 text-xs tracking-wide text-ink-muted uppercase">
                    Benjamin the Bear's verdict
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-serif text-5xl font-bold"
                      style={{
                        color:
                          feedback.grade === "A"
                            ? "#10B981"
                            : feedback.grade === "B"
                              ? "#0EA5E9"
                              : feedback.grade === "C"
                                ? "#f59e0b"
                                : "#ef4444",
                      }}
                    >
                      {feedback.grade}
                    </span>
                    <span className="text-base text-ink-secondary">{feedback.gradeLine}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison bars */}
            <div className="mb-6 rounded-card-lg border border-edge bg-card p-6">
              <h3 className="m-0 mb-4 text-xl font-semibold">You vs. the 50/30/20 rule</h3>
              <StackedBar
                label={`Your budget — ${fmt$(income)}/month`}
                needsPct={feedback.needsPct}
                wantsPct={feedback.wantsPct}
                savingsPct={feedback.savingsPct}
              />
              <StackedBar label="The 50/30/20 rule" needsPct={50} wantsPct={30} savingsPct={20} />
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-secondary">
                {Object.values(BUCKETS).map((b) => (
                  <span key={b.label} className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: b.color }} />
                    {b.label}
                  </span>
                ))}
              </div>
              <p className="m-0 mt-4 text-sm text-ink-secondary">
                Needs {fmt$(feedback.needs$)} ({Math.round(feedback.needsPct)}%) · Wants{" "}
                {fmt$(feedback.wants$)} ({Math.round(feedback.wantsPct)}%) · Savings{" "}
                {fmt$(feedback.savings$)} ({Math.round(feedback.savingsPct)}%)
              </p>
            </div>

            {/* FI callout */}
            {feedback.savingsPct > 30 && (
              <div
                className="mb-6 rounded-card-lg border p-5"
                style={{ borderColor: "#10B98155", background: "#10B98110" }}
              >
                <div className="mb-1 font-serif text-lg font-semibold text-success">
                  🚀 Financial independence trajectory
                </div>
                <p className="m-0 text-sm leading-relaxed text-ink-secondary">
                  A {Math.round(feedback.savingsPct)}% savings rate isn't just "good with money" —
                  it's the pace people use to buy back decades of their working life. Keep this up
                  and invest the difference, and you're playing a completely different game.
                </p>
              </div>
            )}

            {/* Observations */}
            <div className="mb-6 rounded-card-lg border border-edge bg-card p-6">
              <h3 className="m-0 mb-3 text-xl font-semibold">What Benjamin noticed</h3>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {feedback.observations.map((o, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-secondary">
                    <span className="shrink-0" style={{ color: ACCENT }}>
                      •
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
              <div
                className="mt-5 rounded-card border p-4"
                style={{ borderColor: `${ACCENT}33`, background: `${ACCENT}0d` }}
              >
                <div className="mb-1 text-xs font-semibold tracking-wide uppercase" style={{ color: ACCENT }}>
                  Your one next step
                </div>
                <p className="m-0 text-sm leading-relaxed text-ink">{feedback.nextStep}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-ink-muted transition-colors hover:text-ink-secondary"
              >
                ← Adjust my budget
              </button>
              <button
                onClick={startOver}
                className="rounded-card border border-edge px-5 py-2.5 text-sm text-ink-secondary transition-colors hover:border-save hover:text-ink"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
