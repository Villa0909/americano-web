/* eslint-disable @next/next/no-img-element */

import { PiSoccerBallFill } from "react-icons/pi";

interface PlayerEvent {
  player_id: string;
  nombre: string;
  goles?: number;
}

interface MvpPlayer {
  nombre: string;
}

interface Props {
  rival: string;
  torneo: string;
  jornada: number;
  fecha: string;
  ubicacion: string | null;

  golesFavor: number;
  golesContra: number;

  goles: PlayerEvent[];

  mvp?: MvpPlayer | null;
}

/* ==========================================
                CONFIGURACIÓN
========================================== */

const CONFIG = {
  location: {
    x: 110,
    y: 85,
    width: 220,
    size: 32,
  },

  date: {
    x: 900,
    y: 85,
    width: 180,
    size: 32,
  },

  jornada: {
    x: 560,
    y: 525,
    width: 360,
    titleSize: 52,
    numberSize: 64,
    gap: 8,
  },

  rival: {
    x: 560,
    y: 670,
    width: 360,
    vsSize: 62,
    nameSize: 72,
    gap: 8,
  },

  score: {
    x: 555,
    y: 860,
    size: 110,
  },

  scorers: {
    x: 470,
    y: 1000,
    width: 430,

    ballsWidth: 140,

    nameSize: 28,
    iconSize: 30,

    rowGap: 12,
    itemGap: 14,
  },

  line: {
    x: 2000,
    y: 1160,
    width: 4,
    height: 100,
  },

  mvp: {
    x: 540,
    y: 1250,
    width: 500,
    size: 34,
  },

  tournament: {
    x: 540,
    y: 1320,
    size: 18,
    spacing: 7,
  },
};

export default function ResultCard({
  rival,
  torneo,
  jornada,
  fecha,
  ubicacion,
  golesFavor,
  golesContra,
  goles,
  mvp,
}: Props) {
  const formattedDate = new Date(
    fecha,
  ).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  });

  return (
    <div className="relative h-[1350px] w-[1080px] overflow-hidden bg-white text-black">
      {/* Fondo */}

      <img
        src="/templates/result-bg.png"
        alt=""
        crossOrigin="anonymous"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Ubicación */}

      <div
        style={{
          left: CONFIG.location.x,
          top: CONFIG.location.y,
          width: CONFIG.location.width,
        }}
        className="absolute text-center"
      >
        <p
          style={{
            fontSize: CONFIG.location.size,
          }}
          className="font-black uppercase leading-tight"
        >
          {ubicacion || "Sin ubicación"}
        </p>
      </div>

      {/* Fecha */}

      <div
        style={{
          left: CONFIG.date.x,
          top: CONFIG.date.y,
          width: CONFIG.date.width,
        }}
        className="absolute -translate-x-1/2 text-center"
      >
        <p
          style={{
            fontSize: CONFIG.date.size,
          }}
          className="font-black uppercase"
        >
          {formattedDate}
        </p>
      </div>

      {/* Jornada */}

      <div
        style={{
          left: CONFIG.jornada.x,
          top: CONFIG.jornada.y,
          width: CONFIG.jornada.width,
        }}
        className="absolute -translate-x-1/2 text-center text-white"
      >
        <p
          style={{
            fontSize:
              CONFIG.jornada.titleSize,
          }}
          className="font-black uppercase leading-none"
        >
          Jornada
        </p>

        <p
          style={{
            marginTop:
              CONFIG.jornada.gap,
            fontSize:
              CONFIG.jornada.numberSize,
          }}
          className="font-black leading-none"
        >
          {jornada}
        </p>
      </div>

      {/* Rival */}

      <div
        style={{
          left: CONFIG.rival.x,
          top: CONFIG.rival.y,
          width: CONFIG.rival.width,
        }}
        className="absolute -translate-x-1/2 text-center text-white"
      >
        <p
          style={{
            fontSize: CONFIG.rival.vsSize,
          }}
          className="font-black uppercase leading-none"
        >
          VS
        </p>

        <p
          style={{
            marginTop: CONFIG.rival.gap,
            fontSize:
              CONFIG.rival.nameSize,
          }}
          className="font-black uppercase leading-tight"
        >
          {rival}
        </p>
      </div>

      {/* Marcador */}

      <div
        style={{
          left: CONFIG.score.x,
          top: CONFIG.score.y,
        }}
        className="absolute -translate-x-1/2"
      >
        <p
          style={{
            fontSize: CONFIG.score.size,
          }}
          className="whitespace-nowrap font-black leading-none"
        >
          {golesFavor} - {golesContra}
        </p>
      </div>

      {/* Goleadores */}

      <div
        style={{
          left: CONFIG.scorers.x,
          top: CONFIG.scorers.y,
          width: CONFIG.scorers.width,
        }}
        className="absolute -translate-x-1/2"
      >
        <div
          style={{
            rowGap:
              CONFIG.scorers.rowGap,
          }}
          className="grid"
        >
          {goles.length > 0 ? (
            goles.map((player) => (
              <div
                key={player.player_id}
                style={{
                  gridTemplateColumns: `${CONFIG.scorers.ballsWidth}px 1fr`,
                  columnGap:
                    CONFIG.scorers.itemGap,
                }}
                className="grid items-center"
              >
                <div className="flex justify-end gap-1">
                  {Array.from({
                    length:
                      player.goles ?? 0,
                  }).map((_, index) => (
                    <PiSoccerBallFill
                      key={index}
                      size={
                        CONFIG.scorers
                          .iconSize
                      }
                      className="shrink-0"
                    />
                  ))}
                </div>

                <span
                  style={{
                    fontSize:
                      CONFIG.scorers
                        .nameSize,
                  }}
                  className="text-left font-black uppercase"
                >
                  {player.nombre}
                </span>
              </div>
            ))
          ) : (
            <p
              style={{
                fontSize:
                  CONFIG.scorers.nameSize,
              }}
              className="text-center font-black uppercase"
            >
              Sin goleadores
            </p>
          )}
        </div>
      </div>

      {/* Línea */}

      <div
        style={{
          left: CONFIG.line.x,
          top: CONFIG.line.y,
          width: CONFIG.line.width,
          height: CONFIG.line.height,
        }}
        className="absolute -translate-x-1/2 bg-black"
      />

      {/* MVP */}

      {mvp && (
        <div
          style={{
            left: CONFIG.mvp.x,
            top: CONFIG.mvp.y,
            width: CONFIG.mvp.width,
          }}
          className="absolute -translate-x-1/2 text-center"
        >
          <p
            style={{
              fontSize: CONFIG.mvp.size,
            }}
            className="font-black uppercase"
          >
            MVP: {mvp.nombre}
          </p>
        </div>
      )}

      {/* Torneo */}

      <p
        style={{
          left: CONFIG.tournament.x,
          top: CONFIG.tournament.y,
          fontSize:
            CONFIG.tournament.size,
          letterSpacing:
            CONFIG.tournament.spacing,
        }}
        className="absolute -translate-x-1/2 font-bold uppercase text-zinc-500"
      >
        {torneo}
      </p>
    </div>
  );
}