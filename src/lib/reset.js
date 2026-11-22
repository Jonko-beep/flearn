// Wipes everything FLearn has saved on this device — lessons, XP, streaks,
// achievements, review queue, final exams, portfolio, tool inputs, the
// first-visit answers and the money-style result — so the app starts over as
// it would for a brand-new visitor. Only the light/dark choice survives.

const PREFIX = "flearn_";
const KEEP = new Set(["flearn_theme"]);

export function resetAllProgress() {
  try {
    const doomed = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(PREFIX) && !KEEP.has(key)) doomed.push(key);
    }
    for (const key of doomed) localStorage.removeItem(key);
  } catch {
    // storage unavailable — there was nothing saved to clear
  }
  // Several stores keep a copy in memory; a full reload starts them fresh.
  window.location.assign("/");
}
