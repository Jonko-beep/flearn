import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getCategory } from "../data/curriculum.js";
import { useProgress } from "../hooks/useProgress.js";
import { useFinals } from "../lib/finals.js";
import LessonCard from "../components/LessonCard.jsx";
import FinalExamCard from "../components/FinalExamCard.jsx";
import { Avatar, Card, Crumbs, IconTile, Progress, SpeechBubble } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";
import { TOOL_ICONS } from "../ui/icons.js";

// Hands-on tool featured beside a course's lesson list.
const PRACTICE = {
  "saving-budgeting": {
    to: "/tools/budget",
    icon: TOOL_ICONS.budget,
    title: "Build your first budget",
    blurb: "Allocate a real paycheck and get graded against the 50/30/20 rule.",
  },
  options: {
    to: "/tools/options",
    icon: TOOL_ICONS.options,
    title: "Options payoff visualizer",
    blurb: "See what a call, put, or covered call is worth at expiration — no money at risk.",
  },
};

export default function LessonListPage() {
  const { categoryId } = useParams();
  const category = getCategory(categoryId);
  const { getLessonProgress, getCategoryStats } = useProgress();
  const finals = useFinals();

  if (!category) return <Navigate to="/learn" replace />;

  const stats = getCategoryStats(category);
  const practice = PRACTICE[category.id];
  const examUnlocked = stats.total > 0 && stats.mastered === stats.total;
  const pct = stats.total > 0 ? (stats.mastered / stats.total) * 100 : 0;
  const nextId = category.lessons.find((l) => !l.locked && !getLessonProgress(l.id)?.completed)?.id;

  return (
    <div className="animate-enter" style={hue(category.id)}>
      <Crumbs items={[{ label: "Learn", to: "/learn" }, { label: category.title }]} />

      <header className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-3xl border-2 border-cat/30 bg-cat/10 p-5 sm:p-6">
        <div className="flex flex-col items-center gap-3 sm:w-[12rem]">
          <Avatar emoji={category.mascot.emoji} size={112} happy={stats.total > 0 && stats.mastered === stats.total} />
          <SpeechBubble tail="top" className="hidden !px-3 !py-2 text-center sm:block">
            <p className="text-[0.8125rem] font-semibold leading-snug text-ink-secondary">“{category.mascot.quote}”</p>
          </SpeechBubble>
        </div>
        <div className="min-w-0 flex-1 basis-72">
          <div className="text-sm font-bold text-cat">{category.mascot.name} teaches</div>
          <h1 className="text-[2.1rem] sm:text-[2.6rem]">{category.title}</h1>
          <p className="mt-1 max-w-2xl text-[1rem] leading-relaxed text-ink-secondary">{category.description}</p>
          <div className="mt-4 flex max-w-md items-center gap-3">
            <Progress value={pct} tone="cat" className="flex-1" label="Course progress" />
            <span className="num shrink-0 text-sm font-bold text-ink-secondary">
              {stats.mastered} of {stats.total} mastered
            </span>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Lessons, as a trail */}
        <Card className="p-1.5 sm:p-2">
          {category.lessons.map((lesson, i) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              category={category}
              lessonProgress={getLessonProgress(lesson.id)}
              index={i}
              isNext={lesson.id === nextId}
              isLast={i === category.lessons.length - 1}
            />
          ))}
        </Card>

        {/* Side rail */}
        <aside className="flex flex-col gap-5">
          {practice && (
            <Link
              to={practice.to}
              className="group rounded-2xl border-2 border-edge bg-card p-5 shadow-tile transition-colors hover:border-cat/60"
            >
              <div className="flex items-center gap-3">
                <IconTile icon={practice.icon} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-cat">Practice</div>
                  <div className="font-display text-[1.1rem] font-semibold leading-tight text-ink">{practice.title}</div>
                </div>
                <ArrowRight size={18} strokeWidth={2.6} className="text-cat transition-transform group-hover:translate-x-1" aria-hidden />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{practice.blurb}</p>
            </Link>
          )}

          <FinalExamCard
            category={category}
            unlocked={examUnlocked}
            final={finals[category.id]}
            remaining={stats.total - stats.mastered}
          />
        </aside>
      </div>
    </div>
  );
}
