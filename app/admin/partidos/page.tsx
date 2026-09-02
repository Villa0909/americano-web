"use client";

import { useState } from "react";
import Link from "next/link";

import MatchForm from "@/components/matches/MatchForm";

type View = "menu" | "add" | "edit";

export default function MatchesAdminPage() {
  const [view, setView] = useState<View>("menu");

  function goToMenu() {
    setView("menu");
  }

  function goToAdd() {
    setView("add");
  }

  function goToEdit() {
    setView("edit");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* =========================
          ENCABEZADO
      ========================= */}

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[3px] text-zinc-400">
          ADMINISTRACIÓN
        </p>

        <h1 className="mt-1 text-4xl font-black sm:text-5xl">
          PARTIDOS
        </h1>
      </div>

      {/* =========================
          MINI HOTBAR
      ========================= */}

      <nav className="mb-10 overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex min-w-max">
          <Link
            href="/admin"
            className="
              border-b-2
              border-transparent
              px-5
              py-4
              text-sm
              font-bold
              text-zinc-500
              transition
              hover:border-zinc-300
              hover:text-black
              sm:px-7
            "
          >
            👤 Jugadores
          </Link>

          <Link
            href="/admin/partidos"
            className="
              border-b-2
              border-black
              px-5
              py-4
              text-sm
              font-black
              text-black
              transition
              sm:px-7
            "
          >
            🏈 Partidos
          </Link>

          <Link
            href="/admin/tabla"
            className="
              border-b-2
              border-transparent
              px-5
              py-4
              text-sm
              font-bold
              text-zinc-500
              transition
              hover:border-zinc-300
              hover:text-black
              sm:px-7
            "
          >
            📊 Tabla
          </Link>
        </div>
      </nav>

      {/* =========================
          MENÚ PRINCIPAL
      ========================= */}

      {view === "menu" && (
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-black">
              Administrar partidos
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Selecciona qué quieres hacer.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* AGREGAR PARTIDO */}

            <button
              type="button"
              onClick={goToAdd}
              className="
                group
                rounded-2xl
                border
                border-zinc-200
                bg-white
                p-6
                text-left
                shadow-sm
                transition
                hover:-translate-y-1
                hover:border-zinc-300
                hover:shadow-md
              "
            >
              <div
                className="
                  mb-6
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-xl
                  bg-black
                  text-2xl
                  text-white
                  transition
                  group-hover:scale-105
                "
              >
                +
              </div>

              <h3 className="text-xl font-black">
                Agregar partido
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Registra un nuevo partido, rival, fecha,
                marcador y estadísticas.
              </p>
            </button>

            {/* ACTUALIZAR PARTIDO */}

            <button
              type="button"
              onClick={goToEdit}
              className="
                group
                rounded-2xl
                border
                border-zinc-200
                bg-white
                p-6
                text-left
                shadow-sm
                transition
                hover:-translate-y-1
                hover:border-zinc-300
                hover:shadow-md
              "
            >
              <div
                className="
                  mb-6
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-xl
                  bg-black
                  text-xl
                  text-white
                  transition
                  group-hover:scale-105
                "
              >
                ✎
              </div>

              <h3 className="text-xl font-black">
                Actualizar partido
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Selecciona un partido existente para
                modificarlo o eliminarlo.
              </p>
            </button>
          </div>
        </section>
      )}

      {/* =========================
          AGREGAR
      ========================= */}

      {view === "add" && (
        <section>
          <button
            type="button"
            onClick={goToMenu}
            className="
              mb-6
              text-sm
              font-bold
              text-zinc-500
              transition
              hover:text-black
            "
          >
            ← Volver a partidos
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-black">
              Agregar partido
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Registra los datos del nuevo partido.
            </p>
          </div>

          <MatchForm mode="add" />
        </section>
      )}

      {/* =========================
          ACTUALIZAR
      ========================= */}

      {view === "edit" && (
        <section>
          <button
            type="button"
            onClick={goToMenu}
            className="
              mb-6
              text-sm
              font-bold
              text-zinc-500
              transition
              hover:text-black
            "
          >
            ← Volver a partidos
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-black">
              Actualizar partido
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Selecciona un partido existente para
              editarlo.
            </p>
          </div>

          <MatchForm mode="edit" />
        </section>
      )}
    </main>
  );
}