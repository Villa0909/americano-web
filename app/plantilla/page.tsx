import Image from "next/image";

import PlantillaTabs from "@/components/plantilla/PlantillaTabs";
import { getPlayers } from "@/lib/players";

type PositionId =
  | "porteros"
  | "defensas"
  | "mediocampistas"
  | "delanteros";

interface Props {
  searchParams: Promise<{
    posicion?: string;
  }>;
}

export default async function PlantillaPage({
  searchParams,
}: Props) {
  const players = await getPlayers();
  const { posicion } = await searchParams;

  const validPositions: PositionId[] = [
    "porteros",
    "defensas",
    "mediocampistas",
    "delanteros",
  ];

  const initialPosition: PositionId =
    validPositions.includes(posicion as PositionId)
      ? (posicion as PositionId)
      : "porteros";

  const porteros =
    players?.filter(
      (player) => player.posicion === "Portero",
    ) ?? [];

  const defensas =
    players?.filter(
      (player) => player.posicion === "Defensa",
    ) ?? [];

  const mediocampistas =
    players?.filter(
      (player) =>
        player.posicion === "Mediocampista",
    ) ?? [];

  const delanteros =
    players?.filter(
      (player) => player.posicion === "Delantero",
    ) ?? [];

  const totalPlayers = players?.length ?? 0;

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <section className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
              <Image
                src="/logo.png"
                alt="Martincitas"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-4xl font-black tracking-wide sm:text-5xl lg:text-6xl">
                PLANTILLA
              </h1>

              <p className="mt-1 text-sm text-zinc-500 sm:mt-2 sm:text-lg">
                Temporada 2026
              </p>

              <p className="text-sm text-zinc-500 sm:text-base">
                {totalPlayers} jugador
                {totalPlayers !== 1 ? "es" : ""}
              </p>
            </div>
          </div>
        </section>

        <PlantillaTabs
          porteros={porteros}
          defensas={defensas}
          mediocampistas={mediocampistas}
          delanteros={delanteros}
        />
      </div>
    </main>
  );
}