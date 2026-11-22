import { ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { MASTERY_THRESHOLD } from "../data/curriculum.js";
import { Button } from "../ui/kit.jsx";
import { ScoreHeader, AnswerList } from "./ScoreReview.jsx";

export default function ResultsScreen({ quiz, answers, category, nextLesson, onRetake, onReview }) {
  const total = quiz.length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const mastered = score >= MASTERY_THRESHOLD;

  return (
    <div className="animate-enter">
      <ScoreHeader
        score={score}
        correctCount={correctCount}
        total={total}
        passed={mastered}
        mascot={category.mascot.emoji}
        title={mastered ? "Lesson mastered!" : "Almost there"}
      >
        {mastered
          ? `You scored ${score}% — at or above the ${MASTERY_THRESHOLD}% mastery threshold. This lesson is now complete.`
          : `You scored ${score}%, but you need at least ${MASTERY_THRESHOLD}% to master this lesson. Review the lesson, then try again.`}
      </ScoreHeader>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {mastered ? (
          <>
            <Button
              to={nextLesson ? `/learn/${category.id}/${nextLesson.id}` : `/learn/${category.id}`}
              size="lg"
              iconRight={ArrowRight}
            >
              {nextLesson ? "Next lesson" : `Back to ${category.title}`}
            </Button>
            <Button size="lg" variant="secondary" icon={RotateCcw} onClick={onRetake}>
              Retake quiz
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" icon={RotateCcw} onClick={onRetake}>
              Try again
            </Button>
            <Button size="lg" variant="secondary" icon={BookOpen} onClick={onReview}>
              Review lesson
            </Button>
          </>
        )}
      </div>

      <AnswerList questions={quiz} answers={answers} />
    </div>
  );
}
