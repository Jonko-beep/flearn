import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { useFinals } from "../lib/finals.js";
import { Avatar, Badge, Progress } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";

// One course on the Learn hub: who teaches it, what it covers, how far along you are.
export default function CategoryCard({ category, stats }) {
  const passedFinal = useFinals()[category.id]?.passed;
  const pct = stats.total > 0 ? (stats.mastered / stats.total) * 100 : 0;
  const done = stats.total > 0 && stats.mastered === stats.total;

  return (
    <Link
      to={`/learn/${category.id}`}
      style={hue(category.id)}
      className="group flex flex-col rounded-2xl border-2 border-edge bg-card p-5 shadow-tile transition-[border-color,transform] hover:-translate-y-0.5 hover:border-cat/60"
    >
      <div className="flex items-start gap-4">
        <Avatar emoji={category.mascot.emoji} size={68} happy={done} />
        <div className="min-w-0 flex-1">
          <div className="text-[0.8125rem] font-bold text-cat">with {category.mascot.name}</div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[1.4rem]">{category.title}</h3>
            {passedFinal && (
              <Badge tone="gold" icon={Award} title="Final exam passed — certificate earned">
                Certified
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{category.description}</p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-3 pt-5">
        <Progress value={pct} tone="cat" className="flex-1" label={`${category.title} progress`} />
        <span className="num shrink-0 text-sm font-bold text-ink-secondary">
          {stats.mastered}/{stats.total}
        </span>
        <ArrowRight
          size={18}
          strokeWidth={2.6}
          className="shrink-0 text-cat transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </div>
    </Link>
  );
}
