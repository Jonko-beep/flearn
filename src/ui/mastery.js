// How a quiz score is described and coloured. The score bands themselves come
// from the curriculum (getMasteryInfo); this only maps them onto theme tones.

import { getMasteryInfo } from "../data/curriculum.js";

const BANDS = {
  "Not Started": { label: "Not started", tone: "neutral" },
  "Try Again": { label: "Try again", tone: "loss" },
  Proficient: { label: "Proficient", tone: "warn" },
  Advanced: { label: "Advanced", tone: "accent" },
  Mastered: { label: "Perfect", tone: "gold" },
};

export function masteryBand(score) {
  const info = getMasteryInfo(score ?? null);
  return BANDS[info.label] ?? { label: info.label, tone: "neutral" };
}
