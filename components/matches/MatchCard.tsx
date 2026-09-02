"use client";

const TIME_ZONE = "America/Mexico_City";

import Image from "next/image";
import Link from "next/link";

import { Match } from "@/lib/matches";

interface Props {
  match: Match;
}

export default function MatchCard({
  match,
}: Props) {
  const played =
    match.goles_favor !== null &&
    match.goles_contra !== null;

  let resultColor =
    "border border-yellow-400/30 bg-[#062A63] text-yellow-400";

  if (played) {
    if (match.goles_favor > match.goles_contra) {
      resultColor =
        "bg-green-600 text-white";
    }

    if (match.goles_favor < match.goles_contra) {
      resultColor =
        "bg-red-600 text-white";
    }

    if (match.goles_favor === match.goles_contra) {
      resultColor =
        "bg-[#17447D] text-yellow-400";
    }
  }

  const date = new Date(match.fecha);

  const formattedDate =
    date.toLocaleDateString("es-MX", {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: TIME_ZONE,
    });

  const rivalShield = match.escudo_rival
    ? `/escudos/${match.escudo_rival}`
    : "/logo.png";

  return (
    <Link
      href={`/resultados/${match.id}`}
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        border
        border-[#17447D]
        bg-[#0B3B82]
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:border-yellow-400
        hover:shadow-lg
        active:scale-[0.99]
        md:rounded-none
        md:border-0
        md:border-b
        md:border-[#17447D]
        md:shadow-none
        md:hover:bg-[#104A9D]
        md:last:border-b-0
      "
    >
      <article className="px-4 py-5 sm:px-6 sm:py-6">

        {/* FECHA */}

        <p className="mb-5 text-center text-sm capitalize text-blue-200 md:mb-6 md:text-left">
          {formattedDate}
        </p>

        {/* DISEÑO MÓVIL */}

        <div className="md:hidden">

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">

            {/* CABALLEROS */}

            <div className="flex min-w-0 flex-col items-center text-center">

              <div className="relative h-16 w-16">

                <Image
                  src="/logo.png"
                  alt="Caballeros"
                  fill
                  sizes="64px"
                  className="scale-125 object-contain"
                />

              </div>

              <span className="mt-2 w-full truncate text-sm font-black uppercase text-white">
                CABALLEROS
              </span>

            </div>

            {/* RESULTADO */}

            <div
              className={`flex min-h-12 min-w-[84px] items-center justify-center rounded-xl px-3 text-center text-lg font-black ${resultColor}`}
            >

              {played ? (
                <>
                  {match.goles_favor} -{" "}
                  {match.goles_contra}
                </>
              ) : (
                new Date(
                  match.fecha,
                ).toLocaleTimeString(
                  "es-MX",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: TIME_ZONE,
                  },
                )
              )}

            </div>

            {/* RIVAL */}

            <div className="flex min-w-0 flex-col items-center text-center">

              <div className="relative h-14 w-14">

                <Image
                  src={rivalShield}
                  alt={match.rival}
                  fill
                  sizes="56px"
                  className="object-contain"
                />

              </div>

              <span className="mt-2 w-full truncate text-sm font-black uppercase text-white">
                {match.rival}
              </span>

            </div>

          </div>

          <p className="mt-5 border-t border-blue-700 pt-4 text-center text-xs font-black uppercase tracking-[2px] text-blue-200">
            {match.torneo || "Sin torneo"}
          </p>

        </div>

        {/* DISEÑO PC */}

        <div className="hidden md:block">

          <div className="grid grid-cols-[1fr_auto_1fr] items-center">

            {/* CABALLEROS */}

            <div className="flex items-center justify-end gap-4">

              <span className="font-black uppercase text-white">
                CABALLEROS
              </span>

              <div className="relative h-12 w-12">

                <Image
                  src="/logo.png"
                  alt="Caballeros"
                  fill
                  className="scale-125 object-contain"
                />

              </div>

            </div>

            {/* RESULTADO */}

            <div
              className={`mx-8 flex h-12 min-w-[92px] items-center justify-center rounded-xl px-3 text-xl font-black ${resultColor}`}
            >

              {played ? (
                <>
                  {match.goles_favor} -{" "}
                  {match.goles_contra}
                </>
              ) : (
                new Date(
                  match.fecha,
                ).toLocaleTimeString(
                  "es-MX",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: TIME_ZONE,
                  },
                )
              )}

            </div>

            {/* RIVAL */}

            <div className="flex items-center gap-4">

              <Image
                src={rivalShield}
                alt={match.rival}
                width={42}
                height={42}
                className="h-10 w-10 object-contain"
              />

              <span className="font-black uppercase text-white">
                {match.rival}
              </span>

            </div>

          </div>

          <p className="mt-6 text-right text-sm font-semibold text-blue-200">
            {match.torneo || "Sin torneo"}
          </p>

        </div>

      </article>
    </Link>
  );
}