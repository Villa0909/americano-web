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
  player: Omit<Player, "id" | "goles" | "asistencias" | "partidos">
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
export async function refreshPlayerStats(
  playerId: string
) {
  const { data: stats, error } = await supabase
    .from("player_match_stats")
    .select("*")
    .eq("player_id", playerId);

  if (error) throw error;

  const goles = stats.reduce(
    (sum, s) => sum + s.goles,
    0
  );

  const asistencias = stats.reduce(
    (sum, s) => sum + s.asistencias,
    0
  );

  const partidos = stats.filter(
    (s) => s.jugo
  ).length;

  const { error: updateError } =
    await supabase
      .from("players")
      .update({
        goles,
        asistencias,
        partidos,
      })
      .eq("id", playerId);

  if (updateError) throw updateError;
}