"use client";

import { useEffect, useState } from "react";

import ImageUpload from "@/components/admin/ImageUpload";
import MatchForm from "@/components/admin/MatchForm";

import {
  createPlayer,
  getPlayers,
  updatePlayer,
} from "@/lib/players";

import type { Player } from "@/types/player";

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
  posicion:
    | "Portero"
    | "Defensa"
    | "Mediocampista"
    | "Delantero";
  foto: string;
  edad: string;
  altura: string;
  peso: string;
  pie: "Derecho" | "Izquierdo";
  descripcion: string;
  porterias_cero: string;
}

const initialForm: PlayerForm = {
  nombre: "",
  slug: "",
  numero: "",
  posicion: "Mediocampista",
  foto: "",
  edad: "",
  altura: "",
  peso: "",
  pie: "Derecho",
  descripcion: "",
  porterias_cero: "",
};

export default function AdminPage() {
  const [loading, setLoading] =
    useState(false);

  const [players, setPlayers] =
    useState<Player[]>([]);

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
      porterias_cero: String(
        player.porterias_cero ?? 0,
      ),
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

    const selectedPlayer =
      players.find(
        (player) =>
          player.id === selectedId,
      );

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

      /*
       * Conservamos sus MVP al editar.
       * Un jugador nuevo comienza en cero.
       */
      mvps: selectedPlayer?.mvps ?? 0,

      /*
       * Solo los porteros pueden tener
       * porterías a cero.
       */
      porterias_cero:
        form.posicion === "Portero"
          ? Number(
              form.porterias_cero || 0,
            )
          : 0,
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
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Encabezado */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-black sm:text-5xl">
          ADMIN PANEL
        </h1>

        <button
          type="button"
          onClick={clearForm}
          className="rounded-lg border border-zinc-300 px-5 py-2 font-semibold transition hover:bg-zinc-100"
        >
          Nuevo jugador
        </button>
      </div>

      {/* Partidos */}

      <section className="mb-20">
        <h2 className="mb-8 text-3xl font-black sm:text-4xl">
          PARTIDOS
        </h2>

        <MatchForm />
      </section>

      {/* Lista de jugadores */}

      <section className="mb-10 rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="mb-4 text-xl font-bold">
          Jugadores
        </h2>

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
                onClick={() =>
                  loadPlayer(player)
                }
                className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 p-4 text-left transition hover:bg-zinc-50"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-bold">
                    {player.nombre}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    #{player.numero} ·{" "}
                    {player.posicion}
                  </p>

                  {player.posicion ===
                    "Portero" &&
                    player.porterias_cero >
                      0 && (
                      <p className="mt-1 text-xs font-semibold text-zinc-600">
                        {
                          player.porterias_cero
                        }{" "}
                        porterías a cero
                      </p>
                    )}
                </div>

                <span className="shrink-0 rounded bg-black px-4 py-2 text-sm font-bold text-white">
                  Editar
                </span>
              </button>
            ))
          )}
        </div>
      </section>

      {/* Formulario de jugador */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <div>
          <h2 className="text-2xl font-black">
            {selectedId
              ? "Editar jugador"
              : "Nuevo jugador"}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Completa los datos del jugador.
          </p>
        </div>

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

        <Select
          label="Posición"
          value={form.posicion}
          onChange={(value) =>
            setForm({
              ...form,
              posicion:
                value as PlayerForm["posicion"],
            })
          }
        />

        {/* Solo aparece para porteros */}

        {form.posicion === "Portero" && (
          <Input
            label="Porterías a cero"
            type="number"
            min="0"
            value={form.porterias_cero}
            onChange={(value) =>
              setForm({
                ...form,
                porterias_cero: value,
              })
            }
          />
        )}

        <ImageUpload
          value={form.foto}
          onChange={(url) =>
            setForm({
              ...form,
              foto: url,
            })
          }
        />

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
                value as PlayerForm["pie"],
            })
          }
        />

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
            className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-black outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-8 py-3 font-bold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : selectedId
              ? "Actualizar jugador"
              : "Guardar jugador"}
        </button>
      </form>
    </main>
  );
}

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
        className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-black outline-none focus:border-black"
      />
    </div>
  );
}

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
  const values =
    options ?? [
      "Portero",
      "Defensa",
      "Mediocampista",
      "Delantero",
    ];

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
        className="w-full rounded-lg border border-zinc-300 bg-white p-3 text-black outline-none focus:border-black"
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