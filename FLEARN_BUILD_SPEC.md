# FLearn — Build Spec (v1)

A financial literacy learning platform for young adults. Video lessons + transcripts + mastery quizzes, organized by category, with progress saved locally. This is the v1 scope: get a real, deployable app running that mirrors the two prototypes, then layer on the bigger features (simulated portfolio, budgeting exercises, mascot art, accounts/backend) later.

---

## 1. Stack

- **React 18 + Vite** (your standard)
- **Tailwind CSS** for styling
- **React Router** for real routing (replaces the state-based screen switching in the prototypes)
- **localStorage** for progress persistence (v1 — no backend yet)
- **GitHub → Vercel** auto-deploy

No auth, no database, no server in v1. Everything runs client-side.

---

## 2. Folder structure

```
flearn/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                  # Router + layout
    ├── index.css                # Tailwind directives + base styles
    ├── data/
    │   └── curriculum.js        # All categories, lessons, transcripts, quizzes
    ├── hooks/
    │   └── useProgress.js       # localStorage read/write + computed stats
    ├── pages/
    │   ├── StartPage.jsx        # Landing / hero
    │   ├── CategoryPage.jsx     # Grid of the 3 categories + overall progress
    │   ├── LessonListPage.jsx   # Lessons within a category + mascot card
    │   └── LessonPage.jsx       # Phase-based: video → quiz → results
    └── components/
        ├── CategoryCard.jsx
        ├── LessonCard.jsx
        ├── MascotCard.jsx
        ├── ProgressBar.jsx
        ├── VideoPlayer.jsx      # YouTube iframe embed
        ├── Transcript.jsx       # Collapsible, timestamped
        ├── Quiz.jsx             # Question flow + instant feedback
        └── ResultsScreen.jsx    # Score ring + mastery + answer review
```

---

## 3. Routing

| Path | Page |
|------|------|
| `/` | StartPage |
| `/learn` | CategoryPage |
| `/learn/:categoryId` | LessonListPage |
| `/learn/:categoryId/:lessonId` | LessonPage |

---

## 4. Data model

`src/data/curriculum.js` exports an array of categories:

```js
export const categories = [
  {
    id: "investing",
    title: "Investing",
    emoji: "📈",
    color: "#0D9488",
    description: "...",
    mascot: { name: "Warren the Walrus", emoji: "🦭", quote: "..." },
    lessons: [
      {
        id: "hysa",
        title: "High-Yield Savings Accounts",
        subtitle: "Make your savings actually earn something",
        duration: "10 min",
        difficulty: "Beginner",   // "Beginner" | "Intermediate"
        locked: false,
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID",  // null until recorded
        transcript: [
          { time: "0:00", text: "..." },
          // ...
        ],
        quiz: [
          {
            id: 1,
            question: "...",
            options: ["...", "...", "...", "..."],
            correct: 1,            // index of correct option
            explanation: "...",
          },
          // ...
        ],
      },
      // ...
    ],
  },
  // ...
];
```

### Progress model
localStorage key: `flearn_progress`

```js
{
  [lessonId]: {
    completed: boolean,   // true once bestScore >= 70
    bestScore: number,    // best quiz % achieved
    attempts: number,
    lastAttempt: string,  // ISO date
  }
}
```

**Mastery rule:** a lesson is `completed` when `bestScore >= 70`.

---

## 5. Curriculum content (reuse the prototypes)

The two prototype files already contain finished lesson copy and quiz questions. Drop them into the repo and lift the content into `curriculum.js` rather than rewriting it:

