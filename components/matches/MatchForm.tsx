"use client";

import { useState } from "react";
import { refreshPlayerStats } from "@/lib/players";
import { createMatch } from "@/lib/matches";
import { createPlayerMatchStat } from "@/lib/playerMatchStats";

import PlayerMatchList, {
  MatchPlayerStats,
} from "./PlayerMatchList";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Switch from "@/components/ui/Switch";

export default function MatchForm() {
  const [loading, setLoading] = useState(false);

  const [players, setPlayers] = useState<
    MatchPlayerStats[]
  >([]);

  const [form, setForm] = useState({
    rival: "",
    fecha: "",
    torneo: "",
    goles_favor: 0,
    goles_contra: 0,
    local: true,
    escudo_rival: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      let resultado = "Empate";

      if (
        form.goles_favor >
        form.goles_contra
      ) {
        resultado = "Victoria";
      }

      if (
        form.goles_favor <
        form.goles_contra
      ) {
        resultado = "Derrota";
      }

      const match =
        await createMatch({
          ...form,
          resultado,
        });

      for (const player of players) {
        await createPlayerMatchStat({
          match_id: match.id,

          player_id: player.player_id,

          jugo: player.jugo,

          goles: player.goles,

          asistencias:
            player.asistencias,

          amarillas:
            player.amarilla ? 1 : 0,

          rojas:
            player.roja ? 1 : 0,

          mvp: player.mvp,
        });
        await refreshPlayerStats(player.player_id);
      }

      alert("Partido guardado.");

      setPlayers([]);

      setForm({
        rival: "",
        fecha: "",
        torneo: "",
        goles_favor: 0,
        goles_contra: 0,
        local: true,
        escudo_rival: "",
      });
    } catch (err: any) {
      console.error(err);

      alert(
        err?.message ??
          "Ocurrió un error."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >      <Input
        label="Rival"
        value={form.rival}
        onChange={(value) =>
          setForm({
            ...form,
            rival: value,
          })
        }
      />

      <Input
        label="Fecha"
        type="date"
        value={form.fecha}
        onChange={(value) =>
          setForm({
            ...form,
            fecha: value,
          })
        }
      />

      <Input
        label="Torneo"
        value={form.torneo}
        onChange={(value) =>
          setForm({
            ...form,
            torneo: value,
          })
        }
      />

      <div className="grid grid-cols-2 gap-6">

        <Input
          label="Goles Martincitas"
          type="number"
          value={String(form.goles_favor)}
          onChange={(value) =>
            setForm({
              ...form,
              goles_favor: Number(value),
            })
          }
        />

        <Input
          label="Goles Rival"
          type="number"
          value={String(form.goles_contra)}
          onChange={(value) =>
            setForm({
              ...form,
              goles_contra: Number(value),
            })
          }
        />

      </div>

      <Switch
        label="Local"
        checked={form.local}
        onChange={(value) =>
          setForm({
            ...form,
            local: value,
          })
        }
      />

      <Input
        label="Escudo rival (URL)"
        value={form.escudo_rival}
        onChange={(value) =>
          setForm({
            ...form,
            escudo_rival: value,
          })
        }
      />

      <div className="border-t pt-10">

        <h2 className="mb-6 text-3xl font-black">
          Estadísticas de jugadores
        </h2>

        <PlayerMatchList
          value={players}
          onChange={setPlayers}
        />

      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Guardando..."
          : "Guardar partido"}
      </Button>

    </form>
  );
}