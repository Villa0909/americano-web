"use client";

import { useEffect, useState } from "react";

import {
  createMatch,
  getMatches,
  updateMatch,
  deleteMatch,
  type Match,
} from "@/lib/matches";

interface FormState {
  rival: string;
  fecha: string;
  torneo: string;
  goles_favor: string;
  goles_contra: string;
  local: boolean;
  escudo_rival: string;
  ubicacion: string;
ubicacion_url: string;
}

const initialForm: FormState = {
  rival: "",
  fecha: "",
  torneo: "",
  goles_favor: "",
  goles_contra: "",
  local: true,
  escudo_rival: "",
  ubicacion: "",
ubicacion_url: "",
};

export default function MatchForm() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const [form, setForm] =
    useState<FormState>(initialForm);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    void loadMatches();
  }, []);

  async function loadMatches() {
    try {
      const data = await getMatches();
      setMatches(data);
    } catch (error) {
      console.error(error);
      alert("No se pudieron cargar los partidos.");
    }
  }

  function clearForm() {
    setSelectedId(null);
    setForm(initialForm);
  }

  function loadMatch(match: Match) {
    setSelectedId(match.id);

    setForm({
      rival: match.rival,
      fecha: formatDateForInput(match.fecha),
      torneo: match.torneo ?? "",
      goles_favor:
        match.goles_favor === null
          ? ""
          : String(match.goles_favor),
      goles_contra:
        match.goles_contra === null
          ? ""
          : String(match.goles_contra),
      local: match.local,
      escudo_rival:
        match.escudo_rival ?? "",
        ubicacion: match.ubicacion ?? "",
ubicacion_url: match.ubicacion_url ?? "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!form.rival.trim()) {
      alert("Escribe el nombre del rival.");
      return;
    }

    if (!form.fecha) {
      alert("Selecciona la fecha.");
      return;
    }

    const golesFavor =
      form.goles_favor === ""
        ? null
        : Number(form.goles_favor);

    const golesContra =
      form.goles_contra === ""
        ? null
        : Number(form.goles_contra);

    const hasFavor =
      golesFavor !== null;

    const hasContra =
      golesContra !== null;

    if (hasFavor !== hasContra) {
      alert(
        "Escribe ambos marcadores o deja ambos vacíos.",
      );

      return;
    }

    let resultado: string | null = null;

    if (
      golesFavor !== null &&
      golesContra !== null
    ) {
      if (golesFavor > golesContra) {
        resultado = "Victoria";
      } else if (golesFavor < golesContra) {
        resultado = "Derrota";
      } else {
        resultado = "Empate";
      }
    }

    const matchData = {
      rival: form.rival.trim(),
      fecha: new Date(form.fecha).toISOString(),
      torneo: form.torneo.trim(),
      goles_favor: golesFavor,
      goles_contra: golesContra,
      local: form.local,
      resultado,
      escudo_rival:
        form.escudo_rival.trim() || null,
        ubicacion: form.ubicacion.trim() || null,
ubicacion_url: form.ubicacion_url.trim() || null,
    };

    try {
      setLoading(true);

      if (selectedId !== null) {
        await updateMatch(
          selectedId,
          matchData,
        );

        alert("Partido actualizado.");
      } else {
        await createMatch(matchData);

        alert("Partido creado.");
      }

      clearForm();
      await loadMatches();
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ??
          "No se pudo guardar el partido.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "¿Seguro que quieres eliminar este partido?",
    );

    if (!confirmed) return;

    try {
      await deleteMatch(id);

      if (selectedId === id) {
        clearForm();
      }

      await loadMatches();

      alert("Partido eliminado.");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ??
          "No se pudo eliminar el partido.",
      );
    }
  }

  return (
    <section className="space-y-10">
      {/* Formulario */}

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">
              {selectedId
                ? "Editar partido"
                : "Nuevo partido"}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Agrega el rival, la fecha y el marcador.
            </p>
          </div>

          {selectedId && (
            <button
              type="button"
              onClick={clearForm}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-bold"
            >
              Cancelar edición
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2"
        >
          <Input
            label="Rival"
            value={form.rival}
            onChange={(value) =>
              setForm({
                ...form,
                rival: value,
              })
            }
          />

          <Input
            label="Torneo"
            value={form.torneo}
            onChange={(value) =>
              setForm({
                ...form,
                torneo: value,
              })
            }
          />

         <Input
  label="Fecha y hora"
  type="datetime-local"
  value={form.fecha}
  onChange={(value) =>
    setForm({
      ...form,
      fecha: value,
    })
  }
/>

<Input
  label="Archivo del escudo"
  placeholder="olympia.png"
  value={form.escudo_rival}
  onChange={(value) =>
    setForm({
      ...form,
      escudo_rival: value,
    })
  }
/>

<Input
  label="Ubicación"
  placeholder="Unidad Deportiva Revolución"
  value={form.ubicacion}
  onChange={(value) =>
    setForm({
      ...form,
      ubicacion: value,
    })
  }
/>

<Input
  label="Enlace de Google Maps"
  placeholder="https://maps.google.com/..."
  value={form.ubicacion_url}
  onChange={(value) =>
    setForm({
      ...form,
      ubicacion_url: value,
    })
  }
/>

          <Input
            label="Goles Martincitas"
            type="number"
            min="0"
            value={form.goles_favor}
            onChange={(value) =>
              setForm({
                ...form,
                goles_favor: value,
              })
            }
          />

          <Input
            label="Goles rival"
            type="number"
            min="0"
            value={form.goles_contra}
            onChange={(value) =>
              setForm({
                ...form,
                goles_contra: value,
              })
            }
          />

          <label className="flex items-center gap-3 rounded-xl border border-zinc-200 p-4 md:col-span-2">
            <input
              type="checkbox"
              checked={form.local}
              onChange={(event) =>
                setForm({
                  ...form,
                  local: event.target.checked,
                })
              }
              className="h-5 w-5"
            />

            <div>
              <p className="font-bold">
                Martincitas es local
              </p>

              <p className="text-sm text-zinc-500">
                Desactívalo cuando el partido sea de visitante.
              </p>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-black px-6 py-3 font-bold text-white disabled:opacity-50 md:col-span-2"
          >
            {loading
              ? "Guardando..."
              : selectedId
                ? "Actualizar partido"
                : "Crear partido"}
          </button>
        </form>
      </div>

      {/* Partidos guardados */}

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black">
          Partidos guardados
        </h2>

        <div className="mt-6 space-y-3">
          {matches.length === 0 ? (
            <p className="rounded-xl bg-zinc-50 px-4 py-8 text-center text-zinc-500">
              No hay partidos registrados.
            </p>
          ) : (
            matches.map((match) => {
              const played =
                match.goles_favor !== null &&
                match.goles_contra !== null;

              return (
                <article
                  key={match.id}
                  className="flex flex-col gap-4 rounded-xl border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-lg font-black">
                      Martincitas{" "}
                      {played
                        ? `${match.goles_favor} - ${match.goles_contra}`
                        : "vs."}{" "}
                      {match.rival}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {new Date(
                        match.fecha,
                      ).toLocaleString("es-MX", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {match.torneo || "Sin torneo"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        loadMatch(match)
                      }
                      className="rounded-lg bg-black px-4 py-2 text-sm font-bold text-white"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        void handleDelete(match.id)
                      }
                      className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  min?: string;
}) {
  return (
    <div>
      <label className="mb-2 block font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        min={min}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-black outline-none focus:border-black"
      />
    </div>
  );
}

function formatDateForInput(date: string) {
  const value = new Date(date);

  const offset =
    value.getTimezoneOffset() * 60_000;

  return new Date(
    value.getTime() - offset,
  )
    .toISOString()
    .slice(0, 16);
}