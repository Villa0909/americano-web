"use client";

import { useState } from "react";

import PositionSection from "@/components/plantilla/PositionSection";
import type { Player } from "@/types/player";

type PositionId =
  | "porteros"
  | "defensas"
  | "mediocampistas"
  | "delanteros";

interface Position {
  id: PositionId;
  label: string;
  title: string;
  players: Player[];
}

interface Props {
  porteros: Player[];
  defensas: Player[];
  mediocampistas: Player[];
  delanteros: Player[];
}

export default function PlantillaTabs({
  porteros,
  defensas,
  mediocampistas,
  delanteros,
}: Props) {
  const [activePosition, setActivePosition] =
    useState<PositionId>("porteros");

  const positions: Position[] = [
    {
      id: "porteros",
      label: "PORTEROS",
      title: "Porteros",
      players: porteros,
    },
    {
      id: "defensas",
      label: "DEFENSAS",
      title: "Defensas",
      players: defensas,
    },
    {
      id: "mediocampistas",
      label: "MEDIOS",
      title: "Mediocampistas",
      players: mediocampistas,
    },
    {
      id: "delanteros",
      label: "DELANTEROS",
      title: "Delanteros",
      players: delanteros,
    },
  ];

  const selectedPosition =
    positions.find(
      (position) => position.id === activePosition,
    ) ?? positions[0];

  return (
    <section className="w-full">
      {/* TELÉFONO: todas las posiciones */}

      <div className="md:hidden">
        {positions.map((position) => (
          <PositionSection
            key={position.id}
            title={position.title}
            players={position.players}
          />
        ))}
      </div>

      {/* PC: pestañas */}

      <div className="hidden md:block">
        <div className="flex border-b border-zinc-200">
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
                className={`relative flex-1 px-3 py-4 text-sm font-black tracking-wide transition-colors lg:text-base ${
                  isActive
                    ? "text-black"
                    : "text-zinc-400 hover:text-zinc-700"
                }`}
              >
                {position.label}

                <span
                  className={`absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-black transition-all duration-300 ${
                    isActive
                      ? "w-[calc(100%-32px)] opacity-100"
                      : "w-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div
          key={selectedPosition.id}
          className="animate-[positionAppear_250ms_ease-out]"
        >
          <PositionSection
            title={selectedPosition.title}
            players={selectedPosition.players}
          />
        </div>
      </div>
    </section>
  );
}