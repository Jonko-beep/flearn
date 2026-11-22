import { ArrowRight, Clock, ListChecks } from "lucide-react";
import { DISCLAIMER } from "../lib/alignQuiz.js";
import { Badge, Button, Card } from "../ui/kit.jsx";

// Cold-start explainer for the alignment quiz. Deliberately says nothing about
// who the philosophers are — the match stays hidden until results.
export default function QuizIntro({ onStart }) {
  return (
    <div className="animate-enter">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <Badge icon={ListChecks}>15 questions</Badge>
          <Badge icon={Clock}>About 3 minutes</Badge>
        </div>
        <div className="mt-5 space-y-4 text-[1rem] leading-relaxed text-ink-secondary">
          <p>
            There&apos;s no single right way to handle money — but there are distinct schools of thought, each
            championed by a well-known voice in personal finance. This quiz reads your honest instincts, not your
            knowledge, and matches you to the philosophy that fits how you actually think.
          </p>
          <p>
            You&apos;ll also get a separate read on your current financial <em>stage</em> — because what you&apos;re
            drawn to and what your situation supports aren&apos;t always the same thing, and knowing the difference
            is half the battle.
          </p>
          <p>Answer with your gut. There are no wrong answers and no score to beat — just a mirror.</p>
        </div>
        <Button size="lg" iconRight={ArrowRight} onClick={onStart} className="mt-7">
          Start the quiz
        </Button>
      </Card>

      <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-muted">{DISCLAIMER}</p>
    </div>
  );
}
