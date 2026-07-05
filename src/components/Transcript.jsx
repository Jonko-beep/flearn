import { useState } from "react";

function timeToSeconds(time) {
  const [m, s] = time.split(":").map(Number);
  return m * 60 + s;
}

export default function Transcript({ transcript, color, onSeek, canSeek }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between border border-edge bg-card px-5 py-3.5 text-left text-sm font-medium text-ink transition-all ${
          open ? "rounded-t-xl" : "rounded-xl"
        }`}
      >
        <span>📄 Lesson Transcript</span>
        <span
          className="text-xs transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="max-h-80 overflow-y-auto rounded-b-xl border border-t-0 border-edge bg-card px-5 py-4">
          {transcript.map((entry, i) => (
            <div
              key={i}
              className={`flex gap-3 py-2.5 transition-colors hover:bg-well/40 ${
                i < transcript.length - 1 ? "border-b border-well" : ""
              }`}
            >
              <button
                onClick={() => canSeek && onSeek?.(timeToSeconds(entry.time))}
                className={`min-w-[36px] pt-0.5 text-left font-mono text-xs font-semibold ${
                  canSeek ? "cursor-pointer hover:underline" : "cursor-default"
                }`}
                style={{ color }}
                title={canSeek ? "Jump to this point in the video" : undefined}
              >
                {entry.time}
              </button>
              <p className="m-0 text-sm leading-relaxed text-slate-300">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
