"use client";

import { useState } from "react";

import PositionSection from "@/components/plantilla/PositionSection";
import type { Player } from "@/types/player";

type Side = "selection" | "offense" | "defense";

interface Props {
  players: Player[];
}

interface Position {
  id: string;
  label: string;
  title: string;
  players: Player[];
}

/* =========================
   ICONO DE ESPADAS
========================= */

function SwordsIcon() {
  return (
    <svg
      viewBox="0 0 180 180"
      className="h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(-42 90 90)">
        <path
          d="M88 22L96 22L96 112L88 112L88 22Z"
          fill="currentColor"
        />

        <path
          d="M88 22L92 10L96 22H88Z"
          fill="currentColor"
        />

        <path
          d="M77 108H107V116H77V108Z"
          rx="3"
          fill="currentColor"
        />

        <path
          d="M87 116H97V145H87V116Z"
          fill="currentColor"
        />

        <path
          d="M82 145H102V152H82V145Z"
          rx="3"
          fill="currentColor"
        />
      </g>

      <g transform="rotate(42 90 90)">
        <path
          d="M88 22L96 22L96 112L88 112L88 22Z"
          fill="currentColor"
        />

        <path
          d="M88 22L92 10L96 22H88Z"
          fill="currentColor"
        />

        <path
          d="M77 108H107V116H77V108Z"
          rx="3"
          fill="currentColor"
        />

        <path
          d="M87 116H97V145H87V116Z"
          fill="currentColor"
        />

        <path
          d="M82 145H102V152H82V145Z"
          rx="3"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

/* =========================
   ICONO DE ESCUDO
========================= */

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 180 200"
      className="h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M90 10L155 34V88C155 134 128 166 90 188C52 166 25 134 25 88V34L90 10Z"
        fill="currentColor"
      />

      <path
        d="M90 27L140 45V88C140 123 120 148 90 167C60 148 40 123 40 88V45L90 27Z"
        fill="#0B3B82"
      />

      <path
        d="M90 43L101 76H136L108 96L119 130L90 109L61 130L72 96L44 76H79L90 43Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* =========================
   COMPONENTE PRINCIPAL
========================= */

export default function PlantillaTabs({
  players,
}: Props) {
  const [side, setSide] =
    useState<Side>("selection");

  /*
   * OFENSE
   */
  const offense: Position[] = [
    {
      id: "oline",
      label: "O-LINE",
      title: "O-Line",
      players: players.filter(
        (player) => player.posicion === "O-Line",
      ),
    },
    {
      id: "receptores",
      label: "RECEPTORES",
      title: "Receptores",
      players: players.filter(
        (player) => player.posicion === "Receptor",
      ),
    },
    {
      id: "corredores",
      label: "CORREDORES",
      title: "Corredores",
      players: players.filter(
        (player) => player.posicion === "Corredor",
      ),
    },
    {
      id: "quarterback",
      label: "QUARTERBACK",
      title: "Quarterbacks",
      players: players.filter(
        (player) => player.posicion === "Quarterback",
      ),
    },
  ];

  /*
   * DEFENSE
   */
  const defense: Position[] = [
    {
      id: "dline",
      label: "D-LINE",
      title: "D-Line",
      players: players.filter(
        (player) => player.posicion === "D-Line",
      ),
    },
    {
      id: "linebackers",
      label: "LINEBACKERS",
      title: "Linebackers",
      players: players.filter(
        (player) => player.posicion === "Linebacker",
      ),
    },
    {
      id: "cornerbacks",
      label: "CORNERBACKS",
      title: "Cornerbacks",
      players: players.filter(
        (player) => player.posicion === "Cornerback",
      ),
    },
    {
      id: "safetys",
      label: "SAFETYS",
      title: "Safetys",
      players: players.filter(
        (player) => player.posicion === "Safety",
      ),
    },
  ];

  /*
   * PANTALLA DE SELECCIÓN
   */
  if (side === "selection") {
    return (
      <section className="w-full">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200 sm:text-sm">
            CONOCE LA PLANTILLA
          </p>

          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            ELIGE TU UNIDAD
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">

          {/* OFFENSE */}

          <button
            type="button"
            onClick={() => setSide("offense")}
            className="group relative min-h-[260px] overflow-hidden rounded-3xl bg-[#0B3B82] text-left shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] sm:min-h-[330px]"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-125" />

            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />

            <div className="relative flex h-full min-h-[260px] flex-col items-center justify-center px-6 py-8 text-center sm:min-h-[330px]">

              <div className="text-yellow-400 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <SwordsIcon />
              </div>

              <h3 className="mt-3 text-3xl font-black tracking-wide text-white sm:text-4xl">
                OFFENSE
              </h3>

              <p className="mt-2 text-sm font-medium text-blue-100/70 sm:text-base">
                O-Line · Receptores · Corredores · QB
              </p>

              <div className="mt-5 rounded-full border border-yellow-400/40 bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-widest text-[#062A63] transition-all duration-300 group-hover:bg-yellow-300">
                Ver plantilla
              </div>
            </div>
          </button>

          {/* DEFENSE */}

          <button
            type="button"
            onClick={() => setSide("defense")}
            className="group relative min-h-[260px] overflow-hidden rounded-3xl bg-[#0B3B82] text-left shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] sm:min-h-[330px]"
          >
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-125" />

            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />

            <div className="relative flex h-full min-h-[260px] flex-col items-center justify-center px-6 py-8 text-center sm:min-h-[330px]">

              <div className="text-yellow-400 transition-all duration-500 group-hover:scale-110">
                <ShieldIcon />
              </div>

              <h3 className="mt-3 text-3xl font-black tracking-wide text-white sm:text-4xl">
                DEFENSE
              </h3>

              <p className="mt-2 text-sm font-medium text-blue-100/70 sm:text-base">
                D-Line · Linebackers · CB · Safetys
              </p>

              <div className="mt-5 rounded-full border border-yellow-400/40 bg-yellow-400 px-5 py-2 text-xs font-black uppercase tracking-widest text-[#062A63] transition-all duration-300 group-hover:bg-yellow-300">
                Ver plantilla
              </div>
            </div>
          </button>
        </div>
      </section>
    );
  }

  /*
   * POSICIONES
   */

  const positions =
    side === "offense"
      ? offense
      : defense;

  return (
    <section className="w-full">

      {/* ENCABEZADO */}

      <div className="mb-7 flex items-center justify-between gap-4 sm:mb-10">
        <div>
          <button
            type="button"
            onClick={() => setSide("selection")}
            className="mb-3 text-xs font-black uppercase tracking-widest text-blue-200 transition-colors hover:text-yellow-400"
          >
            ← Cambiar unidad
          </button>

          <h2 className="text-3xl font-black tracking-tight text-yellow-400 sm:text-4xl">
            {side === "offense"
              ? "OFFENSE"
              : "DEFENSE"}
          </h2>

          <p className="mt-1 text-sm text-blue-100 sm:text-base">
            Selecciona una posición
          </p>
        </div>

        <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-[#062A63] sm:flex">
          {side === "offense" ? (
            <SwordsIcon />
          ) : (
            <ShieldIcon />
          )}
        </div>
      </div>

      {/* BARRA DE POSICIONES */}

      <PositionTabs positions={positions} />

    </section>
  );
}

/* =========================
   TABS PARA PC + CELULAR
========================= */

function PositionTabs({
  positions,
}: {
  positions: Position[];
}) {
  const [activePosition, setActivePosition] =
    useState(positions[0]?.id ?? "");

  const selectedPosition =
    positions.find(
      (position) =>
        position.id === activePosition,
    ) ?? positions[0];

  return (
    <div className="w-full">

      {/* BARRA */}

      <div className="overflow-x-auto rounded-t-2xl border-b border-yellow-400/30 bg-[#0B3B82] scrollbar-hide">
        <div className="flex min-w-max">

          {positions.map((position) => {
            const isActive =
              activePosition === position.id;

            return (
              <button
                key={position.id}
                type="button"
                onClick={() =>
                  setActivePosition(position.id)
                }
                className={`relative shrink-0 px-5 py-4 text-xs font-black tracking-wide transition-colors sm:px-6 sm:text-sm lg:text-base ${
                  isActive
                    ? "text-yellow-400"
                    : "text-blue-200 hover:text-white"
                }`}
              >
                {position.label}

                <span
                  className={`absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-yellow-400 transition-all duration-300 ${
                    isActive
                      ? "w-[calc(100%-24px)] opacity-100"
                      : "w-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENIDO */}

      {selectedPosition && (
        <div
          key={selectedPosition.id}
          className="animate-[positionAppear_250ms_ease-out]"
        >
          <PositionSection
            title={selectedPosition.title}
            players={selectedPosition.players}
          />
        </div>
      )}
    </div>
  );
}