- `finance-learn-prototype.jsx` → category structure, mascots, and full lesson text for Investing, Saving & Budgeting, and Real Estate & Loans
- `interactive-lesson-demo.jsx` → the complete HYSA transcript + 7-question quiz (use this as the template for every other lesson's transcript/quiz shape)

### Category & lesson map

**Investing** — 🦭 Warren the Walrus (teal `#0D9488`)
- What Is Investing? *(full text)*
- Tangible Assets *(full text)*
- Stocks 101 *(full text)*
- Value Investing *(locked / stub)*
- Building a Portfolio *(locked / stub)*

**Saving & Budgeting** — 🐻 Benjamin the Bear (purple `#7C3AED`)
- Budgeting Basics *(full text)*
- High-Yield Savings Accounts *(full text + transcript + quiz — the complete template)*
- Building an Emergency Fund *(full text)*
- Understanding Debt *(locked / stub)*
- Credit Scores Explained *(locked / stub)*

**Real Estate & Loans** — 🐿️ Charlie the Chipmunk (amber `#D97706`)
- Home Loans 101 *(full text)*
- Conventional Loans *(full text)*
- FHA Loans *(full text)*
- VA Loans *(full text)*
- USDA Loans *(full text)*
- Fixed-Rate vs. Adjustable-Rate *(full text)*
- Refinancing Your Mortgage *(locked / stub)*
- The Home Buying Process *(locked / stub)*

For lessons that only have reading text so far (no transcript/quiz yet), render the text as the lesson body and show the quiz as "Coming soon" — or generate a starter quiz. Only HYSA has a full transcript + quiz today; that's the reference implementation for the rest.

---

## 6. Lesson page mechanics

Phase-based, matching the interactive demo:

1. **Lesson phase** — `VideoPlayer` (YouTube iframe; if `videoUrl` is null, show a styled placeholder with the mascot). Below it, a collapsible `Transcript` with clickable timestamps. A "Take the Quiz →" CTA.
2. **Quiz phase** — one question at a time via `Quiz`. On submit: lock the choice, reveal correct/incorrect coloring + the explanation, then "Next Question →".
3. **Results phase** — `ResultsScreen`: score as a conic-gradient ring, mastery banner (≥70% = "Lesson Mastered 🎉", else "Keep Learning 📚"), and a per-question answer review. On mastery, call `useProgress` to persist and surface "Next Lesson →". Below 70%, offer "Review Lesson" + "Try Again".

---

## 7. Design system (dark premium)

Carry over the look from the prototypes.

**Colors**
- Background gradient: `#0a0f1e → #111827 → #1a1a2e`
- Card surface: `#1e293b` · borders `#334155` · deep wells `#0f172a`
- Text: primary `#f1f5f9` · secondary `#94a3b8` · muted `#64748b`
- Category accents: investing `#0D9488` · saving `#7C3AED` · real estate `#D97706`
- Semantic: success `#059669` · warning `#f59e0b` · error `#dc2626`

**Type**
- Headings: Georgia / serif, tight letter-spacing (`-0.02em`)
- Body/UI: system sans (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)

**Feel**
- Rounded cards (14–16px), subtle hover lift + accent-colored border on hover
- `fadeInDown` / `fadeInUp` entrance animations, staggered on lists
- Pill-shaped primary buttons with a soft accent glow

Set these as Tailwind theme extensions (colors + fontFamily) so components stay clean.

---

## 8. Deploy

Standard flow:
1. `git init`, commit, push to a new repo under `Jonko-beep`
2. Import the repo in Vercel → framework preset **Vite** → deploy
3. Auto-deploy on push to `main` thereafter

---

## 9. Out of scope for v1 (roadmap)

- Simulated stock portfolio (real market data via Alpha Vantage / yfinance-backed endpoint)
- Interactive budgeting exercises
- Tangible-assets module (gold/silver price tie-ins)
- Commissioned mascot artwork + aged-up variants per tier
- User accounts + a real backend (move progress off localStorage)
- Mobile app (React Native sharing this logic)

---

## 10. Claude Code kickoff prompt

Paste this into Claude Code from an empty `flearn/` directory (with the two prototype `.jsx` files copied in for reference):

> Build a React + Vite + Tailwind app called **FLearn**, a financial literacy learning platform. Use React Router with routes: `/` (landing), `/learn` (category grid), `/learn/:categoryId` (lesson list), `/learn/:categoryId/:lessonId` (lesson page). Persist progress in localStorage under key `flearn_progress` via a `useProgress` hook; a lesson is "completed" once its best quiz score is ≥ 70%.
>
> There are three categories, each with a mascot: **Investing** (🦭 Warren the Walrus, accent `#0D9488`), **Saving & Budgeting** (🐻 Benjamin the Bear, accent `#7C3AED`), **Real Estate & Loans** (🐿️ Charlie the Chipmunk, accent `#D97706`). Pull all category structure, lesson copy, transcripts, and quiz questions from the two files `finance-learn-prototype.jsx` and `interactive-lesson-demo.jsx` in this directory into `src/data/curriculum.js`. The HYSA lesson in `interactive-lesson-demo.jsx` is the full reference implementation (video placeholder + timestamped transcript + 7-question quiz with explanations) — match its shape for the data model.
>
> Each lesson page is phase-based: (1) a YouTube-iframe video player (`videoUrl`, with a styled mascot placeholder when null) plus a collapsible timestamped transcript; (2) a one-question-at-a-time quiz with instant correct/incorrect feedback and explanations; (3) a results screen with a conic-gradient score ring, a mastery banner at the 70% threshold, and a per-question answer review. Lessons marked `locked: true` render but aren't enterable.
>
> Match this dark-premium aesthetic: background gradient `#0a0f1e → #111827 → #1a1a2e`, card surfaces `#1e293b`, borders `#334155`, primary text `#f1f5f9`, secondary `#94a3b8`, muted `#64748b`; Georgia serif headings, system-sans body; rounded 14–16px cards with hover lift, pill buttons, and fadeIn entrance animations. Put colors and fonts in the Tailwind theme. Then give me the commands to run it locally and deploy to Vercel.

---

*Reference files: `finance-learn-prototype.jsx` (full platform flow), `interactive-lesson-demo.jsx` (video + transcript + quiz + mastery).*
