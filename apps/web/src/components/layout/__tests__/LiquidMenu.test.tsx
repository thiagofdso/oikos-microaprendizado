import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LiquidMenu } from "@/components/layout/LiquidMenu";

describe("LiquidMenu", () => {
  it.each([
    {
      role: "aluno" as const,
      labels: ["Início", "Trilha", "Comunidade"],
    },
    {
      role: "pastor" as const,
      labels: ["Painel pastoral", "Sessões", "Acompanhamento"],
    },
    {
      role: "admin" as const,
      labels: ["Visão geral", "Escolas", "Relatórios"],
    },
  ])("renders the correct nav labels for $role", ({ role, labels }) => {
    const { getByRole } = render(<LiquidMenu activeRole={role} />);

    for (const label of labels) {
      expect(getByRole("link", { name: label })).toBeInTheDocument();
    }

    expect(getByRole("button", { name: "Trocar visão – protótipo" })).toBeInTheDocument();
  });

  it("renders the mock session submenu items", () => {
    const { getByRole, getByText } = render(<LiquidMenu activeRole="aluno" />);

    expect(getByText("Sessões do protótipo")).toBeInTheDocument();
    expect(getByRole("link", { name: "Welcome Week Kickoff" })).toBeInTheDocument();
    expect(getByRole("link", { name: "Leadership Lab Live" })).toBeInTheDocument();
    expect(getByRole("link", { name: "Follow-up Clinic" })).toBeInTheDocument();
  });
});
