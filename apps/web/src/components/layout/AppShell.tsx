import type { ReactNode } from "react";

import { Header } from "./Header";
import { LiquidMenu } from "./LiquidMenu";
import type { BreadcrumbItem } from "./Breadcrumbs";

export interface AppShellProps {
  activeRole: "aluno" | "pastor" | "admin";
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
}

export function AppShell({ activeRole, breadcrumbs, children }: AppShellProps) {
  return (
    <div className="min-h-screen px-4 py-4 lg:px-6 lg:py-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[19rem,minmax(0,1fr)] lg:gap-6">
        <aside className="fixed inset-x-4 bottom-4 z-30 lg:sticky lg:top-6 lg:inset-x-auto lg:self-start">
          <div className="glass-panel border-white/15 bg-white/12 p-3 shadow-glass backdrop-blur-2xl lg:p-4">
            <LiquidMenu activeRole={activeRole} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-4 pb-40 lg:pb-0">
          <Header breadcrumbs={breadcrumbs} />

          <main className="glass-panel border-white/20 bg-white/15 p-4 shadow-glass backdrop-blur-2xl lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
