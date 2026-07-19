import { Link, Navigate, useParams } from "react-router-dom";
import { getPhilosopher, philosophers } from "../data/philosophers.js";

const SPECTRUM = philosophers.filter((p) => p.spectrumPosition !== null);

// Data-driven character page — one template for all nine figures, routed by
// slug. Spectrum figures get the 1–7 position strip; layer figures (Hormozi,
// Sutton) show their layer badge instead.
export default function PhilosopherPage() {
  const { slug } = useParams();
  const philosopher = getPhilosopher(slug);
  if (!philosopher) return <Navigate to="/align" replace />;

  const { name, role, color, emoji, spectrumPosition, layer } = philosopher;

  return (
    <div className="min-h-screen p-8 max-md:p-5">
      <div className="mx-auto max-w-[640px]">
        <Link
          to="/align"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to your results
        </Link>

        {/* Header */}
        <div
          className="mb-4 animate-fade-in-down rounded-card-lg p-6"
          style={{
            background: `linear-gradient(135deg, ${color}18, #1e293b)`,
            border: `1px solid ${color}55`,
          }}
        >
          <div className="flex items-center gap-4">
            <span
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-5xl"
              style={{ background: `${color}20` }}
            >
              {emoji}
            </span>
            <div>
              <h2 className="m-0 text-3xl font-bold">{name}</h2>
              <p className="m-0 text-[0.95rem] font-semibold" style={{ color }}>
                {role}
              </p>
              {layer && (
                <span
                  className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ background: `${color}20`, color }}
                >
                  Layer: {layer}
                </span>
              )}
            </div>
          </div>

          {spectrumPosition !== null && (
            <div className="mt-5">
              <div className="mb-1.5 flex justify-between text-xs text-ink-muted">
                <span>Most conservative</span>
                <span>Most aggressive</span>
              </div>
              <div className="flex items-center gap-1.5">
                {SPECTRUM.map((p) => (
                  <div
                    key={p.slug}
                    className="h-2 flex-1 rounded-full"
                    style={{
                      background: p.slug === slug ? color : "#334155",
                      outline: p.slug === slug ? `2px solid ${color}66` : "none",
                    }}
                    title={p.name}
                  />
                ))}
              </div>
              <p className="m-0 mt-1.5 text-xs text-ink-muted">
                Position {spectrumPosition} of 7 on the risk spectrum
              </p>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="mb-4 animate-fade-in-up rounded-card-lg border border-edge bg-card p-6">
          <h3 className="m-0 mb-2 text-lg font-semibold">The story</h3>
          <p className="m-0 text-sm leading-relaxed text-ink-secondary">{philosopher.bio}</p>
        </div>

        {/* Philosophy */}
        <div
          className="mb-4 animate-fade-in-up rounded-card-lg border border-edge bg-card p-6"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="m-0 mb-2 text-lg font-semibold">The philosophy</h3>
          <p className="m-0 text-sm leading-relaxed text-ink-secondary">
            {philosopher.philosophy}
          </p>
        </div>

        {/* Books */}
        <div
          className="mb-4 animate-fade-in-up rounded-card-lg border border-edge bg-card p-6"
          style={{ animationDelay: "0.2s" }}
        >
          <h3 className="m-0 mb-3 text-lg font-semibold">📚 Signature books</h3>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {philosopher.signatureBooks.map((book) => (
              <li key={book} className="flex items-start gap-2 text-sm text-ink-secondary">
                <span style={{ color }}>▸</span>
                <span>{book}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Blind spot */}
        <div
          className="mb-4 animate-fade-in-up rounded-card-lg p-6"
          style={{
            animationDelay: "0.3s",
            background: "#f59e0b10",
            border: "1px solid #f59e0b44",
          }}
        >
          <h3 className="m-0 mb-2 text-lg font-semibold text-warning">⚠️ The blind spot</h3>
          <p className="m-0 text-sm leading-relaxed text-ink-secondary">
            {philosopher.blindSpot}
          </p>
        </div>

        {/* Recommended content — placeholder until playlists are mapped */}
        <div
          className="mb-4 animate-fade-in-up rounded-card-lg border border-dashed border-edge bg-well p-6"
          style={{ animationDelay: "0.4s" }}
        >
          <h3 className="m-0 mb-2 text-lg font-semibold">🎬 Matched learning path</h3>
          <p className="m-0 mb-3 text-sm leading-relaxed text-ink-muted">
            A curated FLearn playlist for this philosophy is coming soon. In the meantime,
            the full lesson library covers the fundamentals every school of thought agrees
            on.
          </p>
          <Link
            to="/learn"
            className="text-sm font-medium transition-transform hover:translate-x-0.5"
            style={{ color }}
          >
            Browse all lessons →
          </Link>
        </div>
      </div>
    </div>
  );
}
