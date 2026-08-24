"use client";

import { useState } from "react";

interface Temporada {
  nombre: string;
  puntos: number | null;
  posicion: number | null;

  liga: {
    victorias: number;
    empates: number;
    derrotas: number;
  };

  faseFinal: {
    nombre: string;
    victorias: number;
    empates: number;
    derrotas: number;
    descripcion?: string;
  };

  goleadores: {
    nombre: string;
    partidos: number;
    goles: number;
    actual: boolean;
  }[];
}

/* =========================================================
   HISTÓRICOS
========================================================= */

const temporadas: Temporada[] = [
  {
    nombre: "Apertura 2025",

    puntos: 6,
    posicion: 9,

    liga: {
      victorias: 2,
      empates: 0,
      derrotas: 8,
    },

    faseFinal: {
      nombre: "Copa",
      victorias: 2,
      empates: 0,
      derrotas: 1,
      descripcion: "Final",
    },

    goleadores: [
      {
        nombre: "Villa",
        partidos: 10,
        goles: 1,
        actual: true,
      },
      {
        nombre: "Seth",
        partidos: 7,
        goles: 1,
        actual: false,
      },
      {
        nombre: "Bogart",
        partidos: 10,
        goles: 0,
        actual: true,
      },
      {
        nombre: "Xander",
        partidos: 10,
        goles: 1,
        actual: true,
      },
      {
        nombre: "Paulo",
        partidos: 11,
        goles: 0,
        actual: true,
      },
      {
        nombre: "Sebas",
        partidos: 11,
        goles: 1,
        actual: true,
      },
      {
        nombre: "Emi",
        partidos: 8,
        goles: 0,
        actual: false,
      },
      {
        nombre: "Leo",
        partidos: 10,
        goles: 0,
        actual: false,
      },
      {
        nombre: "Xavier",
        partidos: 6,
        goles: 0,
        actual: false,
      },
      {
        nombre: "Luis",
        partidos: 11,
        goles: 0,
        actual: true,
      },
      {
        nombre: "Isaac",
        partidos: 11,
        goles: 2,
        actual: true,
      },
      {
        nombre: "Cesar",
        partidos: 11,
        goles: 6,
        actual: true,
      },
      {
        nombre: "Chris",
        partidos: 3,
        goles: 2,
        actual: true,
      },
    ],
  },

  {
    nombre: "Clausura 2026",

    puntos: 30,
    posicion: 6,

    liga: {
      victorias: 9,
      empates: 3,
      derrotas: 8,
    },

    faseFinal: {
      nombre: "Liguilla",
      victorias: 0,
      empates: 0,
      derrotas: 1,
      descripcion: "Eliminados",
    },

    goleadores: [
      {
        nombre: "Villa",
        partidos: 19,
        goles: 1,
        actual: true,
      },
      {
        nombre: "Bogart",
        partidos: 13,
        goles: 0,
        actual: true,
      },
      {
        nombre: "Xander",
        partidos: 17,
        goles: 1,
        actual: true,
      },
      {
        nombre: "Paulo",
        partidos: 13,
        goles: 1,
        actual: true,
      },
      {
        nombre: "Sebas",
        partidos: 18,
        goles: 4,
        actual: true,
      },
      {
        nombre: "Luis",
        partidos: 14,
        goles: 0,
        actual: true,
      },
      {
        nombre: "Isaac",
        partidos: 16,
        goles: 2,
        actual: true,
      },
      {
        nombre: "Cesar",
        partidos: 17,
        goles: 13,
        actual: true,
      },
      {
        nombre: "Chris",
        partidos: 10,
        goles: 23,
        actual: true,
      },
      {
        nombre: "Hector",
        partidos: 19,
        goles: 0,
        actual: true,
      },
      {
        nombre: "Checo",
        partidos: 12,
        goles: 1,
        actual: false,
      },
      {
        nombre: "Erick",
        partidos: 8,
        goles: 0,
        actual: true,
      },
    ],
  },

  {
    nombre: "Apertura 2026",

    puntos: null,
    posicion: null,

    liga: {
      victorias: 0,
      empates: 0,
      derrotas: 0,
    },

    faseFinal: {
      nombre: "Por definir",
      victorias: 0,
      empates: 0,
      derrotas: 0,
      descripcion: "Escribiendo historia...",
    },

    goleadores: [],
  },
];

/* =========================================================
   RÉCORDS
========================================================= */

const records = [
  {
    titulo: "Más puntos en una temporada",
    valor: "30",
    detalle: "Clausura 2026",
  },
  {
    titulo: "Mejor posición en liga",
    valor: "6.º",
    detalle: "Clausura 2026",
  },
  {
    titulo: "Más goles en una temporada",
    valor: "23",
    detalle: "Chris · Clausura 2026",
  },
  {
    titulo: "Máximo goleador histórico",
    valor: "23",
    detalle: "Chris",
  },
  {
    titulo: "Más goles en un torneo",
    valor: "13",
    detalle: "Cesar · Clausura 2026",
  },
  {
    titulo: "Mejor actuación en copa",
    valor: "Final",
    detalle: "Apertura 2025",
  },
];

/* =========================================================
   PÁGINA
========================================================= */

