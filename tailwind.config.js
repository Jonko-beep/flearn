/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          start: "#0a0f1e",
          mid: "#111827",
          end: "#1a1a2e",
        },
        card: "#1e293b",
        well: "#0f172a",
        edge: "#334155",
        ink: {
          DEFAULT: "#f1f5f9",
          secondary: "#94a3b8",
          muted: "#64748b",
        },
        invest: "#0D9488",
        save: "#7C3AED",
        estate: "#D97706",
        success: "#059669",
        warning: "#f59e0b",
        error: "#dc2626",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
      },
      letterSpacing: {
        heading: "-0.02em",
      },
      borderRadius: {
        card: "14px",
        "card-lg": "16px",
      },
      keyframes: {
        fadeInDown: {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-30px)" },
        },
      },
      animation: {
        "fade-in-down": "fadeInDown 0.6s ease-out both",
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "scale-in": "scaleIn 0.4s ease-out both",
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
