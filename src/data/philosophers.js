// Character-page data for the "Who Do I Align With?" feature. Seven spectrum
// figures (positions 1 = most conservative → 7 = most aggressive) plus two
// layer figures shown only when their flag triggers (hormozi → ENT builder,
// sutton → protection tier business/investor).
//
// TODO(Aaron): fill `recommendedContent` with real FLearn playlist/video IDs.
// Each entry currently holds a placeholder describing the intended content.

export const philosophers = [
  {
    slug: "ramsey",
    name: "Dave Ramsey",
    role: "The Debt Eliminator",
    spectrumPosition: 1,
    layer: null,
    emoji: "✂️",
    color: "#059669",
    summary: "All debt is dangerous — behavior beats math, and peace of mind is the return.",
    bio: "Built a $4M real estate portfolio in his twenties on short-term bank notes, lost everything when the notes were called, and went bankrupt at 28. Rebuilt his life around a zero-debt philosophy and turned it into Ramsey Solutions, a media empire reaching millions.",
    philosophy:
      "All debt is dangerous; follow the 7 Baby Steps in strict order; behavior beats math.",
    signatureBooks: ["The Total Money Makeover", "Financial Peace", "Baby Steps Millionaires"],
    blindSpot:
      "Refusing all leverage can leave real wealth-building tools on the table, and his 12% return assumptions are widely criticized as unrealistic.",
    recommendedContent: null, // TODO(Aaron): debt payoff + budgeting basics playlist
  },
  {
    slug: "orman",
    name: "Suze Orman",
    role: "The Protector",
    spectrumPosition: 2,
    layer: null,
    emoji: "🛡️",
    color: "#0D9488",
    summary: "Financial security is personal power — protect first, grow second.",
    bio: "Went from waitress to Merrill Lynch broker after a broker lost her customers' $50,000 gift — then spent a decade hosting CNBC's The Suze Orman Show and wrote ten consecutive NYT bestsellers.",
    philosophy:
      "Financial security is personal power; protect first (emergency fund, insurance, Roth IRAs), grow second; money decisions are emotional decisions.",
    signatureBooks: [
      "The 9 Steps to Financial Freedom",
      "Women & Money",
      "The Money Book for the Young, Fabulous & Broke",
    ],
    blindSpot:
      "Stronger at protecting wealth than aggressively building it, and some past product endorsements drew fair criticism.",
    recommendedContent: null, // TODO(Aaron): emergency fund + insurance playlist
  },
  {
    slug: "sethi",
    name: "Ramit Sethi",
    role: "The Automator",
    spectrumPosition: 3,
    layer: null,
    emoji: "⚙️",
    color: "#3B82F6",
    summary:
      "Automate the system, win the big wins, and spend extravagantly on what you love.",
    bio: "Won $200K+ in scholarships to Stanford, lost half his first scholarship check in a single stock, and built I Will Teach You To Be Rich into a book, podcast, and Netflix series.",
    philosophy:
      "Automate your money system, negotiate your salary, spend extravagantly on what you love and cut mercilessly on what you don't; focus on big wins, not lattes.",
    signatureBooks: ["I Will Teach You to Be Rich"],
    blindSpot:
      "Built for stable-income earners; his skepticism of real estate can write off a legitimate wealth tool.",
    recommendedContent: null, // TODO(Aaron): automation + index investing playlist
  },
  {
    slug: "housel",
    name: "Morgan Housel",
    role: "The Psychologist",
    spectrumPosition: 4,
    layer: null,
    emoji: "🧠",
    color: "#7C3AED",
    summary: "Behavior beats intelligence — survive long enough for compounding to work.",
    bio: "Award-winning financial writer (Motley Fool, WSJ), partner at Collaborative Fund; The Psychology of Money has sold millions of copies in 60+ languages.",
    philosophy:
      "Behavior beats intelligence; wealth is what you don't spend; reasonable beats optimal; survive long enough for compounding to work.",
    signatureBooks: ["The Psychology of Money", "Same As Ever", "The Art of Spending Money"],
    blindSpot:
      "Deliberately non-prescriptive — he'll change how you think but won't hand you a plan.",
    recommendedContent: null, // TODO(Aaron): investor psychology + long-term mindset playlist
  },
  {
    slug: "stephan",
    name: "Graham Stephan",
    role: "The Grinder",
    spectrumPosition: 5,
    layer: null,
    emoji: "☕",
    color: "#D97706",
    summary:
      "Save aggressively, invest consistently, analyze everything — and show your numbers.",
    bio: "Denied by Pepperdine, got his real estate license at 18, sold $120M+ in LA luxury real estate by 27, then built a 5M+ subscriber YouTube channel on radical financial transparency.",
    philosophy:
      "Save aggressively, invest consistently in index funds plus carefully-analyzed real estate, and show your actual numbers.",
    signatureBooks: [
      "(No book — his library is his channel, The Iced Coffee Hour podcast, and his real estate course.)",
    ],
    blindSpot:
      "His returns rode an historic LA bull market, and the Yotta promotion controversy shows influencer picks carry real risk.",
    recommendedContent: null, // TODO(Aaron): savings rate + real estate analysis playlist
  },
  {
    slug: "kiyosaki",
    name: "Robert Kiyosaki",
    role: "The Strategist",
    spectrumPosition: 6,
    layer: null,
    emoji: "🏘️",
    color: "#8B5CF6",
    summary: "Buy assets that put money in your pocket; use good debt to acquire cash flow.",
    bio: "Author of Rich Dad Poor Dad, the best-selling personal finance book ever (41M+ copies, 51 languages), built on the contrast between his two \"dads.\"",
    philosophy:
      "Buy assets that put money in your pocket; use good debt to acquire cash flow; move from the E/S quadrants to B/I; financial education beats formal education.",
    signatureBooks: ["Rich Dad Poor Dad", "Cashflow Quadrant", "Rich Dad's Guide to Investing"],
    blindSpot:
      "Inspiring but vague — \"buy assets with good debt\" without execution detail has wrecked inexperienced imitators.",
    recommendedContent: null, // TODO(Aaron): assets vs. liabilities + cash flow playlist
  },
  {
    slug: "cardone",
    name: "Grant Cardone",
    role: "The Accelerator",
    spectrumPosition: 7,
    layer: null,
    emoji: "🚀",
    color: "#DC2626",
    summary: "Set targets 10X bigger and pour income into cash-flowing assets at maximum scale.",
    bio: "From car salesman battling addiction in his twenties to a multibillion-dollar multifamily real estate operation (Cardone Capital) and the 10X brand and conference.",
    philosophy:
      "Set targets 10X bigger, never park money in a bank, pour income into cash-flowing multifamily real estate at maximum scale.",
    signatureBooks: [
      "The 10X Rule",
      "Sell or Be Sold",
      "How to Create Wealth Investing in Real Estate",
    ],
    blindSpot:
      "His model demands capital and risk tolerance most people don't have, and his funds have faced scrutiny over fees and returns.",
    recommendedContent: null, // TODO(Aaron): income scaling + risk management playlist
  },
  {
    slug: "hormozi",
    name: "Alex Hormozi",
    role: "The Builder",
    spectrumPosition: null,
    layer: "Operations",
    emoji: "🏗️",
    color: "#F59E0B",
    summary: "Wealth starts with creating value — income creation precedes investing.",
    bio: "Nearly went broke scaling gyms, pivoted to Gym Launch ($17M profit by 2017), sold a majority stake, now runs Acquisition.com with a portfolio doing $200M+ annually.",
    philosophy:
      "Wealth starts with creating value — build offers so good people feel stupid saying no, then master lead generation; income creation precedes investing.",
    signatureBooks: ["$100M Offers", "$100M Leads", "$100M Money Models"],
    blindSpot:
      "Business-building content, not personal-finance guidance — you still need a plan for the money once you make it.",
    recommendedContent: null, // TODO(Aaron): business/operations playlist
  },
  {
    slug: "sutton",
    name: "Garrett Sutton",
    role: "The Architect",
    spectrumPosition: null,
    layer: "Infrastructure",
    emoji: "🏛️",
    color: "#64748B",
    summary:
      "It doesn't matter how much you build if you can't protect it — structure before you scale.",
    bio: "Corporate attorney for 40+ years, Rich Dad Advisor, founder of Corporate Direct with 13,000+ clients; his books have sold over a million copies.",
    philosophy:
      "It doesn't matter how much you build if you can't protect it — use the right entities (LLCs, corps), maintain the corporate veil, structure before you scale.",
    signatureBooks: ["Start Your Own Corporation", "Loopholes of Real Estate", "Veil Not Fail"],
    blindSpot:
      "Narrow by design — he protects wealth, he doesn't create it; specifics always need a local attorney/CPA.",
    recommendedContent: null, // TODO(Aaron): asset-protection playlist
  },
];

export function getPhilosopher(slug) {
  return philosophers.find((p) => p.slug === slug) ?? null;
}
