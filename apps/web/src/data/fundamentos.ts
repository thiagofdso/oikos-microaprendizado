import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

export interface FundamentosConceito {
  id: string;
  titulo: string;
  definicao: string;
}

export interface FundamentosMicroaula {
  id: string;
  titulo: string;
  descricao: string;
  ordem: number;
  duracao_estimada_minutos: number;
  objetivo_aprendizado: string;
  aplicacao_pratica: string;
  formato_entrega: string;
  tipo_interatividade: string;
  conceito?: FundamentosConceito;
}

export interface FundamentosSessao {
  id: string;
  titulo: string;
  descricao: string;
  ordem: number;
  microaulas: FundamentosMicroaula[];
}

export interface FundamentosCurso {
  titulo: string;
  descricao: string;
  metodologia: string;
  nivel: string;
  duracao_total_minutos: number;
  total_microaulas: number;
  sessoes: FundamentosSessao[];
}

export interface FundamentosPerguntaOpcao {
  id: string;
  texto: string;
  correta: boolean;
}

export interface FundamentosPergunta {
  id: string;
  nivel_bloom?: string;
  nivel_bloom_numero?: number;
  dificuldade?: string;
  tipo?: string;
  enunciado: string;
  opcoes?: FundamentosPerguntaOpcao[];
  explicacao?: string;
  conceito_relacionado?: string;
  feedback_correto?: string;
  feedback_incorreto?: string;
}

export interface PerguntaItem {
  aulaId: string;
  pergunta: FundamentosPergunta;
}

const CONTENT_DIR_NAME = "pt_fundamentosdafe_0b4e1d37";
const FUNDAMENTOS_ROOT = findFundamentosRoot();

export function loadFundamentosCurso(): FundamentosCurso {
  const data = readJsonFile<{ curso: FundamentosCurso }>(path.join(FUNDAMENTOS_ROOT, "sessoes.json"));
  return data.curso;
}

export function loadLessonExcerpt(slug: string, words = 120): string {
  const lessonPath = path.join(FUNDAMENTOS_ROOT, "aulas", `${slug}.md`);

  try {
    const markdown = readFileSync(lessonPath, "utf8");
    const plainText = stripMarkdown(markdown);
    const wordLimit = Math.max(0, Math.floor(words));
    if (wordLimit === 0) {
      return "";
    }

    const tokens = plainText.split(/\s+/).filter(Boolean);
    if (tokens.length <= wordLimit) {
      return tokens.join(" ");
    }

    return `${tokens.slice(0, wordLimit).join(" ")} ...`;
  } catch (error) {
    if (isMissingFileError(error)) {
      return "";
    }

    throw error;
  }
}

export function pickPerguntas(limit: number): PerguntaItem[] {
  const perguntaFiles = readdirSync(path.join(FUNDAMENTOS_ROOT, "perguntas"))
    .filter((fileName) => fileName.endsWith(".json"))
    .sort((left, right) => left.localeCompare(right));

  const perguntas: PerguntaItem[] = [];

  for (const fileName of perguntaFiles) {
    const filePath = path.join(FUNDAMENTOS_ROOT, "perguntas", fileName);
    const parsed = readJsonFile<unknown>(filePath);
    const aulaId = getAulaIdFromQuestionFile(fileName, parsed);

    if (isQuestionBundle(parsed)) {
      for (const pergunta of parsed.perguntas) {
        perguntas.push({ aulaId, pergunta });
      }
      continue;
    }

    if (isFundamentosPergunta(parsed)) {
      perguntas.push({ aulaId, pergunta: parsed });
    }
  }

  const shuffled = shuffleDeterministic(perguntas, 42);
  return shuffled.slice(0, Math.max(0, Math.floor(limit)));
}

function findFundamentosRoot(): string {
  let currentDir = process.cwd();

  for (let i = 0; i < 10; i += 1) {
    const candidate = path.join(currentDir, CONTENT_DIR_NAME);
    if (existsSync(candidate) && statSync(candidate).isDirectory()) {
      return candidate;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }
    currentDir = parentDir;
  }

  throw new Error(`Unable to locate ${CONTENT_DIR_NAME} from ${process.cwd()}`);
}

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/<\/?(details|summary)>/gi, " ")
    .replace(/[>*_`~]/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isMissingFileError(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === "object" && error !== null && "code" in error && (error as NodeJS.ErrnoException).code === "ENOENT";
}

function isQuestionBundle(value: unknown): value is { perguntas: FundamentosPergunta[]; microaula_id?: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "perguntas" in value &&
    Array.isArray((value as { perguntas?: unknown }).perguntas)
  );
}

function isFundamentosPergunta(value: unknown): value is FundamentosPergunta {
  return (
    typeof value === "object" &&
    value !== null &&
    "enunciado" in value &&
    typeof (value as { enunciado?: unknown }).enunciado === "string"
  );
}

function getAulaIdFromQuestionFile(fileName: string, parsed: unknown): string {
  if (isQuestionBundle(parsed) && typeof parsed.microaula_id === "string" && parsed.microaula_id.trim()) {
    return parsed.microaula_id;
  }

  return fileName.replace(/_perguntas\.json$/i, "");
}

function shuffleDeterministic<T>(items: T[], seed: number): T[] {
  const result = [...items];
  const random = mulberry32(seed);

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
