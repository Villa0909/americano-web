"use client";

import { useState } from "react";

import MatchGallery from "./MatchGallery";
import MatchSummary from "./MatchSummary";
import MatchTable from "./MatchTable";

import type {
  StandingMatch,
  Team,
} from "@/lib/standings";

interface Props {
  goles: any[];
  asistencias: any[];
  amarillas: any[];
  rojas: any[];
  mvp: any;

  teams: Team[];
  historicalMatches: StandingMatch[];
  jornada: number;
}

type TabId =
  | "resumen"
  | "galeria"
  | "tabla";

export default function MatchTabs(
  props: Props
) {
  const [tab, setTab] =
    useState<TabId>("resumen");

  return (
    <section className="mt-8 sm:mt-10">

      {/* PESTAÑAS */}

      <div className="grid grid-cols-3 border-b border-zinc-200">

        <Tab
          active={tab === "resumen"}
          onClick={() =>
            setTab("resumen")
          }
        >
          Resumen
        </Tab>

        <Tab
          active={tab === "galeria"}
          onClick={() =>
            setTab("galeria")
          }
        >
          Galería
        </Tab>

        <Tab
          active={tab === "tabla"}
          onClick={() =>
            setTab("tabla")
          }
        >
          Tabla
        </Tab>

      </div>

      {/* CONTENIDO */}

      <div
        key={tab}
        className="mt-6 text-zinc-900 animate-[positionAppear_250ms_ease-out] sm:mt-8"
      >

        {tab === "resumen" && (
          <MatchSummary {...props} />
        )}

        {tab === "galeria" && (
          <MatchGallery />
        )}

        {tab === "tabla" && (
          <MatchTable
            teams={props.teams}
            matches={
              props.historicalMatches
            }
            jornada={props.jornada}
          />
        )}

      </div>

    </section>
  );
}

function Tab({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative min-w-0 px-1 py-4 text-sm font-semibold transition sm:px-6 sm:text-lg ${
        active
          ? "text-black"
          : "text-zinc-600 hover:text-black"
      }`}
    >
      <span className="block truncate">
        {children}
      </span>

      <span
        className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-black transition-all duration-300 ${
          active
            ? "w-full opacity-100"
            : "w-0 opacity-0"
        }`}
      />
    </button>
  );
}