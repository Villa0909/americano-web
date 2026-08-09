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
    "border border-zinc-300 bg-white text-black";

  if (played) {
    if (match.goles_favor > match.goles_contra) {
      resultColor = "bg-green-600 text-white";
    }

    if (match.goles_favor < match.goles_contra) {
      resultColor = "bg-red-600 text-white";
    }

    if (match.goles_favor === match.goles_contra) {
      resultColor = "bg-zinc-500 text-white";
    }
  }

  const date = new Date(match.fecha);

  const formattedDate = date.toLocaleDateString("es-MX", {
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
        block
        overflow-hidden
        rounded-2xl
        border
        border-zinc-200
        bg-white
        shadow-sm
        transition
        active:scale-[0.99]
        md:rounded-none
        md:border-0
        md:border-b
        md:shadow-none
        md:hover:bg-zinc-50
        md:last:border-b-0
      "
    >
      <article className="px-4 py-5 sm:px-6 sm:py-6">
        {/* Fecha */}

        <p className="mb-5 text-center text-sm capitalize text-zinc-500 md:mb-6 md:text-left">
          {formattedDate}
        </p>

        {/* Diseño móvil */}

        <div className="md:hidden">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            {/* Martincitas */}

            <div className="flex min-w-0 flex-col items-center text-center">
              <div className="relative h-16 w-16">
  <Image
    src="/logo.png"
    alt="Martincitas"
    fill
    sizes="64px"
    className="object-contain scale-120"
  />
</div>

              <span className="mt-2 w-full truncate text-sm font-bold">
                MARTINCITAS
              </span>
            </div>

            {/* Resultado */}

            <div
              className={`flex min-h-12 min-w-[84px] items-center justify-center rounded-xl px-3 text-center text-lg font-black ${resultColor}`}
            >
              {played ? (
  <>
    {match.goles_favor} - {match.goles_contra}
  </>
) : (
  new Date(match.fecha).toLocaleTimeString("es-MX", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
})
)}
            </div>

            {/* Rival */}

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

              <span className="mt-2 w-full truncate text-sm font-bold">
                {match.rival}
              </span>
            </div>
          </div>

          <p className="mt-5 border-t border-zinc-100 pt-4 text-center text-xs font-medium uppercase tracking-[2px] text-zinc-500">
            {match.torneo}
          </p>
        </div>

        {/* Diseño PC */}

        <div className="hidden md:block">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            {/* Martincitas */}

            <div className="flex items-center justify-end gap-3">
              <span className="font-semibold">
                MARTINCITAS
              </span>

              <div className="relative h-11 w-11">
  <Image
    src="/logo.png"
    alt="Martincitas"
    fill
    className="object-contain scale-155"
  />
</div>
            </div>

            {/* Resultado */}

            <div
              className={`mx-8 flex h-12 min-w-[92px] items-center justify-center rounded-xl px-3 text-xl font-black ${resultColor}`}
            >
              {played ? (
  <>
    {match.goles_favor} - {match.goles_contra}
  </>
) : (
 new Date(match.fecha).toLocaleTimeString("es-MX", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
})
)}
            </div>

            {/* Rival */}

            <div className="flex items-center gap-3">
              <Image
                src={rivalShield}
                alt={match.rival}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />

              <span className="font-semibold">
                {match.rival}
              </span>
            </div>
          </div>

          <p className="mt-6 text-right text-sm text-zinc-500">
            {match.torneo}
          </p>
        </div>
      </article>
    </Link>
  );
}