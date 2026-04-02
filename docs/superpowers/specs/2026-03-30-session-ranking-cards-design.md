# SessionCard & RankingCard Design

## Goal
Deliver high-fidelity card primitives for the student dashboard/list views and the ranking area. SessionCard highlights progress, CTA, and status color; RankingCard summarizes the top 3, user position, and weekly trend.

## SessionCard
**Purpose:** Used across `/aluno`, `/aluno/sessoes`, and `/aluno/sessoes/[sessionId]` grids. Default layout is a two-column card that adapts to single-column on mobile.

### Layout
- **Left column (stacked):**
  - Status badge (color-coded; see below).
  - Title (1 line, truncation after two lines).
  - Metrics row: `X/Y aulas concluídas`, `Duração total`.
  - CTA button below metrics.
- **Right column:** “Progress pillar” (vertical bar) with percentage label, switching to horizontal bar on mobile (below content) to keep width minimal.
- **Responsive behavior:**
  - `grid-cols-1` on small screens (progress bar drops below content, uses horizontal pill).
  - `grid-cols-2` from `md:` onwards, with progress pillar fixed at ~10px width.

### Content States
| State | Badge Label | Colors |
| --- | --- | --- |
| `not-started` | “Comece agora” | Background `areia-200/30`, text `grafite-700` |
| `in-progress` | “Em andamento” | Background `marinho-500/15`, text `marinho-700` |
| `completed` | “Concluída” | Background `oliva-500/20`, text `oliva-700` |

### Props & Behavior
- `title: string`
- `completedLessons: number`, `totalLessons: number`
- `durationLabel: string` (preformatted e.g. “60 min”)
- `progressPercent: number`
- `status: "not-started" | "in-progress" | "completed"`
- CTA label:
  - `not-started` → “Ver primeiro vídeo”
  - `in-progress` → “Continuar assistindo”
  - `completed` → “Rever conteúdo” (fallback) – adjustable later.
- Emits optional `onAction` handler (button click).

### Visual Tokens
- Gradient fill of progress bar uses marinho→cobre blend to tie into MVP palette.
- Card surface uses existing `glass-panel` utility when embedded inside GlassPanel, otherwise replicates the blur/glass style.

## RankingCard
**Purpose:** Previews leaderboard at `/aluno/ranking` and quick stats on `/aluno` home. Focus on top 3 names, user position, and weekly trend.

### Layout
- Single-column stack:
  - Header row containing:
    - Left: **Ilustração Top 3**, inspirada no [Image #1]:
      - Três pedestais com alturas diferentes (2º levemente menor, 1º mais alto, 3º intermediário).
      - Paleta: ouro (#f6c65a), prata (#d6d6d6) e bronze (#c77c42) adaptadas para tokens Tailwind (`areia`, `grafite`, `cobre`).
      - Cada pedestal exibe `posição · nome · pontos`.
    - Right: “Você está” block com ordinal, pontos, e delta vs semana.
  - Trend block abaixo do header:
    - Subtitle “Tendência semanal”.
    - Sparkline (SVG) com gradient stroke (marinho→cobre) e fill leve.
    - Delta label (verde para positivo, cobre para queda, grafite para flat).
  - CTA “Ver detalhes” ancorado no rodapé que abre a visão completa do ranking.
- Responsive: width-agnostic stack; no mobile os blocos apenas empilham.

#### Detalhe expandido (ranking completo)
- Ao clicar em “Ver detalhes”, abrir drawer/dialog ou seção expandida com a tabela completa.
- Cada linha mostra `posição · nome · pontos · delta semanal` com um ícone:
  - `ArrowUpRight` em oliva para quem subiu.
  - `ArrowDownRight` em cobre/vermelho para quem caiu.
  - `Minus` em grafite para posição estável.
- A linha do usuário atual recebe destaque visual (fundo translúcido, borda ou badge “Você”).
- Lista ordenada por pontos; aplicar scroll se exceder a viewport.

### Props & Behavior
- `topThree: Array<{ name: string; points: number; }>` (ordered).
- `userRank: number`, `userPoints: number`.
- `weeklyDelta: { value: string; direction: "up" | "down" | "flat" }`.
- `trendPoints: number[]` (for sparkline; normalized to 0–1 scale in component).
- CTA forwards to full ranking page.

### Visual Tokens
- Sparkline uses gradient defined in theme (hero gradient) for consistency.
- Delta label colors: `oliva-600` for up, `cobre-600` for down, `grafite-500` for flat; icon matches direction (ArrowUpRight/ArrowDownRight/Minus).

## Accessibility & Copy
- Buttons have descriptive `aria-label`s (e.g., “Continuar sessão Leadership Lab Live”).
- Badges use `aria-live="polite"` when status changes.
- Numbers are formatted with locale-specific separators (pt-BR).

## Acceptance Criteria
1. SessionCard renders the correct badge color/label per status and shows CTA + metrics + progress pillar/bar responsively.
2. Progress percentages update both numeric label and bar height/width.
3. RankingCard displays top 3 names, user rank/points, and sparkline with delta indicator.
4. Visuals align with Tailwind tokens (no raw hexes except gradients defined in theme).
5. Components accept props without external context; data flows come from `src/data/mock-data.ts` selectors later in Task 5.
