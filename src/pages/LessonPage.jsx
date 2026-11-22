import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, BookOpen, CircleCheck, Clock, ListChecks, Lock, Trophy } from "lucide-react";
import { getLesson, getNextLesson, MASTERY_THRESHOLD } from "../data/curriculum.js";
import { getTermsForLesson } from "../data/glossary.js";
import { useProgress } from "../hooks/useProgress.js";
import { recordQuizAnswer } from "../lib/review.js";
import VideoPlayer from "../components/VideoPlayer.jsx";
import Transcript from "../components/Transcript.jsx";
import Quiz from "../components/Quiz.jsx";
import ResultsScreen from "../components/ResultsScreen.jsx";
import { Avatar, Badge, Button, Card, Crumbs, Empty, MascotNote, Segmented } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";
import { masteryBand } from "../ui/mastery.js";

// A list whose every line is "Term — explanation" reads better with the terms
// emphasised. Only done when the whole list has that shape, so a list never
// ends up half bold.
const leadIn = (text) => {
  const cut = text.indexOf(" — ");
  return cut > 0 && cut <= 60 ? cut : -1;
};

function ListLine({ text, emphasise }) {
  const cut = emphasise ? leadIn(text) : -1;
  if (cut < 0) return text;
  return (
    <>
      <strong className="font-semibold text-ink">{text.slice(0, cut)}</strong>
      {text.slice(cut)}
    </>
  );
}

// Lesson text: paragraphs separated by blank lines. Lines starting with "•"
// or "1." inside a paragraph become a real bulleted or numbered list.
function LessonBody({ content }) {
  const blocks = content.split("\n\n").map((paragraph) => {
    const lines = paragraph.split("\n");
    const bullets = lines.filter((l) => /^\s*•/.test(l));
    const numbered = lines.filter((l) => /^\s*\d+\.\s/.test(l));
    if (bullets.length === 0 && numbered.length === 0) return { type: "p", text: paragraph };
    const isItem = (l) => /^\s*(•|\d+\.\s)/.test(l);
    return {
      type: numbered.length > bullets.length ? "ol" : "ul",
      lead: lines.filter((l) => !isItem(l)).join(" "),
      items: lines.filter(isItem).map((l) => l.replace(/^\s*(•|\d+\.)\s*/, "")),
    };
  });

  return (
    <article className="prose-lesson">
      {blocks.map((block, i) => {
        if (block.type === "p") return <p key={i}>{block.text}</p>;
        const List = block.type;
        const emphasise = block.items.every((item) => leadIn(item) > 0);
        return (
          <div key={i} className="my-6 rounded-2xl border-2 border-cat/30 bg-cat/[0.07] px-5 py-4">
            {block.lead && <div className="mb-2.5 font-display text-[1.05rem] font-semibold text-ink">{block.lead}</div>}
            <List className={`space-y-2 pl-5 text-[0.975rem] leading-relaxed text-ink-secondary marker:text-cat ${List === "ol" ? "list-decimal" : "list-disc"}`}>
              {block.items.map((item, j) => (
                <li key={j} className="pl-1">
                  <ListLine text={item} emphasise={emphasise} />
                </li>
              ))}
            </List>
          </div>
        );
      })}
    </article>
  );
}

// Links from each glossary term this lesson teaches into /glossary,
// pre-filled as the search query.
function KeyTerms({ lessonId }) {
  const terms = getTermsForLesson(lessonId);
  if (terms.length === 0) return null;
  return (
    <Card className="p-5">
      <h2 className="text-[1.1rem]">Key terms</h2>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {terms.map((entry) => (
          <Link
            key={entry.term}
            to={`/glossary?q=${encodeURIComponent(entry.term)}`}
            className="rounded-full border-2 border-edge bg-raised px-3 py-1 text-[0.8125rem] font-bold text-ink-secondary transition-colors hover:border-cat/60 hover:text-cat"
          >
            {entry.term}
          </Link>
        ))}
      </div>
    </Card>
  );
}

// The route element stays mounted when only the URL params change ("Next
// lesson"), so key the view by lesson: otherwise the previous lesson's phase
// and answers carry over and get graded against the new lesson's quiz.
export default function LessonPage() {
  const { categoryId, lessonId } = useParams();
  return <LessonView key={`${categoryId}/${lessonId}`} categoryId={categoryId} lessonId={lessonId} />;
}

