import { Link } from "react-router-dom";
import { useFinals } from "../lib/finals.js";

export default function CategoryCard({ category, stats, index }) {
  const passedFinal = useFinals()[category.id]?.passed;

  return (
    <Link
      to={`/learn/${category.id}`}
      className="group relative block overflow-hidden rounded-card-lg bg-card p-6 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        border: `1px solid ${category.color}22`,
        animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s both`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${category.color}55`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${category.color}22`)}
    >
      <div className="pointer-events-none absolute -top-8 -right-5 text-[6rem] opacity-[0.06]">
        {category.emoji}
      </div>
      <div className="relative">
        <div className="mb-2 flex items-center gap-3">
          <span
            className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
            style={{ background: `${category.color}15` }}
          >
            {category.emoji}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-ink">
              {category.title}
              {passedFinal && (
                <span className="ml-2 text-base" title="Final exam passed — certificate earned">
                  🎓
                </span>
              )}
            </h3>
            <span className="text-sm text-ink-muted">
              {stats.mastered}/{stats.total} mastered
            </span>
          </div>
          <span
            className="ml-auto text-xl transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: category.color }}
          >
            →
          </span>
        </div>
        <p className="m-0 text-sm leading-relaxed text-ink-secondary">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
