"use client";

import { useEffect, useState } from "react";

import {
  calculateStandings,
  getStandingMatches,
  getTeams,
  type StandingRow,
} from "@/lib/standings";

export default function TablaPage() {
  const [table, setTable] = useState<
    StandingRow[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [jornada, setJornada] =
    useState<number | null>(null);

  useEffect(() => {
    void loadTable();
  }, []);

  async function loadTable() {
    try {
      setLoading(true);

      const [teams, matches] =
        await Promise.all([
          getTeams(),
          getStandingMatches(),
        ]);

      const standings =
        calculateStandings(
          teams,
          matches
        );

      setTable(standings);

      /*
       * La jornada actual será la más alta
       * registrada.
       */

      if (matches.length > 0) {
        const latestJornada =
          Math.max(
            ...matches.map(
              (match) => match.jornada
            )
          );

        setJornada(latestJornada);
      }
    } catch (error) {
      console.error(error);

      alert(
        "No se pudo cargar la tabla."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-100">

      {/* ENCABEZADO */}

      <section className="border-b border-zinc-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <p className="text-xs font-black uppercase tracking-[3px] text-zinc-400">
            Clasificación
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">

            <h1 className="text-4xl font-black tracking-tight">
              TABLA
            </h1>

            {jornada !== null && (
              <p className="text-sm font-bold text-zinc-500">
                Jornada {jornada}
              </p>
            )}

          </div>

        </div>

      </section>

      {/* TABLA */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">

          {loading ? (
            <div className="px-6 py-16 text-center text-zinc-500">
              Cargando tabla...
            </div>
          ) : table.length === 0 ? (
            <div className="px-6 py-16 text-center">

              <p className="text-lg font-bold">
                No hay equipos registrados.
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Agrega equipos y partidos desde
                el panel de administración.
              </p>

            </div>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] border-collapse">

                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">

                    <th className="w-14 px-2 py-4 text-center text-xs font-black uppercase tracking-wider text-zinc-400">
                      #
                    </th>

                    <th className="w-2 px-0" />

                    <th className="px-3 py-4 text-left text-xs font-black uppercase tracking-wider text-zinc-400">
                      Equipo
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-zinc-400">
                      JJ
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-zinc-400">
                      G
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-zinc-400">
                      E
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-zinc-400">
                      P
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-zinc-400">
                      +/-
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-zinc-400">
                      DG
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-black uppercase tracking-wider text-zinc-400">
                      PTS
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {table.map(
                    (row, index) => {

                      const lugar =
                        index + 1;

                      return (
                        <tr
                          key={
                            row.team.id
                          }
                          className="border-b border-zinc-100 last:border-b-0"
                        >

                          {/* LUGAR */}

                          <td className="px-2 py-4 text-center text-sm font-black text-zinc-700">
                            {lugar}
                          </td>

                          {/* FRANJA */}

                          <td className="w-2 p-0">

                            <div
                              className={`h-12 w-2 ${
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

                          {/* EQUIPO */}

                          <td className="px-3 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center">

                                {row.team.escudo ? (
                                  <img
                                    src={
                                      row.team
                                        .escudo
                                    }
                                    alt={
                                      row.team
                                        .nombre
                                    }
                                    className="h-9 w-9 object-contain"
                                  />
                                ) : (
                                  <div className="h-9 w-9 rounded-full bg-zinc-200" />
                                )}

                              </div>

                              <span className="whitespace-nowrap text-sm font-black">
                                {
                                  row.team
                                    .nombre
                                }
                              </span>

                            </div>

                          </td>

                          {/* JJ */}

                          <td className="px-3 py-4 text-center text-sm font-semibold text-zinc-600">
                            {row.jj}
                          </td>

                          {/* G */}

                          <td className="px-3 py-4 text-center text-sm font-semibold text-zinc-600">
                            {row.ganados}
                          </td>

                          {/* E */}

                          <td className="px-3 py-4 text-center text-sm font-semibold text-zinc-600">
                            {row.empatados}
                          </td>

                          {/* P */}

                          <td className="px-3 py-4 text-center text-sm font-semibold text-zinc-600">
                            {row.perdidos}
                          </td>

                          {/* +/- */}

                          <td className="px-3 py-4 text-center text-sm font-semibold text-zinc-600">
                            {row.gf}-
                            {row.gc}
                          </td>

                          {/* DG */}

                          <td className="bg-zinc-100 px-3 py-4 text-center text-sm font-bold text-zinc-800">
  {row.dg > 0
    ? `+${row.dg}`
    : row.dg}
</td>

                          {/* PUNTOS */}

                          <td className="bg-zinc-200 px-5 py-4 text-center text-base font-black text-zinc-900">
  {row.puntos}
</td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* LEYENDA */}

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-zinc-500">

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-green-500" />
            Semifinales de liga
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-blue-500" />
            Cuartos de liga
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-yellow-400" />
            Cuartos de copa
          </div>

        </div>

      </section>

    </main>
  );
}