function LessonView({ categoryId, lessonId }) {
  const { category, lesson } = getLesson(categoryId, lessonId);
  const { recordAttempt, getLessonProgress } = useProgress();

  const [phase, setPhase] = useState("lesson"); // lesson | quiz | results
  const [quizKey, setQuizKey] = useState(0); // bump to reset the Quiz component
  const [answers, setAnswers] = useState(null);
  const [startSeconds, setStartSeconds] = useState(null);

  if (!category) return <Navigate to="/learn" replace />;
  if (!lesson) return <Navigate to={`/learn/${category.id}`} replace />;

  const crumbs = [
    { label: "Learn", to: "/learn" },
    { label: category.title, to: `/learn/${category.id}` },
    { label: lesson.title },
  ];

  // Locked lessons render a notice instead of content
  if (lesson.locked) {
    return (
      <div className="animate-enter" style={hue(category.id)}>
        <Crumbs items={crumbs} />
        <Empty
          icon={Lock}
          title={lesson.title}
          action={
            <Button to={`/learn/${category.id}`} variant="secondary">
              Back to {category.title}
            </Button>
          }
        >
          This lesson is coming soon. Check back later!
        </Empty>
      </div>
    );
  }

  const lessonProgress = getLessonProgress(lesson.id);
  const bestScore = lessonProgress?.bestScore;
  const hasScore = bestScore !== undefined && bestScore !== null;
  const band = masteryBand(hasScore ? bestScore : null);
  const hasQuiz = Boolean(lesson.quiz?.length);
  const nextLesson = getNextLesson(category.id, lesson.id);
  const position = category.lessons.findIndex((l) => l.id === lesson.id) + 1;

  const handleQuizComplete = (finalAnswers) => {
    const correctCount = Object.values(finalAnswers).filter((a) => a.correct).length;
    const score = Math.round((correctCount / lesson.quiz.length) * 100);
    recordAttempt(lesson.id, score);
    setAnswers(finalAnswers);
    setPhase("results");
  };

  const handleRetake = () => {
    setAnswers(null);
    setQuizKey((k) => k + 1);
    setPhase("quiz");
  };

  const tabs = [
    { value: "lesson", label: "Lesson", icon: BookOpen },
    { value: "quiz", label: "Quiz", icon: lessonProgress?.completed ? CircleCheck : ListChecks, disabled: !hasQuiz },
    { value: "results", label: "Results", icon: Trophy, disabled: answers === null },
  ];

  return (
    <div className="animate-enter" style={hue(category.id)}>
      <Crumbs items={crumbs} />

      <header className="mb-6 flex max-w-[860px] items-center gap-5">
        <Avatar emoji={category.mascot.emoji} size={92} className="hidden sm:flex" />
        <div className="min-w-0">
        <div className="text-sm font-bold text-cat">
          {category.title} · Lesson {position} of {category.lessons.length}
        </div>
        <h1 className="mt-1 text-[2rem] sm:text-[2.5rem]">{lesson.title}</h1>
        <p className="mt-1 text-[1.1rem] font-medium text-ink-secondary">{lesson.subtitle}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge icon={Clock}>{lesson.duration}</Badge>
          <Badge>{lesson.difficulty}</Badge>
          {hasScore && (
            <Badge tone={band.tone} className="num">
              Best {bestScore}% · {band.label}
            </Badge>
          )}
        </div>
        </div>
      </header>

      <Segmented options={tabs} value={phase} onChange={setPhase} label="Lesson sections" className="mb-6" />

      {/* ── LESSON ── */}
      {phase === "lesson" && (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="min-w-0">
            <VideoPlayer lesson={lesson} startSeconds={startSeconds} />

            {lesson.transcript && (
              <Transcript transcript={lesson.transcript} canSeek={Boolean(lesson.videoUrl)} onSeek={setStartSeconds} />
            )}

            {lesson.content && (
              <div className="mt-7">
                <LessonBody content={lesson.content} />
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-end gap-4 rounded-3xl border-2 border-cat/30 bg-cat/10 p-5">
              <MascotNote emoji={category.mascot.emoji} name={category.mascot.name} className="min-w-0 flex-1 basis-72">
                {hasQuiz
                  ? `Got it? Take the quiz — score ${MASTERY_THRESHOLD}% or higher and this lesson is mastered. Your best score is saved, so you can always try again.`
                  : "The quiz for this lesson is still being written. Check back soon!"}
              </MascotNote>
              {hasQuiz && (
                <Button size="lg" iconRight={ArrowRight} onClick={() => setPhase("quiz")} className="ml-auto">
                  Take the quiz
                </Button>
              )}
            </div>
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-8">
            <KeyTerms lessonId={lesson.id} />
          </aside>
        </div>
      )}

      {/* ── QUIZ ── */}
      {phase === "quiz" && hasQuiz && (
        <div className="max-w-[760px]">
          <Quiz
            key={quizKey}
            quiz={lesson.quiz}
            onComplete={handleQuizComplete}
            onAnswer={(question, correct) => recordQuizAnswer(lesson.id, question.id, correct)}
          />
        </div>
      )}

      {/* ── RESULTS ── */}
      {phase === "results" && answers && (
        <div className="max-w-[760px]">
          <ResultsScreen
            quiz={lesson.quiz}
            answers={answers}
            category={category}
            nextLesson={nextLesson}
            onRetake={handleRetake}
            onReview={() => setPhase("lesson")}
          />
        </div>
      )}
    </div>
  );
}
