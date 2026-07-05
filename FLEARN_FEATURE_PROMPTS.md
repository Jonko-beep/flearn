# FLearn — Feature Roadmap Prompt Pack (v1 → v2)

Seven features, seven Claude Code sessions. Run them **in order** — later features build on earlier ones.

## Workflow (repeat for every feature)

```bash
cd /home/jonko25/claude-code/flearn
claude
```

1. Paste the feature prompt.
2. Let Claude Code build. Review what it changed (`git diff` or just read the summary).
3. Test locally: `npm run dev` → check the feature works → **refresh the page** to confirm localStorage persistence where relevant.
4. Commit and push:
   ```bash
   git add -A && git commit -m "Add <feature>" && git push
   ```
   Vercel auto-deploys. Check the live site.
5. Type `/clear` in Claude Code (or exit) before starting the next feature. One feature per session — keeps context clean and output quality high.

If anything breaks, don't pile fixes on top: describe the error to Claude Code in the same session, or paste it to chat-Claude for debugging help.

---

## Feature 1 — Quizzes for every lesson

> Read src/data/curriculum.js. Currently only the "hysa" lesson has a full quiz array. For EVERY other unlocked lesson (all lessons where locked is false), write a 7-question multiple-choice quiz derived strictly from that lesson's content text. Match the exact data shape the hysa quiz uses: each question has id, question, options (array of 4), correct (index), and explanation (1-2 sentences teaching WHY the answer is right, not just restating it). Mix difficulty: ~4 recall questions, ~2 application questions (small scenarios or simple math from the lesson), ~1 conceptual "why" question. Wrong options must be plausible, not jokes. Do not change any lesson text, the quiz UI, or the mastery logic — data only. After writing them, verify every "correct" index actually points at the right option.

## Feature 2 — Simulated stock portfolio

> Add a simulated stock portfolio feature to FLearn as a new route /portfolio with a "Portfolio" link in the app's navigation. Users start with $10,000 in virtual cash. Build:
>
> 1. src/data/stocks.js — a static list of 20 well-known tickers (AAPL, MSFT, GOOGL, AMZN, NVDA, TSLA, JPM, V, JNJ, PG, KO, PEP, WMT, DIS, NFLX, SCHD, VOO, SPY, GLD, SLV) with name, ticker, a realistic static basePrice, and sector. Include GLD and SLV labeled as "Tangible Assets" so the portfolio ties into that lesson category.
> 2. A price simulation: on each app load, derive today's price from basePrice using a seeded daily random walk (seed = ticker + date string) so prices change day to day but are consistent within a day and across refreshes. Show daily % change vs. the previous day's derived price, green/red.
> 3. Buy/sell flow: search/browse the ticker list, buy by dollar amount or share count (support fractional shares to 4 decimals), sell any portion of a holding. Block buys exceeding cash and sells exceeding shares, with friendly error states.
> 4. Holdings table: ticker, shares, avg cost basis, current price, market value, unrealized gain/loss ($ and %), color-coded.
> 5. Summary header: total portfolio value (cash + holdings), total return $ and % since start, cash available.
> 6. Persist everything in localStorage under "flearn_portfolio" (cash, holdings with lots for avg-cost calculation, transaction history). Add a transactions list showing every buy/sell with date.
> 7. A "Reset Portfolio" button with a confirm step.
>
> Match the existing FLearn design system exactly: dark gradient background, #1e293b cards, #334155 borders, Georgia serif headings, category-accent pills, fadeInUp animations. Use the teal #0D9488 as the portfolio accent. Keep all logic client-side; structure the price code so a real API can replace it later behind the same interface (a getPrice(ticker) function in one file).

## Feature 3 — Interactive budgeting exercise

> Add an interactive budgeting exercise to FLearn at route /tools/budget, linked from a "Practice: Build Your First Budget" card at the top of the Saving & Budgeting lesson list. Build a 3-step flow:
>
> Step 1: user enters monthly after-tax income (validated number input, friendly for values from side-hustle scale to full salary).
> Step 2: user allocates that income across 8 categories (Housing, Food, Transportation, Insurance & Health, Debt Payments, Fun & Entertainment, Subscriptions, Savings & Investing) using sliders + editable number fields that stay in sync. Show a live remaining/over-allocated indicator that must hit $0 to continue.
> Step 3: results screen that maps their allocations onto the 50/30/20 rule (Needs = housing+food+transportation+insurance+debt minimums, Wants = fun+subscriptions, Savings = savings & investing), shows a horizontal stacked bar comparing THEIR split vs 50/30/20, and gives graded feedback from Benjamin the Bear (🐻): a headline grade (A–D), 2-3 specific observations referencing their actual numbers, and one concrete next step. Savings rate above 20% earns extra praise; above 30% gets a "financial independence trajectory" callout.
>
> Persist their last budget in localStorage under "flearn_budget" and prefill it on return, with a "Start Over" option. Match the FLearn design system, purple #7C3AED accent. No new dependencies.

## Feature 4 — Streaks + XP system

