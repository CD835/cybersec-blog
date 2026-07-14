import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          50: "#e6fffb",
          100: "#b3fff2",
          200: "#80ffe9",
          300: "#4dffe0",
          400: "#1affd7",
          500: "#00e6bf",
          600: "#00b394",
          700: "#00806a",
          800: "#004d40",
          900: "#001a15",
          950: "#000d0a",
        },
        matrix: {
          DEFAULT: "#00ff41",
          dark: "#008f11",
          light: "#39ff14",
        },
        terminal: {
          bg: "#0a0a0a",
          fg: "#33ff33",
          dim: "#1a1a2e",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Cascadia Code",
          "Consolas",
          "monospace",
        ],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            code: {
              backgroundColor: "#1a1a2e",
              color: "#00ff41",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        scan: "scan 3s linear infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 5px #00ff41, 0 0 10px #00ff41" },
          "100%": { boxShadow: "0 0 20px #00ff41, 0 0 40px #00ff41" },
        },
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
