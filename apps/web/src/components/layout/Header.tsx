"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

import { notifications } from "@/data/mock-data";

import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { NotificationDrawer } from "./NotificationDrawer";

export interface HeaderProps {
  breadcrumbs: BreadcrumbItem[];
}

export function Header({ breadcrumbs }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  return (
    <header className="glass-panel flex flex-col gap-4 px-4 py-4 text-grafite-900 shadow-glass lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <span className="frosted-pill shrink-0 text-xs font-semibold uppercase tracking-[0.24em] text-marinho-700">
            Microlearning MVP
          </span>
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <p className="text-sm text-grafite-600">Camada de navegação do protótipo.</p>
      </div>

      <button
        type="button"
        onClick={() => setIsDrawerOpen((previous) => !previous)}
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/75 text-marinho-700 shadow-sm transition hover:bg-white"
        aria-label={`Abrir notificações${unreadCount > 0 ? ` (${unreadCount} novas)` : ""}`}
        aria-expanded={isDrawerOpen}
        aria-controls="notification-drawer"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-cobre-500 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      <NotificationDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </header>
  );
}
