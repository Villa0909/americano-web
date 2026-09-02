"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  createStandingMatch,
  getTeams,
  type Team,
} from "@/lib/standings";

interface PartidoForm {
  id: number;
  equipo_local_id: string;
  equipo_visitante_id: string;
  goles_local: string;
  goles_visitante: string;
}

interface JornadaForm {
  jornada: string;
  partidos: PartidoForm[];
}

const SIN_RIVAL = "sin-rival";

const createPartido = (): PartidoForm => ({
  id: Date.now() + Math.random(),

  equipo_local_id: "",

  equipo_visitante_id: "",

  goles_local: "0",

  goles_visitante: "0",
});

export default function AdminTablaPage() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [form, setForm] =
    useState<JornadaForm>({
      jornada: "",
      partidos: [createPartido()],
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [openMatchId, setOpenMatchId] =
    useState<number | null>(
      form.partidos[0]?.id ?? null
    );

  useEffect(() => {
    void loadTeams();
  }, []);

  async function loadTeams() {
    try {
      setLoading(true);

      const data = await getTeams();

      setTeams(data);
    } catch (error) {
      console.error(error);

      alert(
        "No se pudieron cargar los equipos."
      );
    } finally {
      setLoading(false);
    }
  }

  function updatePartido(
    id: number,
    field: keyof Omit<PartidoForm, "id">,
    value: string
  ) {
    setForm((current) => ({
      ...current,

      partidos: current.partidos.map(
        (partido) => {
          if (partido.id !== id) {
            return partido;
          }

          const updated = {
            ...partido,
            [field]: value,
          };

          /*
           * SIN RIVAL
           *
           * Automáticamente 3-0.
           */

          if (
            field ===
              "equipo_visitante_id" &&
            value === SIN_RIVAL
          ) {
            updated.goles_local = "3";

            updated.goles_visitante = "0";
          }

          /*
           * Si quitamos SIN RIVAL,
           * volvemos al resultado normal.
           */

          if (
            field ===
              "equipo_visitante_id" &&
            value !== SIN_RIVAL &&
            partido.equipo_visitante_id ===
              SIN_RIVAL
          ) {
            updated.goles_local = "0";

            updated.goles_visitante = "0";
          }

          return updated;
        }
      ),
    }));
  }

  function addPartido() {
    const nuevo = createPartido();

    setForm((current) => ({
      ...current,

      partidos: [
        ...current.partidos,
        nuevo,
      ],
    }));

    setOpenMatchId(nuevo.id);
  }

  function removePartido(id: number) {
    setForm((current) => {
      const nuevosPartidos =
        current.partidos.filter(
          (partido) =>
            partido.id !== id
        );

      return {
        ...current,

        partidos:
          nuevosPartidos.length > 0
            ? nuevosPartidos
            : [createPartido()],
      };
    });

    setOpenMatchId((currentOpen) => {
      if (currentOpen !== id) {
        return currentOpen;
      }

      const restantes =
        form.partidos.filter(
          (partido) =>
            partido.id !== id
        );

      return (
        restantes[0]?.id ?? null
      );
    });
  }

  function getTeam(id: string) {
    return teams.find(
      (team) =>
        String(team.id) === id
    );
  }

  function isTeamUsed(
    teamId: number,
    currentPartidoId: number
  ) {
    return form.partidos.some(
      (partido) => {
        if (
          partido.id ===
          currentPartidoId
        ) {
          return false;
        }

        return (
          Number(
            partido.equipo_local_id
          ) === teamId ||
          Number(
            partido.equipo_visitante_id
          ) === teamId
        );
      }
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.jornada) {
      alert(
        "Escribe el número de jornada."
      );

      return;
    }

    if (form.partidos.length === 0) {
      alert(
        "Agrega al menos un partido."
      );

      return;
    }

    /*
     * VALIDAR PARTIDOS
     */

    for (
      let i = 0;
      i < form.partidos.length;
      i++
    ) {
      const partido =
        form.partidos[i];

      /*
       * Equipo local obligatorio.
       */

      if (
        !partido.equipo_local_id
      ) {
        alert(
          `Selecciona el equipo local del partido ${
            i + 1
          }.`
        );

        setOpenMatchId(
          partido.id
        );

        return;
      }

      /*
       * Visitante puede ser:
       *
       * equipo real
       * o SIN RIVAL
       */

      if (
        !partido.equipo_visitante_id
      ) {
        alert(
          `Selecciona el equipo visitante o "Sin rival" del partido ${
            i + 1
          }.`
        );

        setOpenMatchId(
          partido.id
        );

        return;
      }

      /*
       * Partido normal.
       */

      if (
        partido.equipo_visitante_id !==
          SIN_RIVAL &&
        partido.equipo_local_id ===
          partido.equipo_visitante_id
      ) {
        alert(
          `El partido ${
            i + 1
          } no puede tener al mismo equipo como local y visitante.`
        );

        setOpenMatchId(
          partido.id
        );

        return;
      }

      /*
       * Si es SIN RIVAL,
       * debe ser 3-0.
       */

      if (
        partido.equipo_visitante_id ===
        SIN_RIVAL
      ) {
        if (
          partido.goles_local !== "3" ||
          partido.goles_visitante !== "0"
        ) {
          alert(
            `El partido ${
              i + 1
            } contra "Sin rival" debe ser 3-0.`
          );

          setOpenMatchId(
            partido.id
          );

          return;
        }

        continue;
      }

      /*
       * Partido normal:
       * validar resultado.
       */

      if (
        partido.goles_local === "" ||
        partido.goles_visitante === ""
      ) {
        alert(
          `Completa el resultado del partido ${
            i + 1
          }.`
        );

        setOpenMatchId(
          partido.id
        );

        return;
      }

      if (
        Number(partido.goles_local) <
          0 ||
        Number(
          partido.goles_visitante
        ) < 0
      ) {
        alert(
          `El resultado del partido ${
            i + 1
          } no puede ser negativo.`
        );

        setOpenMatchId(
          partido.id
        );

        return;
      }
    }

    /*
     * EQUIPOS REPETIDOS
     *
     * SIN RIVAL no cuenta como equipo.
     */

    const equiposUsados =
      new Set<number>();

    for (const partido of form.partidos) {
      const local = Number(
        partido.equipo_local_id
      );

      if (equiposUsados.has(local)) {
        alert(
          "Hay un equipo repetido en esta jornada."
        );

        return;
      }

      equiposUsados.add(local);

      if (
        partido.equipo_visitante_id !==
        SIN_RIVAL
      ) {
        const visitante =
          Number(
            partido.equipo_visitante_id
          );

        if (
          equiposUsados.has(
            visitante
          )
        ) {
          alert(
            "Hay un equipo repetido en esta jornada."
          );

          return;
        }

        equiposUsados.add(
          visitante
        );
      }
    }

    try {
      setSaving(true);

      /*
       * GUARDAR JORNADA
       */

      for (const partido of form.partidos) {
        await createStandingMatch({
          jornada: Number(
            form.jornada
          ),

          equipo_local_id:
            Number(
              partido.equipo_local_id
            ),

          /*
           * SIN RIVAL = NULL
           */

          equipo_visitante_id:
            partido.equipo_visitante_id ===
            SIN_RIVAL
              ? null
              : Number(
                  partido.equipo_visitante_id
                ),

          goles_local:
            Number(
              partido.goles_local
            ),

          goles_visitante:
            Number(
              partido.goles_visitante
            ),
        });
      }

      alert(
        `Jornada ${form.jornada} guardada correctamente.`
      );

      const nuevo =
        createPartido();

      setForm({
        jornada: "",
        partidos: [nuevo],
      });

      setOpenMatchId(
        nuevo.id
      );
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ??
          "No se pudo guardar la jornada."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8">

      <div className="mx-auto max-w-5xl">
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
      📊 Tabla
    </Link>
  </div>
</nav>

        <div className="mb-8">

          <h1 className="text-3xl font-black">
            Tabla
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Crea una jornada y registra
            todos sus partidos.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* JORNADA */}

          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">

            <label className="mb-2 block text-sm font-bold uppercase tracking-wider text-zinc-500">
              Jornada
            </label>

            <input
              type="number"
              min="1"
              value={form.jornada}
              onChange={(event) =>
                setForm(
                  (current) => ({
                    ...current,
                    jornada:
                      event.target
                        .value,
                  })
                )
              }
              placeholder="Ej. 1"
              className="w-full max-w-xs rounded-xl border border-zinc-300 bg-white p-3 text-lg font-bold outline-none focus:border-black"
            />

          </section>

          {/* PARTIDOS */}

          <div className="space-y-3">

            {form.partidos.map(
              (
                partido,
                index
              ) => {
                const isOpen =
                  openMatchId ===
                  partido.id;

                const local =
                  getTeam(
                    partido.equipo_local_id
                  );

                const visitante =
                  getTeam(
                    partido.equipo_visitante_id
                  );

                const sinRival =
                  partido.equipo_visitante_id ===
                  SIN_RIVAL;

                return (
                  <section
                    key={
                      partido.id
                    }
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
                  >

                    {/* CABECERA */}

                    <button
                      type="button"
                      onClick={() =>
                        setOpenMatchId(
                          isOpen
                            ? null
                            : partido.id
                        )
                      }
                      className="w-full"
                    >

                      <div className="flex items-center justify-between gap-4 p-4">

                        <div className="flex min-w-0 flex-1 items-center justify-center gap-3">

                          <TeamLogo
                            team={local}
                          />

                          <span className="max-w-[120px] truncate text-sm font-bold sm:max-w-none">
                            {local?.nombre ??
                              "Local"}
                          </span>

                          <span className="shrink-0 text-lg font-black">
                            {
                              partido.goles_local
                            }
                            {" - "}
                            {
                              partido.goles_visitante
                            }
                          </span>

                          <span className="max-w-[120px] truncate text-sm font-bold sm:max-w-none">
                            {sinRival
                              ? "Sin rival"
                              : visitante?.nombre ??
                                "Visitante"}
                          </span>

                          <TeamLogo
                            team={
                              sinRival
                                ? undefined
                                : visitante
                            }
                          />

                        </div>

                        <span className="shrink-0 text-zinc-400">
                          {isOpen
                            ? "⌃"
                            : "⌄"}
                        </span>

                      </div>

                    </button>

                    {/* CONTENIDO */}

                    {isOpen && (
                      <div className="border-t border-zinc-100 p-5">

                        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-end">

                          {/* LOCAL */}

                          <div>

                            <label className="mb-2 block text-sm font-bold">
                              Equipo local
                            </label>

                            <select
                              value={
                                partido.equipo_local_id
                              }
                              onChange={(
                                event
                              ) =>
                                updatePartido(
                                  partido.id,
                                  "equipo_local_id",
                                  event
                                    .target
                                    .value
                                )
                              }
                              className="w-full rounded-xl border border-zinc-300 bg-white p-3 font-semibold outline-none focus:border-black"
                            >

                              <option value="">
                                Seleccionar equipo
                              </option>

                              {teams.map(
                                (
                                  team
                                ) => (
                                  <option
                                    key={
                                      team.id
                                    }
                                    value={
                                      team.id
                                    }
                                    disabled={isTeamUsed(
                                      team.id,
                                      partido.id
                                    )}
                                  >
                                    {
                                      team.nombre
                                    }
                                  </option>
                                )
                              )}

                            </select>

                          </div>

                          {/* RESULTADO */}

                          <div>

                            <label className="mb-2 block text-center text-sm font-bold">
                              Resultado
                            </label>

                            <div className="flex items-center gap-2">

                              <input
                                type="number"
                                min="0"
                                value={
                                  partido.goles_local
                                }
                                disabled={
                                  sinRival
                                }
                                onChange={(
                                  event
                                ) =>
                                  updatePartido(
                                    partido.id,
                                    "goles_local",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className="w-20 rounded-xl border border-zinc-300 p-3 text-center text-xl font-black outline-none focus:border-black disabled:bg-zinc-100 disabled:text-zinc-500"
                              />

                              <span className="text-xl font-black text-zinc-400">
                                -
                              </span>

                              <input
                                type="number"
                                min="0"
                                value={
                                  partido.goles_visitante
                                }
                                disabled={
                                  sinRival
                                }
                                onChange={(
                                  event
                                ) =>
                                  updatePartido(
                                    partido.id,
                                    "goles_visitante",
                                    event
                                      .target
                                      .value
                                  )
                                }
                                className="w-20 rounded-xl border border-zinc-300 p-3 text-center text-xl font-black outline-none focus:border-black disabled:bg-zinc-100 disabled:text-zinc-500"
                              />

                            </div>

                            {sinRival && (
                              <p className="mt-2 text-center text-xs font-semibold text-zinc-400">
                                Victoria automática
                                3-0
                              </p>
                            )}

                          </div>

                          {/* VISITANTE */}

                          <div>

                            <label className="mb-2 block text-sm font-bold">
                              Equipo visitante
                            </label>

                            <select
                              value={
                                partido.equipo_visitante_id
                              }
                              onChange={(
                                event
                              ) =>
                                updatePartido(
                                  partido.id,
                                  "equipo_visitante_id",
                                  event
                                    .target
                                    .value
                                )
                              }
                              className="w-full rounded-xl border border-zinc-300 bg-white p-3 font-semibold outline-none focus:border-black"
                            >

                              <option value="">
                                Seleccionar equipo
                              </option>

                              <option value={SIN_RIVAL}>
                                SIN RIVAL
                              </option>

                              {teams.map(
                                (
                                  team
                                ) => (
                                  <option
                                    key={
                                      team.id
                                    }
                                    value={
                                      team.id
                                    }
                                    disabled={isTeamUsed(
                                      team.id,
                                      partido.id
                                    )}
                                  >
                                    {
                                      team.nombre
                                    }
                                  </option>
                                )
                              )}

                            </select>

                          </div>

                        </div>

                        {/* ELIMINAR */}

                        {form.partidos.length >
                          1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removePartido(
                                partido.id
                              )
                            }
                            className="mt-5 text-sm font-bold text-red-600 hover:underline"
                          >
                            Eliminar partido
                          </button>
                        )}

                      </div>
                    )}

                  </section>
                );
              }
            )}

          </div>

          {/* AGREGAR */}

          <button
            type="button"
            onClick={addPartido}
            className="w-full rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-5 font-black text-zinc-600 transition hover:border-black hover:text-black"
          >
            + Agregar otro partido
          </button>

          {/* GUARDAR */}

          <button
            type="submit"
            disabled={
              saving || loading
            }
            className="w-full rounded-2xl bg-black px-6 py-4 text-lg font-black text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Guardando jornada..."
              : "Guardar jornada"}
          </button>

        </form>

      </div>

    </main>
  );
}

/* =========================================================
   ESCUDO
========================================================= */

function TeamLogo({
  team,
}: {
  team?: Team;
}) {
  if (!team) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-400">
        ?
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-100">

      {team.escudo ? (
        <img
          src={team.escudo}
          alt={team.nombre}
          className="h-8 w-8 object-contain"
        />
      ) : (
        <span className="text-xs font-black text-zinc-400">
          ?
        </span>
      )}

    </div>
  );
}