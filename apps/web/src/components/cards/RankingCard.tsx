"use client";

import { useId, useMemo, useState } from "react";

import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { GlassPanel } from "./GlassPanel";

type TrendDirection = "up" | "down" | "flat";

export interface RankingCardProps {
  topThree: Array<{ name: string; points: number }>;
  userRank: number;
  userPoints: number;
  weeklyDelta: { value: string; direction: TrendDirection };
  trendPoints: number[];
  entries?: Array<{
    name: string;
    points: number;
    rank: number;
    delta: number;
    direction: TrendDirection;
    isSelf?: boolean;
  }>;
  onViewAll?: () => void;
  className?: string;
}

const deltaColors: Record<TrendDirection, string> = {
  up: "text-oliva-600",
  down: "text-cobre-600",
  flat: "text-grafite-500",
};

const deltaIcons: Record<TrendDirection, JSX.Element> = {
  up: <ArrowUpRight className="h-4 w-4" aria-hidden="true" />,
  down: <ArrowDownRight className="h-4 w-4" aria-hidden="true" />,
  flat: <Minus className="h-4 w-4" aria-hidden="true" />,
};

const deltaAria: Record<TrendDirection, string> = {
  up: "Subiu no ranking",
  down: "Caiu no ranking",
  flat: "Sem mudança no ranking",
};

const numberFormatter = new Intl.NumberFormat("pt-BR");

function formatPoints(points: number) {
  return `${numberFormatter.format(points)} pts`;
}

function formatDelta(delta: number) {
  if (delta === 0) {
    return "0";
  }
  const sign = delta > 0 ? "+" : "";
  return `${sign}${numberFormatter.format(delta)}`;
}

function Podium({ topThree }: { topThree: RankingCardProps["topThree"] }) {
  const podiumEntries = topThree.slice(0, 3).map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));

  const orderedEntries = podiumEntries.length === 3
    ? [podiumEntries[1], podiumEntries[0], podiumEntries[2]]
    : podiumEntries;

  const paletteByRank: Record<number, string> = {
    1: "bg-gradient-to-b from-areia-200 to-areia-400",
    2: "bg-gradient-to-b from-grafite-100 to-grafite-300",
    3: "bg-gradient-to-b from-cobre-200 to-cobre-400",
  };

  const heightByRank: Record<number, number> = {
    1: 96,
    2: 80,
    3: 88,
  };

  return (
    <div className="flex items-end gap-3">
      {orderedEntries.map((entry) => (
        <div
          key={`${entry.rank}-${entry.name}`}
          className={clsx(
            "flex w-24 flex-col items-center justify-end rounded-2xl px-3 py-2 text-center text-grafite-900 shadow-sm",
            paletteByRank[entry.rank],
          )}
          style={{ height: heightByRank[entry.rank] }}
        >
          <p className="text-xs font-semibold">{entry.rank}º</p>
          <p className="text-sm font-semibold text-grafite-900 line-clamp-1">{entry.name}</p>
          <p className="text-xs text-grafite-600">{formatPoints(entry.points)}</p>
        </div>
      ))}
    </div>
  );
}