> Add gamification to FLearn: XP and daily streaks.
>
> XP rules: +100 XP the first time a lesson is mastered (score ≥70%), +20 XP for re-mastering on a later attempt with a higher best score, +50 XP the first time the budgeting exercise is completed, +25 XP for the user's first portfolio trade ever. Store total XP and an events log in localStorage under "flearn_xp" (guard so one-time awards can't be re-earned).
>
> Levels: every 500 XP = 1 level. Level titles themed to the mascots: 1 "Curious Cub", 2 "Saving Squirrel", 3 "Budgeting Bear", 4 "Walrus of Wall Street", 5+ "Munger Mode".
>
> Streak: track consecutive days with at least one meaningful action (quiz attempt, trade, or budget exercise) under "flearn_streak" { current, best, lastActionDate }. Increment when lastActionDate was yesterday, keep when today, reset to 1 otherwise. Only compare calendar dates, never hours.
>
> UI: a persistent header badge across all pages showing 🔥 streak and level + XP with a small progress bar to next level. When XP is earned, show a brief toast (+100 XP — Lesson Mastered!) with a subtle animation. Add a small stats strip on the /learn page: total XP, level title, current streak, best streak, lessons mastered count.
>
> Hook the awards into the existing mastery flow, budget exercise, and portfolio trade actions without changing their core logic. Match the FLearn design system.

## Feature 5 — Compound interest visualizer

> Create a /tools route in FLearn that serves as a "Tools" hub page (cards linking to the budgeting exercise and this new tool, styled like the category cards), and add a "Tools" link to the main navigation. Then build the first flagship tool at /tools/compound: an interactive compound interest visualizer.
>
> Install recharts. Inputs (sliders paired with synced number fields): starting amount ($0–$100k), monthly contribution ($0–$5k), annual return rate (0–15%, default 8%), years (1–50, default 30). Compute month-by-month compounding and render an area chart with two stacked series: total contributions vs. growth (earnings), so users SEE the growth overtaking contributions. Animate transitions when inputs change.
>
> Below the chart: three big stat cards — final balance, total contributed, total growth — plus a dynamically computed insight line like "By year X, your money earns more per year than you contribute." Add three preset buttons: "Start at 20" / "Start at 30" / "Start at 40" using the same monthly contribution, illustrating the cost of waiting; show the difference in final balance between presets when clicked.
>
> Include a short explainer paragraph in the FLearn lesson voice with Warren the Walrus (🦭) framing why time in the market beats timing the market. Match the FLearn design system, teal accent. Make the chart responsive and legible on mobile widths.

## Feature 6 — Unlock the locked lessons

> Read src/data/curriculum.js and find every lesson with locked: true (Value Investing, Building a Portfolio, Understanding Debt, Credit Scores Explained, Refinancing Your Mortgage, The Home Buying Process). For each one: write full lesson content matching the voice, depth, and structure of the existing lessons (conversational but substantive, concrete dollar examples, bullet sections for key terms, a clear "what this means for you as a young adult" thread, ~350-500 words), then write a 7-question quiz in the standard shape (4 options, correct index, teaching explanations, mixed recall/application/conceptual). Set locked: false on all of them.
>
> Content notes: Value Investing should reference Benjamin Graham and margin of safety and connect to the Warren/Benjamin mascots. Building a Portfolio should cover diversification, asset allocation by time horizon, and index funds as the default for beginners. Understanding Debt must clearly frame good vs bad debt with APR examples (student loans vs credit cards). Credit Scores should cover the 5 FICO factors with their percentage weights and 2-3 actionable score-building moves for someone with thin credit. Refinancing should cover when it makes sense (rate drop, PMI removal, ARM escape) and break-even math on closing costs. Home Buying Process should walk pre-approval → house hunting → offer → inspection → appraisal → closing as a timeline. Verify every quiz's correct index before finishing. Data changes only — no UI changes.

## Feature 7 — Onboarding quiz → personalized path

> Add a first-visit onboarding flow to FLearn. When a user hits the app with no "flearn_onboarding" key in localStorage, route them from the start page CTA into /welcome — a 4-question flow, one question per screen, with the mascots asking:
>
> 1. 🐻 "Do you have an emergency fund?" (No / Working on it / Yes, 3+ months)
> 2. 🦭 "Have you ever bought a stock or fund?" (Never / Once or twice / I invest regularly)
> 3. 🐿️ "How's your handle on debt and credit?" (What's a credit score? / I know the basics / Solid)
> 4. 🐻 "What's your #1 money goal right now?" (Stop living paycheck to paycheck / Start investing / Buy a home someday / Reach financial independence)
>
> Score the answers into a recommended starting lesson: no emergency fund or paycheck-to-paycheck goal → Budgeting Basics; fund in progress + never invested → High-Yield Savings Accounts; fund done + wants to invest → What Is Investing?; investing already + home goal → Home Loans 101; strong on everything → Value Investing.
>
> Results screen: "Your recommended path" with the top lesson as a big CTA card plus the next two lessons in a suggested sequence, introduced by the matching mascot. Store answers + recommendation in "flearn_onboarding". Returning users skip straight to /learn; add a "Retake path quiz" link in the /learn page footer. Selecting a recommendation navigates directly into that lesson. Match the FLearn design system with the onboarding using each question's category accent color.

---

## After all seven ship

You'll have: full quizzes everywhere, a trading simulator, a budgeting lab, gamification, a killer visual tool, a complete curriculum, and personalized onboarding. That's a real product — the version you show professors and pitch competitions.

Next horizon (v3, when ready): real market data API, user accounts + backend (move off localStorage), mascot artwork, React Native mobile app.
