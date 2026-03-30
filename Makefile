# Usage:
#   make lint WORKTREE=.worktrees/microlearning-mvp
# Override WORKTREE to target a different git worktree.

WORKTREE ?= .worktrees/microlearning-mvp
APP_DIR := $(WORKTREE)/apps/web

.PHONY: dev lint test test-theme test-data build

dev:
	cd "$(APP_DIR)" && pnpm dev

lint:
	cd "$(APP_DIR)" && pnpm lint

test:
	cd "$(APP_DIR)" && pnpm test

test-theme:
	cd "$(APP_DIR)" && pnpm test src/__tests__/theme.test.ts

test-data:
	cd "$(APP_DIR)" && pnpm exec vitest run src/data/mock-data.node.test.ts --reporter verbose

build:
	cd "$(APP_DIR)" && pnpm build
