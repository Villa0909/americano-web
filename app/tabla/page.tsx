"use client";

import { useEffect, useState } from "react";

import {
  calculateStandings,
  getStandingMatches,
  getTeams,
  type StandingRow,
} from "@/lib/standings";

export default function TablaPage() {
  const [table, setTable] = useState<StandingRow[]>([]);

  const [loading, setLoading] = useState(true);

  const [jornada, setJornada] = useState<number | null>(null);

  useEffect(() => {
    void loadTable();
  }, []);

  async function loadTable() {
    try {
      setLoading(true);

      const [teams, matches] = await Promise.all([
        getTeams(),
        getStandingMatches(),
      ]);

      const standings = calculateStandings(
        teams,
        matches
      );

      setTable(standings);

      /*
       * La jornada actual será la más alta
       * registrada.
       */

      if (matches.length > 0) {
        const latestJornada = Math.max(
          ...matches.map(
            (match) => match.jornada
          )
        );

        setJornada(latestJornada);
      }
    } catch (error) {
      console.error(error);

      alert("No se pudo cargar la tabla.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#062A63] text-white">

      {/* =========================
          ENCABEZADO
      ========================= */}

      <section className="border-b border-yellow-400/20 bg-[#062A63]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="text-xs font-black uppercase tracking-[3px] text-yellow-400 sm:text-sm">
                Clasificación
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
                TABLA
              </h1>
            </div>

            {jornada !== null && (
              <div className="shrink-0 rounded-full bg-yellow-400 px-4 py-2 sm:px-5">
                <p className="text-xs font-black uppercase tracking-wide text-[#062A63] sm:text-sm">
                  Jornada {jornada}
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* =========================
          TABLA
      ========================= */}

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">

        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-[#0B3B82] shadow-2xl">

          {loading ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm font-bold text-blue-100 sm:text-base">
                Cargando tabla...
              </p>
            </div>
          ) : table.length === 0 ? (
            <div className="px-6 py-16 text-center sm:py-20">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400">
                <span className="text-2xl font-black text-[#062A63]">
                  #
                </span>
              </div>

              <p className="mt-5 text-lg font-black text-white sm:text-xl">
                No hay equipos registrados.
              </p>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-blue-100/70">
                Agrega equipos y partidos desde
                el panel de administración.
              </p>

            </div>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] border-collapse">

                {/* =========================
                    HEADER
                ========================= */}

                <thead>
                  <tr className="border-b border-yellow-400/20 bg-[#082F70]">

                    <th className="w-14 px-2 py-4 text-center text-xs font-black uppercase tracking-wider text-yellow-400">
                      #
                    </th>

                    <th className="w-2 px-0" />

                    <th className="px-3 py-4 text-left text-xs font-black uppercase tracking-wider text-yellow-400">
                      Equipo
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-yellow-400">
                      JJ
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-yellow-400">
                      G
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-yellow-400">
                      E
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-yellow-400">
                      P
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-yellow-400">
                      +/-
                    </th>

                    <th className="px-3 py-4 text-center text-xs font-black uppercase tracking-wider text-yellow-400">
                      DG
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-black uppercase tracking-wider text-yellow-400">
                      PTS
                    </th>

                  </tr>
                </thead>

                {/* =========================
                    BODY
                ========================= */}

                <tbody>

                  {table.map((row, index) => {

                    const lugar = index + 1;

                    return (
                      <tr
                        key={row.team.id}
                        className="border-b border-blue-300/10 last:border-b-0 transition-colors hover:bg-blue-900/30"
                      >

                        {/* =========================
                            LUGAR
                        ========================= */}

                        <td className="px-2 py-5 text-center text-sm font-black text-white">
                          {lugar}
                        </td>

                        {/* =========================
                            FRANJA
                        ========================= */}

                        <td className="w-2 p-0">

                          <div
                            className={`h-14 w-2 ${
                              lugar <= 2
                                ? "bg-green-500"
                                : lugar <= 6
                                  ? "bg-blue-400"
                                  : lugar <= 10
                                    ? "bg-yellow-400"
                                    : "bg-blue-900"
                            }`}
                          />

                        </td>

                        {/* =========================
                            EQUIPO
                        ========================= */}

                        <td className="px-3 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#062A63]">

                              {row.team.escudo ? (
                                <img
                                  src={row.team.escudo}
                                  alt={row.team.nombre}
                                  className="h-9 w-9 object-contain"
                                />
                              ) : (
                                <div className="h-9 w-9 rounded-full bg-blue-900" />
                              )}

                            </div>

                            <span className="whitespace-nowrap text-sm font-black text-white">
                              {row.team.nombre}
                            </span>

                          </div>

                        </td>

                        {/* =========================
                            JJ
                        ========================= */}

                        <td className="px-3 py-5 text-center text-sm font-bold text-blue-100">
                          {row.jj}
                        </td>

                        {/* =========================
                            G
                        ========================= */}

                        <td className="px-3 py-5 text-center text-sm font-black text-white">
                          {row.ganados}
                        </td>

                        {/* =========================
                            E
                        ========================= */}

                        <td className="px-3 py-5 text-center text-sm font-bold text-blue-100">
                          {row.empatados}
                        </td>

                        {/* =========================
                            P
                        ========================= */}

                        <td className="px-3 py-5 text-center text-sm font-bold text-blue-100">
                          {row.perdidos}
                        </td>

                        {/* =========================
                            +/-
                        ========================= */}

                        <td className="px-3 py-5 text-center text-sm font-bold text-blue-100">
                          {row.gf}-{row.gc}
                        </td>

                        {/* =========================
                            DG
                        ========================= */}

                        <td
                          className={`px-3 py-5 text-center text-sm font-black ${
                            row.dg > 0
                              ? "text-green-400"
                              : row.dg < 0
                                ? "text-red-400"
                                : "text-blue-100"
                          }`}
                        >
                          {row.dg > 0
                            ? `+${row.dg}`
                            : row.dg}
                        </td>

                        {/* =========================
                            PUNTOS
                        ========================= */}

                        <td className="px-5 py-5 text-center">

                          <span className="inline-flex min-w-[52px] items-center justify-center rounded-xl bg-yellow-400 px-3 py-2 text-base font-black text-[#062A63] shadow-sm">
                            {row.puntos}
                          </span>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* =========================
            LEYENDA
        ========================= */}

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-blue-100/70">

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-green-500" />
            Semifinales de liga
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-blue-400" />
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