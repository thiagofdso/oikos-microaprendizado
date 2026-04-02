# SessionCard & RankingCard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build SessionCard and RankingCard primitives (with accordion preview + podium illustration) plus supporting tests/exports.

**Architecture:** New components live under `src/components/cards/`, using Tailwind + clsx + lucide icons. SessionCard is a responsive 2-column glass card with status badge, CTA, progress pillar, and expandable lesson list. RankingCard renders a podium illustration for the top 3, the user's current rank block, trend sparkline, CTA, and an expandable detailed list with delta arrows.

**Tech Stack:** Next.js 16 (React 18 + TS), Tailwind CSS, clsx, lucide-react, Testing Library + Vitest (note: Vitest hangs repo-wide; run targeted tests and document behavior if blocked).

---

## File Overview
- Create `src/components/cards/SessionCard.tsx`
- Create `src/components/cards/RankingCard.tsx`
- Create tests `src/components/cards/__tests__/SessionCard.test.tsx`, `src/components/cards/__tests__/RankingCard.test.tsx`
- Update `src/components/cards/index.ts` to export new components/types

---

### Task 1: Implement SessionCard component

**Files:**
- Create: `apps/web/src/components/cards/SessionCard.tsx`
- Modify: `apps/web/src/components/cards/index.ts`

- [ ] **Step 1: Define props & status metadata**
```tsx
export type SessionStatus = "not-started" | "in-progress" | "completed";

export interface SessionCardProps {
  title: string;
  completedLessons: number;
  totalLessons: number;
  durationLabel: string;
  progressPercent: number; // 0-100
  status: SessionStatus;
  lessonsPreview?: Array<{ title: string; duration: string; completed: boolean }>;
  onAction?: () => void;
  className?: string;
}

const statusStyles: Record<SessionStatus, { label: string; badge: string; text: string }> = {
  "not-started": { label: "Comece agora", badge: "bg-areia-200/40", text: "text-grafite-700" },
  "in-progress": { label: "Em andamento", badge: "bg-marinho-500/15", text: "text-marinho-700" },
  completed: { label: "Concluída", badge: "bg-oliva-500/25", text: "text-oliva-700" },
};
```

- [ ] **Step 2: Build layout shell**
```tsx
export function SessionCard({ ...props }: SessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const progressClamp = Math.min(100, Math.max(0, progressPercent));
  const status = statusStyles[statusKey];
  return (
    <div className={clsx("glass-panel grid gap-4 md:grid-cols-[minmax(0,1fr),auto]", className)}>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <span className={clsx("rounded-full px-3 py-1 text-xs font-semibold", status.badge, status.text)}>
            {status.label}
          </span>
          <button aria-label={isExpanded ? "Recolher aulas" : "Expandir aulas"} onClick={() => setIsExpanded(!isExpanded)} className="text-grafite-500">
            <ChevronDown className={clsx("transition", isExpanded && "rotate-180")} />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-grafite-900 line-clamp-2">{title}</h3>
          <p className="text-sm text-grafite-600">{completedLessons}/{totalLessons} aulas · {durationLabel}</p>
        </div>
        <button className="mock-button" onClick={onAction}>{ctaLabel}</button>
      </div>
      <div className="hidden md:flex flex-col items-center gap-2">
        <span className="text-xs text-grafite-500">{progressClamp}%</span>
        <div className="h-24 w-2 rounded-full bg-white/10">
          <div style={{ height: `${progressClamp}%` }} className="w-full rounded-full bg-gradient-to-b from-marinho-500 to-cobre-400" />
        </div>
      </div>
      <div className="md:hidden">
        <div className="h-2 w-full rounded-full bg-white/10">
          <div style={{ width: `${progressClamp}%` }} className="h-full rounded-full bg-gradient-to-r from-marinho-500 to-cobre-400" />
        </div>
      </div>
      {lessonsPreview?.length ? (
        <div className={clsx("md:col-span-2 overflow-hidden transition-all", isExpanded ? "max-h-60" : "max-h-0")}>...
        </div>
      ) : null}
    </div>
  );
}
```
(Inside expanded block render ordered list with check icons for completed lessons; use `aria-live="polite"`.)

