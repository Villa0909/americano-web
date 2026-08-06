import { supabase } from "./supabase";

export interface Match {
  id: number;
  rival: string;
  fecha: string;
  torneo: string | null;
  goles_favor: number;
  goles_contra: number;
  local: boolean;
  resultado: string | null;
  escudo_rival: string | null;
  created_at: string;
}

export async function getMatches() {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("fecha", {
      ascending: false,
    });

  if (error) throw error;

  return data as Match[];
}

export async function createMatch(match: {
  rival: string;
  fecha: string;
  torneo: string;
  goles_favor: number;
  goles_contra: number;
  local: boolean;
  resultado: string;
  escudo_rival: string;
}) {
  const { data, error } = await supabase
    .from("matches")
    .insert(match)
    .select()
    .single();

  if (error) throw error;

  return data as Match;
}

export async function updateMatch(
  id: number,
  match: Partial<Match>
) {
  const { data, error } = await supabase
    .from("matches")
    .update(match)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Match;
}

export async function deleteMatch(id: number) {
  const { error } = await supabase
    .from("matches")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
export async function getMatch(
  id: number
) {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Match;
}