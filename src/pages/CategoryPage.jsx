import { Link } from "react-router-dom";
import { categories } from "../data/curriculum.js";
import { useProgress } from "../hooks/useProgress.js";
import CategoryCard from "../components/CategoryCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

export default function CategoryPage() {
  const { getCategoryStats, totalLessons, masteredCount, overallPercent } = useProgress();

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-[640px]">
        <Link
          to="/"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back
        </Link>

        <div className="mb-8 animate-fade-in-down">
          <h2 className="m-0 mb-1 text-3xl font-bold">Choose Your Path</h2>
          <p className="m-0 text-[0.95rem] text-ink-muted">
            What do you want to learn first?
          </p>
        </div>

        <div
          className="mb-8 rounded-xl bg-card px-5 py-4"
          style={{ animation: "fadeInDown 0.6s ease-out 0.1s both" }}
        >
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-ink-secondary">Lessons Mastered</span>
            <span className="text-sm font-semibold text-invest">
              {masteredCount}/{totalLessons} (70%+ to pass)
            </span>
          </div>
          <ProgressBar percent={overallPercent} />
        </div>

        <div className="flex flex-col gap-4">
          {categories.map((category, i) => (
            <CategoryCard
              key={category.id}
              category={category}
              stats={getCategoryStats(category)}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
