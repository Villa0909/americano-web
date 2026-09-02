import { supabase } from "./supabase";
import { getPlayers } from "./players";

export interface PlayerMatchStat {
  id: number;
  match_id: number;
  player_id: string;
  jugo: boolean;

  recepciones: number;
  yardas: number;
  touchdowns: number;

  pases_completos: number;
  yardas_pase: number;
  touchdowns_pase: number;
  touchdowns_carrera: number;

  tackles: number;
  intercepciones: number;
  sacks: number;
  touchdowns_defensivos: number;
}

export async function createPlayerMatchStat(
  stat: Omit<PlayerMatchStat, "id">
) {
  const { data, error } = await supabase
    .from("player_match_stats")
    .insert(stat)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updatePlayerMatchStat(
  id: number,
  stat: Partial<Omit<PlayerMatchStat, "id">>
) {
  const { data, error } = await supabase
    .from("player_match_stats")
    .update(stat)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getStatsByMatch(matchId: number) {
  const { data, error } = await supabase
    .from("player_match_stats")
    .select("*")
    .eq("match_id", matchId);

  if (error) throw error;

  return data as PlayerMatchStat[];
}

export async function getMatchDetails(matchId: number) {
  const [stats, players] = await Promise.all([
    getStatsByMatch(matchId),
    getPlayers(),
  ]);

  return stats.map((stat) => {
    const player = players.find(
      (p) => p.id === stat.player_id
    );

    return {
      ...stat,
      nombre: player?.nombre ?? "Jugador",
      posicion: player?.posicion ?? null,
    };
  });
}