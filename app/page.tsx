import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  ChevronRight,
  MapPin,
  Medal,
  Shield,
  Trophy,
} from "lucide-react";

import { getMatches } from "@/lib/matches";
import { getPlayers } from "@/lib/players";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TIME_ZONE = "America/Mexico_City";

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
        new Date(match.fecha).getTime() >=
          now.getTime(),
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

  const pointsFor = playedMatches.reduce(
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

  const topPlayers = [...players]
    .sort(
      (a, b) =>
        getPlayerImpact(b) -
        getPlayerImpact(a),
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#062A63] text-white">

      {/* HERO / PRÓXIMO PARTIDO */}

      <section className="relative overflow-hidden bg-[#031B42]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,214,0,0.04)_0px,rgba(255,214,0,0.04)_2px,transparent_2px,transparent_18px)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl text-center">

            <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
  <Image
    src="/logo.png"
    alt="Caballeros"
    width={144}
    height={144}
    priority
    className="object-contain"
  />
</div>

            <p className="text-xs font-black uppercase tracking-[4px] text-yellow-300 sm:text-sm">
              Sitio oficial
            </p>

            <h1 className="mt-3 text-5xl font-black uppercase tracking-tight text-yellow-400 sm:text-7xl lg:text-8xl">
              Caballeros
            </h1>

            <p className="mt-3 text-sm font-bold uppercase tracking-[3px] text-blue-200 sm:text-base">
              Fútbol Americano
            </p>

            <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-yellow-400" />

            {nextMatch ? (
              <>
                <p className="mt-10 text-xs font-black uppercase tracking-[4px] text-yellow-300 sm:text-sm">
                  Próximo partido
                </p>

                <p className="mt-3 text-sm font-bold uppercase tracking-[2px] text-blue-100">
                  Jornada {nextMatch.jornada ??
                    nextMatch.id}{" "}
                  ·{" "}
                  {nextMatch.torneo ||
                    "Sin torneo"}
                </p>

                <div className="mx-auto mt-9 grid max-w-4xl grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-8">

                  {/* CABALLEROS */}

                  <div className="flex min-w-0 flex-col items-center">
                    <div className="relative h-20 w-20 sm:h-32 sm:w-32">
                      <Image
                        src="/logo.png"
                        alt="Caballeros"
                        fill
                        priority
                        sizes="128px"
                        className="scale-110 object-contain"
                      />
                    </div>

                    <p className="mt-4 max-w-full truncate text-sm font-black uppercase text-white sm:text-2xl">
                      Caballeros
                    </p>
                  </div>

                  {/* HORA */}

                  <div className="flex min-w-[100px] flex-col items-center sm:min-w-[180px]">
                    <p className="whitespace-nowrap text-3xl font-black text-yellow-400 sm:text-5xl">
                      {new Date(
                        nextMatch.fecha,
                      ).toLocaleTimeString(
                        "es-MX",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          timeZone:
                            TIME_ZONE,
                        },
                      )}
                    </p>

                    <span className="mt-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[1px] text-yellow-200 sm:text-xs">
                      Próximo partido
                    </span>
                  </div>

                  {/* RIVAL */}

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

                    <p className="mt-4 max-w-full truncate text-sm font-black uppercase text-white sm:text-2xl">
                      {nextMatch.rival}
                    </p>
                  </div>
                </div>

                {/* FECHA Y UBICACIÓN */}

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                    <CalendarDays size={17} />

                    <span className="capitalize">
                      {new Date(
                        nextMatch.fecha,
                      ).toLocaleDateString(
                        "es-MX",
                        {
                          weekday:
                            "long",
                          day: "numeric",
                          month: "long",
                          timeZone:
                            TIME_ZONE,
                        },
                      )}
                    </span>
                  </div>

                  {nextMatch.ubicacion && (
                    <div className="hidden h-4 w-px bg-blue-700 sm:block" />
                  )}

                  {nextMatch.ubicacion && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                      <MapPin size={17} />

                      <span>
                        {
                          nextMatch.ubicacion
                        }
                      </span>
                    </div>
                  )}
                </div>

                {/* BOTONES */}

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                  <Link
                    href={`/resultados/${nextMatch.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-black uppercase tracking-wide text-[#031B42] transition hover:bg-yellow-300"
                  >
                    Ver partido
                    <ChevronRight
                      size={18}
                    />
                  </Link>

                  {nextMatch.ubicacion_url && (
                    <a
                      href={
                        nextMatch.ubicacion_url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-yellow-400/50 px-6 py-3 text-sm font-black uppercase tracking-wide text-yellow-300 transition hover:bg-yellow-400/10"
                    >
                      <MapPin size={18} />
                      Ubicación
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-blue-700 bg-blue-900/40 px-6 py-10">
                <Shield
                  size={38}
                  className="mx-auto text-yellow-400"
                />

                <p className="mt-4 text-xl font-black uppercase text-yellow-400">
                  No hay próximo partido
                </p>

                <p className="mt-2 text-sm text-blue-200">
                  El siguiente encuentro
                  aparecerá aquí cuando
                  sea registrado.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        {/* NÚMEROS RÁPIDOS */}

        <section>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">

            <QuickStat
              title="Partidos"
              value={
                playedMatches.length
              }
            />

            <QuickStat
              title="Victorias"
              value={victories}
            />

            <QuickStat
              title="Puntos"
              value={pointsFor}
            />

            <QuickStat
              title="Efectividad"
              value={`${effectiveness}%`}
            />

          </div>
        </section>

        {/* RESULTADOS */}

        <section className="mt-16 sm:mt-20">

          <SectionTitle
            title="Últimos partidos"
            href="/resultados"
            linkText="Ver todos"
          />

          {recentMatches.length > 0 ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-3">

              {recentMatches.map(
                (match) => {

                  const result =
                    Number(
                      match.goles_favor,
                    ) >
                    Number(
                      match.goles_contra,
                    )
                      ? "Victoria"
                      : Number(
                            match.goles_favor,
                          ) <
                          Number(
                            match.goles_contra,
                          )
                        ? "Derrota"
                        : "Empate";

                  const resultStyle =
                    result === "Victoria"
                      ? "bg-green-600"
                      : result ===
                          "Derrota"
                        ? "bg-red-600"
                        : "bg-zinc-500";

                  return (
                    <Link
                      key={match.id}
                      href={`/resultados/${match.id}`}
                      className="group overflow-hidden rounded-2xl border border-blue-700 bg-[#0B3B82] shadow-sm transition hover:-translate-y-1 hover:border-yellow-400 hover:shadow-lg"
                    >

                      <div className="flex items-center justify-between border-b border-blue-700 px-5 py-4">

                        <p className="text-xs font-bold uppercase tracking-[2px] text-blue-200">
                          Jornada{" "}
                          {match.jornada ??
                            match.id}
                        </p>

                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-black uppercase text-white ${resultStyle}`}
                        >
                          {result}
                        </span>

                      </div>

                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-7">

                        {/* CABALLEROS */}

                        <div className="flex flex-col items-center">

                          <div className="relative h-14 w-14">
                            <Image
                              src="/logo.png"
                              alt="Caballeros"
                              fill
                              sizes="56px"
                              className="scale-110 object-contain"
                            />
                          </div>

                          <p className="mt-2 text-center text-xs font-black uppercase text-white">
                            Caballeros
                          </p>

                        </div>

                        {/* MARCADOR */}

                        <p className="whitespace-nowrap text-3xl font-black text-yellow-400">
                          {
                            match.goles_favor
                          }{" "}
                          -{" "}
                          {
                            match.goles_contra
                          }
                        </p>

                        {/* RIVAL */}

                        <div className="flex min-w-0 flex-col items-center">

                          <div className="relative h-14 w-14">
                            <Image
                              src={
                                match.escudo_rival
                                  ? `/escudos/${match.escudo_rival}`
                                  : "/logo.png"
                              }
                              alt={
                                match.rival
                              }
                              fill
                              sizes="56px"
                              className="object-contain"
                            />
                          </div>

                          <p className="mt-2 max-w-full truncate text-center text-xs font-black uppercase text-white">
                            {
                              match.rival
                            }
                          </p>

                        </div>

                      </div>

                      <div className="border-t border-blue-700 px-5 py-3 text-center text-xs font-medium capitalize text-blue-200">
                        {new Date(
                          match.fecha,
                        ).toLocaleDateString(
                          "es-MX",
                          {
                            day: "numeric",
                            month: "long",
                            timeZone:
                              TIME_ZONE,
                          },
                        )}
                      </div>

                    </Link>
                  );
                },
              )}

            </div>
          ) : (
            <EmptyState text="No hay partidos registrados." />
          )}
        </section>

        {/* LÍDERES DEL EQUIPO */}

        <section className="mt-16 sm:mt-20">

          <SectionTitle
            title="Líderes del equipo"
            href="/estadisticas"
            linkText="Ver estadísticas"
          />

          {topPlayers.length > 0 ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-blue-700 bg-[#0B3B82] shadow-sm">

              {topPlayers.map(
                (player, index) => (
                  <Link
                    key={player.id}
                    href={`/plantilla/${player.slug}`}
                    className="grid grid-cols-[42px_58px_1fr_auto] items-center gap-3 border-b border-blue-700 px-4 py-4 transition last:border-0 hover:bg-[#104A9D] sm:grid-cols-[50px_68px_1fr_auto] sm:px-6"
                  >

                    {/* POSICIÓN */}

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                        index === 0
                          ? "bg-yellow-400 text-[#031B42]"
                          : index === 1
                            ? "bg-blue-300 text-[#031B42]"
                            : index === 2
                              ? "bg-yellow-700 text-white"
                              : "bg-blue-800 text-blue-200"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* FOTO */}

                    <div className="relative h-14 w-14 overflow-hidden rounded-full bg-blue-900 sm:h-16 sm:w-16">
                      <Image
                        src={getPlayerPhoto(
                          player.nombre,
                        )}
                        alt={
                          player.nombre
                        }
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* INFORMACIÓN */}

                    <div className="min-w-0">

                      <p className="truncate text-base font-black uppercase text-white sm:text-lg">
                        {
                          player.nombre
                        }
                      </p>

                      <p className="mt-1 truncate text-xs text-blue-200 sm:text-sm">
                        #
                        {
                          player.numero
                        }{" "}
                        ·{" "}
                        {
                          player.posicion
                        }
                      </p>

                    </div>

                    {/* ESTADÍSTICA PRINCIPAL */}

                    <div className="text-right">

                      <p className="text-2xl font-black text-yellow-400">
                        {
                          getPlayerImpact(
                            player,
                          )
                        }
                      </p>

                      <p className="text-[9px] font-bold uppercase tracking-wide text-blue-200">
                        IMPACTO
                      </p>

                    </div>

                  </Link>
                ),
              )}

            </div>
          ) : (
            <EmptyState text="Todavía no hay estadísticas registradas." />
          )}
        </section>

        {/* ACCESOS */}

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
            text="Líderes individuales y números generales de Caballeros."
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
    <article className="rounded-2xl border border-blue-700 bg-[#0B3B82] px-4 py-6 text-center shadow-sm transition hover:border-yellow-400 sm:px-6 sm:py-7">

      <p className="text-3xl font-black text-yellow-400 sm:text-5xl">
        {value}
      </p>

      <p className="mt-2 text-[10px] font-black uppercase tracking-[2px] text-blue-200 sm:text-xs">
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

      <h2 className="text-2xl font-black uppercase tracking-tight text-yellow-400 sm:text-4xl">
        {title}
      </h2>

      <Link
        href={href}
        className="flex shrink-0 items-center gap-1 text-xs font-black uppercase tracking-wide text-blue-200 transition hover:text-yellow-400 sm:text-sm"
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
    <div className="mt-6 rounded-2xl border border-blue-700 bg-[#0B3B82] px-6 py-12 text-center text-blue-200">
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
      className="group flex items-center justify-between gap-5 rounded-2xl bg-yellow-400 p-6 text-[#031B42] transition hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-xl sm:p-8"
    >

      <div>

        <p className="text-xl font-black uppercase sm:text-2xl">
          {title}
        </p>

        <p className="mt-2 max-w-sm text-sm leading-6 text-[#17447D]">
          {text}
        </p>

      </div>

      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#17447D] transition group-hover:bg-[#031B42] group-hover:text-yellow-400">
        {icon}
      </div>

    </Link>
  );
}

function getPlayerImpact(player: any) {
  const position = player.posicion;

  if (
    position === "Receptor" ||
    position === "Corredor"
  ) {
    return (
      Number(player.touchdowns ?? 0) * 10 +
      Number(player.yardas ?? 0) +
      Number(player.recepciones ?? 0) * 2
    );
  }

  if (position === "Quarterback") {
    return (
      Number(
        player.touchdowns_pase ?? 0,
      ) * 10 +
      Number(
        player.touchdowns_carrera ?? 0,
      ) * 10 +
      Number(
        player.pases_completos ?? 0,
      ) * 2 +
      Number(player.yardas_pase ?? 0)
    );
  }

  if (position === "D-Line") {
    return (
      Number(player.sacks ?? 0) * 10 +
      Number(player.tackles ?? 0)
    );
  }

  return (
    Number(player.tackles ?? 0) +
    Number(
      player.intercepciones ?? 0,
    ) * 10 +
    Number(player.sacks ?? 0) * 10 +
    Number(
      player.touchdowns_defensivos ?? 0,
    ) * 10
  );
}

function getPlayerPhoto(nombre: string) {
  const fileName = nombre
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return `/mvp/${fileName}-mvp-v2.png`;
}