import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Avatar, Badge, IconTile, PageHeader } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";
import { TOOL_ICONS } from "../ui/icons.js";
import { MASCOT_NAMES } from "../ui/mascots.jsx";

// Which guide runs each tool, by the tool's course colour.
const MASCOT_OF_HUE = { investing: "walrus", saving: "bear", estate: "chipmunk", options: "fox" };

const TOOLS = [
  {
    id: "compound",
    to: "/tools/compound",
    hue: "investing",
    title: "Compound interest visualizer",
    tag: "Start here",
    description:
      "Watch growth overtake your contributions year by year — and see exactly what starting ten years earlier is worth.",
  },
  {
    id: "budget",
    to: "/tools/budget",
    hue: "saving",
    title: "Build your first budget",
    tag: "Interactive",
    description:
      "Allocate a month of real income across 8 categories, then get graded against the 50/30/20 rule by Benjamin the Bear.",
  },
  {
    id: "debt",
    to: "/tools/debt",
    hue: "saving",
    title: "Debt payoff calculator",
    tag: "Calculator",
    description:
      "Enter your debts and one monthly budget — Benjamin compares avalanche vs. snowball and shows what each path costs.",
  },
  {
    id: "mortgage",
    to: "/tools/mortgage",
    hue: "estate",
    title: "Mortgage calculator",
    tag: "Calculator",
    description:
      "Charlie turns a home price into a full PITI payment, flags the PMI trap, and charts the amortization crossover.",
  },
  {
    id: "paycheck",
    to: "/tools/paycheck",
    hue: "investing",
    title: "Paycheck calculator",
    tag: "Calculator",
    description:
      "Warren estimates your real take-home per check — federal tax, FICA, and what your time is truly worth per hour.",
  },
  {
    id: "options",
    to: "/tools/options",
    hue: "options",
    title: "Options payoff visualizer",
    tag: "Simulator",
    description:
      "Fischer charts what a call, put, covered call, or cash-secured put is worth at expiration — breakeven, max loss, and how it compares with just owning the shares.",
  },
];

export default function ToolsPage() {
  return (
    <div className="animate-enter">
      <PageHeader title="Tools" subtitle="Hands-on labs where the lessons become muscle memory." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.id}
            to={tool.to}
            style={hue(tool.hue)}
            className="group flex flex-col rounded-2xl border-2 border-edge bg-card p-5 shadow-tile transition-[border-color,transform] hover:-translate-y-0.5 hover:border-cat/60"
          >
            <div className="flex items-center justify-between">
              <IconTile icon={TOOL_ICONS[tool.id]} size={48} />
              <Badge tone="cat">{tool.tag}</Badge>
            </div>
            <h2 className="mt-4 text-[1.3rem]">{tool.title}</h2>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-secondary">{tool.description}</p>
            <div className="mt-5 flex items-center justify-between border-t-2 border-edge pt-3.5">
              <span className="flex items-center gap-2 text-sm font-bold text-ink-muted">
                <Avatar mascot={MASCOT_OF_HUE[tool.hue]} size={30} />
                with {MASCOT_NAMES[MASCOT_OF_HUE[tool.hue]].split(" ")[0]}
              </span>
              <span className="inline-flex items-center gap-1.5 font-display text-[1rem] font-semibold text-cat">
                Open
                <ArrowRight size={17} strokeWidth={2.6} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
