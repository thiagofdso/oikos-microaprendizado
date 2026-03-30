"use client";

import type { MouseEvent } from "react";
import Link from "next/link";

import { sessions } from "@/data/mock-data";

type ActiveRole = "aluno" | "pastor" | "admin";

interface MenuItem {
  label: string;
  href: string;
}

export interface LiquidMenuProps {
  activeRole: ActiveRole;
}

const primaryNavigation: Record<ActiveRole, MenuItem[]> = {
  aluno: [
    { label: "Início", href: "/" },
    { label: "Trilha", href: "/trilha" },
    { label: "Comunidade", href: "/comunidade" },
  ],
  pastor: [
    { label: "Painel pastoral", href: "/pastor" },
    { label: "Sessões", href: "/pastor/sessoes" },
    { label: "Acompanhamento", href: "/pastor/acompanhamento" },
  ],
  admin: [
    { label: "Visão geral", href: "/admin" },
    { label: "Escolas", href: "/admin/escolas" },
    { label: "Relatórios", href: "/admin/relatorios" },
  ],
};

export function LiquidMenu({ activeRole }: LiquidMenuProps) {
  const primaryItems = primaryNavigation[activeRole];
  const implementedRoutes = new Set<string>(["/"]);

  const handlePotentialPlaceholder = (href: string) => {
    return implementedRoutes.has(href)
      ? undefined
      : (event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
        };
  };

  return (
    <nav aria-label="Navegação principal" className="flex h-full flex-col gap-5 text-sm">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55 lg:text-marinho-600">
          Visão ativa
        </p>
        <ul className="grid grid-cols-3 gap-2 lg:flex lg:flex-col lg:gap-2">
          {primaryItems.map((item) => {
            const isHome = item.href === "/";
            const isPlaceholder = !implementedRoutes.has(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  onClick={handlePotentialPlaceholder(item.href)}
                  aria-disabled={isPlaceholder}
                  className={`flex items-center justify-center rounded-full px-3 py-2 text-center font-medium transition lg:justify-start ${
                    isHome
                      ? "bg-marinho-600 text-white shadow-sm"
                      : "bg-white/10 text-white/85 hover:bg-white/18 lg:bg-transparent lg:text-grafite-700 lg:hover:bg-marinho-50"
                  } ${isPlaceholder ? "opacity-60" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-3 rounded-2xl border border-white/10 bg-white/8 p-4 lg:border-white/20 lg:bg-white/10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60 lg:text-marinho-600">
            Sessões do protótipo
          </p>
          <button
            type="button"
            className="text-xs font-medium text-cobre-200 transition hover:text-cobre-100 lg:text-cobre-600 lg:hover:text-cobre-500"
          >
            Trocar visão – protótipo
          </button>
        </div>

        <ul className="space-y-2">
          {sessions.map((session) => (
            <li key={session.id}>
              <Link
                href={`/sessions/${session.slug}`}
                prefetch={false}
                onClick={(event) => event.preventDefault()}
                aria-disabled
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-white/90 transition hover:bg-white/18 lg:border-white/20 lg:bg-white/85 lg:text-grafite-700 lg:hover:bg-white"
              >
                <span className="truncate">{session.title}</span>
                <span
                  aria-hidden="true"
                  className="ml-3 shrink-0 text-xs uppercase tracking-[0.22em] text-white/55 lg:text-grafite-400"
                >
                  {session.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
}
