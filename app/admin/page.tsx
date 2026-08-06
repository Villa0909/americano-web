"use client";

import { useEffect, useState } from "react";

import ImageUpload from "@/components/admin/ImageUpload";

import {
  createPlayer,
  getPlayers,
  updatePlayer,
} from "@/lib/players";

import { Player } from "@/types/player";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  const [players, setPlayers] = useState<Player[]>([]);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [form, setForm] = useState({
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
  });

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    try {
      const data = await getPlayers();

      setPlayers(data);
    } catch (error) {
      console.error(error);
    }
  }

  function clearForm() {
    setSelectedId(null);

    setForm({
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
    });
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

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const player = {
  nombre: form.nombre,
  slug: form.slug,
  numero: Number(form.numero),
  posicion: form.posicion as
    | "Portero"
    | "Defensa"
    | "Mediocampista"
    | "Delantero",
  foto: form.foto,
  edad: Number(form.edad),
  altura: Number(form.altura),
  peso: Number(form.peso),
  pie: form.pie as
    | "Derecho"
    | "Izquierdo",
  descripcion: form.descripcion,
  mvps:0,
};

      if (selectedId) {
        await updatePlayer(
          selectedId,
          player
        );

        alert("Jugador actualizado.");
      } else {
        await createPlayer(player);

        alert("Jugador creado.");
      }

      await loadPlayers();

      clearForm();

    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ??
          "Ocurrió un error."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-8 py-12">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-5xl font-black">
          ADMIN PANEL
        </h1>

        <button
          type="button"
          onClick={clearForm}
          className="rounded-lg border px-5 py-2"
        >
          Nuevo jugador
        </button>

      </div>

      <div className="mb-10 rounded-xl border p-5">

        <h2 className="mb-4 text-xl font-bold">
          Jugadores
        </h2>

        <div className="grid gap-3">
          {players.map((player) => (
            <button
              key={player.id}
              type="button"
              onClick={() =>
                loadPlayer(player)
              }
              className="flex items-center justify-between rounded-lg border p-4 text-left hover:bg-zinc-50"
            >
              <div>
                <h3 className="font-bold">
                  {player.nombre}
                </h3>

                <p className="text-sm text-zinc-500">
                  #{player.numero} ·{" "}
                  {player.posicion}
                </p>
              </div>

              <span className="rounded bg-black px-4 py-2 text-sm text-white">
                Editar
              </span>
            </button>
          ))}
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >        <Input
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
              posicion: value,
            })
          }
        />

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
              pie: value,
            })
          }
        />

        <div>
          <label className="mb-2 block font-semibold">
            Descripción
          </label>

          <textarea
            rows={5}
            value={form.descripcion}
            onChange={(e) =>
              setForm({
                ...form,
                descripcion: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          disabled={loading}
          className="rounded-xl bg-black px-8 py-3 text-white hover:bg-zinc-800 disabled:opacity-50"
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border p-3"
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
    options ??
    [
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
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border p-3"
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