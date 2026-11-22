import { Navigate, useParams } from "react-router-dom";
import { ArrowRight, BookMarked, TriangleAlert } from "lucide-react";
import { getPhilosopher, philosophers } from "../data/philosophers.js";
import { Badge, Button, Callout, Card, Crumbs, IconTile, cx } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";
import { philosopherIcon } from "../ui/icons.js";

const SPECTRUM = philosophers.filter((p) => p.spectrumPosition !== null);

// Data-driven character page — one template for all nine figures, routed by
// slug. Spectrum figures get the 1–7 position strip; layer figures (Hormozi,
// Sutton) show their layer badge instead.
export default function PhilosopherPage() {
  const { slug } = useParams();
  const philosopher = getPhilosopher(slug);
  if (!philosopher) return <Navigate to="/align" replace />;

  const { name, role, spectrumPosition, layer } = philosopher;

  return (
    <div className="animate-enter max-w-[920px]" style={hue("align")}>
      <Crumbs items={[{ label: "Money style", to: "/align" }, { label: name }]} />

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-5">
          <IconTile icon={philosopherIcon(slug)} size={64} />
          <div className="min-w-0 flex-1 basis-64">
            <div className="eyebrow !text-cat">{role}</div>
            <h1 className="mt-1.5 text-[2rem] sm:text-[2.5rem]">{name}</h1>
            {layer && (
              <Badge tone="cat" className="mt-2">
                Layer: {layer}
              </Badge>
            )}
          </div>
        </div>
        <p className="mt-5 max-w-[60ch] text-[1.15rem] font-medium leading-relaxed text-ink-secondary">
          {philosopher.summary}
        </p>

        {spectrumPosition !== null && (
          <div className="mt-7 max-w-[560px]">
            <div className="flex items-center gap-1.5">
              {SPECTRUM.map((p) => (
                <div
                  key={p.slug}
                  title={p.name}
                  className={cx("h-2 flex-1 rounded-full", p.slug === slug ? "bg-cat" : "bg-edge-strong")}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[0.8125rem] text-ink-muted">
              <span>Most conservative</span>
              <span className="num font-medium text-ink-secondary">Position {spectrumPosition} of 7 on the risk spectrum</span>
              <span>Most aggressive</span>
            </div>
          </div>
        )}
      </header>

      <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <Card className="p-6">
            <h2 className="text-[1.2rem]">The story</h2>
            <p className="mt-2 leading-relaxed text-ink-secondary">{philosopher.bio}</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-[1.2rem]">The philosophy</h2>
            <p className="mt-2 leading-relaxed text-ink-secondary">{philosopher.philosophy}</p>
          </Card>
          <Callout tone="warn" icon={TriangleAlert} title="The blind spot">
            {philosopher.blindSpot}
          </Callout>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="p-6">
            <h2 className="text-[1.2rem]">Signature books</h2>
            <ul className="mt-3 flex flex-col gap-2.5">
              {philosopher.signatureBooks.map((book) => (
                <li key={book} className="flex items-start gap-2.5 text-[0.95rem] text-ink-secondary">
                  <BookMarked size={16} className="mt-0.5 shrink-0 text-cat" aria-hidden />
                  <span className="font-semibold text-ink">{book}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Recommended content — placeholder until playlists are mapped */}
          <Card className="border-dashed p-6">
            <h2 className="text-[1.2rem]">Matched learning path</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              A curated FLearn playlist for this philosophy is coming soon. In the meantime, the full lesson library
              covers the fundamentals every school of thought agrees on.
            </p>
            <Button to="/learn" variant="secondary" iconRight={ArrowRight} className="mt-4">
              Browse all lessons
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
