// Which icon stands for what. Content files keep their original emoji (the
// mascots still use theirs); everything that is interface rather than
// character is drawn with one consistent icon set instead.

import {
  TrendingUp,
  PiggyBank,
  House,
  Target,
  Footprints,
  BadgeCheck,
  ChartCandlestick,
  ChartPie,
  ListChecks,
  Flame,
  CalendarDays,
  GraduationCap,
  Wrench,
  Award,
  ChartArea,
  CreditCard,
  Receipt,
  Wallet,
  Scissors,
  ShieldCheck,
  Workflow,
  Brain,
  Coffee,
  Hammer,
  Rocket,
  Building2,
  Landmark,
  Compass,
} from "lucide-react";

export const CATEGORY_ICONS = {
  investing: TrendingUp,
  "saving-budgeting": PiggyBank,
  "real-estate-loans": House,
  options: Target,
};

export const ACHIEVEMENT_ICONS = {
  "first-steps": Footprints,
  "perfect-score": BadgeCheck,
  "first-trade": ChartCandlestick,
  diversified: ChartPie,
  "budget-master": ListChecks,
  "week-warrior": Flame,
  "monthly-habit": CalendarDays,
  "investing-graduate": TrendingUp,
  "savings-graduate": PiggyBank,
  "real-estate-graduate": House,
  "options-graduate": Target,
  "tool-time": Wrench,
  scholar: GraduationCap,
};

export const TOOL_ICONS = {
  compound: ChartArea,
  budget: Wallet,
  debt: CreditCard,
  mortgage: House,
  paycheck: Receipt,
  options: Target,
};

// the money thinkers in the alignment quiz, by slug
export const PHILOSOPHER_ICONS = {
  ramsey: Scissors,
  orman: ShieldCheck,
  sethi: Workflow,
  housel: Brain,
  stephan: Coffee,
  kiyosaki: Building2,
  cardone: Rocket,
  hormozi: Hammer,
  sutton: Landmark,
};

export const achievementIcon = (id) => ACHIEVEMENT_ICONS[id] ?? Award;
export const categoryIcon = (id) => CATEGORY_ICONS[id] ?? GraduationCap;
export const philosopherIcon = (slug) => PHILOSOPHER_ICONS[slug] ?? Compass;
