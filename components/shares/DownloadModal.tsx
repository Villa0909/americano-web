"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface Player {
  id: number;
  nombre: string;
  mvp: boolean;
}

interface Props {
  open: boolean;
  type: "match" | "player";
  players?: Player[];
  onClose: () => void;
  onDownload: (options: {
    template: "result" | "player" | "mvp";
    playerId?: number;
    stats: {
      goals: boolean;
      assists: boolean;
      yellow: boolean;
      red: boolean;
      cleanSheet: boolean;
    };
  }) => void;
}

export default function DownloadModal({
  open,
  type,
  players = [],
  onClose,
  onDownload,
}: Props) {
  if (!open) return null;

  const [template, setTemplate] = useState<
    "result" | "player" | "mvp"
  >("result");

  const [playerId, setPlayerId] = useState<number>();

  const selectedPlayer = players.find(
    (p) => p.id === playerId
  );

  const [stats, setStats] = useState({
    goals: true,
    assists: true,
    yellow: false,
    red: false,
    cleanSheet: false,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-black">
            Descargar imagen
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-zinc-100"
          >
            <X />
          </button>

        </div>

        {/* PARTIDO */}

        {type === "match" && (
          <>

            <h3 className="mt-8 font-bold">
              ¿Qué deseas descargar?
            </h3>

            <div className="mt-4 space-y-3">

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="radio"
                  checked={template === "result"}
                  onChange={() =>
                    setTemplate("result")
                  }
                />

                Resultado

              </label>

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="radio"
                  checked={
                    template === "player" ||
                    template === "mvp"
                  }
                  onChange={() =>
                    setTemplate("player")
                  }
                />

                Jugador

              </label>

            </div>

            {(template === "player" ||
              template === "mvp") && (
              <>

                <select
                  className="mt-6 w-full rounded-xl border p-3"
                  value={playerId}
                  onChange={(e) =>
                    setPlayerId(
                      Number(e.target.value)
                    )
                  }
                >
                  <option>
                    Selecciona jugador
                  </option>

                  {players.map((player) => (
                    <option
                      key={player.id}
                      value={player.id}
                    >
                      {player.nombre}
                    </option>
                  ))}

                </select>

                {selectedPlayer?.mvp && (

                  <label className="mt-5 flex cursor-pointer items-center gap-3">

                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setTemplate(
                          e.target.checked
                            ? "mvp"
                            : "player"
                        )
                      }
                    />

                    Usar diseño MVP ⭐

                  </label>

                )}

              </>
            )}

          </>
        )}

        {/* JUGADOR */}

        {template !== "result" && (
          <>

            <h3 className="mt-8 font-bold">
              Mostrar estadísticas
            </h3>

            <div className="mt-4 space-y-2">

              {[
                ["goals", "Goles"],
                ["assists", "Asistencias"],
                ["yellow", "Amarillas"],
                ["red", "Rojas"],
                ["cleanSheet", "Portería a cero"],
              ].map(([key, label]) => (

                <label
                  key={key}
                  className="flex items-center gap-3"
                >

                  <input
                    type="checkbox"
                    checked={
                      stats[
                        key as keyof typeof stats
                      ]
                    }
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        [key]:
                          e.target.checked,
                      })
                    }
                  />

                  {label}

                </label>

              ))}

            </div>

          </>
        )}

        <button
          onClick={() =>
            onDownload({
              template,
              playerId,
              stats,
            })
          }
          className="mt-8 w-full rounded-2xl bg-black py-4 font-bold text-white transition hover:bg-zinc-800"
        >

          Descargar

        </button>

      </div>

    </div>
  );
}