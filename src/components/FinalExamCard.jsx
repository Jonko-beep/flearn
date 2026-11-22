import { Award, Lock, ArrowRight } from "lucide-react";
import { EXAM_SIZE, EXAM_PASS_THRESHOLD } from "../lib/finals.js";
import { Badge, Button, Card, cx } from "../ui/kit.jsx";

// The course's capstone. Locked until every lesson is mastered; once passed
// it shows the best score and still links through (retakes are allowed and
// the certificate stays earned).
export default function FinalExamCard({ category, unlocked, final, remaining }) {
  const passed = final?.passed;

  return (
    <Card className={cx("p-5", passed && "border-gold/40 bg-gold/[0.05]")}>
      <div className="flex items-center gap-3">
        <span
          className={cx(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
            unlocked
              ? "bg-gold text-[#3a2a06] shadow-[inset_0_-4px_0_rgb(0_0_0/0.2)]"
              : "border-2 border-dashed border-edge-strong bg-well text-ink-muted"
          )}
        >
          {unlocked ? <Award size={22} strokeWidth={2.4} aria-hidden /> : <Lock size={18} strokeWidth={2.4} aria-hidden />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-gold">The last stop</div>
          <h3 className="text-[1.15rem]">Final exam</h3>
        </div>
        {passed && (
          <Badge tone="gold" className="num">
            Passed · {final.bestScore}%
          </Badge>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
        {unlocked
          ? `${EXAM_SIZE} questions drawn from every lesson, with no feedback until the end. Score ${EXAM_PASS_THRESHOLD}% to earn your certificate.`
          : `Master ${remaining === 1 ? "the last lesson" : `the remaining ${remaining} lessons`} to unlock the exam and your ${category.title} certificate.`}
      </p>

      {unlocked && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button to={`/learn/${category.id}/final`} variant={passed ? "secondary" : "primary"} iconRight={ArrowRight}>
            {passed ? "Retake the exam" : "Take the final exam"}
          </Button>
          {passed && (
            <Button to={`/learn/${category.id}/certificate`} variant="ghost" icon={Award}>
              View certificate
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
