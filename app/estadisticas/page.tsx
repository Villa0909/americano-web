import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Goal,
  Medal,
  Star,
  TrendingUp,
} from "lucide-react";

import { PiSoccerBallFill } from "react-icons/pi";
import { SportShoe } from "lucide-react";

import { getMatches } from "@/lib/matches";
import { getPlayers } from "@/lib/players";

function createRanking(
  players: any[],
  getValue: (player: any) => number,
  limit = 5,
) {
  const sortedPlayers = [...players]
    .map((player) => ({
      player,
      value: getValue(player),
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);

  let previousValue: number | null = null;
  let previousRank = 0;
  let podiumLevel = 0;

  return sortedPlayers.map((item, index) => {
    const isNewValue =
      item.value !== previousValue;

    if (isNewValue) {
      podiumLevel += 1;
    }

    const rank = isNewValue
      ? index + 1
      : previousRank;

    previousValue = item.value;
    previousRank = rank;

    return {
      ...item,
      rank,
      podium:
        podiumLevel <= 3
          ? podiumLevel
          : null,
    };
  });
}

export default async function EstadisticasPage() {
  const [players, matches] = await Promise.all([
    getPlayers(),
    getMatches(),
  ]);

  const playedMatches = matches.filter(
    (match) =>
      match.goles_favor !== null &&
      match.goles_contra !== null,
  );

  const victories = playedMatches.filter(
    (match) =>
      Number(match.goles_favor) >
      Number(match.goles_contra),
  ).length;

  const draws = playedMatches.filter(
    (match) =>
      Number(match.goles_favor) ===
      Number(match.goles_contra),
  ).length;

  const defeats = playedMatches.filter(
    (match) =>
      Number(match.goles_favor) <
      Number(match.goles_contra),
  ).length;

  const goalsFor = playedMatches.reduce(
    (total, match) =>
      total + Number(match.goles_favor ?? 0),
    0,
  );

  const goalsAgainst = playedMatches.reduce(
    (total, match) =>
      total + Number(match.goles_contra ?? 0),
    0,
  );

  const goalDifference =
    goalsFor - goalsAgainst;

  const possiblePoints =
    playedMatches.length * 3;

  const obtainedPoints =
    victories * 3 + draws;

  const effectiveness =
    possiblePoints > 0
      ? Math.round(
          (obtainedPoints / possiblePoints) * 100,
        )
      : 0;

  const goalAverage =
    playedMatches.length > 0
      ? (
          goalsFor / playedMatches.length
        ).toFixed(1)
      : "0.0";

  const topScorers = createRanking(
    players,
    (player) => Number(player.goles ?? 0),
  );

  const topAssists = createRanking(
    players,
    (player) =>
      Number(player.asistencias ?? 0),
  );

  const topMvps = createRanking(
    players,
    (player) => Number(player.mvps ?? 0),
  );

  const topAppearances = createRanking(
    players,
    (player) =>
      Number(player.partidos ?? 0),
  );

  const biggestVictory = playedMatches
    .filter(
      (match) =>
        Number(match.goles_favor) >
        Number(match.goles_contra),
    )
    .sort((a, b) => {
      const differenceA =
        Number(a.goles_favor) -
        Number(a.goles_contra);

      const differenceB =
        Number(b.goles_favor) -
        Number(b.goles_contra);

      return differenceB - differenceA;
    })[0];

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {/* Encabezado */}

        <section className="mb-10 sm:mb-14">
          <p className="text-sm font-bold uppercase tracking-[3px] text-zinc-500">
            Temporada 2026
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            ESTADÍSTICAS
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
            Números generales de Martincitas C.F. y
            líderes individuales de la plantilla.
          </p>
        </section>

        {/* Club */}

        <section>
  <SectionHeader
    title="El club en números"
    icon={
      <ChartNoAxesColumnIncreasing
        size={22}
      />
    }
  />

  {/* Registro principal */}

  <div className="overflow-hidden rounded-3xl bg-black text-white shadow-xl">
    <div className="px-6 py-8 sm:px-10 sm:py-10">
      <p className="text-xs font-bold uppercase tracking-[3px] text-zinc-400">
        Registro de la temporada
      </p>

      <div className="mt-5 flex items-end gap-3">
        <span className="text-6xl font-black sm:text-7xl">
          {playedMatches.length}
        </span>

        <span className="pb-2 text-sm font-bold uppercase tracking-[2px] text-zinc-400">
          partidos
        </span>
      </div>

      <div className="mt-8 grid grid-cols-3 divide-x divide-zinc-700 rounded-2xl border border-zinc-700">
        <RecordItem
          value={victories}
          label="Ganados"
        />

        <RecordItem
          value={draws}
          label="Empatados"
        />

        <RecordItem
          value={defeats}
          label="Perdidos"
        />
      </div>
    </div>
  </div>

  {/* Números secundarios */}

  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
    <ClubStat
      title="Goles a favor"
      value={goalsFor}
      icon={<PiSoccerBallFill size={26} />}
    />

    <ClubStat
      title="Goles en contra"
      value={goalsAgainst}
      icon={<Goal size={24} />}
    />

    <ClubStat
      title="Diferencia"
      value={
        goalDifference > 0
          ? `+${goalDifference}`
          : goalDifference
      }
      icon={<TrendingUp size={24} />}
    />

    <ClubStat
      title="Efectividad"
      value={`${effectiveness}%`}
      icon={<Medal size={24} />}
    />
  </div>

  {/* Promedio y mayor victoria */}

  {/* Resumen destacado */}

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-black p-6 text-white sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[3px] text-zinc-400">
                Promedio goleador
              </p>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl font-black sm:text-6xl">
                  {goalAverage}
                </span>

                <span className="pb-1 text-sm text-zinc-400">
                  goles por partido
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[3px] text-zinc-500">
                Mayor victoria
              </p>

              {biggestVictory ? (
                <>
                  <p className="mt-4 text-4xl font-black sm:text-5xl">
                    {biggestVictory.goles_favor} -{" "}
                    {biggestVictory.goles_contra}
                  </p>

                  <p className="mt-2 text-base font-semibold text-zinc-700">
                    vs. {biggestVictory.rival}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {biggestVictory.torneo}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-zinc-500">
                  Aún no hay victorias registradas.
                </p>
              )}
            </div>
          </div>
        </section>


        {/* Rankings */}

        <section className="mt-16 sm:mt-20">
          <SectionHeader
            title="Líderes de la plantilla"
            icon={<Medal size={22} />}
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <RankingCard
              title="Goleadores"
              subtitle="Máximos anotadores"
              icon={
                <PiSoccerBallFill size={25} />
              }
              ranking={topScorers}
              unit="goles"
            />

            <RankingCard
              title="Asistencias"
              subtitle="Máximos asistentes"
              icon={<SportShoe size={25} />}
              ranking={topAssists}
              unit="asistencias"
            />

            <RankingCard
              title="MVP"
              subtitle="Más reconocimientos"
              icon={
                <Star
                  size={25}
                  fill="currentColor"
                />
              }
              ranking={topMvps}
              unit="MVP"
            />

            <RankingCard
              title="Partidos"
              subtitle="Más apariciones"
              icon={<CalendarDays size={25} />}
              ranking={topAppearances}
              unit="partidos"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
        {icon}
      </div>

      <h2 className="text-2xl font-black sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function RecordItem({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="px-2 py-5 text-center">
      <p className="text-3xl font-black sm:text-4xl">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-[1px] text-zinc-400 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function MatchNumber({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-black">
        {value}
      </span>

      <span className="font-bold text-zinc-500">
        {label}
      </span>
    </div>
  );
}

function RankingCard({
  title,
  subtitle,
  icon,
  ranking,
  unit,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
 ranking: {
  player: any;
  value: number;
  rank: number;
  podium: number | null;
}[];
  unit: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-zinc-200 px-5 py-5 sm:px-6">
        <div>
          <h3 className="text-xl font-black uppercase tracking-wide">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            {subtitle}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
          {icon}
        </div>
      </header>

      <div>
        {ranking.length === 0 ? (
          <p className="px-5 py-10 text-center text-zinc-500">
            Aún no hay registros.
          </p>
        ) : (
          ranking.map(
  ({ player, value, rank, podium }) => {
    const podiumStyle =
      podium === 1
        ? "bg-amber-50"
        : podium === 2
          ? "bg-zinc-100"
          : podium === 3
            ? "bg-orange-50"
            : "bg-white hover:bg-zinc-50";

    const rankStyle =
      podium === 1
        ? "bg-yellow-400 text-black"
        : podium === 2
          ? "bg-zinc-400 text-white"
          : podium === 3
            ? "bg-amber-700 text-white"
            : "bg-zinc-100 text-zinc-500";

    return (
      <Link
        key={player.id}
        href={`/plantilla/${player.slug}`}
        className={`grid grid-cols-[38px_56px_1fr_auto] items-center gap-3 border-b border-zinc-200 px-4 py-4 transition last:border-b-0 sm:grid-cols-[42px_64px_1fr_auto] sm:px-6 ${podiumStyle}`}
      >
        {/* Posición */}

        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full text-base font-black ${rankStyle}`}
        >
          {rank}
        </span>

        {/* Foto MVP */}

        <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-zinc-200 shadow-sm sm:h-16 sm:w-16">
          <Image
            src={getMvpPhoto(player.nombre)}
            alt={player.nombre}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        {/* Jugador */}

        <div className="min-w-0">
          <p className="truncate text-base font-black uppercase sm:text-lg">
            {player.nombre}
          </p>

          <p className="mt-1 truncate text-xs font-medium text-zinc-600 sm:text-sm">
            #{player.numero} · {player.posicion}
          </p>
        </div>

        {/* Valor */}

        <div className="text-right">
          <p className="text-3xl font-black">
            {value}
          </p>

          <p className="text-[10px] font-bold uppercase tracking-[1px] text-zinc-500 sm:text-xs">
            {unit}
          </p>
        </div>
      </Link>
    );
  },
)
        )}
      </div>
    </article>
  );
}
function ClubStat({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-black">
        {icon}
      </div>

      <p className="mt-5 text-3xl font-black sm:text-4xl">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold uppercase tracking-[1.5px] text-zinc-500 sm:text-sm">
        {title}
      </p>
    </article>
  );
}
function getMvpPhoto(nombre: string) {
  const fileName = nombre
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return `/mvp/${fileName}-mvp-v2.png`;
}