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

  it("usa ícone correto para sessão concluída", () => {
    render(<SessionCard {...baseProps} status="completed" />);

    expect(screen.getByRole("button", { name: /rever conteúdo/i })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /rever conteúdo/i })).not.toBeInTheDocument();
  });

  it("expands lessons preview when toggle is clicked", () => {
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

    const lessonItem = screen.getByText("Aula 1");
    expect(lessonItem).not.toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Expandir aulas" }));

    expect(screen.getByRole("button", { name: "Recolher aulas" })).toBeInTheDocument();
    expect(lessonItem).toBeVisible();
  });
});
