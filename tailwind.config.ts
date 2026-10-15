import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      paper: "#FFFFFF",
      canvas: "#F7F7F5",
      line: "#EAEAEA",
      ink: "#1F2328",
      muted: "#6B7280",
      navy: {
        50: "#EEF1F7",
        100: "#DCE2EE",
        700: "#24365C",
        900: "#14213D",
      },
      gold: {
        50: "#FBF5E1",
        500: "#C9A227",
        600: "#A8861C",
      },
      success: {
        50: "#EDF3EC",
        700: "#346538",
      },
    },
    fontFamily: {
      sans: ["Vazirmatn", "Tahoma", "sans-serif"],
    },
    fontSize: {
      caption: ["0.8125rem", { lineHeight: "1.5rem" }],
      small: ["0.875rem", { lineHeight: "1.625rem" }],
      body: ["1rem", { lineHeight: "1.85rem" }],
      lead: ["1.125rem", { lineHeight: "2rem" }],
      h3: ["1.25rem", { lineHeight: "1.875rem" }],
      h2: ["1.75rem", { lineHeight: "2.5rem" }],
      h1: ["2.25rem", { lineHeight: "3rem" }],
      display: ["3rem", { lineHeight: "4rem" }],
    },
    borderRadius: {
      none: "0",
      sm: "4px",
      DEFAULT: "6px",
      lg: "12px",
      full: "9999px",
    },
    extend: {
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(20, 33, 61, 0.04)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
