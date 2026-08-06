"use client";

import { useState } from "react";

import ImageUpload from "./ImageUpload";

interface PlayerFormData {
  nombre: string;
  slug: string;
  numero: string;
  posicion: string;
  foto: string;
  edad: string;
  altura: string;
  peso: string;
  pie: string;
  descripcion: string;
}

interface Props {
  initialValues?: PlayerFormData;
  loading?: boolean;
  onSubmit: (player: PlayerFormData) => Promise<void>;
}

function createSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function PlayerForm({
  initialValues,
  loading = false,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<PlayerFormData>(
    initialValues ?? {
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
    }
  );

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <Input
        label="Nombre"
        value={form.nombre}
onChange={(v: string) =>
  setForm({
    ...form,
    numero: v,
  })
}
      />

      <Input
        label="Número"
        type="number"
        value={form.numero}
        onChange={(v: string) =>
  setForm({
    ...form,
    numero: v,
  })
}
      />

      <Select
        label="Posición"
        value={form.posicion}
       onChange={(v: string) =>
  setForm({
    ...form,
    numero: v,
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
      onChange={(v: string) =>
  setForm({
    ...form,
    numero: v,
  })
}
      />

      <Input
        label="Altura"
        type="number"
        value={form.altura}
        onChange={(v: string) =>
  setForm({
    ...form,
    numero: v,
  })
}
      />

      <Input
        label="Peso"
        type="number"
        value={form.peso}
        onChange={(v: string) =>
  setForm({
    ...form,
    numero: v,
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
        onChange={(v: string) =>
  setForm({
    ...form,
    numero: v,
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
        className="rounded-xl bg-black px-8 py-3 text-white"
      >
        {loading
          ? "Guardando..."
          : "Guardar jugador"}
      </button>

    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: any) {
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
}: any) {
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
        {values.map((v: string) => (
          <option key={v}>
            {v}
          </option>
        ))}
      </select>

    </div>
  );
}   