import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { glossary } from "../data/glossary.js";
import { getCategory } from "../data/curriculum.js";

// Group letter for the alphabetical headers; digits ("50/30/20 rule") land in "#".
function groupLetter(term) {
  const first = term[0].toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}

function TermCard({ entry, index }) {
  const category = getCategory(entry.categoryId);
  return (
    <div
      className="rounded-card border border-edge bg-card p-5"
      style={{ animation: `fadeInUp 0.5s ease-out ${Math.min(index * 0.04, 0.4)}s both` }}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2.5">
        <h3 className="m-0 text-lg font-semibold">{entry.term}</h3>
        <span
          className="rounded-full px-2.5 py-1 text-xs"
          style={{ background: `${category.color}15`, color: category.color }}
        >
          {category.emoji} {category.title}
        </span>
      </div>
      <p className="m-0 mb-3 text-sm leading-relaxed text-ink-secondary">
        {entry.definition}
      </p>
      <Link
        to={`/learn/${entry.categoryId}/${entry.lessonId}`}
        className="text-sm font-medium transition-opacity hover:opacity-80"
        style={{ color: category.color }}
      >
        Learn more →
      </Link>
    </div>
  );
}

export default function GlossaryPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = [...glossary]
      .filter(
        (entry) =>
          !q ||
          entry.term.toLowerCase().includes(q) ||
          entry.definition.toLowerCase().includes(q)
      )
      .sort((a, b) => a.term.localeCompare(b.term));

    const byLetter = new Map();
    for (const entry of matches) {
      const letter = groupLetter(entry.term);
      if (!byLetter.has(letter)) byLetter.set(letter, []);
      byLetter.get(letter).push(entry);
    }
    return [...byLetter.entries()];
  }, [query]);

  const matchCount = groups.reduce((sum, [, entries]) => sum + entries.length, 0);
  let cardIndex = 0;

  return (
    <div className="min-h-screen p-8 max-md:p-5">
      <div className="mx-auto max-w-[640px]">
        <Link
          to="/learn"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to learning
        </Link>

        <div className="mb-6 animate-fade-in-down">
          <div className="flex items-center gap-3">
            <span
              className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
              style={{ background: "#7C3AED15" }}
            >
              📖
            </span>
            <div>
              <h2 className="m-0 text-3xl font-bold">Glossary</h2>
              <span className="text-sm text-ink-muted">
                {glossary.length} terms and growing — every word the lessons teach.
              </span>
            </div>
          </div>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms or definitions…"
          autoFocus={!query}
          className="mb-8 w-full rounded-xl border border-edge bg-card px-5 py-3.5 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-save"
          style={{ animation: "fadeInDown 0.6s ease-out 0.1s both" }}
        />

        {matchCount === 0 ? (
          <div className="animate-fade-in-up rounded-card-lg border border-edge bg-card p-12 text-center">
            <div className="mb-4 text-5xl">🔍</div>
            <h3 className="m-0 mb-2 text-xl">No terms match “{query}”</h3>
            <p className="m-0 mb-6 text-sm text-ink-secondary">
              Try a shorter word — or maybe we haven't taught it yet.
            </p>
            <button
              onClick={() => setQuery("")}
              className="cursor-pointer rounded-full border-none bg-save px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
            >
              Clear search
            </button>
          </div>
        ) : (
          groups.map(([letter, entries]) => (
            <section key={letter} className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-serif text-2xl font-bold text-save">{letter}</span>
                <div className="h-px flex-1 bg-edge" />
              </div>
              <div className="flex flex-col gap-3">
                {entries.map((entry) => (
                  <TermCard key={entry.term} entry={entry} index={cardIndex++} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
