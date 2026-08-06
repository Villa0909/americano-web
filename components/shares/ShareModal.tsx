"use client";

import {
  Copy,
  Download,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  onDownload: () => void;
}

export default function ShareModal({
  open,
  title,
  onClose,
  onDownload,
}: Props) {
  if (!open) return null;

  async function copyLink() {
    await navigator.clipboard.writeText(
      window.location.href
    );

    alert("Enlace copiado.");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-black">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <X />
          </button>

        </div>

        <div className="mt-8 space-y-4">

          <button
            onClick={copyLink}
            className="flex w-full items-center gap-4 rounded-2xl border p-5 transition hover:bg-zinc-50"
          >

            <Copy className="h-6 w-6" />

            <div className="text-left">

              <p className="font-bold">
                Compartir enlace
              </p>

              <p className="text-sm text-zinc-500">
                Copia el enlace del partido o jugador.
              </p>

            </div>

          </button>

          <button
            onClick={onDownload}
            className="flex w-full items-center gap-4 rounded-2xl border p-5 transition hover:bg-zinc-50"
          >

            <Download className="h-6 w-6" />

            <div className="text-left">

              <p className="font-bold">
                Descargar imagen
              </p>

              <p className="text-sm text-zinc-500">
                Genera una tarjeta para compartir.
              </p>

            </div>

          </button>

        </div>

      </div>

    </div>
  );
}