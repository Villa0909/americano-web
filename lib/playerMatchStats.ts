import { supabase } from "./supabase";

export interface PlayerMatchStat {
  id: number;
  match_id: number;
  player_id: string;
  jugo: boolean;
  goles: number;
  asistencias: number;
  amarillas: number;
  rojas: number;
  mvp: boolean;
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

export async function getStatsByMatch(
  matchId: number
) {
  const { data, error } = await supabase
    .from("player_match_stats")
    .select("*")
    .eq("match_id", matchId);

  if (error) throw error;

  return data;
}

import { getPlayers } from "./players";

export async function getMatchDetails(
  matchId: number
) {
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
    };
  });
}