import { Clapperboard } from "lucide-react";

// The lesson's video. Until one is recorded there is nothing to play, so the
// lesson shows a one-line note instead of an empty player.
export default function VideoPlayer({ lesson, startSeconds }) {
  if (!lesson.videoUrl) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-edge-strong px-4 py-3 text-sm text-ink-muted">
        <Clapperboard size={17} strokeWidth={1.9} className="shrink-0" aria-hidden />
        <span>Video coming soon — the full lesson is written out below.</span>
      </div>
    );
  }

  const src = `${lesson.videoUrl}${startSeconds != null ? `?start=${startSeconds}&autoplay=1` : ""}`;
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-edge bg-black">
      <iframe
        key={src}
        src={src}
        className="h-full w-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title={lesson.title}
      />
    </div>
  );
}
