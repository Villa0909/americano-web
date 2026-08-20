import Image from "next/image";

import {
  calculateStandings,
  type StandingMatch,
  type Team,
} from "@/lib/standings";

interface Props {
  teams: Team[];
  matches: StandingMatch[];
  jornada: number;
}

export default function HistoricalTable({
  teams,
  matches,
  jornada,
}: Props) {
  const standings = calculateStandings(
    teams,
    matches
  );

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* ENCABEZADO */}

      <div className="border-b border-zinc-200 px-4 py-5 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-black tracking-wide sm:text-2xl">
              TABLA
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Jornada {jornada}
            </p>
          </div>
        </div>
      </div>

      {/* TABLA */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="bg-zinc-100 text-[10px] font-black uppercase tracking-wider text-zinc-500">
              <th className="w-10 px-2 py-3 text-center">
                #
              </th>

              <th className="w-2 px-0 py-3" />

              <th className="px-3 py-3 text-left">
                Equipo
              </th>

              <th className="px-2 py-3 text-center">
                JJ
              </th>

              <th className="px-2 py-3 text-center">
                G
              </th>

              <th className="px-2 py-3 text-center">
                E
              </th>

              <th className="px-2 py-3 text-center">
                P
              </th>

              <th className="bg-zinc-200 px-3 py-3 text-center">
                +/-
              </th>

              <th className="bg-zinc-100 px-3 py-3 text-center">
                DG
              </th>

              <th className="px-3 py-3 text-center">
                PTS
              </th>
            </tr>
          </thead>

          <tbody>
            {standings.map((row, index) => {
              const position = index + 1;

              return (
                <tr
                  key={row.team.id}
                  className="border-t border-zinc-100"
                >
                  {/* LUGAR */}

                  <td className="px-2 py-3 text-center text-sm font-black">
                    {position}
                  </td>

                  {/* FRANJA */}

                  <td className="w-2 p-0">
                    <div
                      className={`h-10 w-1.5 ${
                        position <= 2
                          ? "bg-green-500"
                          : position <= 6
                            ? "bg-blue-500"
                            : position <= 10
                              ? "bg-yellow-400"
                              : "bg-transparent"
                      }`}
                    />
                  </td>

                  {/* EQUIPO */}

                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                        {row.team.escudo ? (
                          <Image
                            src={row.team.escudo}
                            alt={row.team.nombre}
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-zinc-200" />
                        )}
                      </div>

                      <span className="whitespace-nowrap text-sm font-bold">
                        {row.team.nombre}
                      </span>
                    </div>
                  </td>

                  {/* JJ */}

                  <td className="px-2 py-3 text-center text-sm font-semibold">
                    {row.jj}
                  </td>

                  {/* GANADOS */}

                  <td className="px-2 py-3 text-center text-sm">
                    {row.ganados}
                  </td>

                  {/* EMPATADOS */}

                  <td className="px-2 py-3 text-center text-sm">
                    {row.empatados}
                  </td>

                  {/* PERDIDOS */}

                  <td className="px-2 py-3 text-center text-sm">
                    {row.perdidos}
                  </td>

                  {/* +/- */}

                  <td className="bg-zinc-200 px-3 py-3 text-center text-sm font-bold">
                    {row.gf}-
                    {row.gc}
                  </td>

                  {/* DG */}

                  <td className="bg-zinc-100 px-3 py-3 text-center text-sm font-bold">
                    {row.dg > 0
                      ? `+${row.dg}`
                      : row.dg}
                  </td>

                  {/* PUNTOS */}

                  <td className="px-3 py-3 text-center text-sm font-black">
                    {row.puntos}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* LEYENDA */}

      <div className="border-t border-zinc-200 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-wide text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="h-3 w-1.5 bg-green-500" />
            <span>Semifinales de liga</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-1.5 bg-blue-500" />
            <span>Cuartos de liga</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-1.5 bg-yellow-400" />
            <span>Cuartos de copa</span>
          </div>
        </div>
      </div>
    </section>
  );
}