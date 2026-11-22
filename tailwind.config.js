/** @type {import('tailwindcss').Config} */

// Every colour is a CSS variable (defined per theme in src/index.css), stored
// as an "R G B" triplet so Tailwind's opacity modifiers (bg-accent/10) work.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: token("canvas"), // page background
        card: token("card"), // surfaces
        raised: token("raised"), // hovered / nested surfaces
        well: token("well"), // inset areas: inputs, tracks
        edge: {
          DEFAULT: token("edge"), // hairlines
          strong: token("edge-strong"),
        },
        ink: {
          DEFAULT: token("ink"),
          secondary: token("ink-2"),
          muted: token("ink-3"),
        },
        accent: {
          DEFAULT: token("accent"), // fills
          fg: token("accent-fg"), // text on an accent fill
          ink: token("accent-ink"), // accent used as text or line
        },
        // the hue of whichever course the element belongs to (see ui/theme.js)
        cat: token("cat"),
        gain: token("gain"),
        loss: token("loss"),
        warn: token("warn"),
        gold: token("gold"),
        chart2: token("chart-2"),
      },
      fontFamily: {
        display: ["'Fredoka Variable'", "ui-rounded", "system-ui", "sans-serif"],
        sans: ["'Figtree Variable'", "system-ui", "-apple-system", "'Segoe UI'", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        pop: "0 12px 32px -8px rgb(var(--shadow) / 0.35), 0 2px 6px rgb(var(--shadow) / 0.2)",
        lift: "0 1px 2px rgb(var(--shadow) / 0.12)",
        // the chunky "sticker" edge under cards and tiles
        tile: "0 4px 0 rgb(var(--edge))",
        "tile-strong": "0 4px 0 rgb(var(--edge-strong))",
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        enter: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        toast: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "10%": { opacity: "1", transform: "translateY(0)" },
          "88%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-6px)" },
        },
      },
      animation: {
        enter: "enter 0.28s ease-out both",
        bob: "bob 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
