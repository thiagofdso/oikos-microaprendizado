import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RankingCard } from "@/components/cards/RankingCard";

const baseProps = {
  topThree: [
    { name: "Ana", points: 420 },
    { name: "João", points: 450 },
    { name: "Pedro", points: 390 },
  ],
  userRank: 7,
  userPoints: 368,
  weeklyDelta: { value: "+32 pts", direction: "up" as const },
  trendPoints: [12, 18, 26, 21],
} as const;

describe("RankingCard", () => {
  it("renders podium entries and user info", () => {
    render(<RankingCard {...baseProps} />);

    expect(screen.getByText("João")).toBeInTheDocument();
    expect(screen.getByText("7º")).toBeInTheDocument();
    expect(screen.getByText("368 pts")).toBeInTheDocument();
  });

  it("shows delta icons in detailed list when expanded", () => {
    render(
      <RankingCard
        {...baseProps}
        entries={[
          { rank: 7, name: "Você", points: 368, delta: 32, direction: "up", isSelf: true },
          { rank: 8, name: "Maria", points: 340, delta: -12, direction: "down" },
          { rank: 9, name: "Rafa", points: 320, delta: 0, direction: "flat" },
        ]}
      />,
    );

    expect(
      screen.queryByRole("table", { name: /Tabela completa do ranking/i }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ver detalhes" }));

    const table = screen.getByRole("table", { name: /Tabela completa do ranking/i });
    const tableScope = within(table);

    expect(tableScope.getByLabelText("Subiu no ranking")).toBeInTheDocument();
    expect(tableScope.getByLabelText("Caiu no ranking")).toBeInTheDocument();
    expect(tableScope.getByLabelText("Sem mudança no ranking")).toBeInTheDocument();
  });
});
