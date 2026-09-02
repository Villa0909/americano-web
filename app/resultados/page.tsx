import { getMatches } from "@/lib/matches";

import MatchCard from "@/components/matches/MatchCard";

export const dynamic = "force-dynamic";

export const revalidate = 0;

interface JornadaGroup {
  jornada: number | null;

  matches: Awaited<
    ReturnType<typeof getMatches>
  >;
}

export default async function ResultadosPage() {
  const matches = await getMatches();

  /*
   * Agrupamos los partidos por jornada.
   */

  const grouped =
    new Map<
      number | null,
      Awaited<ReturnType<typeof getMatches>>
    >();

  for (const match of matches) {
    const jornada =
      match.jornada ?? null;

    if (!grouped.has(jornada)) {
      grouped.set(jornada, []);
    }

    grouped
      .get(jornada)!
      .push(match);
  }

  /*
   * Ordenamos:
   *
   * Jornada más reciente primero.
   *
   * Los partidos sin jornada quedan
   * al final.
   */

  const jornadas =
    Array.from(grouped.entries())
      .sort(([a], [b]) => {
        if (a === null) return 1;

        if (b === null) return -1;

        return b - a;
      });

  const groups: JornadaGroup[] =
    jornadas.map(
      ([jornada, jornadaMatches]) => ({
        jornada,
        matches: jornadaMatches,
      })
    );

  return (
    <main className="min-h-screen bg-[#062A63] text-white">

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">

        <h1 className="mb-10 text-center text-4xl font-black tracking-wide text-yellow-400 sm:text-5xl">
          PARTIDOS
        </h1>

        {groups.length === 0 ? (
          <div className="rounded-2xl border border-yellow-400/30 bg-[#0B3B82] py-16 text-center text-blue-100 shadow-sm">
            No hay partidos registrados.
          </div>
        ) : (
          <div className="space-y-10">

            {groups.map((group) => (
              <section
                key={
                  group.jornada ??
                  "sin-jornada"
                }
              >

                {/* PARTIDOS */}

                {/* TELÉFONO */}

                <div className="space-y-4 md:hidden">

                  {group.matches.map(
                    (match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                      />
                    )
                  )}

                </div>

                {/* PC */}

                <div className="hidden overflow-hidden rounded-2xl border border-[#17447D] bg-[#0B3B82] shadow md:block">

                  {group.matches.map(
                    (match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                      />
                    )
                  )}

                </div>

              </section>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}