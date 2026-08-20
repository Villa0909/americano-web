"use client";

import type { StandingRow } from "@/lib/standings";

interface Props {
  table: StandingRow[];
}

export default function HistoricalTable({
  table,
}: Props) {
  if (table.length === 0) {
    return (
      <div className="rounded-xl bg-zinc-50 p-6 text-center text-sm text-zinc-500">
        No hay datos de clasificación para esta jornada.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
      <table className="w-full min-w-[850px] border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50">
            <th className="w-12 px-2 py-3 text-center text-xs font-black text-zinc-400">
              #
            </th>

            <th className="w-2 p-0" />

            <th className="px-3 py-3 text-left text-xs font-black uppercase tracking-wider text-zinc-400">
              Equipo
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
                className="border-b border-zinc-100 last:border-b-0"
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
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                      {row.team.escudo ? (
                        <img
                          src={row.team.escudo}
                          alt={row.team.nombre}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-zinc-200" />
                      )}
                    </div>

                    <span className="whitespace-nowrap text-sm font-black">
                      {row.team.nombre}
                    </span>
                  </div>
                </td>

                <td className="px-3 py-3 text-center text-sm font-semibold text-zinc-600">
                  {row.jj}
                </td>

                <td className="px-3 py-3 text-center text-sm font-semibold text-zinc-600">
                  {row.ganados}
                </td>

                <td className="px-3 py-3 text-center text-sm font-semibold text-zinc-600">
                  {row.empatados}
                </td>

                <td className="px-3 py-3 text-center text-sm font-semibold text-zinc-600">
                  {row.perdidos}
                </td>

                <td className="px-3 py-3 text-center text-sm font-semibold text-zinc-600">
                  {row.gf}-{row.gc}
                </td>

                <td className="bg-zinc-100 px-3 py-3 text-center text-sm font-bold text-zinc-800">
                  {row.dg > 0
                    ? `+${row.dg}`
                    : row.dg}
                </td>

                <td className="bg-zinc-200 px-5 py-3 text-center text-base font-black text-zinc-900">
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