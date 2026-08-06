import Image from "next/image";
import Link from "next/link";

import { Player } from "@/types/player";

import Card from "../ui/Card";

interface Props {
  player: Player;
}

export default function PlayerChip({ player }: Props) {
  return (
    <Link href={`/plantilla/${player.slug}`}>

      <Card
        className="
          group
          overflow-hidden
          hover:-translate-y-2
          hover:shadow-2xl
          hover:border-black
          w-56
        "
      >
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

        <div className="relative p-5">

          {/* Número de fondo */}

          <span
            className="
              absolute
              right-4
              top-2
              text-6xl
              font-black
              text-zinc-100
              select-none
            "
          >
            {player.numero}
          </span>

          <p className="text-xs uppercase tracking-[3px] text-zinc-500">
            {player.posicion}
          </p>

          <h2 className="mt-2 text-xl font-black">
            {player.nombre}
          </h2>

        </div>

      </Card>

    </Link>
  );
}