"use client";

import { useEffect, useState } from "react";
import {
  X,
  User,
  Trophy,
  ChartColumn,
} from "lucide-react";
import { PiSoccerBallFill } from "react-icons/pi";

import ShareOption from "./ShareOption";

interface Props {
  open: boolean;
  onClose: () => void;
  player: any;

  onDownload: (
    type: "player" | "mvp" | "result" | "stats"
  ) => void;
}

type ShareType =
  | "player"
  | "mvp"
  | "result"
  | "stats";

export default function ShareModal({
  open,
  onClose,
  onDownload,
}: Props) {
  const [selected, setSelected] =
    useState<ShareType>("player");

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
<div className="fixed inset-0 z-[10000] flex items-end justify-center md:items-center md:p-6">      {/* Fondo */}

      <button
        type="button"
        aria-label="Cerrar ventana"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      {/* Modal */}

      <section
        role="dialog"
        aria-modal="true"
        aria-label="Compartir"
        className="
          relative
          z-10
          max-h-[85dvh]
          w-full
          overflow-y-auto
          rounded-t-[28px]
          bg-zinc-900
          px-4
          pb-[calc(20px+env(safe-area-inset-bottom))]
          pt-3
          shadow-2xl

          md:max-h-[90vh]
          md:max-w-xl
          md:rounded-3xl
          md:p-6
        "
      >
        {/* Barra solo en móvil */}

        <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-zinc-600 md:hidden" />

        {/* Header */}

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Compartir
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Opciones */}

        <div className="space-y-3">
          <ShareOption
            title="Jugador"
            description="Descargar tarjeta del jugador"
            selected={selected === "player"}
            onClick={() => setSelected("player")}
            icon={
              <User
                size={25}
                className={
                  selected === "player"
                    ? "text-black"
                    : "text-white"
                }
              />
            }
          />

          <ShareOption
            title="MVP"
            description="Descargar tarjeta MVP"
            selected={selected === "mvp"}
            onClick={() => setSelected("mvp")}
            icon={
              <Trophy
                size={25}
                fill="currentColor"
                className="text-yellow-400"
              />
            }
          />

          <ShareOption
            title="Resultado"
            description="Compartir resultado del partido"
            selected={selected === "result"}
            onClick={() => setSelected("result")}
            icon={
              <PiSoccerBallFill
                size={27}
                className={
                  selected === "result"
                    ? "text-black"
                    : "text-white"
                }
              />
            }
          />

          <ShareOption
            title="Estadísticas"
            description="Compartir estadísticas"
            selected={selected === "stats"}
            onClick={() => setSelected("stats")}
            icon={
              <ChartColumn
                size={25}
                className={
                  selected === "stats"
                    ? "text-black"
                    : "text-white"
                }
              />
            }
          />
        </div>

        {/* Botones */}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-700 py-3 font-semibold text-white active:bg-zinc-800"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => {
              onDownload(selected);
              onClose();
            }}
            className="rounded-xl bg-white py-3 font-bold text-black active:bg-zinc-200"
          >
            Descargar
          </button>
        </div>
      </section>
    </div>
  );
}