import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  ChevronRight,
  MapPin,
  Medal,
  Trophy,
} from "lucide-react";

import { PiSoccerBallFill } from "react-icons/pi";

import { getMatches } from "@/lib/matches";
import { getPlayers } from "@/lib/players";

export default async function Home() {
  const [matches, players] = await Promise.all([
    getMatches(),
    getPlayers(),
  ]);

  const now = new Date();

  const playedMatches = matches.filter(
    (match) =>
      match.goles_favor !== null &&
      match.goles_contra !== null,
  );

  const upcomingMatches = matches
    .filter(
      (match) =>
        match.goles_favor === null &&
        match.goles_contra === null &&
        new Date(match.fecha).getTime() >= now.getTime(),
    )
    .sort(
      (a, b) =>
        new Date(a.fecha).getTime() -
        new Date(b.fecha).getTime(),
    );

  const nextMatch = upcomingMatches[0] ?? null;

  const recentMatches = [...playedMatches]
    .sort(
      (a, b) =>
        new Date(b.fecha).getTime() -
        new Date(a.fecha).getTime(),
    )
    .slice(0, 3);

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

  const goalsFor = playedMatches.reduce(
    (total, match) =>
      total + Number(match.goles_favor ?? 0),
    0,
  );

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

  const topScorers = [...players]
    .filter(
      (player) =>
        Number(player.goles ?? 0) > 0,
    )
    .sort(
      (a, b) =>
        Number(b.goles ?? 0) -
        Number(a.goles ?? 0),
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Próximo partido */}

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_2px,transparent_2px,transparent_18px)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-black uppercase tracking-[4px] text-zinc-400 sm:text-sm">
              Sitio oficial
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-6xl lg:text-7xl">
              Martincitas C.F.
            </h1>

            <div className="mx-auto mt-8 h-px w-24 bg-zinc-700" />

            {nextMatch ? (
              <>
                <p className="mt-8 text-xs font-black uppercase tracking-[4px] text-zinc-400 sm:text-sm">
                  Próximo partido
                </p>

                <p className="mt-3 text-sm font-bold uppercase tracking-[2px] text-zinc-300">
                  Jornada {nextMatch.id} ·{" "}
                  {nextMatch.torneo ||
                    "Sin torneo"}
                </p>

                <div className="mx-auto mt-9 grid max-w-4xl grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-8">
                  {/* Martincitas */}

                  <div className="flex min-w-0 flex-col items-center">
                    <div className="relative h-20 w-20 sm:h-32 sm:w-32">
                      <Image
                        src="/logo.png"
                        alt="Martincitas"
                        fill
                        priority
                        sizes="128px"
                        className="scale-110 object-contain"
                      />
                    </div>

                    <p className="mt-4 max-w-full truncate text-sm font-black uppercase sm:text-2xl">
                      Martincitas
                    </p>
                  </div>

                  {/* Hora */}

                  <div className="flex min-w-[100px] flex-col items-center sm:min-w-[180px]">
                    <p className="whitespace-nowrap text-3xl font-black sm:text-5xl">
                      {new Date(
                        nextMatch.fecha,
                      ).toLocaleTimeString(
                        "es-MX",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                        },
                      )}
                    </p>

                    <span className="mt-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[1px] text-zinc-200 sm:text-xs">
                      Próximo partido
                    </span>
                  </div>

                  {/* Rival */}

                  <div className="flex min-w-0 flex-col items-center">
                    <div className="relative h-20 w-20 sm:h-32 sm:w-32">
                      <Image
                        src={
                          nextMatch.escudo_rival
                            ? `/escudos/${nextMatch.escudo_rival}`
                            : "/logo.png"
                        }
                        alt={nextMatch.rival}
                        fill
                        sizes="128px"
                        className="object-contain"
                      />
                    </div>

                    <p className="mt-4 max-w-full truncate text-sm font-black uppercase sm:text-2xl">
                      {nextMatch.rival}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                    <CalendarDays size={17} />

                    <span className="capitalize">
                      {new Date(
                        nextMatch.fecha,
                      ).toLocaleDateString(
                        "es-MX",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        },
                      )}
                    </span>
                  </div>

                  {nextMatch.ubicacion && (
                    <div className="hidden h-4 w-px bg-zinc-700 sm:block" />
                  )}

                  {nextMatch.ubicacion && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                      <MapPin size={17} />

                      <span>
                        {nextMatch.ubicacion}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href={`/resultados/${nextMatch.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-zinc-200"
                  >
                    Ver partido
                    <ChevronRight size={18} />
                  </Link>

                  {nextMatch.ubicacion_url && (
                    <a
                      href={nextMatch.ubicacion_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
                    >
                      <MapPin size={18} />
                      Ubicación
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-zinc-700 bg-white/5 px-6 py-10">
                <p className="text-xl font-black uppercase">
                  No hay próximo partido
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  El siguiente encuentro aparecerá
                  aquí cuando sea registrado.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Números rápidos */}

        <section>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            <QuickStat
              title="Partidos"
              value={playedMatches.length}
            />

            <QuickStat
              title="Victorias"
              value={victories}
            />

            <QuickStat
              title="Goles"
              value={goalsFor}
            />

            <QuickStat
              title="Efectividad"
              value={`${effectiveness}%`}
            />
          </div>
        </section>

        {/* Resultados */}

        <section className="mt-16 sm:mt-20">
          <SectionTitle
            title="Últimos resultados"
            href="/resultados"
            linkText="Ver todos"
          />

          {recentMatches.length > 0 ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {recentMatches.map((match) => {
                const result =
                  Number(match.goles_favor) >
                  Number(match.goles_contra)
                    ? "Victoria"
                    : Number(match.goles_favor) <
                        Number(match.goles_contra)
                      ? "Derrota"
                      : "Empate";

                const resultStyle =
                  result === "Victoria"
                    ? "bg-green-600"
                    : result === "Derrota"
                      ? "bg-red-600"
                      : "bg-zinc-500";

                return (
                  <Link
                    key={match.id}
                    href={`/resultados/${match.id}`}
                    className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
                      <p className="text-xs font-bold uppercase tracking-[2px] text-zinc-500">
                        Jornada {match.id}
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black uppercase text-white ${resultStyle}`}
                      >
                        {result}
                      </span>
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-7">
                      <div className="flex flex-col items-center">
                        <div className="relative h-14 w-14">
                          <Image
                            src="/logo.png"
                            alt="Martincitas"
                            fill
                            sizes="56px"
                            className="scale-110 object-contain"
                          />
                        </div>

                        <p className="mt-2 text-center text-xs font-black uppercase">
                          Martincitas
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-3xl font-black">
                        {match.goles_favor} -{" "}
                        {match.goles_contra}
                      </p>

                      <div className="flex min-w-0 flex-col items-center">
                        <div className="relative h-14 w-14">
                          <Image
                            src={
                              match.escudo_rival
                                ? `/escudos/${match.escudo_rival}`
                                : "/logo.png"
                            }
                            alt={match.rival}
                            fill
                            sizes="56px"
                            className="object-contain"
                          />
                        </div>

                        <p className="mt-2 max-w-full truncate text-center text-xs font-black uppercase">
                          {match.rival}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-zinc-100 px-5 py-3 text-center text-xs font-medium capitalize text-zinc-500">
                      {new Date(
                        match.fecha,
                      ).toLocaleDateString(
                        "es-MX",
                        {
                          day: "numeric",
                          month: "long",
                        },
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState text="No hay resultados registrados." />
          )}
        </section>

        {/* Goleadores */}

        <section className="mt-16 sm:mt-20">
          <SectionTitle
            title="Top goleadores"
            href="/estadisticas"
            linkText="Ver estadísticas"
          />

          {topScorers.length > 0 ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              {topScorers.map(
                (player, index) => (
                  <Link
                    key={player.id}
                    href={`/plantilla/${player.slug}`}
                    className="grid grid-cols-[42px_58px_1fr_auto] items-center gap-3 border-b border-zinc-100 px-4 py-4 transition last:border-0 hover:bg-zinc-50 sm:grid-cols-[50px_68px_1fr_auto] sm:px-6"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                        index === 0
                          ? "bg-yellow-400 text-black"
                          : index === 1
                            ? "bg-zinc-400 text-white"
                            : index === 2
                              ? "bg-amber-700 text-white"
                              : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="relative h-14 w-14 overflow-hidden rounded-full bg-zinc-100 sm:h-16 sm:w-16">
                      <Image
                        src={getMvpPhoto(
                          player.nombre,
                        )}
                        alt={player.nombre}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-base font-black uppercase sm:text-lg">
                        {player.nombre}
                      </p>

                      <p className="mt-1 truncate text-xs text-zinc-500 sm:text-sm">
                        #{player.numero} ·{" "}
                        {player.posicion}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <PiSoccerBallFill
                        size={25}
                      />

                      <span className="text-3xl font-black">
                        {player.goles}
                      </span>
                    </div>
                  </Link>
                ),
              )}
            </div>
          ) : (
            <EmptyState text="Todavía no hay goleadores registrados." />
          )}
        </section>

        {/* Accesos */}

        <section className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2">
          <HomeLink
            href="/plantilla"
            title="Conoce la plantilla"
            text="Jugadores, posiciones y estadísticas individuales."
            icon={<Medal size={28} />}
          />

          <HomeLink
            href="/estadisticas"
            title="Estadísticas"
            text="Líderes individuales y números generales del club."
            icon={<Trophy size={28} />}
          />
        </section>
      </div>
    </main>
  );
}

