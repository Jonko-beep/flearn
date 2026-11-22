import { Link } from "react-router-dom";
import { Flame, Trophy, Repeat2 } from "lucide-react";
import { useGamification, levelInfo, displayStreak, XP_PER_LEVEL } from "../lib/gamification.js";
import { useReview, countDue } from "../lib/review.js";
import { Avatar, Card, Progress, cx } from "../ui/kit.jsx";
import { levelMascot } from "../ui/mascots.jsx";

function Mini({ icon: Icon, tone, value, label, to }) {
  const body = (
    <>
      <span className={cx("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", tone)}>
        <Icon size={16} strokeWidth={2.6} aria-hidden />
      </span>
      <span className="num font-display text-[1.15rem] font-semibold text-ink">{value}</span>
      <span className="text-sm font-semibold text-ink-muted">{label}</span>
    </>
  );
  const classes = "flex min-w-0 items-center gap-2.5 rounded-xl px-1.5 py-1";
  return to ? (
    <Link to={to} className={cx(classes, "transition-colors hover:bg-raised")}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}

// The player card on the Learn hub: your level (and its animal), XP toward the
// next level, and the habit numbers.
export default function StatsStrip({ className }) {
  const { xp, streak } = useGamification();
  const { level, title, intoLevel, toNext, pct } = levelInfo(xp.total);
  const fire = displayStreak(streak);
  const dueCount = countDue(useReview());

  return (
    <Card className={cx("flex flex-col p-5", className)}>
      <div className="flex items-center gap-3.5">
        <Avatar mascot={levelMascot(level)} size={60} />
        <div className="min-w-0">
          <div className="text-sm font-bold text-accent-ink">Level {level}</div>
          <div className="font-display text-[1.3rem] font-semibold leading-tight">{title}</div>
        </div>
      </div>
      <Progress value={pct} size="lg" className="mt-5" label="Progress to next level" />
      <div className="num mt-2 flex justify-between text-[0.8125rem] font-semibold text-ink-muted">
        <span>
          {intoLevel} / {XP_PER_LEVEL} XP
        </span>
        <span>{toNext} to level {level + 1}</span>
      </div>
      <div className="mt-5 grid gap-0.5 border-t-2 border-edge pt-3 sm:grid-cols-3 lg:mt-auto lg:grid-cols-1">
        <Mini
          icon={Flame}
          tone={fire > 0 ? "bg-warn/15 text-warn" : "bg-raised text-ink-muted"}
          value={fire}
          label="day streak"
        />
        <Mini icon={Trophy} tone="bg-gold/15 text-gold" value={streak.best} label="best streak" />
        <Mini
          icon={Repeat2}
          tone={dueCount > 0 ? "bg-accent/15 text-accent-ink" : "bg-raised text-ink-muted"}
          value={dueCount}
          label="to review"
          to="/review"
        />
      </div>
    </Card>
  );
}
