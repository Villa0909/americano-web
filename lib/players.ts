import { supabase } from "./supabase";
import { Player } from "@/types/player";

export async function getPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("numero");

  if (error) throw error;

  return data as Player[];
}

export async function getPlayer(id: string) {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Player;
}

export async function getPlayerBySlug(slug: string) {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data as Player;
}

export async function createPlayer(
  player: Omit<
    Player,
    | "id"
    | "recepciones"
    | "yardas"
    | "touchdowns"
    | "pases_completos"
    | "yardas_pase"
    | "touchdowns_pase"
    | "touchdowns_carrera"
    | "tackles"
    | "intercepciones"
    | "sacks"
    | "touchdowns_defensivos"
  >
) {
  const { data, error } = await supabase
    .from("players")
    .insert(player)
    .select()
    .single();

  if (error) throw error;

  return data as Player;
}

export async function updatePlayer(
  id: string,
  player: Partial<Player>
) {
  const { data, error } = await supabase
    .from("players")
    .update(player)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Player;
}

export async function deletePlayer(id: string) {
  const { error } = await supabase
    .from("players")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function refreshPlayerStats(playerId: string) {
  const { data, error } = await supabase
    .from("player_match_stats")
    .select(`
      jugo,
      recepciones,
      yardas,
      touchdowns,
      pases_completos,
      yardas_pase,
      touchdowns_pase,
      touchdowns_carrera,
      tackles,
      intercepciones,
      sacks,
      touchdowns_defensivos
    `)
    .eq("player_id", playerId);

  if (error) throw error;

  const stats = data ?? [];

  const totals = stats.reduce(
    (total, stat) => ({
      recepciones:
        total.recepciones + (stat.recepciones ?? 0),

      yardas:
        total.yardas + (stat.yardas ?? 0),

      touchdowns:
        total.touchdowns + (stat.touchdowns ?? 0),

      pases_completos:
        total.pases_completos +
        (stat.pases_completos ?? 0),

      yardas_pase:
        total.yardas_pase +
        (stat.yardas_pase ?? 0),

      touchdowns_pase:
        total.touchdowns_pase +
        (stat.touchdowns_pase ?? 0),

      touchdowns_carrera:
        total.touchdowns_carrera +
        (stat.touchdowns_carrera ?? 0),

      tackles:
        total.tackles + (stat.tackles ?? 0),

      intercepciones:
        total.intercepciones +
        (stat.intercepciones ?? 0),

      sacks:
        total.sacks + (stat.sacks ?? 0),

      touchdowns_defensivos:
        total.touchdowns_defensivos +
        (stat.touchdowns_defensivos ?? 0),
    }),
    {
      recepciones: 0,
      yardas: 0,
      touchdowns: 0,
      pases_completos: 0,
      yardas_pase: 0,
      touchdowns_pase: 0,
      touchdowns_carrera: 0,
      tackles: 0,
      intercepciones: 0,
      sacks: 0,
      touchdowns_defensivos: 0,
    }
  );

  const { data: updatedPlayer, error: updateError } =
    await supabase
      .from("players")
      .update(totals)
      .eq("id", playerId)
      .select()
      .single();

  if (updateError) throw updateError;

  return updatedPlayer as Player;
}