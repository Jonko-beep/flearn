export default function MascotCard({ mascot, color }) {
  return (
    <div
      className="mb-6 flex items-center gap-4 rounded-card px-5 py-4"
      style={{
        background: `linear-gradient(135deg, ${color}12, ${color}08)`,
        border: `1px solid ${color}20`,
        animation: "fadeInDown 0.6s ease-out 0.1s both",
      }}
    >
      <span className="text-4xl">{mascot.emoji}</span>
      <div>
        <span className="font-serif text-[0.95rem] font-semibold" style={{ color }}>
          {mascot.name}
        </span>
        <p className="m-0 mt-1 text-sm italic text-ink-secondary">"{mascot.quote}"</p>
      </div>
    </div>
  );
}
