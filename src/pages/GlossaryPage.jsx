import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, SearchX } from "lucide-react";
import { glossary } from "../data/glossary.js";
import { categories, getCategory } from "../data/curriculum.js";
import { Button, Empty, PageHeader, cx } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";

// Group letter for the alphabetical headers; digits ("50/30/20 rule") land in "#".
function groupLetter(term) {
  const first = term[0].toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}

function Term({ entry }) {
  const category = getCategory(entry.categoryId);
  return (
    <div className="py-4" style={hue(category.id)}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-sans text-[1.02rem] font-semibold tracking-normal">{entry.term}</h3>
        <span className="flex items-center gap-1.5 text-[0.8125rem] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-cat" aria-hidden />
          {category.title}
        </span>
      </div>
      <p className="mt-1.5 max-w-[68ch] text-[0.95rem] leading-relaxed text-ink-secondary">{entry.definition}</p>
      <Link
        to={`/learn/${entry.categoryId}/${entry.lessonId}`}
        className="mt-2 inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-cat hover:underline"
      >
        Learn more
        <ArrowRight size={13} aria-hidden />
      </Link>
    </div>
  );
}

export default function GlossaryPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [course, setCourse] = useState("all");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = [...glossary]
      .filter(
        (entry) =>
          (course === "all" || entry.categoryId === course) &&
          (!q || entry.term.toLowerCase().includes(q) || entry.definition.toLowerCase().includes(q))
      )
      .sort((a, b) => a.term.localeCompare(b.term));

    const byLetter = new Map();
    for (const entry of matches) {
      const letter = groupLetter(entry.term);
      if (!byLetter.has(letter)) byLetter.set(letter, []);
      byLetter.get(letter).push(entry);
    }
    return [...byLetter.entries()];
  }, [query, course]);

  const matchCount = groups.reduce((sum, [, entries]) => sum + entries.length, 0);
  const filters = [{ id: "all", title: "All" }, ...categories.map((c) => ({ id: c.id, title: c.title }))];

  return (
    <div className="animate-enter">
      <PageHeader
        title="Glossary"
        subtitle={`${glossary.length} terms and growing — every word the lessons teach.`}
      />

      {/* Search + filters stay in reach while you scroll */}
      <div className="sticky top-14 z-20 -mx-4 border-b border-edge bg-canvas/95 px-4 pb-3 pt-1 backdrop-blur sm:-mx-6 sm:px-6 lg:top-0 lg:-mx-10 lg:px-10 lg:pt-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms or definitions"
              aria-label="Search the glossary"
              autoFocus={!query}
              className="field h-11 pl-10 text-[0.95rem]"
            />
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by course">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setCourse(f.id)}
                aria-pressed={course === f.id}
                className={cx(
                  "h-8 rounded-lg border px-3 text-[0.8125rem] font-medium transition-colors",
                  course === f.id
                    ? "border-accent-ink bg-accent/10 text-accent-ink"
                    : "border-edge text-ink-secondary hover:border-edge-strong hover:text-ink"
                )}
              >
                {f.title}
              </button>
            ))}
          </div>
        </div>
        {matchCount > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1">
            {groups.map(([letter]) => (
              <a
                key={letter}
                href={`#letter-${letter === "#" ? "num" : letter}`}
                className="flex h-6 min-w-6 items-center justify-center rounded px-1 font-mono text-xs font-semibold text-ink-muted transition-colors hover:bg-raised hover:text-ink"
              >
                {letter}
              </a>
            ))}
            <span className="num ml-auto text-[0.8125rem] text-ink-muted">
              {matchCount} term{matchCount === 1 ? "" : "s"}
            </span>
          </div>
        )}
      </div>

      {matchCount === 0 ? (
        <Empty
          icon={SearchX}
          title={query ? `No terms match “${query}”` : "No terms here yet"}
          className="mt-8"
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setCourse("all");
              }}
            >
              Clear search
            </Button>
          }
        >
          Try a shorter word — or maybe we haven&apos;t taught it yet.
        </Empty>
      ) : (
        <div className="mt-2">
          {groups.map(([letter, entries]) => (
            <section
              key={letter}
              id={`letter-${letter === "#" ? "num" : letter}`}
              className="grid scroll-mt-40 gap-x-6 border-b border-edge py-4 last:border-b-0 sm:grid-cols-[3.5rem_minmax(0,1fr)]"
            >
              <div className="font-display text-[2rem] font-semibold leading-none text-ink-muted sm:pt-4">{letter}</div>
              <div className="divide-y divide-edge">
                {entries.map((entry) => (
                  <Term key={entry.term} entry={entry} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
