import Image from "next/image";

import PlantillaTabs from "@/components/plantilla/PlantillaTabs";
import { getPlayers } from "@/lib/players";

export default async function PlantillaPage() {
  const players = await getPlayers();

  const totalPlayers = players?.length ?? 0;

  return (
    <main className="min-h-screen bg-[#062A63] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

        {/* ENCABEZADO */}
        <section className="mb-10 sm:mb-14">
          <div className="relative overflow-hidden rounded-3xl border border-yellow-400/30 bg-[#0B3B82] px-5 py-7 shadow-xl sm:px-8 sm:py-9">

            {/* DETALLE DECORATIVO */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-400/10" />
            <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-yellow-400/5" />

            <div className="relative flex items-center gap-5 sm:gap-7">

              {/* LOGO */}
              <div className="relative h-24 w-24 shrink-0 sm:h-32 sm:w-32">
                <Image
                  src="/logo.png"
                  alt="Caballeros"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* INFORMACIÓN */}
              <div className="min-w-0">
                <p className="mb-1 text-xs font-black uppercase tracking-[3px] text-yellow-400 sm:text-sm">
                  Caballeros
                </p>

                <h1 className="text-4xl font-black tracking-wide text-yellow-400 sm:text-5xl lg:text-6xl">
                  PLANTILLA
                </h1>

                <p className="mt-2 text-sm font-semibold text-blue-100 sm:text-base">
                  Temporada 2026
                </p>

                <div className="mt-3 inline-flex items-center rounded-full bg-yellow-400 px-3 py-1">
                  <span className="text-xs font-black uppercase tracking-[1px] text-[#062A63] sm:text-sm">
                    {totalPlayers} jugador
                    {totalPlayers !== 1 ? "es" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PlantillaTabs players={players ?? []} />
      </div>
    </main>
  );
}