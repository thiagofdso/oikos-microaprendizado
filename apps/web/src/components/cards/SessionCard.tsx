"use client";

import { useId, useState } from "react";

import clsx from "clsx";
import { CheckCircle2, ChevronDown, Circle, Play, RotateCcw } from "lucide-react";

export type SessionStatus = "not-started" | "in-progress" | "completed";

export interface SessionCardProps {
  title: string;
  completedLessons: number;
  totalLessons: number;
  durationLabel: string;
  progressPercent: number;
  status: SessionStatus;
  lessonsPreview?: Array<{ title: string; duration: string; completed: boolean }>;
  onAction?: () => void;
  className?: string;
}

const statusGradients: Record<SessionStatus, string> = {
  "not-started": "bg-gradient-to-br from-[#dfe7f4] to-[#bcd0eb] text-grafite-800",
  "in-progress": "bg-gradient-to-br from-[#25406b] to-[#d67a42] text-white",
  completed: "bg-gradient-to-br from-[#163153] to-[#f5d7a1] text-white",
};

const CTA_LABELS: Record<SessionStatus, string> = {
  "not-started": "Ver primeiro vídeo",
  "in-progress": "Continuar assistindo",
  completed: "Rever conteúdo",
};

export function SessionCard({
  title,
  completedLessons,
  totalLessons,
  durationLabel,
  progressPercent,
  status,
  lessonsPreview,
  onAction,
  className,
}: SessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const accordionId = useId();
  const progressClamp = Math.min(100, Math.max(0, progressPercent));
  const ctaLabel = CTA_LABELS[status];
  const hasLessons = Boolean(lessonsPreview?.length);

  return (
    <div
      data-testid="session-card"
      data-status={status}
      className={clsx(
        "glass-panel grid gap-4 border border-white/15 p-4 text-sm shadow-glass backdrop-blur-2xl md:grid-cols-[minmax(0,1fr)_auto] md:gap-6 md:p-5",
        statusGradients[status],
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        {hasLessons ? (
          <div className="flex justify-end">
            <button
              type="button"
              aria-label={isExpanded ? "Recolher aulas" : "Expandir aulas"}
              aria-expanded={isExpanded}
              aria-controls={accordionId}
              onClick={() => setIsExpanded((previous) => !previous)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/40 text-grafite-600 transition hover:bg-white/70"
            >
              <ChevronDown
                aria-hidden="true"
                className={clsx("h-4 w-4 transition", isExpanded && "rotate-180")}
              />
            </button>
          </div>
        ) : null}

        <div className="space-y-1">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
          <p>{completedLessons}/{totalLessons} aulas · {durationLabel}</p>
        </div>

        <button
          type="button"
          onClick={onAction}
          disabled={!onAction}
          aria-disabled={!onAction}
          className="inline-flex w-full items-center justify-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-marinho-700 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/70 disabled:opacity-60"
        >
          <span aria-hidden="true" className="mr-2 inline-flex items-center justify-center">
            {status === "completed" ? (
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Play aria-hidden="true" className="h-4 w-4" />
            )}
          </span>
          {ctaLabel}
        </button>
      </div>

      <div className="hidden md:flex flex-col items-center gap-3">
        <span className="text-xs font-semibold">{progressClamp}%</span>
        <div
          role="progressbar"
          aria-valuenow={progressClamp}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso da sessão (vertical)"
          className="flex h-28 w-2 items-end rounded-full bg-white/20"
        >
          <div
            style={{ height: `${progressClamp}%` }}
            className="w-full rounded-full bg-gradient-to-b from-marinho-500 to-cobre-400"
          />
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>Progresso</span>
          <span>{progressClamp}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressClamp}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso da sessão (horizontal)"
          className="mt-2 h-2 w-full rounded-full bg-white/20"
        >
          <div
            style={{ width: `${progressClamp}%` }}
            className="h-full rounded-full bg-gradient-to-r from-marinho-500 to-cobre-400"
          />
        </div>
      </div>

      {hasLessons ? (
        <div
          id={accordionId}
          aria-live="polite"
          aria-hidden={!isExpanded}
          hidden={!isExpanded}
          className={clsx(
            "md:col-span-2 transition-all duration-300",
            isExpanded ? "max-h-72 overflow-y-auto opacity-100" : "max-h-0 overflow-hidden opacity-0",
          )}
        >
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
            <ol className="space-y-2 text-sm">
              {lessonsPreview?.map((lesson, index) => (
                <li key={`${lesson.title}-${index}`} className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="w-6 text-xs font-semibold text-current/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={clsx(
                        "min-w-0 truncate",
                        lesson.completed && "text-current/70 line-through",
                      )}
                    >
                      {lesson.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-xs text-current/70">
                    <span className="inline-flex items-center">
                      <span
                        role="img"
                        aria-label={lesson.completed ? "Aula concluída" : "Aula não concluída"}
                      >
                        {lesson.completed ? (
                          <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-oliva-600" />
                        ) : (
                          <Circle aria-hidden="true" className="h-4 w-4 text-current/50" />
                        )}
                      </span>
                    </span>
                    <span>{lesson.duration}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </div>
  );
}
