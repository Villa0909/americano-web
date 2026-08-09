import Image from "next/image";
import { PiSoccerBallFill } from "react-icons/pi";

interface Scorer {
  nombre: string;
  goles: number;
}

interface Props {
  jornada: number;
  rival: string;
  escudo: string;
  golesFavor: number;
  golesContra: number;
  fecha: string;
  cancha: string;
  goleadores: Scorer[];
}

export default function ResultTemplate({
  jornada,
  rival,
  escudo,
  golesFavor,
  golesContra,
  fecha,
  cancha,
  goleadores,
}: Props) {
  return (
    <div className="relative h-[1350px] w-[1080px] overflow-hidden rounded-[40px] bg-zinc-900">

      {/* Fondo */}

      <Image
        src="/backgrounds/result-bg.png"
        alt=""
        fill
        className="object-cover"
      />

      {/* Contenido */}

      <div className="relative z-10 flex h-full flex-col px-20 py-20 text-white">

        {/* Jornada */}

        <p className="text-center text-2xl font-semibold tracking-[8px] text-zinc-300 uppercase">

          Jornada {jornada}

        </p>

        {/* Escudos */}

        <div className="mt-24 flex items-center justify-center gap-24">

          <Image
            src="/logo.png"
            alt=""
            width={170}
            height={170}
          />

          <h1 className="text-8xl font-black">

            {golesFavor} - {golesContra}

          </h1>

          <Image
            src={escudo}
            alt=""
            width={170}
            height={170}
          />

        </div>

        {/* Equipos */}

        <div className="mt-10 flex justify-center gap-28 text-5xl font-black uppercase">

          <span>Martincitas</span>

          <span>{rival}</span>

        </div>

        {/* Goleadores */}

        <div className="mt-24 space-y-8">

          {goleadores.map((player) => (

            <div
              key={player.nombre}
              className="flex items-center gap-5 text-4xl"
            >

              <div className="flex gap-2">

                {Array.from({
                  length: player.goles,
                }).map((_, i) => (

                  <PiSoccerBallFill
                    key={i}
                    className="h-8 w-8"
                  />

                ))}

              </div>

              <span className="font-bold">

                {player.nombre}

              </span>

            </div>

          ))}

        </div>

        {/* Footer */}

        <div className="mt-auto flex items-center justify-between border-t border-white/20 pt-10 text-2xl text-zinc-300">

          <span>{cancha}</span>

          <span>{fecha}</span>

        </div>

        <p className="mt-6 text-center text-xl tracking-[4px] text-zinc-400">

         martincitas-web-beta.vercel.app

        </p>

      </div>

    </div>
  );
}