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

  const playerStats: PlayerStat[] = [];

  /* =========================
     OFFENSE
  ========================= */

  if (
    player.posicion === "Receptor" ||
    player.posicion === "Corredor"
  ) {
    playerStats.push(
      {
        title: "RECEPCIONES",
        value: Number(player.recepciones ?? 0),
      },
      {
        title: "YARDAS",
        value: Number(player.yardas ?? 0),
      },
      {
        title: "TOUCHDOWNS",
        value: Number(player.touchdowns ?? 0),
      },
    );
  }

  if (player.posicion === "Quarterback") {
    playerStats.push(
      {
        title: "PASES COMPLETOS",
        value: Number(
          player.pases_completos ?? 0,
        ),
      },
      {
        title: "YARDAS DE PASE",
        value: Number(
          player.yardas_pase ?? 0,
        ),
      },
      {
        title: "TD DE PASE",
        value: Number(
          player.touchdowns_pase ?? 0,
        ),
      },
      {
        title: "TD DE CARRERA",
        value: Number(
          player.touchdowns_carrera ?? 0,
        ),
      },
    );
  }

  /* =========================
     DEFENSE
  ========================= */

  if (player.posicion === "D-Line") {
    playerStats.push(
      {
        title: "TACKLES",
        value: Number(player.tackles ?? 0),
      },
      {
        title: "SACKS",
        value: Number(player.sacks ?? 0),
      },
    );
  }

  if (
    player.posicion === "Linebacker" ||
    player.posicion === "Cornerback" ||
    player.posicion === "Safety"
  ) {
    playerStats.push(
      {
        title: "TACKLES",
        value: Number(player.tackles ?? 0),
      },
      {
        title: "INTERCEPCIONES",
        value: Number(
          player.intercepciones ?? 0,
        ),
      },
      {
        title: "SACKS",
        value: Number(player.sacks ?? 0),
      },
      {
        title: "TD DEFENSIVOS",
        value: Number(
          player.touchdowns_defensivos ?? 0,
        ),
      },
    );
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
      <main className="min-h-screen bg-[#062A63] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

          {/* VOLVER */}
          <Link
            href="/plantilla"
            className="inline-flex items-center text-sm font-black uppercase tracking-wide text-blue-200 transition hover:text-yellow-400"
          >
            ← Volver a la plantilla
          </Link>

          <div className="mt-6 grid gap-7 sm:mt-8 sm:gap-9 lg:grid-cols-[380px_1fr] lg:gap-10">

            {/* =========================
                FOTO
            ========================= */}

            <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-3xl border border-yellow-400/30 bg-[#0B3B82] shadow-2xl lg:mx-0">
              <div className="relative h-[460px] w-full sm:h-[520px] lg:h-[550px]">
                <Image
                  src={player.foto || "/logo.png"}
                  alt={player.nombre}
                  fill
                  priority
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 430px, 380px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* =========================
                INFORMACIÓN
            ========================= */}

            <div className="min-w-0">

              {/* POSICIÓN */}
              <p className="text-sm font-black uppercase tracking-[3px] text-yellow-400 sm:text-base sm:tracking-[4px]">
                {player.posicion}
              </p>

              {/* NOMBRE */}
              <div className="mt-2 flex items-start justify-between gap-4">
                <h1 className="min-w-0 break-words text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {player.nombre}
                </h1>

                <span className="shrink-0 text-3xl font-black text-yellow-400 sm:text-4xl">
                  #{player.numero}
                </span>
              </div>

              {/* =========================
                  ESTADÍSTICAS
              ========================= */}

              {visibleStats.length > 0 && (
                <div
                  className={`mt-8 grid gap-3 sm:mt-10 sm:gap-4 lg:gap-5 ${statsColumns}`}
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

              {/* =========================
                  DATOS
              ========================= */}

              <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7 border-y border-yellow-400/30 py-8 sm:mt-12 sm:gap-x-8 sm:gap-y-8">

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

              {/* =========================
                  FRASE PERSONAL
              ========================= */}

              {player.descripcion?.trim() && (
                <div className="mt-9 sm:mt-12">
                  <h2 className="mb-3 text-xl font-black uppercase tracking-wide text-yellow-400 sm:text-2xl">
                    Frase Personal
                  </h2>

                  <div className="rounded-2xl border border-yellow-400/20 bg-[#0B3B82] px-5 py-5 shadow-lg sm:px-6">
                    <p className="text-base italic leading-7 text-blue-100 sm:leading-8">
                      “{player.descripcion}”
                    </p>
                  </div>
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
    <div className="min-w-0 rounded-2xl border border-yellow-400/30 bg-yellow-400 px-2 py-4 text-center shadow-lg sm:p-5 lg:p-6">
      <p className="text-[9px] font-black leading-tight tracking-[1px] text-[#062A63] sm:text-xs sm:tracking-[2px] lg:text-sm">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-black text-[#062A63] sm:text-4xl lg:text-5xl">
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
      <p className="text-xs font-black uppercase tracking-[2px] text-yellow-400 sm:text-sm sm:tracking-[3px]">
        {title}
      </p>

      <h2 className="mt-2 break-words text-lg font-bold text-white sm:text-2xl">
        {value}
      </h2>
    </div>
  );
}