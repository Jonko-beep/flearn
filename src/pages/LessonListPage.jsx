import { Link, Navigate, useParams } from "react-router-dom";
import { getCategory } from "../data/curriculum.js";
import { useProgress } from "../hooks/useProgress.js";
import LessonCard from "../components/LessonCard.jsx";
import MascotCard from "../components/MascotCard.jsx";

export default function LessonListPage() {
  const { categoryId } = useParams();
  const category = getCategory(categoryId);
  const { getLessonProgress } = useProgress();

  if (!category) return <Navigate to="/learn" replace />;

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-[640px]">
        <Link
          to="/learn"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to categories
        </Link>

        <div className="mb-6 animate-fade-in-down">
          <div className="flex items-center gap-3">
            <span
              className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
              style={{ background: `${category.color}15` }}
            >
              {category.emoji}
            </span>
            <h2 className="m-0 text-3xl font-bold">{category.title}</h2>
          </div>
        </div>

        <MascotCard mascot={category.mascot} color={category.color} />

        <div className="flex flex-col gap-3">
          {category.id === "saving-budgeting" && (
            <Link
              to="/tools/budget"
              className="flex items-center gap-4 rounded-card bg-card p-5 transition-all duration-300 hover:-translate-y-px"
              style={{
                border: `1px solid ${category.color}44`,
                animation: "fadeInUp 0.5s ease-out 0.1s both",
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg"
                style={{ background: `${category.color}15` }}
              >
                🧮
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="m-0 mb-0.5 font-sans text-base font-semibold tracking-normal text-ink">
                  Practice: Build Your First Budget
                </h4>
                <p className="m-0 text-sm text-ink-muted">
                  Allocate a real paycheck and get graded against the 50/30/20 rule
                </p>
              </div>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
                style={{ background: `${category.color}15`, color: category.color }}
              >
                Interactive
              </span>
            </Link>
          )}
          {category.lessons.map((lesson, i) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              category={category}
              lessonProgress={getLessonProgress(lesson.id)}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
