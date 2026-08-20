import { getMatches } from "@/lib/matches";

import {
  calculateStandings,
  getStandingMatchesByJornada,
  getTeams,
  type StandingRow,
} from "@/lib/standings";

import MatchCard from "@/components/matches/MatchCard";

export const dynamic = "force-dynamic";

export const revalidate = 0;

interface JornadaGroup {
  jornada: number | null;

  matches: Awaited<
    ReturnType<typeof getMatches>
  >;

  table: StandingRow[] | null;
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

  const teams = await getTeams();

  const groups: JornadaGroup[] = [];

  /*
   * Calculamos la tabla histórica
   * para cada jornada.
   */

  for (const [
    jornada,
    jornadaMatches,
  ] of jornadas) {
    let table: StandingRow[] | null =
      null;

    if (jornada !== null) {
      try {
        const standingMatches =
          await getStandingMatchesByJornada(
            jornada
          );

        table = calculateStandings(
          teams,
          standingMatches
        );
      } catch (error) {
        console.error(
          "Error cargando tabla histórica:",
          error
        );
      }
    }

    groups.push({
      jornada,
      matches: jornadaMatches,
      table,
    });
  }

  return (
    <main className="min-h-screen bg-white text-black">

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">

        <h1 className="mb-10 text-center text-4xl font-black tracking-wide sm:text-5xl">
          PARTIDOS
        </h1>

        {groups.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white py-16 text-center text-zinc-500 shadow-sm">
            No hay partidos registrados.
          </div>
        ) : (
          <div className="space-y-12">

            {groups.map((group) => (
              <section
                key={
                  group.jornada ??
                  "sin-jornada"
                }
              >

                {/* TÍTULO DE JORNADA */}

                <div className="mb-5 flex items-center gap-4">

                  <div className="h-px flex-1 bg-zinc-200" />

                  

                  <div className="h-px flex-1 bg-zinc-200" />

                </div>

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

                <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow md:block">

                  {group.matches.map(
                    (match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                      />
                    )
                  )}

                </div>

                {/* TABLA HISTÓRICA */}

                {group.table &&
                  group.jornada !== null && (
                    <div className="mt-8">

                      <div className="mb-4 flex items-center justify-between">

                        <div>

                          <h3 className="text-xl font-black">
                            Tabla
                          </h3>

                          <p className="text-sm text-zinc-500">
                            Clasificación después de
                            la Jornada{" "}
                            {group.jornada}
                          </p>

                        </div>

                      </div>

                      <HistoricalTable
                        table={group.table}
                      />

                    </div>
                  )}

              </section>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}

/* =========================================================
   TABLA HISTÓRICA
========================================================= */

function HistoricalTable({
  table,
}: {
  table: StandingRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200">

      <table className="w-full min-w-[850px] border-collapse">

        <thead>

          <tr className="bg-zinc-50">

            <th className="px-2 py-3 text-xs font-black text-zinc-400">
              #
            </th>

            <th className="w-2 p-0" />

            <th className="px-3 py-3 text-left text-xs font-black text-zinc-400">
              EQUIPO
            </th>

            <th className="px-3 py-3 text-center text-xs font-black text-zinc-400">
              JJ
            </th>

            <th className="px-3 py-3 text-center text-xs font-black text-zinc-400">
              G
            </th>

            <th className="px-3 py-3 text-center text-xs font-black text-zinc-400">
              E
            </th>

            <th className="px-3 py-3 text-center text-xs font-black text-zinc-400">
              P
            </th>

            <th className="px-3 py-3 text-center text-xs font-black text-zinc-400">
              +/-
            </th>

            <th className="bg-zinc-100 px-3 py-3 text-center text-xs font-black text-zinc-400">
              DG
            </th>

            <th className="bg-zinc-200 px-5 py-3 text-center text-xs font-black text-zinc-500">
              PTS
            </th>

          </tr>

        </thead>

        <tbody>

          {table.map((row, index) => {

            const lugar = index + 1;

            return (
              <tr
                key={row.team.id}
                className="border-t border-zinc-100"
              >

                <td className="px-2 py-3 text-center text-sm font-black">
                  {lugar}
                </td>

                <td className="w-2 p-0">

                  <div
                    className={`h-11 w-2 ${
                      lugar <= 2
                        ? "bg-green-500"
                        : lugar <= 6
                          ? "bg-blue-500"
                          : lugar <= 10
                            ? "bg-yellow-400"
                            : "bg-zinc-200"
                    }`}
                  />

                </td>

                <td className="px-3 py-3">

                  <div className="flex items-center gap-3">

                    {row.team.escudo ? (
                      <img
                        src={row.team.escudo}
                        alt={row.team.nombre}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-zinc-200" />
                    )}

                    <span className="whitespace-nowrap text-sm font-black">
                      {row.team.nombre}
                    </span>

                  </div>

                </td>

                <td className="px-3 py-3 text-center text-sm">
                  {row.jj}
                </td>

                <td className="px-3 py-3 text-center text-sm">
                  {row.ganados}
                </td>

                <td className="px-3 py-3 text-center text-sm">
                  {row.empatados}
                </td>

                <td className="px-3 py-3 text-center text-sm">
                  {row.perdidos}
                </td>

                <td className="px-3 py-3 text-center text-sm">
                  {row.gf}-{row.gc}
                </td>

                <td className="bg-zinc-100 px-3 py-3 text-center text-sm font-bold">
                  {row.dg > 0
                    ? `+${row.dg}`
                    : row.dg}
                </td>

                <td className="bg-zinc-200 px-5 py-3 text-center text-sm font-black">
                  {row.puntos}
                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}