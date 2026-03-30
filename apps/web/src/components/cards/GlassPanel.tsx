import type { ReactNode } from "react";

import clsx from "clsx";

export type GlassAccent = "areia" | "marinho" | "cobre" | "oliva" | "grafite";

export interface GlassPanelProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  helperText?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  accent?: GlassAccent;
  columns?: 1 | 2 | 3;
  gap?: "tight" | "normal" | "loose";
  padding?: "sm" | "md" | "lg";
  className?: string;
  contentClassName?: string;
}

const accentBorder: Record<GlassAccent, string> = {
  marinho: "border-marinho-300/30",
  areia: "border-areia-200/40",
  cobre: "border-cobre-300/30",
  oliva: "border-oliva-300/30",
  grafite: "border-grafite-400/30",
};

const accentGradient: Record<GlassAccent, string> = {
  marinho: "from-marinho-500/40 via-marinho-500/10 to-transparent",
  areia: "from-areia-400/40 via-areia-300/10 to-transparent",
  cobre: "from-cobre-500/40 via-cobre-400/10 to-transparent",
  oliva: "from-oliva-500/40 via-oliva-400/10 to-transparent",
  grafite: "from-grafite-700/35 via-grafite-600/10 to-transparent",
};

const accentIconStyles: Record<GlassAccent, string> = {
  marinho: "border-marinho-300/40 bg-marinho-500/15 text-marinho-700",
  areia: "border-areia-300/40 bg-areia-400/20 text-areia-700",
  cobre: "border-cobre-300/40 bg-cobre-500/15 text-cobre-700",
  oliva: "border-oliva-300/40 bg-oliva-500/15 text-oliva-700",
  grafite: "border-grafite-300/40 bg-grafite-500/15 text-grafite-700",
};

const gapStyles = {
  tight: "gap-3",
  normal: "gap-4",
  loose: "gap-6",
} as const;

const paddingStyles = {
  sm: "p-4",
  md: "p-5 lg:p-6",
  lg: "p-6 lg:p-8",
} as const;

export function GlassPanel({
  eyebrow,
  title,
  subtitle,
  helperText,
  icon,
  actions,
  children,
  accent = "marinho",
  columns = 1,
  gap = "normal",
  padding = "md",
  className,
  contentClassName,
}: GlassPanelProps) {
  const hasHeader = Boolean(eyebrow || title || subtitle || actions || icon);
  const hasHeadingCopy = Boolean(eyebrow || title || subtitle);
  const gridCols = columns === 3 ? "md:grid-cols-3" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-1";

  return (
    <div
      className={clsx(
        "glass-panel relative overflow-hidden border text-grafite-900 shadow-glass",
        paddingStyles[padding],
        accentBorder[accent],
        className,
      )}
    >
      {/* Accent wash overlay keeps the base glass gradient intact. */}
      <div
        aria-hidden="true"
        className={clsx("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70", accentGradient[accent])}
      />

      <div className="relative flex flex-col gap-4">
        {hasHeader ? (
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              {icon ? (
                <div
                  className={clsx(
                    "flex h-12 w-12 items-center justify-center rounded-full border text-lg",
                    accentIconStyles[accent],
                  )}
                >
                  {icon}
                </div>
              ) : null}

              {hasHeadingCopy ? (
                <div className="min-w-0">
                  {eyebrow ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-marinho-600">
                      {eyebrow}
                    </p>
                  ) : null}
                  {title ? <p className="mt-1 text-xl font-semibold text-grafite-900">{title}</p> : null}
                  {subtitle ? <p className="mt-1 text-sm text-grafite-600">{subtitle}</p> : null}
                </div>
              ) : null}
            </div>

            {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
          </div>
        ) : null}

        <div
          className={clsx(
            "grid grid-cols-1",
            gridCols,
            gapStyles[gap],
            contentClassName,
          )}
        >
          {children}
        </div>

        {helperText ? <p className="text-xs text-grafite-500">{helperText}</p> : null}
      </div>
    </div>
  );
}
