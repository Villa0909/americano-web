import Image from "next/image";
import Link from "next/link";

import { Player } from "@/types/player";

import Card from "../ui/Card";

interface Props {
  player: Player;
}

export default function PlayerChip({ player }: Props) {
  const isReceiving =
    player.posicion === "Receptor" ||
    player.posicion === "Corredor";

  const isQuarterback =
    player.posicion === "Quarterback";

  const isDLine =
    player.posicion === "D-Line";

  const isDefense =
    player.posicion === "Linebacker" ||
    player.posicion === "Cornerback" ||
    player.posicion === "Safety";

  return (
    <Link href={`/plantilla/${player.slug}`}>
      <Card
        className="
          group
          w-56
          overflow-hidden
          hover:-translate-y-2
          hover:border-black
          hover:shadow-2xl
        "
      >
        {/* FOTO */}
        <div className="relative h-72 overflow-hidden bg-zinc-100">
          <Image
            src={player.foto}
            alt={player.nombre}
            fill
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* INFORMACIÓN */}
        <div className="relative p-5">
          {/* Número de fondo */}
          <span
            className="
              absolute
              right-4
              top-2
              select-none
              text-6xl
              font-black
              text-zinc-100
            "
          >
            {player.numero}
          </span>

          <p className="text-xs uppercase tracking-[3px] text-zinc-500">
            {player.posicion}
          </p>

          <h2 className="relative mt-2 text-xl font-black">
            {player.nombre}
          </h2>

          {/* ESTADÍSTICAS */}
          {player.posicion !== "O-Line" && (
            <div className="relative mt-5 border-t border-zinc-100 pt-4">
              {/* RECEPTORES / CORREDORES */}
              {isReceiving && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <Stat
                    value={player.recepciones}
                    label="REC"
                  />

                  <Stat
                    value={player.yardas}
                    label="YDS"
                  />

                  <Stat
                    value={player.touchdowns}
                    label="TD"
                  />
                </div>
              )}

              {/* QUARTERBACK */}
              {isQuarterback && (
                <div className="grid grid-cols-2 gap-2 text-center">
                  <Stat
                    value={player.pases_completos}
                    label="CMP"
                  />

                  <Stat
                    value={player.yardas_pase}
                    label="YDS PASE"
                  />

                  <Stat
                    value={player.touchdowns_pase}
                    label="TD PASE"
                  />

                  <Stat
                    value={player.touchdowns_carrera}
                    label="TD CARR"
                  />
                </div>
              )}

              {/* D-LINE */}
              {isDLine && (
                <div className="grid grid-cols-2 gap-2 text-center">
                  <Stat
                    value={player.tackles}
                    label="TKL"
                  />

                  <Stat
                    value={player.sacks}
                    label="SACK"
                  />
                </div>
              )}

              {/* LINEBACKERS / CB / SAFETY */}
              {isDefense && (
                <div className="grid grid-cols-2 gap-2 text-center">
                  <Stat
                    value={player.tackles}
                    label="TKL"
                  />

                  <Stat
                    value={player.intercepciones}
                    label="INT"
                  />

                  <Stat
                    value={player.sacks}
                    label="SACK"
                  />

                  <Stat
                    value={player.touchdowns_defensivos}
                    label="TD DEF"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

/* =========================
   ESTADÍSTICA
========================= */

function Stat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-lg bg-zinc-50 px-2 py-2">
      <p className="text-lg font-black leading-none text-[#0B3B82]">
        {value}
      </p>

      <p className="mt-1 text-[9px] font-bold tracking-wider text-zinc-400">
        {label}
      </p>
    </div>
  );
}