"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AppShell } from "./AppShell";
import type { BreadcrumbItem } from "./Breadcrumbs";

function formatSegmentLabel(segment: string) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ShellBoundary({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const { role, breadcrumbs } = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const roleFromPath = segments[0] === "pastor" ? "pastor" : segments[0] === "admin" ? "admin" : "aluno";

    const crumbs: BreadcrumbItem[] = [{ label: "Início", href: "/" }];
    let currentPath = "";

    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      crumbs.push({ label: formatSegmentLabel(segment), href: currentPath });
    });

    return { role: roleFromPath as "aluno" | "pastor" | "admin", breadcrumbs: crumbs };
  }, [pathname]);

  return (
    <AppShell activeRole={role} breadcrumbs={breadcrumbs}>
      {children}
    </AppShell>
  );
}
