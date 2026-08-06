import Image from "next/image";
import { PiSoccerBallFill } from "react-icons/pi";
import { SportShoe } from "lucide-react";
import { Star } from "lucide-react";

interface Props {
  mvp: any;
}

export default function MatchMVP({
  mvp,
}: Props) {
  if (!mvp) return null;

  return (
    <section className="mb-12 flex flex-col items-center">

      {/* Foto */}

      <div className="relative">

        {/* Estrella */}

        <div className="absolute -right-1 -top-1 z-10 rounded-full bg-blue-600 p-2 shadow-lg">

          <Star
            size={18}
            fill="white"
            color="white"
          />

        </div>

        {/* Foto */}

        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">

          <Image
            src={`/mvp/${mvp.nombre.toLowerCase()}-mvp-v2.png`}
            alt={mvp.nombre}
            width={128}
            height={128}
            priority
            className="object-cover"
          />

        </div>

      </div>

      {/* Nombre */}

      <h2 className="mt-5 text-3xl font-black uppercase">
        {mvp.nombre}
      </h2>

      {/* Resumen */}

      <div className="mt-3 flex items-center gap-5">

        {mvp.goles > 0 && (
          <div className="flex gap-1">
            {Array.from({
              length: mvp.goles,
            }).map((_, i) => (
              <PiSoccerBallFill
                key={i}
                className="text-xl"
              />
            ))}
          </div>
        )}

        {mvp.asistencias > 0 && (
          <div className="flex gap-1">
            {Array.from({
              length: mvp.asistencias,
            }).map((_, i) => (
              <SportShoe
  key={i}
  className="h-6 w-6"
/>
            ))}
          </div>
        )}

      </div>

    </section>
  );
}