import Link from "next/link";

import { leaderboard, sessions } from "@/data/mock-data";
import { theme } from "@/lib/theme";

const highlightedSession = sessions[0];
const topStudents = leaderboard.slice(0, 3);

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_40%),_linear-gradient(180deg,_var(--color-areia-50),_var(--color-marinho-900))] px-6 py-16 text-grafite-900">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl bg-white/85 p-10 shadow-glass backdrop-blur-2xl">
        <section className="grid gap-6 md:grid-cols-[3fr,2fr]">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-grafite-500">Campus Atlântico</p>
            <h1 className="mt-4 text-4xl font-semibold text-marinho-900">
              Microlearning MVP
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-grafite-600">
              Este repositório concentra os fluxos de aluno, pastor e administrador usados
              no protótipo. Todos os módulos consomem os mesmos dados mockados e tokens de
              tema para manter consistência visual.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/aluno"
                className="rounded-full bg-marinho-600 px-6 py-3 text-white transition hover:bg-marinho-500"
              >
                Visão do Aluno
              </Link>
              <Link
                href="/pastor"
                className="rounded-full border border-marinho-200 px-6 py-3 text-marinho-700 transition hover:bg-marinho-50"
              >
                Dashboard do Pastor
              </Link>
              <Link
                href="/admin"
                className="rounded-full border border-areia-300 px-6 py-3 text-areia-700 transition hover:bg-areia-50"
              >
                Gestão Admin
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/60 bg-gradient-to-br from-marinho-700/90 to-cobre-500/80 p-6 text-white shadow-inner">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Próxima sessão</p>
            <p className="mt-3 text-2xl font-semibold">{highlightedSession.title}</p>
            <p className="mt-2 text-sm text-white/80">{highlightedSession.description}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-white/80">
                <dt>Início</dt>
                <dd>{new Date(highlightedSession.startsAt).toLocaleString("pt-BR", { dateStyle: "medium", timeStyle: "short" })}</dd>
              </div>
              <div className="flex justify-between text-white/80">
                <dt>Duração</dt>
                <dd>{highlightedSession.durationMinutes} min</dd>
              </div>
              <div className="flex justify-between text-white/80">
                <dt>Host</dt>
                <dd>{highlightedSession.hostName}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[2fr,3fr]">
          <div className="rounded-2xl border border-areia-100 bg-white/80 p-6 shadow-glass">
            <p className="text-sm font-semibold text-marinho-600">Leaderboard (top 3)</p>
            <ul className="mt-4 space-y-3">
              {topStudents.map((student) => (
                <li
                  key={student.id}
                  className="flex items-center justify-between rounded-xl border border-areia-100 bg-areia-50/80 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-marinho-800">
                      #{student.rank} · {student.name}
                    </p>
                    <p className="text-grafite-500">
                      {student.xp} XP · {student.completionRate}% concluído
                    </p>
                  </div>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white shadow-inner"
                    style={{
                      backgroundColor: theme.palettes[student.avatarTone][500],
                    }}
                  >
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-grafite-500">
              Dados mockados de `src/data/mock-data.ts`.
            </p>
          </div>

          <div className="rounded-2xl border border-marinho-100 bg-white/90 p-6 shadow-glass">
            <p className="text-sm font-semibold text-marinho-600">Checklist rápido</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-grafite-600">
              <li>Tokens, dados e testes configurados (Tasks 1 e 2).</li>
              <li>Use o `Makefile` para rodar lint/test/build em qualquer worktree.</li>
              <li>Próxima etapa: AppShell + navegação (Task 3).</li>
            </ul>
            <p className="mt-6 text-sm text-grafite-500">
              Consulte o README na raiz para instruções completas de setup.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
