import type { Config } from "tailwindcss";

import { theme } from "./src/lib/theme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ...theme.palettes,
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        accent: theme.colors.accent,
        background: theme.colors.background,
        foreground: theme.colors.foreground,
        success: theme.colors.success,
      },
      fontFamily: {
        sans: [...theme.typography.fontFamily.sans],
        serif: [...theme.typography.fontFamily.serif],
        display: [...theme.typography.fontFamily.display],
        mono: [...theme.typography.fontFamily.mono],
      },
      backgroundImage: {
        aurora: theme.gradients.hero,
        "ocean-wave": theme.gradients.ocean,
        "sunset-rush": theme.gradients.copper,
      },
      boxShadow: {
        glass: "0 24px 60px -32px rgba(9, 22, 40, 0.58)",
        "glass-soft": "0 18px 40px -28px rgba(21, 26, 33, 0.38)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.28)",
      },
      keyframes: {
        "pulse-dial": {
          "0%, 100%": {
            opacity: "0.4",
            transform: "scaleX(0.92)",
          },
          "50%": {
            opacity: "1",
            transform: "scaleX(1)",
          },
        },
        "shimmer-scroll": {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "-200% 0",
          },
        },
      },
      animation: {
        "pulse-dial": "pulse-dial 3.2s ease-in-out infinite",
        "shimmer-scroll": "shimmer-scroll 5.5s linear infinite",
      },
    },
  },
};

export default config;
