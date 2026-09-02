export type PlayerPosition =
  | "O-Line"
  | "Receptor"
  | "Corredor"
  | "Quarterback"
  | "D-Line"
  | "Linebacker"
  | "Cornerback"
  | "Safety";

export interface Player {
  id: string;

  nombre: string;
  slug: string;
  numero: number;

  posicion: PlayerPosition;

  foto: string;

  edad: number;
  altura: number;
  peso: number;

  pie:
    | "Derecho"
    | "Izquierdo";

  descripcion: string;

  /*
   * =========================
   * ESTADÍSTICAS DE OFFENSE
   * =========================
   */

  recepciones: number;
  yardas: number;
  touchdowns: number;

  pases_completos: number;
  yardas_pase: number;
  touchdowns_pase: number;
  touchdowns_carrera: number;

  /*
   * =========================
   * ESTADÍSTICAS DE DEFENSE
   * =========================
   */

  tackles: number;
  intercepciones: number;
  sacks: number;
  touchdowns_defensivos: number;
}