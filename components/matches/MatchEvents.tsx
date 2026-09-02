import {
  Trophy,
  Hand,
  Zap,
  Target,
  Shield,
  Crosshair,
} from "lucide-react";

interface Props {
  goles: any[];
  asistencias: any[];
  amarillas: any[];
  rojas: any[];
}

export default function MatchEvents({
  goles,
}: Props) {
  const jugadores = goles;

  if (jugadores.length === 0) {
    return (
      <div className="rounded-2xl border border-yellow-400/30 bg-[#0B3B82] px-6 py-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[2px] text-blue-200">
          Sin estadísticas registradas
        </p>
      </div>
    );
  }

  const ofensiva = jugadores.filter(
    (player) =>
      player.recepciones > 0 ||
      player.yardas > 0 ||
      player.touchdowns > 0 ||
      player.pases_completos > 0 ||
      player.yardas_pase > 0 ||
      player.touchdowns_pase > 0 ||
      player.touchdowns_carrera > 0
  );

  const defensiva = jugadores.filter(
    (player) =>
      player.tackles > 0 ||
      player.intercepciones > 0 ||
      player.sacks > 0 ||
      player.touchdowns_defensivos > 0
  );

  return (
    <div className="space-y-10">

      {/* OFENSIVA */}

      {ofensiva.length > 0 && (
        <section>

          <h2 className="mb-6 text-sm font-black uppercase tracking-[3px] text-yellow-400">
            OFENSIVA
          </h2>

          <div className="space-y-4">

            {ofensiva.map((player) => (
              <div
                key={player.player_id}
                className="rounded-2xl border border-[#17447D] bg-[#0B3B82] p-5"
              >

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-[#062A63]">
                    <Zap className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-lg font-black text-white">
                      {player.nombre}
                    </p>

                    {player.posicion && (
                      <p className="text-xs font-bold uppercase tracking-[1px] text-blue-200">
                        {player.posicion}
                      </p>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                  {player.recepciones > 0 && (
                    <Stat
                      icon={<Hand />}
                      label="REC"
                      value={player.recepciones}
                    />
                  )}

                  {player.yardas > 0 && (
                    <Stat
                      icon={<Target />}
                      label="YDS"
                      value={player.yardas}
                    />
                  )}

                  {player.touchdowns > 0 && (
                    <Stat
                      icon={<Trophy />}
                      label="TD"
                      value={player.touchdowns}
                    />
                  )}

                  {player.pases_completos > 0 && (
                    <Stat
                      icon={<Crosshair />}
                      label="CMP"
                      value={player.pases_completos}
                    />
                  )}

                  {player.yardas_pase > 0 && (
                    <Stat
                      icon={<Target />}
                      label="YDS PASE"
                      value={player.yardas_pase}
                    />
                  )}

                  {player.touchdowns_pase > 0 && (
                    <Stat
                      icon={<Trophy />}
                      label="TD PASE"
                      value={player.touchdowns_pase}
                    />
                  )}

                  {player.touchdowns_carrera > 0 && (
                    <Stat
                      icon={<Trophy />}
                      label="TD CARR"
                      value={player.touchdowns_carrera}
                    />
                  )}

                </div>

              </div>
            ))}

          </div>

        </section>
      )}

      {/* DEFENSIVA */}

      {defensiva.length > 0 && (
        <section>

          <h2 className="mb-6 border-t border-yellow-400/20 pt-8 text-sm font-black uppercase tracking-[3px] text-yellow-400">
            DEFENSIVA
          </h2>

          <div className="space-y-4">

            {defensiva.map((player) => (
              <div
                key={player.player_id}
                className="rounded-2xl border border-[#17447D] bg-[#0B3B82] p-5"
              >

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-[#062A63]">
                    <Shield className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-lg font-black text-white">
                      {player.nombre}
                    </p>

                    {player.posicion && (
                      <p className="text-xs font-bold uppercase tracking-[1px] text-blue-200">
                        {player.posicion}
                      </p>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                  {player.tackles > 0 && (
                    <Stat
                      icon={<Shield />}
                      label="TKL"
                      value={player.tackles}
                    />
                  )}

                  {player.intercepciones > 0 && (
                    <Stat
                      icon={<Crosshair />}
                      label="INT"
                      value={player.intercepciones}
                    />
                  )}

                  {player.sacks > 0 && (
                    <Stat
                      icon={<Zap />}
                      label="SACK"
                      value={player.sacks}
                    />
                  )}

                  {player.touchdowns_defensivos > 0 && (
                    <Stat
                      icon={<Trophy />}
                      label="TD DEF"
                      value={player.touchdowns_defensivos}
                    />
                  )}

                </div>

              </div>
            ))}

          </div>

        </section>
      )}

    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-[#17447D] bg-[#062A63] p-3">

      <div className="mb-1 flex items-center gap-2 text-yellow-400">
        <span className="h-4 w-4">
          {icon}
        </span>

        <span className="text-[10px] font-black tracking-[1px]">
          {label}
        </span>
      </div>

      <p className="text-xl font-black text-white">
        {value}
      </p>

    </div>
  );
}