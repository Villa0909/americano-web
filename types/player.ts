export interface Player {
  id: string;

  nombre: string;

  slug: string;

  numero: number;
mvps: number;
  posicion:
    | "Portero"
    | "Defensa"
    | "Mediocampista"
    | "Delantero";

  foto: string;

  goles: number;

  asistencias: number;

  partidos: number;

  edad: number;

  altura: number;

  peso: number;

  pie: "Derecho" | "Izquierdo";

  descripcion: string;
}