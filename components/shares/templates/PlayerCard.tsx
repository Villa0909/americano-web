import PlayerStats from "../ui/PlayerStats";

import {
  CalendarDays,
  ShieldCheck,
  Star,
} from "lucide-react";

interface Props {
  nombre: string;
  numero: number;
  foto: string;

  posicion:
    | "O-Line"
    | "Receptor"
    | "Corredor"
    | "Quarterback"
    | "D-Line"
    | "Linebacker"
    | "Cornerback"
    | "Safety";

  partidos?: number;
  goles?: number;
  asistencias?: number;
  mvps?: number;
  porteriasCero?: number;
}

const PHOTO = {
  x: -300,
  y: 0,
  width: 1400,
  height: 1200,
  opacity: 1,
  rotate: 0,
};

const NAME = {
  x: 670,
  y: 180,
  size: 170,
  opacity: 1,
  rotate: 0,
};

const POSITION = {
  x: 50,
  y: 50,
  size: 110,
  opacity: 0.4,
  rotate: 0,
};

const NUMBER = {
  x: 260,
  y: 400,
  size: 520,
  opacity: 0.1,
  rotate: 0,
};

const LIGHT = {
  x: 540,
  y: 180,
  size: 520,
  opacity: 0,
};

const STATS = {
  x: 550,
  y: 130,
  xDouble: 520,
  yDouble: 180,
  opacity: 1,
};

const FOOTER = {
  x: 700,
  y: 45,
  size: 28,
  opacity: 0.7,
};

export default function PlayerCard({
  nombre,
  numero,
  foto,
  posicion,
}: Props) {
  const numberRight =
    numero < 10 ? 320 : NUMBER.x;

  const positionText: Record<
    Props["posicion"],
    string
  > = {
    "O-Line": "OL",
    Receptor: "WR",
    Corredor: "RB",
    Quarterback: "QB",
    "D-Line": "DL",
    Linebacker: "LB",
    Cornerback: "CB",
    Safety: "S",
  };

  const posicionAbreviada =
    positionText[posicion];

  const stats = [
    {
      icon: (
        <CalendarDays
          size={100}
          className="text-white"
        />
      ),
      value: 0,
    },

    {
      icon: (
        <Star
          size={100}
          className="text-yellow-400"
          fill="currentColor"
        />
      ),
      value: 0,
    },

    {
      icon: (
        <ShieldCheck
          size={100}
          className="text-white"
        />
      ),
      value: 0,
    },
  ].filter((stat) => stat.value > 0);

  return (
    <div
      className="relative h-[1350px] w-[1080px] overflow-hidden bg-[#062A63]"
      style={{
        isolation: "isolate",
      }}
    >
      {/* FONDO */}

      <img
        src="/templates/player-bg.png"
        alt=""
        crossOrigin="anonymous"
        draggable={false}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* POSICIÓN */}

      <h2
        style={{
          left: POSITION.x,
          top: POSITION.y,
          fontSize: POSITION.size,
          opacity: POSITION.opacity,
          transform: `rotate(${POSITION.rotate}deg)`,
        }}
        className="absolute z-[15] font-black uppercase leading-none text-yellow-400"
      >
        {posicionAbreviada}
      </h2>

      {/* LUZ */}

      <div
        style={{
          left: LIGHT.x,
          bottom: LIGHT.y,
          width: LIGHT.size,
          height: LIGHT.size,
          opacity: LIGHT.opacity,
          transform: "translateX(-50%)",
        }}
        className="absolute z-20 rounded-full bg-yellow-400 blur-[170px]"
      />

      {/* DORSAL */}

      <h2
        style={{
          right: numberRight,
          top: NUMBER.y,
          fontSize: NUMBER.size,
          opacity: NUMBER.opacity,
          transform: `rotate(${NUMBER.rotate}deg)`,
        }}
        className="absolute z-10 font-black leading-none tracking-[-0.12em] text-white"
      >
        {numero}
      </h2>

      {/* NOMBRE */}

      <h1
        style={{
          left: NAME.x,
          top: NAME.y,
          fontSize: NAME.size,
          opacity: NAME.opacity,
          transform: `translateX(-50%) rotate(${NAME.rotate}deg)`,
        }}
        className="absolute z-30 whitespace-nowrap font-black uppercase tracking-tight text-white"
      >
        {nombre}
      </h1>

      {/* FOTO */}

      <img
        src={foto}
        alt={nombre}
        crossOrigin="anonymous"
        draggable={false}
        style={{
          left: PHOTO.x,
          bottom: PHOTO.y,
          width: PHOTO.width,
          height: PHOTO.height,
          opacity: PHOTO.opacity,
          transform: `rotate(${PHOTO.rotate}deg)`,
        }}
        className="absolute z-40 object-contain"
      />

      {/* ESTADÍSTICAS */}

      {stats.length > 0 && (
        <div
          style={{
            left:
              stats.length === 2
                ? STATS.xDouble
                : STATS.x,

            bottom:
              stats.length === 2
                ? STATS.yDouble
                : STATS.y,

            opacity: STATS.opacity,
          }}
          className="absolute z-50"
        >
          <PlayerStats stats={stats} />
        </div>
      )}

      {/* FOOTER */}

      <p
        style={{
          left: FOOTER.x,
          bottom: FOOTER.y,
          fontSize: FOOTER.size,
          opacity: FOOTER.opacity,
          transform: "translateX(-50%)",
        }}
        className="absolute z-50 whitespace-nowrap uppercase tracking-[8px] text-yellow-400"
      >
        CABALLEROS
      </p>
    </div>
  );
}