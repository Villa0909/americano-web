import PlayerCard from "@/components/shares/templates/PlayerCard";
import { supabase } from "@/lib/supabase";

export default async function Page() {
  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("slug", "luis") // cambia el slug para probar otro jugador
    .single();

  if (error || !player) {
    return (
      <div className="p-10 text-white">
        No se encontró el jugador.
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-zinc-800 py-10">
      <PlayerCard
        nombre={player.nombre}
        numero={player.numero}
        foto={`/players/${player.slug}.png`}
        posicion={player.posicion}
        partidos={player.partidos}
        goles={player.goles}
        asistencias={player.asistencias}
        mvps={player.mvps ?? 0}
      />
    </div>
  );
}