function TrendSparkline({
  points,
  delta,
}: {
  points: number[];
  delta: RankingCardProps["weeklyDelta"];
}) {
  const gradientId = useId();
  const resolvedPoints = points.length > 1 ? points : points.length === 1 ? [points[0], points[0]] : [0, 0];

  const { path, areaPath } = useMemo(() => {
    const min = Math.min(...resolvedPoints);
    const max = Math.max(...resolvedPoints);
    const range = max - min || 1;
    const height = 40;
    const width = 100;

    const coords = resolvedPoints.map((value, index) => {
      const x = (index / (resolvedPoints.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return { x, y };
    });

    const pathValue = coords
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
      .join(" ");

    const areaValue = `M ${coords[0].x.toFixed(2)} ${height} ${coords
      .map((point) => `L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
      .join(" ")} L ${coords[coords.length - 1].x.toFixed(2)} ${height} Z`;

    return { path: pathValue, areaPath: areaValue };
  }, [resolvedPoints]);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-grafite-700">Tendência semanal</p>
        <div className={clsx("flex items-center gap-1 text-xs font-semibold", deltaColors[delta.direction])}>
          <span className="inline-flex" role="img" aria-label={deltaAria[delta.direction]}>
            {deltaIcons[delta.direction]}
          </span>
          <span>{delta.value}</span>
        </div>
      </div>

      <svg viewBox="0 0 100 40" className="h-16 w-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-marinho-600)" />
            <stop offset="100%" stopColor="var(--color-cobre-400)" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradientId})`} fillOpacity={0.18} />
        <path d={path} stroke={`url(#${gradientId})`} strokeWidth={2} fill="none" />
      </svg>
    </div>
  );
}

export function RankingCard({
  topThree,
  userRank,
  userPoints,
  weeklyDelta,
  trendPoints,
  entries,
  onViewAll,
  className,
}: RankingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const accordionId = useId();

  const hasEntries = Boolean(entries?.length);
  const isCtaDisabled = !hasEntries && !onViewAll;
  const ctaLabel = hasEntries ? "Ver detalhes" : onViewAll ? "Ver ranking completo" : "Ver detalhes";
  const normalizedTopThree = topThree.slice(0, 3);

  return (
    <GlassPanel className={clsx("flex flex-col gap-6", className)} padding="lg">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Podium topThree={normalizedTopThree} />

        <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-4 text-right md:min-w-[180px]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grafite-500">Você está</p>
          <p className="text-3xl font-semibold text-grafite-900">{userRank}º</p>
          <p className="text-sm text-grafite-600">{formatPoints(userPoints)}</p>
          <div className={clsx("flex items-center justify-end gap-2 text-sm font-semibold", deltaColors[weeklyDelta.direction])}>
            <span className="inline-flex" role="img" aria-label={deltaAria[weeklyDelta.direction]}>
              {deltaIcons[weeklyDelta.direction]}
            </span>
            <span>{weeklyDelta.value}</span>
          </div>
        </div>
      </div>

      <TrendSparkline points={trendPoints} delta={weeklyDelta} />

      <button
        type="button"
        aria-expanded={hasEntries ? isExpanded : undefined}
        aria-controls={hasEntries ? accordionId : undefined}
        disabled={isCtaDisabled}
        onClick={() => {
          if (hasEntries) {
            setIsExpanded((previous) => !previous);
            return;
          }
          if (onViewAll) {
            onViewAll();
          }
        }}
        className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/20 px-4 py-2 text-sm font-semibold text-grafite-700 transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {ctaLabel}
        {isCtaDisabled ? <span className="sr-only"> (indisponível)</span> : null}
      </button>

      {hasEntries ? (
        <div
          id={accordionId}
          hidden={!isExpanded}
          aria-hidden={!isExpanded}
          className={clsx(
            "overflow-hidden rounded-2xl border border-white/15 bg-white/10 transition-all duration-300",
            isExpanded ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="max-h-72 overflow-y-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-grafite-700" aria-label="Tabela completa do ranking">
                <caption className="sr-only">Tabela completa do ranking com posição, nome, pontos e delta semanal.</caption>
                <thead className="sticky top-0 bg-white/60 text-xs uppercase tracking-[0.2em] text-grafite-500">
                <tr>
                  <th scope="col" className="px-4 py-3">Rank</th>
                  <th scope="col" className="px-4 py-3">Nome</th>
                  <th scope="col" className="px-4 py-3 text-right">Pontos</th>
                  <th scope="col" className="px-4 py-3 text-right">Delta</th>
                </tr>
              </thead>
              <tbody>
                {entries?.map((entry) => (
                  <tr
                    key={`${entry.rank}-${entry.name}`}
                    className={clsx(
                      "border-t border-white/10",
                      entry.isSelf && "bg-marinho-500/10 text-grafite-900",
                    )}
                  >
                    <th scope="row" className="px-4 py-3 font-semibold text-grafite-600">{entry.rank}º</th>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-grafite-900">{entry.name}</span>
                        {entry.isSelf ? (
                          <span className="rounded-full bg-marinho-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-marinho-700">
                            Você
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-grafite-900">
                      {formatPoints(entry.points)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={clsx("inline-flex items-center justify-end gap-2 font-semibold", deltaColors[entry.direction])}>
                        <span role="img" aria-label={deltaAria[entry.direction]} className="inline-flex">
                          {deltaIcons[entry.direction]}
                        </span>
                        <span>{formatDelta(entry.delta)} pts</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </GlassPanel>
  );
}
