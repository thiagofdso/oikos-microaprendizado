import { describe, expect, it } from "vitest";

import {
  loadFundamentosCurso,
  loadLessonExcerpt,
  pickPerguntas,
} from "@/data/fundamentos";

describe("fundamentos data helpers", () => {
  it("loads the fundamentos course data", () => {
    const curso = loadFundamentosCurso();

    expect(curso.titulo).toBe("Fundamentos da Fé - Curso de Microaprendizado");
    expect(curso.sessoes).toHaveLength(5);
    expect(curso.sessoes[0]).toMatchObject({
      id: "sessao_01",
      titulo: "Fundamentos Espirituais - Construindo uma Vida em Jesus Cristo",
      ordem: 1,
    });
    expect(curso.sessoes[0].microaulas[0]).toMatchObject({
      id: "aula_01_01",
      titulo: "O que é Fundamento Espiritual?",
      ordem: 1,
    });
  });

  it("returns an excerpt without markdown markers", () => {
    const excerpt = loadLessonExcerpt("aula_01_01_o_que_e_fundamento_espiritual", 12);

    expect(excerpt).toContain("Entendido");
    expect(excerpt).not.toContain("#");
    expect(excerpt).not.toContain("**");
    expect(excerpt.split(/\s+/)).toHaveLength(13);
    expect(excerpt.endsWith("...")).toBe(true);
  });

  it("returns an empty excerpt when the lesson file is missing", () => {
    expect(loadLessonExcerpt("nao-existe", 12)).toBe("");
  });

  it("picks perguntas deterministically", () => {
    const first = pickPerguntas(4);
    const second = pickPerguntas(4);

    expect(first).toEqual(second);
    expect(first).toHaveLength(4);
    expect(first[0]).toHaveProperty("aulaId");
    expect(first[0].pergunta).toHaveProperty("enunciado");
  });
});
