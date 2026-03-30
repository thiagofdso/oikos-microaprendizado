# GlassPanel + StatCard Design

## Goal
Create two reusable card primitives for the Microlearning MVP UI: a flexible glass wrapper (`GlassPanel`) and a stat-focused composition (`StatCard`). Both must align with the existing glass aesthetic, support accent colors, icon slots, helper text, and responsive layouts.

## Architecture
- `GlassPanel` is the visual shell responsible for glass styling, accent tinting, optional header/actions, responsive content grid, and helper text.
- `StatCard` composes `GlassPanel`, supplying the heading copy (label/value/subValue), trend row, and optional extra content. It delegates glass styling, accent treatment, and general layout to `GlassPanel`.
- Accent class mappings live locally within the cards module (no new shared helpers).

## Component Design
### GlassPanel
**Location:** `src/components/cards/GlassPanel.tsx`

**Props**
- `eyebrow?: string`
- `title?: string`
- `subtitle?: string`
- `helperText?: string`
- `icon?: ReactNode`
- `actions?: ReactNode`
- `children: ReactNode`
- `accent?: "areia" | "marinho" | "cobre" | "oliva" | "grafite"` (default `"marinho"`)
- `columns?: 1 | 2 | 3` (default `1`)
- `gap?: "tight" | "normal" | "loose"`
- `padding?: "sm" | "md" | "lg"`
- `className?: string`
- `contentClassName?: string`

**Behavior**
- Applies base glass classes plus a subtle gradient and border tint using the `accent` mapping.
- If `icon` is provided, renders a circular tinted icon container aligned with the header text.
- Header row renders only when heading content or `actions` exists; if only `actions`, left slot remains empty to keep right alignment.
- Content uses a responsive grid: always 1 column on small screens, `md:grid-cols-{columns}` on medium+.
- `helperText` renders as muted caption below the content.

### StatCard
**Location:** `src/components/cards/StatCard.tsx`

**Props**
- `label: string`
- `value: string | number`
- `subValue?: string`
- `helperText?: string`
- `trend?: { value: string; direction: "up" | "down" | "flat"; label?: string }`
- `accent?: GlassPanel accent union`
- `icon?: ReactNode`
- `actions?: ReactNode`
- `orientation?: "vertical" | "horizontal"` (default `"vertical"`)
- `children?: ReactNode`
- `className?: string`

**Behavior**
- Passes `label` as `eyebrow`, `value` as `title`, `subValue` as `subtitle` into `GlassPanel`.
- Trend row uses lucide icons: `ArrowUpRight`, `ArrowDownRight`, `Minus`.
  - Color tokens: `oliva` for up, `cobre` for down, `grafite/areia` mix for flat.
- Orientation controls layout for the stat block vs extra content:
  - Vertical: stack on all breakpoints.
  - Horizontal: stack on small screens, side-by-side on desktop.

## Data Flow
- Stateless, render-only components. All content is supplied via props. No hooks or external state.

## Error Handling
- Optional props render conditionally. Defaults ensure stable layout with minimal configuration.

## Testing
- No new tests required for this step. Linting should pass. Note: test runner (Vitest) currently hangs in this repo; document this in the implementation report.
