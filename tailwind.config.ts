import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      paper: "#FFFFFF",
      canvas: "#F2F4F9",
      line: "#EAEAEA",
      ink: "#1F2328",
      muted: "#4B5563",
      navy: {
        50: "#EEF1F7",
        100: "#DCE2EE",
        300: "#8FA3CC",
        700: "#24365C",
        900: "#14213D",
      },
      accent: {
        50: "#E8EDF7",
        200: "#B7C5E2",
        500: "#2B4C8C",
        600: "#1F3A70",
      },
      sky: {
        200: "#B9D5F7",
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
        glass: "inset 0 1px 0 0 rgba(255, 255, 255, 0.4), 0 8px 32px -8px rgba(20, 33, 61, 0.12)",
        "glass-strong": "inset 0 1px 0 0 rgba(255, 255, 255, 0.6), 0 16px 48px -12px rgba(20, 33, 61, 0.18)",
      },
      blur: {
        blob: "80px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
