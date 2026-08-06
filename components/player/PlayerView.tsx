"use client";

import { useRef, useState } from "react";

import PlayerCard from "@/components/shares/templates/PlayerCard";
import ShareModal from "@/components/share/ShareModal";

interface Props {
  player: any;
  children: React.ReactNode;
}

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;

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
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "jugador"
    );
  }

  async function loadImage(url: string) {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `No se pudo cargar la imagen: ${url}`,
      );
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    try {
      const image = new Image();

      image.src = objectUrl;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();

        image.onerror = () => {
          reject(
            new Error(
              `No se pudo abrir la imagen: ${url}`,
            ),
          );
        };
      });

      try {
        await image.decode();
      } catch {
        // Safari a veces rechaza decode()
        // aunque la imagen ya esté cargada.
      }

      return image;
    } finally {
      // No se revoca aquí porque todavía necesitamos
      // usar la imagen dentro del canvas.
    }
  }

  function drawCoverImage(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    const imageRatio =
      image.naturalWidth / image.naturalHeight;

    const areaRatio = width / height;

    let sourceWidth = image.naturalWidth;
    let sourceHeight = image.naturalHeight;
    let sourceX = 0;
    let sourceY = 0;

    if (imageRatio > areaRatio) {
      sourceWidth =
        image.naturalHeight * areaRatio;

      sourceX =
        (image.naturalWidth - sourceWidth) / 2;
    } else {
      sourceHeight =
        image.naturalWidth / areaRatio;

      sourceY =
        (image.naturalHeight - sourceHeight) / 2;
    }

    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      x,
      y,
      width,
      height,
    );
  }

  function drawPlayerImage(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
  ) {
    const desiredHeight = 1200;

    const ratio =
      image.naturalWidth / image.naturalHeight;

    const desiredWidth = desiredHeight * ratio;

    context.drawImage(
      image,
      -300,
      CARD_HEIGHT - desiredHeight,
      desiredWidth,
      desiredHeight,
    );
  }

  function drawStats(
    context: CanvasRenderingContext2D,
  ) {
    const stats = [
      {
        label: "PJ",
        value: player.partidos ?? 0,
      },
      {
        label: "⚽",
        value: player.goles ?? 0,
      },
      {
        label: "A",
        value: player.asistencias ?? 0,
      },
      {
        label: "★",
        value: player.mvps ?? 0,
      },
    ].filter((stat) => stat.value > 0);

    if (stats.length === 0) {
      return;
    }

    const startX =
      stats.length === 2 ? 520 : 550;

    const bottom =
      stats.length === 2 ? 180 : 130;

    const y = CARD_HEIGHT - bottom;
    const gap = 125;

    context.textAlign = "center";
    context.textBaseline = "middle";

    stats.forEach((stat, index) => {
      const x = startX + index * gap;

      context.globalAlpha = 1;

      context.fillStyle =
        stat.label === "★"
          ? "#facc15"
          : "#ffffff";

      context.font =
        "900 58px Arial, sans-serif";

      context.fillText(
        stat.label,
        x,
        y - 55,
      );

      context.fillStyle = "#ffffff";

      context.font =
        "900 58px Arial, sans-serif";

      context.fillText(
        String(stat.value),
        x,
        y + 25,
      );
    });

    context.globalAlpha = 1;
  }

  async function generateMobileCardBlob() {
    const canvas =
      document.createElement("canvas");

    canvas.width = CARD_WIDTH;
    canvas.height = CARD_HEIGHT;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error(
        "No se pudo crear el canvas.",
      );
    }

    const [backgroundImage, playerImage] =
      await Promise.all([
        loadImage("/templates/player-bg.png"),
        loadImage(player.foto),
      ]);

    // Fondo negro de respaldo
    context.fillStyle = "#000000";

    context.fillRect(
      0,
      0,
      CARD_WIDTH,
      CARD_HEIGHT,
    );

    // Fondo real
    drawCoverImage(
      context,
      backgroundImage,
      0,
      0,
      CARD_WIDTH,
      CARD_HEIGHT,
    );

    const positionText = {
      Portero: "POR",
      Defensa: "DEF",
      Mediocampista: "MED",
      Delantero: "DEL",
    } as const;

    const abbreviatedPosition =
      positionText[
        player.posicion as keyof typeof positionText
      ] ?? player.posicion;

    // Posición
    context.globalAlpha = 0.4;
    context.fillStyle = "#ffffff";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.font =
      "900 110px Arial, sans-serif";

    context.fillText(
      abbreviatedPosition,
      50,
      50,
    );

    // Número gigante
    context.globalAlpha = 0.1;
    context.fillStyle = "#ffffff";
    context.textAlign = "right";
    context.textBaseline = "top";
    context.font =
      "900 520px Arial, sans-serif";

    const numberRight =
      player.numero < 10 ? 320 : 260;

    context.fillText(
      String(player.numero),
      CARD_WIDTH - numberRight,
      400,
    );

    // Nombre
    context.globalAlpha = 1;
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.textBaseline = "top";
    context.font =
      "900 170px Arial, sans-serif";

    context.fillText(
      String(player.nombre).toUpperCase(),
      670,
      180,
    );

    // Foto
    drawPlayerImage(
      context,
      playerImage,
    );

    // Estadísticas
    drawStats(context);

    // Footer
    context.globalAlpha = 0.7;
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.textBaseline = "alphabetic";
    context.font =
      "500 28px Arial, sans-serif";

    context.fillText(
      "M A R T I N C I T A S F C . C O M",
      740,
      CARD_HEIGHT - 45,
    );

    context.globalAlpha = 1;

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "No se pudo crear el PNG.",
              ),
            );

            return;
          }

          resolve(blob);
        },
        "image/png",
        1,
      );
    });
  }

  async function downloadDesktopCard() {
    if (!cardRef.current) {
      return;
    }

    const { toPng } = await import(
      "html-to-image"
    );

    await document.fonts.ready;

    const dataUrl = await toPng(
      cardRef.current,
      {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "transparent",
      },
    );

    const link =
      document.createElement("a");

    link.download = `${safeFileName(
      player.nombre,
    )}.png`;

    link.href = dataUrl;

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function shareMobileCard() {
    const blob =
      await generateMobileCardBlob();

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

    // Respaldo para navegadores sin Web Share
    const imageUrl =
      URL.createObjectURL(blob);

    window.location.href = imageUrl;
  }

  async function downloadCard() {
    if (generating) {
      return;
    }

    try {
      setGenerating(true);

      if (isMobileDevice()) {
        await shareMobileCard();
      } else {
        await downloadDesktopCard();
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
              void downloadCard();
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

      {/* Solo se usa para descargar en PC */}

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