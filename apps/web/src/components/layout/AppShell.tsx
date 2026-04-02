import type { ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { Header } from "./Header";
import { LiquidMenu } from "./LiquidMenu";
import type { BreadcrumbItem } from "./Breadcrumbs";

export interface AppShellProps {
  activeRole: "aluno" | "pastor" | "admin";
  breadcrumbs: BreadcrumbItem[];
  headerSlot?: ReactNode;
  children: ReactNode;
  wrapContent?: boolean;
  mainClassName?: string;
}

export function AppShell({
  activeRole,
  breadcrumbs,
  children,
  headerSlot,
  wrapContent = true,
  mainClassName,
}: AppShellProps) {
  const mainClasses = twMerge(
    clsx("min-w-0", wrapContent && "glass-panel border-white/20 bg-white/15 p-4 shadow-glass backdrop-blur-2xl lg:p-6"),
    mainClassName,
  );
  const headerContent = headerSlot !== undefined ? headerSlot : <Header breadcrumbs={breadcrumbs} />;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_40%),_linear-gradient(180deg,_var(--color-areia-50),_var(--color-marinho-900))] px-4 py-4 text-grafite-900 lg:px-6 lg:py-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[19rem,minmax(0,1fr)] lg:gap-6">
        <aside className="fixed inset-x-4 bottom-4 z-30 lg:sticky lg:top-6 lg:inset-x-auto lg:self-start">
          <div className="glass-panel border-white/15 bg-white/12 p-3 shadow-glass backdrop-blur-2xl lg:p-4">
            <LiquidMenu activeRole={activeRole} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-4 pb-40 lg:pb-0">
          {headerContent}

          <main className={mainClasses}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
