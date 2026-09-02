"use client";

import { useEffect, useState } from "react";

import PlayerMatchCard from "./PlayerMatchCard";
import { getPlayers } from "@/lib/players";
import { PlayerPosition } from "@/types/player";

export interface MatchPlayerStats {
  player_id: string;
  nombre: string;
  posicion: PlayerPosition;

  jugo: boolean;

  recepciones: number;
  yardas: number;
  touchdowns: number;

  pases_completos: number;
  yardas_pase: number;
  touchdowns_pase: number;
  touchdowns_carrera: number;

  tackles: number;
  intercepciones: number;
  sacks: number;
  touchdowns_defensivos: number;
}

interface Props {
  value: MatchPlayerStats[];
  onChange: (players: MatchPlayerStats[]) => void;
}

export default function PlayerMatchList({
  value,
  onChange,
}: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlayers() {
      try {
        const players = await getPlayers();

        onChange(
          players.map((player) => ({
            player_id: player.id,
            nombre: player.nombre,
            posicion: player.posicion,

            jugo: true,

            recepciones: 0,
            yardas: 0,
            touchdowns: 0,

            pases_completos: 0,
            yardas_pase: 0,
            touchdowns_pase: 0,
            touchdowns_carrera: 0,

            tackles: 0,
            intercepciones: 0,
            sacks: 0,
            touchdowns_defensivos: 0,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (value.length === 0) {
      void loadPlayers();
    } else {
      setLoading(false);
    }
  }, []);

  function updatePlayer(
    index: number,
    changes: Partial<MatchPlayerStats>
  ) {
    const copy = [...value];

    copy[index] = {
      ...copy[index],
      ...changes,
    };

    onChange(copy);
  }

  if (loading) {
    return <p>Cargando jugadores...</p>;
  }

  return (
    <div className="space-y-6">
      {value.map((player, index) => (
        <PlayerMatchCard
          key={player.player_id}
          nombre={player.nombre}
          posicion={player.posicion}

          jugo={player.jugo}

          recepciones={player.recepciones}
          yardas={player.yardas}
          touchdowns={player.touchdowns}

          pases_completos={player.pases_completos}
          yardas_pase={player.yardas_pase}
          touchdowns_pase={player.touchdowns_pase}
          touchdowns_carrera={player.touchdowns_carrera}

          tackles={player.tackles}
          intercepciones={player.intercepciones}
          sacks={player.sacks}
          touchdowns_defensivos={player.touchdowns_defensivos}

          onPlayChange={(v) =>
            updatePlayer(index, {
              jugo: v,
            })
          }

          onRecepcionesChange={(v) =>
            updatePlayer(index, {
              recepciones: v,
            })
          }

          onYardasChange={(v) =>
            updatePlayer(index, {
              yardas: v,
            })
          }

          onTouchdownsChange={(v) =>
            updatePlayer(index, {
              touchdowns: v,
            })
          }

          onPasesCompletosChange={(v) =>
            updatePlayer(index, {
              pases_completos: v,
            })
          }

          onYardasPaseChange={(v) =>
            updatePlayer(index, {
              yardas_pase: v,
            })
          }

          onTouchdownsPaseChange={(v) =>
            updatePlayer(index, {
              touchdowns_pase: v,
            })
          }

          onTouchdownsCarreraChange={(v) =>
            updatePlayer(index, {
              touchdowns_carrera: v,
            })
          }

          onTacklesChange={(v) =>
            updatePlayer(index, {
              tackles: v,
            })
          }

          onIntercepcionesChange={(v) =>
            updatePlayer(index, {
              intercepciones: v,
            })
          }

          onSacksChange={(v) =>
            updatePlayer(index, {
              sacks: v,
            })
          }

          onTouchdownsDefensivosChange={(v) =>
            updatePlayer(index, {
              touchdowns_defensivos: v,
            })
          }
        />
      ))}
    </div>
  );
}