import { notFound } from "next/navigation";

import MatchHeader from "@/components/matches/MatchHeader";
import MatchTabs from "@/components/matches/MatchTabs";
import MatchView from "@/components/matches/MatchView";
import HistoricalTable from "@/components/standings/HistoricalTable";

import { getMatch } from "@/lib/matches";
import { getMatchDetails } from "@/lib/playerMatchStats";
import {
  getTeams,
  getStandingMatchesByJornada,
} from "@/lib/standings";

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

  const stats =
    await getMatchDetails(match.id);

  // Equipos de la tabla
  const teams = await getTeams();

  // Partidos de tabla hasta esta jornada
  const historicalMatches =
    await getStandingMatchesByJornada(
      match.id
    );

  const goles = stats.filter(
    (stat) => stat.goles > 0,
  );

  const asistencias = stats.filter(
    (stat) => stat.asistencias > 0,
  );

  const amarillas = stats.filter(
    (stat) => stat.amarillas > 0,
  );

  const rojas = stats.filter(
    (stat) => stat.rojas > 0,
  );

  const mvp =
    stats.find((stat) => stat.mvp) ?? null;

  return (
    <MatchView
      match={match}
      goles={goles}
      asistencias={asistencias}
      mvp={mvp}
    >
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        <MatchHeader
          rival={match.rival}
          escudoRival={
            match.escudo_rival ?? ""
          }
          torneo={match.torneo ?? ""}
          fecha={match.fecha}
          golesFavor={
            match.goles_favor
          }
          golesContra={
            match.goles_contra
          }
          goleadores={goles}
          ubicacion={
            match.ubicacion
          }
          ubicacionUrl={
            match.ubicacion_url
          }
          jornada={match.id}
        />

        <MatchTabs
  goles={goles}
  asistencias={asistencias}
  amarillas={amarillas}
  rojas={rojas}
  mvp={mvp}
  teams={teams}
  historicalMatches={historicalMatches}
  jornada={match.id}
/>

       

      </main>
    </MatchView>
  );
}