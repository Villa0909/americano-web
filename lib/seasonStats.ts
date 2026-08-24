import { supabase } from "./supabase";

/* =========================================================
   TIPOS
========================================================= */

export interface SeasonStats {
  id: number;

  temporada: string;

  puntos: number;
  posicion: number | null;

  victorias: number;
  empates: number;
  derrotas: number;

  fase_copa: string | null;

  victorias_copa: number;
  empates_copa: number;
  derrotas_copa: number;

  actual: boolean;

  created_at: string;
}

export interface SeasonPlayerStats {
  id: number;

  season_id: number;

  nombre: string;

  partidos: number;
  goles: number;

  jugador_actual: boolean;

  created_at: string;
}

/* =========================================================
   TEMPORADAS
========================================================= */

export async function getSeasonStats() {
  const { data, error } = await supabase
    .from("season_stats")
    .select("*")
    .order("id", {
      ascending: true,
    });

  if (error) throw error;

  return data as SeasonStats[];
}

/* =========================================================
   UNA TEMPORADA
========================================================= */

export async function getSeasonStatsById(
  id: number
) {
  const { data, error } = await supabase
    .from("season_stats")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as SeasonStats;
}

/* =========================================================
   JUGADORES DE UNA TEMPORADA
========================================================= */

export async function getSeasonPlayerStats(
  seasonId: number
) {
  const { data, error } = await supabase
    .from("season_player_stats")
    .select("*")
    .eq("season_id", seasonId)
    .order("goles", {
      ascending: false,
    });

  if (error) throw error;

  return data as SeasonPlayerStats[];
}

/* =========================================================
   CREAR TEMPORADA
========================================================= */

export async function createSeasonStats(
  season: Omit<
    SeasonStats,
    "id" | "created_at"
  >
) {
  const { data, error } = await supabase
    .from("season_stats")
    .insert(season)
    .select()
    .single();

  if (error) throw error;

  return data as SeasonStats;
}

/* =========================================================
   ACTUALIZAR TEMPORADA
========================================================= */

export async function updateSeasonStats(
  id: number,
  season: Partial<
    Omit<
      SeasonStats,
      "id" | "created_at"
    >
  >
) {
  const { data, error } = await supabase
    .from("season_stats")
    .update(season)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as SeasonStats;
}

/* =========================================================
   ELIMINAR TEMPORADA
========================================================= */

export async function deleteSeasonStats(
  id: number
) {
  const { error } = await supabase
    .from("season_stats")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* =========================================================
   CREAR ESTADÍSTICA DE JUGADOR
========================================================= */

export async function createSeasonPlayerStats(
  player: Omit<
    SeasonPlayerStats,
    "id" | "created_at"
  >
) {
  const { data, error } = await supabase
    .from("season_player_stats")
    .insert(player)
    .select()
    .single();

  if (error) throw error;

  return data as SeasonPlayerStats;
}

/* =========================================================
   CREAR VARIOS JUGADORES
========================================================= */

export async function createSeasonPlayerStatsBulk(
  players: Omit<
    SeasonPlayerStats,
    "id" | "created_at"
  >[]
) {
  const { data, error } = await supabase
    .from("season_player_stats")
    .insert(players)
    .select();

  if (error) throw error;

  return data as SeasonPlayerStats[];
}

/* =========================================================
   ACTUALIZAR JUGADOR
========================================================= */

export async function updateSeasonPlayerStats(
  id: number,
  player: Partial<
    Omit<
      SeasonPlayerStats,
      "id" | "created_at"
    >
  >
) {
  const { data, error } = await supabase
    .from("season_player_stats")
    .update(player)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as SeasonPlayerStats;
}

/* =========================================================
   ELIMINAR JUGADOR DE UNA TEMPORADA
========================================================= */

export async function deleteSeasonPlayerStats(
  id: number
) {
  const { error } = await supabase
    .from("season_player_stats")
    .delete()
    .eq("id", id);
}

/* =========================================================
   RÉCORDS HISTÓRICOS
========================================================= */

export interface HistoricalRecords {
  mejorPosicion: SeasonStats | null;

  masPuntos: SeasonStats | null;

  masVictorias: SeasonStats | null;

  masGoles: SeasonPlayerStats | null;
}

/* =========================================================
   OBTENER RÉCORDS
========================================================= */

export async function getHistoricalRecords(): Promise<HistoricalRecords> {
  const seasons = await getSeasonStats();

  let allPlayers: SeasonPlayerStats[] = [];

  for (const season of seasons) {
    const players =
      await getSeasonPlayerStats(
        season.id
      );

    allPlayers = [
      ...allPlayers,
      ...players,
    ];
  }

  const temporadasConPosicion =
    seasons.filter(
      (season) =>
        season.posicion !== null
    );

  const mejorPosicion =
    temporadasConPosicion.length > 0
      ? temporadasConPosicion.reduce(
          (best, current) =>
            current.posicion! <
            best.posicion!
              ? current
              : best
        )
      : null;

  const masPuntos =
    seasons.length > 0
      ? seasons.reduce(
          (best, current) =>
            current.puntos >
            best.puntos
              ? current
              : best
        )
      : null;

  const masVictorias =
    seasons.length > 0
      ? seasons.reduce(
          (best, current) =>
            current.victorias >
            best.victorias
              ? current
              : best
        )
      : null;

  const masGoles =
    allPlayers.length > 0
      ? allPlayers.reduce(
          (best, current) =>
            current.goles >
            best.goles
              ? current
              : best
        )
      : null;

  return {
    mejorPosicion,
    masPuntos,
    masVictorias,
    masGoles,
  };
}