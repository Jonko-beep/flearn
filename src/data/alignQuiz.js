// "Who Do I Align With?" question bank. Every option carries a hidden scoring
// payload — archetype weights (0–3), ENT entrepreneur tags, capacity values
// (1–4), protection tier, and content-routing flags. The UI must only ever
// render `text`; philosopher names and weights stay invisible until results.
//
// Sections: Q1–Q10 temperament (archetype weights), Q11–Q14 capacity & stage
// (cap values only), Q15 flags (protection tier).

export const ARCHETYPES = [
  "ramsey",
  "orman",
  "sethi",
  "housel",
  "stephan",
  "kiyosaki",
  "cardone",
];

export const questions = [
  {
    id: "q1",
    section: "temperament",
    text: "A bank offers you a loan at fair terms to buy a rental property that would cash-flow $200/month after all expenses. You have the down payment saved. What's your honest gut reaction?",
    options: [
      { text: "No. I don't borrow money for anything.", weights: { ramsey: 3, orman: 1 } },
      {
        text: "Not until I have a large cash cushion, insurance, and a backup plan in place.",
        weights: { orman: 3, ramsey: 1 },
      },
      {
        text: "I'd rather put that down payment in index funds and skip being a landlord.",
        weights: { sethi: 2, housel: 2 },
      },
      {
        text: "Interesting — I'd model it conservatively and maybe start with one.",
        weights: { stephan: 3, kiyosaki: 1 },
      },
      {
        text: "Yes. Using the bank's money to buy cash flow is how wealth gets built.",
        weights: { kiyosaki: 3, stephan: 1 },
      },
      { text: "Yes — and I'd ask what it takes to buy five.", weights: { cardone: 3, kiyosaki: 1 } },
    ],
  },
  {
    id: "q2",
    section: "temperament",
    text: "A relative leaves you $25,000. After taxes, what do you actually do with it?",
    options: [
      {
        text: "Pay off every debt I have, then park the rest in savings.",
        weights: { ramsey: 3, orman: 1 },
      },
      {
        text: "Fully fund an emergency cushion first, then safe long-term accounts.",
        weights: { orman: 3, ramsey: 1 },
      },
      {
        text: "Automate most into index funds — and spend a slice guilt-free on something I love.",
        weights: { sethi: 3, housel: 1 },
      },
      { text: "Invest it and forget it exists for twenty years.", weights: { housel: 3, sethi: 1 } },
      { text: "Down payment on a property, or house-hack.", weights: { stephan: 2, kiyosaki: 2 } },
      {
        text: "Seed capital — a deal, a business, or marketing to grow my income.",
        weights: { cardone: 3 },
        ent: true,
      },
    ],
  },
  {
    id: "q3",
    section: "temperament",
    text: "You invest $10,000. Three months later a market-wide drop makes it worth $7,000. What do you most likely do?",
    options: [
      { text: "Sell — I'd need to stop the bleeding.", weights: { ramsey: 2, orman: 2 } },
      {
        text: "Pause new contributions until things calm down.",
        weights: { orman: 2, ramsey: 1 },
      },
      { text: "Nothing. It's a long game.", weights: { housel: 2, sethi: 1, stephan: 1 } },
      { text: "Buy more — it's on sale.", weights: { kiyosaki: 2, cardone: 2 } },
      {
        text: "Honestly, I don't know — I've never had real money at risk.",
        weights: {},
        contentFlag: "volatility-basics",
      },
    ],
  },
  {
    id: "q4",
    section: "temperament",
    text: "“My net worth could swing 20% in a month without changing my mood or my decisions.”",
    options: [
      { text: "Strongly disagree", weights: { ramsey: 2, orman: 2 } },
      { text: "Disagree", weights: { orman: 2, ramsey: 1 } },
      { text: "Neutral", weights: { sethi: 1, stephan: 1 } },
      { text: "Agree", weights: { kiyosaki: 2, stephan: 1 } },
      { text: "Strongly agree", weights: { cardone: 2, kiyosaki: 2 } },
    ],
  },
  {
    id: "q5",
    section: "temperament",
    text: "Which is closest to your view on credit cards?",
    options: [
      { text: "Cut them up — they're a trap, period.", weights: { ramsey: 3 } },
      {
        text: "Fine for building credit, but carrying a balance scares me.",
        weights: { orman: 3 },
      },
      {
        text: "Pay in full monthly and farm the rewards — free money for the disciplined.",
        weights: { sethi: 2, stephan: 2 },
      },
      {
        text: "Tools — float, business expenses, points as a bonus.",
        weights: { kiyosaki: 2, cardone: 1 },
        ent: true,
      },
    ],
  },
  {
    id: "q6",
    section: "temperament",
    text: "If you had to hold just one of these for the next ten years, which would you pick?",
    options: [
      { text: "A total-market index fund I never touch.", weights: { sethi: 2, housel: 2 } },
      { text: "A dividend portfolio I monitor and adjust myself.", weights: { stephan: 3 } },
      { text: "A rental property I manage.", weights: { kiyosaki: 2, stephan: 2 } },
      { text: "A small business I run.", weights: { cardone: 2, kiyosaki: 1 }, ent: true },
      { text: "Cash and CDs — I want it guaranteed.", weights: { orman: 2, ramsey: 1 } },
    ],
  },
  {
    id: "q7",
    section: "temperament",
    text: "You want an extra $500 a month. Which move feels most natural?",
    options: [
      {
        text: "Tighten the budget — cut subscriptions, stop eating out.",
        weights: { ramsey: 2, orman: 2 },
      },
      {
        text: "Optimize the big three — housing, car, insurance — and leave the lattes alone.",
        weights: { sethi: 3 },
      },
      { text: "Negotiate a raise or change jobs.", weights: { sethi: 2, stephan: 1 } },
      {
        text: "Start or scale a side hustle — flipping, freelancing, selling.",
        weights: { stephan: 2, cardone: 1 },
        ent: true,
      },
      { text: "Acquire an asset that pays me monthly.", weights: { kiyosaki: 3 } },
    ],
  },
  {
    id: "q8",
    section: "temperament",
    text: "Which kind of money plan would you actually stick to?",
    options: [
      {
        text: "A strict step-by-step program with clear rules and a set order.",
        weights: { ramsey: 3, orman: 1 },
      },
      {
        text: "An automated system — set the percentages once, then live my life.",
        weights: { sethi: 3 },
      },
      { text: "A few core principles I adapt with my own judgment.", weights: { housel: 3 } },
      {
        text: "Aggressive targets I chase and revise constantly.",
        weights: { cardone: 2, kiyosaki: 1 },
        ent: true,
      },
    ],
  },
  {
    id: "q9",
    section: "temperament",
    text: "You have a 30-year mortgage at a decent rate and $500 of true spare cash each month. Where does it go?",
    options: [
      { text: "Extra principal — a paid-off house is the goal.", weights: { ramsey: 3, orman: 1 } },
      { text: "Split it between payoff and investing.", weights: { stephan: 3 } },
      {
        text: "Invest all of it — long-run returns should beat the mortgage rate.",
        weights: { sethi: 2, housel: 2 },
      },
      {
        text: "Save it as the down payment on the next property.",
        weights: { kiyosaki: 2, cardone: 2 },
      },
    ],
  },
  {
    id: "q10",
    section: "temperament",
    text: "Ten years from now, which picture feels most like winning?",
    options: [
      { text: "Zero debt, a big cushion, total peace of mind.", weights: { ramsey: 2, orman: 2 } },
      {
        text: "An automated system funding a life where I spend big on what I love.",
        weights: { sethi: 3 },
      },
      { text: "Quiet wealth nobody can see — pure optionality.", weights: { housel: 3 } },
      {
        text: "Cash flow from assets covering my bills — work optional.",
        weights: { kiyosaki: 2, stephan: 2 },
      },
      { text: "Running a company that keeps scaling.", weights: { cardone: 3 }, ent: true },
    ],
  },
  {
    id: "q11",
    section: "capacity",
    text: "When do you realistically expect to need the money you're investing now?",
    options: [
      { text: "Within 3 years", cap: 1 },
      { text: "3–10 years", cap: 2 },
      { text: "10–25 years", cap: 3 },
      { text: "25+ years / retirement", cap: 4 },
    ],
  },
  {
    id: "q12",
    section: "capacity",
    text: "How predictable is your income over the next three years?",
    options: [
      { text: "Early-stage / unpredictable", cap: 1 },
      { text: "Variable (commissions, gigs, side income)", cap: 2 },
      { text: "Reasonably stable path", cap: 3 },
      { text: "Very stable salary", cap: 4 },
    ],
  },
  {
    id: "q13",
    section: "capacity",
    text: "If your main income stopped today, how long could cash on hand cover your expenses?",
    options: [
      { text: "Under a month", cap: 1, contentFlag: "secure-base" },
      { text: "1–3 months", cap: 2, contentFlag: "secure-base" },
      { text: "3–6 months", cap: 3 },
      { text: "6+ months", cap: 4 },
    ],
  },
  {
    id: "q14",
    section: "capacity",
    text: "If the money you're investing dropped 50% and stayed down for five years, what would actually happen to your life?",
    options: [
      { text: "Catastrophic — I need this money.", cap: 1 },
      { text: "Painful — major goals get delayed.", cap: 2 },
      { text: "Annoying, but life unchanged.", cap: 3 },
      { text: "Nothing — it's genuinely long-term surplus.", cap: 4 },
    ],
  },
  {
    id: "q15",
    section: "flags",
    text: "Which best describes what you own or operate today?",
    options: [
      { text: "Personal savings and accounts — that's it.", tier: "none" },
      {
        text: "A vehicle in my name, plus growing savings or investment accounts.",
        tier: "light",
      },
      { text: "A side business or freelance income.", tier: "business", ent: true },
      {
        text: "Investment assets now, or planning to acquire some within ~2 years.",
        tier: "investor",
        weights: { kiyosaki: 1 },
      },
    ],
  },
];
