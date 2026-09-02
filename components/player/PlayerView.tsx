"use client";

import { useRef, useState } from "react";

import PlayerCard from "@/components/shares/templates/PlayerCard";

interface Props {
  player: any;
  children: React.ReactNode;
}

export default function PlayerView({
  player,
  children,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [generating, setGenerating] =
    useState(false);

  function isMobileDevice() {
    const mobileUserAgent =
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent,
      );

    const touchIPad =
      navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1;

    return mobileUserAgent || touchIPad;
  }

  function safeFileName(name: string) {
    return (
      name
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "jugador"
    );
  }

  async function waitForImages(
    container: HTMLElement,
  ) {
    const images = Array.from(
      container.querySelectorAll<HTMLImageElement>("img"),
    );

    await Promise.all(
      images.map(async (image) => {
        if (!image.complete) {
          await new Promise<void>((resolve) => {
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
        }

        try {
          await image.decode();
        } catch {
          // Safari puede fallar aunque la imagen ya esté cargada.
        }
      }),
    );
  }

  async function generateCardDataUrl() {
    if (!cardRef.current) {
      throw new Error(
        "No se encontró la tarjeta.",
      );
    }

    const { domToPng } = await import(
      "modern-screenshot"
    );

    await document.fonts.ready;
    await waitForImages(cardRef.current);

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
    });

    return domToPng(cardRef.current, {
      width: 1080,
      height: 1350,
      scale: 1,
      backgroundColor: "transparent",
    });
  }

  async function shareMobileCard(
    dataUrl: string,
  ) {
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    const file = new File(
      [blob],
      `${safeFileName(player.nombre)}.png`,
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

    const imageUrl =
      URL.createObjectURL(blob);

    window.location.href = imageUrl;

    window.setTimeout(() => {
      URL.revokeObjectURL(imageUrl);
    }, 120000);
  }

  function downloadDesktopCard(
    dataUrl: string,
  ) {
    const link =
      document.createElement("a");

    link.href = dataUrl;
    link.download = `${safeFileName(
      player.nombre,
    )}.png`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function downloadCard() {
    if (generating) return;

    try {
      setGenerating(true);

      const dataUrl =
        await generateCardDataUrl();

      if (isMobileDevice()) {
        await shareMobileCard(dataUrl);
      } else {
        downloadDesktopCard(dataUrl);
      }
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

      alert(
        "No se pudo generar la tarjeta.",
      );
    } finally {
      setGenerating(false);
    }
  }

  return (
    <>
      {children}

      {/* BOTÓN DE COMPARTIR OCULTO POR AHORA */}
      <button
        type="button"
        disabled={generating}
        onClick={() => void downloadCard()}
        className="hidden"
      >
        {generating
          ? "Generando..."
          : "Compartir"}
      </button>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-2000px] top-0 -z-10"
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
            porteriasCero={
              player.porterias_cero ?? 0
            }
          />
        </div>
      </div>
    </>
  );
}