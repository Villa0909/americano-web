import { getMatches } from "@/lib/matches";

import MatchCard from "@/components/matches/MatchCard";

export default async function ResultadosPage() {
  const matches = await getMatches();

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="mb-8 text-center text-4xl font-black tracking-wide sm:mb-10 sm:text-5xl">
          PARTIDOS
        </h1>

        {matches.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white py-16 text-center text-zinc-500 shadow-sm">
            No hay partidos registrados.
          </div>
        ) : (
          <>
            {/* Teléfono: tarjetas separadas */}

            <div className="space-y-4 md:hidden">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                />
              ))}
            </div>

            {/* PC: bloque completo como antes */}

            <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow md:block">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}