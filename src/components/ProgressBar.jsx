export default function ProgressBar({ percent, gradient, height = 6 }) {
  return (
    <div
      className="w-full overflow-hidden rounded-full bg-well"
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${Math.min(100, Math.max(0, percent))}%`,
          background: gradient || "linear-gradient(90deg, #0D9488, #7C3AED)",
        }}
      />
    </div>
  );
}
