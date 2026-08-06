"use client";

import { useRef, useState } from "react";

import PlayerCard from "@/components/shares/templates/PlayerCard";
import ShareModal from "@/components/share/ShareModal";

interface Props {
  player: any;
  children: React.ReactNode;
}

export default function PlayerView({
  player,
  children,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  function isMobileDevice() {
    const userAgent = navigator.userAgent;

    const mobileUserAgent =
      /Android|iPhone|iPad|iPod/i.test(userAgent);

    const touchIPad =
      navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1;

    return mobileUserAgent || touchIPad;
  }

  function safeFileName(name: string) {
    return (
      name
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "jugador"
    );
  }

  async function waitForImages(
    container: HTMLElement,
  ) {
    const images = Array.from(
      container.querySelectorAll("img"),
    );

    await Promise.all(
      images.map((image) => {
        if (image.complete) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          image.addEventListener(
            "load",
            () => resolve(),
            { once: true },
          );

          image.addEventListener(
            "error",
            () => resolve(),
            { once: true },
          );
        });
      }),
    );
  }

  async function downloadCard() {
  if (!cardRef.current) return;

  try {
    const { toPng } = await import("html-to-image");

    await document.fonts.ready;

    const dataUrl = await toPng(cardRef.current, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: "transparent",
    });

    const safeName =
      player.nombre
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "jugador";

    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent,
      );

    // TELÉFONO: menú nativo para compartir
    if (isMobile) {
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const file = new File(
        [blob],
        `${safeName}.png`,
        {
          type: "image/png",
        },
      );

      if (
        navigator.share &&
        navigator.canShare?.({
          files: [file],
        })
      ) {
        await navigator.share({
          files: [file],
          title: `Tarjeta de ${player.nombre}`,
        });

        return;
      }

      alert(
        "Este navegador no permite compartir la imagen directamente.",
      );

      return;
    }

    // PC: descarga directa
    const link = document.createElement("a");

    link.download = `${safeName}.png`;
    link.href = dataUrl;

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      return;
    }

    console.error(
      "No se pudo generar la tarjeta:",
      error,
    );

    alert("No se pudo generar la tarjeta.");
  }
}

  return (
    <>
      {children}

      {/* Botón compartir */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-4 z-40 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl active:scale-95 sm:bottom-8 sm:right-8 sm:rounded-xl sm:px-6 sm:text-base"
      >
        Compartir
      </button>

      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        player={player}
        onDownload={(type) => {
          switch (type) {
            case "player":
              downloadCard();
              break;

            case "mvp":
              alert("MVP próximamente");
              break;

            case "result":
              alert("Resultado próximamente");
              break;

            case "stats":
              alert(
                "Estadísticas próximamente",
              );
              break;
          }
        }}
      />

      {/* Tarjeta oculta para generar el PNG */}

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: -9999,
        }}
      >
        <div ref={cardRef}>
          <PlayerCard
            nombre={player.nombre}
            numero={player.numero}
            foto={player.foto}
            posicion={player.posicion}
            partidos={player.partidos}
            goles={player.goles}
            asistencias={player.asistencias}
            mvps={player.mvps ?? 0}
          />
        </div>
      </div>
    </>
  );
}