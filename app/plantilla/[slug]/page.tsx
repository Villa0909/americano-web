import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PlayerView from "@/components/player/PlayerView";
import { getPlayerBySlug } from "@/lib/players";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

interface PlayerStat {
  title: string;
  value: number;
}

export default async function PlayerPage({
  params,
}: Props) {
  const { slug } = await params;

  let player;

  try {
    player = await getPlayerBySlug(slug);
  } catch {
    notFound();
  }

  if (!player) {
    notFound();
  }

  const playerStats: PlayerStat[] = [
    {
      title: "GOLES",
      value: Number(player.goles ?? 0),
    },
    {
      title: "ASISTENCIAS",
      value: Number(player.asistencias ?? 0),
    },
    {
      title: "PARTIDOS",
      value: Number(player.partidos ?? 0),
    },
    {
      title: "MVP",
      value: Number(player.mvps ?? 0),
    },
  ];

  if (player.posicion === "Portero") {
    playerStats.push({
      title: "PORTERÍAS A 0",
      value: Number(
        player.porterias_cero ?? 0,
      ),
    });
  }

  const visibleStats = playerStats.filter(
    (stat) => stat.value > 0,
  );

  const statsColumns =
    visibleStats.length === 1
      ? "grid-cols-1 max-w-[220px]"
      : visibleStats.length === 2
        ? "grid-cols-2"
        : visibleStats.length === 3
          ? "grid-cols-3"
          : "grid-cols-2 sm:grid-cols-4";

  return (
    <PlayerView player={player}>
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <Link
            href="/plantilla"
            className="inline-flex text-sm font-medium text-zinc-600 transition hover:text-black"
          >
            ← Volver a la plantilla
          </Link>

          <div className="mt-6 grid gap-7 sm:mt-8 sm:gap-9 lg:grid-cols-[380px_1fr] lg:gap-10">
            {/* FOTO */}

            <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-2xl bg-zinc-100 shadow-lg lg:mx-0">
              <div className="relative h-[460px] w-full sm:h-[520px] lg:h-[550px]">
                <Image
                  src={player.foto}
                  alt={player.nombre}
                  fill
                  priority
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 430px, 380px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* INFORMACIÓN */}

            <div className="min-w-0">
              <p className="text-sm font-medium uppercase tracking-[3px] text-zinc-600 sm:text-base sm:tracking-[4px]">
                {player.posicion}
              </p>

              <div className="mt-2 flex items-start justify-between gap-4">
                <h1 className="min-w-0 break-words text-4xl font-black leading-[0.95] sm:text-5xl lg:text-6xl">
                  {player.nombre}
                </h1>

                <span className="shrink-0 text-3xl font-black text-zinc-300 sm:text-4xl">
                  #{player.numero}
                </span>
              </div>

              {/* ESTADÍSTICAS */}

              {visibleStats.length > 0 && (
                <div
                  className={`mt-8 grid gap-2 sm:mt-10 sm:gap-4 lg:gap-6 ${statsColumns}`}
                >
                  {visibleStats.map((stat) => (
                    <Stat
                      key={stat.title}
                      title={stat.title}
                      value={stat.value}
                    />
                  ))}
                </div>
              )}

              {/* DATOS */}

              <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7 border-y border-zinc-200 py-8 sm:mt-12 sm:gap-x-8 sm:gap-y-8">
                <Info
                  title="Edad"
                  value={`${player.edad} años`}
                />

                <Info
                  title="Altura"
                  value={`${player.altura} cm`}
                />

                <Info
                  title="Peso"
                  value={`${player.peso} kg`}
                />

                <Info
                  title="Pie hábil"
                  value={player.pie}
                />
              </div>

              {/* LEMA */}

              {player.descripcion?.trim() && (
                <div className="mt-9 sm:mt-12">
                  <h2 className="mb-3 text-xl font-black uppercase tracking-wide sm:text-2xl">
                    Frase Personal
                  </h2>

                  <p className="text-base italic leading-7 text-zinc-700 sm:leading-8">
                    “{player.descripcion}”
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PlayerView>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-zinc-200 bg-white px-2 py-4 text-center shadow-sm sm:p-5 lg:p-6">
      <p className="text-[9px] font-bold leading-tight tracking-[1px] text-zinc-600 sm:text-xs sm:tracking-[2px] lg:text-sm">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-black sm:text-4xl lg:text-5xl">
        {value}
      </h2>
    </div>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-[2px] text-zinc-600 sm:text-sm sm:tracking-[3px]">
        {title}
      </p>

      <h2 className="mt-2 break-words text-lg font-bold sm:text-2xl">
        {value}
      </h2>
    </div>
  );
}