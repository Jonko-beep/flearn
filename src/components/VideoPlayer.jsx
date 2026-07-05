export default function VideoPlayer({ lesson, category, startSeconds }) {
  const hasVideo = Boolean(lesson.videoUrl);
  const src = hasVideo
    ? `${lesson.videoUrl}${startSeconds != null ? `?start=${startSeconds}&autoplay=1` : ""}`
    : null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-card border border-edge bg-black">
      {hasVideo ? (
        <iframe
          key={src}
          src={src}
          className="h-full w-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={lesson.title}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3"
          style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
        >
          <div className="animate-[float_6s_ease-in-out_infinite] text-5xl">
            {category.mascot.emoji}
          </div>
          <div className="px-4 text-center text-lg font-semibold">{lesson.title}</div>
          <div className="text-sm text-ink-secondary">with {category.mascot.name}</div>
          <span
            className="mt-1 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: `${category.color}20`, color: category.color }}
          >
            🎥 Video coming soon — read the lesson below
          </span>
        </div>
      )}
    </div>
  );
}
