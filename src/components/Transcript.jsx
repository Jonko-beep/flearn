import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { Card, cx } from "../ui/kit.jsx";

function timeToSeconds(time) {
  const [m, s] = time.split(":").map(Number);
  return m * 60 + s;
}

export default function Transcript({ transcript, onSeek, canSeek }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="mt-4 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-5 py-3.5 text-left text-sm font-semibold text-ink transition-colors hover:bg-raised"
      >
        <FileText size={16} strokeWidth={1.9} className="text-ink-muted" aria-hidden />
        <span className="flex-1">Lesson transcript</span>
        <ChevronDown size={16} className={cx("text-ink-muted transition-transform duration-200", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <div className="max-h-80 divide-y divide-edge overflow-y-auto border-t border-edge px-5">
          {transcript.map((entry, i) => (
            <div key={i} className="flex gap-4 py-3">
              <button
                type="button"
                onClick={() => canSeek && onSeek?.(timeToSeconds(entry.time))}
                className={cx(
                  "num min-w-[40px] pt-0.5 text-left font-mono text-xs font-medium text-cat",
                  canSeek ? "cursor-pointer hover:underline" : "cursor-default"
                )}
                title={canSeek ? "Jump to this point in the video" : undefined}
              >
                {entry.time}
              </button>
              <p className="text-sm leading-relaxed text-ink-secondary">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
