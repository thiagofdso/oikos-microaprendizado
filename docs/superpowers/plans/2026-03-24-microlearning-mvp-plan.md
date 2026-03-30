# Microlearning MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um protótipo responsivo em Next.js que demonstre os fluxos Campus Atlântico para aluno, pastor e administrador com dados mockados e interações estáticas.

**Architecture:** Aplicação Next.js 14 (App Router) servindo páginas `/aluno`, `/pastor` e `/admin`, cada uma apoiada por componentes funcionais e dados mockados carregados localmente. Layout compartilhado (AppShell) fornece cabeçalho, menu líquido e gaveta de notificações; componentes especializados consomem o mesmo módulo de dados para manter consistência visual.

**Tech Stack:** Next.js 14 + React 18 + TypeScript, Tailwind CSS com variáveis customizadas, @fontsource para Surt e IBM Plex Serif, clsx/cva para variantes de estilo, Radix UI (Drawer/Dialog) para notificações, Vitest + Testing Library para smoke tests de componentes.

---

## File Topology
- `src/app/layout.tsx` – aplica AppShell, fontes e metadata.
- `src/app/(routes)/aluno/...` – páginas do aluno (home, sessão, aula, ranking, fórum).
- `src/app/(routes)/pastor/page.tsx` – dashboard do pastor com gráficos e heatmap.
- `src/app/(routes)/admin/page.tsx` – gestão de igrejas, planos e pastores.
- `src/app/login/page.tsx` – tela inicial estática.
- `src/components/layout/*` – Header, LiquidMenu, NotificationDrawer, Breadcrumbs, AppShell.
- `src/components/cards/*` – GlassPanel, StatCard, SessionCard, RankingCard, StudentHighlight.
- `src/components/modules/*` – blocos maiores (SessionExplorer, LessonDetail, PastorDashboard, AdminManagement, ForumLobby etc.).
- `src/data/mock-data.ts` – fonte única de dados fictícios (sessões, aulas, ranking, fóruns, igrejas).
- `src/lib/theme.ts` – tokens de cor, gradientes, helpers.
- `src/styles/gradients.css` – estilos globais extras (vidro, ruído).
- `vitest.config.ts` + `src/__tests__/*` – testes mínimos de renderização.

---

### Task 1: Project Scaffold & Tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `app/`, `src/`, `public/` (via `pnpm create next-app`).
- Modify: `package.json` (scripts/test setup).
- Create: `vitest.config.ts`.
- Create: `src/tests/setup.ts`.

- [x] **Step 1: Scaffold app**
  - From o repo raiz, execute `pnpm create next-app@latest apps/web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"` para gerar o projeto em uma pasta vazia.
  - `cd apps/web` antes dos próximos passos e confirme que o dev server inicia com `pnpm dev`.