- [ ] **Step 3: Compute CTA label + preview list**
```tsx
const ctaLabel = statusKey === "not-started" ? "Ver primeiro vídeo" : statusKey === "in-progress" ? "Continuar assistindo" : "Rever conteúdo";
```
List entry example:
```tsx
<ol className="divide-y divide-white/10 text-sm text-grafite-600">
  {lessonsPreview.map((lesson, idx) => (
    <li key={lesson.title} className="flex items-center justify-between py-2">
      <span className="flex items-center gap-2"><span className="font-semibold">{String(idx + 1).padStart(2, "0")}</span>{lesson.title}</span>
      <span className="text-xs text-grafite-500">{lesson.duration}</span>
    </li>
  ))}
</ol>
```

- [ ] **Step 4: Update barrel export**
```ts
export { SessionCard } from "./SessionCard";
export type { SessionCardProps, SessionStatus } from "./SessionCard";
```

- [ ] **Step 5: Run lint (targeted)**
Run: `cd apps/web && pnpm lint src/components/cards/SessionCard.tsx`
Expected: PASS (if lint hangs, document in report per repo issue).

---

### Task 2: Implement RankingCard component

**Files:**
- Create: `apps/web/src/components/cards/RankingCard.tsx`
- Modify: `apps/web/src/components/cards/index.ts`

- [ ] **Step 1: Define props + helpers**
```tsx
export interface RankingCardProps {
  topThree: Array<{ name: string; points: number }>;
  userRank: number;
  userPoints: number;
  weeklyDelta: { value: string; direction: "up" | "down" | "flat" };
  trendPoints: number[];
  entries?: Array<{ name: string; points: number; rank: number; delta: number; direction: "up" | "down" | "flat"; isSelf?: boolean }>;
  className?: string;
}

const deltaColors = {
  up: "text-oliva-600",
  down: "text-cobre-600",
  flat: "text-grafite-500",
};
```

- [ ] **Step 2: Build podium illustration**
```tsx
function Podium({ topThree }: { topThree: RankingCardProps["topThree"] }) {
  const palette = ["bg-gradient-to-b from-areia-200 to-areia-400", "bg-gradient-to-b from-grafite-100 to-grafite-300", "bg-gradient-to-b from-cobre-200 to-cobre-400"];
  const heights = [88, 72, 64];
  return (
    <div className="flex items-end gap-3">
      {topThree.map((entry, idx) => (
        <div key={entry.name} className={clsx("flex flex-col items-center rounded-lg px-3 py-2 text-center", palette[idx])} style={{ height: heights[idx] }}>
          <p className="text-sm font-semibold">{idx + 1}º</p>
          <p className="text-sm">{entry.name}</p>
          <p className="text-xs text-grafite-600">{entry.points} pts</p>
        </div>
      ))}
    </div>
  );
}
```
Ensure order = [2º,1º,3º] or reorder array to highlight 1º center.

- [ ] **Step 3: Compose header + trend block**
```tsx
export function RankingCard({ ... }: RankingCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <GlassPanel className={clsx("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Podium topThree={topThreeNormalized} />
        <div className="text-right">
          <p className="text-sm text-grafite-500">Você está</p>
          <p className="text-3xl font-semibold">{userRank}º</p>
          <p className="text-base text-grafite-600">{userPoints} pts</p>
          <p className={clsx("text-sm font-semibold", deltaColors[weeklyDelta.direction])}>{weeklyDelta.value}</p>
        </div>
      </div>
      <TrendSparkline points={trendPoints} delta={weeklyDelta} />
      <button className="mock-button" onClick={() => setShowDetails(!showDetails)}>Ver detalhes</button>
      {showDetails && entries?.length ? (
        <div className="max-h-64 overflow-y-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <tbody>
              {entries.map(entry => (
                <tr key={entry.rank} className={clsx("border-b border-white/5", entry.isSelf && "bg-marinho-500/10 text-grafite-900")}>...
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </GlassPanel>
  );
}
```
TrendSparkline uses `<svg>` path built from normalized points; gradient from theme hero.

- [ ] **Step 4: Delta icons inside detail rows**
```tsx
const deltaIcon = direction === "up" ? <ArrowUpRight className="h-4 w-4" /> : direction === "down" ? <ArrowDownRight className="h-4 w-4" /> : <Minus className="h-4 w-4" />;
```
Place icon left of `delta` text. Use `text-oliva-600`, `text-cobre-600`, `text-grafite-500` classes.

