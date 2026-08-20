interface Team {
  posicion: number;
  nombre: string;
  escudo: string;
  jj: number;
  ganados: number;
  empatados: number;
  perdidos: number;
  gf: number;
  gc: number;
  dg: number;
  puntos: number;
}

interface Props {
  teams: Team[];
}

function getPositionColor(posicion: number) {
  if (posicion >= 1 && posicion <= 2) {
    return "bg-green-500";
  }

  if (posicion >= 3 && posicion <= 6) {
    return "bg-blue-500";
  }

  if (posicion >= 7 && posicion <= 10) {
    return "bg-yellow-400";
  }

  return "bg-transparent";
}

export default function StandingsTable({ teams }: Props) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Tabla */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-950 text-[11px] font-black uppercase tracking-wider text-white">
              <th className="w-12 px-2 py-4 text-center">
                #
              </th>

              <th className="w-2 px-0 py-4" />

              <th className="px-3 py-4 text-left">
                Equipo
              </th>

              <th className="px-3 py-4 text-center">
                JJ
              </th>

              <th className="px-3 py-4 text-center">
                G
              </th>

              <th className="px-3 py-4 text-center">
                E
              </th>

              <th className="px-3 py-4 text-center">
                P
              </th>

              <th className="px-3 py-4 text-center">
                +/-
              </th>

              <th className="px-3 py-4 text-center">
                DG
              </th>

              <th className="px-4 py-4 text-center">
                PTS
              </th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team) => (
              <tr
                key={team.posicion}
                className="border-b border-zinc-100 last:border-b-0 transition hover:bg-zinc-50"
              >
                {/* Posición */}

                <td className="px-2 py-4 text-center">
                  <span className="font-black text-zinc-700">
                    {team.posicion}
                  </span>
                </td>

                {/* Franja */}

                <td className="p-0">
                  <div
                    className={`h-10 w-1.5 rounded-r-full ${getPositionColor(
                      team.posicion
                    )}`}
                  />
                </td>

                {/* Equipo */}

                <td className="px-3 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={team.escudo}
                      alt={`Escudo de ${team.nombre}`}
                      className="h-8 w-8 object-contain"
                    />

                    <span className="whitespace-nowrap text-sm font-bold text-zinc-900">
                      {team.nombre}
                    </span>
                  </div>
                </td>

                {/* JJ */}

                <td className="px-3 py-4 text-center text-sm font-medium text-zinc-600">
                  {team.jj}
                </td>

                {/* Ganados */}

                <td className="px-3 py-4 text-center text-sm font-medium text-zinc-600">
                  {team.ganados}
                </td>

                {/* Empatados */}

                <td className="px-3 py-4 text-center text-sm font-medium text-zinc-600">
                  {team.empatados}
                </td>

                {/* Perdidos */}

                <td className="px-3 py-4 text-center text-sm font-medium text-zinc-600">
                  {team.perdidos}
                </td>

                {/* +/- */}

                <td
                  className={`px-3 py-4 text-center text-sm font-semibold ${
                    team.gf - team.gc > 0
                      ? "text-green-600"
                      : team.gf - team.gc < 0
                        ? "text-red-600"
                        : "text-zinc-500"
                  }`}
                >
                  {team.gf > team.gc
                    ? `+${team.gf - team.gc}`
                    : team.gf - team.gc}
                </td>

                {/* DG */}

                <td
                  className={`px-3 py-4 text-center text-sm font-semibold ${
                    team.dg > 0
                      ? "text-green-600"
                      : team.dg < 0
                        ? "text-red-600"
                        : "text-zinc-500"
                  }`}
                >
                  {team.dg > 0 ? `+${team.dg}` : team.dg}
                </td>

                {/* Puntos */}

                <td className="px-4 py-4 text-center">
                  <span className="text-base font-black text-zinc-950">
                    {team.puntos}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda */}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zinc-100 px-4 py-4 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-1.5 rounded-full bg-green-500" />
          <span>Semifinales de Liga</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-1.5 rounded-full bg-blue-500" />
          <span>Cuartos de Liga</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-1.5 rounded-full bg-yellow-400" />
          <span>Cuartos de Copa</span>
        </div>
      </div>
    </div>
  );
}