export type ThemeShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type ThemePalette = Record<ThemeShade, string>;
export type ThemePaletteName = "areia" | "marinho" | "cobre" | "oliva" | "grafite";
export type ThemeFontFamily = {
  sans: readonly string[];
  serif: readonly string[];
  display: readonly string[];
  mono: readonly string[];
};
export type ThemeSpacingScale = {
  sm: string;
  md: string;
  lg: string;
};
export type ThemeSpacing = {
  section: ThemeSpacingScale;
  stack: ThemeSpacingScale;
  gutter: ThemeSpacingScale;
};
export type ThemeGlass = {
  blur: {
    soft: string;
    strong: string;
  };
  borders: {
    subtle: string;
    emphasis: string;
  };
};
export type ThemeTypography = {
  fontFamily: ThemeFontFamily;
  fontSize: {
    body: string;
    lead: string;
    title: string;
    display: string;
  };
  lineHeight: {
    tight: string;
    body: string;
    relaxed: string;
  };
  tracking: {
    eyebrow: string;
    body: string;
    display: string;
  };
};

const areia: ThemePalette = {
  50: "#f9f4eb",
  100: "#f1e7d6",
  200: "#e4d2b5",
  300: "#d6bb91",
  400: "#c7a36e",
  500: "#b88b4f",
  600: "#9f6d36",
  700: "#7d5328",
  800: "#5e3d20",
  900: "#402916",
};

const marinho: ThemePalette = {
  50: "#eef4fb",
  100: "#d4e1f1",
  200: "#adc5df",
  300: "#829fc7",
  400: "#597bad",
  500: "#365f90",
  600: "#244570",
  700: "#183152",
  800: "#10223b",
  900: "#091628",
};

const cobre: ThemePalette = {
  50: "#fcf2ed",
  100: "#f8ddd0",
  200: "#f1baa2",
  300: "#e99671",
  400: "#df7046",
  500: "#c9572d",
  600: "#9f441f",
  700: "#793317",
  800: "#572410",
  900: "#38170b",
};

const oliva: ThemePalette = {
  50: "#f4f7ee",
  100: "#e5edd7",
  200: "#ccdab0",
  300: "#afc585",
  400: "#8faf5f",
  500: "#749244",
  600: "#5b7233",
  700: "#435325",
  800: "#303b1b",
  900: "#202713",
};

const grafite: ThemePalette = {
  50: "#f5f6f8",
  100: "#e5e8ec",
  200: "#c8ced8",
  300: "#a8b1bf",
  400: "#8792a5",
  500: "#677286",
  600: "#4d5768",
  700: "#39414e",
  800: "#262c36",
  900: "#151a21",
};

export const palettes: Record<ThemePaletteName, ThemePalette> = {
  areia,
  marinho,
  cobre,
  oliva,
  grafite,
};

export const colors = {
  primary: marinho[500],
  secondary: areia[500],
  accent: cobre[500],
  background: areia[50],
  foreground: grafite[900],
  success: oliva[500],
} as const;

export type ThemeColorName = keyof typeof colors;

export const gradients = {
  hero: `linear-gradient(135deg, ${marinho[700]} 0%, ${marinho[500]} 42%, ${cobre[400]} 100%)`,
  ocean: `radial-gradient(circle at top left, ${marinho[300]} 0%, ${marinho[600]} 38%, ${grafite[900]} 100%)`,
  copper: `linear-gradient(120deg, ${cobre[200]} 0%, ${cobre[500]} 55%, ${areia[300]} 100%)`,
} as const;

export const glass: ThemeGlass = {
  blur: {
    soft: "12px",
    strong: "24px",
  },
  borders: {
    subtle: "1px solid rgba(255, 255, 255, 0.18)",
    emphasis: `1px solid ${areia[200]}`,
  },
};

export const spacing: ThemeSpacing = {
  section: {
    sm: "clamp(3rem, 8vw, 4.5rem)",
    md: "clamp(4rem, 10vw, 6rem)",
    lg: "clamp(5rem, 12vw, 7.5rem)",
  },
  stack: {
    sm: "0.75rem",
    md: "1.25rem",
    lg: "2rem",
  },
  gutter: {
    sm: "1rem",
    md: "1.5rem",
    lg: "2.5rem",
  },
};

export const typography: ThemeTypography = {
  fontFamily: {
    sans: ["var(--font-sans)", "Inter", "Segoe UI", "Arial", "sans-serif"],
    serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
    display: ["var(--font-display)", "var(--font-serif)", "Georgia", "serif"],
    mono: ["var(--font-mono)", "SFMono-Regular", "Consolas", "monospace"],
  },
  fontSize: {
    body: "1rem",
    lead: "1.125rem",
    title: "clamp(2rem, 4vw, 3rem)",
    display: "clamp(3rem, 7vw, 5rem)",
  },
  lineHeight: {
    tight: "1.1",
    body: "1.6",
    relaxed: "1.8",
  },
  tracking: {
    eyebrow: "0.12em",
    body: "0em",
    display: "-0.03em",
  },
};

export const theme = {
  palettes,
  colors,
  gradients,
  glass,
  spacing,
  typography,
} as const;

export type Theme = typeof theme;

export default theme;
