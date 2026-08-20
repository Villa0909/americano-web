import { supabase } from "./supabase";

export interface Team {
  id: number;
  nombre: string;
  escudo: string | null;
  created_at: string;
}

export interface StandingMatch {
  id: number;
  jornada: number;

  equipo_local_id: number | null;
  equipo_visitante_id: number | null;

  goles_local: number;
  goles_visitante: number;

  created_at: string;
}

export interface StandingRow {
  team: Team;

  jj: number;
  ganados: number;
  empatados: number;
  perdidos: number;

  gf: number;
  gc: number;

  dg: number;
  puntos: number;
}

/* =========================================================
   TABLA HISTÓRICA
========================================================= */

export async function getStandingMatchesByJornada(
  jornada: number
) {
  const { data, error } = await supabase
    .from("standings_matches")
    .select("*")
    .lte("jornada", jornada)
    .order("jornada", {
      ascending: true,
    })
    .order("id", {
      ascending: true,
    });

  if (error) throw error;

  return data as StandingMatch[];
}

/* =========================================================
   EQUIPOS
========================================================= */

export async function getTeams(): Promise<Team[]> {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .order("nombre", {
      ascending: true,
    });

  if (error) {
    console.error("ERROR GET TEAMS:", error);
    throw error;
  }

  console.log("TEAMS DESDE SUPABASE:", data);

  return (data ?? []) as Team[];
}
/* =========================================================
   PARTIDOS DE TABLA
========================================================= */

export async function getStandingMatches() {
  const { data, error } = await supabase
    .from("standings_matches")
    .select("*")
    .order("jornada", {
      ascending: false,
    })
    .order("id", {
      ascending: false,
    });

  if (error) throw error;

  return data as StandingMatch[];
}

/* =========================================================
   CREAR PARTIDO
========================================================= */

export async function createStandingMatch(match: {
  jornada: number;

  equipo_local_id: number;

  equipo_visitante_id: number | null;

  goles_local: number;

  goles_visitante: number;
}) {
  const { data, error } = await supabase
    .from("standings_matches")
    .insert(match)
    .select()
    .single();

  if (error) throw error;

  return data as StandingMatch;
}

/* =========================================================
   ELIMINAR PARTIDO
========================================================= */

export async function deleteStandingMatch(
  id: number
) {
  const { error } = await supabase
    .from("standings_matches")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* =========================================================
   CALCULAR TABLA
========================================================= */

export function calculateStandings(
  teams: Team[],
  matches: StandingMatch[]
): StandingRow[] {
  const table = new Map<
    number,
    StandingRow
  >();

  /*
   * Primero creamos una fila para TODOS
   * los equipos.
   */

  for (const team of teams) {
    table.set(team.id, {
      team,

      jj: 0,

      ganados: 0,
      empatados: 0,
      perdidos: 0,

      gf: 0,
      gc: 0,

      dg: 0,
      puntos: 0,
    });
  }

  /*
   * Procesamos cada partido.
   */

  for (const match of matches) {
    const local =
      match.equipo_local_id !== null
        ? table.get(
            match.equipo_local_id
          )
        : undefined;

    const visitante =
      match.equipo_visitante_id !== null
        ? table.get(
            match.equipo_visitante_id
          )
        : undefined;

    /*
     * CASO NORMAL
     *
     * Existen los dos equipos.
     */

    if (local && visitante) {
      local.jj++;
      visitante.jj++;

      local.gf += match.goles_local;
      local.gc += match.goles_visitante;

      visitante.gf +=
        match.goles_visitante;

      visitante.gc += match.goles_local;

      if (
        match.goles_local >
        match.goles_visitante
      ) {
        local.ganados++;
        visitante.perdidos++;

        local.puntos += 3;
      } else if (
        match.goles_local <
        match.goles_visitante
      ) {
        visitante.ganados++;
        local.perdidos++;

        visitante.puntos += 3;
      } else {
        local.empatados++;
        visitante.empatados++;

        local.puntos++;
        visitante.puntos++;
      }

      continue;
    }

    /*
     * CASO SIN RIVAL
     *
     * El equipo real gana 3-0
     * automáticamente.
     *
     * No existe segundo equipo.
     */

    if (local && !visitante) {
      local.jj++;

      local.ganados++;

      local.gf += 3;
      local.gc += 0;

      local.puntos += 3;

      continue;
    }

    /*
     * Por seguridad, si algún día tenemos
     * un partido donde el equipo local es
     * null y existe visitante, también
     * lo tratamos como victoria 3-0
     * del visitante.
     */

    if (!local && visitante) {
      visitante.jj++;

      visitante.ganados++;

      visitante.gf += 3;
      visitante.gc += 0;

      visitante.puntos += 3;
    }
  }

  /*
   * Diferencia de goles.
   */

  for (const row of table.values()) {
    row.dg = row.gf - row.gc;
  }

  /*
   * Orden:
   *
   * 1. Puntos
   * 2. Diferencia de goles
   * 3. Goles a favor
   * 4. Nombre
   */

  return Array.from(table.values()).sort(
    (a, b) => {
      if (b.puntos !== a.puntos) {
        return b.puntos - a.puntos;
      }

      if (b.dg !== a.dg) {
        return b.dg - a.dg;
      }

      if (b.gf !== a.gf) {
        return b.gf - a.gf;
      }

      return a.team.nombre.localeCompare(
        b.team.nombre
      );
    }
  );
}