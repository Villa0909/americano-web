import Image from "next/image";
import Link from "next/link";

import {
  ChartNoAxesColumnIncreasing,
  Hand,
  Shield,
  Target,
  Trophy,
  TrendingUp,
  Zap,
} from "lucide-react";

import { getMatches } from "@/lib/matches";
import { getPlayers } from "@/lib/players";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function createRanking(
  players: any[],
  getValue: (player: any) => number,
  limit = 5,
) {
  return [...players]
    .map((player) => ({
      player,
      value: Number(getValue(player) ?? 0),
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
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

  const pointsFor = playedMatches.reduce(
    (total, match) =>
      total + Number(match.goles_favor ?? 0),
    0,
  );

  const pointsAgainst = playedMatches.reduce(
    (total, match) =>
      total + Number(match.goles_contra ?? 0),
    0,
  );

  const pointDifference =
    pointsFor - pointsAgainst;

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

  const topTouchdowns = createRanking(
    players,
    (player) =>
      Number(player.touchdowns ?? 0) +
      Number(player.touchdowns_carrera ?? 0) +
      Number(player.touchdowns_pase ?? 0) +
      Number(player.touchdowns_defensivos ?? 0),
  );

  const topYards = createRanking(
    players,
    (player) =>
      Number(player.yardas ?? 0),
  );

  const topReceptions = createRanking(
    players,
    (player) =>
      Number(player.recepciones ?? 0),
  );

  const topTackles = createRanking(
    players,
    (player) =>
      Number(player.tackles ?? 0),
  );

  const topSacks = createRanking(
    players,
    (player) =>
      Number(player.sacks ?? 0),
  );

  const topInterceptions = createRanking(
    players,
    (player) =>
      Number(player.intercepciones ?? 0),
  );

  const topPassingYards = createRanking(
    players,
    (player) =>
      Number(player.yardas_pase ?? 0),
  );

  const topCompletions = createRanking(
    players,
    (player) =>
      Number(player.pases_completos ?? 0),
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
    <main className="min-h-screen bg-[#062A63] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

        {/* ENCABEZADO */}

        <section className="mb-10 sm:mb-14">
          <p className="text-sm font-bold uppercase tracking-[3px] text-blue-200">
            Temporada 2026
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-yellow-400 sm:text-5xl lg:text-6xl">
            ESTADÍSTICAS
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
            Números generales de Caballeros y
            líderes individuales de la plantilla.
          </p>
        </section>

        {/* EQUIPO */}

        <section>
          <SectionHeader
            title="El equipo en números"
            icon={
              <ChartNoAxesColumnIncreasing
                size={22}
              />
            }
          />

          <div className="overflow-hidden rounded-3xl border border-yellow-400 bg-yellow-400 shadow-xl">
            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#062A63]">
                Registro de la temporada
              </p>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-6xl font-black text-[#062A63] sm:text-7xl">
                  {playedMatches.length}
                </span>

                <span className="pb-2 text-sm font-bold uppercase tracking-[2px] text-[#062A63]">
                  partidos
                </span>
              </div>

              <div className="mt-8 grid grid-cols-3 divide-x divide-[#062A63]/20 rounded-2xl border border-[#062A63]/20">
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

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <ClubStat
              title="Puntos a favor"
              value={pointsFor}
              icon={<Target size={24} />}
            />

            <ClubStat
              title="Puntos en contra"
              value={pointsAgainst}
              icon={<Shield size={24} />}
            />

            <ClubStat
              title="Diferencial"
              value={
                pointDifference > 0
                  ? `+${pointDifference}`
                  : pointDifference
              }
              icon={<TrendingUp size={24} />}
            />

            <ClubStat
              title="Efectividad"
              value={`${effectiveness}%`}
              icon={<Trophy size={24} />}
            />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-yellow-400 bg-yellow-400 p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#062A63]">
                Promedio de puntos
              </p>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl font-black text-[#062A63] sm:text-6xl">
                  {playedMatches.length > 0
                    ? (
                        pointsFor /
                        playedMatches.length
                      ).toFixed(1)
                    : "0.0"}
                </span>

                <span className="pb-1 text-sm text-[#062A63]">
                  puntos por partido
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-400 bg-yellow-400 p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#062A63]">
                Mayor victoria
              </p>

              {biggestVictory ? (
                <>
                  <p className="mt-4 text-4xl font-black text-[#062A63] sm:text-5xl">
                    {biggestVictory.goles_favor} -{" "}
                    {biggestVictory.goles_contra}
                  </p>

                  <p className="mt-2 text-base font-semibold text-[#062A63]">
                    vs. {biggestVictory.rival}
                  </p>

                  <p className="mt-1 text-sm text-[#062A63]/80">
                    {biggestVictory.torneo}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-[#062A63]">
                  Aún no hay victorias registradas.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* OFENSIVA */}

        <section className="mt-16 sm:mt-20">
          <SectionHeader
            title="Líderes ofensivos"
            icon={<Zap size={22} />}
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <RankingCard
              title="Touchdowns"
              subtitle="Más touchdowns registrados"
              icon={<Trophy size={25} />}
              ranking={topTouchdowns}
              unit="TD"
            />

            <RankingCard
              title="Yardas"
              subtitle="Más yardas avanzadas"
              icon={<Target size={25} />}
              ranking={topYards}
              unit="YDS"
            />

            <RankingCard
              title="Recepciones"
              subtitle="Más pases recibidos"
              icon={<Hand size={25} />}
              ranking={topReceptions}
              unit="REC"
            />

            <RankingCard
              title="Pases completos"
              subtitle="Más pases completados"
              icon={<Target size={25} />}
              ranking={topCompletions}
              unit="CMP"
            />

            <RankingCard
              title="Yardas de pase"
              subtitle="Más yardas por pase"
              icon={<TrendingUp size={25} />}
              ranking={topPassingYards}
              unit="YDS PASE"
            />
          </div>
        </section>

        {/* DEFENSIVA */}

        <section className="mt-16 sm:mt-20">
          <SectionHeader
            title="Líderes defensivos"
            icon={<Shield size={22} />}
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <RankingCard
              title="Tackles"
              subtitle="Más tackles registrados"
              icon={<Shield size={25} />}
              ranking={topTackles}
              unit="TKL"
            />

            <RankingCard
              title="Sacks"
              subtitle="Más capturas al quarterback"
              icon={<Zap size={25} />}
              ranking={topSacks}
              unit="SACK"
            />

            <RankingCard
              title="Intercepciones"
              subtitle="Más intercepciones"
              icon={<Target size={25} />}
              ranking={topInterceptions}
              unit="INT"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================
   ENCABEZADO DE SECCIÓN
========================= */

function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-[#062A63]">
        {icon}
      </div>

      <h2 className="text-2xl font-black text-yellow-400 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

/* =========================
   REGISTRO
========================= */

function RecordItem({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="px-2 py-5 text-center">
      <p className="text-3xl font-black text-[#062A63] sm:text-4xl">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-[1px] text-[#062A63]/80 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

/* =========================
   TARJETA DE RANKING
========================= */

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
  }[];
  unit: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-yellow-400 bg-yellow-400 shadow-sm">
      <header className="flex items-center justify-between border-b border-[#062A63]/20 px-5 py-5 sm:px-6">
        <div>
          <h3 className="text-xl font-black uppercase tracking-wide text-[#062A63]">
            {title}
          </h3>

          <p className="mt-1 text-sm text-[#062A63]/80">
            {subtitle}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#062A63] text-yellow-400">
          {icon}
        </div>
      </header>

      <div>
        {ranking.length === 0 ? (
          <p className="px-5 py-10 text-center text-[#062A63]/70">
            Aún no hay registros.
          </p>
        ) : (
          ranking.map(
            ({ player, value, rank }) => (
              <Link
                key={player.id}
                href={`/plantilla/${player.slug}`}
                className="grid grid-cols-[38px_56px_1fr_auto] items-center gap-3 border-b border-[#062A63]/20 px-4 py-4 transition last:border-b-0 hover:bg-yellow-300 sm:grid-cols-[42px_64px_1fr_auto] sm:px-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#062A63] text-base font-black text-yellow-400">
                  {rank}
                </span>

                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#062A63] bg-[#062A63] shadow-sm sm:h-16 sm:w-16">
                  <Image
                    src={player.foto || "/logo.png"}
                    alt={player.nombre}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-base font-black uppercase text-[#062A63] sm:text-lg">
                    {player.nombre}
                  </p>

                  <p className="mt-1 truncate text-xs font-medium text-[#062A63]/70 sm:text-sm">
                    #{player.numero} · {player.posicion}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-black text-[#062A63]">
                    {value}
                  </p>

                  <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#062A63]/70 sm:text-xs">
                    {unit}
                  </p>
                </div>
              </Link>
            ),
          )
        )}
      </div>
    </article>
  );
}

/* =========================
   ESTADÍSTICA DEL CLUB
========================= */

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
    <article className="rounded-2xl border border-yellow-400 bg-yellow-400 p-4 shadow-sm sm:p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#062A63] text-yellow-400">
        {icon}
      </div>

      <p className="mt-5 text-3xl font-black text-[#062A63] sm:text-4xl">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold uppercase tracking-[1.5px] text-[#062A63]/80 sm:text-sm">
        {title}
      </p>
    </article>
  );
}