import type { ReactNode } from "react";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { GlassPanel, type GlassAccent } from "./GlassPanel";

type TrendDirection = "up" | "down" | "flat";

export interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  helperText?: string;
  trend?: { value: string; direction: TrendDirection; label?: string };
  accent?: GlassAccent;
  icon?: ReactNode;
  actions?: ReactNode;
  orientation?: "vertical" | "horizontal";
  children?: ReactNode;
  className?: string;
}

const trendStyles: Record<Exclude<TrendDirection, "flat">, string> = {
  up: "text-oliva-600",
  down: "text-cobre-600",
};

const flatTextGradient = "bg-gradient-to-r from-grafite-600 via-grafite-400 to-areia-300 bg-clip-text text-transparent";

const trendIcons: Record<TrendDirection, ReactNode> = {
  up: <ArrowUpRight className="h-4 w-4" />,
  down: <ArrowDownRight className="h-4 w-4" />,
  flat: <Minus className="h-4 w-4" />,
};

export function StatCard({
  label,
  value,
  subValue,
  helperText,
  trend,
  accent,
  icon,
  actions,
  orientation = "vertical",
  children,
  className,
}: StatCardProps) {
  const hasExtra = Boolean(children);
  const isHorizontal = orientation === "horizontal" && hasExtra;
  const columns = isHorizontal ? 2 : 1;

  const trendTextClass =
    trend?.direction === "flat" ? flatTextGradient : trend ? trendStyles[trend.direction] : "text-grafite-500";
  const trendIconClass = trend?.direction === "flat" ? "text-grafite-400" : trend ? trendStyles[trend.direction] : "";

  const statBlock = (
    <div className="flex min-w-0 flex-col gap-2">
      {trend ? (
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className={trendIconClass}>{trendIcons[trend.direction]}</span>
          <span className={trendTextClass}>{trend.value}</span>
          {trend.label ? <span className={trendTextClass}>{trend.label}</span> : null}
        </div>
      ) : (
        <p className="text-xs text-grafite-500">Sem variação recente</p>
      )}
    </div>
  );

  return (
    <GlassPanel
      eyebrow={label}
      title={String(value)}
      subtitle={subValue}
      helperText={helperText}
      accent={accent}
      icon={icon}
      actions={actions}
      columns={columns}
      className={className}
    >
      {statBlock}
      {hasExtra ? <div className="min-w-0">{children}</div> : null}
    </GlassPanel>
  );
}
