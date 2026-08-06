export interface Club {
  nombre: string;
  nombreCorto: string;

  temporada: number;

  fundacion: number;

  estadio: string;

  ciudad: string;

  lema: string;

  logo: string;

  colores: {
    principal: string;
    secundario: string;
  };
}