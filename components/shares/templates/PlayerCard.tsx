import Image from "next/image";

import PlayerStats from "../ui/PlayerStats";

import { PiSoccerBallFill } from "react-icons/pi";

import {
  CalendarDays,
  SportShoe,
  Star,
} from "lucide-react";

interface Props {
  nombre: string;
  numero: number;
  foto: string;

  posicion: "Portero" | "Defensa" | "Mediocampista" | "Delantero";

  partidos: number;
  goles: number;
  asistencias: number;
  mvps: number;
}

/* ==========================================
              CONFIGURACIÓN
========================================== */

/* FOTO */

const PHOTO = {
  x: -300,
  y: 0,
  width: 1400,
  height: 1200,
  opacity: 1,
  rotate: 0,
};

/* NOMBRE */

const NAME = {
  x: 670,
  y: 180,
  size: 170,
  opacity: 1,
  rotate: 0,
};

/* POSICIÓN */

const POSITION = {
  x: 50,
  y: 50,

  size: 110,

  opacity: 0.4,

  rotate: 0,
};

/* DORSAL */

const NUMBER = {
  x: 260,
  y: 400,
  size: 520,
  opacity: 0.10,
  rotate: 0,
};

/* LUZ */

const LIGHT = {
  x: 540,
  y: 180,
  size: 520,
  opacity: 0,
};

/* ESTADÍSTICAS */

const STATS = {
  x: 550,
  y: 130,

  xDouble: 520,
  yDouble: 180,

  opacity: 1,
};

/* FOOTER */

const FOOTER = {
  x: 740,
  y: 45,
  size: 28,
  opacity: 0.70,
};

export default function PlayerCard({
  nombre,
  numero,
  foto,
  posicion,
  partidos,
  goles,
  asistencias,
  mvps,
}: Props) {
  
    const numberRight =
  numero < 10 ? 320 : NUMBER.x;
  const stats = [
  {
    icon: <CalendarDays size={38} className="text-white" />,
    value: partidos,
  },
  {
    icon: <PiSoccerBallFill size={38} className="text-white" />,
    value: goles,
  },
  {
    icon: <SportShoe size={38} className="text-white" />,
    value: asistencias,
  },
  {
    icon: (
      <Star
        size={38}
        className="text-yellow-400"
        fill="currentColor"
      />
    ),
    value: mvps,
  },
].filter((stat) => stat.value > 0);
<div
  style={{
    left: stats.length === 2 ? STATS.xDouble : STATS.x,
    bottom: stats.length === 2 ? STATS.yDouble : STATS.y,
    opacity: STATS.opacity,
  }}
  className="absolute z-40"
>
  <PlayerStats stats={stats} />
</div>
const positionText = {
  Portero: "POR",
  Defensa: "DEF",
  Mediocampista: "MED",
  Delantero: "DEL",
} as const;

const posicionAbreviada = positionText[posicion];
  return (
    <div className="relative h-[1350px] w-[1080px] overflow-hidden">

      {/* ==========================================
                    FONDO
      ========================================== */}

      <Image
        src="/templates/player-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
      />

{/* ==========================================
              POSICIÓN
========================================== */}

<h2
  style={{
    left: POSITION.x,
    top: POSITION.y,
    fontSize: POSITION.size,
    opacity: POSITION.opacity,
    transform: `rotate(${POSITION.rotate}deg)`,
  }}
  className="
    absolute

    font-black
    uppercase

    text-white

    leading-none

    z-15
  "
>
  {posicionAbreviada}
</h2>

      {/* ==========================================
                    LUZ
      ========================================== */}

      <div
        style={{
          left: LIGHT.x,
          bottom: LIGHT.y,
          width: LIGHT.size,
          height: LIGHT.size,
          opacity: LIGHT.opacity,
          transform: "translateX(-50%)",
        }}
        className="
          absolute
          rounded-full
          bg-white
          blur-[170px]
          z-20
        "
      />

      {/* ==========================================
                    DORSAL
      ========================================== */}

      <h2
        style={{
          right: numberRight,
          top: NUMBER.y,
          fontSize: NUMBER.size,
          opacity: NUMBER.opacity,
          transform: `rotate(${NUMBER.rotate}deg)`,
        }}
        className="
          absolute
          font-black
          leading-none
          text-white
          z-10
          tracking-[-0.12em]
        "
      >
        {numero}
      </h2>

      {/* ==========================================
                    NOMBRE
      ========================================== */}

      <h1
        style={{
          left: NAME.x,
          top: NAME.y,
          fontSize: NAME.size,
          opacity: NAME.opacity,
          transform: `translateX(-50%) rotate(${NAME.rotate}deg)`,
        }}
        className="
          absolute
          font-black
          uppercase
          tracking-tight
          text-white
          z-30
        "
      >
        {nombre}
      </h1>

      {/* ==========================================
                    FOTO
      ========================================== */}

      <Image
        src={foto}
        alt={nombre}
        width={PHOTO.width}
        height={PHOTO.height}
        style={{
          left: PHOTO.x,
          bottom: PHOTO.y,
          height: PHOTO.height,
          opacity: PHOTO.opacity,
          transform: `rotate(${PHOTO.rotate}deg)`,
        }}
        className="
          absolute
          w-auto
          object-contain
          z-40
        "
      />
            {/* ==========================================
                  ESTADÍSTICAS
      ========================================== */}

      <div
        style={{
  left: stats.length === 2 ? STATS.xDouble : STATS.x,
  bottom: stats.length === 2 ? STATS.yDouble : STATS.y,
  opacity: STATS.opacity,
}}
        className="absolute z-40"
      >
        <PlayerStats
  stats={[
    {
      icon: <CalendarDays size={100} className="text-white" />,
      value: partidos,
    },

    {
      icon: <PiSoccerBallFill size={100} className="text-white" />,
      value: goles,
    },

    {
      icon: <SportShoe size={100} className="text-white" />,
      value: asistencias,
    },

    {
      icon: (
        <Star
          size={100}
          className="text-yellow-400"
          fill="currentColor"
        />
      ),
      value: mvps,
    },
  ].filter((stat) => stat.value > 0)}
/>
      </div>

      {/* ==========================================
                    FOOTER
      ========================================== */}

      <p
        style={{
          left: FOOTER.x,
          bottom: FOOTER.y,
          fontSize: FOOTER.size,
          opacity: FOOTER.opacity,
          transform: "translateX(-50%)",
        }}
        className="
          absolute
          tracking-[8px]
          uppercase
          text-white
        "
      >
        MARTINCITASFC.COM
      </p>

    </div>
  );
}