export default function EstadisticasPage() {
  const [temporadaActiva, setTemporadaActiva] =
    useState(0);

  const temporada =
    temporadas[temporadaActiva];

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
            Martincitas
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            ESTADÍSTICAS
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-500">
            La historia de Martincitas, temporada por
            temporada.
          </p>
        </div>

        {/* TEMPORADAS */}

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {temporadas.map(
            (temporadaItem, index) => (
              <button
                key={temporadaItem.nombre}
                type="button"
                onClick={() =>
                  setTemporadaActiva(index)
                }
                className={`shrink-0 rounded-xl px-5 py-3 text-sm font-black transition ${
                  temporadaActiva === index
                    ? "bg-black text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {temporadaItem.nombre}
              </button>
            )
          )}
        </div>

        {/* TEMPORADA */}

        <section className="mb-10">

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                Temporada
              </p>

              <h2 className="text-3xl font-black sm:text-4xl">
                {temporada.nombre}
              </h2>
            </div>

            {temporada.faseFinal.descripcion && (
              <span className="w-fit rounded-full bg-black px-4 py-2 text-sm font-bold text-white">
                {temporada.faseFinal.descripcion}
              </span>
            )}
          </div>

          {/* ESTADÍSTICAS PRINCIPALES */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              label="Puntos"
              value={
                temporada.puntos !== null
                  ? String(temporada.puntos)
                  : "—"
              }
            />

            <StatCard
              label="Posición"
              value={
                temporada.posicion !== null
                  ? `${temporada.posicion}º`
                  : "—"
              }
            />

            <StatCard
              label="Victorias"
              value={String(
                temporada.liga.victorias
              )}
            />

            <StatCard
              label="Partidos"
              value={
                temporada.puntos !== null
                  ? String(
                      temporada.liga.victorias +
                        temporada.liga.empates +
                        temporada.liga.derrotas
                    )
                  : "Actual"
              }
            />

          </div>

          {/* LIGA */}

          <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">

            <h3 className="mb-5 text-xl font-black">
              Fase de liga
            </h3>

            <div className="grid grid-cols-3 gap-3">

              <MiniStat
                label="Victorias"
                value={
                  temporada.liga.victorias
                }
              />

              <MiniStat
                label="Empates"
                value={
                  temporada.liga.empates
                }
              />

              <MiniStat
                label="Derrotas"
                value={
                  temporada.liga.derrotas
                }
              />

            </div>

          </div>

          {/* FASE FINAL */}

          <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-xl font-black">
                {temporada.faseFinal.nombre}
              </h3>

              {temporada.faseFinal.descripcion && (
                <span className="text-sm font-bold text-zinc-400">
                  {temporada.faseFinal.descripcion}
                </span>
              )}
            </div>

            {temporada.nombre ===
            "Apertura 2026" ? (
              <p className="py-6 text-center text-2xl font-black text-zinc-300">
                Escribiendo historia...
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-3">

                <MiniStat
                  label="Victorias"
                  value={
                    temporada.faseFinal
                      .victorias
                  }
                />

                <MiniStat
                  label="Empates"
                  value={
                    temporada.faseFinal
                      .empates
                  }
                />

                <MiniStat
                  label="Derrotas"
                  value={
                    temporada.faseFinal
                      .derrotas
                  }
                />

              </div>
            )}

          </div>

        </section>

        {/* GOLEADORES */}

        {temporada.goleadores.length >
          0 && (
          <section className="mb-10">

            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                Temporada
              </p>

              <h2 className="text-3xl font-black">
                Goleadores
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">

              {[
                ...temporada.goleadores,
              ]
                .sort(
                  (a, b) =>
                    b.goles - a.goles
                )
                .map(
                  (
                    jugador,
                    index
                  ) => (
                    <div
                      key={
                        jugador.nombre
                      }
                      className="flex items-center gap-4 border-b border-zinc-100 px-5 py-4 last:border-0"
                    >

                      <span className="w-6 text-sm font-black text-zinc-400">
                        {index + 1}
                      </span>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2">
                          <span className="font-bold">
                            {
                              jugador.nombre
                            }
                          </span>

                          {!jugador.actual && (
                            <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase text-zinc-400">
                              Ex jugador
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-zinc-400">
                          {
                            jugador.partidos
                          }{" "}
                          partidos
                        </p>

                      </div>

                      <span className="text-2xl font-black">
                        {jugador.goles}
                      </span>

                      <span className="text-xs font-bold uppercase text-zinc-400">
                        goles
                      </span>

                    </div>
                  )
                )}

            </div>

          </section>
        )}

        {/* RÉCORDS */}

        <section>

          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Historia
            </p>

            <h2 className="text-3xl font-black">
              Récords
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {records.map(
              (record) => (
                <div
                  key={record.titulo}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-bold text-zinc-400">
                    {record.titulo}
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    {record.valor}
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    {record.detalle}
                  </p>
                </div>
              )
            )}

          </div>

        </section>

      </div>
    </main>
  );
}

/* =========================================================
   COMPONENTES
========================================================= */

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">
        {label}
      </p>

      <p className="mt-2 text-4xl font-black">
        {value}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-zinc-50 p-4 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}