import { fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { SessionCard } from "@/components/cards/SessionCard";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const baseProps = {
  title: "Leadership",
  completedLessons: 0,
  totalLessons: 5,
  durationLabel: "60 min",
  progressPercent: 0,
} as const;

describe("SessionCard", () => {
  it("aplica gradiente de status no wrapper", () => {
    render(<SessionCard {...baseProps} status="in-progress" />);

    const wrapper = screen.getByTestId("session-card");
    expect(wrapper).toHaveAttribute("data-status", "in-progress");
    expect(wrapper).toHaveClass("bg-gradient-to-br");
  });

  it.each([
    {
      status: "not-started" as const,
      cta: "Ver primeiro vídeo",
    },
    {
      status: "in-progress" as const,
      cta: "Continuar assistindo",
    },
    {
      status: "completed" as const,
      cta: "Rever conteúdo",
    },
  ])("renders CTA for $status", ({ status, cta }) => {
    render(<SessionCard {...baseProps} status={status} />);

    expect(screen.getByText(cta)).toBeInTheDocument();
  });

  it("renders both vertical and horizontal progressbars with distinct labels", () => {
    render(<SessionCard {...baseProps} status="in-progress" progressPercent={42} />);

    expect(screen.getAllByText("42%")).toHaveLength(2);
    expect(screen.getByRole("progressbar", { name: "Progresso da sessão (vertical)" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Progresso da sessão (horizontal)" })).toBeInTheDocument();
  });

  it("usa ícone correto para sessão concluída", () => {
    render(<SessionCard {...baseProps} status="completed" />);

    expect(screen.getByRole("button", { name: /rever conteúdo/i })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /rever conteúdo/i })).not.toBeInTheDocument();
  });

  it("toggles the lessons preview with accessible state and rotated icon", () => {
    render(
      <SessionCard
        {...baseProps}
        status="in-progress"
        lessonsPreview={[
          { title: "Aula 1", duration: "5 min", completed: true },
          { title: "Aula 2", duration: "7 min", completed: false },
        ]}
      />,
    );

    const toggleButton = screen.getByRole("button", { name: "Expandir aulas" });
    const controlsId = toggleButton.getAttribute("aria-controls");
    const icon = toggleButton.querySelector("svg");

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(controlsId).toBeTruthy();
    expect(document.getElementById(controlsId as string)).toBeInTheDocument();
    expect(icon).not.toHaveClass("rotate-180");
    expect(screen.getByText("Aula 1")).not.toBeVisible();

    fireEvent.click(toggleButton);

    expect(screen.getByRole("button", { name: "Recolher aulas" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Recolher aulas" })).toHaveAttribute("aria-controls", controlsId);
    expect(screen.getByText("Aula 1")).toBeVisible();
    expect(toggleButton.querySelector("svg")).toHaveClass("rotate-180");
  });

  it("renders each lesson row as a link or button with separators and full-row click targets", () => {
    const onLessonSelect = vi.fn();

    render(
      <SessionCard
        {...baseProps}
        status="in-progress"
        onLessonSelect={onLessonSelect}
        lessonsPreview={[
          {
            title: "Follow-up ágil",
            duration: "6 min",
            completed: false,
            href: "/aulas/follow-up-agil",
          },
          {
            title: "Workshop prático",
            duration: "8 min",
            completed: true,
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Expandir aulas" }));

    const firstLesson = screen.getByRole("link", {
      name: "Ir para aula 01 – Follow-up ágil (6 min)",
    });
    const secondLesson = screen.getByRole("button", {
      name: "Ir para aula 02 – Workshop prático (8 min)",
    });

    expect(firstLesson).toHaveAttribute("href", "/aulas/follow-up-agil");
    expect(firstLesson).toHaveClass("w-full");
    expect(secondLesson).toHaveClass("w-full");
    fireEvent.click(secondLesson);
    expect(onLessonSelect).toHaveBeenCalledWith(
      {
        title: "Workshop prático",
        duration: "8 min",
        completed: true,
      },
      1,
    );

    const items = screen.getAllByRole("listitem");
    expect(items[0]).not.toHaveClass("border-t");
    expect(items[1]).toHaveClass("border-t", "border-white/10");
  });

  it("renders a non-interactive fallback when no lesson handler is provided", () => {
    render(
      <SessionCard
        {...baseProps}
        status="in-progress"
        lessonsPreview={[
          {
            title: "Workshop prático",
            duration: "8 min",
            completed: true,
          },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Expandir aulas" }));

    expect(
      screen.queryByRole("button", {
        name: "Ir para aula 01 – Workshop prático (8 min)",
      }),
    ).not.toBeInTheDocument();

    const fallback = screen.getByLabelText("Ir para aula 01 – Workshop prático (8 min)");
    expect(fallback).toHaveAttribute("aria-disabled", "true");
    expect(fallback).toHaveAttribute("tabindex", "-1");
    expect(fallback.tagName).toBe("DIV");
    expect(fallback).toHaveClass("cursor-default", "opacity-60");
  });
});
