import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-8 font-serif">
      {/* Ambient glow orbs */}
      <div
        className="pointer-events-none absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-[15%] -right-[10%] h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <div className="mb-2 animate-fade-in-down text-7xl">🏦</div>
      <h1
        className="m-0 mb-2 text-center text-[clamp(2rem,5vw,3.2rem)] font-bold tracking-[-0.03em]"
        style={{ animation: "fadeInDown 0.8s ease-out 0.1s both" }}
      >
        FLearn
      </h1>
      <p
        className="m-0 mb-3 text-lg italic text-ink-secondary"
        style={{ animation: "fadeInDown 0.8s ease-out 0.2s both" }}
      >
        Financial literacy for the next generation
      </p>
      <p
        className="m-0 mb-10 max-w-[420px] text-center font-sans text-[0.95rem] leading-relaxed text-ink-muted"
        style={{ animation: "fadeInDown 0.8s ease-out 0.3s both" }}
      >
        No one taught us this in school. Learn investing, budgeting, and real money
        skills — built by young adults, for young adults.
      </p>

      <Link
        to="/learn"
        className="rounded-full px-12 py-4 font-serif text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #0D9488, #0f766e)",
          boxShadow: "0 4px 24px rgba(13,148,136,0.3)",
          animation: "fadeInUp 0.8s ease-out 0.5s both",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 8px 32px rgba(13,148,136,0.4)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 24px rgba(13,148,136,0.3)")
        }
      >
        Start Learning →
      </Link>

      <div
        className="mt-12 flex flex-wrap justify-center gap-8 font-sans text-[0.8rem] text-slate-600"
        style={{ animation: "fadeInUp 0.8s ease-out 0.7s both" }}
      >
        <span>🎥 Video Lessons</span>
        <span>📝 Mastery Quizzes</span>
        <span>🎯 Progress Tracking</span>
      </div>
    </div>
  );
}
