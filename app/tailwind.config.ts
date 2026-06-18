import type { Config } from "tailwindcss";

/**
 * Dreamscape Systems design tokens.
 * Source of truth: BRAND-DESIGN-GUIDE.md (Appendix A).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        midnight: "#0A0F1E",
        aurora: {
          DEFAULT: "#FF6B35",
          50: "#FFF3EE",
          100: "#FFE2D5",
          400: "#FF8C5F",
          500: "#FF6B35",
          600: "#E8541F",
        },
        helios: "#F5C842",
        quartz: "#F8F9FC",
        slate: {
          100: "#F3F4F6",
          200: "#E5E7EB",
          400: "#9CA3AF",
          600: "#4B5563",
          800: "#1F2937",
          900: "#111827",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(10,15,30,0.3)",
        md: "0 4px 12px rgba(10,15,30,0.4)",
        lg: "0 12px 40px rgba(10,15,30,0.5)",
        aurora: "0 0 24px rgba(255,107,53,0.25)",
      },
      maxWidth: {
        prose: "65ch",
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
