/** @vitest-environment node */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { theme } from "@/lib/theme";

describe("theme", () => {
  const globalsCssPath = fileURLToPath(new URL("../app/globals.css", import.meta.url));
  const globalsCss = readFileSync(globalsCssPath, "utf8");
  const gradientsCssPath = fileURLToPath(new URL("../styles/gradients.css", import.meta.url));
  const gradientsCss = readFileSync(gradientsCssPath, "utf8");

  it("exposes stable palette aliases and shared tokens", () => {
    expect(theme.palettes.areia[50]).toBeTypeOf("string");
    expect(theme.palettes.marinho[500]).toBeTypeOf("string");
    expect(theme.palettes.cobre[700]).toBeTypeOf("string");
    expect(theme.palettes.oliva[400]).toBeTypeOf("string");
    expect(theme.palettes.grafite[900]).toBeTypeOf("string");

    expect(theme.colors.primary).toBe(theme.palettes.marinho[500]);
    expect(theme.colors.secondary).toBe(theme.palettes.areia[500]);
    expect(theme.colors.accent).toBe(theme.palettes.cobre[500]);

    expect(theme.gradients.hero).toContain("linear-gradient");
    expect(theme.gradients.ocean).toContain("radial-gradient");
    expect(theme.gradients.copper).toContain("linear-gradient");

    expect(theme.spacing.section).toBeDefined();
    expect(theme.spacing.stack).toBeDefined();
    expect(theme.spacing.gutter).toBeDefined();
    expect(theme.typography.fontFamily.display.length).toBeGreaterThan(0);
  });

  it("keeps CSS custom properties aligned with the shared theme tokens", () => {
    expect(globalsCss).toContain(`--color-areia-500: ${theme.palettes.areia[500]};`);
    expect(globalsCss).toContain(`--gradient-hero: ${theme.gradients.hero};`);
    expect(theme.typography.fontFamily.display[0]).toBe("var(--font-display)");
    expect(globalsCss).toContain(
      '--font-display: "Surt Variable", "Iowan Old Style", "Palatino Linotype", var(--font-serif);',
    );
  });

  it("keeps gradient helper classes as Tailwind aliases", () => {
    expect(globalsCss).toContain('@import "../styles/gradients.css" layer(utilities);');
    expect(gradientsCss).toContain("@apply bg-aurora;");
    expect(gradientsCss).toContain("@apply bg-ocean-wave;");
    expect(gradientsCss).toContain("@apply bg-sunset-rush;");
  });
});
