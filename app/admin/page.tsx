"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ImageUpload from "@/components/admin/ImageUpload";

import {
  createPlayer,
  getPlayers,
  updatePlayer,
} from "@/lib/players";

import type {
  Player,
  PlayerPosition,
} from "@/types/player";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

interface PlayerForm {
  nombre: string;
  slug: string;
  numero: string;

  posicion: PlayerPosition;

  foto: string;

  edad: string;
  altura: string;
  peso: string;

  pie: "Derecho" | "Izquierdo";

  descripcion: string;
}

const initialForm: PlayerForm = {
  nombre: "",
  slug: "",
  numero: "",

  posicion: "Receptor",

  foto: "",

  edad: "",
  altura: "",
  peso: "",

  pie: "Derecho",

  descripcion: "",
};

const OFFENSE_POSITIONS: PlayerPosition[] = [
  "O-Line",
  "Receptor",
  "Corredor",
  "Quarterback",
];

const DEFENSE_POSITIONS: PlayerPosition[] = [
  "D-Line",
  "Linebacker",
  "Cornerback",
  "Safety",
];

type View = "menu" | "add" | "edit";

export default function AdminPage() {
  const [view, setView] = useState<View>("menu");

  const [loading, setLoading] = useState(false);

  const [players, setPlayers] = useState<Player[]>([]);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [form, setForm] =
    useState<PlayerForm>(initialForm);

  useEffect(() => {
    void loadPlayers();
  }, []);

  async function loadPlayers() {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.error(
        "No se pudieron cargar los jugadores:",
        error,
      );
    }
  }

  function clearForm() {
    setSelectedId(null);
    setForm(initialForm);
  }

  function goToMenu() {
    clearForm();
    setView("menu");
  }

  function goToAdd() {
    clearForm();
    setView("add");
  }

  function goToEdit() {
    clearForm();
    setView("edit");
  }

  function loadPlayer(player: Player) {
    setSelectedId(player.id);

    setForm({
      nombre: player.nombre,
      slug: player.slug,
      numero: String(player.numero),

      posicion: player.posicion,

      foto: player.foto,

      edad: String(player.edad),
      altura: String(player.altura),
      peso: String(player.peso),

      pie: player.pie,

      descripcion: player.descripcion,
    });
  }

  function handlePositionChange(
    position: PlayerPosition,
  ) {
    setForm({
      ...form,
      posicion: position,
    });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!form.nombre.trim()) {
      alert("Escribe el nombre del jugador.");
      return;
    }

    if (!form.numero) {
      alert("Escribe el número del jugador.");
      return;
    }

    const playerData = {
      nombre: form.nombre.trim(),

      slug:
        form.slug.trim() ||
        createSlug(form.nombre),

      numero: Number(form.numero),

      posicion: form.posicion,

      foto: form.foto,

      edad: Number(form.edad),

      altura: Number(form.altura),

      peso: Number(form.peso),

      pie: form.pie,

      descripcion:
        form.descripcion.trim(),
    };

    try {
      setLoading(true);

      if (selectedId) {
        await updatePlayer(
          selectedId,
          playerData,
        );

        alert("Jugador actualizado.");
      } else {
        await createPlayer(playerData);

        alert("Jugador creado.");
      }

      await loadPlayers();

      clearForm();

      setView("menu");
    } catch (error: unknown) {
      console.error(error);

      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error.";

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      {/* =========================
          ENCABEZADO
      ========================= */}

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[3px] text-zinc-400">
          ADMINISTRACIÓN
        </p>

        <h1 className="mt-1 text-4xl font-black sm:text-5xl">
          JUGADORES
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
            👤 Jugadores
          </Link>

          <Link
            href="/admin/partidos"
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
              Administrar jugadores
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Selecciona qué quieres hacer.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* AGREGAR */}

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
                Agregar jugador
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Registra un nuevo jugador en la plantilla.
              </p>
            </button>

            {/* EDITAR */}

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
                Editar jugador
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Selecciona un jugador existente para modificar sus datos.
              </p>
            </button>
          </div>
        </section>
      )}

      {/* =========================
          AGREGAR JUGADOR
      ========================= */}

      {view === "add" && (
        <section>
          <button
            type="button"
            onClick={goToMenu}
            className="mb-6 text-sm font-bold text-zinc-500 transition hover:text-black"
          >
            ← Volver a jugadores
          </button>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8"
          >
            <div>
              <h2 className="text-2xl font-black">
                Agregar jugador
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Completa los datos del nuevo jugador.
              </p>
            </div>

            <PlayerFields
              form={form}
              setForm={setForm}
              handlePositionChange={handlePositionChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-black
                px-8
                py-3
                font-bold
                text-white
                transition
                hover:bg-zinc-800
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Guardando..."
                : "Guardar jugador"}
            </button>
          </form>
        </section>
      )}

      {/* =========================
          EDITAR JUGADOR
      ========================= */}

      {view === "edit" && !selectedId && (
        <section>
          <button
            type="button"
            onClick={goToMenu}
            className="mb-6 text-sm font-bold text-zinc-500 transition hover:text-black"
          >
            ← Volver a jugadores
          </button>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black">
                  Editar jugador
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Selecciona el jugador que quieres modificar.
                </p>
              </div>

              <span className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-bold text-zinc-500">
                {players.length}
              </span>
            </div>

            <div className="grid gap-3">
              {players.length === 0 ? (
                <p className="rounded-lg bg-zinc-50 px-4 py-8 text-center text-zinc-500">
                  No hay jugadores registrados.
                </p>
              ) : (
                players.map((player) => (
                  <button
                    key={player.id}
                    type="button"
                    onClick={() => loadPlayer(player)}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      rounded-xl
                      border
                      border-zinc-200
                      p-4
                      text-left
                      transition
                      hover:bg-zinc-50
                    "
                  >
                    <div className="min-w-0">
                      <h3 className="truncate font-bold">
                        {player.nombre}
                      </h3>

                      <p className="text-sm text-zinc-500">
                        #{player.numero} ·{" "}
                        {player.posicion}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg bg-black px-4 py-2 text-sm font-bold text-white">
                      Editar
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* =========================
          FORMULARIO DE EDICIÓN
      ========================= */}

      {view === "edit" && selectedId && (
        <section>
          <button
            type="button"
            onClick={() => {
              setSelectedId(null);
            }}
            className="mb-6 text-sm font-bold text-zinc-500 transition hover:text-black"
          >
            ← Volver a jugadores
          </button>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8"
          >
            <div>
              <h2 className="text-2xl font-black">
                Editar jugador
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Modifica los datos del jugador.
              </p>
            </div>

            <PlayerFields
              form={form}
              setForm={setForm}
              handlePositionChange={handlePositionChange}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={loading}
                className="
                  rounded-xl
                  bg-black
                  px-8
                  py-3
                  font-bold
                  text-white
                  transition
                  hover:bg-zinc-800
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Guardando..."
                  : "Actualizar jugador"}
              </button>

              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="
                  rounded-xl
                  border
                  border-zinc-300
                  px-8
                  py-3
                  font-bold
                  text-black
                  transition
                  hover:bg-zinc-100
                "
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}

/* =========================
   CAMPOS DEL JUGADOR
========================= */

function PlayerFields({
  form,
  setForm,
  handlePositionChange,
}: {
  form: PlayerForm;
  setForm: React.Dispatch<
    React.SetStateAction<PlayerForm>
  >;
  handlePositionChange: (
    position: PlayerPosition,
  ) => void;
}) {
  return (
    <>
      {/* NOMBRE */}

      <Input
        label="Nombre"
        value={form.nombre}
        onChange={(value) =>
          setForm({
            ...form,
            nombre: value,
            slug: createSlug(value),
          })
        }
      />

      {/* NÚMERO */}

      <Input
        label="Número"
        type="number"
        min="0"
        value={form.numero}
        onChange={(value) =>
          setForm({
            ...form,
            numero: value,
          })
        }
      />

      {/* POSICIÓN */}

      <div>
        <label className="mb-2 block font-semibold">
          Posición
        </label>

        <select
          value={form.posicion}
          onChange={(event) =>
            handlePositionChange(
              event.target.value as PlayerPosition,
            )
          }
          className="
            w-full
            rounded-lg
            border
            border-zinc-300
            bg-white
            p-3
            text-black
            outline-none
            focus:border-black
          "
        >
          <optgroup label="OFFENSE">
            {OFFENSE_POSITIONS.map(
              (position) => (
                <option
                  key={position}
                  value={position}
                >
                  {position}
                </option>
              ),
            )}
          </optgroup>

          <optgroup label="DEFENSE">
            {DEFENSE_POSITIONS.map(
              (position) => (
                <option
                  key={position}
                  value={position}
                >
                  {position}
                </option>
              ),
            )}
          </optgroup>
        </select>
      </div>

      {/* FOTO */}

      <ImageUpload
        value={form.foto}
        onChange={(url) =>
          setForm({
            ...form,
            foto: url,
          })
        }
      />

      {/* DATOS */}

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Edad"
          type="number"
          min="0"
          value={form.edad}
          onChange={(value) =>
            setForm({
              ...form,
              edad: value,
            })
          }
        />

        <Input
          label="Altura (cm)"
          type="number"
          min="0"
          value={form.altura}
          onChange={(value) =>
            setForm({
              ...form,
              altura: value,
            })
          }
        />

        <Input
          label="Peso (kg)"
          type="number"
          min="0"
          value={form.peso}
          onChange={(value) =>
            setForm({
              ...form,
              peso: value,
            })
          }
        />

        <Select
          label="Pie hábil"
          value={form.pie}
          options={[
            "Derecho",
            "Izquierdo",
          ]}
          onChange={(value) =>
            setForm({
              ...form,
              pie:
                value as
                  | "Derecho"
                  | "Izquierdo",
            })
          }
        />
      </div>

      {/* LEMA */}

      <div>
        <label className="mb-2 block font-semibold">
          Lema
        </label>

        <textarea
          rows={4}
          value={form.descripcion}
          onChange={(event) =>
            setForm({
              ...form,
              descripcion:
                event.target.value,
            })
          }
          placeholder="Escribe el lema del jugador..."
          className="
            w-full
            rounded-lg
            border
            border-zinc-300
            bg-white
            p-3
            text-black
            outline-none
            focus:border-black
          "
        />
      </div>
    </>
  );
}

/* =========================
   INPUT
========================= */

function Input({
  label,
  value,
  onChange,
  type = "text",
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
}) {
  return (
    <div>
      <label className="mb-2 block font-semibold">
        {label}
      </label>

      <input
        type={type}
        min={min}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          rounded-lg
          border
          border-zinc-300
          bg-white
          p-3
          text-black
          outline-none
          focus:border-black
        "
      />
    </div>
  );
}

/* =========================
   SELECT
========================= */

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: string[];
}) {
  const values = options ?? [];

  return (
    <div>
      <label className="mb-2 block font-semibold">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          rounded-lg
          border
          border-zinc-300
          bg-white
          p-3
          text-black
          outline-none
          focus:border-black
        "
      >
        {values.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}