"use client";

import { useRef, useState } from "react";

import ResultCard from "@/components/shares/templates/ResultCard";

interface PlayerEvent {
  player_id: string;
  nombre: string;
  goles?: number;
  asistencias?: number;
}

interface Props {
  children: React.ReactNode;

  match: {
    id: number;
    rival: string;
    escudo_rival: string | null;
    torneo: string | null;
    goles_favor: number | null;
    goles_contra: number | null;
    fecha: string;
ubicacion: string | null;
  };

  goles: PlayerEvent[];
  asistencias: PlayerEvent[];
  mvp: {
    nombre: string;
  } | null;
}

export default function MatchView({
  children,
  match,
  goles,
  asistencias,
  mvp,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [generating, setGenerating] =
    useState(false);

  const played =
    match.goles_favor !== null &&
    match.goles_contra !== null;

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
        .replace(/^-|-$/g, "") || "resultado"
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
          // Safari puede fallar aquí aunque la imagen ya cargó.
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

  async function shareMobile(
    dataUrl: string,
  ) {
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    const file = new File(
      [blob],
      `martincitas-vs-${safeFileName(
        match.rival,
      )}.png`,
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
        title: `Martincitas vs ${match.rival}`,
      });

      return;
    }

    const imageUrl =
      URL.createObjectURL(blob);

    window.location.href = imageUrl;
  }

  function downloadDesktop(
    dataUrl: string,
  ) {
    const link =
      document.createElement("a");

    link.href = dataUrl;

    link.download =
      `martincitas-vs-${safeFileName(
        match.rival,
      )}.png`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function shareResult() {
    if (!played || generating) return;

    try {
      setGenerating(true);

      const dataUrl =
        await generateCardDataUrl();

      if (isMobileDevice()) {
        await shareMobile(dataUrl);
      } else {
        downloadDesktop(dataUrl);
      }
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error(error);

      alert(
        "No se pudo generar el resultado.",
      );
    } finally {
      setGenerating(false);
    }
  }

  return (
    <>
      {children}

      {played && (
        <button
          type="button"
          disabled={generating}
          onClick={() => void shareResult()}
          className="hidden"        >
          {generating
            ? "Generando..."
            : "Compartir resultado"}
        </button>
      )}

      {played && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-2000px] top-0 -z-10"
        >
          <div ref={cardRef}>
            <ResultCard
  rival={match.rival}
  torneo={match.torneo ?? ""}
  jornada={match.id}
  fecha={match.fecha}
  ubicacion={match.ubicacion}
  golesFavor={match.goles_favor ?? 0}
  golesContra={match.goles_contra ?? 0}
  goles={goles}
  mvp={mvp}
            />
          </div>
        </div>
      )}
    </>
  );
}