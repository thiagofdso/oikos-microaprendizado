import type { ReactNode } from "react";

import clsx from "clsx";
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

const trendStyles: Record<TrendDirection, string> = {
  up: "text-oliva-600",
  down: "text-cobre-600",
  flat: "text-grafite-500",
};

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
  const isHorizontal = orientation === "horizontal";
  const contentLayout = clsx(
    "flex flex-col gap-4",
    isHorizontal && children && trend ? "md:flex-row md:items-start md:gap-6" : null,
  );

  const blocks: ReactNode[] = [];

  if (trend) {
    blocks.push(
      <div key="trend" className="flex min-w-0 flex-1 flex-col gap-2">
        <div className={clsx("flex items-center gap-2 text-xs font-semibold", trendStyles[trend.direction])}>
          {trendIcons[trend.direction]}
          <span>{trend.value}</span>
          {trend.label ? <span className="text-grafite-500">{trend.label}</span> : null}
        </div>
      </div>,
    );
  }

  if (children) {
    blocks.push(
      <div key="extra" className={clsx("min-w-0", isHorizontal && trend ? "md:flex-1" : null)}>
        {children}
      </div>,
    );
  }

  return (
    <GlassPanel
      eyebrow={label}
      title={String(value)}
      subtitle={subValue}
      helperText={helperText}
      accent={accent}
      icon={icon}
      actions={actions}
      columns={1}
      className={className}
      contentClassName={contentLayout}
    >
      {blocks.length > 0 ? blocks : null}
    </GlassPanel>
  );
}