- [x] **Step 2: Add deps**
  - Run: `pnpm add clsx class-variance-authority @radix-ui/react-dialog @radix-ui/react-scroll-area lucide-react @fontsource-variable/surt @fontsource/ibm-plex-serif tailwind-merge`
  - Dev deps: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event`
- [x] **Step 3: Configure Vitest**
  - Add `"test": "vitest run"`, `"test:watch": "vitest"` to `package.json` scripts.
  - Create `vitest.config.ts` with Next.js + React Testing Library setup (jsdom, alias `@`).
  - Create `src/tests/setup.ts` importing `@testing-library/jest-dom`.
- [x] **Step 4: Verify lint/tests**
  - Run: `pnpm lint`
  - Run: `pnpm test`
  - Both should pass (no tests yet).

### Task 2: Theme, Fonts & Mock Data

**Files:**
- Modify: `src/app/globals.css`, `tailwind.config.ts`.
- Create: `src/styles/gradients.css`, `src/lib/theme.ts`, `src/data/mock-data.ts`, `src/types/content.ts`.

- [x] **Step 1: Define tokens**
  - In `src/lib/theme.ts` export palettes (areia, marinho, cobre, oliva, grafite) e alias `colors.primary/secondary/accent` apontando para essas paletas, além de glass blur configs e spacing helpers.
- [x] **Step 2: Tailwind config**
  - Extend colors with theme tokens, add font families referencing CSS variables, configure gradients and animations (pulse dial, shimmer scroll).
- [x] **Step 3: Global styles**
  - Import `@fontsource-variable/surt` & `@fontsource/ibm-plex-serif` in `globals.css`.
  - Define CSS variables for colors, add base styles (body gradient, noise overlay) and utility classes (glass, pill, pulse-line).
  - Create `src/styles/gradients.css` with reusable background classes and import in `globals.css`.
- [x] **Step 4: Types & data**
  - In `src/types/content.ts` describe Session, Lesson, Exercise, Student, Notification, ForumTopic, Church, Plan, PastorUser.
  - In `src/data/mock-data.ts` export typed arrays/objects covering all cenários (mín. 3 sessões, 6 aulas, 5 alunos ranking, 4 notificações, 2 igrejas, 3 tópicos fórum, exemplos de feedbacks e planos).
- [x] **Step 5: Smoke test tokens**
  - Write `src/__tests__/theme.test.ts` verifying theme exports (e.g., `expect(theme.colors.primary).toBeDefined()`).
  - Run `pnpm test src/__tests__/theme.test.ts`.

### Task 3: Layout Skeleton (AppShell, Menu, Header, Notifications)

**Files:**
- Modify: `src/app/layout.tsx`.
- Create: `src/components/layout/AppShell.tsx`, `Header.tsx`, `LiquidMenu.tsx`, `NotificationDrawer.tsx`, `Breadcrumbs.tsx`.
- Create: `src/components/layout/__tests__/LiquidMenu.test.tsx`.

- [x] **Step 1: AppShell wrapper**
  - Build component applying glass background, receives `activeRole` + `breadcrumbs` + `children`.
  - Handles responsive layout (sidebar vs bottom nav) using CSS grid.
- [x] **Step 2: LiquidMenu**
  - Component renders primary nav + optional submenu for sessões (with mock statuses). Animations via Tailwind classes referencing gradient CSS.
  - Accepts `role` prop to filter entries (aluno/pastor/admin) and include “Trocar visão – protótipo” link no rodapé.
- [x] **Step 3: Header & Breadcrumbs**
  - Header com logo, breadcrumbs e ícone de notificações com badge dinâmico (número vindo dos mocks); integrar `Breadcrumbs` component.
  - Notification icon toggles a state (use `useState` purely local) to show drawer.
- [x] **Step 4: NotificationDrawer**
  - Use Radix Dialog or custom panel; lists notifications grouped by categoria; include toggle control (static) and CTA “Pausar competição”.
- [x] **Step 5: Tests**
  - In `LiquidMenu.test.tsx` render component for cada role and assert correct menu items/submenus appear.
  - Run `pnpm test src/components/layout/__tests__/LiquidMenu.test.tsx`.

### Task 4: Shared UI Building Blocks

**Files:**
- Create: `src/components/cards/GlassPanel.tsx`, `StatCard.tsx`, `SessionCard.tsx`, `RankingCard.tsx`, `StudentProgressHero.tsx`.
- Create: `src/components/engagement/NpsDial.tsx`, `SessionFeedbackBlock.tsx`.
- Create: `src/components/feedback/FeedbackHistoryWidget.tsx`.
- Create: `src/components/media/AudioNarrationPanel.tsx`.
- Create: `src/components/controls/TogglePill.tsx`, `ChipFilter.tsx`.
- Tests: `src/components/cards/__tests__/SessionCard.test.tsx`.

- [ ] **Step 1: GlassPanel + StatCard**
  - Implement wrappers with props for accent color, icon slot, helper text; include responsive columns.
- [ ] **Step 2: Session & Ranking cards**
  - `SessionCard` handles status badges, CTA button; `RankingCard` displays position, metrics, sparkline placeholder (SVG gradient).
- [ ] **Step 3: StudentProgressHero + Nps components**
  - Hero combina barra de progresso, checkpoints, próximos marcos.
  - `NpsDial` cria 5 estrelas estilo dial com animações; `SessionFeedbackBlock` mostra CTA + histórico; `FeedbackHistoryWidget` lista notas recentes + status do pastor.
- [ ] **Step 4: Audio panel & controls**
  - `AudioNarrationPanel` combina botão, barra de progresso, seletor de velocidade (1x/1.25x/1.5x) e highlight indicator (progress prop) com labels acessíveis e atalhos de teclado.
  - Chips/toggles reutilizam cva para variantes (ativo/inativo).
- [ ] **Step 5: Tests**
  - `SessionCard.test.tsx` verifica render de título, status e CTA label.
  - Run targeted `pnpm test src/components/cards/__tests__/SessionCard.test.tsx`.

### Task 5: Fluxo do Aluno – Home & Sessões

**Files:**
- Create: `src/app/aluno/page.tsx` (home).
- Create: `src/app/aluno/sessoes/page.tsx` (lista).
- Create: `src/app/aluno/sessoes/[sessionId]/page.tsx` (explorer).
- Create components: `src/components/modules/StudentHome.tsx`, `SessionExplorer.tsx`.
- Update `src/data/mock-data.ts` with helper selectors.

- [ ] **Step 1: StudentHome module**
  - Compose hero, carousel (use `ScrollArea`), widget “Sua voz importa”, widget persistente `FeedbackHistoryWidget` (criado no Task 4) mostrando status das respostas do pastor e CTA para ranking e fórum.
- [ ] **Step 2: Sessions list/explorer**
  - Build grid + toggle grade/lista; filters chips (status, tipo). Toggle updates local state only.
  - At final da grade, inserir `SessionFeedbackBlock`.
- [ ] **Step 3: Wire pages**
  - In `app/aluno/...`, wrap com `AppShell role="aluno"` e breadcrumbs apropriados.
  - Supply data via selectors (e.g., `getSessionById`).
- [ ] **Step 4: Snapshot test**
  - Add `src/__tests__/student-home.test.tsx` renderizando `StudentHome` e verificando presença do carrossel.
  - Run `pnpm test src/__tests__/student-home.test.tsx`.

### Task 6: Fluxo do Aluno – Aula, Ranking, Fórum & Notificações

**Files:**
- Create: `src/app/aluno/aulas/[lessonId]/page.tsx`, `src/app/aluno/ranking/page.tsx`, `src/app/aluno/forum/page.tsx`.
- Components: `LessonDetail.tsx`, `RankingPanel.tsx`, `NotificationCenter.tsx`, `ForumLobby.tsx`, `ForumThread.tsx`.
- Add `src/components/engagement/CommentThread.tsx`.

- [ ] **Step 1: Lesson detail**
  - Layout em duas colunas, highlight de parágrafos conforme `activeParagraph` state; incluir `AudioNarrationPanel`, joinha, comentários com replies, sumarizador de pontos acumulados e bloco de exercícios (cards modais fake).
- [ ] **Step 2: Ranking**
  - `RankingPanel` exibe top 5, CTA “Ver completo” abrindo Dialog com lista estendida + filtros semana e sessão (use `Select` fake com chips) e sparklines individuais (SVG inline) mostrando evolução semanal.
- [ ] **Step 3: Notifications center**
  - Reutilizar `NotificationDrawer` mas criar componente autônomo para página com feed categorizado.
- [ ] **Step 4: Fórum**
  - `ForumLobby` inclui barra de busca global, chips (Sessões, Tags, “Do meu pastor”) e botão flutuante “Nova discussão” (abre `NewTopicModal`); lista os tópicos e `ForumThread` mostra cascata com replies e joinhas.
- [ ] **Step 5: Tests**
  - Add `src/__tests__/lesson-detail.test.tsx` garantindo render de player e comentário.
  - Run targeted `pnpm test src/__tests__/lesson-detail.test.tsx`.

### Task 7: Dashboard do Pastor

**Files:**
- Create: `src/app/pastor/page.tsx`.
- Components: `PastorDashboard.tsx`, `DashboardStatGrid.tsx`, `SessionHeatmap.tsx`, `AttentionList.tsx`, `StudentDrilldown.tsx`, `TimeToCompleteCard.tsx`.
- Tests: `src/components/pastor/__tests__/SessionHeatmap.test.tsx`.

- [ ] **Step 1: Stat grid**
  - Arranjar cartões (Conclusão, Acertos, Engajamento, Tempo médio) usando `StatCard`; tempo médio inclui dropdown (select control sem lógica real) e mini-line chart (SVG path).
- [ ] **Step 2: Heatmap**
  - Build matrix component com gradiente e highlight de sessão selecionada; clique atualiza estado local e sincroniza com cartão de tempo médio.
- [ ] **Step 3: Attention list & drilldown**
  - Lista vertical com cards; botão abre painel lateral com tabs (Linha do tempo, Pontos & Ranking, Discussões) preenchido com dados mockados.
- [ ] **Step 4: Page wiring**
  - Compose `PastorDashboard` na rota `/pastor`, breadcrumbs “Pastor ▸ Visão Geral”.
- [ ] **Step 5: Test**
  - Heatmap test garante quantidade de células e highlight; rodar `pnpm test src/components/pastor/__tests__/SessionHeatmap.test.tsx`.

### Task 8: Fórum & Comentários Integração + Feedback

**Files:**
- Components: `src/components/forum/NewTopicModal.tsx`, `src/components/forum/TopicCard.tsx`, `src/components/forum/Reply.tsx`.
- Components: `src/components/feedback/NpsOverlay.tsx`, `FeedbackHistoryWidget.tsx`.
- Modify: `LessonDetail.tsx` para linkar comentários → fórum.
- Tests: `src/components/forum/__tests__/TopicCard.test.tsx`.

- [ ] **Step 1: Fórum components**
  - Build cards, modal (Radix Dialog) com campos (sessão, título, descrição, anexos fake) e layout responsive.
- [ ] **Step 2: Comment integration**
  - Em `CommentThread`, adicionar ação “Expandir no fórum” que renderiza ícone seta e link para `/aluno/forum`.
- [ ] **Step 3: Feedback overlay**
  - `NpsOverlay` exibe resumo (tempo gasto, pontos, conquistas), controle dial (usar `NpsDial`) e campo opcional de comentário livre com contador de caracteres.
  - `FeedbackHistoryWidget` mostra lista de notas recentes e status de resposta do pastor.
- [ ] **Step 4: Wire overlay**
  - Adicionar `FeedbackHistoryWidget` também ao `StudentHome` (já planejado no Task 5) e posicionar `NpsOverlay` ao fim da rota `/aluno/sessoes/[sessionId]`, simulando modal triggered por botão “Avaliar sessão”.
- [ ] **Step 5: Test**
  - `TopicCard.test.tsx` verifica exibição de título, sessão-tag e contagem de respostas.
  - Rodar `pnpm test src/components/forum/__tests__/TopicCard.test.tsx`.

### Task 9: Gestão/Admin + Login + QA final

**Files:**
- Create: `src/app/admin/page.tsx`, `src/app/login/page.tsx`.
- Components: `src/components/admin/ChurchDirectory.tsx`, `PlanConfigurator.tsx`, `PastorForm.tsx`, `LiberacaoConfigPanel.tsx`, `SessionLessonEditor.tsx`, `ExerciseBuilder.tsx`, `StudentTable.tsx`.
- Update: `src/data/mock-data.ts` (planos, regras, exercícios).
- Tests: `src/__tests__/admin-page.test.tsx`, `src/components/admin/__tests__/LiberacaoConfigPanel.test.tsx`.

- [ ] **Step 1: Admin modules & pastores**
  - `ChurchDirectory` lista igrejas; selecionar abre painel lateral com form (logo upload placeholder, color pickers, contatos, plano escolhido).
  - `PastorForm` associa pastor à igreja selecionada, mostra campos usuário/senha e botão “Copiar credenciais” (apenas estado visual). Indicar badge “Último envio” para contextualizar onboarding.
- [ ] **Step 2: PlanConfigurator**
  - Construir painel que exibe plano atual, limites (alunos, aulas por sessão), flag “Plano assinatura” e botões para alterar limites (inputs desabilitados com dicas “em breve”).
  - Incluir color pickers (primary/accent) com preview em tempo real e toggle de cobrança automática; atrelar dados ao church selecionado.
- [ ] **Step 3: Configurações de liberação**
  - Implementar `LiberacaoConfigPanel` com opções (liberar tudo, sequencial, exigir nota mínima) usando radio cards e slider para nota.
  - Incluir preview do aluno (iframe fake/mini card) mostrando como o bloqueio aparece; atualizar dados mockados para refletir regra escolhida.
- [ ] **Step 4: Editor de sessões/aulas**
  - `SessionLessonEditor` lista sessões com botões “Adicionar aula” e “Editar”; cada aula abre formulário lateral permitindo escolher tipo (Texto+voz, Voz, Exercícios).
  - `ExerciseBuilder` adiciona perguntas (objetivas/dissertativas) com peso no ranking; limitar a interações estáticas (botões apenas trocam estados pré-definidos).
- [ ] **Step 5: Gestão de alunos**
  - Construir tabela com avatar, status, progresso e ações “Enviar convite” e “Cadastrar manualmente” (modais fake com steps e validação visual); incluir campo data de nascimento conforme spec.
- [ ] **Step 6: Página /admin**
  - Em `src/app/admin/page.tsx`, montar layout usando `AppShell role=\"admin\"`, breadcrumbs “Admin ▸ Gestão”.
  - Dispor `ChurchDirectory`, `PlanConfigurator`, `LiberacaoConfigPanel`, `SessionLessonEditor` e `StudentTable` em um grid responsivo (2 colunas desktop, stack em mobile) e garantir botões de acesso rápido para cada módulo.
- [ ] **Step 7: Login page**
  - Criar rota `/login` com gradiente areia→marinho, cartão central com campos desabilitados e copy “Acesse com seu e-mail institucional”.
- [ ] **Step 8: QA responsivo + acessibilidade**
  - Rodar `pnpm lint && pnpm test`.
  - Usar `pnpm dev` + DevTools para verificar breakpoints (360px, 768px, 1280px); ajustar classes conforme necessário.
  - Checar contraste AA (via Lighthouse/axe), garantir body ≥16px, controles touch ≥44px, header badge com texto alternativo e player de áudio com foco/aria + controle de velocidade funcional (mesmo que estático).
- [ ] **Step 9: Documentação**
  - Atualizar `README.md` descrevendo como rodar o protótipo, listar rotas principais e destacar que tudo é mockado.

---

**Next Steps After Plan Approval**
1. Decide modo de execução: subagent-driven (@superpowers:subagent-driven-development) ou inline (@superpowers:executing-plans).
2. Siga as tasks em ordem; cada task termina com lint/test e commit temático.