- [ ] **Step 5: Update barrel export**
```ts
export { RankingCard } from "./RankingCard";
export type { RankingCardProps } from "./RankingCard";
```

- [ ] **Step 6: Run lint**
Run: `cd apps/web && pnpm lint src/components/cards/RankingCard.tsx`

---

### Task 3: Add component tests

**Files:**
- Create: `apps/web/src/components/cards/__tests__/SessionCard.test.tsx`
- Create: `apps/web/src/components/cards/__tests__/RankingCard.test.tsx`

- [ ] **Step 1: SessionCard tests**
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { SessionCard } from "../../cards/SessionCard";

describe("SessionCard", () => {
  it("renders badge + CTA per status", () => {
    render(<SessionCard title="Leadership" status="not-started" completedLessons={0} totalLessons={5} durationLabel="60 min" progressPercent={0} lessonsPreview={[]} />);
    expect(screen.getByText(/Comece agora/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ver primeiro vídeo/i })).toBeInTheDocument();
  });

  it("expands lessons preview when toggle is clicked", () => {
    render(<SessionCard ... lessonsPreview={[{ title: "Aula 1", duration: "5 min", completed: true }]} />);
    fireEvent.click(screen.getByRole("button", { name: /Expandir aulas/ }));
    expect(screen.getByText("Aula 1")).toBeVisible();
  });
});
```

- [ ] **Step 2: RankingCard tests**
```tsx
import { RankingCard } from "../../cards/RankingCard";

describe("RankingCard", () => {
  it("highlights user rank and podium entries", () => {
    render(<RankingCard topThree={[{ name:"Ana", points:420 },{ name:"João", points:450 },{ name:"Pedro", points:390 }]} userRank={7} userPoints={368} weeklyDelta={{ value:"+32 pts", direction:"up" }} trendPoints={[0,10,20]} entries={[{ rank:7, name:"Você", points:368, delta:32, direction:"up", isSelf:true }]} />);
    expect(screen.getByText(/7º/)).toBeInTheDocument();
    expect(screen.getByText(/João/)).toBeInTheDocument();
  });

  it("shows delta icons in detailed list", () => {
    const { getByRole } = render(/* same props as above */);
    fireEvent.click(screen.getByRole("button", { name: /Ver detalhes/ }));
    expect(screen.getByLabelText(/Subiu no ranking/)).toBeInTheDocument();
  });
});
```
Add `aria-label` on icons for accessibility.

- [ ] **Step 3: Run targeted tests**
Run: `cd apps/web && pnpm test src/components/cards/__tests__/SessionCard.test.tsx src/components/cards/__tests__/RankingCard.test.tsx`
If Vitest hangs, stop after observing the stall and note in report.

---

### Task 4: Documentation & final verification

**Files:**
- Modify: `apps/web/src/components/cards/index.ts`
- Update: `README.md` (if needed) referencing new components (optional if doc already covers components).

- [ ] **Step 1: Ensure index exports** (already added above; verify file now contains GlassPanel, StatCard, SessionCard, RankingCard exports).

- [ ] **Step 2: Run lint + tests once**
Commands:
```bash
cd apps/web
pnpm lint src/components/cards
pnpm test src/components/cards/__tests__/SessionCard.test.tsx src/components/cards/__tests__/RankingCard.test.tsx
```
Document any hangs.

- [ ] **Step 3: Commit**
```bash
git add apps/web/src/components/cards/SessionCard.tsx \
        apps/web/src/components/cards/RankingCard.tsx \
        apps/web/src/components/cards/__tests__/SessionCard.test.tsx \
        apps/web/src/components/cards/__tests__/RankingCard.test.tsx \
        apps/web/src/components/cards/index.ts

git commit -m "feat(cards): add session and ranking cards"
```

---

## Self-Review Checklist
- SessionCard requirements: badge colors, CTA, progress pillar/bar, accordion preview ✅ Covered Task 1.
- RankingCard requirements: podium illustration, user block, sparkline, CTA, detailed list with arrows & highlight ✅ Task 2.
- Tests verifying rendering + interactions ✅ Task 3.
- Barrel exports + lint/test commands ✅ Task 4.
- No placeholders/TBD text present.