function QuickStat({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white px-4 py-6 text-center shadow-sm sm:px-6 sm:py-7">
      <p className="text-3xl font-black sm:text-5xl">
        {value}
      </p>

      <p className="mt-2 text-[10px] font-black uppercase tracking-[2px] text-zinc-500 sm:text-xs">
        {title}
      </p>
    </article>
  );
}

function SectionTitle({
  title,
  href,
  linkText,
}: {
  title: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="text-2xl font-black uppercase tracking-tight sm:text-4xl">
        {title}
      </h2>

      <Link
        href={href}
        className="flex shrink-0 items-center gap-1 text-xs font-black uppercase tracking-wide text-zinc-500 transition hover:text-black sm:text-sm"
      >
        {linkText}
        <ChevronRight size={17} />
      </Link>
    </div>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-12 text-center text-zinc-500">
      {text}
    </div>
  );
}

function HomeLink({
  href,
  title,
  text,
  icon,
}: {
  href: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-5 rounded-2xl bg-black p-6 text-white transition hover:-translate-y-1 hover:shadow-xl sm:p-8"
    >
      <div>
        <p className="text-xl font-black uppercase sm:text-2xl">
          {title}
        </p>

        <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
          {text}
        </p>
      </div>

      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-zinc-700 transition group-hover:bg-white group-hover:text-black">
        {icon}
      </div>
    </Link>
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