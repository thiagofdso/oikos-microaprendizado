# Microlearning MVP Workspace

Repositório de desenvolvimento do protótipo Microlearning MVP descrito em
`docs/superpowers/plans/2026-03-24-microlearning-mvp-plan.md`. O projeto usa
Next.js 16 (App Router), React 19, Tailwind CSS 3 e Vitest para entregar as
experiências de aluno, pastor e administrador com dados mockados.

## Topologia

- `docs/` – planos e especificações usados pelo fluxo superpowers.
- `.worktrees/` – worktrees Git criados automaticamente (ignorado por padrão).
- `apps/web/` – app Next.js dentro do worktree ativo (ver seção abaixo).
- `Makefile` – atalhos para rodar lint/test/build apontando para um worktree.

## Pré-requisitos

- Node.js ≥ 18 (recomendado 20 ou 22) com Corepack habilitado (`corepack enable pnpm`).
- pnpm (Corepack instala automaticamente).
- Git com suporte a worktrees.

## Trabalhando com worktrees

O repositório principal fica limpo enquanto o desenvolvimento acontece em
worktrees dentro de `.worktrees/`. O padrão criado durante esta sessão foi
`.worktrees/microlearning-mvp`.

1. Verifique worktrees existentes: `git worktree list`.
2. Crie um novo (exemplo): `git worktree add .worktrees/minha-feature -b feature/minha-feature`.
3. Execute os comandos sempre a partir do worktree apropriado.

## Scripts via Makefile

Todos os comandos assumem por padrão `WORKTREE=.worktrees/microlearning-mvp`.
Para usar outro worktree, sobrescreva a variável ao chamar `make`.

```bash
# exemplo: rodar lint em outro worktree
make lint WORKTREE=.worktrees/minha-feature
```

Targets disponíveis:

| Target       | Ação                                                                           |
| ------------ | ------------------------------------------------------------------------------ |
| `make dev`   | `pnpm dev` no app Next (`apps/web`)                                            |
| `make lint`  | `pnpm lint`                                                                    |
| `make test`  | `pnpm test` (Vitest completo)                                                  |
| `make test-theme` | `pnpm test src/__tests__/theme.test.ts`                                   |
| `make test-data`  | `pnpm exec vitest run src/data/mock-data.node.test.ts --reporter verbose` |
| `make build` | `pnpm build` (Next + Turbopack + TypeScript)                                   |

## Estrutura do app (`apps/web`)

- `src/lib/theme.ts` – tokens (paletas, gradientes, tipografia, espaçamento).
- `src/app/globals.css` + `src/styles/gradients.css` – estilos globais, utilitários e gradientes.
- `src/types/content.ts` – contratos de dados (sessões, aulas, alunos etc.).
- `src/data/mock-data.ts` – dados mockados + seletores, com snapshot imutável.
- `src/__tests__/theme.test.ts` e `src/data/mock-data.node.test.ts` – smoke tests.
- `fonts/surt` – pacote local que registra `@fontsource-variable/surt` provisório até a versão oficial.

## Fluxo de desenvolvimento

1. Inicie o worktree desejado e rode `pnpm install` dentro de `apps/web` (primeira vez).
2. Use `make dev` (ou `pnpm dev`) para subir o servidor.
3. Adicione/edite componentes e dados seguindo o plano em `docs/superpowers/plans/...`.
4. Garanta que `make lint`, `make test`, `make build` estejam verdes antes de abrir PR.

## Observações

- O pacote `@fontsource-variable/surt` ainda não existe no npm. O diretório
  `fonts/surt` age como shim local para manter a API consistente; substitua-o
  pelo pacote oficial assim que for publicado.
- Os dados em `src/data/mock-data.ts` estão congelados via
  `dashboardSnapshot` para evitar mutações acidentais em testes e protótipos.
- Componentes e páginas dos fluxos aluno/pastor/admin serão implementados nas
  próximas tarefas (ver plano). Este README será atualizado conforme novas
  áreas forem concluídas.

## Próximos passos recomendados

- Implementar Task 3 do plano (AppShell, navegação líquido e gaveta de notificações).
- Adicionar screenshots e documentação visual assim que os primeiros fluxos estiverem prontos.
- Automatizar CI com os alvos do Makefile (lint/test/build) quando o repositório for publicado.

---

Em caso de dúvidas sobre o plano ou sobre o uso de worktrees, consulte os
documentos em `docs/` ou abra uma issue/PR com as perguntas. Bons commits!
