"use client";

import { useEffect, useState } from "react";

const NOVEDADES_VERSION = "1";

export default function NewsModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seenVersion = localStorage.getItem(
      "martincitas_novedades"
    );

    if (seenVersion !== NOVEDADES_VERSION) {
      setShow(true);
    }
  }, []);

  function closeModal() {
    localStorage.setItem(
      "martincitas_novedades",
      NOVEDADES_VERSION
    );

    setShow(false);
  }

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ENCABEZADO */}

        <div className="bg-black px-6 py-5 text-white">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-zinc-400">
                MARTINCITAS
              </p>

              <h2 className="mt-1 text-2xl font-black">
                NOVEDADES
              </h2>
            </div>

            <span className="rounded-md bg-yellow-400 px-2 py-1 text-[10px] font-black text-black">
              NUEVO
            </span>

          </div>

        </div>

        {/* CONTENIDO */}

        <div className="space-y-4 px-6 py-6">

          <div className="flex gap-3">

            <div className="mt-1 text-lg">
              📊
            </div>

            <div>
              <p className="font-black">
                Nueva tabla
              </p>

              <p className="text-sm text-zinc-500">
                Ya puedes consultar la tabla
                de posiciones actualizada.
              </p>
            </div>

          </div>

          <div className="flex gap-3">

            <div className="mt-1 text-lg">
              📋
            </div>

            <div>
              <p className="font-black">
                Tabla histórica
              </p>

              <p className="text-sm text-zinc-500">
                Cada resultado ahora muestra
                cómo estaba la tabla en esa jornada.
              </p>
            </div>

          </div>

        </div>

        {/* BOTÓN */}

        <div className="border-t border-zinc-100 px-6 py-4">

          <button
            type="button"
            onClick={closeModal}
            className="w-full rounded-xl bg-black px-4 py-3 text-sm font-black text-white transition hover:bg-zinc-800"
          >
            ENTENDIDO
          </button>

        </div>

      </div>

    </div>
  );
}