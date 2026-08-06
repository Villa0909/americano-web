import Image from "next/image";
import { notFound } from "next/navigation";
import MatchTabs from "@/components/matches/MatchTabs";
import MatchHeader from "@/components/matches/MatchHeader";
import { getMatch } from "@/lib/matches";
import { getMatchDetails } from "@/lib/playerMatchStats";


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function MatchPage({
  params,
}: Props) {
  const { id } = await params;

  const match = await getMatch(Number(id));

  if (!match) {
    notFound();
  }

  const stats = await getMatchDetails(match.id);

  const goles = stats.filter(
    (s) => s.goles > 0
  );

  const asistencias = stats.filter(
    (s) => s.asistencias > 0
  );

  const amarillas = stats.filter(
    (s) => s.amarillas > 0
  );

  const rojas = stats.filter(
    (s) => s.rojas > 0
  );

  const mvp = stats.find(
    (s) => s.mvp
  );

  return (
    <main className="mx-auto max-w-5xl px-8 py-12">

      <MatchHeader
  rival={match.rival}
  escudoRival={match.escudo_rival ?? ""}
  torneo={match.torneo ?? ""}
  fecha={match.fecha}
  golesFavor={match.goles_favor}
  golesContra={match.goles_contra}
  goleadores={goles}
  ubicacion={match.ubicacion}
  ubicacionUrl={match.ubicacion_url}
  jornada={match.id}
/>




<MatchTabs
  goles={goles}
  asistencias={asistencias}
  amarillas={amarillas}
  rojas={rojas}
  mvp={mvp}
/>    </main>
  );
}