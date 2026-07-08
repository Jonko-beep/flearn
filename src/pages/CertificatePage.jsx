import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getCategory } from "../data/curriculum.js";
import { useFinals, useProfile, setDisplayName } from "../lib/finals.js";

const GOLD = "#b45309";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// One-time (then editable) display name prompt shown before the certificate.
function NamePrompt({ initialName, onSave }) {
  const [name, setName] = useState(initialName ?? "");
  const trimmed = name.trim();

  return (
    <div className="animate-fade-in-up rounded-card-lg border border-edge bg-card p-8 text-center">
      <div className="mb-4 text-5xl">✍️</div>
      <h2 className="m-0 mb-2 text-2xl">Whose name goes on it?</h2>
      <p className="mx-auto mb-6 max-w-[400px] text-sm leading-relaxed text-ink-secondary">
        This name appears on this certificate and any you earn later. You can change
        it from any certificate screen.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (trimmed) onSave(trimmed);
        }}
        className="mx-auto flex max-w-[380px] flex-col gap-3"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          maxLength={60}
          autoFocus
          className="rounded-xl border border-edge bg-well px-5 py-3.5 text-center text-base text-ink outline-none transition-colors focus:border-[#f59e0b88] placeholder:text-ink-muted"
        />
        <button
          type="submit"
          disabled={!trimmed}
          className="rounded-full border-none px-8 py-3 text-[0.95rem] font-semibold transition-all duration-200"
          style={{
            background: trimmed ? "linear-gradient(135deg, #f59e0b, #d97706)" : "#334155",
            color: trimmed ? "white" : "#64748b",
            cursor: trimmed ? "pointer" : "not-allowed",
          }}
        >
          Put it on the certificate →
        </button>
      </form>
    </div>
  );
}

export default function CertificatePage() {
  const { categoryId } = useParams();
  const category = getCategory(categoryId);
  const finals = useFinals();
  const profile = useProfile();
  const [editing, setEditing] = useState(false);

  if (!category) return <Navigate to="/learn" replace />;
  const final = finals[category.id];
  if (!final?.passed) return <Navigate to={`/learn/${category.id}`} replace />;

  const needsName = !profile.name;

  return (
    <div className="min-h-screen p-6 sm:p-8 print:p-0">
      <div className="mx-auto max-w-[680px] print:max-w-none">
        <Link
          to={`/learn/${category.id}`}
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary print:hidden"
        >
          ← Back to lessons
        </Link>

        {needsName || editing ? (
          <NamePrompt
            initialName={profile.name}
            onSave={(name) => {
              setDisplayName(name);
              setEditing(false);
            }}
          />
        ) : (
          <>
            {/* Certificate — light "paper" card so it prints clean on one page */}
            <div
              className="animate-scale-in rounded-[6px] p-3 shadow-2xl print:shadow-none"
              style={{ background: "#fdfbf3", border: `1px solid ${GOLD}55` }}
            >
              <div
                className="px-6 py-10 text-center sm:px-12"
                style={{ border: `3px double ${GOLD}` }}
              >
                <div
                  className="mb-1 font-serif text-xl font-bold tracking-[0.18em]"
                  style={{ color: GOLD }}
                >
                  FLEARN
                </div>
                <div className="mb-6 text-[0.65rem] uppercase tracking-[0.3em] text-stone-400">
                  Financial Literacy for Young Adults
                </div>

                <div className="mb-4 text-7xl">{category.mascot.emoji}</div>

                <h1
                  className="m-0 mb-2 font-serif text-[clamp(1.6rem,5vw,2.2rem)] font-bold"
                  style={{ color: "#292524" }}
                >
                  Certificate of Mastery
                </h1>
                <div
                  className="mx-auto mb-6 h-px w-32"
                  style={{ background: `${GOLD}66` }}
                />

                <p className="m-0 mb-1 text-sm italic text-stone-500">
                  This certifies that
                </p>
                <p
                  className="m-0 mb-4 font-serif text-[clamp(1.3rem,4vw,1.7rem)] font-bold"
                  style={{ color: GOLD }}
                >
                  {profile.name}
                </p>
                <p className="mx-auto m-0 mb-1 max-w-[400px] text-sm leading-relaxed text-stone-500">
                  has mastered every lesson and passed the final examination in
                </p>
                <p
                  className="m-0 mb-6 font-serif text-xl font-semibold"
                  style={{ color: "#292524" }}
                >
                  {category.emoji} {category.title}
                </p>

                <div className="mx-auto mb-8 flex max-w-[360px] items-end justify-between gap-6 text-left">
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-wider text-stone-400">
                      Completed
                    </div>
                    <div className="text-sm font-semibold text-stone-600">
                      {formatDate(final.date)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[0.65rem] uppercase tracking-wider text-stone-400">
                      Final Score
                    </div>
                    <div className="text-sm font-semibold text-stone-600">
                      {final.bestScore}%
                    </div>
                  </div>
                </div>

                <div
                  className="mx-auto max-w-[360px] border-t pt-3 text-[0.7rem] tracking-[0.2em] text-stone-400"
                  style={{ borderColor: `${GOLD}33` }}
                >
                  {final.serial}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 print:hidden">
              <button
                onClick={() => window.print()}
                className="cursor-pointer rounded-full border-none px-8 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-px"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  boxShadow: "0 4px 20px #f59e0b30",
                }}
              >
                🖨️ Print / Save as PDF
              </button>
              <button
                onClick={() => setEditing(true)}
                className="cursor-pointer rounded-full border border-edge bg-transparent px-6 py-3 text-sm font-medium text-slate-200"
              >
                ✏️ Edit Name
              </button>
              <Link
                to="/learn"
                className="rounded-full border border-edge px-6 py-3 text-sm font-medium text-slate-200"
              >
                🗺️ All Categories
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
