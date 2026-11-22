import { useState } from "react";
import { Moon, Sun, RotateCcw, TriangleAlert, Compass } from "lucide-react";
import { useGamification, levelInfo } from "../lib/gamification.js";
import { useProgress } from "../hooks/useProgress.js";
import { resetAllProgress } from "../lib/reset.js";
import { useTheme, setTheme } from "../ui/theme.js";
import { Button, Card, PageHeader, Segmented } from "../ui/kit.jsx";

function Section({ title, description, children }) {
  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-[1.3rem]">{title}</h2>
      {description && <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{description}</p>}
      <div className="mt-4">{children}</div>
    </Card>
  );
}

// Reset asks twice: the first click opens a confirmation that spells out
// what will be lost.
function ResetProgress() {
  const [confirming, setConfirming] = useState(false);
  const { xp } = useGamification();
  const { masteredCount, totalLessons } = useProgress();
  const { level } = levelInfo(xp.total);

  if (!confirming) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="num text-sm font-semibold text-ink-muted">
          Right now: level {level} · {xp.total.toLocaleString()} XP · {masteredCount} of {totalLessons} lessons mastered
        </p>
        <Button variant="danger" icon={RotateCcw} onClick={() => setConfirming(true)}>
          Reset all progress
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-loss/50 bg-loss/[0.07] p-4 sm:p-5" role="alertdialog" aria-labelledby="reset-title">
      <div className="flex items-start gap-3">
        <TriangleAlert size={22} strokeWidth={2.4} className="mt-0.5 shrink-0 text-loss" aria-hidden />
        <div className="min-w-0">
          <div id="reset-title" className="font-display text-[1.1rem] font-semibold text-ink">
            Start over from the very beginning?
          </div>
          <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
            This erases your lessons, quiz scores, XP, streaks, achievements, review queue, final exams and
            certificates, practice portfolio, calculator inputs, your starting-questions answers and your
            money-style result. It can&apos;t be undone. You&apos;ll land on the first-visit questions, just like a
            new visitor.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="loss" icon={RotateCcw} onClick={resetAllProgress}>
              Yes, erase everything
            </Button>
            <Button variant="secondary" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const theme = useTheme();

  return (
    <div className="max-w-[760px] animate-enter">
      <PageHeader title="Settings" />

      <div className="flex flex-col gap-5">
        <Section title="Appearance">
          <Segmented
            label="Colour theme"
            value={theme}
            onChange={setTheme}
            options={[
              { value: "dark", label: "Dark", icon: Moon },
              { value: "light", label: "Light", icon: Sun },
            ]}
          />
        </Section>

        <Section
          title="Where to start"
          description="Answer the four starting questions again to get a fresh lesson recommendation. Your progress stays as it is."
        >
          <Button to="/welcome" variant="secondary" icon={Compass}>
            Retake the starting questions
          </Button>
        </Section>

        <Section
          title="Reset progress"
          description="Everything FLearn knows about you is saved in this browser only. Resetting wipes it and starts the app fresh."
        >
          <ResetProgress />
        </Section>
      </div>
    </div>
  );
}
