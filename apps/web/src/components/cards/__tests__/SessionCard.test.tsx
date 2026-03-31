import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SessionCard } from "@/components/cards/SessionCard";

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
});
