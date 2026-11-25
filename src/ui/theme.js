// Theme (dark / light) and the colour "hue" that marks which course something
// belongs to. Colours themselves live in src/index.css as CSS variables; this
// file only chooses between them.

import { useSyncExternalStore } from "react";

const THEME_KEY = "flearn_theme";
const listeners = new Set();

function readTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // storage unavailable — fall through to the default
  }
  return "dark";
}

let theme = readTheme();

function apply() {
  document.documentElement.dataset.theme = theme;
}
apply();

export function setTheme(next) {
  theme = next === "light" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // the choice still applies for this visit
  }
  apply();
  for (const fn of listeners) fn();
}

export function useTheme() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => theme
  );
}

// ---------------------------------------------------------------- hues
// Content files identify colours by course id, short name, or a legacy hex
// value. All of them resolve to one of the --cat-* variables.
const HUES = {
  investing: "investing",
  invest: "investing",
  "#0d9488": "investing",
  "#059669": "investing",
  "saving-budgeting": "saving",
  save: "saving",
  saving: "saving",
  "#7c3aed": "saving",
  "#8b5cf6": "saving",
  "#6366f1": "saving",
  "real-estate-loans": "estate",
  estate: "estate",
  "#d97706": "estate",
  "#f59e0b": "estate",
  "fixed-income": "bonds",
  bonds: "bonds",
  "#65a30d": "bonds",
  options: "options",
  "#0ea5e9": "options",
  "#3b82f6": "options",
  align: "align",
  "#ec4899": "align",
  "#dc2626": "align",
  "#ef4444": "align",
};

export function hueName(key) {
  return HUES[String(key ?? "").toLowerCase()] ?? null;
}

/** Inline style that sets the `cat` colour for an element and its children. */
export function hue(key) {
  const name = hueName(key);
  return name ? { "--cat": `var(--cat-${name})` } : undefined;
}

/** A theme colour as a CSS value, for charts and other inline styles. */
export function color(name, alpha) {
  return alpha == null ? `rgb(var(--${name}))` : `rgb(var(--${name}) / ${alpha})`;
}
