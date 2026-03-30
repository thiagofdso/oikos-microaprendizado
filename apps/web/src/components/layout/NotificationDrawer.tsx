"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { notifications } from "@/data/mock-data";
import type { NotificationCategory } from "@/types/content";

export interface NotificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryLabels: Record<NotificationCategory, string> = {
  reminder: "Lembretes",
  ranking: "Ranking",
  community: "Comunidade",
  system: "Sistema",
};

const categoryOrder: NotificationCategory[] = ["reminder", "ranking", "community", "system"];

export function NotificationDrawer({ open, onOpenChange }: NotificationDrawerProps) {
  const groupedNotifications = categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      items: notifications.filter((notification) => notification.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-marinho-900/55 backdrop-blur-sm" />
        <Dialog.Content
          id="notification-drawer"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/20 bg-[rgba(9,22,40,0.92)] p-5 text-white shadow-2xl outline-none backdrop-blur-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold">Notificações</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-white/70">
                Atualizações mockadas do protótipo.
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Fechar notificações"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-6 flex-1 overflow-y-auto pr-2">
            <div className="space-y-5">
              {groupedNotifications.map((group) => (
                <section key={group.category} className="space-y-3">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                    {group.label}
                  </h2>
                  <ul className="space-y-3">
                    {group.items.map((notification) => (
                      <li
                        key={notification.id}
                        className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-white">{notification.title}</p>
                            <p className="mt-1 text-sm leading-6 text-white/72">
                              {notification.message}
                            </p>
                          </div>
                          <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-cobre-400" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
            <button
              type="button"
              className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-marinho-900 transition hover:bg-areia-100"
            >
              Pausar competição
            </button>
            <p className="text-xs leading-5 text-white/55">
              Ação de protótipo sem persistência por enquanto.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
