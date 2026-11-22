import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ArrowRight, Pencil, Printer } from "lucide-react";
import { getCategory } from "../data/curriculum.js";
import { useFinals, useProfile, setDisplayName } from "../lib/finals.js";
import { Button, Card, Crumbs } from "../ui/kit.jsx";
import { Mascot } from "../ui/mascots.jsx";

// The certificate is a sheet of paper: it keeps its own fixed colours in both
// themes so that what you see is what prints.
const PAPER = "#fdfbf4";
const INK = "#1f2a37";
const SOFT = "#6b7280";
const GOLD = "#a16207";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// One-time (then editable) display name prompt shown before the certificate.
function NamePrompt({ initialName, onSave }) {
  const [name, setName] = useState(initialName ?? "");
  const trimmed = name.trim();

  return (
    <Card className="animate-enter p-6 sm:p-8">
      <h2 className="text-[1.5rem]">Whose name goes on it?</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-secondary">
        This name appears on this certificate and any you earn later. You can change it from any certificate
        screen.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (trimmed) onSave(trimmed);
        }}
        className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          aria-label="Your full name"
          maxLength={60}
          autoFocus
          className="field h-12 text-base"
        />
        <Button type="submit" size="lg" disabled={!trimmed} iconRight={ArrowRight}>
          Put it on the certificate
        </Button>
      </form>
    </Card>
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
    <div className="mx-auto max-w-[760px] print:max-w-none">
      <Crumbs
        items={[
          { label: "Learn", to: "/learn" },
          { label: category.title, to: `/learn/${category.id}` },
          { label: "Certificate" },
        ]}
      />

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
          <div
            className="animate-enter rounded-md p-3 shadow-pop print:shadow-none"
            style={{ background: PAPER, border: `1px solid ${GOLD}55` }}
          >
            <div className="px-6 py-12 text-center sm:px-14" style={{ border: `3px double ${GOLD}`, color: INK }}>
              <div className="font-display text-[1.35rem] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>
                FLEARN
              </div>
              <div className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.32em]" style={{ color: SOFT }}>
                Financial Literacy for Young Adults
              </div>

              <div
                className="mx-auto mt-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full leading-none"
                style={{ border: `2px solid ${GOLD}88`, background: `${GOLD}22` }}
              >
                <Mascot who={category.mascot.emoji} size={92} happy />
              </div>

              <div
                className="mt-8 font-display text-[clamp(1.8rem,5vw,2.5rem)] font-semibold leading-tight"
                style={{ color: INK, letterSpacing: "-0.015em" }}
              >
                Certificate of Mastery
              </div>
              <div className="mx-auto mt-4 h-px w-32" style={{ background: `${GOLD}77` }} />

              <p className="mt-7 text-[1rem] font-medium" style={{ color: SOFT }}>
                This certifies that
              </p>
              <p className="mt-1 font-display text-[clamp(1.5rem,4.5vw,2rem)] font-semibold" style={{ color: GOLD }}>
                {profile.name}
              </p>
              <p className="mx-auto mt-3 max-w-[400px] text-sm leading-relaxed" style={{ color: SOFT }}>
                has mastered every lesson and passed the final examination in
              </p>
              <p className="mt-2 font-display text-[1.35rem] font-semibold" style={{ color: INK }}>
                {category.title}
              </p>

              <div className="mx-auto mt-10 flex max-w-[380px] items-end justify-between gap-6 text-left">
                <div>
                  <div className="text-[0.65rem] font-medium uppercase tracking-[0.14em]" style={{ color: SOFT }}>
                    Completed
                  </div>
                  <div className="num mt-0.5 text-sm font-semibold" style={{ color: INK }}>
                    {formatDate(final.date)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[0.65rem] font-medium uppercase tracking-[0.14em]" style={{ color: SOFT }}>
                    Final score
                  </div>
                  <div className="num mt-0.5 text-sm font-semibold" style={{ color: INK }}>
                    {final.bestScore}%
                  </div>
                </div>
              </div>

              <div
                className="mx-auto mt-8 max-w-[380px] border-t pt-3 font-mono text-[0.68rem] tracking-[0.18em]"
                style={{ borderColor: `${GOLD}44`, color: SOFT }}
              >
                {final.serial}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5 print:hidden">
            <Button size="lg" icon={Printer} onClick={() => window.print()}>
              Print or save as PDF
            </Button>
            <Button size="lg" variant="secondary" icon={Pencil} onClick={() => setEditing(true)}>
              Edit name
            </Button>
            <Button to="/learn" size="lg" variant="ghost">
              All courses
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
