export interface Player {
  id: string;

  nombre: string;
  slug: string;
  numero: number;

  posicion:
    | "Portero"
    | "Defensa"
    | "Mediocampista"
    | "Delantero";

  foto: string;

  goles: number;
  asistencias: number;
  partidos: number;
  mvps: number;

  /*
   * Solo se utiliza para porteros.
   * Los demás jugadores tendrán 0.
   */
  porterias_cero: number;

  edad: number;
  altura: number;
  peso: number;

  pie:
    | "Derecho"
    | "Izquierdo";

  descripcion: string;
}