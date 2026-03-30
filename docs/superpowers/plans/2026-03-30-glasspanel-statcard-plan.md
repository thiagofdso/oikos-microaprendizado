# GlassPanel + StatCard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reusable GlassPanel and StatCard primitives with accent styling, responsive grids, and trend indicators.

**Architecture:** Create `GlassPanel` as the visual wrapper with glass styling, accent tinting, optional header/actions, and responsive content grid. Compose it in `StatCard` to present labeled metrics with optional trend and extra content.

**Tech Stack:** Next.js (React 18), TypeScript, Tailwind CSS, clsx, lucide-react.

---

## File Topology
- Create: `apps/web/src/components/cards/GlassPanel.tsx` — glass wrapper with header, content grid, accent styling.
- Create: `apps/web/src/components/cards/StatCard.tsx` — composed stat card with trend, orientation control.
- Create: `apps/web/src/components/cards/index.ts` — barrel exports.

---

### Task 1: Add GlassPanel component

**Files:**
- Create: `apps/web/src/components/cards/GlassPanel.tsx`

- [ ] **Step 1: Define types, props, and accent mappings**

```tsx
export type GlassAccent = "areia" | "marinho" | "cobre" | "oliva" | "grafite";

const accentStyles: Record<GlassAccent, string> = {
  marinho: "from-marinho-500/40 via-marinho-500/10 to-transparent border-marinho-300/30",
  areia: "from-areia-400/40 via-areia-300/10 to-transparent border-areia-200/40",
  cobre: "from-cobre-500/40 via-cobre-400/10 to-transparent border-cobre-300/30",
  oliva: "from-oliva-500/40 via-oliva-400/10 to-transparent border-oliva-300/30",
  grafite: "from-grafite-700/35 via-grafite-600/10 to-transparent border-grafite-400/30",
};
```

- [ ] **Step 2: Implement layout and header logic**

```tsx
const hasHeader = Boolean(eyebrow || title || subtitle || actions);
const hasHeadingCopy = Boolean(eyebrow || title || subtitle);
```

- [ ] **Step 3: Implement responsive content grid + helper text**

```tsx
const gridCols = columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-1";
```

- [ ] **Step 4: Verify TypeScript by running lint**

Run: `pnpm lint`

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/components/cards/GlassPanel.tsx
# commit later with other card files
```

### Task 2: Add StatCard component

**Files:**
- Create: `apps/web/src/components/cards/StatCard.tsx`

- [ ] **Step 1: Define props and trend styles**

```tsx
type TrendDirection = "up" | "down" | "flat";
const trendStyles: Record<TrendDirection, string> = {
  up: "text-oliva-600",
  down: "text-cobre-600",
  flat: "text-grafite-500",
};
```

- [ ] **Step 2: Compose GlassPanel with label/value/subValue**

```tsx
<GlassPanel eyebrow={label} title={String(value)} subtitle={subValue} ... />
```

- [ ] **Step 3: Implement orientation layout and trend row**

```tsx
const isHorizontal = orientation === "horizontal";
```

- [ ] **Step 4: Verify TypeScript by running lint**

Run: `pnpm lint`

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/components/cards/StatCard.tsx
# commit later with barrel + lint
```

### Task 3: Add barrel export

**Files:**
- Create: `apps/web/src/components/cards/index.ts`

- [ ] **Step 1: Export components**

```ts
export { GlassPanel } from "./GlassPanel";
export { StatCard } from "./StatCard";
export type { GlassPanelProps } from "./GlassPanel";
export type { StatCardProps } from "./StatCard";
```

- [ ] **Step 2: Verify TypeScript by running lint**

Run: `pnpm lint`

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/components/cards/index.ts
```

### Task 4: Final lint + commit

**Files:**
- Modify: `apps/web/src/components/cards/*`

- [ ] **Step 1: Run lint**

Run: `pnpm lint`

- [ ] **Step 2: Commit changes**

```bash
git add apps/web/src/components/cards/GlassPanel.tsx apps/web/src/components/cards/StatCard.tsx apps/web/src/components/cards/index.ts

git commit -m "feat(cards): add glass and stat card primitives"
```
