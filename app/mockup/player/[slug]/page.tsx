import { notFound } from "next/navigation";

import PlayerCard from "@/components/shares/templates/PlayerCard";
import { getPlayerBySlug } from "@/lib/players";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  let player;

  try {
    player = await getPlayerBySlug(slug);
  } catch {
    notFound();
  }

  return (
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
  );
}