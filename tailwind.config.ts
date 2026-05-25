import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Override Tailwind defaults — Rosewood aesthetic has no rounded corners.
    borderRadius: {
      none: "0",
      sm: "0",
      DEFAULT: "0",
      md: "0",
      lg: "0",
      xl: "0",
      "2xl": "0",
      "3xl": "0",
      full: "9999px",
    },
    extend: {
      colors: {
        // Rosewood palette
        ivory: "#f6eee0",
        "ivory-warm": "#faf3e4",
        parchment: "#efe2c8",
        ink: "#2a1414",
        oxblood: "#6b1e1e",
        brass: "#b89968",
        "brass-light": "#d4b88a",
        "brass-deep": "#8a6b3b",
        "body-warm": "#4a3a30",
        "body-inverted": "#c9b08a",

        // Semantic tokens remapped to Rosewood
        background: "#f6eee0",
        foreground: "#2a1414",
        muted: {
          DEFAULT: "#8a6b3b",
          foreground: "#4a3a30",
        },
        border: "#b89968",
        input: "#b89968",
        ring: "#6b1e1e",
        primary: {
          DEFAULT: "#2a1414",
          foreground: "#f6eee0",
        },
        secondary: {
          DEFAULT: "#efe2c8",
          foreground: "#2a1414",
        },
        destructive: {
          DEFAULT: "#6b1e1e",
          foreground: "#f6eee0",
        },
        accent: {
          DEFAULT: "#6b1e1e",
          foreground: "#f6eee0",
        },
        lime: {
          DEFAULT: "#6b1e1e",
          foreground: "#f6eee0",
        },
        card: {
          DEFAULT: "#faf3e4",
          foreground: "#2a1414",
        },
        popover: {
          DEFAULT: "#faf3e4",
          foreground: "#2a1414",
        },
      },
      fontFamily: {
        sans: ['"Libre Caslon Text"', "ui-serif", "Georgia", "serif"],
        serif: ['"Playfair Display"', "ui-serif", "Georgia", "serif"],
        caslon: ['"Libre Caslon Text"', "ui-serif", "Georgia", "serif"],
        display: ['"Playfair Display"', "ui-serif", "Georgia", "serif"],
        mono: ['"Inconsolata"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        "rosewood-card": "0 2px 12px rgba(42,20,20,0.04)",
        "rosewood-card-hover": "0 20px 60px rgba(42,20,20,0.15)",
        "rosewood-float": "0 2px 40px rgba(42,20,20,0.18)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
