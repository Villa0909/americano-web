"use client";

import { useEffect, useState } from "react";

import PlayerMatchCard from "./PlayerMatchCard";

import { getPlayers } from "@/lib/players";

export interface MatchPlayerStats {
  player_id: string;

  nombre: string;

  jugo: boolean;

  goles: number;

  asistencias: number;

  amarilla: boolean;

  roja: boolean;

  mvp: boolean;
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
      const players = await getPlayers();

      onChange(
        players.map((player) => ({
          player_id: player.id,
          nombre: player.nombre,

          jugo: true,

          goles: 0,
          asistencias: 0,

          amarilla: false,
          roja: false,

          mvp: false,
        }))
      );

      setLoading(false);
    }

    if (value.length === 0) {
      loadPlayers();
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
    return (
      <p>Cargando jugadores...</p>
    );
  }

  return (
    <div className="space-y-6">

      {value.map((player, index) => (
        <PlayerMatchCard
          key={player.player_id}
          nombre={player.nombre}
          jugo={player.jugo}
          goles={player.goles}
          asistencias={player.asistencias}
          amarilla={player.amarilla}
          roja={player.roja}
          mvp={player.mvp}
          onPlayChange={(v) =>
            updatePlayer(index, {
              jugo: v,
            })
          }
          onGoalsChange={(v) =>
            updatePlayer(index, {
              goles: v,
            })
          }
          onAssistsChange={(v) =>
            updatePlayer(index, {
              asistencias: v,
            })
          }
          onYellowChange={(v) =>
            updatePlayer(index, {
              amarilla: v,
            })
          }
          onRedChange={(v) =>
            updatePlayer(index, {
              roja: v,
            })
          }
          onMvpChange={(v) =>
            updatePlayer(index, {
              mvp: v,
            })
          }
        />
      ))}

    </div>
  );
}