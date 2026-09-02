import { notFound } from "next/navigation";

import MatchHeader from "@/components/matches/MatchHeader";
import MatchTabs from "@/components/matches/MatchTabs";
import MatchView from "@/components/matches/MatchView";

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

  const teams = await getTeams();

  const historicalMatches =
    await getStandingMatchesByJornada(
      match.id
    );

  /*
   * ESTADÍSTICAS DE AMERICANO
   */

  const jugadoresConEstadisticas =
    stats.filter(
      (stat) =>
        stat.recepciones > 0 ||
        stat.yardas > 0 ||
        stat.touchdowns > 0 ||
        stat.pases_completos > 0 ||
        stat.yardas_pase > 0 ||
        stat.touchdowns_pase > 0 ||
        stat.touchdowns_carrera > 0 ||
        stat.tackles > 0 ||
        stat.intercepciones > 0 ||
        stat.sacks > 0 ||
        stat.touchdowns_defensivos > 0
    );

  /*
   * COMPATIBILIDAD CON COMPONENTES
   *
   * Los componentes antiguos todavía esperan:
   * player_id, nombre y goles.
   *
   * La información real de americano
   * permanece en jugadoresConEstadisticas.
   */

  const goleadores = jugadoresConEstadisticas.map(
    (stat) => ({
      player_id: stat.player_id,
      nombre: stat.nombre,
      goles: stat.touchdowns,
    })
  );

  const mvp = null;

  return (
    <MatchView
      match={match}
      goles={goleadores}
      asistencias={[]}
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
          goleadores={goleadores}
          ubicacion={
            match.ubicacion
          }
          ubicacionUrl={
            match.ubicacion_url
          }
          jornada={match.id}
        />

        <MatchTabs
          goles={goleadores}
          asistencias={[]}
          amarillas={[]}
          rojas={[]}
          mvp={mvp}
          teams={teams}
          historicalMatches={
            historicalMatches
          }
          jornada={match.id}
        />

      </main>
    </MatchView>
  );
}