import { Link } from "react-router-dom";

const TOOLS = [
  {
    to: "/tools/compound",
    emoji: "📈",
    color: "#0D9488",
    title: "Compound Interest Visualizer",
    tag: "Flagship",
    description:
      "Watch growth overtake your contributions year by year — and see exactly what starting ten years earlier is worth.",
  },
  {
    to: "/tools/budget",
    emoji: "🧮",
    color: "#7C3AED",
    title: "Build Your First Budget",
    tag: "Interactive",
    description:
      "Allocate a month of real income across 8 categories, then get graded against the 50/30/20 rule by Benjamin the Bear.",
  },
];

function ToolCard({ tool, index }) {
  return (
    <Link
      to={tool.to}
      className="group relative block overflow-hidden rounded-card-lg bg-card p-6 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        border: `1px solid ${tool.color}22`,
        animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s both`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${tool.color}55`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${tool.color}22`)}
    >
      <div className="pointer-events-none absolute -top-8 -right-5 text-[6rem] opacity-[0.06]">
        {tool.emoji}
      </div>
      <div className="relative">
        <div className="mb-2 flex items-center gap-3">
          <span
            className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
            style={{ background: `${tool.color}15` }}
          >
            {tool.emoji}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-ink">{tool.title}</h3>
            <span
              className="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
              style={{ background: `${tool.color}15`, color: tool.color }}
            >
              {tool.tag}
            </span>
          </div>
          <span
            className="ml-auto text-xl transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: tool.color }}
          >
            →
          </span>
        </div>
        <p className="m-0 text-sm leading-relaxed text-ink-secondary">{tool.description}</p>
      </div>
    </Link>
  );
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen p-8 max-md:p-5">
      <div className="mx-auto max-w-[640px]">
        <Link
          to="/learn"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to learning
        </Link>

        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center gap-3">
            <span
              className="flex h-[52px] w-[52px] items-center justify-center rounded-card text-3xl"
              style={{ background: "#0D948815" }}
            >
              🛠️
            </span>
            <div>
              <h2 className="m-0 text-3xl font-bold">Tools</h2>
              <span className="text-sm text-ink-muted">
                Hands-on labs where the lessons become muscle memory.
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {TOOLS.map((tool, i) => (
            <ToolCard key={tool.to} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
