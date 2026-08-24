export interface HistoricalSeason {
  temporada: number;

  partidos: number;

  victorias: number;

  empates: number;

  derrotas: number;

  puntos: number;

  goles_favor: number;

  goles_contra: number;

  diferencia_goles: number;

  posicion_final: number | null;

  fase_final: string;
}

/*
 * =========================================================
 * HISTORIA DEL CLUB
 * =========================================================
 *
 * 2024 y 2025 son temporadas históricas.
 *
 * Los datos se introducen manualmente porque
 * esas temporadas no están en Supabase.
 *
 * NO estamos metiendo partidos individuales.
 */

export const historicalSeasons: HistoricalSeason[] = [
  {
    temporada: 2024,

    partidos: 0,

    victorias: 0,

    empates: 0,

    derrotas: 0,

    puntos: 0,

    goles_favor: 0,

    goles_contra: 0,

    diferencia_goles: 0,

    posicion_final: null,

    fase_final: "Por definir",
  },

  {
    temporada: 2025,

    partidos: 0,

    victorias: 0,

    empates: 0,

    derrotas: 0,

    puntos: 0,

    goles_favor: 0,

    goles_contra: 0,

    diferencia_goles: 0,

    posicion_final: null,

    fase_final: "Por definir",
  },
];