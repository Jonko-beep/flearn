import { useEffect } from "react";
import { ArrowRight, Compass, PartyPopper } from "lucide-react";
import { categories, MASTERY_THRESHOLD } from "../data/curriculum.js";
import { useProgress } from "../hooks/useProgress.js";
import { checkAchievements } from "../lib/achievements.js";
import CategoryCard from "../components/CategoryCard.jsx";
import StatsStrip from "../components/StatsStrip.jsx";
import AchievementsGrid from "../components/AchievementsGrid.jsx";
import { Avatar, Button, Card, PageHeader, Progress, SectionTitle, SpeechBubble } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";

const COURSE_COUNT_WORDS = { 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight" };

// Where to send someone who just opened the app: the next unmastered lesson
// in the course they touched most recently, else the first unmastered lesson.
function findNextLesson(progress) {
  const open = (category) => category.lessons.find((l) => !l.locked && !progress[l.id]?.completed);

  let recent = null;
  for (const category of categories) {
    for (const lesson of category.lessons) {
      const at = progress[lesson.id]?.lastAttempt;
      if (at && (!recent || at > recent.at)) recent = { at, category };
    }
  }
  const ordered = recent ? [recent.category, ...categories.filter((c) => c !== recent.category)] : categories;
  for (const category of ordered) {
    const lesson = open(category);
    if (lesson) return { category, lesson, started: Boolean(recent) };
  }
  return null;
}

// The course's mascot introduces your next lesson.
function ContinueCard({ next, masteredCount, totalLessons, overallPercent }) {
  return (
    <Card className="flex flex-col overflow-hidden" style={next ? hue(next.category.id) : hue("estate")}>
      <div className="flex flex-1 items-center gap-4 bg-cat/10 p-5 sm:gap-5 sm:p-6">
        <Avatar
          emoji={next ? next.category.mascot.emoji : "🐿️"}
          size={100}
          happy={!next}
          className="hidden shrink-0 sm:flex"
        />
        <SpeechBubble className="flex-1 !px-5 !py-4">
          {next ? (
            <>
              <div className="flex items-center gap-2 text-sm font-bold text-cat">
                <Avatar emoji={next.category.mascot.emoji} size={28} className="sm:hidden" />
                {next.category.mascot.name}
              </div>
              <p className="mt-1 text-[1rem] text-ink-secondary">
                {next.started ? "Welcome back! Up next:" : "Let's start with this one:"}
              </p>
              <h2 className="mt-0.5 text-[1.6rem] leading-tight">{next.lesson.title}</h2>
              <p className="mt-1 text-sm font-medium text-ink-muted">
                {next.lesson.subtitle} · {next.lesson.duration}
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm font-bold text-cat">
                Everyone
                <PartyPopper size={16} strokeWidth={2.5} aria-hidden />
              </div>
              <h2 className="mt-1 text-[1.6rem] leading-tight">You've mastered every lesson!</h2>
              <p className="mt-1 text-sm font-medium text-ink-muted">
                Keep your edge with review sessions and the final exams.
              </p>
            </>
          )}
        </SpeechBubble>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t-2 border-edge px-5 py-4 sm:px-6">
        <div className="min-w-[12rem] flex-1">
          <div className="num mb-1.5 text-[0.8125rem] font-semibold text-ink-muted">
            {masteredCount} of {totalLessons} lessons mastered · {MASTERY_THRESHOLD}% on a quiz masters one
          </div>
          <Progress value={overallPercent} label="Lessons mastered" />
        </div>
        {next ? (
          <Button to={`/learn/${next.category.id}/${next.lesson.id}`} size="lg" iconRight={ArrowRight}>
            {next.started ? "Continue" : "Start lesson"}
          </Button>
        ) : (
          <Button to="/review" size="lg" variant="secondary" iconRight={ArrowRight}>
            Open review
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function CategoryPage() {
  const { progress, getCategoryStats, totalLessons, masteredCount, overallPercent } = useProgress();

  // Sweep for unlocks earned before this feature existed (or missed offline)
  useEffect(() => {
    checkAchievements();
  }, []);

  return (
    <div className="animate-enter">
      <PageHeader
        title="Learn"
        subtitle={`${COURSE_COUNT_WORDS[categories.length] ?? categories.length} courses, one short lesson at a time.`}
        actions={
          <Button to="/welcome" variant="ghost" size="sm" icon={Compass}>
            Not sure where to start? Take the path quiz
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
        <ContinueCard
          next={findNextLesson(progress)}
          masteredCount={masteredCount}
          totalLessons={totalLessons}
          overallPercent={overallPercent}
        />
        <StatsStrip />
      </div>

      <section className="mt-10">
        <SectionTitle>Courses</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} stats={getCategoryStats(category)} />
          ))}
        </div>
      </section>

      <div className="mt-10">
        <AchievementsGrid />
      </div>
    </div>
  );
}
