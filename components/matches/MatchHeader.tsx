import Image from "next/image";
import { PiSoccerBallFill } from "react-icons/pi";

interface Props {
  rival: string;
  escudoRival: string;
  torneo: string;
  fecha: string;
  golesFavor: number;
  golesContra: number;

  goleadores: {
    player_id: string;
    nombre: string;
    goles: number;
  }[];
}

export default function MatchHeader({
  rival,
  escudoRival,
  torneo,
  fecha,
  golesFavor,
  golesContra,
  goleadores,
}: Props) {
  let status = "Empate";
  let color = "bg-zinc-500";

  if (golesFavor > golesContra) {
    status = "Victoria";
    color = "bg-green-600";
  }

  if (golesFavor < golesContra) {
    status = "Derrota";
    color = "bg-red-600";
  }

  const rivalShield = escudoRival
    ? `/escudos/${escudoRival}`
    : "/logo.png";

  const formattedDate = new Date(fecha).toLocaleDateString(
    "es-MX",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-md sm:rounded-3xl">
      <div className="bg-gradient-to-r from-black via-zinc-900 to-black text-white">
        {/* DISEÑO PARA TELÉFONO */}

        <div className="px-4 py-7 md:hidden">
          <p className="text-center text-xs font-semibold uppercase tracking-[3px] text-zinc-400">
            {torneo}
          </p>

          {/* Equipos */}

          <div className="mt-7 grid grid-cols-2 gap-5">
            {/* Martincitas */}

            <div className="flex min-w-0 flex-col items-center text-center">
              <div className="relative h-20 w-20">
                <Image
                  src="/logo.png"
                  alt="Martincitas"
                  fill
                  priority
                  sizes="80px"
                  className="scale-125 object-contain"
                />
              </div>

              <h2 className="mt-3 w-full truncate text-base font-bold">
                MARTINCITAS
              </h2>
            </div>

            {/* Rival */}

            <div className="flex min-w-0 flex-col items-center text-center">
              <div className="relative h-20 w-20">
                <Image
                  src={rivalShield}
                  alt={rival}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>

              <h2 className="mt-3 w-full truncate text-base font-bold">
                {rival}
              </h2>
            </div>
          </div>

          {/* Marcador */}

          <div className="mt-7 flex flex-col items-center">
            <h1 className="text-5xl font-black tracking-tight">
              {golesFavor} - {golesContra}
            </h1>

            <span
              className={`mt-4 rounded-full px-5 py-2 text-sm font-bold text-white ${color}`}
            >
              {status}
            </span>
          </div>

          {/* Goleadores */}

          {goleadores.length > 0 && (
            <div className="mt-8 rounded-2xl border border-zinc-700 bg-white/5 px-4 py-4">
              <p className="mb-3 text-center text-xs font-bold uppercase tracking-[2px] text-zinc-400">
                Goleadores
              </p>

              <div className="flex flex-col items-center gap-2">
                {goleadores.map((player) => (
                  <div
                    key={player.player_id}
                    className="flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <span>{player.nombre}</span>

                    <div className="flex items-center gap-1">
                      {Array.from({
                        length: player.goles,
                      }).map((_, index) => (
                        <PiSoccerBallFill
                          key={index}
                          className="text-lg"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DISEÑO ORIGINAL PARA PC */}

        <div className="hidden px-10 py-12 md:block">
          <p className="text-center text-sm uppercase tracking-[4px] text-zinc-400">
            {torneo}
          </p>

          <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-start">
            {/* Martincitas */}

            <div className="flex flex-col items-center">
              <div className="relative h-[110px] w-[110px]">
                <Image
                  src="/logo.png"
                  alt="Martincitas"
                  fill
                  priority
                  sizes="110px"
                  className="scale-125 object-contain"
                />
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                MARTINCITAS
              </h2>

              {goleadores.length > 0 && (
                <div className="mt-6 flex flex-col gap-2">
                  {goleadores.map((player) => (
                    <div
                      key={player.player_id}
                      className="flex items-center justify-center gap-2 text-base font-semibold"
                    >
                      <span>{player.nombre}</span>

                      <div className="flex items-center gap-1">
                        {Array.from({
                          length: player.goles,
                        }).map((_, index) => (
                          <PiSoccerBallFill
                            key={index}
                            className="text-xl"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Marcador */}

            <div className="mx-10 flex flex-col items-center">
              <h1 className="whitespace-nowrap text-7xl font-black">
                {golesFavor} - {golesContra}
              </h1>

              <span
                className={`mt-5 rounded-full px-5 py-2 text-sm font-bold text-white ${color}`}
              >
                {status}
              </span>
            </div>

            {/* Rival */}

            <div className="flex min-w-0 flex-col items-center">
              <div className="relative h-[110px] w-[110px]">
                <Image
                  src={rivalShield}
                  alt={rival}
                  fill
                  sizes="110px"
                  className="object-contain"
                />
              </div>

              <h2 className="mt-4 max-w-full text-center text-2xl font-bold">
                {rival}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Fecha */}

      <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-4 sm:py-5">
        <p className="text-center text-sm capitalize text-zinc-600 sm:text-base">
          {formattedDate}
        </p>
      </div>
    </section>
  );
}