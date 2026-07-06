// Onboarding quiz — questions, scoring, and the recommended lesson paths.
// Answers + recommendation persist in localStorage under "flearn_onboarding".

import { getLesson } from "../data/curriculum.js";

const STORAGE_KEY = "flearn_onboarding";

export const ONBOARDING_QUESTIONS = [
  {
    key: "emergencyFund",
    mascot: { name: "Benjamin the Bear", emoji: "🐻" },
    color: "#7C3AED",
    question: "Do you have an emergency fund?",
    options: [
      { value: "no", label: "No" },
      { value: "working", label: "Working on it" },
      { value: "yes", label: "Yes, 3+ months" },
    ],
  },
  {
    key: "investing",
    mascot: { name: "Warren the Walrus", emoji: "🦭" },
    color: "#0D9488",
    question: "Have you ever bought a stock or fund?",
    options: [
      { value: "never", label: "Never" },
      { value: "some", label: "Once or twice" },
      { value: "regular", label: "I invest regularly" },
    ],
  },
  {
    key: "debtCredit",
    mascot: { name: "Charlie the Chipmunk", emoji: "🐿️" },
    color: "#D97706",
    question: "How's your handle on debt and credit?",
    options: [
      { value: "none", label: "What's a credit score?" },
      { value: "basics", label: "I know the basics" },
      { value: "solid", label: "Solid" },
    ],
  },
  {
    key: "goal",
    mascot: { name: "Benjamin the Bear", emoji: "🐻" },
    color: "#7C3AED",
    question: "What's your #1 money goal right now?",
    options: [
      { value: "paycheck", label: "Stop living paycheck to paycheck" },
      { value: "invest", label: "Start investing" },
      { value: "home", label: "Buy a home someday" },
      { value: "fi", label: "Reach financial independence" },
    ],
  },
];

// Recommended starting lesson plus the next two in a suggested sequence.
const PATHS = {
  "budgeting-basics": {
    intro:
      "Let's get your money under control first — a budget is the foundation everything else sits on.",
    sequence: [
      { categoryId: "saving-budgeting", lessonId: "budgeting-basics" },
      { categoryId: "saving-budgeting", lessonId: "emergency-fund" },
      { categoryId: "saving-budgeting", lessonId: "hysa" },
    ],
  },
  hysa: {
    intro:
      "You're building the habit — now let's make every dollar you save earn its keep.",
    sequence: [
      { categoryId: "saving-budgeting", lessonId: "hysa" },
      { categoryId: "saving-budgeting", lessonId: "emergency-fund" },
      { categoryId: "investing", lessonId: "intro-investing" },
    ],
  },
  "intro-investing": {
    intro: "Your safety net is in place. Time to put your money to work.",
    sequence: [
      { categoryId: "investing", lessonId: "intro-investing" },
      { categoryId: "investing", lessonId: "stocks-101" },
      { categoryId: "investing", lessonId: "portfolio-building" },
    ],
  },
  "home-loans-intro": {
    intro:
      "You've got investing down — let's point that momentum toward the keys to your own front door.",
    sequence: [
      { categoryId: "real-estate-loans", lessonId: "home-loans-intro" },
      { categoryId: "real-estate-loans", lessonId: "conventional-loans" },
      { categoryId: "real-estate-loans", lessonId: "home-buying-process" },
    ],
  },
  "value-investing": {
    intro:
      "You've mastered the fundamentals. Time to learn how the greats find bargains.",
    sequence: [
      { categoryId: "investing", lessonId: "value-investing" },
      { categoryId: "investing", lessonId: "portfolio-building" },
      { categoryId: "investing", lessonId: "tangible-assets" },
    ],
  },
};

export function scoreOnboarding(answers) {
  const { emergencyFund, investing, debtCredit, goal } = answers;
  // Safety first: no cushion or living paycheck-to-paycheck → budgeting
  if (emergencyFund === "no" || goal === "paycheck") return "budgeting-basics";
  // Already investing with a home goal → mortgages
  if (investing === "regular" && goal === "home") return "home-loans-intro";
  // Strong on everything → the advanced material
  if (emergencyFund === "yes" && investing === "regular" && debtCredit === "solid")
    return "value-investing";
  // Fund in progress + never invested → make savings work harder
  if (emergencyFund === "working" && investing === "never") return "hysa";
  // Fund done + wants to start investing → fundamentals
  if (emergencyFund === "yes") return "intro-investing";
  // Remaining mixed profiles
  return investing === "never" ? "hysa" : "intro-investing";
}

// Resolves a recommendation id into { intro, lessons: [{ category, lesson }] }.
export function getRecommendedPath(recommendation) {
  const path = PATHS[recommendation] || PATHS["budgeting-basics"];
  return {
    intro: path.intro,
    lessons: path.sequence
      .map(({ categoryId, lessonId }) => getLesson(categoryId, lessonId))
      .filter(({ lesson }) => lesson),
  };
}

export function readOnboarding() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.recommendation) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeOnboarding(answers, recommendation) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ answers, recommendation, completedAt: new Date().toISOString() })
    );
  } catch {
    // storage unavailable — the quiz still works, it just won't persist
  }
}

export function hasOnboarded() {
  return readOnboarding() !== null;
}
